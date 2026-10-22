import { execFileSync } from "node:child_process";
import { constants } from "node:fs";
import { lstat, mkdtemp, readFile, rm, stat, writeFile, copyFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parse, postprocess, preprocess } from "micromark";
import { decodeString } from "micromark-util-decode-string";
import sharp from "sharp";
import trash from "trash";

const repoRoot = fileURLToPath(new URL("../", import.meta.url));
const help = `用法：pnpm images:webp [选项]

转换仓库内所有未被 Git 忽略的 PNG，并同步 Markdown 本地图片引用。
全部转换、引用更新及写入校验成功后，默认将 PNG 移到系统回收站。
不覆盖已有 WebP，不改变图片尺寸。

  --dry-run          仅预览转换和引用修改，不写入文件
  --quality <1-100>  WebP 有损压缩质量，默认 85（透明通道质量 100）
  --keep-original    保留原 PNG，不移到回收站
  --remove-original  兼容旧参数，同样移到回收站，不永久删除
  --overwrite        允许覆盖同名 WebP
  --help             显示帮助
`;

function parseOptions(args) {
  const options = { quality: 85, dryRun: false, keepOriginal: false, overwrite: false };
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg === "--dry-run") options.dryRun = true;
    else if (arg === "--keep-original") options.keepOriginal = true;
    else if (arg === "--remove-original") options.keepOriginal = false;
    else if (arg === "--overwrite") options.overwrite = true;
    else if (arg === "--help" || arg === "-h") options.help = true;
    else if (arg === "--quality") {
      const value = args[++index];
      if (!/^\d+$/.test(value ?? "") || Number(value) < 1 || Number(value) > 100) {
        throw new Error("--quality 必须是 1 到 100 的整数。");
      }
      options.quality = Number(value);
    } else throw new Error(`未知参数：${arg}。使用 --help 查看用法。`);
  }
  return options;
}

async function repositoryFiles(root) {
  // 使用 Git 的忽略规则，包含尚未提交的新图片；不跟随符号链接。
  const output = execFileSync("git", ["-C", root, "ls-files", "--cached", "--others", "--exclude-standard", "-z"], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  const files = [];
  for (const name of [...new Set(output.split("\0").filter(Boolean))].sort()) {
    if (!/\.(png|md)$/i.test(name)) continue;
    const file = resolve(root, name);
    try {
      if ((await lstat(file)).isFile()) files.push(file);
    } catch (error) {
      if (error.code !== "ENOENT") throw error; // 已删除但尚未提交的文件。
    }
  }
  return files;
}

function decodePath(value) {
  try {
    return decodeURIComponent(decodeString(value));
  } catch {
    return null;
  }
}

function replaceDestination(value, markdownFile, converted, root) {
  // 不把字符实体（如 &#46;）中的 # 当锚点；%23 / %3F 属于文件名。
  let suffixIndex = -1;
  for (const match of value.matchAll(/&(?:#[xX][\da-fA-F]+|#\d+|[A-Za-z][A-Za-z\d]+);|[?#]/g)) {
    if (/^[?#]$/.test(decodeString(match[0]))) {
      suffixIndex = match.index;
      break;
    }
  }
  const rawPath = suffixIndex === -1 ? value : value.slice(0, suffixIndex);
  const suffix = suffixIndex === -1 ? "" : value.slice(suffixIndex);
  const path = decodePath(rawPath);
  if (!path || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(path)) return value;

  const publicRoot = join(root, "src/.vuepress/public");
  let candidates;
  if (path.startsWith("@source/")) candidates = [resolve(root, "src", path.slice(8))];
  else if (path.startsWith("@public/")) candidates = [resolve(publicRoot, path.slice(8))];
  else if (path.startsWith("/")) {
    candidates = [resolve(publicRoot, `.${path}`), resolve(root, `./src${path}`), resolve(root, `.${path}`)];
  } else candidates = [resolve(dirname(markdownFile), path)];
  if (!candidates.some((candidate) => converted.has(candidate))) return value;

  // 只替换扩展名，保留转义、URL 编码、查询参数和锚点。
  for (let index = rawPath.length - 1; index >= 0; index--) {
    if (decodePath(rawPath.slice(index))?.toLowerCase() === ".png") {
      return `${rawPath.slice(0, index)}.webp${suffix}`;
    }
  }
  return value;
}

export function updateMarkdown(source, markdownFile, converted, root) {
  // 用等长空白遮住 frontmatter，保持 token 与原文件的偏移一致。
  const bomOffset = source.startsWith("\uFEFF") ? 1 : 0;
  const markdown = source.slice(bomOffset).replace(/^---\r?\n[\s\S]*?\r?\n(?:---|\.\.\.)(?:\r?\n|$)/,
    (block) => block.replace(/[^\r\n]/g, " "));
  const events = postprocess(parse().document().write(preprocess()(markdown, "utf8", true)));
  const edits = [];
  function addEdit(start, end) {
    const previous = source.slice(start, end);
    const next = replaceDestination(previous, markdownFile, converted, root);
    if (next !== previous) edits.push({ start, end, next });
  }

  for (const [kind, token] of events) {
    if (kind !== "enter") continue;
    const start = token.start.offset + bomOffset;
    const end = token.end.offset + bomOffset;
    if (token.type === "resourceDestinationString" || token.type === "definitionDestinationString") {
      addEdit(start, end);
    } else if (token.type === "htmlFlow" || token.type === "htmlText") {
      // 处理 Markdown 内静态 HTML 的 src/href；跳过注释和动态 Vue 属性。
      const html = source.slice(start, end);
      const tags = /<!--[\s\S]*?-->|<[A-Za-z][\w:-]*(?:[^>"']|"[^"]*"|'[^']*')*>/g;
      for (const tag of html.matchAll(tags)) {
        if (tag[0].startsWith("<!--")) continue;
        const attributes = /([^\s=<>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
        for (const attribute of tag[0].matchAll(attributes)) {
          if (!/^(src|href)$/i.test(attribute[1])) continue;
          const value = attribute[2] ?? attribute[3] ?? attribute[4];
          const quoted = attribute[2] !== undefined || attribute[3] !== undefined;
          const offset = attribute.index + attribute[0].length - value.length - (quoted ? 1 : 0);
          addEdit(start + tag.index + offset, start + tag.index + offset + value.length);
        }
      }
    }
  }

  // 从后向前应用修改，以保留其他内容、排版和 CRLF 换行。
  let content = source;
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    content = content.slice(0, edit.start) + edit.next + content.slice(edit.end);
  }
  return { content, count: edits.length };
}

export async function convertImages({ root = repoRoot, quality = 85, dryRun = false, keepOriginal = false, overwrite = false, log = console.log, trashFiles = trash } = {}) {
  const files = await repositoryFiles(root);
  const images = files.filter((file) => /\.png$/i.test(file));
  if (images.length === 0) {
    log("没有找到需要转换的 PNG。");
    return;
  }

  const converted = new Map();
  const targets = new Set();
  for (const source of images) {
    const target = source.replace(/\.png$/i, ".webp");
    if (targets.has(target)) throw new Error(`多个 PNG 对应同一输出：${relative(root, target)}`);
    targets.add(target);
    try {
      const existing = await lstat(target);
      if (!existing.isFile() || !overwrite) {
        throw new Error(`输出已存在：${relative(root, target)}。确认后可使用 --overwrite 覆盖普通文件。`);
      }
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    converted.set(source, target);
  }

  const documents = [];
  let references = 0;
  for (const file of files.filter((file) => /\.md$/i.test(file))) {
    const result = updateMarkdown(await readFile(file, "utf8"), file, converted, root);
    if (result.count > 0) {
      documents.push({ file, content: result.content });
      references += result.count;
      log(`${dryRun ? "将更新" : "待更新"} ${relative(root, file)}（${result.count} 处引用）`);
    }
  }

  if (dryRun) {
    for (const [source, target] of converted) log(`${relative(root, source)} → ${relative(root, target)}`);
    log(`预览：${images.length} 张图片，${documents.length} 个 Markdown，${references} 处引用。质量 ${quality}；${keepOriginal ? "保留原 PNG" : "成功后将原 PNG 移到系统回收站"}。未写入文件。`);
    return;
  }

  // 所有图片先在临时目录完成编码，避免坏图片导致只转换了一部分。
  const staging = await mkdtemp(join(tmpdir(), "png-to-webp-"));
  let before = 0;
  let after = 0;
  try {
    const outputs = [];
    for (const [source, target] of converted) {
      const temporary = join(staging, `${outputs.length}.webp`);
      const result = await sharp(source, { animated: true })
        .webp({ quality, alphaQuality: 100, effort: 6 })
        .toFile(temporary);
      const originalSize = (await stat(source)).size;
      before += originalSize;
      after += result.size;
      outputs.push({ temporary, target });
      log(`${relative(root, source)} → ${relative(root, target)}（${originalSize} → ${result.size} 字节）`);
    }

    // WebP 全部落盘后才修改引用；全部写入并回读校验后才移动 PNG。
    for (const { temporary, target } of outputs) {
      await copyFile(temporary, target, overwrite ? 0 : constants.COPYFILE_EXCL);
    }
    for (const { file, content } of documents) await writeFile(file, content, "utf8");
    for (const { temporary, target } of outputs) {
      const expected = await readFile(temporary);
      if (!(await readFile(target)).equals(expected)) {
        throw new Error(`WebP 写入校验失败：${relative(root, target)}。未移动原 PNG。`);
      }
    }
    for (const { file, content } of documents) {
      if (await readFile(file, "utf8") !== content) {
        throw new Error(`Markdown 写入校验失败：${relative(root, file)}。未移动原 PNG。`);
      }
    }
    if (!keepOriginal) {
      try {
        // 禁用 glob，文件名里的方括号、星号等字符必须按字面处理。
        await trashFiles([...converted.keys()], { glob: false });
        for (const source of converted.keys()) {
          try {
            await lstat(source);
          } catch (error) {
            if (error.code === "ENOENT") continue;
            throw error;
          }
          throw new Error(`原 PNG 仍存在：${relative(root, source)}`);
        }
      } catch (error) {
        throw new Error(`WebP 和 Markdown 已保存，但移到回收站失败；请检查原图及系统回收站：${error.message}`, { cause: error });
      }
    }
  } finally {
    await rm(staging, { recursive: true, force: true });
  }
  const saved = before === 0 ? 0 : (1 - after / before) * 100;
  log(`完成：${images.length} 张图片，${documents.length} 个 Markdown，${references} 处引用。图片体积 ${(before / 1024).toFixed(1)} → ${(after / 1024).toFixed(1)} KiB（减少 ${saved.toFixed(1)}%）。${keepOriginal ? "已保留原 PNG" : "原 PNG 已移到系统回收站"}。`);
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  try {
    const options = parseOptions(process.argv.slice(2));
    if (options.help) console.log(help);
    else await convertImages(options);
  } catch (error) {
    console.error(`转换失败：${error.message}`);
    process.exitCode = 1;
  }
}

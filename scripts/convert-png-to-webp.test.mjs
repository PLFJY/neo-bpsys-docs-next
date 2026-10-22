import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, renameSync } from "node:fs";
import { access, mkdir, mkdtemp, readFile, rename, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { test } from "node:test";
import sharp from "sharp";
import { convertImages, updateMarkdown } from "./convert-png-to-webp.mjs";

const silent = () => {};

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), "webp-test-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  execFileSync("git", ["init", "-q", root]);
  return root;
}

async function image(file) {
  await mkdir(dirname(file), { recursive: true });
  await sharp({ create: { width: 48, height: 32, channels: 4, background: { r: 80, g: 130, b: 200, alpha: 0.5 } } })
    .png().toFile(file);
}

test("只更新实际本地目标，保留语法、转义、编码、CRLF 和代码示例", () => {
  const root = join(tmpdir(), "webp-reference-fixture");
  const file = join(root, "src/guide/page.md");
  const sources = [
    "src/guide/images/a.png", "src/guide/images/空 格.PNG", "src/guide/images/a(b).png",
    "src/guide/images/a#b.png", "src/.vuepress/public/logo.png",
  ];
  const converted = new Map(sources.map((source) => [join(root, source), "unused"]));
  const lines = [
    '![图](./images/a.png?x=1#section "图片标题")',
    '![图](<images/空 格.PNG>)',
    '[下载](images/%E7%A9%BA%20%E6%A0%BC.PNG)',
    '![圆括号](images/a\\(b\\).png)',
    '![编码锚点](images/a%23b.png#anchor)',
    '![图][ref]',
    '',
    '[ref]: images/a.png "引用标题"',
    '',
    '<img src="images/a.png?x=1&amp;y=2" width="200">',
    "<img src='images/a.png'>",
    '<img src=images/a.png>',
    '<a href="images/a.png">下载</a>',
    '<img :src="\'images/a.png\'">',
    '<!-- <img src="images/a.png"> -->',
    '',
    '![站点路径](/logo.png)',
    '![文档路径](/guide/images/a.png)',
    '![别名](@source/guide/images/a.png)',
    '![公共资源](@public/logo.png)',
    '![编码扩展名](images/a%2epng)',
    '![实体扩展名](images/a&#46;png)',
    '![远程](https://example.com/images/a.png)',
    '![远程](//example.com/images/a.png)',
    '![其他目录](../other/a.png)',
    '![丢失](images/missing.png)',
    '`![代码](images/a.png)`',
    '```md',
    '![代码块](images/a.png)',
    '```',
    '',
    '    ![缩进代码](images/a.png)',
    '',
  ];
  const expected = [...lines];
  for (const index of [0, 1, 2, 3, 4, 7, 9, 10, 11, 12, 16, 17, 18, 19]) {
    expected[index] = expected[index].replace(/\.png/i, ".webp");
  }
  expected[20] = '![编码扩展名](images/a.webp)';
  expected[21] = '![实体扩展名](images/a.webp)';
  const result = updateMarkdown(lines.join("\r\n"), file, converted, root);
  assert.equal(result.content, expected.join("\r\n"));
  assert.equal(result.count, 16);
});

test("真实转换透明 PNG，全部图片和引用写入后默认回收原图，忽略生成目录及符号链接", async (t) => {
  const root = await fixture(t);
  const png = join(root, "src/images/图.PNG");
  const webp = join(root, "src/images/图.webp");
  const markdown = join(root, "src/page.md");
  const secondPng = join(root, "src/images/other [1].png");
  const secondMarkdown = join(root, "src/second.md");
  const recycleBin = join(root, "test-recycle-bin");
  await image(png);
  await image(secondPng);
  await image(join(root, "generated/ignored.png"));
  await symlink(png, join(root, "linked.png"));
  await writeFile(join(root, ".gitignore"), "generated/\n");
  await writeFile(markdown, '![图](images/图.PNG "标题")\r\n');
  await writeFile(secondMarkdown, '![图](<images/other [1].png>)\n');
  let calls = 0;
  await convertImages({ root, log: silent, trashFiles: async (paths, options) => {
    calls++;
    assert.deepEqual(new Set(paths), new Set([png, secondPng]));
    assert.deepEqual(options, { glob: false });
    assert.equal((await sharp(webp).metadata()).format, "webp");
    assert.equal((await sharp(join(root, "src/images/other [1].webp")).metadata()).format, "webp");
    assert.equal(await readFile(markdown, "utf8"), '![图](images/图.webp "标题")\r\n');
    assert.equal(await readFile(secondMarkdown, "utf8"), '![图](<images/other [1].webp>)\n');
    await mkdir(recycleBin);
    for (const [index, path] of paths.entries()) await rename(path, join(recycleBin, `${index}.original`));
  } });
  assert.equal(calls, 1);
  await access(join(recycleBin, "0.original"));
  await access(join(recycleBin, "1.original"));
  const result = await sharp(webp).metadata();
  assert.equal(result.format, "webp");
  assert.equal(result.width, 48);
  assert.equal(result.height, 32);
  assert.equal(result.hasAlpha, true);
  const { data } = await sharp(webp).raw().toBuffer({ resolveWithObject: true });
  assert.equal(data[3], 128);
  assert.equal(await readFile(markdown, "utf8"), '![图](images/图.webp "标题")\r\n');
  await assert.rejects(access(png), { code: "ENOENT" });
  await assert.rejects(access(join(root, "generated/ignored.webp")), { code: "ENOENT" });
  await assert.rejects(access(join(root, "linked.webp")), { code: "ENOENT" });
  await convertImages({ root, log: silent }); // 回收源图后再次运行无需修改。
});

test("跳过 frontmatter，并正确保留 BOM、实体编码的查询参数和锚点", () => {
  const root = join(tmpdir(), "webp-reference-fixture");
  const file = join(root, "README.md");
  const converted = new Map([[join(root, "a.png"), "unused"]]);
  const frontmatter = '\uFEFF---\r\ncover: "![a](a.png)"\r\n---\r\n\r\n';
  const body = '![a](a.png&#35;anchor)\r\n<img src="a.png&quest;x=1&amp;y=2">\r\n';
  const result = updateMarkdown(frontmatter + body, file, converted, root);
  assert.equal(result.content, frontmatter + body.replaceAll("a.png", "a.webp"));
  const withBom = updateMarkdown('\uFEFF![a](a.png)', file, converted, root);
  assert.equal(withBom.content, '\uFEFF![a](a.webp)');
});

test("dry-run 不写入图片、不修改 Markdown、不调用回收站", async (t) => {
  const root = await fixture(t);
  const png = join(root, "a.png");
  const markdown = join(root, "README.md");
  await image(png);
  await writeFile(markdown, "![a](a.png)\n");
  const messages = [];
  await convertImages({ root, dryRun: true, log: (message) => messages.push(message), trashFiles: async () => assert.fail("不应调用回收站") });
  await access(png);
  await assert.rejects(access(join(root, "a.webp")), { code: "ENOENT" });
  assert.equal(await readFile(markdown, "utf8"), "![a](a.png)\n");
  assert.ok(messages.some((message) => message.includes("1 处引用")));
});

test("输出重名时在写入前报错；显式覆盖且选择保留时不回收 PNG", async (t) => {
  const root = await fixture(t);
  await image(join(root, "a.png"));
  await writeFile(join(root, "a.webp"), "existing");
  await writeFile(join(root, "README.md"), "![a](a.png)\n");
  const trashFiles = async () => assert.fail("不应调用回收站");
  await assert.rejects(convertImages({ root, log: silent, trashFiles }), /输出已存在/);
  assert.equal(await readFile(join(root, "a.webp"), "utf8"), "existing");
  assert.equal(await readFile(join(root, "README.md"), "utf8"), "![a](a.png)\n");
  await convertImages({ root, overwrite: true, keepOriginal: true, quality: 90, log: silent, trashFiles });
  assert.equal((await sharp(join(root, "a.webp")).metadata()).format, "webp");
  await access(join(root, "a.png"));
});

test("坏图片导致转换失败时，不写入任何 WebP、不改引用、不调用回收站", async (t) => {
  const root = await fixture(t);
  await image(join(root, "a.png"));
  await writeFile(join(root, "z.png"), "not a PNG");
  await writeFile(join(root, "README.md"), "![a](a.png)\n![z](z.png)\n");
  let trashCalled = false;
  await assert.rejects(convertImages({ root, log: silent, trashFiles: async () => { trashCalled = true; } }));
  assert.equal(trashCalled, false);
  await assert.rejects(access(join(root, "a.webp")), { code: "ENOENT" });
  await assert.rejects(access(join(root, "z.webp")), { code: "ENOENT" });
  await access(join(root, "a.png"));
  await access(join(root, "z.png"));
  assert.equal(await readFile(join(root, "README.md"), "utf8"), "![a](a.png)\n![z](z.png)\n");
});

test("Markdown 写入失败时不调用回收站", async (t) => {
  const root = await fixture(t);
  const png = join(root, "a.png");
  const markdown = join(root, "README.md");
  await image(png);
  await writeFile(markdown, "![a](a.png)\n");
  let trashCalled = false;
  await assert.rejects(convertImages({ root, trashFiles: async () => { trashCalled = true; }, log: (message) => {
    if (message.includes("→")) {
      // 文档已读取、图片已编码，此时使文档目标不可写。
      renameSync(markdown, join(root, "backup.md"));
      mkdirSync(markdown);
    }
  } }), (error) => ["EISDIR", "EPERM", "EACCES"].includes(error.code));
  assert.equal(trashCalled, false);
  await access(png);
  assert.equal(await readFile(join(root, "backup.md"), "utf8"), "![a](a.png)\n");
  assert.equal((await sharp(join(root, "a.webp")).metadata()).format, "webp");
});

test("回收站失败时保留原图及成功生成的文件，明确报错而不永久删除", async (t) => {
  const root = await fixture(t);
  const png = join(root, "a.png");
  await image(png);
  const original = await readFile(png);
  await writeFile(join(root, "README.md"), "![a](a.png)\n");
  await assert.rejects(convertImages({ root, log: silent, trashFiles: async () => {
    throw new Error("回收站不可用");
  } }), /WebP 和 Markdown 已保存，但移到回收站失败.*回收站不可用/);
  assert.deepEqual(await readFile(png), original);
  assert.equal((await sharp(join(root, "a.webp")).metadata()).format, "webp");
  assert.equal(await readFile(join(root, "README.md"), "utf8"), "![a](a.webp)\n");
});

test("回收站未实际移动文件时不能报告成功", async (t) => {
  const root = await fixture(t);
  await image(join(root, "a.png"));
  await assert.rejects(convertImages({ root, log: silent, trashFiles: async () => {} }), /原 PNG 仍存在/);
  await access(join(root, "a.png"));
});

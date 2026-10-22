# neo-bpsys-docs-next

Documentation of [neo-bpsys-wpf](https://github.com/PLFJY/neo-bpsys-wpf/)

## 图片压缩

安装依赖（`pnpm install`）后，在仓库中运行：

```sh
pnpm images:webp
```

脚本扫描 Git 跟踪的文件及未被忽略的新文件，将 PNG（包括大写扩展名）转换为同目录、同名的 WebP，默认有损质量为 85，保持图片尺寸和透明通道。同步修改 Markdown 图片、链接、引用式定义及 HTML 静态 `src` / `href` 中指向这些图片的路径，保留查询参数、锚点和原文排版；跳过远程 URL、代码块和行内代码。

全部图片转换、Markdown 引用更新及写入回读校验成功后，脚本会自动将对应 PNG 移到系统回收站，可从回收站恢复。转换、写入或校验失败时不会执行回收站操作；回收站操作失败会报错，不会改为永久删除。

支持相对路径、VuePress 站点根路径（优先查找 `src/.vuepress/public`）、`@source/` 和 `@public/` 路径。不会改写 YAML frontmatter、Vue 动态表达式、HTML `srcset` 或其他代码文件中的路径；如果这些位置仍有引用，请使用 `--keep-original` 保留 PNG。

```sh
# 预览转换列表和引用修改，不写文件
pnpm images:webp --dry-run

# 调整质量（1–100）
pnpm images:webp --quality 90

# 保留原 PNG，不移到回收站
pnpm images:webp --keep-original

# 已存在同名 WebP 时，显式允许重新生成
pnpm images:webp --overwrite
```

同名 WebP 已存在时会在写入前报错，避免覆盖已有图片。重复转换时使用 `--overwrite`，可与其他参数组合。旧参数 `--remove-original` 仍可使用，但行为同样是移到回收站。压缩率取决于图片内容，WebP 并不保证比每张 PNG 都小；保留 PNG 时仓库总体体积不会减少。


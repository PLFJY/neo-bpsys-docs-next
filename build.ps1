#Requires -Version 7
$ErrorActionPreference = "Stop"

# CI 构建入口：
# 1. Clone 源码仓库（docfx 需要 neo-bpsys-wpf.Core 的 DLL + XML）
# 2. 安装 pnpm 依赖
# 3. 调用 pnpm docs:build（内部跑 docfx + VuePress + 合并 /api/）
# pnpm docs:build 的实现见 package.json scripts 和 scripts/*.ps1

# 1. Clone source repo (shallow)
if (-not (Test-Path .\neo-bpsys-wpf)) {
    git clone --depth=1 https://github.com/PLFJY/neo-bpsys-wpf.git
}

# 2. 安装前端依赖
pnpm install --frozen-lockfile

# 3. 构建文档（docfx API 文档 + VuePress 用户文档 + 合并到 dist/api/）
pnpm docs:build

Write-Host "=== Build complete ==="
Write-Host "Output: $(Resolve-Path .\src\.vuepress\dist)"
#Requires -Version 7
$ErrorActionPreference = "Stop"

# CI 构建入口（Windows）：
# 1. Clone 源码仓库（docfx 需要 neo-bpsys-wpf.Core 的 DLL + XML）
# 2. 安装 pnpm 依赖
# 3. 构建 API 文档（docfx）+ VuePress 文档
# mac/Linux 不使用本脚本，直接 pnpm docs:build（仅 VuePress，不含 API 文档，无需 pwsh）

# 1. Clone source repo (shallow)
if (-not (Test-Path .\neo-bpsys-wpf)) {
    git clone --depth=1 https://github.com/PLFJY/neo-bpsys-wpf.git
}

# 2. 安装前端依赖
pnpm install --frozen-lockfile

# 3. 构建 API 文档（docfx metadata + build + 同步 dev 文档 + junction）
pnpm docs:build-api

# 4. 构建 VuePress 文档（包含 /api/ 静态文件、/dev/ 开发文档）
pnpm docs:build

Write-Host "=== Build complete ==="
Write-Host "Output: $(Resolve-Path .\src\.vuepress\dist)"
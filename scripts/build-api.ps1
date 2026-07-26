#Requires -Version 7
$ErrorActionPreference = "Stop"

# 此脚本负责 docfx API 文档生成 + dev 文档同步 + public/api junction
# 由 pnpm docs:build / pnpm docs:dev 调用
# dev:  vite 自动从 public/api serve API，src/dev 作为页面源
# build: vite 自动把 public/api 复制到 dist/api，src/dev 编译进 dist/dev

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

# 确认源码存在（CI 由 build.ps1 clone，本地通过 junction 或已有 neo-bpsys-wpf 目录）
if (-not (Test-Path .\neo-bpsys-wpf\neo-bpsys-wpf.Core\neo-bpsys-wpf.Core.csproj)) {
    if (-not (Test-Path .\neo-bpsys-wpf)) {
        git clone --depth=1 https://github.com/PLFJY/neo-bpsys-wpf.git
    }
}

# 构建 Core DLL（docfx metadata 需要 DLL + XML 文档注释）
$coreDll = ".\neo-bpsys-wpf\neo-bpsys-wpf.Core\bin\Release\net10.0-windows\neo-bpsys-wpf.Core.dll"
if (-not (Test-Path $coreDll)) {
    dotnet build neo-bpsys-wpf\neo-bpsys-wpf.Core\neo-bpsys-wpf.Core.csproj -c Release
}

# 安装 docfx 到本地 .tools（固定版本，CI/本地一致）
if (-not (Test-Path .\.tools\docfx.exe)) {
    New-Item -ItemType Directory -Force .\.tools | Out-Null
    dotnet tool install docfx --tool-path .\.tools --version 2.78.5
}
$env:PATH = "$(Resolve-Path .\.tools);$env:PATH"

# 1. 生成 API 文档（metadata + build 分两步，避免一体命令的缓存冲突）
#    输出到 api-docs/_site，约 580 个页面（Core 项目，排除 PluginSdk/系统类型）
docfx metadata api-docs\docfx.json
docfx build api-docs\docfx.json

# 2. 同步 dev 文档从 neo-bpsys-wpf/docs 到 src/dev
#    确保 CI 和本地 docs:dev 都能看到最新开发文档
if (Test-Path .\src\dev) { Remove-Item -Recurse -Force .\src\dev }
Copy-Item -Recurse .\neo-bpsys-wpf\docs .\src\dev

# 3. 创建/刷新 src/.vuepress/public/api -> api-docs/_site 的 junction
#    vite dev 自动 serve /api/，vite build 自动复制到 dist/api/
$publicApi = ".\src\.vuepress\public\api"
$apiSite = ".\api-docs\_site"

if (Test-Path $publicApi) {
    Remove-Item -Force -Recurse $publicApi
}

if ($IsWindows -or $env:OS -eq "Windows_NT") {
    New-Item -ItemType Junction -Path $publicApi -Target (Resolve-Path $apiSite).Path | Out-Null
} else {
    New-Item -ItemType SymbolicLink -Path $publicApi -Target (Resolve-Path $apiSite).Path | Out-Null
}

Write-Host "=== Build complete ==="
Write-Host "API docs:  $apiSite"
Write-Host "Dev docs:  .\src\dev"
Write-Host "API link:  $publicApi -> $apiSite"
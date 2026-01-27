git clone https://github.com/PLFJY/neo-bpsys-wpf.git --depth 1
dotnet run --project neo-bpsys-wpf\neo-bpsys-wpf.DocsGenerator\neo-bpsys-wpf.DocsGenerator.csproj neo-bpsys-wpf.Core src\api

# Fix Windows case-insensitive collision between index and Index routes
Get-ChildItem -Recurse -Filter Index.md .\src\api | ForEach-Object {
  $newPath = Join-Path $_.Directory.FullName "IndexProperty.md"
  Move-Item -Force $_.FullName $newPath
}
Get-ChildItem -Recurse -Filter *.md .\src\api | ForEach-Object {
  $content = Get-Content -Raw $_.FullName
  if ($content -match "Index\.md") {
    $updated = $content -replace "Index\.md", "IndexProperty.md"
    if ($updated -ne $content) { Set-Content -Path $_.FullName -Value $updated }
  }
}

corepack enable
pnpm install --frozen-lockfile
pnpm run docs:build
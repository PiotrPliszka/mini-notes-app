$ErrorActionPreference = "Stop"

Set-Location (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location ..

$fixtureDir = "backend/fixtures"
$fixturePath = "$fixtureDir/sqlite_dump.json"

New-Item -ItemType Directory -Force -Path $fixtureDir | Out-Null

Write-Host "Exporting data from SQLite -> $fixturePath"
docker compose run --rm -e USE_SQLITE=True backend `
  python manage.py dumpdata `
  users.User notes.Note `
  --indent 2 | Out-File -Encoding utf8 $fixturePath

Write-Host "Importing data into Postgres"
docker compose run --rm backend `
  python manage.py loaddata /app/fixtures/sqlite_dump.json

Write-Host "Done."


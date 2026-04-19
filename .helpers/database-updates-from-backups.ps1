# ============================================
# ECORIDE DATABASE RESTORE SCRIPT
# Usage:
#   .\databse-updates-from-backups.ps1                    # Restore from daily backups (default)
#   .\databse-updates-from-backups.ps1 -BackupType weekly # Restore from weekly backups
#   .\databse-updates-from-backups.ps1 -BackupType monthly
#   .\databse-updates-from-backups.ps1 -BackupType last
# ============================================

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet('daily', 'weekly', 'monthly', 'last')]
    [string]$BackupType = 'daily'
)

Write-Host "==============================================================="
Write-Host "ECORIDE DATABASE RESTORE SCRIPT"
Write-Host "==============================================================="

# 1. Stop API services
Write-Host "🔄 Stopping API services..." -ForegroundColor Yellow
docker-compose stop api demo-client driver-demo driver-admin

# 2. List available backups from LOCAL directory (since backups are volume-mounted locally)
Write-Host "`nAvailable $BackupType backups:" -ForegroundColor Cyan
$backupPath = "backups/$BackupType"

if (-Not (Test-Path $backupPath)) {
    Write-Host "❌ Backup directory not found: $backupPath" -ForegroundColor Red
    docker-compose up -d
    return
}

Get-ChildItem "$backupPath/*.sql.gz" | Format-Table Name, @{Label="Size";Expression={"{0:N2} MB" -f ($_.Length / 1MB)}}, LastWriteTime -AutoSize
Write-Host "---------------------------------------------------------------"

# 3. Prompt for backup selection
$backupFile = Read-Host "Enter backup filename (or press Enter for 'ecoride-latest.sql.gz')"
if ([string]::IsNullOrEmpty($backupFile)) {
    $backupFile = "ecoride-latest.sql.gz"
}

$fullBackupPath = Join-Path $backupPath $backupFile

if (-Not (Test-Path $fullBackupPath)) {
    Write-Host "❌ Backup file not found: $fullBackupPath" -ForegroundColor Red
    docker-compose up -d
    return
}
Write-Host "---------------------------------------------------------------"

# 4. Confirm restore
$fileInfo = Get-Item $fullBackupPath
Write-Host "Selected backup:" -ForegroundColor Cyan
Write-Host "  File: $backupFile"
Write-Host "  Size: $("{0:N2} MB" -f ($fileInfo.Length / 1MB))"
Write-Host "  Date: $($fileInfo.LastWriteTime)"
Write-Host "---------------------------------------------------------------"

$confirm = Read-Host "⚠️  This will OVERWRITE the current database. Continue? (y/n)"
if ($confirm -ne 'y') {
    Write-Host "❌ Restore cancelled." -ForegroundColor Red
    docker-compose up -d
    return
}
Write-Host "***************************************************************"

# 5. Decompress locally using .NET (works on all Windows without external tools)
Write-Host "`n🔄 Decompressing $backupFile..." -ForegroundColor Green
$tempSqlFile = "restore_temp.sql"

try {
    $inStream = [System.IO.File]::OpenRead($fullBackupPath)
    $outStream = [System.IO.File]::Create($tempSqlFile)
    $gzipStream = New-Object System.IO.Compression.GzipStream($inStream, [System.IO.Compression.CompressionMode]::Decompress)
    $gzipStream.CopyTo($outStream)
    $gzipStream.Dispose()
    $inStream.Dispose()
    $outStream.Dispose()
    
    $decompressedSize = (Get-Item $tempSqlFile).Length
    Write-Host "✅ Decompressed: $("{0:N2} MB" -f ($decompressedSize / 1MB))" -ForegroundColor Green
} catch {
    Write-Host "❌ Decompression failed: $_" -ForegroundColor Red
    docker-compose up -d
    return
}
Write-Host "---------------------------------------------------------------"

# 6. Copy SQL file into postgres container
Write-Host "Copying SQL file to container..." -ForegroundColor Yellow
docker cp $tempSqlFile ecoride-postgres:/tmp/restore.sql

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to copy file to container" -ForegroundColor Red
    Remove-Item $tempSqlFile -Force -ErrorAction SilentlyContinue
    docker-compose up -d
    return
}

# 7. Clean incompatible commands from SQL file
Write-Host "Removing incompatible PostgreSQL commands..." -ForegroundColor Yellow
docker exec ecoride-postgres bash -c @"
sed -i 's/\\\\restrict/-- \\\\restrict (removed - not supported in PG15)/g' /tmp/restore.sql
sed -i 's/\\\\unrestrict/-- \\\\unrestrict (removed - not supported in PG15)/g' /tmp/restore.sql
sed -i '/SET transaction_timeout/d' /tmp/restore.sql
"@

# 8. Drop and recreate database (clean slate)
Write-Host "🔄 Dropping existing database..." -ForegroundColor Yellow
docker exec ecoride-postgres psql -U postgres -c "DROP DATABASE IF EXISTS ecoride;"
docker exec ecoride-postgres psql -U postgres -c "CREATE DATABASE ecoride;"
Write-Host "✅ Database recreated" -ForegroundColor Green
Write-Host ""

# 9. Perform restore
Write-Host "🔄 Restoring database (this may take a few minutes)..." -ForegroundColor Green
$restoreStart = Get-Date
docker exec ecoride-postgres psql -U postgres -d ecoride -f /tmp/restore.sql 2>&1 | Out-Null
$restoreDuration = (Get-Date) - $restoreStart

# 10. Check result
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Restore completed in $("{0:N1}" -f $restoreDuration.TotalSeconds) seconds!" -ForegroundColor Green
    
    # Cleanup
    docker exec ecoride-postgres rm /tmp/restore.sql
    Remove-Item $tempSqlFile -Force
} else {
    Write-Host "❌ Restore failed with exit code: $LASTEXITCODE" -ForegroundColor Red
    Write-Host "ℹ️ Temp files retained for debugging:" -ForegroundColor Yellow
    Write-Host "   - Local: $tempSqlFile" -ForegroundColor Yellow
    Write-Host "   - Container: /tmp/restore.sql" -ForegroundColor Yellow
}
Write-Host "---------------------------------------------------------------"

# 11. Restart services
Write-Host "🔄 Restarting services..." -ForegroundColor Yellow
docker-compose up -d
Start-Sleep -Seconds 5
Write-Host "---------------------------------------------------------------"

# 12. Verify data
Write-Host "📊 Database stats:" -ForegroundColor Cyan
docker exec ecoride-postgres psql -U postgres -d ecoride -c "
SELECT 'users' as table_name, COUNT(*) as count FROM users
UNION ALL SELECT 'drivers', COUNT(*) FROM drivers
UNION ALL SELECT 'rides', COUNT(*) FROM rides
UNION ALL SELECT 'vehicles', COUNT(*) FROM vehicles;
"
Write-Host "✅ Restore workflow complete!" -ForegroundColor Green
Write-Host "ℹ️ Test the API at: http://localhost:5000/health" -ForegroundColor Cyan
Write-Host "==============================================================="
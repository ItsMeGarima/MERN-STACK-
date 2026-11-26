# Backend ko restart karne ke liye script

Write-Host "🔄 Stopping all Node processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

Write-Host "✓ All Node processes stopped" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Starting backend server..." -ForegroundColor Cyan
Write-Host ""

cd backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start"

Write-Host "✓ Backend started on http://localhost:3001" -ForegroundColor Green
Write-Host ""
Write-Host "Now try logging in with password: admin" -ForegroundColor Yellow

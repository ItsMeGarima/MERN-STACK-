# Garimaa Jewellers - Backend Startup Script
# This script starts the backend server properly

Write-Host ""
Write-Host "✦ Starting Garimaa Jewellers Backend ✦" -ForegroundColor Yellow
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "backend/server.js")) {
    Write-Host "❌ Error: Run this script from project root (garimaa folder)" -ForegroundColor Red
    exit 1
}

# Kill any existing process on port 3001
Write-Host "🔍 Checking port 3001..." -ForegroundColor Cyan
$existing = Get-NetTCPConnection -LocalPort 3001 -State Listen -ErrorAction SilentlyContinue
if ($existing) {
    Write-Host "⚠️  Port 3001 is busy. Clearing..." -ForegroundColor Yellow
    $existing | Select-Object -ExpandProperty OwningProcess | Select-Object -Unique | ForEach-Object {
        Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue
    }
    Start-Sleep -Seconds 2
    Write-Host "✅ Port 3001 cleared" -ForegroundColor Green
}

# Start backend
Write-Host ""
Write-Host "🚀 Starting backend server..." -ForegroundColor Cyan
Set-Location backend

# Start server
Start-Process powershell -ArgumentList "-NoExit", "-Command", "node server.js" -WindowStyle Normal

Start-Sleep -Seconds 3

# Verify backend is running
Write-Host ""
Write-Host "🔍 Verifying backend..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3001/api/categories" -UseBasicParsing -TimeoutSec 5
    Write-Host ""
    Write-Host "✅ Backend is running successfully!" -ForegroundColor Green
    Write-Host "✅ Port: 3001" -ForegroundColor Green
    Write-Host "✅ Database: Connected" -ForegroundColor Green
    Write-Host "✅ Categories: $($response.Count)" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Backend URL: http://localhost:3001" -ForegroundColor Cyan
    Write-Host "📊 API Endpoints:" -ForegroundColor Cyan
    Write-Host "   - GET  /api/categories" -ForegroundColor Gray
    Write-Host "   - GET  /api/products" -ForegroundColor Gray
    Write-Host "   - POST /api/orders" -ForegroundColor Gray
    Write-Host ""
    Write-Host "✦ Backend ready! Start frontend with: cd frontend ; npm run dev ✦" -ForegroundColor Yellow
    Write-Host ""
} catch {
    Write-Host ""
    Write-Host "❌ Backend failed to start!" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Try running manually:" -ForegroundColor Yellow
    Write-Host "   cd backend" -ForegroundColor Gray
    Write-Host "   node server.js" -ForegroundColor Gray
}

Set-Location ..

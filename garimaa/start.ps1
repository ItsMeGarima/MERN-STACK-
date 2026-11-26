# Fashion Store - Quick Start Script
# Dono backend aur frontend ek saath start karne ke liye

Write-Host "🚀 Fashion Store Starting..." -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exist
if (-not (Test-Path "backend/node_modules")) {
    Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
    Set-Location backend
    npm install
    Set-Location ..
    Write-Host "✓ Backend dependencies installed" -ForegroundColor Green
}

if (-not (Test-Path "frontend/node_modules")) {
    Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
    Set-Location frontend
    npm install
    Set-Location ..
    Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "🔥 Starting servers..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend: http://localhost:3001" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Yellow
Write-Host ""

# Start backend in background
$backend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm start" -PassThru

# Wait 2 seconds for backend to start
Start-Sleep -Seconds 2

# Start frontend in background
$frontend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev" -PassThru

Write-Host "✓ Servers started!" -ForegroundColor Green
Write-Host ""
Write-Host "Press Enter to stop all servers..." -ForegroundColor Yellow
Read-Host

# Cleanup
Stop-Process -Id $backend.Id -Force
Stop-Process -Id $frontend.Id -Force

Write-Host ""
Write-Host "👋 Servers stopped. Bye!" -ForegroundColor Cyan

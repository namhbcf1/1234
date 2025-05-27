Write-Host "=== TRUONG PHAT COMPUTER - Local Test Server ===" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node -v
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Node.js is not installed. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    Write-Host "and try again."
    Read-Host "Press Enter to exit"
    exit
}

Write-Host "Starting local server on port 3000..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Open your browser and go to: http://localhost:3000/" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server." -ForegroundColor Yellow
Write-Host ""

# Start the server
node test-server.js

Read-Host "Press Enter to exit" 
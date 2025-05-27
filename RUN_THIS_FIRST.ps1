Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "         TRUONG PHAT COMPUTER - PC BUILDER SETUP" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Welcome to the PC Builder application!" -ForegroundColor Yellow
Write-Host ""
Write-Host "This script will help you navigate the different options:"
Write-Host ""
Write-Host "1. To simply VIEW the PC builder in your browser:" -ForegroundColor Green
Write-Host "   - Double-click on 'index.html' file"
Write-Host ""
Write-Host "2. To TEST the application with a local server:" -ForegroundColor Green
Write-Host "   - Run 'start-server.bat' (or .ps1 for PowerShell)"
Write-Host "   - Open browser and go to http://localhost:3000"
Write-Host ""
Write-Host "3. To VIEW ONLY the configuration table:" -ForegroundColor Green
Write-Host "   - Double-click on 'config-table.html' file"
Write-Host ""
Write-Host "4. To UPLOAD changes to GitHub:" -ForegroundColor Green
Write-Host "   - Run 'upload-to-github.bat' (or .ps1 for PowerShell)"
Write-Host "   - Follow the prompts on screen"
Write-Host ""
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "What would you like to do?" -ForegroundColor Yellow
Write-Host ""
Write-Host "[1] Open index.html directly" -ForegroundColor White
Write-Host "[2] Start local server" -ForegroundColor White
Write-Host "[3] Open config table only" -ForegroundColor White
Write-Host "[4] Upload to GitHub" -ForegroundColor White
Write-Host "[5] Exit" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter your choice (1-5)"

switch ($choice) {
    "1" {
        Write-Host "Opening index.html..." -ForegroundColor Green
        Start-Process "index.html"
    }
    "2" {
        Write-Host "Starting local server..." -ForegroundColor Green
        Start-Process "powershell" -ArgumentList "-File start-server.ps1"
        Start-Sleep -Seconds 3
        Start-Process "http://localhost:3000"
    }
    "3" {
        Write-Host "Opening config-table.html..." -ForegroundColor Green
        Start-Process "config-table.html"
    }
    "4" {
        Write-Host "Starting GitHub upload process..." -ForegroundColor Green
        Start-Process "powershell" -ArgumentList "-File upload-to-github.ps1"
    }
    "5" {
        Write-Host "Exiting..." -ForegroundColor Yellow
    }
    default {
        Write-Host "Invalid choice. Exiting..." -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Thank you for using TRUONG PHAT COMPUTER PC Builder!" -ForegroundColor Cyan
Read-Host "Press Enter to exit" 
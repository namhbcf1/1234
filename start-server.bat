@echo off
echo === TRUONG PHAT COMPUTER - Local Test Server ===
echo.

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install Node.js from https://nodejs.org/
    echo and try again.
    pause
    exit /b
)

echo Starting local server on port 3000...
echo.
echo Open your browser and go to: http://localhost:3000/
echo.
echo Press Ctrl+C to stop the server.
echo.

node test-server.js

pause 
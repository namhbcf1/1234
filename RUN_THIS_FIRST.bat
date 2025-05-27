@echo off
color 0A
echo ========================================================
echo         TRUONG PHAT COMPUTER - PC BUILDER SETUP
echo ========================================================
echo.
echo Welcome to the PC Builder application!
echo.
echo This script will help you navigate the different options:
echo.
echo 1. To simply VIEW the PC builder in your browser:
echo    - Double-click on "index.html" file
echo.
echo 2. To TEST the application with a local server:
echo    - Run "start-server.bat" (or .ps1 for PowerShell)
echo    - Open browser and go to http://localhost:3000
echo.
echo 3. To VIEW ONLY the configuration table:
echo    - Double-click on "config-table.html" file
echo.
echo 4. To UPLOAD changes to GitHub:
echo    - Run "upload-to-github.bat" (or .ps1 for PowerShell)
echo    - Follow the prompts on screen
echo.
echo ========================================================
echo.
echo What would you like to do?
echo.
echo [1] Open index.html directly
echo [2] Start local server
echo [3] Open config table only
echo [4] Upload to GitHub
echo [5] Exit
echo.

choice /C 12345 /N /M "Enter your choice (1-5): "

if %ERRORLEVEL% EQU 1 (
    echo Opening index.html...
    start index.html
    goto end
)
if %ERRORLEVEL% EQU 2 (
    echo Starting local server...
    start start-server.bat
    timeout /t 3 >nul
    start http://localhost:3000
    goto end
)
if %ERRORLEVEL% EQU 3 (
    echo Opening config-table.html...
    start config-table.html
    goto end
)
if %ERRORLEVEL% EQU 4 (
    echo Starting GitHub upload process...
    start upload-to-github.bat
    goto end
)
if %ERRORLEVEL% EQU 5 (
    echo Exiting...
    goto end
)

:end
echo.
echo Thank you for using TRUONG PHAT COMPUTER PC Builder!
pause 
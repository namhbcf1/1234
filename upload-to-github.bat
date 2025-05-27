@echo off
echo === TRUONG PHAT COMPUTER - GitHub Upload Script ===
echo.

REM Check if git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Git is not installed. Please install Git from https://git-scm.com/downloads
    echo and try again.
    pause
    exit /b
)

REM Check if this is already a git repository
if not exist .git (
    echo Initializing Git repository...
    git init
    
    echo Adding remote repository...
    set /p repo_url=Enter your GitHub repository URL: 
    git remote add origin %repo_url%
) else (
    echo Git repository already exists.
)

REM Add all files
echo.
echo Adding all files to Git...
git add .

REM Commit changes
echo.
echo Committing changes...
set /p commit_message=Enter commit message (or press Enter for default): 
if "%commit_message%"=="" set commit_message=Update PC Builder interface with fixed configuration tables

git commit -m "%commit_message%"

REM Push to GitHub
echo.
echo Pushing to GitHub...
git push -u origin master

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Failed to push to GitHub. You might need to:
    echo 1. Create a new repository on GitHub
    echo 2. Run the following commands:
    echo    git remote add origin YOUR_REPOSITORY_URL
    echo    git push -u origin master
    pause
) else (
    echo.
    echo Successfully uploaded to GitHub!
    pause
) 
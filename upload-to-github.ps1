Write-Host "=== TRUONG PHAT COMPUTER - GitHub Upload Script ===" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "Git version: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "Git is not installed. Please install Git from https://git-scm.com/downloads" -ForegroundColor Red
    Write-Host "and try again."
    Read-Host "Press Enter to exit"
    exit
}

# Check if this is already a git repository
if (-not (Test-Path .git)) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    
    Write-Host "Adding remote repository..." -ForegroundColor Yellow
    $repoUrl = Read-Host "Enter your GitHub repository URL"
    git remote add origin $repoUrl
} else {
    Write-Host "Git repository already exists." -ForegroundColor Green
}

# Add all files
Write-Host ""
Write-Host "Adding all files to Git..." -ForegroundColor Yellow
git add .

# Commit changes
Write-Host ""
Write-Host "Committing changes..." -ForegroundColor Yellow
$commitMessage = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrEmpty($commitMessage)) {
    $commitMessage = "Update PC Builder interface with fixed configuration tables"
}

git commit -m $commitMessage

# Push to GitHub
Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin master

$exitCode = $LASTEXITCODE
if ($exitCode -ne 0) {
    Write-Host ""
    Write-Host "Failed to push to GitHub. You might need to:" -ForegroundColor Red
    Write-Host "1. Create a new repository on GitHub" -ForegroundColor Yellow
    Write-Host "2. Run the following commands:" -ForegroundColor Yellow
    Write-Host "   git remote add origin YOUR_REPOSITORY_URL" -ForegroundColor Cyan
    Write-Host "   git push -u origin master" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "Successfully uploaded to GitHub!" -ForegroundColor Green
}

Read-Host "Press Enter to exit" 
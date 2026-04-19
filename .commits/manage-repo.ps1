# Ecoride Repository Management Script
# Manages git operations with version-based commits and tags
# Usage:
# # List available versions
# .\.commits\manage-repo.ps1

# # Complete release (recommended)
# pwsh .\.commits\manage-repo.ps1 -Action release -Version v0.1.0-alpha -Deploy public -Release private

# # Individual steps
# pwsh .\.commits\manage-repo.ps1 -Action add
# pwsh .\.commits\manage-repo.ps1 -Action commit -Version v0.1.0-alpha
# pwsh .\.commits\manage-repo.ps1 -Action push
# pwsh .\.commits\manage-repo.ps1 -Action tag -Version v0.1.0-alpha

# # Custom remote/branch
# pwsh .\.commits\manage-repo.ps1 -Action release -Version v0.1.0-alpha -Remote upstream -Branch develop -Type minor -Deploy public -Release private

param(
    [Parameter(Mandatory=$false)]
    [string]$Action = "list",
    
    [Parameter(Mandatory=$false)]
    [string]$Version = "",
    
    [Parameter(Mandatory=$false)]
    [string]$Remote = "origin",
    
    [Parameter(Mandatory=$false)]
    [string]$Branch = "main",

    [Parameter(Mandatory=$false)]
    [string]$Type = "minor",

    [Parameter(Mandatory=$false)]
    [string]$Deploy = "private",

    [Parameter(Mandatory=$false)]
    [string]$Release = "private"
)

# Color output functions
function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
    Write-Host "----------------------------------------" -ForegroundColor Green
}

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Cyan
    Write-Host "----------------------------------------" -ForegroundColor Cyan
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
    Write-Host "----------------------------------------" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
    Write-Host "----------------------------------------" -ForegroundColor Red
}

# Get available versions from .commits directory
function Get-AvailableVersions {
    $commitsDir = Join-Path $PSScriptRoot "."
    $txtFiles = Get-ChildItem -Path $commitsDir -Filter "*.txt" | Where-Object { $_.Name -match '\d+\.\d+\.\d+.*\.txt$' }
    
    $versions = @()
    foreach ($file in $txtFiles) {
        $versionName = $file.BaseName
        $versions += $versionName
    }
    
    return $versions | Sort-Object
}

# Display available versions
function Show-AvailableVersions {
    Write-Info "Available versions in .commits/ directory:"
    Write-Host ""
    
    $versions = Get-AvailableVersions
    
    if ($versions.Count -eq 0) {
        Write-Warning "No version files found in .commits/ directory"
        Write-Info "Expected format: v*.txt (e.g., v0.1.0-alpha.txt)"
        return $false
    }
    
    foreach ($version in $versions) {
        $filePath = Join-Path $PSScriptRoot "$version.txt"
        $fileInfo = Get-Item $filePath
        Write-Host "  📦 $version" -ForegroundColor Yellow
        Write-Host "     Created: $($fileInfo.CreationTime)" -ForegroundColor DarkGray
        Write-Host "     Size: $($fileInfo.Length) bytes" -ForegroundColor DarkGray
        Write-Host ""
    }
    
    return $true
}

# Validate version exists
function Test-VersionExists {
    param([string]$VersionNumber)
    
    $versionFile = Join-Path $PSScriptRoot "$VersionNumber.txt"
    
    if (-not (Test-Path $versionFile)) {
        Write-Error "Version file not found: $versionFile"
        Write-Info "Available versions:"
        $versions = Get-AvailableVersions
        foreach ($v in $versions) {
            Write-Host "  - $v" -ForegroundColor Yellow
        }
        return $false
    }
    
    return $true
}

# Check if git repository exists
function Test-GitRepository {
    $gitDir = Join-Path (Split-Path $PSScriptRoot -Parent) ".git"
    
    if (-not (Test-Path $gitDir)) {
        Write-Error "Not a git repository. Initialize with: git init"
        return $false
    }
    
    return $true
}

# Check git status
function Show-GitStatus {
    Write-Info "Git Status:"
    Write-Host ""
    git status --short
    Write-Host ""
}

# Force repository to be public (if needed)
function Set-RepoPublic {
    Write-Info "Making repository public..."
    gh repo edit --visibility public --accept-visibility-change-consequences

    if ($LASTEXITCODE -eq 0) {
        Write-Success "Repository visibility set to public"
        return $true
    } else {
        Write-Error "Failed to change repository visibility"
        return $false
    }
}

# Stage all changes
function Invoke-GitAdd {
    Write-Info "Staging all changes..."
    git add .
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "All changes staged successfully"
        return $true
    } else {
        Write-Error "Failed to stage changes"
        return $false
    }
}

# Commit with version message
function Invoke-GitCommit {
    param([string]$VersionNumber)
    
    $commitMessageFile = Join-Path $PSScriptRoot "$VersionNumber.txt"
    
    Write-Info "Committing with message from: $commitMessageFile"
    
    # Read first few lines for preview
    $preview = Get-Content $commitMessageFile -TotalCount 3
    Write-Host ""
    Write-Host "Commit Message Preview:" -ForegroundColor Cyan
    foreach ($line in $preview) {
        Write-Host "  $line" -ForegroundColor DarkGray
    }
    Write-Host "  ..." -ForegroundColor DarkGray
    Write-Host ""
    
    git commit -F $commitMessageFile
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Commit created successfully"
        return $true
    } else {
        Write-Error "Failed to create commit"
        return $false
    }
}

# Create and push tag
function Invoke-GitTag {
    param(
        [string]$VersionNumber,
        [string]$Remote
    )   
    
    Write-Info "Creating tag: $VersionNumber"
    
    # Check if tag already exists
    $existingTag = git tag -l $VersionNumber
    if ($existingTag) {
        Write-Warning "Tag $VersionNumber already exists locally"
        $response = Read-Host "Do you want to delete and recreate it? ([y]/N)"
        if ($response -eq 'y' -or $response -eq 'Y' -or $response -eq '') {
            git tag -d $VersionNumber
            Write-Info "Deleted existing local tag"
        } else {
            Write-Info "Skipping tag creation"
            return $false
        }
    }
    
    # Create annotated tag with message from file
    $tagMessageFile = Join-Path $PSScriptRoot "$VersionNumber.txt"
    git tag -a $VersionNumber -F $tagMessageFile
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Tag $VersionNumber created successfully"
        
        # Push tag to remote
        Write-Info "Pushing tag to $Remote..."
        git push $Remote $VersionNumber --force
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Tag pushed to $Remote"
            return $true
        } else {
            Write-Error "Failed to push tag to $Remote"
            return $false
        }
    } else {
        Write-Error "Failed to create tag"
        return $false
    }

    # Create GitHub release using CLI if -Type is "major"
    if ($Type -eq "major") {
        Write-Info "Creating GitHub release for major version..."
        $releaseMessageFile = Join-Path $PSScriptRoot "$VersionNumber.txt"
        gh release create "$VersionNumber" --title "$VersionNumber" --notes-file $releaseMessageFile --target dev/paulnamalomba
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Release $VersionNumber created successfully"
            
            # Push tag to remote
            # Write-Info "Pushing release to $Remote..."
            # # git push $Remote $VersionNumber --force
            
            if ($LASTEXITCODE -eq 0) {
                Write-Success "Release pushed to $Remote"
                return $true
            } else {
                Write-Error "Failed to push release to $Remote"
                return $false
            }
        } else {
            Write-Error "Failed to create release"
            return $false
        }    
    }
}

# Push to remote
function Invoke-GitPush {
    param(
        [string]$Remote,
        [string]$Branch,
        [string]$Deploy,
        [int]$Retries = 3,
        [int]$RetryDelaySeconds = 10
    )

    for ($attempt = 1; $attempt -le $Retries; $attempt++) {
        Write-Info "Pushing to $Remote/$Branch... (attempt $attempt of $Retries)"
        git push $Remote $Branch

        if ($LASTEXITCODE -eq 0) {
            Write-Success "Pushed to $Remote/$Branch successfully"
            return $true
        }

        if ($attempt -lt $Retries) {
            Write-Warning "Push failed. Waiting $RetryDelaySeconds seconds before retrying..."
            Start-Sleep -Seconds $RetryDelaySeconds
        }
    }

    Write-Error "Failed to push to $Remote/$Branch after $Retries attempts"
    return $false
}

function Get-RepositoryWebUrl {
    param([string]$Remote = 'origin')

    $remoteUrl = git remote get-url $Remote 2>$null
    if ([string]::IsNullOrWhiteSpace($remoteUrl)) {
        return $null
    }

    if ($remoteUrl -match '^https://github.com/(?<owner>[^/]+)/(?<repo>[^/]+?)(\.git)?$') {
        return "https://github.com/$($Matches.owner)/$($Matches.repo)"
    }

    if ($remoteUrl -match '^git@github\.com:(?<owner>[^/]+)/(?<repo>[^/]+?)(\.git)?$') {
        return "https://github.com/$($Matches.owner)/$($Matches.repo)"
    }

    return $null
}

# Set back to private automatically after public deployment (if needed)
function Set-RepoPrivate {
    param (
        [int]$Sleep = 180
    )

    Write-Info "Deployment: Sleeping $Sleep seconds to allow deployment..."
    $sleepEnd = (Get-Date).AddSeconds($Sleep)

    while ((Get-Date) -lt $sleepEnd) {
        $remaining = $sleepEnd - (Get-Date)
        Write-Host -NoNewline "`rTime remaining: $([math]::Ceiling($remaining.TotalSeconds)) seconds     " -ForegroundColor DarkGray
        Start-Sleep -Milliseconds 1000
    }

    Write-Info "Setting repository back to private..."
    gh repo edit --visibility private --accept-visibility-change-consequences
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Repository visibility set to private"
        return $true
    } else {
        Write-Error "Failed to change repository visibility"
        return $false
    }
}


# Complete release workflow
function Invoke-Release {
    param(
        [string]$VersionNumber,
        [string]$Remote,
        [string]$Branch
    )
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  Ecoride Admin Release: $VersionNumber" -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    
    # Validate
    if (-not (Test-GitRepository)) { return }
    if (-not (Test-VersionExists -VersionNumber $VersionNumber)) { return }
    
    # Show current status
    Show-GitStatus
    
    # Confirm
    Write-Warning "This will:"
    Write-Host "  1. Stage all changes (git add .)" -ForegroundColor Yellow
    Write-Host "  2. Commit with message from .commits/$VersionNumber.txt" -ForegroundColor Yellow
    Write-Host "  3. Create tag $VersionNumber" -ForegroundColor Yellow
    Write-Host "  4. Push to $Remote/$Branch" -ForegroundColor Yellow
    Write-Host "  5. Push tag $VersionNumber to $Remote" -ForegroundColor Yellow
    Write-Host ""
    
    $confirm = Read-Host "Continue? ([y]/N)"
    if ($confirm -ne 'y' -and $confirm -ne 'Y' -and $confirm -ne '') {
        Write-Info "Release cancelled"
        return
    }
    
    Write-Host ""
    
    # Execute workflow
    if (-not (Invoke-GitAdd)) { return }
    if (-not (Invoke-GitCommit -VersionNumber $VersionNumber)) { return }
    if ($Deploy -eq "public") {
        if (-not (Set-RepoPublic)) { return }
    }
     if (-not (Invoke-GitPush -Remote $Remote -Branch $Branch -Deploy $Deploy)) { return }
    if (-not (Invoke-GitTag -VersionNumber $VersionNumber -Remote $Remote)) { return }
    if ($Release -eq "private") {
       if(-not (Set-RepoPrivate -Sleep 180)) { return }
    }
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Success "Release $VersionNumber completed!"
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Info "View release on GitHub:"
    $repoUrl = Get-RepositoryWebUrl -Remote $Remote
    if ($repoUrl) {
        Write-Host "  $repoUrl/releases/tag/$VersionNumber" -ForegroundColor Cyan
    } else {
        Write-Host "  Unable to determine repository URL from remote '$Remote'" -ForegroundColor Yellow
    }
    Write-Host ""
}

# Main script logic
switch ($Action.ToLower()) {
    "list" {
        Show-AvailableVersions
    }
    
    "status" {
        if (-not (Test-GitRepository)) { exit 1 }
        Show-GitStatus
    }
    
    "release" {
        if ([string]::IsNullOrWhiteSpace($Version)) {
            Write-Error "Version number required for release action"
            Write-Info "Usage: .\manage-repo.ps1 -Action release -Version v0.1.0-alpha"
            Write-Host ""
            Show-AvailableVersions
            exit 1
        }
        
        Invoke-Release -VersionNumber $Version -Remote $Remote -Branch $Branch
    }
    
    "add" {
        if (-not (Test-GitRepository)) { exit 1 }
        Invoke-GitAdd
    }
    
    "commit" {
        if ([string]::IsNullOrWhiteSpace($Version)) {
            Write-Error "Version number required for commit action"
            Write-Info "Usage: .\manage-repo.ps1 -Action commit -Version v0.1.0-alpha"
            exit 1
        }
        
        if (-not (Test-GitRepository)) { exit 1 }
        if (-not (Test-VersionExists -VersionNumber $Version)) { exit 1 }
        Invoke-GitCommit -VersionNumber $Version
    }
    
    "tag" {
        if ([string]::IsNullOrWhiteSpace($Version)) {
            Write-Error "Version number required for tag action"
            Write-Info "Usage: .\manage-repo.ps1 -Action tag -Version v0.1.0-alpha"
            exit 1
        }
        
        if (-not (Test-GitRepository)) { exit 1 }
        if (-not (Test-VersionExists -VersionNumber $Version)) { exit 1 }
        Invoke-GitTag -VersionNumber $Version -Remote $Remote
    }
    
    "push" {
        if (-not (Test-GitRepository)) { exit 1 }
        Invoke-GitPush -Remote $Remote -Branch $Branch
    }
    
    "help" {
        Write-Host ""
        Write-Host "Ecoride Repository Management Script" -ForegroundColor Cyan
        Write-Host "====================================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Usage:" -ForegroundColor Yellow
        Write-Host "  .\manage-repo.ps1 [-Action <action>] [-Version <version>] [-Remote <remote>] [-Branch <branch>]"
        Write-Host ""
        Write-Host "Actions:" -ForegroundColor Yellow
        Write-Host "  list       - List available versions in .commits/ directory (default)"
        Write-Host "  status     - Show git status"
        Write-Host "  release    - Complete release workflow (add, commit, push, tag)"
        Write-Host "  add        - Stage all changes (git add .)"
        Write-Host "  commit     - Commit with version message (git commit -F .commits/VERSION.txt)"
        Write-Host "  tag        - Create and push tag"
        Write-Host "  push       - Push to remote branch"
        Write-Host "  help       - Show this help message"
        Write-Host ""
        Write-Host "Parameters:" -ForegroundColor Yellow
        Write-Host "  -Version   - Version number (e.g., v0.1.0-alpha)"
        Write-Host "  -Remote    - Git remote name (default: origin)"
        Write-Host "  -Branch    - Git branch name (default: main)"
        Write-Host ""
        Write-Host "Examples:" -ForegroundColor Yellow
        Write-Host "  .\manage-repo.ps1 -Action list"
        Write-Host "  .\manage-repo.ps1 -Action release -Version v0.1.0-alpha"
        Write-Host "  .\manage-repo.ps1 -Action commit -Version v0.1.0-alpha"
        Write-Host "  .\manage-repo.ps1 -Action tag -Version v0.1.0-alpha -Remote origin"
        Write-Host ""
    }
    
    default {
        Write-Error "Unknown action: $Action"
        Write-Info "Use -Action help for usage information"
        exit 1
    }
}
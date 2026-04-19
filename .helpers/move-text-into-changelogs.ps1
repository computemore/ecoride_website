<#
.SYNOPSIS
    Migrates commit logs into main and minor changelog files.
.DESCRIPTION
    Extracts text from `./.commits/*.txt`, formats it, and cleanly inserts it into 
    the active logging area of `./CHANGELOG.md` or `./docs/minor-changelogs/{version}.md`,
    strictly bypassing the Table of Contents.
.PARAMETER Version
    Specifies a particular version to target (e.g., '1.0.12.16' or '1.0.10'). If omitted, processes all files.
#>

[CmdletBinding()]
param (
    [Parameter(Mandatory=$false, HelpMessage="Specific version to process (e.g. 1.0.12.16)")]
    [string]$Version
)

$ErrorActionPreference = "Stop"

# 1. Resolve paths
$ProjectRoot  = (Resolve-Path "$PSScriptRoot\..").Path
$CommitsDir   = Join-Path $ProjectRoot ".commits"
$MainLogPath  = Join-Path $ProjectRoot "CHANGELOG.md"
$MinorDocsDir = Join-Path $ProjectRoot "docs\minor-changelogs"

if (-not (Test-Path $CommitsDir)) {
    Write-Host "The directory $CommitsDir does not exist. The pipeline has nothing to process."
    exit
}

# 2. Grab text files in the commits directory
if ([string]::IsNullOrWhiteSpace($Version)) {
    $CommitFiles = Get-ChildItem -Path $CommitsDir -Filter "*.txt"
} else {
    $EscapedParamVersion = [regex]::Escape($Version)
    $CommitFiles = Get-ChildItem -Path $CommitsDir -Filter "$Version*.txt" | Where-Object {
        $_.BaseName -eq $Version -or $_.BaseName -match "^$EscapedParamVersion\..+"
    }
}

if ($CommitFiles.Count -eq 0) {
    Write-Host "No commit text files found."
    exit
}

foreach ($File in $CommitFiles) {
    $FileName = $File.BaseName
    $IsMinor  = $false
    $ParsedVersion = ""
    $TargetFile = ""

    # Core vs Minor Routing
    if ($FileName -match "^(?<core>\d+\.\d+\.\d+(?:-[a-zA-Z0-9]+)?)(?:\.(?<ext>.+))?$") {
        $CoreVersion = $Matches['core']
        $Extension = $Matches['ext']

        if ([string]::IsNullOrWhiteSpace($Extension)) {
            $IsMinor = $false
            $ParsedVersion = $CoreVersion
            $TargetFile = $MainLogPath
        } else {
            $IsMinor = $true
            $ParsedVersion = "$CoreVersion.$Extension"
            $TargetFile = Join-Path $MinorDocsDir "$CoreVersion.md"
        }
    } else {
        Write-Warning "File '$($File.Name)' deviates from expected version format. Skipping."
        continue
    }

    # 3. Extract payload and Sanitize Source Dashes
    $RawText = Get-Content $File.FullName -Raw
    $StartIndex = $RawText.IndexOf("##")
    
    if ($StartIndex -lt 0) {
        Write-Warning "No '##' header found in $($File.Name). Skipping."
        continue
    }

    $ExtractedText = $RawText.Substring($StartIndex).Trim()
    
    # Strip ANY existing trailing dashes from the source file to prevent double separators
    $ExtractedText = $ExtractedText -replace "(?sm)\s*(---[\s]*)+$", ""
    
    $NewContentBlock = $ExtractedText + "`n`n---`n"

    # 4. Target Integration
    if (-not (Test-Path $TargetFile)) {
        $TargetDir = Split-Path $TargetFile
        if (-not (Test-Path $TargetDir)) { New-Item -ItemType Directory -Path $TargetDir | Out-Null }
        
        Set-Content -Path $TargetFile -Value ($NewContentBlock.TrimStart() + "`n")
        Write-Host "Generated new file and inserted payload -> $TargetFile"
    } else {
        $ExistingText = Get-Content $TargetFile -Raw
        if ($null -eq $ExistingText) { $ExistingText = "" }

        # --- QUARANTINE THE CONTENTS BLOCK ---
        $TopMatter = ""
        $BodyText = $ExistingText

        # Strict Regex match for "## Contents"
        $ContentsRegex = [regex]"(?m)^## Contents\b"
        $ContentsMatch = $ContentsRegex.Match($ExistingText)
        
        if ($ContentsMatch.Success) {
            # Find the FIRST "---" on a new line AFTER "## Contents"
            $DashRegex = [regex]"(?m)^---\s*$"
            $DashMatch = $DashRegex.Match($ExistingText, $ContentsMatch.Index)
            
            if ($DashMatch.Success) {
                # Split immediately after the separator
                $SplitPoint = $DashMatch.Index + $DashMatch.Length
                $TopMatter = $ExistingText.Substring(0, $SplitPoint)
                $BodyText = $ExistingText.Substring($SplitPoint)
            } else {
                # Edge case fallback if no separator exists below contents
                $TopMatter = $ExistingText.Substring(0, $ContentsMatch.Index)
                $BodyText = $ExistingText.Substring($ContentsMatch.Index)
            }
        } else {
            # Fallback if no Contents block exists at all (e.g., fresh file)
            $FirstVersionRegex = [regex]"(?m)^## \["
            $FirstVersionMatch = $FirstVersionRegex.Match($ExistingText)
            if ($FirstVersionMatch.Success) {
                $TopMatter = $ExistingText.Substring(0, $FirstVersionMatch.Index)
                $BodyText = $ExistingText.Substring($FirstVersionMatch.Index)
            }
        }

        # --- OPERATE EXCLUSIVELY ON THE HEADLESS BODY ---
        $EscapedVersion = [regex]::Escape($ParsedVersion)
        $VersionExists = $BodyText -match "(?m)^## \[?$EscapedVersion\]?(?=\s|-|$|\])"

        if ($VersionExists) {
            $Prompt = Read-Host "Version $ParsedVersion already exists in $(Split-Path $TargetFile -Leaf). [R]eplace, [A]ppend, or [S]kip?"
            
            if ($Prompt -match "^[aA]") {
                # Strip incoming header for clean append
                $Lines = $ExtractedText -split "`r?`n"
                if ($Lines.Count -gt 0 -and $Lines[0] -match "^## ") {
                    $Lines = if ($Lines.Count -gt 1) { $Lines[1..($Lines.Count-1)] } else { @() }
                }
                $AppendContent = ($Lines -join "`n").Trim()
                $AppendContent = $AppendContent -replace "(?sm)\s*(---[\s]*)+$", ""

                $BlockRegex = "(?sm)^## \[?$EscapedVersion\]?(?=\s|-|$|\]).*?(?=(^## )|\z)"
                $Match = [regex]::Match($BodyText, $BlockRegex)
                
                if ($Match.Success) {
                    $OldBlock = $Match.Value
                    $TrimmedBlock = $OldBlock -replace "(?sm)\s*---[\s]*$", ""
                    $TrimmedBlock = $TrimmedBlock -replace "\s+$", ""
                    
                    $MergedBlock = $TrimmedBlock + "`n`n" + $AppendContent + "`n`n---`n`n"
                    $BodyText = $BodyText.Substring(0, $Match.Index) + $MergedBlock + $BodyText.Substring($Match.Index + $Match.Length)
                    Write-Host "Appended new entries to $ParsedVersion in $(Split-Path $TargetFile -Leaf)."
                }
            }
            elseif ($Prompt -match "^[rR]") {
                $BlockRegex = "(?sm)^## \[?$EscapedVersion\]?(?=\s|-|$|\]).*?(?=(^## )|\z)"
                $BodyText = $BodyText -replace $BlockRegex, ($NewContentBlock + "`n")
                Write-Host "Overwritten existing entry for $ParsedVersion in $(Split-Path $TargetFile -Leaf)."
            }
            else {
                Write-Host "Skipped mapping for $ParsedVersion."
                continue
            }
        } else {
            # Target version does not exist. Prepend it to the top of the BodyText.
            $BodyText = "`n" + $NewContentBlock.Trim() + "`n`n" + $BodyText.TrimStart()
            Write-Host "Piped new entry for $ParsedVersion into $(Split-Path $TargetFile -Leaf)."
        }
        
        # --- REASSEMBLE ---
        if ($TopMatter) {
            # The TopMatter natively holds its boundary '---' from the Regex capture
            $FinalText = $TopMatter.TrimEnd() + "`n`n" + $BodyText.TrimStart()
        } else {
            $FinalText = $BodyText.TrimStart()
        }
        
        Set-Content -Path $TargetFile -Value $FinalText
    }
    
    Write-Host "Processed source artifact: $($File.Name)"
}

Write-Host "Changelog pipeline execution complete."
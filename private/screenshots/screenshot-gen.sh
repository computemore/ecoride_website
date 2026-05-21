#!/bin/zsh

# 1. Determine the Page Name
# Priority: Argument > Env Variable > Interactive Prompt
if [[ -n "$1" ]]; then
    pageName="$1"
elif [[ -n "$PAGE_NAME" ]]; then
    pageName="$PAGE_NAME"
else
    printf "Enter Page Name (e.g., Activity Page): "
    read -r pageName
fi

# Exit if we still have no name
if [[ -z "$pageName" ]]; then
    echo "Error: No page name provided."
    exit 1
fi

# 2. Normalize the Name
# Lowercase and replace spaces with underscores
normalizedPageName="${${(L)pageName}// /_}.png"

# 3. Define Paths using $(pwd)
# We use absolute paths to ensure the shell and tools don't get confused
currentDir=$(pwd)
rawPath="$currentDir/$normalizedPageName"
framedPath="$currentDir/framed/framed_$normalizedPageName"

echo "Working in: $currentDir"

# 4. Capture Raw Screen
# simctl captures the pixels directly from the display buffer.
# It includes NO notch, NO bezel, and NO macOS window title bar.
echo "Capturing raw pixels for '$pageName'..."
if xcrun simctl io booted screenshot "$rawPath"; then
    echo "Raw screenshot saved: $normalizedPageName"
else
    echo "CRITICAL: Could not save file. Ensure $(pwd) is writable."
    echo "Hint: If this is Macintosh HD root, macOS will block the write."
    exit 1
fi

# 5. Apply the Bezel
# We send the clean pixels to the API to get a high-quality hardware frame.
echo "Uploading to framing API..."
curl -s -X POST 'https://bezel.fit/v1/devices/iphone-17-pro/frame?finish=silver&background=linear:%232c9c8e,%233cdac7,135deg&preset=ig-square&cornerRadius=md' \
     -H 'Content-Type: image/png' \
     --data-binary @"$rawPath" \
     -o "$framedPath"

if [[ -f "$framedPath" ]]; then
    echo "Successfully created: framed_$normalizedPageName"
    # Clean up the raw screenshot if you only want the framed version
    # rm "$rawPath" 
else
    echo "Error: Framing API failed to return an image."
fi
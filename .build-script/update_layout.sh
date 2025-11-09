#!/bin/bash

# Script to update all detail HTML files to new layout
# AI Analysis on top (full width), Document Viewer below

DETAILS_DIR="/Users/giornoadd/my-macos/doi-tung-prototpye/details"

# Loop through all HTML files in details directory
for file in "$DETAILS_DIR"/*.html; do
    filename=$(basename "$file")
    
    # Skip if already updated (check for space-y-6 in section)
    if grep -q '<section class="space-y-6">' "$file"; then
        echo "✓ $filename - Already updated, skipping"
        continue
    fi
    
    echo "Processing $filename..."
    
    # Create backup
    cp "$file" "${file}.bak"
    
    # Use perl for multi-line replacement
    # 1. Change grid gap-6 md:grid-cols-2 to space-y-6
    perl -i -pe 's/<section class="grid gap-6 md:grid-cols-2">/<section class="space-y-6">/g' "$file"
    
    echo "✓ $filename - Layout updated"
done

echo ""
echo "All files processed successfully!"
echo "Backup files created with .bak extension"

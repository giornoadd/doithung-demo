#!/usr/bin/env python3
"""
Add link to admin-prompt-console.html in all detail HTML files
to show which AI Agent (Financial Analyst) is used for analysis
"""

import re
from pathlib import Path

DETAILS_DIR = Path("/Users/giornoadd/my-macos/doi-tung-prototpye/details")

def add_agent_link(filepath):
    """Add Financial Analyst Agent link to detail file"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already has the link
    if 'Financial Analyst Agent' in content or 'Agent Console' in content:
        return False, "Already has agent link"
    
    # Pattern 1: Find the header section with back button
    header_pattern = r'(<header class="flex flex-col[^>]*>.*?<div>.*?<p class="mt-3[^>]*>.*?</p>)\s*(</div>\s*<a href="../dashboard-prototype\.html")'
    
    match = re.search(header_pattern, content, re.DOTALL)
    
    if not match:
        return False, "Could not find header pattern"
    
    # Add agent link after description paragraph
    new_content = content.replace(
        match.group(0),
        match.group(1) + '\n                <p class="mt-2 text-xs text-slate-500">วิเคราะห์โดย: <a href="../prompt/admin-prompt-console.html" target="_blank" class="text-blue-600 hover:text-blue-700 underline">Financial Analyst Agent 📊</a></p>\n            ' + match.group(2)
    )
    
    # Pattern 2: Wrap back button in div and add Agent Console button
    back_button_pattern = r'</div>\s*<a href="../dashboard-prototype\.html" class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900[^>]*>.*?</a>\s*</header>'
    
    back_button_match = re.search(back_button_pattern, new_content, re.DOTALL)
    
    if back_button_match:
        back_button_full = back_button_match.group(0)
        # Extract just the <a> tag
        back_button_tag = re.search(r'<a href="../dashboard-prototype\.html"[^>]*>.*?</a>', back_button_full, re.DOTALL).group(0)
        
        new_buttons = f'''</div>
            <div class="flex flex-col gap-2">
                {back_button_tag}
                <a href="../prompt/admin-prompt-console.html" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 text-slate-700 text-xs font-medium hover:bg-slate-100 transition">
                    <span>🤖</span>
                    Agent Console
                </a>
            </div>
        </header>'''
        
        new_content = new_content.replace(back_button_full, new_buttons)
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    return True, "Added agent link successfully"

def main():
    """Process all detail HTML files"""
    
    # Get all HTML files with Document Viewer (those are detail pages)
    html_files = [f for f in DETAILS_DIR.glob("*.html") if 'Document Viewer' in f.read_text(encoding='utf-8')]
    
    print(f"Found {len(html_files)} detail files to update\n")
    
    updated = 0
    skipped = 0
    
    for filepath in sorted(html_files):
        filename = filepath.name
        success, message = add_agent_link(filepath)
        
        if success:
            print(f"✓ {filename} - {message}")
            updated += 1
        else:
            print(f"⊘ {filename} - {message}")
            skipped += 1
    
    print(f"\n{'='*60}")
    print(f"Updated: {updated} files")
    print(f"Skipped: {skipped} files")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()

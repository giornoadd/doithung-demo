#!/usr/bin/env python3
"""
Batch fix remaining detail HTML files by doing find-and-replace operations
"""

import re
from pathlib import Path

DETAILS_DIR = Path("/Users/giornoadd/my-macos/doi-tung-prototpye/details")

FILES_TO_FIX = [
    "ADV-BK-6910037.html",
    "ADV-BK-6910038.html",
    "PV-BK-6910176.html",
    "PV-BK-6910296.html",
    "PV-BK-6910301.html",
    "PV-BK-6910305.html",
]

def fix_file_manual(filepath):
    """Fix file using manual find-replace approach"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Step 1: Find the section with space-y-6
    if '<section class="space-y-6">' not in content:
        return False, "No space-y-6 section"
    
    # Step 2: Check if already fixed (AI Analysis comes first)
    section_start = content.find('<section class="space-y-6">')
    section_end = content.find('</section>', section_start)
    section_content = content[section_start:section_end + 10]
    
    doc_pos = section_content.find('Document Viewer')
    ai_pos = section_content.find('AI (OCR + LLM) Analysis')
    
    if ai_pos < doc_pos and ai_pos != -1:
        return False, "Already fixed"
    
    # Step 3: Split content into before section, section, and after section
    before_section = content[:section_start]
    after_section = content[section_end + 10:]
    
    # Step 4: Extract individual articles within section
    articles_pattern = r'(<article class="glass panel-shadow card-border rounded-3xl overflow-hidden">.*?</article>)'
    articles = re.findall(articles_pattern, section_content, re.DOTALL)
    
    if len(articles) < 2:
        return False, f"Found {len(articles)} articles, expected 2"
    
    doc_viewer = None
    ai_analysis = None
    badge = None
    
    # Step 5: Identify and process each article
    for article in articles:
        if 'Document Viewer' in article:
            doc_viewer = article
            # Extract badge if exists
            badge_match = re.search(r'<span class="text-xs font-semibold px-3 py-1 rounded-full[^>]*>.*?</span>', article, re.DOTALL)
            if badge_match:
                badge = badge_match.group(0).strip()
        elif 'AI (OCR + LLM) Analysis' in article:
            ai_analysis = article
            # Check for misplaced badge in GL section
            if not badge:
                # Look for badge that's not in the header
                header_end = article.find('</header>')
                content_part = article[header_end:]
                badge_match = re.search(r'<span class="text-xs font-semibold px-3 py-1 rounded-full[^>]*>.*?</span>', content_part, re.DOTALL)
                if badge_match:
                    badge = badge_match.group(0).strip()
    
    if not doc_viewer or not ai_analysis:
        return False, "Could not find both articles"
    
    # Step 6: Fix AI Analysis header structure
    ai_fixed = ai_analysis
    
    # Check if header needs div wrapper
    if '<div>' not in ai_fixed.split('AI (OCR + LLM) Analysis')[0].split('<header')[-1]:
        # Add div wrapper
        ai_fixed = ai_fixed.replace(
            '<header class="px-6 py-4 border-b border-slate-200/70 bg-white/80 flex items-center justify-between">\n                    <h2',
            '<header class="px-6 py-4 border-b border-slate-200/70 bg-white/80 flex items-center justify-between">\n                    <div>\n                        <h2'
        )
        # Close div before header close
        ai_fixed = re.sub(
            r'(<p class="text-xs text-slate-500 mt-1">.*?</p>)\n                </header>',
            r'\1\n                    </div>',
            ai_fixed,
            flags=re.DOTALL
        )
    
    # Step 7: Add badge to AI Analysis header if found
    if badge:
        # Remove badge from its current location
        ai_fixed = ai_fixed.replace(badge, '')
        # Clean up double newlines
        ai_fixed = re.sub(r'\n\s*\n\s*\n', '\n\n', ai_fixed)
        # Add badge before </header>
        ai_fixed = ai_fixed.replace(
            '</header>',
            f'\n                    {badge}\n                </header>'
        )
    
    # Step 8: Clean up Document Viewer (remove badge if exists)
    doc_fixed = doc_viewer
    if badge and badge in doc_fixed:
        doc_fixed = doc_fixed.replace(badge, '')
        doc_fixed = re.sub(r'\n\s*\n\s*\n', '\n\n', doc_fixed)
    
    # Step 9: Rebuild section with AI Analysis first
    new_section = f'<section class="space-y-6">\n            {ai_fixed}\n\n            {doc_fixed}\n        </section>'
    
    # Step 10: Reassemble file
    new_content = before_section + new_section + after_section
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    return True, "Fixed successfully"

def main():
    """Process files"""
    
    print(f"Processing {len(FILES_TO_FIX)} files...\n")
    
    fixed = 0
    skipped = 0
    
    for filename in FILES_TO_FIX:
        filepath = DETAILS_DIR / filename
        
        if not filepath.exists():
            print(f"✗ {filename} - Not found")
            skipped += 1
            continue
        
        success, msg = fix_file_manual(filepath)
        
        if success:
            print(f"✓ {filename} - {msg}")
            fixed += 1
        else:
            print(f"⊘ {filename} - {msg}")
            skipped += 1
    
    print(f"\n{'='*60}")
    print(f"Fixed: {fixed} | Skipped: {skipped}")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()

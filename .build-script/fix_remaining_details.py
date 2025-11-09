#!/usr/bin/env python3
"""
Fix remaining detail HTML files:
1. Swap Document Viewer and AI Analysis positions
2. Move status badge from Document Viewer/middle to AI Analysis header
3. Fix AI Analysis header structure (add div wrapper)
"""

import os
import re
from pathlib import Path

DETAILS_DIR = Path("/Users/giornoadd/my-macos/doi-tung-prototpye/details")

FILES_TO_FIX = [
    "ADV-BK-6910035.html",
    "ADV-BK-6910037.html",
    "ADV-BK-6910038.html",
    "PV-BK-6910176.html",
    "PV-BK-6910296.html",
    "PV-BK-6910301.html",
    "PV-BK-6910305.html",
]

def fix_file(filepath):
    """Fix single HTML file"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if file needs fixing (Document Viewer comes before AI Analysis)
    section_match = re.search(r'<section class="space-y-6">(.*?)</section>', content, re.DOTALL)
    if not section_match:
        return False, "No space-y-6 section found"
    
    section_content = section_match.group(1)
    
    # Check order
    doc_viewer_pos = section_content.find('Document Viewer')
    ai_analysis_pos = section_content.find('AI (OCR + LLM) Analysis')
    
    if doc_viewer_pos == -1 or ai_analysis_pos == -1:
        return False, "Missing Document Viewer or AI Analysis"
    
    if ai_analysis_pos < doc_viewer_pos:
        return False, "Already in correct order"
    
    # Extract both articles
    articles = re.findall(
        r'<article class="glass panel-shadow card-border rounded-3xl overflow-hidden">.*?</article>',
        section_content,
        re.DOTALL
    )
    
    if len(articles) != 2:
        return False, f"Expected 2 articles, found {len(articles)}"
    
    doc_viewer_article = None
    ai_analysis_article = None
    status_badge = None
    
    for article in articles:
        if 'Document Viewer' in article:
            doc_viewer_article = article
            # Try to extract status badge from Document Viewer
            badge_match = re.search(
                r'<span class="text-xs font-semibold px-3 py-1 rounded-full[^"]*"[^>]*>.*?</span>',
                article
            )
            if badge_match:
                status_badge = badge_match.group(0)
        elif 'AI (OCR + LLM) Analysis' in article:
            ai_analysis_article = article
            # Check if badge is misplaced in content
            if not status_badge:
                badge_match = re.search(
                    r'<span class="text-xs font-semibold px-3 py-1 rounded-full[^"]*"[^>]*>.*?</span>',
                    article
                )
                if badge_match:
                    status_badge = badge_match.group(0)
    
    if not doc_viewer_article or not ai_analysis_article:
        return False, "Could not extract both articles"
    
    # Fix AI Analysis header structure
    ai_fixed = ai_analysis_article
    
    # Pattern 1: Fix header that's missing div wrapper
    if '<h2 class="text-lg font-semibold text-slate-900">AI (OCR + LLM) Analysis</h2>' in ai_fixed:
        if '<div>' not in ai_fixed.split('AI (OCR + LLM) Analysis')[0].split('<header')[-1]:
            # Need to add div wrapper
            ai_fixed = re.sub(
                r'(<header class="px-6 py-4 border-b border-slate-200/70 bg-white/80 flex items-center justify-between">)\s*<h2',
                r'\1\n                    <div>\n                        <h2',
                ai_fixed
            )
            # Close div before badge or end of header
            if status_badge and status_badge in ai_fixed:
                ai_fixed = ai_fixed.replace(
                    '</p>\n                </header>',
                    '</p>\n                    </div>'
                )
                # Remove badge from current position
                ai_fixed = ai_fixed.replace(status_badge, '')
            else:
                ai_fixed = re.sub(
                    r'(<p class="text-xs text-slate-500 mt-1">.*?</p>)',
                    r'\1\n                    </div>',
                    ai_fixed
                )
    
    # Add status badge to AI Analysis header if found
    if status_badge:
        # Add badge before closing header tag
        ai_fixed = ai_fixed.replace(
            '</header>',
            f'\n                    {status_badge}\n                </header>'
        )
    
    # Remove badge from Document Viewer
    doc_viewer_fixed = doc_viewer_article
    if status_badge:
        doc_viewer_fixed = doc_viewer_fixed.replace(status_badge, '')
        # Clean up empty lines
        doc_viewer_fixed = re.sub(r'\n\s*\n\s*\n', '\n\n', doc_viewer_fixed)
    
    # Rebuild section with correct order (AI Analysis first, then Document Viewer)
    new_section_content = '\n            ' + ai_fixed + '\n\n            ' + doc_viewer_fixed + '\n        '
    new_section = f'<section class="space-y-6">{new_section_content}</section>'
    
    # Replace in content
    content = content.replace(section_match.group(0), new_section)
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True, "Fixed successfully"

def main():
    """Process specified files"""
    
    print(f"Fixing {len(FILES_TO_FIX)} detail files...\n")
    
    fixed_count = 0
    skipped_count = 0
    
    for filename in FILES_TO_FIX:
        filepath = DETAILS_DIR / filename
        
        if not filepath.exists():
            print(f"✗ {filename} - File not found")
            skipped_count += 1
            continue
        
        success, message = fix_file(filepath)
        
        if success:
            print(f"✓ {filename} - {message}")
            fixed_count += 1
        else:
            print(f"⊘ {filename} - {message}")
            skipped_count += 1
    
    print(f"\n{'='*60}")
    print(f"Processing complete!")
    print(f"Fixed: {fixed_count} files")
    print(f"Skipped: {skipped_count} files")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()

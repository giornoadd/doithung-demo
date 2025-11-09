#!/usr/bin/env python3
"""
Script to reorganize detail HTML files:
1. Move AI Analysis section to top with full width
2. Move Document Viewer section to bottom with full width
3. Move status badge from Document Viewer to AI Analysis header
"""

import os
import re
from pathlib import Path

DETAILS_DIR = Path("/Users/giornoadd/my-macos/doi-tung-prototpye/details")

def update_html_layout(filepath):
    """Update single HTML file to new layout"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already updated
    if '<section class="space-y-6">' in content:
        return False, "Already updated"
    
    # Pattern 1: Change section grid to vertical stack
    content = re.sub(
        r'<section class="grid gap-6 md:grid-cols-2">',
        r'<section class="space-y-6">',
        content
    )
    
    # Pattern 2: Find and extract the status badge from Document Viewer
    doc_viewer_pattern = r'(<article class="glass panel-shadow card-border rounded-3xl overflow-hidden">[\s\S]*?<header[^>]*>[\s\S]*?<div>[\s\S]*?<h2[^>]*>Document Viewer</h2>[\s\S]*?</div>[\s\S]*?)(<span[^>]*class="[^"]*font-semibold[^"]*"[^>]*>.*?</span>)([\s\S]*?</header>)'
    
    doc_viewer_match = re.search(doc_viewer_pattern, content)
    status_badge = None
    
    if doc_viewer_match:
        status_badge = doc_viewer_match.group(2).strip()
        # Remove badge from Document Viewer
        content = content.replace(doc_viewer_match.group(0), 
                                 doc_viewer_match.group(1) + doc_viewer_match.group(3))
    
    # Pattern 3: Add status badge to AI Analysis header if we found one
    if status_badge:
        ai_analysis_pattern = r'(<header class="px-6 py-4 border-b border-slate-200/70 bg-white/80">[\s\S]*?<h2[^>]*>AI \(OCR \+ LLM\) Analysis</h2>[\s\S]*?</div>)'
        
        def add_badge_to_ai(match):
            header_content = match.group(1)
            # Change header to flex layout and add badge
            new_header = header_content.replace(
                '<header class="px-6 py-4 border-b border-slate-200/70 bg-white/80">',
                '<header class="px-6 py-4 border-b border-slate-200/70 bg-white/80 flex items-center justify-between">'
            )
            return new_header + '\n                    ' + status_badge
        
        content = re.sub(ai_analysis_pattern, add_badge_to_ai, content)
    
    # Pattern 4: Swap article order - move AI Analysis before Document Viewer
    # Find both articles
    section_pattern = r'<section class="space-y-6">([\s\S]*?)</section>'
    section_match = re.search(section_pattern, content)
    
    if section_match:
        section_content = section_match.group(1)
        
        # Split articles
        articles = re.findall(r'<article class="glass panel-shadow card-border rounded-3xl overflow-hidden">[\s\S]*?</article>', section_content)
        
        if len(articles) >= 2:
            # Identify which is which
            doc_viewer_article = None
            ai_analysis_article = None
            
            for article in articles:
                if 'Document Viewer' in article:
                    doc_viewer_article = article
                elif 'AI (OCR + LLM) Analysis' in article:
                    ai_analysis_article = article
            
            # If both found and Document Viewer is first, swap them
            if doc_viewer_article and ai_analysis_article:
                if section_content.index(doc_viewer_article) < section_content.index(ai_analysis_article):
                    # Replace entire section with swapped order
                    new_section_content = '\n            ' + ai_analysis_article + '\n\n            ' + doc_viewer_article + '\n        '
                    new_section = f'<section class="space-y-6">{new_section_content}</section>'
                    content = content.replace(section_match.group(0), new_section)
    
    # Write updated content
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True, "Updated successfully"

def main():
    """Process all HTML files in details directory"""
    
    html_files = list(DETAILS_DIR.glob("*.html"))
    
    if not html_files:
        print(f"No HTML files found in {DETAILS_DIR}")
        return
    
    print(f"Found {len(html_files)} HTML files to process\n")
    
    updated_count = 0
    skipped_count = 0
    
    for filepath in sorted(html_files):
        filename = filepath.name
        success, message = update_html_layout(filepath)
        
        if success:
            print(f"✓ {filename} - {message}")
            updated_count += 1
        else:
            print(f"⊘ {filename} - {message}")
            skipped_count += 1
    
    print(f"\n{'='*60}")
    print(f"Processing complete!")
    print(f"Updated: {updated_count} files")
    print(f"Skipped: {skipped_count} files")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()

import os
import glob

html_files = glob.glob('*.html') + glob.glob('**/*.html', recursive=True)
for filepath in html_files:
    if 'node_modules' in filepath or '.git' in filepath:
        continue
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            if '📂' in content:
                print(f"Found 📂 in: {filepath}")
            if 'Browse Categories' in content or 'browse categories' in content.lower():
                print(f"Found Browse Categories in: {filepath}")
    except Exception as e:
        print(f"Error reading {filepath}: {e}")

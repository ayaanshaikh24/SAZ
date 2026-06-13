import os
import glob

src_files = glob.glob('src/**/*', recursive=True)
for filepath in src_files:
    if os.path.isdir(filepath):
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

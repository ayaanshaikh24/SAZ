import os

emojis_to_find = ['📁', '📂', '📁']
for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if d not in ('node_modules', '.git', '.astro', '.vscode')]
    for file in files:
        filepath = os.path.join(root, file)
        try:
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                for emoji in emojis_to_find:
                    if emoji in content:
                        print(f"Found emoji {emoji} in: {filepath}")
        except Exception as e:
            pass
print("Search complete.")

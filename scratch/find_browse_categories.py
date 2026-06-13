import os

for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if d not in ('node_modules', '.git', '.astro', '.vscode')]
    for file in files:
        filepath = os.path.join(root, file)
        try:
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                for idx, line in enumerate(f):
                    if 'browse categories' in line.lower():
                        print(f"{filepath}:{idx+1}: {repr(line)}")
        except Exception as e:
            pass

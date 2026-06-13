import os

for root, dirs, files in os.walk('.'):
    # Ignore node_modules, .git, .astro, etc.
    dirs[:] = [d for d in dirs if d not in ('node_modules', '.git', '.astro', '.vscode')]
    for file in files:
        filepath = os.path.join(root, file)
        try:
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                if '📂' in content:
                    print(f"Found 📂 in: {filepath}")
                if '&#128193;' in content:
                    print(f"Found &#128193; in: {filepath}")
                if '1F4C1' in content.upper():
                    print(f"Found 1F4C1 in: {filepath}")
        except Exception as e:
            pass
print("Search complete.")

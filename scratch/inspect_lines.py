with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    for idx, line in enumerate(lines):
        if 'categories' in line.lower() or 'browse' in line.lower():
            print(f"index.html:{idx+1}: {repr(line)}")

try:
    with open('public/index.html', 'r', encoding='utf-8') as f:
        lines = f.readlines()
        for idx, line in enumerate(lines):
            if 'categories' in line.lower() or 'browse' in line.lower():
                print(f"public/index.html:{idx+1}: {repr(line)}")
except FileNotFoundError:
    pass

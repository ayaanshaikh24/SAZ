with open('public/index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    for idx in range(54, 65):
        if idx < len(lines):
            print(f"public/index.html:{idx+1}: {repr(lines[idx])}")

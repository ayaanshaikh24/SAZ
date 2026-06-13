with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    for idx in range(79, 95):
        if idx < len(lines):
            print(f"{idx+1}: {repr(lines[idx])}")

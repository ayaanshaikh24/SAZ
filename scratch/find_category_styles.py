with open('style.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    for idx, line in enumerate(lines):
        if 'categories-strip' in line or 'category-badge-link' in line:
            print(f"Found match at line {idx+1}: {repr(line)}")

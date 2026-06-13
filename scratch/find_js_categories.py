with open('script.js', 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if 'categories' in line.lower() or 'strip-title' in line.lower() or 'strip' in line.lower():
            print(f"script.js:{idx+1}: {repr(line)}")

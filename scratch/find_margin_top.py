with open('style.css', 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if 'margin-top' in line:
            print(f"style.css:{idx+1}: {repr(line)}")

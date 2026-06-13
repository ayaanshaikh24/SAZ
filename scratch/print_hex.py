with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    line = lines[85] # 0-indexed line 86 is at index 85
    print(f"Line 86 characters and their hex values:")
    for char in line:
        print(f"Char: {repr(char)} | Hex: {hex(ord(char))}")

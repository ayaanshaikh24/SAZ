with open('style.css', 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        # Print lines with non-ascii characters
        if any(ord(char) > 127 for char in line):
            print(f"style.css:{idx+1}: {repr(line)}")

with open('style.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    for idx, line in enumerate(lines):
        if 'badge-2018' in line:
            print(f"Found badge-2018 at line {idx+1}")
            # print surrounding lines
            start = max(0, idx - 5)
            end = min(len(lines), idx + 15)
            for j in range(start, end):
                print(f"{j+1}: {repr(lines[j])}")

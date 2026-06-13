def find_pulse_dots(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    matches = []
    for idx, line in enumerate(lines):
        if 'pulse-dot' in line:
            matches.append((idx+1, line))
    print(f"--- {filename} ---")
    for match in matches:
        print(f"Line {match[0]}: {repr(match[1])}")

find_pulse_dots('style.css')
find_pulse_dots('public/style.css')

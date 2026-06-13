with open('public/style.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    print("--- public/style.css: 650-670 ---")
    for idx in range(649, min(670, len(lines))):
        print(f"{idx+1}: {repr(lines[idx])}")
    print("\n--- public/style.css: 1860-1910 ---")
    for idx in range(1859, min(1915, len(lines))):
        print(f"{idx+1}: {repr(lines[idx])}")

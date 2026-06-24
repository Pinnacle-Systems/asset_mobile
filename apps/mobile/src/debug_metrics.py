import os

filepath = r"d:\asset_mobile\apps\mobile\src\screens\UserAndRoles\UserCreation.js"

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print("--- INLINE STYLES ---")
for i, line in enumerate(lines):
    if "style={{" in line:
        print(f"Line {i+1}: {line.strip()}")

print("\n--- INLINE ONPRESS ---")
for i, line in enumerate(lines):
    if "onPress={()" in line:
        print(f"Line {i+1}: {line.strip()}")

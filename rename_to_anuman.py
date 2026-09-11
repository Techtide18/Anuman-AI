import os

files_to_update = [
    'src/app/page.tsx',
    'src/app/forecast/page.tsx',
    'src/app/about/page.tsx',
    'src/app/impact/page.tsx',
    'src/app/layout.tsx'
]

for file in files_to_update:
    if not os.path.exists(file): continue
    
    with open(file, 'r') as f:
        content = f.read()
    
    # Text replacements
    content = content.replace('SAMVADA', 'ANUMAN AI')
    
    with open(file, 'w') as f:
        f.write(content)


import re
import os

files_to_update = [
    'src/app/page.tsx',
    'src/app/forecast/page.tsx',
    'src/app/about/page.tsx',
    'src/app/impact/page.tsx'
]

for filepath in files_to_update:
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # 1. Update logo size (h-8 w-8 -> h-32 w-32)
    content = content.replace('className="h-8 w-8 rounded-full object-cover border border-white/20"', 'className="h-24 w-24 rounded-full object-cover border-2 border-white/20"')
    
    # 2. Update text size (text-xl -> text-4xl or 5xl)
    content = content.replace('className="text-xl font-bold text-white">ANUMAN AI</span>', 'className="text-4xl md:text-5xl font-extrabold text-white tracking-wider">ANUMAN AI</span>')
    
    # 3. Increase header padding (py-4 -> py-8)
    content = content.replace('px-6 py-4 flex justify-between', 'px-6 py-8 flex justify-between')
    
    # 4. Increase gap (gap-2 -> gap-6)
    content = content.replace('className="flex items-center gap-2"', 'className="flex items-center gap-6"')
    
    # 5. Fix footers where it might have replaced the small logo too
    # Actually making the footer logo bigger is probably cool too, but if it looks weird we'll just let it be h-24 w-24.
    
    with open(filepath, 'w') as f:
        f.write(content)


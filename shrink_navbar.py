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
    
    # 1. Update logo size (h-24 w-24 -> h-20 w-20)
    content = content.replace('className="h-24 w-24 rounded-full object-cover border-2 border-white/20"', 'className="h-16 md:h-20 w-16 md:w-20 rounded-full object-cover border border-white/20"')
    
    # 2. Update text size (text-4xl md:text-5xl -> text-2xl md:text-3xl)
    content = content.replace('className="text-4xl md:text-5xl font-extrabold text-white tracking-wider">ANUMAN AI</span>', 'className="text-2xl md:text-3xl font-bold text-white tracking-wide">ANUMAN AI</span>')
    
    # 3. Decrease header padding (py-8 -> py-4 md:py-6)
    content = content.replace('px-6 py-8 flex justify-between', 'px-6 py-4 md:py-6 flex justify-between')
    
    # 4. Decrease gap slightly (gap-6 -> gap-4)
    content = content.replace('className="flex items-center gap-6"', 'className="flex items-center gap-4"')
    
    with open(filepath, 'w') as f:
        f.write(content)


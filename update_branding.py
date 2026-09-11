import os
import re

files_to_update = [
    'src/app/page.tsx',
    'src/app/forecast/page.tsx',
    'src/app/about/page.tsx',
    'src/app/impact/page.tsx',
    'src/app/layout.tsx'
]

# Replacement for the Scale icon to the image
old_logo = '<Scale className="h-6 w-6 text-blue-500" />'
new_logo = '<img src="/assets/logo.jpg" alt="SAMVADA Logo" className="h-8 w-8 rounded-full object-cover border border-white/20" />'

old_logo2 = '<Scale className="h-6 w-6 text-blue-400" />'

for file in files_to_update:
    if not os.path.exists(file): continue
    
    with open(file, 'r') as f:
        content = f.read()
    
    # Text replacements
    content = content.replace('Litigense', 'SAMVADA')
    
    # Logo replacement
    content = content.replace(old_logo, new_logo)
    content = content.replace(old_logo2, new_logo)
    
    with open(file, 'w') as f:
        f.write(content)


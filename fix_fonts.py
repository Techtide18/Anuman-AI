import re
import os

files_to_fix = ['src/app/about/page.tsx', 'src/app/impact/page.tsx']
for file in files_to_fix:
    if os.path.exists(file):
        with open(file, 'r') as f:
            content = f.read()
        content = content.replace('font-sans', '')
        with open(file, 'w') as f:
            f.write(content)

# Also fix the <a> to <Link> in page.tsx
with open('src/app/page.tsx', 'r') as f:
    home = f.read()

home = home.replace('<a href="/" className="flex items-center gap-2">', '<Link href="/" className="flex items-center gap-2">')
home = home.replace('</a>\n          <div', '</Link>\n          <div')
home = home.replace('<a href="/" className="hover:text-white transition-colors">Home</a>', '<Link href="/" className="hover:text-white transition-colors">Home</Link>')
home = home.replace('<a href="/about" className="hover:text-white transition-colors">About Us</a>', '<Link href="/about" className="hover:text-white transition-colors">About Us</Link>')
home = home.replace('<a href="/impact" className="hover:text-white transition-colors">Our Impact</a>', '<Link href="/impact" className="hover:text-white transition-colors">Our Impact</Link>')
home = home.replace('<a href="/forecast" className="text-blue-400 hover:text-blue-300 transition-colors">Run Forecast</a>', '<Link href="/forecast" className="text-blue-400 hover:text-blue-300 transition-colors">Run Forecast</Link>')

with open('src/app/page.tsx', 'w') as f:
    f.write(home)

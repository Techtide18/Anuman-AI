import os

files_to_fix = [
    'src/app/page.tsx',
    'src/components/ui/hero-scroll-video-pin-reveal.tsx',
    'src/app/about/page.tsx',
    'src/app/impact/page.tsx',
    'src/app/forecast/page.tsx'
]

for filepath in files_to_fix:
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Replace the greenish-blacks with neutral pure blacks
        content = content.replace('#0d0f0d', '#000000')
        content = content.replace('#111311', '#0a0a0a')
        content = content.replace('#1a1c1a', '#121212')
        content = content.replace('#0a0c0a', '#000000')
        
        with open(filepath, 'w') as f:
            f.write(content)

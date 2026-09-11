import re
import os

files_to_update = [
    'src/app/page.tsx',
    'src/app/forecast/page.tsx',
    'src/app/about/page.tsx',
    'src/app/impact/page.tsx'
]

replacements = {
    '<Link href="/how-it-works" className="hover:text-white">How It Works</Link>': '<span className="text-gray-400 cursor-default">How It Works</span>',
    '<Link href="/methodology" className="hover:text-white">Methodology</Link>': '<span className="text-gray-400 cursor-default">Methodology</span>',
    '<Link href="/faqs" className="hover:text-white">FAQs</Link>': '<span className="text-gray-400 cursor-default">FAQs</span>',
    
    '<Link href="/about" className="hover:text-white">About Us</Link>': '<span className="text-gray-400 cursor-default">About Us</span>',
    '<Link href="/impact" className="hover:text-white">Our Impact</Link>': '<span className="text-gray-400 cursor-default">Our Impact</span>',
    '<Link href="/contact" className="hover:text-white">Contact</Link>': '<span className="text-gray-400 cursor-default">Contact</span>',
    
    '<Link href="/disclaimer" className="hover:text-white">Disclaimer</Link>': '<span className="text-gray-400 cursor-default">Disclaimer</span>',
    '<Link href="/privacy" className="hover:text-white">Privacy Policy</Link>': '<span className="text-gray-400 cursor-default">Privacy Policy</span>',
    '<Link href="/terms" className="hover:text-white">Terms of Use</Link>': '<span className="text-gray-400 cursor-default">Terms of Use</span>',
    '<Link href="/attribution" className="hover:text-white">Data Sources & Attribution</Link>': '<span className="text-gray-400 cursor-default">Data Sources & Attribution</span>',
    
    # Also catch variations that might exist in page.tsx if they were changed
    '<a href="/disclaimer" className="hover:text-white">Disclaimer</a>': '<span className="text-gray-400 cursor-default">Disclaimer</span>',
    # Just in case for the sticky disclaimer at bottom
    '<Link href="/disclaimer" className="text-blue-400 hover:underline ml-1">Read full disclaimer →</Link>': '<span className="text-blue-400 ml-1">Read full disclaimer →</span>'
}

for filepath in files_to_update:
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(filepath, 'w') as f:
        f.write(content)


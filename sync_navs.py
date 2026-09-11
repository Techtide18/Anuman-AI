import re
import os

unified_nav = """<nav className="w-full border-b border-white/5 bg-[#000000]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <img src="/assets/logo.jpg" alt="ANUMAN AI Logo" className="h-8 w-8 rounded-full object-cover border border-white/20" />
            <span className="text-xl font-bold text-white">ANUMAN AI</span>
          </Link>
          <div className="space-x-6 text-sm font-medium text-gray-300 hidden md:flex items-center">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/impact" className="hover:text-white transition-colors">Our Impact</Link>
            <Link href="/forecast" className="text-blue-400 hover:text-blue-300 transition-colors">Run Forecast</Link>
          </div>
        </div>
      </nav>"""

nav_fixed = unified_nav.replace("sticky top-0", "fixed top-0")

files = {
    'src/app/page.tsx': nav_fixed,
    'src/app/about/page.tsx': unified_nav,
    'src/app/impact/page.tsx': unified_nav,
    'src/app/forecast/page.tsx': unified_nav
}

for filepath, nav_replacement in files.items():
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Replace anything between <nav> and </nav>
    content = re.sub(r'<nav.*?</nav>', nav_replacement, content, flags=re.DOTALL)
    
    with open(filepath, 'w') as f:
        f.write(content)

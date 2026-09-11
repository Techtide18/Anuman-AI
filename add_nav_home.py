import re

with open('src/app/page.tsx', 'r') as f:
    home = f.read()

nav_bar = """      {/* Navigation Bar */}
      <nav className="w-full border-b border-white/5 bg-[#000000]/80 backdrop-blur-md fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <img src="/assets/logo.jpg" alt="ANUMAN AI Logo" className="h-8 w-8 rounded-full object-cover border border-white/20" />
            <span className="text-xl font-bold text-white">ANUMAN AI</span>
          </Link>
          <div className="space-x-6 text-sm font-medium text-gray-300 hidden md:flex">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/impact" className="hover:text-white transition-colors">Our Impact</Link>
            <Link href="/forecast" className="text-blue-400 hover:text-blue-300 transition-colors">Run Forecast</Link>
          </div>
        </div>
      </nav>
"""

# Insert the nav bar right after the starting div of the return statement
home = home.replace(
    '<div className="min-h-screen bg-[#000000] text-white selection:bg-blue-500/30">',
    '<div className="min-h-screen bg-[#000000] text-white selection:bg-blue-500/30">\n' + nav_bar
)

with open('src/app/page.tsx', 'w') as f:
    f.write(home)

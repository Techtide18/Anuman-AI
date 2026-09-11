import re

with open('src/app/forecast/page.tsx', 'r') as f:
    content = f.read()

# Replace root background
content = content.replace('bg-[#0a0a0a]', 'bg-[#0d0f0d]')

# Replace card backgrounds
content = content.replace('bg-[#121212]', 'bg-[#111311]')

# Replace old header
old_header = """      <header className="bg-[#111311] border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold text-white">Litigense</span>
          </div>
        </div>
      </header>"""

new_header = """      <nav className="w-full border-b border-white/5 bg-[#0d0f0d]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold text-white">Litigense</span>
          </Link>
          <div className="space-x-6 text-sm font-medium text-gray-300 hidden md:flex items-center">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1"><ArrowLeft className="h-4 w-4" /> Home</Link>
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/impact" className="hover:text-white transition-colors">Our Impact</Link>
          </div>
        </div>
      </nav>"""

content = content.replace(old_header, new_header)

with open('src/app/forecast/page.tsx', 'w') as f:
    f.write(content)

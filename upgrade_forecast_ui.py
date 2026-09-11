import re

with open('src/app/forecast/page.tsx', 'r') as f:
    content = f.read()

# 1. Insert header before <main>
header_html = """
      {/* Page Header */}
      {!showResults && (
        <div className="w-full text-center pt-16 pb-4 px-6 animate-fade-in">
          <div className="inline-block bg-blue-500/10 text-blue-400 font-semibold px-4 py-1.5 rounded-full text-sm mb-6 border border-blue-500/20">
            Powered by ANUMAN AI
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Run Your Data-Backed Forecast</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Describe your dispute below. We will instantly benchmark your facts against thousands of Indian court judgments to calculate realistic timelines, legal costs, and a fair settlement range.
          </p>
        </div>
      )}

      <main"""

content = content.replace('<main', header_html)

# 2. Upgrade the form container
old_form_container = '<div className="bg-[#0a0a0a] rounded-xl shadow-sm border border-white/10 overflow-hidden">'
new_form_container = '<div className="bg-[#121212]/80 backdrop-blur-xl rounded-[2rem] shadow-[0_0_50px_rgba(59,130,246,0.05)] border border-white/10 overflow-hidden relative">'

content = content.replace(old_form_container, new_form_container)

# 3. Upgrade the form header
old_form_header = """            <div className="px-6 py-4 border-b border-white/5 bg-[#000000]/50">
              <h2 className="text-xl font-semibold text-white">Case Details</h2>
              <p className="text-sm text-gray-500 mt-1">Provide information for accurate forecasting</p>
            </div>"""

new_form_header = """            {/* Subtle top glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 opacity-50"></div>
            
            <div className="px-8 py-8 border-b border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent">
              <h2 className="text-2xl font-bold text-white tracking-tight">Case Details</h2>
              <p className="text-gray-400 mt-2">The more detail you provide, the higher the confidence score of your forecast.</p>
            </div>"""

content = content.replace(old_form_header, new_form_header)

# 4. Make the form padding bigger
content = content.replace('<form onSubmit={handleSubmit} className="p-6 space-y-6">', '<form onSubmit={handleSubmit} className="p-8 space-y-8">')

# 5. Make the Generate Forecast button bigger and more premium
old_button = '<button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition-colors disabled:opacity-50">'
new_button = '<button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg py-4 px-4 rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02]">'

content = content.replace(old_button, new_button)

with open('src/app/forecast/page.tsx', 'w') as f:
    f.write(content)


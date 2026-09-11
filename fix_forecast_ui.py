import re

with open('src/app/forecast/page.tsx', 'r') as f:
    content = f.read()

# 1. Fix the Loading Overlay
# Remove the logo image
old_logo = '<img src="/assets/logo.jpg" alt="ANUMAN AI Logo" className="h-20 w-20 rounded-full object-cover border-2 border-white/20 animate-pulse" />'
content = content.replace(old_logo, '')

# Fix alignment of the loading text and update the "minutes" text
old_text_container = """          <div className="h-12 flex items-center justify-center">
            <p className="text-xl text-blue-400 font-medium animate-pulse text-center px-4">
              {loadingSteps[loadingStep]}
            </p>
          </div>

          <div className="w-64 h-1.5 bg-white/10 rounded-full mt-8 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-1000 ease-out rounded-full"
              style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-4">This usually takes about 60 seconds.</p>"""

new_text_container = """          <div className="w-full max-w-2xl flex items-center justify-center min-h-[3rem]">
            <p className="text-xl text-blue-400 font-medium animate-pulse text-center px-4 w-full">
              {loadingSteps[loadingStep]}
            </p>
          </div>

          <div className="w-64 h-1.5 bg-white/10 rounded-full mt-8 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-1000 ease-out rounded-full"
              style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-4">This usually takes a couple of minutes.</p>"""

content = content.replace(old_text_container, new_text_container)

# 2. Fix the Similar Precedents Rendering
old_precedent = """                        <p className="text-xs text-gray-400">
                          <span className={`inline-block px-2 py-0.5 rounded text-xs mr-2 ${c.outcome.includes('Convicted') || c.outcome.includes('Plaintiff') || c.outcome.includes('Granted') ? 'bg-green-900/50 text-green-400' : c.outcome.includes('Settled') ? 'bg-yellow-900/50 text-yellow-400' : 'bg-red-900/50 text-red-400'}`}>
                            {c.outcome.split('.')[0]}
                          </span>
                          {c.outcome.split('.').slice(1).join('.').trim() || c.outcome}
                        </p>"""

new_precedent = """                        <div className="mt-1">
                          <span className={`inline-block px-3 py-1.5 rounded-md text-xs leading-relaxed ${c.outcome.includes('Convicted') || c.outcome.includes('Plaintiff') || c.outcome.includes('Granted') ? 'bg-green-900/40 text-green-300 border border-green-700/50' : c.outcome.includes('Settled') ? 'bg-yellow-900/40 text-yellow-300 border border-yellow-700/50' : 'bg-red-900/40 text-red-300 border border-red-700/50'}`}>
                            {c.outcome}
                          </span>
                        </div>"""

content = content.replace(old_precedent, new_precedent)

with open('src/app/forecast/page.tsx', 'w') as f:
    f.write(content)


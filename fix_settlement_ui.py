import re

with open('src/app/forecast/page.tsx', 'r') as f:
    content = f.read()

old_settlement = """                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray-400">Recommended settlement:</span>
                    <span className="font-bold text-white">₹{formatINR(results.settlement.recommendedMin)} – ₹{formatINR(results.settlement.recommendedMax)}</span>
                  </div>"""

new_settlement = """                  <div className="flex flex-col py-3 border-b border-white/5">
                    <span className="text-sm text-gray-500 mb-1">Recommended settlement</span>
                    <span className="text-2xl font-bold text-green-400">₹{formatINR(results.settlement.recommendedMin)} – ₹{formatINR(results.settlement.recommendedMax)}</span>
                  </div>"""

content = content.replace(old_settlement, new_settlement)

with open('src/app/forecast/page.tsx', 'w') as f:
    f.write(content)

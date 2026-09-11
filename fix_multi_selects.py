import re

with open('src/app/forecast/page.tsx', 'r') as f:
    content = f.read()

# Fix natureOfDispute
bad_dispute = """<select multiple value={natureOfDispute} onChange={e => setNatureOfDispute(Array.from(e.target.selectedOptions, o => o.value))} className="w-full rounded-lg border-white/20 border p-2.5 h-24 text-white">"""
good_dispute = """<select value={natureOfDispute} onChange={e => setNatureOfDispute(e.target.value)} className="w-full rounded-lg bg-[#121212] border-white/20 border p-2.5 text-white">
<option value="">Select nature of dispute</option>"""
content = content.replace(bad_dispute, good_dispute)

# Fix natureOfRelief
bad_relief = """<select multiple value={natureOfRelief} onChange={e => setNatureOfRelief(Array.from(e.target.selectedOptions, o => o.value))} className="w-full rounded-lg border-white/20 border p-2.5 h-24 text-white">"""
good_relief = """<select value={natureOfRelief} onChange={e => setNatureOfRelief(e.target.value)} className="w-full rounded-lg bg-[#121212] border-white/20 border p-2.5 text-white">
<option value="">Select nature of relief</option>"""
content = content.replace(bad_relief, good_relief)

with open('src/app/forecast/page.tsx', 'w') as f:
    f.write(content)

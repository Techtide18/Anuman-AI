import re

with open('src/app/forecast/page.tsx', 'r') as f:
    content = f.read()

# Fix defenceRaised
content = re.sub(
    r'<select multiple value={defenceRaised} onChange=\{\(e\) => \{.*?\}\} className="w-full rounded-lg border-white/20 border p-2.5 h-24">\n.*?<option>Security cheque</option>\n.*?<option>Debt not legally enforceable</option>\n.*?<option>No notice received</option>\n.*?<option>Blank cheque misused</option>\n.*?</select>\n.*?<p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>',
    r'''<select value={defenceRaised} onChange={(e) => setDefenceRaised(e.target.value)} className="w-full rounded-lg bg-[#121212] border-white/20 border p-2.5 text-white">
                      <option value="">Select a defence</option>
                      <option value="Security cheque">Security cheque</option>
                      <option value="Debt not legally enforceable">Debt not legally enforceable</option>
                      <option value="No notice received">No notice received</option>
                      <option value="Blank cheque misused">Blank cheque misused</option>
                    </select>''',
    content,
    flags=re.DOTALL
)

# Fix natureOfDispute
content = re.sub(
    r'<select multiple value={natureOfDispute} onChange=\{e => setNatureOfDispute\(Array\.from\(e\.target\.selectedOptions, o => o\.value\)\)\} className="w-full rounded-lg border-white/20 border p-2\.5 h-24 text-white">\n.*?<option>Non-payment</option>\n.*?<option>Defective goods/services</option>\n.*?<option>Delay in performance</option>\n.*?<option>Breach of terms</option>\n.*?</select>\n.*?<p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>',
    r'''<select value={natureOfDispute} onChange={e => setNatureOfDispute(e.target.value)} className="w-full rounded-lg bg-[#121212] border-white/20 border p-2.5 text-white">
                      <option value="">Select nature of dispute</option>
                      <option value="Non-payment">Non-payment</option>
                      <option value="Defective goods/services">Defective goods/services</option>
                      <option value="Delay in performance">Delay in performance</option>
                      <option value="Breach of terms">Breach of terms</option>
                    </select>''',
    content,
    flags=re.DOTALL
)

# Fix natureOfRelief
content = re.sub(
    r'<select multiple value={natureOfRelief} onChange=\{e => setNatureOfRelief\(Array\.from\(e\.target\.selectedOptions, o => o\.value\)\)\} className="w-full rounded-lg border-white/20 border p-2\.5 h-24 text-white">\n.*?<option>Monthly Maintenance</option>\n.*?<option>Lump Sum Alimony</option>\n.*?<option>Child Support</option>\n.*?<option>Property Division</option>\n.*?</select>\n.*?<p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>',
    r'''<select value={natureOfRelief} onChange={e => setNatureOfRelief(e.target.value)} className="w-full rounded-lg bg-[#121212] border-white/20 border p-2.5 text-white">
                      <option value="">Select nature of relief</option>
                      <option value="Monthly Maintenance">Monthly Maintenance</option>
                      <option value="Lump Sum Alimony">Lump Sum Alimony</option>
                      <option value="Child Support">Child Support</option>
                      <option value="Property Division">Property Division</option>
                    </select>''',
    content,
    flags=re.DOTALL
)

with open('src/app/forecast/page.tsx', 'w') as f:
    f.write(content)

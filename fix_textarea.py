import re

with open('src/app/forecast/page.tsx', 'r') as f:
    content = f.read()

old_textarea = """                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the facts of your case in as much legal detail as possible..."
                    className="w-full rounded-lg border-white/20 border p-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />"""

new_textarea = """                  <textarea
                    required
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the facts of your case in as much legal detail as possible..."
                    className="w-full min-h-[160px] resize-y overflow-y-auto bg-black/20 rounded-lg border-white/20 border p-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 leading-relaxed custom-scrollbar"
                  />"""

content = content.replace(old_textarea, new_textarea)

# Let's also add a quick custom scrollbar class to the top of globals.css if we can, 
# but it's not strictly necessary. overflow-y-auto and resize-y will fix the issue.

with open('src/app/forecast/page.tsx', 'w') as f:
    f.write(content)


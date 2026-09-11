import re

# 1. Fix the Component
with open('src/components/ui/hero-scroll-video-pin-reveal.tsx', 'r') as f:
    comp_content = f.read()

bad_bottom = """      {/* ── Section 3: Bottom Outro Text ─────────────────────────────────── */}
      <section
        className="w-full min-h-screen flex justify-center items-center text-center px-4 sm:px-8 py-8 relative z-10 bg-[#000000]"
        style={{ backgroundColor: '#000000' }}
      >
        {bottomText}
      </section>
    </div>"""

good_bottom = """      {/* ── Section 3: Bottom Outro Text ─────────────────────────────────── */}
      {bottomText && (
        <section
          className="w-full min-h-screen flex justify-center items-center text-center px-4 sm:px-8 py-8 relative z-10 bg-[#000000]"
          style={{ backgroundColor: '#000000' }}
        >
          {bottomText}
        </section>
      )}
    </div>"""

comp_content = comp_content.replace(bad_bottom, good_bottom)

with open('src/components/ui/hero-scroll-video-pin-reveal.tsx', 'w') as f:
    f.write(comp_content)

# 2. Fix the Page
with open('src/app/page.tsx', 'r') as f:
    page_content = f.read()

# Let's remove the bottomTextNode definition and the bottomText prop
page_content = re.sub(
    r'const bottomTextNode = \(\s*<div className="max-w-5xl mx-auto">.*?</div>\s*\);',
    '',
    page_content,
    flags=re.DOTALL
)

page_content = page_content.replace('bottomText={bottomTextNode}', '')

with open('src/app/page.tsx', 'w') as f:
    f.write(page_content)

import re

nav_links = {
    "Home": '<Link href="/" className="{}">Home</Link>',
    "About": '<Link href="/about" className="{}">About Us</Link>',
    "Impact": '<Link href="/impact" className="{}">Our Impact</Link>',
    "Forecast": '<Link href="/forecast" className="{}">Run Forecast</Link>'
}

def build_nav(active_key):
    active_class = "text-blue-400 font-semibold"
    inactive_class = "hover:text-white transition-colors"
    
    links_html = []
    for key, template in nav_links.items():
        if key == active_key:
            links_html.append(template.format(active_class))
        else:
            links_html.append(template.format(inactive_class))
            
    inner_html = "\n            ".join(links_html)
    return f"""<div className="space-x-6 text-sm font-medium text-gray-300 hidden md:flex items-center">
            {inner_html}
          </div>"""

files = {
    'src/app/page.tsx': 'Home',
    'src/app/about/page.tsx': 'About',
    'src/app/impact/page.tsx': 'Impact',
    'src/app/forecast/page.tsx': 'Forecast'
}

for filepath, active_key in files.items():
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Replace the nav links block
    new_nav = build_nav(active_key)
    content = re.sub(
        r'<div className="space-x-6 text-sm font-medium text-gray-300 hidden md:flex items-center">.*?</div>',
        new_nav,
        content,
        flags=re.DOTALL
    )
    
    with open(filepath, 'w') as f:
        f.write(content)

# Also fix the forecast theme
with open('src/app/forecast/page.tsx', 'r') as f:
    forecast = f.read()

forecast = forecast.replace('flex flex-col noise-bg', 'flex flex-col')
forecast = forecast.replace('<div className="ambient-glow" />', '')

with open('src/app/forecast/page.tsx', 'w') as f:
    f.write(forecast)


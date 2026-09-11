import re

with open('src/app/forecast/page.tsx', 'r') as f:
    content = f.read()

# 1. Add beforeunload useEffect
beforeunload_code = """
  // Warn before leaving if results are showing
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (showResults) {
        e.preventDefault();
        e.returnValue = ''; // Standard way to trigger browser's "Leave site?" prompt
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [showResults]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (showResults) {
      if (!window.confirm("You have a generated forecast. Are you sure you want to leave this page?")) {
        e.preventDefault();
      }
    }
  };
"""
# insert right after showResults state
content = content.replace('  const [showResults, setShowResults] = useState(false);', '  const [showResults, setShowResults] = useState(false);\n' + beforeunload_code)


# 2. Add handleNavClick to the navbar links
links = [
    '<Link href="/" className="flex items-center gap-2">',
    '<Link href="/" className="hover:text-white transition-colors">Home</Link>',
    '<Link href="/about" className="hover:text-white transition-colors">About Us</Link>',
    '<Link href="/impact" className="hover:text-white transition-colors">Our Impact</Link>',
    '<Link href="/forecast" className="text-blue-400 font-semibold">Run Forecast</Link>'
]

for link in links:
    if "className=" in link:
        new_link = link.replace('className=', 'onClick={handleNavClick} className=')
        content = content.replace(link, new_link)

# 3. Fix the Case Category select
old_select = """                    onChange={(e) => setVertical(e.target.value)}"""
new_select = """                    onChange={(e) => {
                      if (showResults) {
                        if (window.confirm("Changing the case category will clear your current forecast results. Are you sure you want to proceed?")) {
                          setShowResults(false);
                          setVertical(e.target.value);
                        }
                      } else {
                        setVertical(e.target.value);
                      }
                    }}"""

content = content.replace(old_select, new_select)

with open('src/app/forecast/page.tsx', 'w') as f:
    f.write(content)


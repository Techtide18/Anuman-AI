import re

with open('src/components/ui/hero-scroll-video-pin-reveal.tsx', 'r') as f:
    content = f.read()

old_sec = 'className="w-full min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-8 py-8 relative z-10 bg-[#0d0f0d]"'
new_sec = 'className="w-full min-h-screen flex flex-col justify-center px-4 sm:px-8 py-8 relative z-10 bg-[#0d0f0d]"'
content = content.replace(old_sec, new_sec)

with open('src/components/ui/hero-scroll-video-pin-reveal.tsx', 'w') as f:
    f.write(content)

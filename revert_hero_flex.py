with open('src/components/ui/hero-scroll-video-pin-reveal.tsx', 'r') as f:
    content = f.read()

bad_sec = 'className="w-full min-h-screen flex flex-col justify-center px-4 sm:px-8 py-8 relative z-10 bg-[#0d0f0d]"'
good_sec = 'className="w-full min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-8 py-8 relative z-10 bg-[#0d0f0d]"'
content = content.replace(bad_sec, good_sec)

with open('src/components/ui/hero-scroll-video-pin-reveal.tsx', 'w') as f:
    f.write(content)

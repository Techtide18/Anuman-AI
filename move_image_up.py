import re

with open('src/components/ui/hero-scroll-video-pin-reveal.tsx', 'r') as f:
    content = f.read()

bad_img = """          {/* Right side: Lady Justice Image */}
          <div className="hidden lg:block flex-1 relative h-[650px] w-full mt-12 lg:mt-0">
            <img 
              src="/assets/lady-justice.jpg" 
              alt="Lady Justice" 
              className="absolute inset-0 w-full h-full object-contain object-right drop-shadow-2xl opacity-90 transition-transform duration-1000 scale-[1.3] xl:scale-[1.5] origin-right"
              style={{ mixBlendMode: 'lighten' }}
            />
          </div>"""

good_img = """          {/* Right side: Lady Justice Image */}
          <div className="hidden lg:block flex-1 relative h-[650px] w-full mt-12 lg:mt-0">
            <img 
              src="/assets/lady-justice.jpg" 
              alt="Lady Justice" 
              className="absolute inset-0 w-full h-full object-contain object-right drop-shadow-2xl opacity-90 transition-transform duration-1000 scale-[1.3] xl:scale-[1.5] origin-right -translate-y-16 xl:-translate-y-24"
              style={{ mixBlendMode: 'lighten' }}
            />
          </div>"""

content = content.replace(bad_img, good_img)

with open('src/components/ui/hero-scroll-video-pin-reveal.tsx', 'w') as f:
    f.write(content)

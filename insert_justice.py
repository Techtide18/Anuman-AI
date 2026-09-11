import re

with open('src/components/ui/hero-scroll-video-pin-reveal.tsx', 'r') as f:
    content = f.read()

bad_section = """        <div
          className="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24 flex flex-col items-center text-center relative z-10 bg-[#000000]"
          style={{ backgroundColor: '#000000' }}
        >
          {/* Animated Kinetic Headline */}
          <div className="w-full mb-8 sm:mb-12 md:mb-14">
            <div
              ref={paraRef}
              className="font-extrabold tracking-tight leading-tight text-white overflow-visible text-[clamp(2rem,5vw,5rem)]"
            >
              {headingText}
            </div>
          </div>

          {/* Staggered Clip-Path Tag Badges */}
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-4 max-w-4xl mx-auto my-4 sm:my-6 mb-8 sm:mb-14">
            {tags.map((tag, idx) => (
              <div
                key={tag.id || `tag-${idx}`}
                ref={(el) => {
                  tagRefs.current[idx] = el;
                }}
                className="px-5 sm:px-8 py-2.5 sm:py-4 rounded-full text-[clamp(0.95rem,2vw,1.8rem)] font-semibold tracking-tight opacity-0 shadow-2xl will-change-[clip-path,opacity]"
                style={{
                  backgroundColor: tag.background,
                  color: tag.color || '#ffffff',
                  clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
                }}
              >
                {tag.text}
              </div>
            ))}
          </div>

          {subText && (
            <p className="text-[clamp(0.95rem,1.5vw,1.35rem)] text-zinc-400 font-normal max-w-xl mt-2 sm:mt-4 px-4">
              {subText}
            </p>
          )}
        </div>"""

good_section = """        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 flex flex-col lg:flex-row items-center justify-between relative z-10 bg-[#000000] gap-12"
          style={{ backgroundColor: '#000000' }}
        >
          {/* Left side: Text */}
          <div className="flex-1 flex flex-col items-start text-left">
            {/* Animated Kinetic Headline */}
            <div className="w-full mb-8">
              <div
                ref={paraRef}
                className="font-extrabold tracking-tight leading-tight text-white overflow-visible text-[clamp(2.5rem,4vw,4.5rem)]"
              >
                {headingText}
              </div>
            </div>

            {/* Staggered Clip-Path Tag Badges */}
            <div className="flex flex-wrap justify-start gap-2.5 sm:gap-4 my-4 mb-8">
              {tags.map((tag, idx) => (
                <div
                  key={tag.id || `tag-${idx}`}
                  ref={(el) => {
                    tagRefs.current[idx] = el;
                  }}
                  className="px-5 sm:px-8 py-2.5 sm:py-4 rounded-full text-[clamp(0.95rem,1.5vw,1.5rem)] font-semibold tracking-tight opacity-0 shadow-2xl will-change-[clip-path,opacity]"
                  style={{
                    backgroundColor: tag.background,
                    color: tag.color || '#ffffff',
                    clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
                  }}
                >
                  {tag.text}
                </div>
              ))}
            </div>

            {subText && (
              <p className="text-[clamp(1rem,1.2vw,1.25rem)] text-zinc-400 font-normal max-w-xl mt-2 px-0 text-left">
                {subText}
              </p>
            )}
          </div>

          {/* Right side: Lady Justice Image */}
          <div className="hidden lg:block flex-1 relative h-[500px] w-full mt-12 lg:mt-0">
            <img 
              src="/assets/lady-justice.jpg" 
              alt="Lady Justice" 
              className="absolute inset-0 w-full h-full object-contain object-right drop-shadow-2xl opacity-90 transition-opacity duration-1000"
              style={{ mixBlendMode: 'lighten' }}
            />
          </div>
        </div>"""

content = content.replace(bad_section, good_section)

with open('src/components/ui/hero-scroll-video-pin-reveal.tsx', 'w') as f:
    f.write(content)

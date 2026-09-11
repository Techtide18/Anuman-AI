'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export interface TagItem {
  id?: string;
  text: string;
  background: string;
  color?: string;
}

export interface HeroScrollVideoRevealProps {
  topText?: React.ReactNode;
  headingText?: React.ReactNode;
  tags?: TagItem[];
  subText?: string;
  videoSrc?: string;
  bottomText?: React.ReactNode;
  badgeImgSrc?: string;
  className?: string;
}

const DEFAULT_TAGS: TagItem[] = [
  { text: 'Quiet peaks', background: '#1B211A', color: '#ffffff' },
  { text: 'Pure air energy', background: '#628141', color: '#ffffff' },
  { text: 'Endlessly renewable', background: '#EBD5AB', color: '#444444' },
  { text: 'Clean as alpine snow', background: '#2F5755', color: '#ffffff' },
];

export const HeroScrollVideoReveal: React.FC<HeroScrollVideoRevealProps> = ({
  topText = (
    <>
      Built to flow with your story,
      <br />
      not fight it
    </>
  ),
  headingText = (
    <>
      Step into mountain calm <br />
      Nature tells the story.
    </>
  ),
  tags = DEFAULT_TAGS,
  subText = 'And the journey continues beyond the summit...',
  videoSrc = 'https://res.cloudinary.com/ulgfi6yl/video/upload/v1788321431/856381-hd_1920_1080_30fps.mp4',
  bottomText = null,
  badgeImgSrc = 'https://cdn.21st.dev/assets/mirror/23/23a474e4cceeaf6b98729302d689998195e5534241cbc33ee2c64dfc351c16d6.png',
  className = '',
}) => {
  const benefitRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const tagRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Optional Lenis smooth scroll
    let lenis: any = null;
    let lenisTicker: ((time: number) => void) | null = null;


    import('@studio-freight/lenis')
      .then(({ default: Lenis }) => {
        lenis = new Lenis({ smooth: true });
        lenis.on('scroll', ScrollTrigger.update);
        lenisTicker = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(lenisTicker);
        gsap.ticker.lagSmoothing(0);
      })
      .catch(() => {});

    // Word split kinetic reveal animation
    let split: any = null;
    let words: Element[] = [];

    try {
      split = new SplitText(paraRef.current, {
        type: 'words',
        wordsClass: 'reveal-word inline-block origin-left mr-[0.25em] will-change-transform',
      });
      words = split.words;
    } catch {
      if (paraRef.current) {
        words = Array.from(paraRef.current.querySelectorAll('.reveal-word'));
      }
    }

    if (words && words.length > 0) {
      gsap.set(words, { opacity: 0, rotate: 8, yPercent: 30 });
    }

    // Reveal timeline for headline & tag badges
    const revealTl = gsap.timeline({
      scrollTrigger: {
        trigger: benefitRef.current,
        start: 'top 70%',
        end: 'top -10%',
        scrub: 1.5,
      },
    });

    if (words && words.length > 0) {
      revealTl.to(words, {
        stagger: 0.2,
        opacity: 1,
        rotate: 0,
        yPercent: 0,
        ease: 'power1.inOut',
      });
    }

    tagRefs.current.forEach((tagEl) => {
      if (tagEl) {
        revealTl.to(
          tagEl,
          {
            duration: 1,
            opacity: 1,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            ease: 'circ.out',
          },
          '>-0.4'
        );
      }
    });

    return () => {
      if (split && split.revert) split.revert();
      revealTl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (lenis && lenisTicker) {
        gsap.ticker.remove(lenisTicker);
        lenis.destroy();
      }
    };
  }, []);

  return (
    <div
      className={`w-full bg-[#000000] text-[#f3f4f6] font-sans overflow-x-hidden ${className}`}
      style={{ backgroundColor: '#000000', color: '#f3f4f6' }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .pin-spacer {
              background-color: #000000 !important;
            }
            body, html {
              background-color: #000000 !important;
            }
          `,
        }}
      />

      {/* ── Section 1: Intro Text ────────────────────────────────────────── */}
      <section
        className="w-full min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-8 pt-32 pb-8 relative z-10 bg-[#000000]"
        style={{ backgroundColor: '#000000' }}
      >
        {topText}
      </section>

      {/* ── Section 2: Benefit & Headline Section ─────────────────────────── */}
      <section
        ref={benefitRef}
        className="relative w-full min-h-[140vh] md:min-h-[160vh] pb-16 md:pb-20 bg-[#000000]"
        style={{ backgroundColor: '#000000' }}
      >
        <div
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
          <div className="hidden lg:block flex-1 relative h-[650px] w-full mt-12 lg:mt-0 overflow-hidden">
            <img 
              src="/assets/lady-justice.jpg" 
              alt="Lady Justice" 
              className="absolute bottom-0 right-0 w-full h-full object-contain object-right-bottom drop-shadow-2xl opacity-90 transition-transform duration-1000 scale-[1.1] xl:scale-[1.2] origin-bottom-right"
              style={{ mixBlendMode: 'lighten' }}
            />
          </div>
        </div>

        {/* ── Video Pin Section ───────────────────────────────────────────── */}
        <div className="relative w-full max-w-6xl mx-auto mt-20 px-4 sm:px-8 bg-[#000000] pb-20">
          <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative">
            <iframe
              src="https://drive.google.com/file/d/1nPTB2VBjJsEjznjqN6GGix31a0vTcCbC/preview"
              className="absolute inset-0 w-full h-full"
              style={{ border: 'none', backgroundColor: '#000000' }}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ── Section 3: Bottom Outro Text ─────────────────────────────────── */}
      {bottomText && (
        <section
          className="w-full min-h-screen flex justify-center items-center text-center px-4 sm:px-8 py-8 relative z-10 bg-[#000000]"
          style={{ backgroundColor: '#000000' }}
        >
          {bottomText}
        </section>
      )}
    </div>
  );
};

export default HeroScrollVideoReveal;

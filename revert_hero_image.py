with open('src/app/page.tsx', 'r') as f:
    content = f.read()

bad_top_text = """  const topTextNode = (
    <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto pt-20 px-4 text-left">
      <div className="flex-1 flex flex-col items-start z-10">
        <p className="text-sm md:text-lg text-blue-400 uppercase tracking-widest font-semibold mb-6 animate-fade-in">
          ⚖️ INDIA'S PRE-LITIGATION INTELLIGENCE PLATFORM
        </p>
        <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-extrabold text-white leading-[1.1] mb-6 max-w-3xl">
          5 Crore Cases Are Stuck in Indian Courts.<br />
          <span className="text-gray-400">Yours Doesn't Have to Be One of Them.</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 max-w-2xl font-normal mb-10 leading-relaxed">
          Get a data-backed picture of your dispute — likely outcome, timeline, and a fair settlement number — grounded in real judgments. Decide with clarity. Settle before you litigate.
        </p>
        <Link
          href="/forecast"
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg md:text-xl transition-all hover:scale-105 shadow-xl hover:shadow-blue-500/20"
        >
          See My Settlement Number &rarr;
        </Link>
        <p className="text-sm text-gray-500 mt-6 font-medium">
          Not legal advice. No data stored. Built on public case law and NJDG court data.
        </p>
      </div>
      
      <div className="hidden lg:block flex-1 relative h-[650px] w-full">
        <img 
          src="/assets/lady-justice.jpg" 
          alt="Lady Justice" 
          className="absolute inset-0 w-full h-full object-contain object-right drop-shadow-2xl opacity-90 transition-opacity duration-1000"
          style={{ mixBlendMode: 'lighten' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f0d] via-transparent to-transparent z-10 w-1/4"></div>
      </div>
    </div>
  );"""

good_top_text = """  const topTextNode = (
    <div className="flex flex-col items-center justify-center pt-20 relative w-full h-full">
      {/* Subtle Lady Justice Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.15] z-0 flex justify-center">
        <img 
          src="/assets/lady-justice.jpg" 
          alt="Lady Justice" 
          className="w-full h-[150%] md:h-[120%] object-cover object-top mix-blend-lighten"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0f0d]/50 to-[#0d0f0d]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <p className="text-sm md:text-lg text-blue-400 uppercase tracking-widest font-semibold mb-6 animate-fade-in">
          ⚖️ INDIA'S PRE-LITIGATION INTELLIGENCE PLATFORM
        </p>
        <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-extrabold text-white leading-[1.1] mb-6 max-w-6xl text-center">
          5 Crore Cases Are Stuck in Indian Courts.<br />
          <span className="text-gray-400">Yours Doesn't Have to Be One of Them.</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 max-w-4xl font-normal mb-10 leading-relaxed text-center">
          Get a data-backed picture of your dispute — likely outcome, timeline, and a fair settlement number — grounded in real judgments. Decide with clarity. Settle before you litigate.
        </p>
        <Link
          href="/forecast"
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg md:text-xl transition-all hover:scale-105 shadow-xl hover:shadow-blue-500/20"
        >
          See My Settlement Number &rarr;
        </Link>
        <p className="text-sm text-gray-500 mt-6 font-medium">
          Not legal advice. No data stored. Built on public case law and NJDG court data.
        </p>
      </div>
    </div>
  );"""

content = content.replace(bad_top_text, good_top_text)

with open('src/app/page.tsx', 'w') as f:
    f.write(content)

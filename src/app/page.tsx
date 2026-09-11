import Link from 'next/link';
import { HeroScrollVideoReveal } from '@/components/ui/hero-scroll-video-pin-reveal';
import { Search, BarChart3, ShieldCheck, Scale, Users, Gavel, CheckCircle2 } from 'lucide-react';

export default function WelcomePage() {
  const topTextNode = (
    <div className="flex flex-col items-center justify-center pt-20 relative w-full h-full">
      <div className="relative z-10 flex flex-col items-center">
        <p className="text-sm md:text-lg text-blue-400 uppercase tracking-widest font-semibold mb-6 animate-fade-in">
          ⚖️ ANUMAN AI - INDIA'S PRE-LITIGATION INTELLIGENCE PLATFORM
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
  );

  const headingTextNode = (
    <>
      We Didn't Build a Prediction Tool.<br />
      We Built an Exit Ramp.
    </>
  );

  const subTextStr = "India's courts are drowning — not because judges are slow, but because too many disputes that could settle in weeks instead spend years fighting for a verdict nobody can predict. Most litigants file first and find out the real cost later — in time, money, and peace of mind.";

  const tags = [
    { text: 'Settle in Weeks', background: '#1e3a8a', color: '#ffffff' },
    { text: 'Precedent-Backed', background: '#065f46', color: '#ffffff' },
    { text: 'Data-Driven Clarity', background: '#374151', color: '#ffffff' },
    { text: 'Save Time & Money', background: '#7f1d1d', color: '#ffffff' },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-blue-500/30">

      <nav className="w-full border-b border-white/5 bg-[#000000]/80 backdrop-blur-md fixed top-0 z-[100]">
        <div className="max-w-7xl mx-auto px-6 py-4 md:py-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4">
            <img src="/assets/logo.jpg" alt="ANUMAN AI Logo" className="h-16 md:h-20 w-16 md:w-20 rounded-full object-cover border border-white/20" />
            <span className="text-2xl md:text-3xl font-bold text-white tracking-wide">ANUMAN AI</span>
          </Link>
          <div className="space-x-6 text-sm font-medium text-gray-300 hidden md:flex items-center">
            <Link href="/" className="text-blue-400 font-semibold">Home</Link>
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/impact" className="hover:text-white transition-colors">Our Impact</Link>
            <Link href="/forecast" className="hover:text-white transition-colors">Run Forecast</Link>
          </div>
        </div>
      </nav>


      <HeroScrollVideoReveal
        topText={topTextNode}
        headingText={headingTextNode}
        subText={subTextStr}
        tags={tags}
        videoSrc="https://res.cloudinary.com/dsuwzuaxp/video/upload/856381-hd_1920_1080_30fps_gsq11b.mp4"
        badgeImgSrc="https://cdn.21st.dev/assets/mirror/23/23a474e4cceeaf6b98729302d689998195e5534241cbc33ee2c64dfc351c16d6.png"
      />

      {/* STATS STRIP */}
      <section className="w-full bg-[#0a0a0a] border-y border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-300">
              This is the system you're about to enter.<br className="hidden md:block" /> Make sure you know what you're walking into.
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
            <div className="pt-6 md:pt-0">
              <div className="text-4xl lg:text-5xl font-extrabold text-blue-500 mb-2">5+ CRORE</div>
              <div className="text-gray-400 font-medium">Cases pending in<br />Indian courts</div>
            </div>
            <div className="pt-6 md:pt-0">
              <div className="text-4xl lg:text-5xl font-extrabold text-red-500 mb-2">4+ CRORE</div>
              <div className="text-gray-400 font-medium">Cases pending in<br />District Courts alone</div>
            </div>
            <div className="pt-6 md:pt-0">
              <div className="text-4xl lg:text-5xl font-extrabold text-yellow-500 mb-2">~38 MONTHS</div>
              <div className="text-gray-400 font-medium">Avg. time to resolve<br />a cheque bounce case</div>
            </div>
            <div className="pt-6 md:pt-0">
              <div className="text-4xl lg:text-5xl font-extrabold text-green-500 mb-2">₹1000s OF CR</div>
              <div className="text-gray-400 font-medium">Estimated annual<br />economic cost of delays</div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-600 mt-12 italic">
            Source: National Judicial Data Grid (NJDG) & publicly available government reports. Figures are illustrative and periodically updated.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto bg-[#000000]">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">From "Should I File?" to "Let's Settle" — In 4 Steps</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-[#121212] p-8 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
            <div className="text-blue-500 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" x2="8" y1="13" y2="13" />
                <line x1="16" x2="8" y1="17" y2="17" />
                <line x1="10" x2="8" y1="9" y2="9" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">1. Describe Your Case</h3>
            <p className="text-gray-400">Tell us the facts — dates, amounts, what happened. No legal jargon required.</p>
          </div>
          <div className="bg-[#121212] p-8 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
            <div className="text-blue-500 mb-6"><Search className="h-8 w-8" /></div>
            <h3 className="text-xl font-bold mb-3">2. Match Against Judgments</h3>
            <p className="text-gray-400">We scan hundreds of similar, publicly decided cases from Indian courts to see how this actually plays out.</p>
          </div>
          <div className="bg-[#121212] p-8 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
            <div className="text-blue-500 mb-6"><BarChart3 className="h-8 w-8" /></div>
            <h3 className="text-xl font-bold mb-3">3. See the Real Cost</h3>
            <p className="text-gray-400">Get your realistic timeline, likely award range, and what it will cost you in time and money.</p>
          </div>
          <div className="bg-[#121212] p-8 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
            <div className="text-blue-500 mb-6"><Users className="h-8 w-8" /></div>
            <h3 className="text-xl font-bold mb-3">4. Settle With Confidence</h3>
            <p className="text-gray-400">Walk into mediation with a fair, precedent-backed number both sides can actually agree to.</p>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-2xl font-bold text-gray-300">
            Litigation should be your last resort — not your default.<br />
            <span className="text-white">Now you can find out which one your case actually needs.</span>
          </p>
        </div>
      </section>

      {/* WHY TRUST THIS */}
      <section className="bg-[#0a0a0a] py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">We Show Our Work. Every Number Is Traceable.</h2>
            <p className="text-xl text-gray-400">Legal predictions without sources are just guesses in a nicer font. Here's exactly how ours are built.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-[#000000] rounded-2xl border border-white/5">
              <div className="text-2xl mb-4">🔎</div>
              <h3 className="text-xl font-bold mb-3 text-white">Grounded in Real Case Law</h3>
              <p className="text-gray-400 leading-relaxed">Every benchmark comes from real, publicly available judgments — not AI-generated hypotheticals. We link every similar case back to Indian Kanoon so you (or your lawyer) can verify it yourself.</p>
            </div>
            <div className="p-8 bg-[#000000] rounded-2xl border border-white/5">
              <div className="text-2xl mb-4">📐</div>
              <h3 className="text-xl font-bold mb-3 text-white">Transparent Confidence Scoring</h3>
              <p className="text-gray-400 leading-relaxed">We tell you exactly how many cases your forecast is based on, and rate our confidence High, Medium or Low accordingly. No hidden black boxes. No fake precision.</p>
            </div>
            <div className="p-8 bg-[#000000] rounded-2xl border border-white/5">
              <div className="text-2xl mb-4">⚖️</div>
              <h3 className="text-xl font-bold mb-3 text-white">Realistic, Not Overconfident</h3>
              <p className="text-gray-400 leading-relaxed">No algorithm knows how a judge will rule on a given day. That's why we show ranges, not false certainties — and always show our sample size.</p>
            </div>
            <div className="p-8 bg-[#000000] rounded-2xl border border-white/5">
              <div className="text-2xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-3 text-white">Privacy-First by Design</h3>
              <p className="text-gray-400 leading-relaxed">Your case facts are processed for your session only — never stored, never sold, never used to train external models.</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-2xl font-bold text-white">
              We don't predict who wins. We show you what already happened in cases like yours — so you can decide what to do next.
            </p>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto bg-[#000000]">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Built for Everyone Trying to Get Out of the Backlog — Not Deeper Into It</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#121212] p-6 rounded-xl border border-white/5">
            <div className="text-2xl mb-3">👤</div>
            <h3 className="font-bold text-lg mb-2">For Litigants</h3>
            <p className="text-gray-400 text-sm">Know your realistic odds, timeline and settlement range before you spend years and lakhs finding out the hard way.</p>
          </div>
          <div className="bg-[#121212] p-6 rounded-xl border border-white/5">
            <div className="text-2xl mb-3">⚖️</div>
            <h3 className="font-bold text-lg mb-2">For Advocates</h3>
            <p className="text-gray-400 text-sm">Set realistic client expectations instantly. Use precedent-backed ranges to anchor settlement conversations with data, not guesswork.</p>
          </div>
          <div className="bg-[#121212] p-6 rounded-xl border border-white/5">
            <div className="text-2xl mb-3">🤝</div>
            <h3 className="font-bold text-lg mb-2">For Mediators & ODR</h3>
            <p className="text-gray-400 text-sm">Bring objectivity into the room. Anchor negotiations in real awarded amounts — not gut feeling.</p>
          </div>
          <div className="bg-[#121212] p-6 rounded-xl border border-white/5">
            <div className="text-2xl mb-3">🏛️</div>
            <h3 className="font-bold text-lg mb-2">For the Justice System</h3>
            <p className="text-gray-400 text-sm">Every dispute settled pre-litigation is one less case added to a 5-crore backlog. We're built to keep small disputes out of an overburdened system.</p>
          </div>
        </div>
      </section>

      {/* COST OF NOT SETTLING */}
      <section className="bg-[#0a0a0a] py-24 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">"Let's Just Fight It Out" Sounds Simple. It Rarely Is.</h2>
            <p className="text-xl text-gray-400">Here's what the data actually shows about litigating vs. settling a typical commercial or cheque bounce dispute in India.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-white/10">
                  <th className="p-4"></th>
                  <th className="p-4 text-xl font-bold text-red-400">⚔️ LITIGATE</th>
                  <th className="p-4 text-xl font-bold text-green-400">🤝 SETTLE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold text-gray-300">Average Timeline</td>
                  <td className="p-4 text-gray-400">38+ months</td>
                  <td className="p-4 text-white font-medium">2–8 weeks</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold text-gray-300">Legal Costs</td>
                  <td className="p-4 text-gray-400">₹1,50,000+ and rising</td>
                  <td className="p-4 text-white font-medium">A fraction of litigation cost</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold text-gray-300">Outcome</td>
                  <td className="p-4 text-gray-400">Uncertain — court decides</td>
                  <td className="p-4 text-white font-medium">Mutually agreed, certain</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold text-gray-300">Enforceability</td>
                  <td className="p-4 text-gray-400">Requires final decree + execution</td>
                  <td className="p-4 text-white font-medium">Enforceable as a decree (Mediation Act, 2023)</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold text-gray-300">Business/Personal Relationship</td>
                  <td className="p-4 text-gray-400">Often damaged beyond repair</td>
                  <td className="p-4 text-white font-medium">Can be preserved</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold text-gray-300">Mental Bandwidth</td>
                  <td className="p-4 text-gray-400">Years of stress and follow-up</td>
                  <td className="p-4 text-white font-medium">Resolved, move on</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-6 italic text-center">Illustrative comparison based on typical case patterns from matched judgments. Individual cases vary.</p>

          <div className="mt-16 text-center bg-red-900/10 border border-red-500/20 p-8 rounded-2xl">
            <p className="text-xl md:text-2xl font-bold text-white">
              We're not saying never go to court. Some cases deserve their day in front of a judge.<br />
              <span className="text-red-400">We're saying — know the real cost before you choose that path. Not after.</span>
            </p>
          </div>
        </div>
      </section>

      {/* TRUST & COMPLIANCE STRIP */}
      <section className="py-12 border-b border-white/5 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-6 md:pt-0">
              <div className="flex justify-center mb-3 text-green-500"><CheckCircle2 /></div>
              <h4 className="font-bold mb-2">PUBLIC DATA ONLY</h4>
              <p className="text-sm text-gray-400">Based solely on publicly available judgments and pendency statistics.</p>
            </div>
            <div className="pt-6 md:pt-0">
              <div className="flex justify-center mb-3 text-green-500"><CheckCircle2 /></div>
              <h4 className="font-bold mb-2">NON-ADVISORY BY DESIGN</h4>
              <p className="text-sm text-gray-400">A statistical benchmarking tool, not legal advice or an attorney-client relationship.</p>
            </div>
            <div className="pt-6 md:pt-0">
              <div className="flex justify-center mb-3 text-green-500"><CheckCircle2 /></div>
              <h4 className="font-bold mb-2">PRIVACY-FIRST</h4>
              <p className="text-sm text-gray-400">Session-based processing. No permanent storage of your case facts.</p>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-10 font-medium tracking-wide">
            We don't claim predictive certainty. We claim complete methodological transparency.
          </p>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto bg-[#000000]">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">The Team Behind the Data</h2>
        </div>
        <div className="flex justify-center">
          <div className="bg-[#121212] rounded-2xl border border-white/5 overflow-hidden group max-w-sm w-full">
            <div className="h-96 w-full relative">
              <img src="/assets/founder.jpg" alt="Saatvik Pundeer" className="absolute inset-0 w-full h-full object-cover object-top" />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-1">Saatvik Pundeer</h3>
              <p className="text-blue-400 text-sm font-medium mb-4">Founder</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Passionate about bringing transparency, data, and speed to dispute resolution, building the infrastructure to settle disputes before they enter the backlog.
              </p>
              <a href="https://www.linkedin.com/in/saatvik-pundeer-b3a16b436/" target="_blank" rel="noopener noreferrer" className="inline-block text-blue-500 hover:text-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 px-6 lg:px-8 max-w-4xl mx-auto bg-[#000000]">
        <h2 className="text-4xl font-bold mb-12 text-center">Questions You Should Be Asking<br /><span className="text-gray-400 text-2xl">(And We're Answering Honestly)</span></h2>

        <div className="space-y-8">
          <div>
            <h4 className="text-xl font-bold text-white mb-2">Q1. Is this legal advice?</h4>
            <p className="text-gray-400">No. This is a statistical benchmarking tool based on publicly available case law. It does not replace a qualified advocate — consult one before making legal decisions.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-2">Q2. How accurate is this?</h4>
            <p className="text-gray-400">No tool can guarantee a court outcome. We show historical ranges from factually similar decided cases, along with our confidence level and sample size — so you know exactly how much weight to place on it.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-2">Q3. Where does your data come from?</h4>
            <p className="text-gray-400">Publicly available judgments (via Indian Kanoon) and pendency trends (via NJDG/eCourts). We're not affiliated with either — we simply use public data responsibly, with full attribution.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-2">Q4. Are you predicting whether I'll win or lose?</h4>
            <p className="text-gray-400">No — deliberately. Litigation depends on evidence, procedure and judicial discretion we can't know from a summary. We benchmark quantum, timelines and argument success rates — not "win/lose."</p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-2">Q5. Why should I trust settlement over litigation?</h4>
            <p className="text-gray-400">We're not asking you to trust us — we're showing you the data. In matched case patterns, litigation consistently costs more time and money than settlement, with less certainty of outcome. You decide, with full information.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-2">Q6. Is my case data safe?</h4>
            <p className="text-gray-400">Yes. Processed only for your session, never stored permanently, never sold or used for model training.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-2">Q7. Can I use this in mediation or court?</h4>
            <p className="text-gray-400">Yes, as a data-backed negotiation aid — many advocates and mediators use precedent ranges to anchor settlement discussions. It is not admissible evidence or a legal opinion.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-2">Q8. What happens after I submit my case?</h4>
            <p className="text-gray-400">We generate your report in real time. Nothing is saved beyond your active session unless you choose to download your report/brief.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-2">Q9. Does this replace my lawyer?</h4>
            <p className="text-gray-400">No — and it's not meant to. Think of it as homework you bring *to* your lawyer, not a replacement for one.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-2">Q10. Why does this matter for India specifically?</h4>
            <p className="text-gray-400">Because India's courts are overwhelmed, and every case that settles early is one less case delaying justice for everyone else. This tool exists to make that choice easier, and to make it with real data.</p>
          </div>
        </div>
      </section>

      {/* CTA at Bottom */}
      <section className="py-24 text-center bg-blue-900/10 border-t border-blue-500/20">
        <h2 className="text-4xl font-bold mb-6">Ready to see the data on your dispute?</h2>
        <Link
          href="/forecast"
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-xl transition-all hover:scale-105 shadow-xl hover:shadow-blue-500/20"
        >
          Generate My Free Forecast &rarr;
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#000000] border-t border-white/5 pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img src="/assets/logo.jpg" alt="ANUMAN AI Logo" className="h-16 md:h-20 w-16 md:w-20 rounded-full object-cover border border-white/20" />
                <span className="text-2xl md:text-3xl font-bold text-white tracking-wide">ANUMAN AI</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Built to bring clarity to litigants and reduce unnecessary case pendency in Indian courts — one informed decision at a time.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><span className="text-gray-400 cursor-default">How It Works</span></li>
                <li><span className="text-gray-400 cursor-default">Methodology</span></li>
                <li><span className="text-gray-400 cursor-default">FAQs</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><span className="text-gray-400 cursor-default">About Us</span></li>
                <li><span className="text-gray-400 cursor-default">Our Impact</span></li>
                <li><span className="text-gray-400 cursor-default">Contact</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><span className="text-gray-400 cursor-default">Disclaimer</span></li>
                <li><span className="text-gray-400 cursor-default">Privacy Policy</span></li>
                <li><span className="text-gray-400 cursor-default">Terms of Use</span></li>
                <li><span className="text-gray-400 cursor-default">Data Sources & Attribution</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 text-center md:text-left md:flex justify-between items-center">
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} ANUMAN AI. All Rights Reserved. | Not a law firm. Not legal advice. Built for informational and settlement-facilitation purposes only.
            </p>
          </div>
        </div>
      </footer>

      {/* STICKY DISCLAIMER */}
      <div className="fixed bottom-0 left-0 w-full bg-[#121212] border-t border-white/10 p-3 z-50 flex justify-center items-center shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <p className="text-xs text-gray-400 text-center max-w-5xl flex items-center gap-2">

          <span>
            This tool provides statistical benchmarking based on public case law and does not constitute legal advice or guarantee any outcome. Not affiliated with Indian Kanoon, NJDG or eCourt Services.
          </span>
        </p>
      </div>

    </div>
  );
}

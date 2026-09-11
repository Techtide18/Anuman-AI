import Link from 'next/link';
import { Scale, Users, Target, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-blue-500/30 ">
      
      {/* Navigation Bar (Simple) */}
      <nav className="w-full border-b border-white/5 bg-[#000000]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 md:py-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4">
            <img src="/assets/logo.jpg" alt="ANUMAN AI Logo" className="h-16 md:h-20 w-16 md:w-20 rounded-full object-cover border border-white/20" />
            <span className="text-2xl md:text-3xl font-bold text-white tracking-wide">ANUMAN AI</span>
          </Link>
          <div className="space-x-6 text-sm font-medium text-gray-300 hidden md:flex items-center">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="text-blue-400 font-semibold">About Us</Link>
            <Link href="/impact" className="hover:text-white transition-colors">Our Impact</Link>
            <Link href="/forecast" className="hover:text-white transition-colors">Run Forecast</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 md:py-32 px-6 max-w-5xl mx-auto text-center">
        <p className="text-blue-400 uppercase tracking-widest font-semibold mb-6">About Us</p>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1]">
          We’re building the exit ramp for <br className="hidden md:block"/> 
          <span className="text-gray-400">India’s legal backlog.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          We believe that litigation should be a last resort, not a default reaction. We exist to bring transparency, data, and speed to dispute resolution.
        </p>
      </section>

      {/* The Problem & Our Story */}
      <section className="bg-[#0a0a0a] border-y border-white/5 py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">The 5 Crore Problem</h2>
            <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
              <p>
                India's justice system is one of the most respected in the world, yet it is drowning under the weight of over 50 million pending cases. Behind every statistic is a business frozen, a relationship destroyed, and years of mental bandwidth drained.
              </p>
              <p>
                The tragedy isn't just the delay—it's that a massive percentage of these cases <strong className="text-white">never needed to be litigated in the first place.</strong> They end up in court because parties lack objective data on what their dispute is actually worth, leading to ego-driven negotiations and unrealistic expectations.
              </p>
              <p>
                We built ANUMAN AI to change that. By aggregating public case law, we replace blind guesswork with statistical clarity, helping parties find a fair settlement number before the first legal notice is ever drafted.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#121212] p-8 rounded-2xl border border-white/5 flex flex-col justify-center items-center text-center aspect-square">
              <Scale className="h-10 w-10 text-blue-500 mb-4" />
              <h4 className="font-bold text-xl text-white">Objective</h4>
              <p className="text-sm text-gray-500 mt-2">Data driven, not emotion driven.</p>
            </div>
            <div className="bg-[#121212] p-8 rounded-2xl border border-white/5 flex flex-col justify-center items-center text-center aspect-square mt-8">
              <Target className="h-10 w-10 text-green-500 mb-4" />
              <h4 className="font-bold text-xl text-white">Efficient</h4>
              <p className="text-sm text-gray-500 mt-2">Resolution in weeks, not decades.</p>
            </div>
            <div className="bg-[#121212] p-8 rounded-2xl border border-white/5 flex flex-col justify-center items-center text-center aspect-square -mt-8">
              <Users className="h-10 w-10 text-purple-500 mb-4" />
              <h4 className="font-bold text-xl text-white">Accessible</h4>
              <p className="text-sm text-gray-500 mt-2">Usable by anyone, anywhere.</p>
            </div>
            <div className="bg-blue-600 p-8 rounded-2xl flex flex-col justify-center items-center text-center aspect-square shadow-xl shadow-blue-500/20">
              <h4 className="font-bold text-2xl text-white mb-2">Join Us</h4>
              <p className="text-sm text-blue-100">Help us reform dispute resolution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership / Team */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">The Team Behind the Data</h2>
        </div>
        <div className="flex justify-center">
          <div className="bg-[#121212] rounded-2xl border border-white/5 overflow-hidden group max-w-sm w-full">
            <div className="h-80 w-full relative">
              <img src="/assets/founder.jpg" alt="Saatvik Pundeer" className="absolute inset-0 w-full h-full object-cover object-top" />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-1">Saatvik Pundeer</h3>
              <p className="text-blue-400 text-sm font-medium mb-4">Founder</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Passionate about bringing transparency, data, and speed to dispute resolution, building the infrastructure to settle disputes before they enter the backlog.
              </p>
              <a href="https://www.linkedin.com/in/saatvik-pundeer-b3a16b436/" target="_blank" rel="noopener noreferrer" className="inline-block text-blue-500 hover:text-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-blue-900/10 border-t border-blue-500/20 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">See the platform in action.</h2>
        <Link
          href="/forecast"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105"
        >
          Run a Forecast <ArrowRight className="h-5 w-5" />
        </Link>
      </section>
      
    </div>
  );
}

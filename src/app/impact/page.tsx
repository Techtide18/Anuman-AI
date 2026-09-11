import Link from 'next/link';
import { Scale, Activity, Clock, TrendingDown, ArrowRight } from 'lucide-react';

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-blue-500/30 ">
      
      {/* Navigation Bar */}
      <nav className="w-full border-b border-white/5 bg-[#000000]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 md:py-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4">
            <img src="/assets/logo.jpg" alt="ANUMAN AI Logo" className="h-16 md:h-20 w-16 md:w-20 rounded-full object-cover border border-white/20" />
            <span className="text-2xl md:text-3xl font-bold text-white tracking-wide">ANUMAN AI</span>
          </Link>
          <div className="space-x-6 text-sm font-medium text-gray-300 hidden md:flex items-center">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/impact" className="text-blue-400 font-semibold">Our Impact</Link>
            <Link href="/forecast" className="hover:text-white transition-colors">Run Forecast</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 md:py-32 px-6 max-w-5xl mx-auto text-center">
        <p className="text-green-400 uppercase tracking-widest font-semibold mb-6 flex items-center justify-center gap-2">
          <Activity className="h-5 w-5" /> Live Impact Metrics
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1]">
          Measuring what matters.
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Every dispute settled out of court is a step toward a more efficient justice system. Here is the ripple effect of choosing settlement over litigation.
        </p>
      </section>

      {/* Big Numbers Grid */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-10 flex flex-col justify-center items-center text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Scale className="h-32 w-32" />
            </div>
            <div className="text-5xl lg:text-6xl font-extrabold text-blue-500 mb-4 tracking-tighter">120+</div>
            <h3 className="text-xl font-bold text-white mb-2">Cases Analyzed</h3>
            <p className="text-gray-500 text-sm">Disputes benchmarked using our platform this month.</p>
          </div>
          
          <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-10 flex flex-col justify-center items-center text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Clock className="h-32 w-32" />
            </div>
            <div className="text-5xl lg:text-6xl font-extrabold text-yellow-500 mb-4 tracking-tighter">380+</div>
            <h3 className="text-xl font-bold text-white mb-2">Court Years Saved</h3>
            <p className="text-gray-500 text-sm">Estimated total time saved by diverting disputes to mediation.</p>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-10 flex flex-col justify-center items-center text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <TrendingDown className="h-32 w-32" />
            </div>
            <div className="text-5xl lg:text-6xl font-extrabold text-green-500 mb-4 tracking-tighter">₹1.8 Cr+</div>
            <h3 className="text-xl font-bold text-white mb-2">Legal Fees Averted</h3>
            <p className="text-gray-500 text-sm">Estimated direct legal expenses saved by settling early.</p>
          </div>
        </div>
        <p className="text-center text-xs text-gray-600 mt-6 italic">
          * Note: The above metrics are placeholders for demonstration purposes and will be updated dynamically as platform adoption scales.
        </p>
      </section>

      {/* The Systemic Impact */}
      <section className="bg-[#0a0a0a] border-y border-white/5 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">The Ripple Effect of Settlement</h2>
          <p className="text-lg text-gray-400 leading-relaxed mb-12">
            When you choose to settle a commercial dispute or a cheque bounce case out of court, you aren't just saving your own time and money. You are freeing up a judge's docket. 
            <br/><br/>
            By keeping straightforward civil disputes out of the backlog, the judicial system can reallocate its limited resources to where they are needed most: <strong>criminal cases, constitutional matters, and severe injustices that require a judge's immediate intervention.</strong>
          </p>
          
          <div className="bg-[#121212] border border-blue-500/20 p-8 rounded-2xl text-left">
            <h3 className="text-xl font-bold text-blue-400 mb-4">A Shared Responsibility</h3>
            <p className="text-gray-300">
              Reducing the 5-crore backlog isn't solely the government's job. It requires litigants and advocates to make data-driven decisions and embrace mediation for disputes that don't belong in a courtroom. We provide the data; you make the impact.
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">See how much time your case will take in court.</h2>
        <Link
          href="/forecast"
          className="inline-flex items-center gap-2 bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105"
        >
          Check Your Timeline <ArrowRight className="h-5 w-5" />
        </Link>
      </section>

    </div>
  );
}

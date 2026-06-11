import React from 'react';
import { Eye } from 'lucide-react';

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Hero Section */}
      <div 
        className="relative bg-black pt-24 pb-32 px-4 overflow-hidden"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% -20%, #1a365d 0%, #000000 100%)'
        }}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
        <div className="max-w-[1000px] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
            <Eye size={14} className="text-[#29abe2]" /> The Vision
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-8 leading-[1.1]">
            To engineer the ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#29abe2] to-[#63b3ed]">automotive research platform</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-medium max-w-[800px] mx-auto leading-relaxed">
            where comprehensive data, radical transparency, and expert insights put the buyer entirely in the driver's seat.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-[1000px] mx-auto px-4 -mt-16 relative z-20">
        <div className="light-glass-card rounded-[32px] p-8 md:p-12 shadow-2xl backdrop-blur-xl border border-white/60 bg-white/80">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="w-full md:w-[55%] flex justify-center">
              <img 
                src="https://www.image2url.com/r2/default/images/1780503757854-52a9c5a2-a131-4784-9221-4302ba2f79a4.png" 
                alt="The Mission" 
                className="w-full h-auto max-w-[700px] object-contain"
              />
            </div>
            <div className="w-full md:w-[45%]">
              <h2 className="text-sm font-black text-[#29abe2] tracking-widest uppercase mb-3">The Mission</h2>
              <p className="text-xl md:text-2xl font-bold text-slate-800 leading-snug">
                To empower car buyers by transforming standard automotive data into a crystal-clear, comprehensive picture of every vehicle.
              </p>
              <p className="text-lg text-slate-600 font-medium mt-4 leading-relaxed">
                We leverage the bleeding edge of AI to move faster, adapt quicker, and continually surface the insights buyers need most—from factory specs to real-world reviews.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Tenets */}
      <div className="max-w-[1000px] mx-auto px-4 mt-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Our Core Tenets</h2>
          <div className="w-16 h-1 bg-[#29abe2] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tenet 1 */}
          <div className="light-glass rounded-[24px] p-8 hover:bg-white/80 transition-all group">
            <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Data, Elevated</h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              The data is the same; the delivery is just better. We take complex, fragmented information—including preemptive recall alerts and deep third-party specs—and translate it into an actionable, intuitive experience.
            </p>
          </div>

          {/* Tenet 2 */}
          <div className="light-glass rounded-[24px] p-8 hover:bg-white/80 transition-all group">
            <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Real-World Perspectives</h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              Spec sheets only tell half the story. We integrate unique perspectives and video content from trusted automotive influencers, bringing hands-on, human context directly into the research phase.
            </p>
          </div>

          {/* Tenet 3 */}
          <div className="light-glass rounded-[24px] p-8 hover:bg-white/80 transition-all group">
            <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Hyperspeed Innovation</h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              We don't carry corporate weight. We are an AI-native startup, building and iterating at the speed of thought. When the market shifts, we don't hold committee meetings—we pivot, adapt, and deploy.
            </p>
          </div>

          {/* Tenet 4 */}
          <div className="light-glass rounded-[24px] p-8 hover:bg-white/80 transition-all group">
            <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Continuous Evolution</h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              Good enough is a starting line. We are committed to constantly streamlining our platform, utilizing the latest technology to ensure our buyers always have the sharpest tools at their disposal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

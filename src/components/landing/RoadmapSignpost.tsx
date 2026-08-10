import React from 'react';

export const RoadmapSignpost: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10 py-6">
      <div className="text-center mb-6 space-y-1">
        <span className="font-mono text-xs text-goa-pink uppercase tracking-widest font-bold">
          /// EVENT MILESTONES & NUMBERS
        </span>
        <h2 className="font-display text-4xl sm:text-5xl font-black text-goa-gold uppercase tracking-tight">
          THE ROADMAP TO GOA
        </h2>
      </div>

      <div className="relative flex flex-col items-center">
        <div className="w-5 h-80 bg-goa-green-deep border-2 border-goa-gold rounded-full shadow-2xl relative">
          <div className="absolute inset-0 bg-linear-to-b from-goa-gold/20 to-transparent" />
        </div>

        <div className="absolute top-4 flex flex-col items-center space-y-4 w-full max-w-lg">
          <div className="w-full bg-goa-gold text-goa-green-deep border-2 border-goa-green-deep font-display font-black text-xl sm:text-2xl py-2.5 px-6 rounded-l-2xl shadow-xl flex justify-between items-center transform -rotate-1 hover:rotate-0 transition-transform">
            <span className="font-mono text-xs text-goa-green-deep/60 font-bold uppercase">2024 REGISTRATIONS</span>
            <span className="tracking-wide">6,800+ BUILDERS</span>
            <span className="font-mono text-lg">➔</span>
          </div>

          <div className="w-full bg-goa-pink text-white border-2 border-white font-display font-black text-xl sm:text-2xl py-2.5 px-6 rounded-r-2xl shadow-xl flex justify-between items-center transform rotate-1 hover:rotate-0 transition-transform">
            <span className="font-mono text-lg">⬅</span>
            <span className="tracking-wide">500+ ELITE HACKERS</span>
            <span className="font-mono text-xs text-white/70 font-bold uppercase">LOCKED IN GOA</span>
          </div>

          <div className="w-full bg-goa-gold text-goa-green-deep border-2 border-goa-green-deep font-display font-black text-xl sm:text-2xl py-2.5 px-6 rounded-l-2xl shadow-xl flex justify-between items-center transform -rotate-1 hover:rotate-0 transition-transform">
            <span className="font-mono text-xs text-goa-green-deep/60 font-bold uppercase">SHIPPED DEMOS</span>
            <span className="tracking-wide">100+ PROJECTS</span>
            <span className="font-mono text-lg">➔</span>
          </div>

          <div className="w-full bg-goa-pink text-goa-gold border-2 border-goa-gold font-display font-black text-xl sm:text-2xl py-2.5 px-6 rounded-r-2xl shadow-xl flex justify-between items-center transform rotate-1 hover:rotate-0 transition-transform">
            <span className="font-mono text-lg">⬅</span>
            <span className="tracking-wide">$50,000+ BOUNTIES</span>
            <span className="font-mono text-xs text-goa-gold/80 font-bold uppercase">2026 EDITION</span>
          </div>
        </div>
      </div>
    </section>
  );
};

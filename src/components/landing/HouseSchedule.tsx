import React from 'react';

export const HouseSchedule: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 pt-8 space-y-8">
      <div className="text-center space-y-1">
        <span className="font-mono text-xs text-goa-pink uppercase tracking-widest font-bold">
          /// 4 DAYS · ONE INTENTIONAL RHYTHM
        </span>
        <h2 className="font-display text-4xl sm:text-5xl font-black text-goa-gold uppercase tracking-tight">
          HOUSE SCHEDULE
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-goa-gold text-goa-green-deep border-3 border-goa-green-deep p-5 rounded-2xl relative shadow-2xl flex flex-col justify-between h-48 transform -rotate-1 hover:rotate-0 transition-transform">
          <div className="absolute -top-3 left-4 w-3.5 h-3.5 bg-goa-green-deep rounded-full border-2 border-white" />
          <div className="absolute -top-3 right-4 w-3.5 h-3.5 bg-goa-green-deep rounded-full border-2 border-white" />

          <div>
            <div className="font-mono text-[10px] text-goa-green-deep/60 font-bold uppercase tracking-wider mb-1">
              DAY 01 // 28 OCT
            </div>
            <h3 className="font-display font-black text-2xl uppercase leading-tight">
              GENESIS DAY
            </h3>
          </div>
          <div className="font-mono text-xs font-bold border-t-2 border-goa-green-deep/20 pt-2">
            WHERE IT ALL BEGINS
          </div>
        </div>

        <div className="bg-goa-pink text-white border-3 border-white p-5 rounded-2xl relative shadow-2xl flex flex-col justify-between h-48 transform rotate-1 hover:rotate-0 transition-transform">
          <div className="absolute -top-3 left-4 w-3.5 h-3.5 bg-white rounded-full border-2 border-goa-pink" />
          <div className="absolute -top-3 right-4 w-3.5 h-3.5 bg-white rounded-full border-2 border-goa-pink" />

          <div>
            <div className="font-mono text-[10px] text-white/70 font-bold uppercase tracking-wider mb-1">
              DAY 02 // 29 OCT
            </div>
            <h3 className="font-display font-black text-2xl uppercase leading-tight">
              DAY OF TRIANGLE
            </h3>
          </div>
          <div className="font-mono text-xs font-bold border-t-2 border-white/20 pt-2">
            PROBLEM. SOLUTION. MARKET.
          </div>
        </div>

        <div className="bg-goa-pink text-white border-3 border-white p-5 rounded-2xl relative shadow-2xl flex flex-col justify-between h-48 transform -rotate-1 hover:rotate-0 transition-transform">
          <div className="absolute -top-3 left-4 w-3.5 h-3.5 bg-white rounded-full border-2 border-goa-pink" />
          <div className="absolute -top-3 right-4 w-3.5 h-3.5 bg-white rounded-full border-2 border-goa-pink" />

          <div>
            <div className="font-mono text-[10px] text-white/70 font-bold uppercase tracking-wider mb-1">
              DAY 03 // 30 OCT
            </div>
            <h3 className="font-display font-black text-2xl uppercase leading-tight">
              BUILD DAY
            </h3>
          </div>
          <div className="font-mono text-xs font-bold border-t-2 border-white/20 pt-2">
            HEADS DOWN. SHIP OR SHIP.
          </div>
        </div>

        <div className="bg-goa-gold text-goa-green-deep border-3 border-goa-green-deep p-5 rounded-2xl relative shadow-2xl flex flex-col justify-between h-48 transform rotate-1 hover:rotate-0 transition-transform">
          <div className="absolute -top-3 left-4 w-3.5 h-3.5 bg-goa-green-deep rounded-full border-2 border-white" />
          <div className="absolute -top-3 right-4 w-3.5 h-3.5 bg-goa-green-deep rounded-full border-2 border-white" />

          <div>
            <div className="font-mono text-[10px] text-goa-green-deep/60 font-bold uppercase tracking-wider mb-1">
              DAY 04 // 31 OCT
            </div>
            <h3 className="font-display font-black text-2xl uppercase leading-tight">
              LAUNCH DAY
            </h3>
          </div>
          <div className="font-mono text-xs font-bold border-t-2 border-goa-green-deep/20 pt-2">
            THE WORLD WATCHES.
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { CreationMode } from '../../types';

interface NoticeBoardProps {
  onStart: (mode: CreationMode) => void;
}

export const NoticeBoard: React.FC<NoticeBoardProps> = ({ onStart }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 pt-8 space-y-6">
      <div className="text-center space-y-1">
        <div className="font-mono text-xs text-goa-pink uppercase tracking-widest font-bold">
          PINNED UP
        </div>
        <h2 className="font-display text-4xl sm:text-5xl font-black text-goa-gold uppercase tracking-tight">
          NOTICE BOARD
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="bg-[#F5F0E1] text-goa-green-deep border-2 border-goa-cream-dark p-6 rounded-2xl relative shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-goa-pink rounded-full shadow-md border-2 border-white" />
          <h3 className="font-display font-black text-2xl text-goa-green-deep uppercase leading-tight mb-2 text-center">
            Task #1 HH Goa Frame / ID Card Generator
          </h3>
          <p className="font-mono text-xs text-goa-green-deep/70 text-center mb-4 leading-relaxed">
            Design your official HH Goa 2026 builder card. Share on X with #FrameInGoa to get featured on the Celeb Radar.
          </p>
          <div className="text-center">
            <button
              onClick={() => onStart('builder')}
              className="bg-goa-pink text-white font-mono text-xs font-bold px-5 py-2.5 rounded-lg uppercase shadow-md hover:bg-goa-green-deep transition-colors cursor-pointer"
            >
              GENERATE FRAME NOW →
            </button>
          </div>
        </div>

        <div className="bg-[#F5F0E1] text-goa-green-deep border-2 border-goa-cream-dark p-6 rounded-2xl relative shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-goa-gold rounded-full shadow-md border-2 border-white" />
          <h3 className="font-display font-black text-2xl text-goa-green-deep uppercase leading-tight mb-2 text-center">
            HHGoa '26: Selection & Residency
          </h3>
          <p className="font-mono text-xs text-goa-green-deep/70 text-center mb-4 leading-relaxed">
            Open Trials (Aug) → Partner Trials (Sep) → RSVP & Stake (Late Sep) → 247 builders lock in at Goa from Oct 28–31.
          </p>
          <div className="text-center">
            <a
              href="https://hacker-house-goa-2026.devfolio.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-goa-green-deep text-goa-gold font-mono text-xs font-bold px-5 py-2.5 rounded-lg uppercase shadow-md hover:bg-goa-pink hover:text-white transition-colors inline-block"
            >
              APPLY ON DEVFOLIO ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

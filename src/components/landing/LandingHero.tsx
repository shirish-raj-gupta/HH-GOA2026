import React from 'react';
import { CreationMode } from '../../types';
import { HeroCardPreview } from './HeroCardPreview';
import { RoadmapSignpost } from './RoadmapSignpost';
import { HouseSchedule } from './HouseSchedule';
import { NoticeBoard } from './NoticeBoard';

interface LandingHeroProps {
  onStart: (mode: CreationMode) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onStart }) => {
  return (
    <div className="w-full relative z-10 space-y-20 pb-16 overflow-hidden">
      {/* FULL-WIDTH SPREAD EDGE-TO-EDGE MASTER HERO SECTION */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-4 sm:pt-6 relative z-10">
        <div className="relative w-full rounded-3xl border-2 border-goa-gold bg-[#072414] overflow-hidden shadow-[0_0_90px_rgba(232,200,64,0.3)]">
          {/* Edge-to-Edge Background Poster Artwork */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src="/assets/image.png"
              alt="Hacker House Goa 2026 Poster Background"
              className="w-full h-full object-cover object-top opacity-40 filter contrast-110 saturate-125 transition-opacity duration-1000"
            />
            {/* Atmospheric Gradient Masks for Perfect Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#072414]/95 via-[#072414]/75 to-[#072414]/90" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#072414]/50 via-transparent to-[#072414]/95" />
          </div>

          {/* Corner Cyber Brackets */}
          <div className="absolute top-5 left-5 w-5 h-5 border-t-2 border-l-2 border-goa-gold z-20 pointer-events-none" />
          <div className="absolute top-5 right-5 w-5 h-5 border-t-2 border-r-2 border-goa-gold z-20 pointer-events-none" />
          <div className="absolute bottom-5 left-5 w-5 h-5 border-b-2 border-l-2 border-goa-gold z-20 pointer-events-none" />
          <div className="absolute bottom-5 right-5 w-5 h-5 border-b-2 border-r-2 border-goa-gold z-20 pointer-events-none" />

          {/* Foreground Expansive Content Grid */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-14 xl:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[640px]">
            {/* Left Column: Expansive Headline, Description & Action CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-7">
              {/* Event Location Badge */}
              <div className="inline-flex items-center gap-3 bg-black/60 backdrop-blur-md border border-goa-gold/40 px-5 py-2 rounded-full font-mono text-xs sm:text-sm text-goa-gold font-bold uppercase tracking-widest w-fit shadow-xl">
                <span className="w-2.5 h-2.5 bg-goa-gold rounded-full animate-ping" />
                <span>GOA, INDIA | 28 — 31 OCT 2026</span>
              </div>

              {/* Expansive Headline */}
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-goa-gold uppercase leading-[0.86] tracking-tight drop-shadow-2xl">
                PUT YOUR FACE<br />
                ON THE BUILDER<br />
                <span className="relative inline-block text-white">
                  MAP.
                  <span className="absolute -top-4 -right-16 sm:-right-24 bg-goa-pink text-white font-display text-xl sm:text-3xl font-black px-4 py-1 rounded-xl shadow-2xl transform -rotate-6 animate-float border-2 border-white/30">
                    गोवा
                  </span>
                </span>
              </h1>

              {/* Description Subtext */}
              <p className="font-body text-base sm:text-xl lg:text-2xl text-[#F5F0E1]/90 max-w-2xl leading-relaxed border-l-4 border-goa-gold pl-5 drop-shadow">
                Turn your photo into an official HH Goa 2026 builder identity credential in seconds. Less Noise. More Signal.
              </p>

              {/* Primary Call to Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 pt-3">
                <button
                  type="button"
                  onClick={() => onStart('builder')}
                  className="btn-pink text-sm sm:text-base py-4.5 px-9 flex items-center justify-center gap-3 rounded-2xl shadow-[0_0_40px_rgba(255,45,120,0.55)] hover:shadow-[0_0_55px_rgba(232,200,64,0.75)] font-mono font-black uppercase tracking-wider cursor-pointer transform hover:-translate-y-0.5 transition-all"
                >
                  <span>CREATE BUILDER ID CARD</span>
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </button>

                <button
                  type="button"
                  onClick={() => onStart('pfp')}
                  className="btn-gold-outline text-sm sm:text-base py-4 px-7 flex items-center justify-center gap-2 rounded-2xl font-mono font-bold uppercase tracking-wider cursor-pointer transform hover:-translate-y-0.5 transition-all"
                >
                  <span>PFP PROFILE FRAME</span>
                </button>
              </div>

              {/* Feature Trust Badges */}
              <div className="font-mono text-xs sm:text-sm text-[#F5F0E1]/60 flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
                <span>✦ No account required</span>
                <span>•</span>
                <span>✦ Instant local browser processing</span>
                <span>•</span>
                <span>✦ 1080p High-Res PNG</span>
              </div>
            </div>

            {/* Right Column: Live Interactive Builder Card Preview */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <div className="w-full max-w-md lg:max-w-none">
                <HeroCardPreview onStart={onStart} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP, SCHEDULE & NOTICE BOARD */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        <RoadmapSignpost />
        <HouseSchedule />
        <NoticeBoard onStart={onStart} />
      </div>
    </div>
  );
};

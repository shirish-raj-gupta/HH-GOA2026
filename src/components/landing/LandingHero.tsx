import React from 'react';
import { CreationMode } from '../../types';
import { HeroVectorBackdrop } from './HeroVectorBackdrop';
import { HeroCardPreview } from './HeroCardPreview';
import { RoadmapSignpost } from './RoadmapSignpost';
import { HouseSchedule } from './HouseSchedule';
import { NoticeBoard } from './NoticeBoard';

interface LandingHeroProps {
  onStart: (mode: CreationMode) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onStart }) => {
  return (
    <div className="w-full relative z-10 space-y-16 pb-16 overflow-hidden">
      <HeroVectorBackdrop />

      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-14 grid grid-cols-1 md:grid-cols-12 gap-10 items-center relative z-10">
        <div className="md:col-span-7 flex flex-col justify-center space-y-6 md:pr-6 md:border-r border-[#F5F0E1]/10 pb-6 md:pb-0 animate-fade-up">
          <div className="font-mono text-xs sm:text-sm text-[#F5F0E1]/60 flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 bg-goa-gold rounded-full inline-block animate-pulse shadow-[0_0_10px_#E8C840]" />
            <span className="tracking-widest uppercase font-semibold">GOA, INDIA | 28 — 31 OCT 2026</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-goa-gold uppercase leading-[0.88] tracking-tight drop-shadow-md">
            PUT YOUR FACE<br />
            ON THE BUILDER<br />
            <span className="relative inline-block">
              MAP.
              <span className="absolute -top-2 -right-14 sm:-right-18 bg-goa-pink text-white font-display text-xl sm:text-2xl font-black px-3 py-0.5 rounded-lg shadow-xl transform -rotate-6 animate-float border-2 border-white/20">
                गोवा
              </span>
            </span>
          </h1>

          <p className="font-body text-base sm:text-xl text-[#F5F0E1]/80 max-w-lg leading-relaxed border-l-3 border-goa-gold pl-4">
            Turn your photo into an official HH Goa 2026 builder identity in seconds. Less Noise. More Signal.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={() => onStart('builder')}
              className="btn-pink text-sm px-8 py-4 flex items-center justify-center gap-3 group rounded-xl shadow-[0_0_25px_rgba(255,45,120,0.4)] hover:shadow-[0_0_35px_rgba(232,200,64,0.6)] transform hover:-translate-y-0.5 transition-all"
            >
              <span>CREATE BUILDER ID</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>

            <button
              onClick={() => onStart('pfp')}
              className="btn-gold-outline text-sm px-6 py-4 flex items-center justify-center gap-2 rounded-xl transform hover:-translate-y-0.5 transition-all"
            >
              <span>PFP PROFILE FRAME</span>
            </button>
          </div>

          <div className="pt-2 font-mono text-xs text-[#F5F0E1]/40 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>✦ No account required</span>
            <span>•</span>
            <span>✦ Fast browser processing</span>
            <span>•</span>
            <span>✦ 1080p High-Res PNG</span>
          </div>
        </div>

        <HeroCardPreview onStart={onStart} />
      </section>

      <RoadmapSignpost />
      <HouseSchedule />
      <NoticeBoard onStart={onStart} />
    </div>
  );
};

import React from 'react';
import { AppStep, CreationMode } from '../../types';

interface HeaderProps {
  currentStep: AppStep;
  currentMode: CreationMode;
  onNavigate: (step: AppStep, mode?: CreationMode) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentStep, onNavigate }) => {
  return (
    <header className="bg-goa-green-deep/90 backdrop-blur-xl border-b border-[#F5F0E1]/10 sticky top-0 z-40 w-full transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex justify-between items-center">
        <button
          onClick={() => onNavigate('LANDING')}
          className="flex items-center gap-3 group cursor-pointer text-left"
        >
          <div className="w-9 h-9 bg-goa-gold text-goa-green-deep font-display font-black text-xl flex items-center justify-center rounded-lg shadow-md group-hover:bg-goa-pink group-hover:text-white transition-all transform group-hover:scale-105">
            HH
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-goa-gold group-hover:text-goa-pink transition-colors leading-none">
              HH GOA <span className="text-goa-pink text-base font-extrabold">2026</span>
            </span>
            <span className="font-mono text-[9px] text-[#F5F0E1]/40 tracking-widest uppercase mt-0.5">
              2:47 PM STUDIO
            </span>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-4 font-mono text-xs text-[#F5F0E1]/60">
          <div className="flex items-center gap-2 bg-goa-surface border border-[#F5F0E1]/10 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-goa-gold rounded-full animate-pulse" />
            <span className="text-goa-gold font-semibold">GOA, INDIA</span>
            <span className="text-[#F5F0E1]/30">·</span>
            <span>28 — 31 OCT 2026</span>
          </div>

          <a
            href="https://x.com/search?q=%23FrameInGoa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F5F0E1]/50 hover:text-goa-pink transition-colors font-mono text-xs uppercase flex items-center gap-1"
          >
            <span>#FrameInGoa</span>
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          {currentStep !== 'STUDIO' ? (
            <button
              onClick={() => onNavigate('STUDIO', 'builder')}
              className="relative group bg-goa-gold text-goa-green-deep font-mono text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded border-2 border-goa-gold hover:bg-goa-pink hover:text-white hover:border-goa-pink transition-all shadow-lg flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>MAKE FRAME</span>
              <span className="material-symbols-outlined text-base group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </button>
          ) : (
            <a
              href="https://hacker-house-goa-2026.devfolio.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-goa-pink text-white font-mono text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded border-2 border-goa-pink hover:bg-goa-gold hover:text-goa-green-deep hover:border-goa-gold transition-all shadow-lg flex items-center gap-1.5"
            >
              <span>APPLY TO HH GOA</span>
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

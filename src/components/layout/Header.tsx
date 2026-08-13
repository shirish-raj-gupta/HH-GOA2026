import React from 'react';
import { AppStep, CreationMode } from '../../types';

interface HeaderProps {
  currentStep: AppStep;
  currentMode: CreationMode;
  onNavigate: (step: AppStep, mode?: CreationMode) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentStep, onNavigate }) => {
  return (
    <header className="bg-[#0A1D13]/95 backdrop-blur-2xl border-b border-goa-gold/20 sticky top-0 z-50 w-full transition-all shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
      {/* Top micro gold highlight line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-goa-gold/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-3 sm:px-8 h-16 sm:h-20 flex justify-between items-center gap-2">
        {/* Brand Logo & Title */}
        <button
          onClick={() => onNavigate('LANDING')}
          className="flex items-center gap-2 sm:gap-3.5 group cursor-pointer text-left focus:outline-none min-w-0 shrink"
        >
          {/* Custom Sleek Monogram Badge */}
          <div className="relative flex items-center justify-center shrink-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-goa-gold via-amber-400 to-amber-600 p-[2px] shadow-[0_4px_16px_rgba(230,175,46,0.3)] group-hover:shadow-[0_0_24px_rgba(255,45,120,0.6)] group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full bg-[#0D2418] rounded-[10px] flex items-center justify-center">
                <span className="font-display font-black text-base sm:text-xl text-goa-gold group-hover:text-goa-pink transition-colors tracking-tight">
                  HH
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap">
              <span className="font-['Anybody',sans-serif] font-black text-base sm:text-xl tracking-wide uppercase leading-none flex items-center shrink-0">
                <span className="bg-gradient-to-r from-goa-gold via-[#FFF2C2] to-amber-400 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(230,175,46,0.4)] group-hover:from-amber-200 group-hover:to-goa-gold transition-all">
                  HACKER
                </span>
                <span className="bg-gradient-to-r from-goa-pink via-pink-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(255,45,120,0.5)] group-hover:from-pink-300 group-hover:to-goa-pink transition-all">
                  HOUSE
                </span>
              </span>
              <span
                className="font-black text-xs sm:text-sm tracking-wider shrink-0 select-none"
                style={{
                  color: '#FFFFFF',
                  WebkitTextStroke: '3.5px #D8005A',
                  paintOrder: 'stroke fill',
                  filter: 'drop-shadow(0 2px 6px rgba(216, 0, 90, 0.75))',
                }}
              >
                गोवा
              </span>
              <span className="bg-goa-gold/15 text-goa-gold border border-goa-gold/40 text-[9px] sm:text-[10px] font-mono font-black px-1 sm:px-1.5 py-0.5 rounded-md uppercase tracking-widest shadow-sm shrink-0">
                '26
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)] shrink-0" />
              <span className="font-mono text-[9px] sm:text-[10px] text-[#F5F0E1]/70 tracking-widest uppercase font-bold truncate">
                2:47 PM STUDIO
              </span>
            </div>
          </div>
        </button>

        {/* Center Event Location & Date Pill */}
        <div className="hidden lg:flex items-center gap-4 font-mono text-xs shrink-0">
          <div className="flex items-center gap-2.5 bg-[#0D2418]/80 border border-goa-gold/30 px-4 py-1.5 rounded-full shadow-inner">
            <span className="w-2 h-2 bg-goa-gold rounded-full animate-ping" />
            <span className="text-goa-gold font-bold tracking-wider">GOA, INDIA</span>
            <span className="text-[#F5F0E1]/30">|</span>
            <span className="text-[#F5F0E1]/80 font-medium tracking-wide">28 — 31 OCT 2026</span>
          </div>

          <a
            href="https://x.com/search?q=%23FrameInGoa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#F5F0E1]/60 hover:text-goa-pink transition-colors font-mono text-xs uppercase font-bold tracking-wider bg-white/5 hover:bg-goa-pink/10 border border-white/10 hover:border-goa-pink/30 px-3 py-1.5 rounded-full"
          >
            <span>#FRAMEINGOA</span>
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>

        {/* Action Call-to-Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {currentStep !== 'STUDIO' ? (
            <button
              onClick={() => onNavigate('STUDIO', 'builder')}
              className="relative group bg-gradient-to-r from-goa-gold to-amber-500 hover:from-goa-pink hover:to-pink-600 text-goa-green-deep hover:text-white font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl border border-goa-gold/50 shadow-[0_4px_20px_rgba(230,175,46,0.3)] hover:shadow-[0_4px_24px_rgba(255,45,120,0.5)] transition-all cursor-pointer transform hover:-translate-y-0.5 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
            >
              <span>MAKE FRAME</span>
              <span className="material-symbols-outlined text-sm sm:text-base group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          ) : (
            <a
              href="https://hacker-house-goa-2026.devfolio.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group bg-gradient-to-r from-goa-pink via-pink-600 to-goa-pink hover:from-goa-gold hover:to-amber-500 text-white hover:text-goa-green-deep font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl border border-white/20 hover:border-goa-gold/60 shadow-[0_4px_20px_rgba(255,45,120,0.4)] hover:shadow-[0_4px_24px_rgba(230,175,46,0.5)] transition-all cursor-pointer transform hover:-translate-y-0.5 flex items-center gap-1 sm:gap-1.5 whitespace-nowrap"
            >
              <span className="hidden sm:inline">APPLY TO HH GOA</span>
              <span className="sm:hidden">APPLY</span>
              <span className="material-symbols-outlined text-xs sm:text-sm group-hover:rotate-45 transition-transform">
                open_in_new
              </span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

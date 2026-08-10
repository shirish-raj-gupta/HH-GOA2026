import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LOADING_STEPS = [
  'BOOTING TROPICAL CANVAS ENGINE...',
  'PRELOADING IMBUE & VICTOR MONO FONTS...',
  'STAMPING HH GOA 2026 OFFICIAL EMBLEM...',
  'LESS NOISE. MORE SIGNAL.'
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const showTimer = setTimeout(() => setShowContent(true), 80);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 14 + 6;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }

        if (next > 75) setCurrentStepIndex(3);
        else if (next > 50) setCurrentStepIndex(2);
        else if (next > 25) setCurrentStepIndex(1);

        return next;
      });
    }, 180);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2600);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(completeTimer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-100 bg-goa-green flex flex-col items-center justify-center overflow-hidden select-none">
      <div className="absolute inset-0 grid-bg-gold opacity-30 pointer-events-none" />

      <div className="absolute -bottom-25 left-1/2 -translate-x-1/2 pointer-events-none">
        <div
          className={`w-96 h-96 rounded-full bg-goa-gold blur-[120px] transition-all duration-1000 ${
            showContent ? 'opacity-50 scale-100' : 'opacity-0 scale-50'
          }`}
        />
      </div>

      <div className="absolute bottom-0 left-0 animate-palm-left opacity-35 pointer-events-none">
        <svg width="180" height="260" viewBox="0 0 180 260" fill="none">
          <path d="M90 260V100" stroke="#E8C840" strokeWidth="4" />
          <path d="M90 100C60 70 15 60 0 65C25 50 70 45 90 75" fill="#0D3D22" />
          <path d="M90 100C75 65 35 35 15 30C45 30 80 45 90 75" fill="#145A32" />
          <path d="M90 100C120 70 165 60 180 65C155 50 110 45 90 75" fill="#0D3D22" />
          <path d="M90 100C105 65 145 35 165 30C135 30 100 45 90 75" fill="#145A32" />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 animate-palm-right opacity-35 pointer-events-none">
        <svg width="180" height="260" viewBox="0 0 180 260" fill="none">
          <path d="M90 260V100" stroke="#E8C840" strokeWidth="4" />
          <path d="M90 100C60 70 15 60 0 65C25 50 70 45 90 75" fill="#0D3D22" />
          <path d="M90 100C75 65 35 35 15 30C45 30 80 45 90 75" fill="#145A32" />
          <path d="M90 100C120 70 165 60 180 65C155 50 110 45 90 75" fill="#0D3D22" />
          <path d="M90 100C105 65 145 35 165 30C135 30 100 45 90 75" fill="#145A32" />
        </svg>
      </div>

      <div className="absolute top-6 left-6 font-mono text-[10px] text-[#F5F0E1]/40 tracking-widest uppercase flex items-center gap-2">
        <span className="w-2 h-2 bg-goa-gold rounded-full animate-ping" />
        <span>HH GOA 2026 // BUILD STATION</span>
      </div>

      <div className="absolute top-6 right-6 font-mono text-[10px] text-goa-gold tracking-widest uppercase">
        V2026.04
      </div>

      <div
        className={`relative z-10 flex flex-col items-center text-center px-6 transition-all duration-700 ${
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="w-20 h-20 bg-goa-green-deep border-2 border-goa-gold rounded-2xl flex flex-col items-center justify-center shadow-2xl mb-6 relative group">
          <span className="font-display font-black text-3xl text-goa-gold">HH</span>
          <span className="font-mono text-[9px] text-goa-pink font-bold tracking-wider uppercase">
            GOA'26
          </span>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-goa-pink rounded-full animate-ping" />
        </div>

        <h1 className="font-display font-black text-4xl sm:text-6xl text-goa-gold uppercase tracking-tight leading-none mb-2 drop-shadow-md">
          HACKER HOUSE GOA
        </h1>
        <p className="font-mono text-xs sm:text-sm text-[#F5F0E1]/60 tracking-widest uppercase mb-8">
          FRAME YOUR BUILD ✦ GOA, INDIA ✦ OCT 28-31
        </p>

        <div className="w-72 sm:w-96 space-y-3">
          <div className="h-3 w-full bg-goa-green-deep border border-goa-gold/30 rounded-full p-0.5 relative overflow-hidden shadow-inner">
            <div
              className="h-full bg-linear-to-r from-goa-pink via-goa-gold to-goa-pink rounded-full transition-all duration-200"
              style={{ width: `${Math.min(100, Math.max(5, progress))}%` }}
            />
          </div>

          <div className="flex justify-between items-center font-mono text-[11px]">
            <span className="text-goa-gold font-bold animate-pulse">
              {LOADING_STEPS[currentStepIndex]}
            </span>
            <span className="text-[#F5F0E1]/80 font-bold">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 font-mono text-[10px] text-[#F5F0E1]/30 uppercase tracking-widest">
        ✦ PALOLEM BEACH, GOA ✦ 2026 EDITION ✦
      </div>
    </div>
  );
};

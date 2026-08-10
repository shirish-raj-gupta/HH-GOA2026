import React, { useEffect, useState } from 'react';

interface GeneratingLoaderProps {
  onComplete: () => void;
}

const LOG_MESSAGES = [
  '[SYS] INITIALIZING CANVAS RESOLUTION 1080x1350...',
  '[SYS] ALIGNING PHOTO MESH & FACIAL FIT...',
  '[SYS] STAMPING HH GOA 2026 OFFICIAL BADGE...',
  '[SYS] INJECTING BUILDER TITLE & CREDS...',
  '[SYS] ENCODING HIGH-RES PNG GRAPHIC...',
  '[SYS] FRAME LOCKED & VERIFIED.'
];

export const GeneratingLoader: React.FC<GeneratingLoaderProps> = ({ onComplete }) => {
  const [currentLogIndex, setCurrentLogIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogIndex((prev) => {
        if (prev < LOG_MESSAGES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 300);
          return prev;
        }
      });
    }, 300);

    return () => clearInterval(interval);
  }, [onComplete]);

  const progressPercent = Math.min(100, Math.round(((currentLogIndex + 1) / LOG_MESSAGES.length) * 100));

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-4 flex flex-col items-center justify-center text-center space-y-6 animate-fade-up">
      <div className="relative">
        <div className="w-20 h-20 border-2 border-[#F5F0E1]/10 border-t-goa-gold rounded-full animate-spin flex items-center justify-center">
          <span className="material-symbols-outlined text-3xl text-goa-gold">bolt</span>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="font-display font-black text-3xl sm:text-4xl text-goa-gold uppercase tracking-tight">
          GENERATING YOUR BUILDER GRAPHIC
        </h2>
        <p className="font-mono text-xs text-[#F5F0E1]/40">
          HH GOA 2026 // LESS NOISE MORE SIGNAL
        </p>
      </div>

      <div className="w-full max-w-md bg-goa-green-deep border border-[#F5F0E1]/10 p-1 rounded-full">
        <div
          className="h-3 bg-goa-gold transition-all duration-300 ease-out rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="w-full max-w-lg bg-goa-green-deep border border-[#F5F0E1]/10 rounded-lg p-4 text-left font-mono text-xs space-y-1.5 h-36 overflow-y-auto">
        {LOG_MESSAGES.slice(0, currentLogIndex + 1).map((log, index) => (
          <div
            key={index}
            className={`${
              index === currentLogIndex ? 'text-goa-gold font-bold' : 'text-[#F5F0E1]/30'
            }`}
          >
            {log}
          </div>
        ))}
        <div className="text-goa-gold">
          <span>&gt; </span>
          <span className="cursor-blink" />
        </div>
      </div>
    </div>
  );
};

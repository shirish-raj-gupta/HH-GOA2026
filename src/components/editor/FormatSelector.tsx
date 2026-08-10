import React from 'react';
import { CreationMode } from '../../types';

interface FormatSelectorProps {
  currentMode: CreationMode;
  onSelectMode: (mode: CreationMode) => void;
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({ currentMode, onSelectMode }) => {
  return (
    <div className="w-full space-y-3">
      <div className="font-mono text-xs text-goa-gold uppercase tracking-wider flex items-center justify-between">
        <span>01 // SELECT FORMAT</span>
        <span className="text-[#F5F0E1]/30 text-[10px]">[REQUIRED]</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onSelectMode('builder')}
          className={`p-4 border-2 rounded-lg text-left transition-all duration-200 cursor-pointer relative ${
            currentMode === 'builder'
              ? 'bg-goa-green-deep border-goa-gold shadow-[0_0_20px_rgba(232,200,64,0.15)]'
              : 'bg-goa-surface border-[#F5F0E1]/10 hover:border-goa-gold/50'
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <span className="material-symbols-outlined text-2xl text-goa-gold">badge</span>
            {currentMode === 'builder' && (
              <span className="bg-goa-pink text-white font-mono text-[10px] font-bold px-1.5 py-0.5 uppercase rounded">
                ACTIVE
              </span>
            )}
          </div>
          <h4 className="font-display font-extrabold text-lg text-[#F5F0E1] uppercase tracking-tight">
            BUILDER ID CARD
          </h4>
          <p className="font-body text-xs text-[#F5F0E1]/50 mt-1 leading-relaxed">
            Full social card with your photo, builder name, role, AI title & HH Goa event pass credentials.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onSelectMode('pfp')}
          className={`p-4 border-2 rounded-lg text-left transition-all duration-200 cursor-pointer relative ${
            currentMode === 'pfp'
              ? 'bg-goa-green-deep border-goa-gold shadow-[0_0_20px_rgba(232,200,64,0.15)]'
              : 'bg-goa-surface border-[#F5F0E1]/10 hover:border-goa-gold/50'
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <span className="material-symbols-outlined text-2xl text-goa-gold">account_box</span>
            <div className="flex items-center gap-1.5">
              <span className="bg-goa-green-deep text-goa-gold border border-goa-gold/30 font-mono text-[10px] px-1.5 py-0.5 uppercase rounded">
                FASTEST
              </span>
              {currentMode === 'pfp' && (
                <span className="bg-goa-pink text-white font-mono text-[10px] font-bold px-1.5 py-0.5 uppercase rounded">
                  ACTIVE
                </span>
              )}
            </div>
          </div>
          <h4 className="font-display font-extrabold text-lg text-[#F5F0E1] uppercase tracking-tight">
            PFP FRAME
          </h4>
          <p className="font-body text-xs text-[#F5F0E1]/50 mt-1 leading-relaxed">
            Square 1:1 social profile picture framed with official HH Goa 2026 border badges.
          </p>
        </button>
      </div>
    </div>
  );
};

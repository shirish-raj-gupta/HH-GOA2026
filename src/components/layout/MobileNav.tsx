import React from 'react';
import { AppStep, CreationMode } from '../../types';

interface MobileNavProps {
  currentStep: AppStep;
  currentMode: CreationMode;
  onNavigate: (step: AppStep, mode?: CreationMode) => void;
  onGenerateClick?: () => void;
  canGenerate: boolean;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentStep,
  onNavigate,
  onGenerateClick,
  canGenerate,
}) => {
  if (currentStep === 'GENERATING') return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-goa-green-deep/95 backdrop-blur-md border-t border-[#F5F0E1]/10 p-2 flex items-center justify-around font-mono text-xs">
      <button
        onClick={() => onNavigate('LANDING')}
        className={`flex flex-col items-center py-1 px-4 rounded ${
          currentStep === 'LANDING' ? 'text-goa-gold font-bold' : 'text-[#F5F0E1]/40'
        }`}
      >
        <span className="material-symbols-outlined text-lg">home</span>
        <span className="text-[10px]">HOME</span>
      </button>

      <button
        onClick={() => onNavigate('STUDIO')}
        className={`flex flex-col items-center py-1 px-4 rounded ${
          currentStep === 'STUDIO' ? 'text-goa-gold font-bold' : 'text-[#F5F0E1]/40'
        }`}
      >
        <span className="material-symbols-outlined text-lg">tune</span>
        <span className="text-[10px]">STUDIO</span>
      </button>

      {currentStep === 'STUDIO' && onGenerateClick && (
        <button
          onClick={onGenerateClick}
          disabled={!canGenerate}
          className="bg-goa-pink text-white font-bold px-4 py-2 uppercase disabled:opacity-50 flex items-center gap-1 cursor-pointer rounded-lg shadow-lg"
        >
          <span>BUILD</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      )}
    </div>
  );
};

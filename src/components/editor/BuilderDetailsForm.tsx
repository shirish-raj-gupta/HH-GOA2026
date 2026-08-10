import React, { useState } from 'react';
import { BuilderState } from '../../types';
import { fetchSuggestedTitles, getRandomTitle } from '../../utils/titleGenerator';

interface BuilderDetailsFormProps {
  builderState: BuilderState;
  onChange: (updated: Partial<BuilderState>) => void;
}

export const BuilderDetailsForm: React.FC<BuilderDetailsFormProps> = ({
  builderState,
  onChange,
}) => {
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);

  const handleGenerateTitle = async () => {
    setIsGeneratingTitle(true);
    try {
      const titles = await fetchSuggestedTitles(
        builderState.name,
        builderState.role,
        builderState.building
      );
      if (titles && titles.length > 0) {
        onChange({ title: titles[0] });
      } else {
        onChange({ title: getRandomTitle(builderState.role) });
      }
    } catch {
      onChange({ title: getRandomTitle(builderState.role) });
    } finally {
      setIsGeneratingTitle(false);
    }
  };

  const handleChipClick = (chipText: string) => {
    onChange({ title: chipText });
  };

  return (
    <div className="w-full space-y-4">
      <div className="font-mono text-xs text-goa-gold uppercase tracking-wider flex items-center justify-between">
        <span>03 // BUILDER DETAILS</span>
        <span className="text-[#F5F0E1]/30 text-[10px]">[IDENTIFIER]</span>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <label className="font-mono text-xs text-[#F5F0E1]/50 uppercase tracking-wider flex justify-between">
            <span>/// NAME</span>
            <span className="text-goa-pink text-[10px]">[REQ]</span>
          </label>
          <input
            type="text"
            value={builderState.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="e.g. ALEX RIVERA"
            maxLength={32}
            className="w-full bg-[#F5F0E1] border-2 border-goa-cream-dark focus:border-goa-gold px-3 py-2.5 font-display font-extrabold text-lg text-goa-green-deep placeholder-goa-green-deep/30 uppercase outline-none transition-colors rounded"
          />
        </div>

        <div className="space-y-1">
          <label className="font-mono text-xs text-[#F5F0E1]/50 uppercase tracking-wider flex justify-between">
            <span>/// STACK / ROLE</span>
            <span className="text-goa-pink text-[10px]">[REQ]</span>
          </label>
          <input
            type="text"
            value={builderState.role}
            onChange={(e) => onChange({ role: e.target.value })}
            placeholder="e.g. FULL-STACK / AI BUILDER"
            maxLength={36}
            className="w-full bg-[#F5F0E1] border-2 border-goa-cream-dark focus:border-goa-gold px-3 py-2.5 font-display font-extrabold text-base text-goa-green-deep placeholder-goa-green-deep/30 uppercase outline-none transition-colors rounded"
          />
        </div>

        <div className="space-y-1">
          <label className="font-mono text-xs text-[#F5F0E1]/50 uppercase tracking-wider flex justify-between">
            <span>/// WHAT ARE YOU BUILDING?</span>
            <span className="text-[#F5F0E1]/20 text-[10px]">[OPTIONAL]</span>
          </label>
          <input
            type="text"
            value={builderState.building}
            onChange={(e) => onChange({ building: e.target.value })}
            placeholder="e.g. SHIPPER OF QUESTIONABLE IDEAS"
            maxLength={48}
            className="w-full bg-[#F5F0E1] border-2 border-goa-cream-dark focus:border-goa-gold px-3 py-2.5 font-body text-sm text-goa-green-deep placeholder-goa-green-deep/30 outline-none transition-colors rounded"
          />
        </div>

        <div className="space-y-2 pt-1">
          <div className="flex justify-between items-center">
            <label className="font-mono text-xs text-goa-gold uppercase tracking-wider">
              /// BUILDER TITLE
            </label>
            <button
              type="button"
              onClick={handleGenerateTitle}
              disabled={isGeneratingTitle}
              className="font-mono text-xs text-goa-pink hover:text-goa-gold transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
            >
              <span className={`material-symbols-outlined text-sm ${isGeneratingTitle ? 'animate-spin' : ''}`}>
                autorenew
              </span>
              <span>{isGeneratingTitle ? 'GENERATING...' : '↻ REGENERATE TITLE'}</span>
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={builderState.title}
              onChange={(e) => onChange({ title: e.target.value })}
              placeholder="e.g. THE SHIP-IT ENGINEER"
              maxLength={36}
              className="w-full bg-goa-green-deep border-2 border-goa-gold px-3 py-2.5 font-display font-extrabold text-sm text-goa-gold placeholder-goa-gold/30 uppercase outline-none rounded"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {['THE SHIP-IT ENGINEER', 'THE NIGHT BUILDER', 'THE ZK ARCHITECT', 'THE BUG HUNTER', 'THE CODE POET'].map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleChipClick(chip)}
                className={`border-2 px-2.5 py-1 font-mono text-[11px] uppercase transition-all cursor-pointer rounded ${
                  builderState.title === chip
                    ? 'border-goa-pink bg-goa-pink/20 text-goa-pink'
                    : 'border-[#F5F0E1]/10 bg-goa-surface text-[#F5F0E1]/50 hover:border-goa-gold hover:text-goa-gold'
                }`}
              >
                + {chip}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

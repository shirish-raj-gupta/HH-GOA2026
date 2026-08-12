import React, { useState } from 'react';
import { BuilderState } from '../../types';
import { fetchSuggestedTitles, getRandomTitle } from '../../utils/titleGenerator';
import { BUILDER_CLASS_SUGGESTIONS } from '../../types/builder';

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
    if (builderState.title === chipText) {
      onChange({ title: '' }); // Toggle off
    } else {
      onChange({ title: chipText });
    }
  };

  const isNameEmpty = !builderState.name || !builderState.name.trim();
  const isRoleEmpty = !builderState.role || !builderState.role.trim();

  return (
    <div className="w-full space-y-4">
      <div className="font-mono text-xs text-goa-gold uppercase tracking-wider flex items-center justify-between">
        <span>03 // BUILDER DETAILS</span>
        <span className="text-[#F5F0E1]/40 text-[10px]">[DYNAMIC INJECTION]</span>
      </div>

      <div className="space-y-4">
        {/* 1. BUILDER NAME */}
        <div className="space-y-1">
          <label className="font-mono text-xs text-[#F5F0E1]/70 uppercase tracking-wider flex justify-between items-center">
            <span>/// BUILDER NAME</span>
            {isNameEmpty ? (
              <span className="text-goa-pink text-[10px] font-bold animate-pulse">[REQUIRED]</span>
            ) : (
              <span className="text-emerald-400 text-[10px] font-bold">✓ VALID</span>
            )}
          </label>
          <input
            type="text"
            value={builderState.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="e.g. ALEX RIVERA"
            maxLength={32}
            className={`w-full bg-[#F5F0E1] border-2 px-3 py-2.5 font-display font-extrabold text-lg text-goa-green-deep placeholder-goa-green-deep/30 uppercase outline-none transition-colors rounded ${
              isNameEmpty ? 'border-goa-pink/60 focus:border-goa-pink' : 'border-goa-cream-dark focus:border-goa-gold'
            }`}
          />
        </div>

        {/* 2. ROLE */}
        <div className="space-y-1">
          <label className="font-mono text-xs text-[#F5F0E1]/70 uppercase tracking-wider flex justify-between items-center">
            <span>/// ROLE / STACK</span>
            {isRoleEmpty ? (
              <span className="text-goa-pink text-[10px] font-bold animate-pulse">[REQUIRED]</span>
            ) : (
              <span className="text-emerald-400 text-[10px] font-bold">✓ VALID</span>
            )}
          </label>
          <input
            type="text"
            value={builderState.role}
            onChange={(e) => onChange({ role: e.target.value })}
            placeholder="e.g. Full Stack Developer"
            maxLength={36}
            className={`w-full bg-[#F5F0E1] border-2 px-3 py-2.5 font-display font-extrabold text-base text-goa-green-deep placeholder-goa-green-deep/30 uppercase outline-none transition-colors rounded ${
              isRoleEmpty ? 'border-goa-pink/60 focus:border-goa-pink' : 'border-goa-cream-dark focus:border-goa-gold'
            }`}
          />
        </div>

        {/* 3. CURRENT BUILD */}
        <div className="space-y-1">
          <label className="font-mono text-xs text-[#F5F0E1]/70 uppercase tracking-wider flex justify-between items-center">
            <span>/// CURRENT BUILD</span>
            <span className="text-[#F5F0E1]/30 text-[10px]">[OPTIONAL • {builderState.building.length}/48]</span>
          </label>
          <input
            type="text"
            value={builderState.building}
            onChange={(e) => onChange({ building: e.target.value })}
            placeholder="e.g. AI Forest Fire Detection Platform"
            maxLength={48}
            className="w-full bg-[#F5F0E1] border-2 border-goa-cream-dark focus:border-goa-gold px-3 py-2.5 font-body text-sm text-goa-green-deep placeholder-goa-green-deep/30 outline-none transition-colors rounded"
          />
        </div>

        {/* 4. BUILDER CLASS */}
        <div className="space-y-2 pt-1 border-t border-[#F5F0E1]/10">
          <div className="flex justify-between items-center">
            <label className="font-mono text-xs text-goa-gold uppercase tracking-wider flex items-center gap-1.5">
              <span>/// BUILDER CLASS</span>
              <span className="text-[#F5F0E1]/40 text-[10px]">(OPTIONAL)</span>
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
              <span>{isGeneratingTitle ? 'GENERATING...' : 'AI SUGGEST'}</span>
            </button>
          </div>

          <input
            type="text"
            value={builderState.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="e.g. THE SYSTEMS NOMAD (or select pill)"
            maxLength={36}
            className="w-full bg-goa-green-deep border-2 border-goa-gold px-3 py-2.5 font-display font-extrabold text-sm text-goa-gold placeholder-goa-gold/30 uppercase outline-none rounded"
          />

          <div className="flex flex-wrap gap-1.5 pt-1">
            {BUILDER_CLASS_SUGGESTIONS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleChipClick(chip)}
                className={`border px-2 py-1 font-mono text-[10px] uppercase transition-all cursor-pointer rounded ${
                  builderState.title === chip
                    ? 'border-goa-pink bg-goa-pink/20 text-goa-pink font-bold'
                    : 'border-[#F5F0E1]/15 bg-goa-surface text-[#F5F0E1]/60 hover:border-goa-gold hover:text-goa-gold'
                }`}
              >
                {builderState.title === chip ? '✓ ' : '+ '}
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


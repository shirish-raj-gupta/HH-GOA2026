import React from 'react';
import { PhotoState } from '../../types';

interface PhotoAdjusterProps {
  photoState: PhotoState;
  onChangeZoom: (zoom: number) => void;
  onChangeOffset: (offsetX: number, offsetY: number) => void;
  onToggleBwFilter: (enabled: boolean) => void;
  onReset: () => void;
}

export const PhotoAdjuster: React.FC<PhotoAdjusterProps> = ({
  photoState,
  onChangeZoom,
  onToggleBwFilter,
  onReset,
}) => {
  return (
    <div className="border-2 border-[#F5F0E1]/10 rounded-lg p-4 bg-goa-green-deep space-y-4">
      <div className="flex justify-between items-center border-b border-[#F5F0E1]/10 pb-2">
        <span className="font-mono text-xs text-goa-gold uppercase tracking-wider font-bold flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm">tune</span>
          PHOTO ADJUSTMENTS
        </span>
        <button
          type="button"
          onClick={onReset}
          className="font-mono text-[10px] text-[#F5F0E1]/60 hover:text-goa-pink underline uppercase cursor-pointer"
        >
          RESET
        </button>
      </div>

      <div className="bg-goa-surface border border-goa-gold/30 p-2.5 rounded-lg flex items-center gap-2.5 font-mono text-xs text-goa-gold">
        <span className="material-symbols-outlined text-lg text-goa-pink shrink-0">drag_pan</span>
        <span>Drag your photo directly on the preview card to reposition it freely.</span>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between items-center font-mono text-xs">
          <label className="text-[#F5F0E1] font-bold">ZOOM SCALE</label>
          <span className="text-goa-gold font-bold">{photoState.zoom.toFixed(1)}x</span>
        </div>
        <input
          type="range"
          min="1"
          max="3"
          step="0.05"
          value={photoState.zoom}
          onChange={(e) => onChangeZoom(parseFloat(e.target.value))}
          className="w-full cursor-pointer accent-goa-pink"
        />
      </div>

      <div className="pt-2 border-t border-[#F5F0E1]/10 flex items-center justify-between">
        <label className="font-mono text-xs text-[#F5F0E1] uppercase font-bold">
          HIGH-CONTRAST B&W FILTER
        </label>
        <button
          type="button"
          onClick={() => onToggleBwFilter(!photoState.bwFilter)}
          className={`w-12 h-6 border-2 rounded-full transition-colors flex items-center px-0.5 cursor-pointer ${
            photoState.bwFilter
              ? 'border-goa-pink bg-goa-pink/20'
              : 'border-[#F5F0E1]/20 bg-goa-surface'
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full transition-transform ${
              photoState.bwFilter
                ? 'bg-goa-pink translate-x-6'
                : 'bg-[#F5F0E1]/40 translate-x-0'
            }`}
          />
        </button>
      </div>
    </div>
  );
};

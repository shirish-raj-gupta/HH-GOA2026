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
  onChangeOffset,
  onToggleBwFilter,
  onReset,
}) => {
  return (
    <div className="border-2 border-[#F5F0E1]/10 rounded-lg p-4 bg-goa-green-deep space-y-4">
      <div className="flex justify-between items-center border-b border-[#F5F0E1]/10 pb-2">
        <span className="font-mono text-xs text-goa-gold uppercase tracking-wider">
          // PHOTO PARAMETERS
        </span>
        <button
          type="button"
          onClick={onReset}
          className="font-mono text-[10px] text-[#F5F0E1]/40 hover:text-goa-pink underline uppercase cursor-pointer"
        >
          RESET
        </button>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between items-center font-mono text-xs">
          <label className="text-[#F5F0E1]">ZOOM [Z]</label>
          <span className="text-goa-gold font-bold">{photoState.zoom.toFixed(1)}x</span>
        </div>
        <input
          type="range"
          min="1"
          max="3"
          step="0.05"
          value={photoState.zoom}
          onChange={(e) => onChangeZoom(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="space-y-1">
          <div className="flex justify-between font-mono text-[11px] text-[#F5F0E1]/50">
            <span>OFFSET X</span>
            <span>{photoState.offsetX}px</span>
          </div>
          <input
            type="range"
            min="-100"
            max="100"
            step="2"
            value={photoState.offsetX}
            onChange={(e) => onChangeOffset(parseInt(e.target.value, 10), photoState.offsetY)}
            className="w-full"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between font-mono text-[11px] text-[#F5F0E1]/50">
            <span>OFFSET Y</span>
            <span>{photoState.offsetY}px</span>
          </div>
          <input
            type="range"
            min="-100"
            max="100"
            step="2"
            value={photoState.offsetY}
            onChange={(e) => onChangeOffset(photoState.offsetX, parseInt(e.target.value, 10))}
            className="w-full"
          />
        </div>
      </div>

      <div className="pt-2 border-t border-[#F5F0E1]/10 flex items-center justify-between">
        <label className="font-mono text-xs text-[#F5F0E1] uppercase">
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

import React, { useEffect, useRef, useState } from 'react';
import { BuilderState, CreationMode, PhotoState } from '../../types';
import { renderBuilderCard, renderPfpFrame } from '../../utils/canvasRenderer';

interface PreviewCanvasProps {
  mode: CreationMode;
  photoState: PhotoState;
  builderState: BuilderState;
  onRenderedDataUrlChange?: (dataUrl: string) => void;
}

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({
  mode,
  photoState,
  builderState,
  onRenderedDataUrlChange,
}) => {
  const [renderedPreview, setRenderedPreview] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [showScanlines, setShowScanlines] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (photoState.sourceUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        imageRef.current = img;
        triggerRender();
      };
      img.src = photoState.sourceUrl;
    } else {
      imageRef.current = null;
      triggerRender();
    }
  }, [photoState.sourceUrl]);

  useEffect(() => {
    triggerRender();
  }, [
    mode,
    photoState.zoom,
    photoState.offsetX,
    photoState.offsetY,
    photoState.bwFilter,
    builderState.name,
    builderState.role,
    builderState.building,
    builderState.title,
    builderState.tags,
    builderState.builderId,
  ]);

  const triggerRender = async () => {
    setIsRendering(true);
    try {
      let dataUrl = '';
      if (mode === 'pfp') {
        if (imageRef.current) {
          dataUrl = await renderPfpFrame({
            image: imageRef.current,
            photoState,
          });
        }
      } else {
        dataUrl = await renderBuilderCard({
          image: imageRef.current,
          photoState,
          builderState,
        });
      }

      setRenderedPreview(dataUrl);
      if (dataUrl && onRenderedDataUrlChange) {
        onRenderedDataUrlChange(dataUrl);
      }
    } catch (err) {
      console.error('Canvas render error:', err);
    } finally {
      setIsRendering(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center relative space-y-3">
      <div className="w-full flex justify-between items-center font-mono text-xs px-1">
        <div className="text-goa-pink uppercase tracking-wider flex items-center gap-2 font-bold">
          <span className="w-2.5 h-2.5 bg-goa-pink rounded-full animate-ping" />
          <span>LIVE PREVIEW ({mode === 'pfp' ? '1:1 SQUARE' : '4:5 CARD'})</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowScanlines(!showScanlines)}
            className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-colors cursor-pointer ${
              showScanlines
                ? 'bg-goa-gold text-goa-green-deep border-goa-gold'
                : 'bg-transparent text-[#F5F0E1]/50 border-[#F5F0E1]/20 hover:text-goa-gold'
            }`}
          >
            GRID EFFECT
          </button>
          <span className="text-[#F5F0E1]/40 text-[10px]">
            {isRendering ? 'UPDATING...' : '1080×1350 PNG'}
          </span>
        </div>
      </div>

      <div className="relative w-full max-w-[580px] xl:max-w-[640px] bg-goa-green-deep border-2 border-goa-gold/40 p-3 sm:p-4 shadow-[0_0_50px_rgba(232,200,64,0.15)] rounded-2xl transition-all duration-300 group hover:border-goa-gold hover:shadow-[0_0_65px_rgba(232,200,64,0.3)]">
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-3 border-l-3 border-goa-gold rounded-tl-lg" />
        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-3 border-r-3 border-goa-gold rounded-tr-lg" />
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-3 border-l-3 border-goa-gold rounded-bl-lg" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-3 border-r-3 border-goa-gold rounded-br-lg" />

        {renderedPreview ? (
          <div className="relative w-full overflow-hidden rounded-xl bg-black">
            <img
              src={renderedPreview}
              alt="Live HH Goa 2026 Graphic Preview"
              className="w-full h-auto object-contain shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]"
            />
            {showScanlines && (
              <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
            )}
          </div>
        ) : (
          <div className="w-full aspect-4/5 bg-goa-surface flex flex-col items-center justify-center p-6 text-center border border-[#F5F0E1]/10 rounded-xl">
            <span className="material-symbols-outlined text-6xl text-goa-gold/30 mb-3 animate-pulse">
              badge
            </span>
            <span className="font-mono text-xs text-goa-gold uppercase tracking-widest border-b border-[#F5F0E1]/10 pb-1 mb-2 font-bold">
              PREVIEW READY
            </span>
            <span className="font-display font-extrabold text-base text-[#F5F0E1]/60">
              UPLOAD PHOTO TO VIEW LIVE BUILDER GRAPHIC
            </span>
          </div>
        )}
      </div>

      <div className="font-mono text-[11px] text-[#F5F0E1]/40 text-center flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 bg-goa-gold rounded-full" />
        <span>HIGH-RES 300 DPI RENDER · INSTANT PNG EXPORT</span>
      </div>
    </div>
  );
};

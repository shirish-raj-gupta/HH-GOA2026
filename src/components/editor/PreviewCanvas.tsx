import React, { useEffect, useRef, useState } from 'react';
import { BuilderState, CreationMode, PhotoState } from '../../types';
import { renderBuilderCard, renderPfpFrame } from '../../utils/canvasRenderer';

interface PreviewCanvasProps {
  mode: CreationMode;
  photoState: PhotoState;
  builderState: BuilderState;
  onSelectMode?: (mode: CreationMode) => void;
  onRenderedDataUrlChange?: (dataUrl: string) => void;
}

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({
  mode,
  photoState,
  builderState,
  onSelectMode,
  onRenderedDataUrlChange,
}) => {
  const [renderedPreview, setRenderedPreview] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [showScanlines, setShowScanlines] = useState(false);
  const [transformStyle, setTransformStyle] = useState({});
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (-y / rect.height) * 10;
    const rotateY = (x / rect.width) * 10;

    setTransformStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out',
    });
  };

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
    <div className="w-full flex flex-col items-center justify-center relative space-y-4">
      {/* MODE SELECTOR PILL TABS (EXACTLY MATCHING LANDING SCREEN CANVAS) */}
      <div className="w-full bg-goa-green-deep/90 backdrop-blur-md border-2 border-goa-gold/30 p-1.5 rounded-xl flex items-center gap-1 font-mono text-xs shadow-lg">
        <button
          type="button"
          onClick={() => onSelectMode && onSelectMode('builder')}
          className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all cursor-pointer text-center uppercase ${
            mode === 'builder'
              ? 'bg-goa-pink text-white shadow-md'
              : 'text-[#F5F0E1]/50 hover:text-goa-gold'
          }`}
        >
          BUILDER CARD (4:5)
        </button>
        <button
          type="button"
          onClick={() => onSelectMode && onSelectMode('pfp')}
          className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all cursor-pointer text-center uppercase ${
            mode === 'pfp'
              ? 'bg-goa-pink text-white shadow-md'
              : 'text-[#F5F0E1]/50 hover:text-goa-gold'
          }`}
        >
          PFP FRAME (1:1)
        </button>
      </div>

      {/* STATUS SUB-HEADER BAR */}
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

      {/* 3D INTERACTIVE CARD CONTAINER (MATCHING LANDING SCREEN CANVAS PREVIEW) */}
      <div className="relative w-full max-w-[580px] xl:max-w-[640px] flex justify-center">
        {/* Top Pin Badge */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 w-6 h-6 bg-goa-pink rounded-full shadow-[0_4px_12px_rgba(255,45,120,0.5)] border-2 border-white flex items-center justify-center pointer-events-none">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>

        {/* Cyber Deck Frame */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={transformStyle}
          className="w-full bg-goa-green-deep text-[#F5F0E1] border-2 border-goa-gold p-4 sm:p-5 relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] rounded-3xl group transition-all duration-300"
        >
          {/* Corner Cyber Brackets */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-goa-gold pointer-events-none z-20" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-goa-gold pointer-events-none z-20" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-goa-gold pointer-events-none z-20" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-goa-gold pointer-events-none z-20" />

          {renderedPreview ? (
            <div className="relative w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
              <img
                src={renderedPreview}
                alt="Live HH Goa 2026 Graphic Preview"
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.005]"
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
      </div>

      <div className="font-mono text-[11px] text-[#F5F0E1]/40 text-center flex items-center justify-center gap-2 pt-1">
        <span className="w-1.5 h-1.5 bg-goa-gold rounded-full" />
        <span>HIGH-RES 300 DPI RENDER · INSTANT PNG EXPORT</span>
      </div>
    </div>
  );
};

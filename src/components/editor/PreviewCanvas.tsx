import React, { useEffect, useRef, useCallback, useState } from 'react';
import { BuilderState, CreationMode, PhotoState } from '../../types';
import { renderBuilderCard, renderPfpFrame, ensureCanvasFontsLoaded } from '../../utils/canvasRenderer';

interface PreviewCanvasProps {
  mode: CreationMode;
  photoState: PhotoState;
  builderState: BuilderState;
  onSelectMode?: (mode: CreationMode) => void;
  onRenderedDataUrlChange?: (dataUrl: string) => void;
  onPhotoStateChange?: (updater: (prev: PhotoState) => PhotoState) => void;
}

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({
  mode,
  photoState,
  builderState,
  onSelectMode,
  onRenderedDataUrlChange,
  onPhotoStateChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const userPhotoRef = useRef<HTMLImageElement | null>(null);
  const isRenderingRef = useRef(false);
  const pendingRenderRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; offsetX: number; offsetY: number } | null>(null);

  const photoStateRef = useRef(photoState);
  const builderStateRef = useRef(builderState);
  const onDataUrlRef = useRef(onRenderedDataUrlChange);

  useEffect(() => { photoStateRef.current = photoState; }, [photoState]);
  useEffect(() => { builderStateRef.current = builderState; }, [builderState]);
  useEffect(() => { onDataUrlRef.current = onRenderedDataUrlChange; }, [onRenderedDataUrlChange]);

  const modeRef = useRef(mode);
  useEffect(() => { modeRef.current = mode; }, [mode]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!onPhotoStateChange) return;
    e.preventDefault();
    canvasRef.current?.setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      offsetX: photoStateRef.current.offsetX,
      offsetY: photoStateRef.current.offsetY,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging || !dragStartRef.current || !onPhotoStateChange) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    const scale = 300 / (canvas.clientWidth || 400);
    const newOffsetX = Math.round(Math.max(-150, Math.min(150, dragStartRef.current.offsetX + dx * scale)));
    const newOffsetY = Math.round(Math.max(-150, Math.min(150, dragStartRef.current.offsetY + dy * scale)));

    onPhotoStateChange((prev) => ({
      ...prev,
      offsetX: newOffsetX,
      offsetY: newOffsetY,
    }));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      canvasRef.current?.releasePointerCapture(e.pointerId);
      setIsDragging(false);
      dragStartRef.current = null;
    }
  };

  const doRender = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (isRenderingRef.current) {
      pendingRenderRef.current = true;
      return;
    }

    isRenderingRef.current = true;
    pendingRenderRef.current = false;

    try {
      await ensureCanvasFontsLoaded();

      const currentMode = modeRef.current;
      let dataUrl = '';
      let targetW = 1024;
      let targetH = 1536;

      if (currentMode === 'pfp') {
        targetW = 1080;
        targetH = 1080;
        dataUrl = await renderPfpFrame({
          image: userPhotoRef.current,
          photoState: photoStateRef.current,
        });
      } else {
        targetW = 1024;
        targetH = 1536;
        dataUrl = await renderBuilderCard({
          image: userPhotoRef.current,
          photoState: photoStateRef.current,
          builderState: builderStateRef.current,
        });
      }

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      const ctx = canvas.getContext('2d');
      if (ctx && dataUrl) {
        const resultImg = new Image();
        resultImg.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(resultImg, 0, 0, canvas.width, canvas.height);
          setIsReady(true);
          if (onDataUrlRef.current) {
            onDataUrlRef.current(dataUrl);
          }
        };
        resultImg.src = dataUrl;
      }
    } catch (err) {
    } finally {
      isRenderingRef.current = false;
      if (pendingRenderRef.current) {
        setTimeout(() => doRender(), 50);
      }
    }
  }, []);

  useEffect(() => {
    const url = photoState.sourceUrl;
    if (!url || url === '/assets/image2.png') {
      userPhotoRef.current = null;
      doRender();
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      userPhotoRef.current = img;
      doRender();
    };
    img.onerror = () => {
      userPhotoRef.current = null;
      doRender();
    };
    img.src = url;
  }, [photoState.sourceUrl, doRender]);

  useEffect(() => {
    doRender();
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
    doRender,
  ]);

  return (
    <div className="w-full flex flex-col items-center justify-center relative space-y-3">
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

      <div className="w-full flex justify-between items-center font-mono text-xs px-1">
        <div className="text-goa-pink uppercase tracking-wider flex items-center gap-2 font-bold">
          <span className="w-2.5 h-2.5 bg-goa-pink rounded-full animate-ping" />
          <span>LIVE PREVIEW ({mode === 'pfp' ? '1:1 SQUARE' : '4:5 CARD'})</span>
        </div>
        <span className="text-[#F5F0E1]/40 text-[10px]">1024×1536 PNG</span>
      </div>

      <div className="relative w-full max-w-105 sm:max-w-112.5 lg:max-w-115 flex justify-center">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 w-6 h-6 bg-goa-pink rounded-full shadow-[0_4px_12px_rgba(255,45,120,0.5)] border-2 border-white flex items-center justify-center pointer-events-none">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>

        <div className="w-full border-2 border-goa-gold rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] bg-amber-950 relative">
          <canvas
            ref={canvasRef}
            width={mode === 'pfp' ? 1080 : 1024}
            height={mode === 'pfp' ? 1080 : 1536}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`w-full h-auto block touch-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ display: 'block' }}
          />
          {!isReady && (
            <div className="absolute inset-0 bg-amber-950 flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 border-2 border-goa-gold/40 border-t-goa-gold rounded-full animate-spin" />
              <span className="font-mono text-xs text-goa-gold/60 uppercase tracking-widest">Rendering Card...</span>
            </div>
          )}
        </div>

        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-goa-gold pointer-events-none z-20" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-goa-gold pointer-events-none z-20" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-goa-gold pointer-events-none z-20" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-goa-gold pointer-events-none z-20" />
      </div>

      {/* DRAG INSTRUCTION BADGE BELOW IMAGE */}
      <div className="w-full max-w-105 sm:max-w-112.5 lg:max-w-115 bg-goa-green-deep/90 border border-goa-gold/40 px-3 py-2 rounded-xl flex items-center justify-center gap-2 font-mono text-xs text-goa-gold shadow-md">
        <span className="material-symbols-outlined text-sm animate-bounce text-goa-pink">drag_pan</span>
        <span className="font-bold tracking-wide uppercase text-[10px] sm:text-xs">
          CLICK & DRAG PHOTO ON PREVIEW TO REPOSITION
        </span>
      </div>

      <div className="font-mono text-[10px] text-[#F5F0E1]/40 text-center flex items-center justify-center gap-2 pt-0.5">
        <span className="w-1.5 h-1.5 bg-goa-gold rounded-full" />
        <span>HIGH-RES 300 DPI RENDER · INSTANT PNG EXPORT</span>
      </div>
    </div>
  );
};

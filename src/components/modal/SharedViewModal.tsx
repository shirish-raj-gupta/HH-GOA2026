import React, { useEffect, useState } from 'react';
import { renderBuilderCard } from '../../utils/canvasRenderer';
import { BuilderState, PhotoState } from '../../types';

export interface SharedCardInfo {
  id?: string;
  name: string;
  role: string;
  title: string;
  builderId: string;
  mode?: 'builder' | 'pfp';
  imageUrl?: string;
  imageDataUrl?: string;
}

interface SharedViewModalProps {
  cardInfo: SharedCardInfo;
  onCloseAndCreateOwn: () => void;
}

export const SharedViewModal: React.FC<SharedViewModalProps> = ({
  cardInfo,
  onCloseAndCreateOwn,
}) => {
  const [renderedUrl, setRenderedUrl] = useState<string | null>(cardInfo.imageDataUrl || null);
  const [loading, setLoading] = useState(!cardInfo.imageDataUrl);

  useEffect(() => {
    if (cardInfo.imageDataUrl) {
      setRenderedUrl(cardInfo.imageDataUrl);
      setLoading(false);
      return;
    }

    const renderCard = async () => {
      setLoading(true);

      let loadedImage: HTMLImageElement | null = null;
      if (cardInfo.imageUrl) {
        loadedImage = await new Promise<HTMLImageElement | null>((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
          img.src = cardInfo.imageUrl!;
        });
      }

      const dummyPhotoState: PhotoState = {
        file: null,
        sourceUrl: cardInfo.imageUrl || null,
        zoom: 1,
        offsetX: 0,
        offsetY: 0,
        bwFilter: false,
        aspectRatio: 1,
      };

      const builderState: BuilderState = {
        name: cardInfo.name,
        role: cardInfo.role,
        building: '',
        title: cardInfo.title,
        tags: ['RUST', 'ZK_SNARKS', 'GOA'],
        builderId: cardInfo.builderId || '#HH-GOA-2026',
      };

      try {
        const url = await renderBuilderCard({
          image: loadedImage,
          photoState: dummyPhotoState,
          builderState,
        });
        setRenderedUrl(url);
      } catch (err) {
        console.warn('Canvas render error:', err);
      } finally {
        setLoading(false);
      }
    };

    renderCard();
  }, [cardInfo]);

  return (
    <div className="fixed inset-0 z-100 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-[#072414] border-2 border-goa-gold p-6 relative rounded-3xl shadow-[0_0_60px_rgba(232,200,64,0.2)] text-center my-auto animate-fade-up space-y-4">
        {/* Corner Accents */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-goa-gold" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-goa-gold" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-goa-gold" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-goa-gold" />

        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-goa-gold/20 pb-3">
          <div className="font-mono text-[10px] text-goa-gold font-bold uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 bg-goa-gold rounded-full animate-ping" />
            <span>/// HH GOA 2026 BUILDER PASS</span>
          </div>
          <button
            type="button"
            onClick={onCloseAndCreateOwn}
            className="w-7 h-7 rounded-full bg-goa-gold/10 border border-goa-gold/40 text-goa-gold hover:bg-goa-pink hover:border-goa-pink hover:text-white transition-all flex items-center justify-center cursor-pointer"
            title="Close Preview"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {loading && (
          <div className="py-12 space-y-3">
            <span className="material-symbols-outlined text-4xl text-goa-gold animate-spin">
              sync
            </span>
            <div className="font-mono text-xs text-goa-gold uppercase tracking-wider font-bold">
              GENERATING BUILDER PASS PREVIEW...
            </div>
          </div>
        )}

        {renderedUrl && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-goa-gold uppercase tracking-tight leading-none">
                {cardInfo.name && cardInfo.name.trim() ? cardInfo.name.trim() : 'ANONYMOUS BUILDER'}
              </h2>
              {cardInfo.role && (
                <div className="inline-block bg-goa-pink text-white font-display font-bold text-[11px] py-1 px-3 rounded-full uppercase tracking-wider shadow-sm">
                  {cardInfo.role}
                </div>
              )}
            </div>

            {/* Shared Pass Image */}
            <div className="relative w-full aspect-4/5 overflow-hidden rounded-2xl border-2 border-goa-gold/50 p-1 bg-goa-green-deep shadow-2xl">
              <img
                src={renderedUrl}
                alt={`${cardInfo.name} HH Goa 2026 Pass`}
                className="w-full h-full object-contain rounded-xl"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2.5">
              <button
                type="button"
                onClick={onCloseAndCreateOwn}
                className="btn-pink w-full py-3.5 px-4 rounded-xl uppercase tracking-wider font-mono font-extrabold text-xs shadow-xl animate-pulse-glow flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>CREATE YOUR OWN HH GOA CARD</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>

              <button
                type="button"
                onClick={onCloseAndCreateOwn}
                className="w-full py-2.5 px-4 bg-goa-gold/10 hover:bg-goa-gold hover:text-goa-green-deep border border-goa-gold/40 text-goa-gold font-mono text-xs font-bold uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>CLOSE PREVIEW</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

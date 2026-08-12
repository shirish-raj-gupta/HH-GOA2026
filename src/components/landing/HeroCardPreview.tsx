import React, { useEffect, useRef, useState } from 'react';
import { CreationMode } from '../../types';
import { renderBuilderCard, renderPfpFrame, ensureCanvasFontsLoaded } from '../../utils/canvasRenderer';

interface HeroCardPreviewProps {
  onStart: (mode: CreationMode) => void;
}

export const HeroCardPreview: React.FC<HeroCardPreviewProps> = ({ onStart }) => {
  const [activeTab, setActiveTab] = useState<CreationMode>('builder');
  const [transformStyle, setTransformStyle] = useState({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pfpCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isRendered, setIsRendered] = useState(false);
  const [isPfpRendered, setIsPfpRendered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (-y / rect.height) * 12;
    const rotateY = (x / rect.width) * 12;

    setTransformStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
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
    if (activeTab !== 'builder') return;
    let isMounted = true;
    async function renderHeroCard() {
      try {
        await ensureCanvasFontsLoaded();
        const dataUrl = await renderBuilderCard({
          image: null,
          photoState: {
            file: null,
            sourceUrl: '/assets/image2.png',
            zoom: 1.1,
            offsetX: 0,
            offsetY: 0,
            bwFilter: false,
            aspectRatio: 1,
          },
          builderState: {
            name: '',
            role: '',
            building: '',
            title: '',
            tags: [],
            builderId: 'HHG26-0042',
          },
        });

        const canvas = canvasRef.current;
        if (canvas && dataUrl && isMounted) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const img = new Image();
            img.onload = () => {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              setIsRendered(true);
            };
            img.src = dataUrl;
          }
        }
      } catch (err) {
      }
    }
    renderHeroCard();
    return () => { isMounted = false; };
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== 'pfp') return;
    let isMounted = true;
    async function renderPfpPreview() {
      try {
        await ensureCanvasFontsLoaded();
        const pfpUrl = await renderPfpFrame({
          image: null,
          photoState: {
            file: null,
            sourceUrl: '',
            zoom: 1,
            offsetX: 0,
            offsetY: 0,
            bwFilter: false,
            aspectRatio: 1,
          },
        });

        const canvas = pfpCanvasRef.current;
        if (canvas && pfpUrl && isMounted) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const img = new Image();
            img.onload = () => {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              setIsPfpRendered(true);
            };
            img.src = pfpUrl;
          }
        }
      } catch (err) {
      }
    }
    renderPfpPreview();
    return () => { isMounted = false; };
  }, [activeTab]);

  return (
    <div className="md:col-span-5 relative flex flex-col items-center justify-center p-2 sm:p-4 animate-fade-up stagger-2 space-y-4">
      <div className="w-full max-w-sm bg-goa-green-deep/90 backdrop-blur-md border-2 border-goa-gold/30 p-1.5 rounded-xl flex items-center gap-1 font-mono text-xs shadow-lg">
        <button
          type="button"
          onClick={() => setActiveTab('builder')}
          className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all cursor-pointer text-center uppercase ${
            activeTab === 'builder'
              ? 'bg-goa-pink text-white shadow-md'
              : 'text-[#F5F0E1]/50 hover:text-goa-gold'
          }`}
        >
          BUILDER CARD (4:5)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('pfp')}
          className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all cursor-pointer text-center uppercase ${
            activeTab === 'pfp'
              ? 'bg-goa-pink text-white shadow-md'
              : 'text-[#F5F0E1]/50 hover:text-goa-gold'
          }`}
        >
          PFP FRAME (1:1)
        </button>
      </div>

      <div className="relative w-full max-w-sm flex justify-center">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 w-6 h-6 bg-goa-pink rounded-full shadow-[0_4px_12px_rgba(255,45,120,0.5)] border-2 border-white flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>

        {activeTab === 'builder' ? (
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onStart('builder')}
            style={transformStyle}
            className="w-full relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] rounded-3xl group cursor-pointer border-2 border-goa-gold bg-amber-950"
          >
            <div className="absolute inset-0 bg-goa-green-deep/90 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6 z-40">
              <span className="material-symbols-outlined text-5xl text-goa-gold mb-2 animate-bounce">
                badge
              </span>
              <span className="font-display font-black text-2xl text-goa-gold uppercase">
                LAUNCH BUILDER STUDIO
              </span>
              <span className="font-mono text-xs text-[#F5F0E1]/70 mt-1">
                Click to customize your Builder Card →
              </span>
            </div>

            <div className="relative w-full aspect-[2/3] overflow-hidden rounded-3xl bg-black">
              <canvas
                ref={canvasRef}
                width={1024}
                height={1536}
                className="w-full h-auto block"
              />
              {!isRendered && (
                <div className="absolute inset-0 bg-amber-950 flex flex-col items-center justify-center gap-2">
                  <div className="w-8 h-8 border-2 border-goa-gold/40 border-t-goa-gold rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onStart('pfp')}
            style={transformStyle}
            className="w-full relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] rounded-3xl group cursor-pointer border-2 border-goa-gold bg-black"
          >
            <div className="absolute inset-0 bg-goa-green-deep/85 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6 z-40">
              <span className="material-symbols-outlined text-4xl text-goa-gold mb-2 animate-bounce">
                account_box
              </span>
              <span className="font-display font-black text-2xl text-goa-gold uppercase">
                MAKE YOUR PFP FRAME
              </span>
              <span className="font-mono text-xs text-[#F5F0E1]/70 mt-1">
                Click to launch studio editor →
              </span>
            </div>

            <div className="relative w-full aspect-square overflow-hidden rounded-3xl bg-black">
              <canvas
                ref={pfpCanvasRef}
                width={1080}
                height={1080}
                className="w-full h-auto block"
              />
              {!isPfpRendered && (
                <div className="absolute inset-0 bg-goa-green-deep flex flex-col items-center justify-center gap-2">
                  <div className="w-8 h-8 border-2 border-goa-gold/40 border-t-goa-gold rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

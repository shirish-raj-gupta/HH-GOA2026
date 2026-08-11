import React, { useState } from 'react';
import { CreationMode } from '../../types';
import { AvatarSilhouetteIcon } from '../icons/AvatarSilhouetteIcon';

interface HeroCardPreviewProps {
  onStart: (mode: CreationMode) => void;
}

export const HeroCardPreview: React.FC<HeroCardPreviewProps> = ({ onStart }) => {
  const [activeTab, setActiveTab] = useState<CreationMode>('builder');
  const [transformStyle, setTransformStyle] = useState({});

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
            className="w-full bg-goa-green-deep text-[#F5F0E1] border-2 border-goa-gold p-4 sm:p-5 relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] rounded-3xl group cursor-pointer"
          >
            <div className="absolute inset-0 bg-goa-green-deep/90 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6 z-40">
              <span className="material-symbols-outlined text-4xl text-goa-gold mb-2 animate-bounce">
                badge
              </span>
              <span className="font-display font-black text-2xl text-goa-gold uppercase">
                LAUNCH VIP STUDIO EDITOR
              </span>
              <span className="font-mono text-xs text-[#F5F0E1]/70 mt-1">
                Click to customize Cyber-Tropical Deck Pass →
              </span>
            </div>

            <div className="bg-goa-green-deep/90 border border-goa-gold rounded-2xl p-2.5 mb-3 flex items-center justify-between shadow-md">
              <div className="w-8 h-8 rounded-full border-2 border-goa-pink bg-[#072414] flex flex-col items-center justify-center text-[6px] font-mono text-goa-gold font-bold leading-tight">
                <span>VERIFIED</span>
                <span>HHGOA'26</span>
              </div>

              <div className="text-center">
                <div className="font-display font-black text-base text-goa-gold uppercase tracking-wide leading-none">
                  HACKER HOUSE GOA 2026
                </div>
                <div className="font-mono text-[8px] text-goa-pink font-bold mt-0.5">
                  /// VIP BUILDER PASS · OCT 28-31
                </div>
              </div>

              <div className="w-7 h-5 bg-goa-gold border border-goa-green-deep rounded flex items-center justify-center text-[8px] font-bold text-goa-green-deep">
                [::]
              </div>
            </div>

            <div className="mb-3 w-full aspect-[4/4.2] border-4 border-goa-pink relative bg-linear-to-b from-goa-green-deep to-[#072414] overflow-hidden rounded-2xl shadow-inner group-hover:border-goa-gold transition-colors flex items-center justify-center">
              <AvatarSilhouetteIcon className="w-36 h-36 text-goa-gold/75 group-hover:scale-105 transition-transform duration-500" />

              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-goa-gold" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-goa-gold" />

              <div className="absolute top-2 left-2 flex items-center gap-1 pl-3">
                <span className="bg-goa-green-deep/90 border border-goa-gold text-goa-gold font-mono text-[8px] font-bold px-2 py-0.5 rounded">
                  RUST
                </span>
                <span className="bg-goa-green-deep/90 border border-goa-gold text-goa-gold font-mono text-[8px] font-bold px-2 py-0.5 rounded">
                  ZK_SNARKS
                </span>
                <span className="bg-goa-green-deep/90 border border-goa-gold text-goa-gold font-mono text-[8px] font-bold px-2 py-0.5 rounded">
                  GOA
                </span>
              </div>

              <div className="absolute bottom-2 right-2 bg-goa-pink text-white font-mono text-[9px] font-bold px-3 py-1 rounded-lg shadow-md flex items-center gap-1">
                ✓ VERIFIED BUILDER
              </div>
            </div>

            <div className="bg-goa-gold text-goa-green-deep p-3.5 rounded-2xl border-2 border-goa-green-deep relative shadow-lg">
              <div className="absolute -left-3 top-6 w-4 h-4 bg-goa-green-deep rounded-full" />
              <div className="absolute -right-3 top-6 w-4 h-4 bg-goa-green-deep rounded-full" />

              <div className="border-b-2 border-dashed border-goa-green-deep/30 mb-2 pb-1 flex justify-between items-center font-mono text-[8px] text-goa-green-deep/70 font-bold">
                <span>/// TICKET STUB SECURITY CREDENTIAL</span>
                <span>ID: #HH-GOA-7757</span>
              </div>

              <div className="font-display text-3xl font-black text-goa-green-deep uppercase tracking-tight text-center leading-none my-1.5">
                ALEX RIVERA
              </div>

              <div className="bg-goa-pink text-white font-display font-black text-xs py-1.5 px-2 rounded-xl text-center uppercase tracking-wider mb-1.5 shadow-sm">
                FULL-STACK / AI BUILDER
              </div>

              <div className="bg-goa-green-deep text-goa-gold font-display font-black text-xs py-1.5 px-2 rounded-xl text-center uppercase tracking-wide mb-2 shadow-sm">
                [ THE SHIP-IT ENGINEER ]
              </div>

              <div className="grid grid-cols-2 gap-2 text-[8px] font-mono border-t border-goa-green-deep/20 pt-1.5">
                <div>
                  <div className="text-goa-green-deep/60 font-bold">STATUS / FOCUS</div>
                  <div className="font-display font-extrabold text-[10px] text-goa-green-deep truncate">SHIPPER OF QUESTIONABLE IDEAS</div>
                </div>
                <div className="text-right">
                  <div className="text-goa-green-deep/60 font-bold">LOCATION / VENUE</div>
                  <div className="font-display font-extrabold text-[10px] text-goa-green-deep">PALOLEM BEACH, GOA</div>
                </div>
              </div>

              <div className="mt-2 flex justify-center opacity-80">
                <div className="h-4 w-32 bg-[repeating-linear-gradient(90deg,#0D3D22_0,#0D3D22_2px,transparent_2px,transparent_4px)]" />
              </div>

              <div className="mt-2 bg-goa-green-deep text-goa-gold font-mono text-[8px] font-bold py-1 text-center rounded-lg uppercase tracking-widest">
                ✦ BUILD · SHIP · REPEAT ✦ #FRAMEINGOA ✦
              </div>
            </div>
          </div>
        ) : (
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onStart('pfp')}
            style={transformStyle}
            className="w-full bg-goa-green-deep text-[#F5F0E1] border-2 border-goa-gold p-4 relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] rounded-3xl group cursor-pointer"
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

            <div className="flex justify-between items-center mb-3 px-1">
              <div className="w-8 h-6 bg-goa-gold border border-goa-green-deep rounded flex items-center justify-center text-[9px] font-bold text-goa-green-deep shadow-sm">
                [::]
              </div>

              <div className="w-9 h-9 rounded-full border-2 border-goa-pink bg-[#072414] flex flex-col items-center justify-center text-[6px] font-mono text-goa-gold font-bold leading-tight shadow-md">
                <span>VERIFIED</span>
                <span>HHGOA'26</span>
              </div>
            </div>

            <div className="relative w-full aspect-square bg-linear-to-b from-goa-green-deep to-[#072414] border-4 border-goa-pink rounded-2xl overflow-hidden shadow-2xl p-1 flex items-center justify-center">
              <div className="absolute inset-1.5 border-2 border-goa-gold rounded-xl pointer-events-none z-10" />

              <AvatarSilhouetteIcon className="w-40 h-40 text-goa-gold/75 group-hover:scale-105 transition-transform duration-500" />

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-goa-pink text-goa-gold border-2 border-goa-gold font-display font-black text-2xl px-6 py-1 rounded-2xl shadow-2xl z-20 tracking-wider uppercase">
                GOA 2026
              </div>
            </div>

            <div className="mt-3 text-center font-mono text-xs text-goa-gold uppercase tracking-wider font-bold">
              SQUARE 1:1 SOCIAL PROFILE FRAME
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

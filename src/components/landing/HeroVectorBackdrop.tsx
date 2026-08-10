import React from 'react';

export const HeroVectorBackdrop: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 right-0 h-162.5 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-96 h-96 bg-goa-gold rounded-full blur-[140px] opacity-35 animate-pulse" />
        <svg className="absolute -top-10 w-150 h-87.5 opacity-25" viewBox="0 0 600 350" fill="none">
          <circle cx="300" cy="200" r="120" fill="#E8C840" />
          <g stroke="#E8C840" strokeWidth="3" strokeDasharray="6 6">
            <line x1="300" y1="20" x2="300" y2="70" />
            <line x1="160" y1="60" x2="200" y2="95" />
            <line x1="440" y1="60" x2="400" y2="95" />
            <line x1="100" y1="180" x2="150" y2="180" />
            <line x1="500" y1="180" x2="450" y2="180" />
          </g>
        </svg>
      </div>

      <div className="absolute top-0 -left-10 opacity-30 animate-palm-left">
        <svg width="220" height="340" viewBox="0 0 220 340" fill="none">
          <path d="M110 340V120" stroke="#E8C840" strokeWidth="5" />
          <path d="M110 120C75 80 20 70 0 75C30 60 85 55 110 90" fill="#0D3D22" />
          <path d="M110 120C90 75 45 40 20 35C55 35 95 55 110 90" fill="#145A32" />
          <path d="M110 120C145 80 200 70 220 75C190 60 135 55 110 90" fill="#0D3D22" />
          <path d="M110 120C130 75 175 40 200 35C165 35 125 55 110 90" fill="#145A32" />
        </svg>
      </div>

      <div className="absolute top-0 -right-10 opacity-30 animate-palm-right">
        <svg width="220" height="340" viewBox="0 0 220 340" fill="none">
          <path d="M110 340V120" stroke="#E8C840" strokeWidth="5" />
          <path d="M110 120C75 80 20 70 0 75C30 60 85 55 110 90" fill="#0D3D22" />
          <path d="M110 120C90 75 45 40 20 35C55 35 95 55 110 90" fill="#145A32" />
          <path d="M110 120C145 80 200 70 220 75C190 60 135 55 110 90" fill="#0D3D22" />
          <path d="M110 120C130 75 175 40 200 35C165 35 125 55 110 90" fill="#145A32" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 right-0 opacity-20">
        <svg width="100%" height="80" viewBox="0 0 1200 80" preserveAspectRatio="none" fill="none">
          <path d="M0 40 Q 300 10 600 40 T 1200 40 V 80 H 0 Z" fill="#E8C840" />
        </svg>
      </div>
    </div>
  );
};

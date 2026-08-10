import React from 'react';

interface AvatarSilhouetteIconProps {
  className?: string;
  color?: string;
}

export const AvatarSilhouetteIcon: React.FC<AvatarSilhouetteIconProps> = ({
  className = 'w-24 h-24 text-goa-gold',
  color,
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill={color || 'currentColor'}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circle Head */}
      <circle cx="50" cy="34" r="22" />
      {/* Smooth Curved Shoulders & Body */}
      <path d="M 12 92 C 12 60, 25 54, 50 54 C 75 54, 88 60, 88 92 Z" />
    </svg>
  );
};

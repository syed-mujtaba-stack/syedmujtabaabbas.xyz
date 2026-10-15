import React from 'react';

interface BrandMarkProps {
  className?: string;
}

export const BrandMark: React.FC<BrandMarkProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 48 48"
    className={`brand-mark ${className}`}
    aria-hidden="true"
    focusable="false"
  >
    <rect
      className="brand-mark__plate"
      x="1"
      y="1"
      width="46"
      height="46"
      rx="14"
      fill="#101013"
      stroke="rgba(255,255,255,0.22)"
    />
    <text
      x="24"
      y="25"
      fill="#fafafa"
      fontFamily="'Syne', 'Plus Jakarta Sans', sans-serif"
      fontSize="16"
      fontWeight="800"
      letterSpacing="0.1"
      textAnchor="middle"
    >
      M.J
    </text>
    <text
      x="24"
      y="32.5"
      fill="#a1a1aa"
      fontFamily="'JetBrains Mono', monospace"
      fontSize="5.5"
      fontWeight="600"
      letterSpacing="0.65"
      textAnchor="middle"
    >
      _SYED
    </text>
    <path
      d="M10 37H38"
      stroke="#52525b"
      strokeLinecap="round"
      strokeWidth="1.2"
    />
    <path
      className="brand-mark__sweep"
      d="M10 37H18"
      fill="none"
      stroke="#f4f4f5"
      strokeLinecap="round"
      strokeWidth="1.6"
    />
  </svg>
);
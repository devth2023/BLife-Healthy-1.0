import React from 'react';

const Logo = ({ className = 'h-10 text-xl' }: { className?: string }) => (
  <div className={`flex items-center font-bold tracking-tight ${className}`}>
    {/* Icon Part */}
    <svg viewBox="0 0 50 50" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="logoBGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#2E7D32" />
          <stop offset="100%" stopColor="#0288D1" />
        </linearGradient>
      </defs>
      <text
        x="-2"
        y="42"
        fontFamily="sans-serif"
        fontSize="50"
        fontWeight="bold"
        fill="url(#logoBGradient)"
      >
        B
      </text>
      {/* Person Icon */}
      <circle cx="23" cy="9" r="4" fill="#0288D1" />
      <path d="M19 18 C 23 14, 27 14, 31 18" stroke="#0288D1" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Leaf Icon */}
      <path d="M30 15 C 35 10, 42 10, 45 15 C 40 20, 35 20, 30 15 Z" fill="#2E7D32" transform="rotate(-30 37.5 12.5)" />
    </svg>
    {/* Text Part */}
    <div className="flex flex-col justify-center -ml-2 leading-none">
      <span style={{ color: '#00529B' }}>B LIFE</span>
      <span style={{ color: '#00AEEF' }}>HEALTH</span>
    </div>
  </div>
);

export default Logo;

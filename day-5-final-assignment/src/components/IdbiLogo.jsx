import React from 'react';

export default function IdbiLogo({ width = 160, textColor = 'var(--idbi-green)' }) {
  const iconSize = width * 0.25;
  const fontSize = width * 0.16;
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
      <svg 
        width={iconSize} 
        height={iconSize} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="48" fill="#F47B20" />
        {/* Head */}
        <circle cx="50" cy="28" r="8" fill="white" />
        {/* Body trunk */}
        <rect x="42" y="44" width="16" height="40" rx="4" fill="white" />
        {/* Left arm curve */}
        <path d="M 38 42 C 15 50 20 80 40 90" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" />
        {/* Right arm curve */}
        <path d="M 62 42 C 85 50 80 80 60 90" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" />
      </svg>
      <span style={{ 
        color: textColor, 
        fontFamily: 'system-ui, sans-serif',
        lineHeight: 1,
        marginTop: '2px',
        display: 'flex',
        alignItems: 'baseline',
        gap: '0.25em'
      }}>
        <span style={{ fontSize: `${fontSize * 1.2}px`, fontWeight: '900', letterSpacing: '-0.01em' }}>IDBI</span>
        <span style={{ fontSize: `${fontSize}px`, fontWeight: '700', letterSpacing: '0.02em' }}>BANK</span>
      </span>
    </div>
  );
}

import React from 'react';

/**
 * Authentik Logo SVG Component
 * A consistent, high-quality representation of the Authentik brand
 */
export default function AuthentikLogo({ size = 24, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 1024 1024" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M512 0C229.23 0 0 229.23 0 512s229.23 512 512 512 512-229.23 512-512S794.77 0 512 0zm256 512c0 141.38-114.62 256-256 256s-256-114.62-256-256 114.62-256 256-256 256 114.62 256 256z" 
        fill="#fd4b2d" 
      />
      <path 
        d="M512 320c-106.04 0-192 85.96-192 192s85.96 192 192 192 192-85.96 192-192-85.96-192-192-192zm0 288c-53.02 0-96-42.98-96-96s42.98-96 96-96 96 42.98 96 96-42.98 96-96 96z" 
        fill="#fd4b2d" 
      />
    </svg>
  );
}

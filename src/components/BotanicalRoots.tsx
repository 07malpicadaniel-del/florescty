'use client';

import React from 'react';

// Dark green decorative branches and roots to fill empty spaces in the blog layout
export function RootsTopRight({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none absolute top-0 right-0 overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-56 sm:w-80 h-56 sm:h-80 opacity-30 dark:opacity-25 text-garden-calPoly"
      >
        {/* Main winding root branch */}
        <path
          d="M320 0 C280 40, 240 70, 210 110 C180 150, 160 210, 120 260 C90 295, 40 310, 0 320"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Secondary branches */}
        <path
          d="M250 60 C230 110, 190 130, 150 140 C110 150, 80 180, 60 220"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M180 150 C170 190, 140 220, 110 240 C80 260, 50 270, 20 280"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M290 20 C250 50, 220 80, 200 120"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Delicate root tendrils */}
        <path
          d="M140 145 C130 170, 100 185, 75 190"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="3 3"
        />
        <path
          d="M100 240 C85 270, 60 285, 30 295"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Botanical leaves along the roots */}
        <path
          d="M225 90 C220 80, 205 85, 210 95 C215 105, 230 100, 225 90 Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          d="M165 140 C155 135, 145 145, 150 155 C155 165, 170 150, 165 140 Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          d="M115 210 C105 205, 95 215, 100 225 C105 235, 120 220, 115 210 Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          d="M70 260 C60 255, 50 265, 55 275 C60 285, 75 270, 70 260 Z"
          fill="currentColor"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}

export function RootsBottomLeft({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none absolute bottom-0 left-0 overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-56 sm:w-80 h-56 sm:h-80 opacity-30 dark:opacity-25 text-garden-calPoly"
      >
        <path
          d="M0 320 C40 280, 80 250, 110 210 C140 170, 160 110, 200 60 C230 25, 280 10, 320 0"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M70 260 C90 210, 130 190, 170 180 C210 170, 240 140, 260 100"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M140 170 C150 130, 180 100, 210 80 C240 60, 270 50, 300 40"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Curled root tips */}
        <path
          d="M180 175 C190 150, 220 135, 245 130"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="4 4"
        />
        <path
          d="M220 80 C235 50, 260 35, 290 25"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Leaves */}
        <path
          d="M95 230 C100 240, 115 235, 110 225 C105 215, 90 220, 95 230 Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          d="M155 180 C165 185, 175 175, 170 165 C165 155, 150 170, 155 180 Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          d="M205 110 C215 115, 225 105, 220 95 C215 85, 200 100, 205 110 Z"
          fill="currentColor"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}

export function RootsDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full flex items-center justify-center my-8 overflow-hidden select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 600 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-lg h-10 opacity-35 text-garden-calPoly"
      >
        {/* Horizontal organic vine */}
        <path
          d="M0 30 Q150 10 300 30 T600 30"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M100 25 Q180 45 250 28"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M350 32 Q420 15 500 30"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Tendrils and leaf buds */}
        <circle cx="300" cy="30" r="4" fill="currentColor" />
        <path
          d="M290 25 C285 15, 275 20, 280 28 Z"
          fill="currentColor"
        />
        <path
          d="M310 35 C315 45, 325 40, 320 32 Z"
          fill="currentColor"
        />
        <path
          d="M180 32 C175 42, 165 38, 170 30 Z"
          fill="currentColor"
        />
        <path
          d="M430 22 C435 12, 445 16, 440 24 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

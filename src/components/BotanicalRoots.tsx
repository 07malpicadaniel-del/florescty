'use client';

import React from 'react';

// Dark green decorative branches and roots to fill empty spaces in the blog layout
// Enhanced with rich Cal Poly Green (#374126) and Olive (#6C6D11) leaves, vines and tendrils
export function RootsTopRight({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none absolute top-0 right-0 overflow-hidden -z-0 ${className}`}>
      <svg
        viewBox="0 0 360 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-72 sm:w-96 h-72 sm:h-96 opacity-70 dark:opacity-65 text-garden-calPoly"
      >
        {/* Main winding root branch - Thicker and prominent */}
        <path
          d="M360 0 C300 45, 250 80, 220 130 C190 180, 165 240, 120 290 C85 330, 35 345, 0 360"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Secondary branches */}
        <path
          d="M280 65 C250 120, 200 145, 155 155 C110 165, 75 200, 50 250"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M190 165 C175 210, 140 245, 105 270 C70 295, 40 305, 10 315"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M320 25 C275 60, 235 95, 210 140"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M150 160 C135 190, 100 205, 70 215"
          stroke="#6C6D11"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M110 260 C90 295, 60 315, 25 325"
          stroke="#6C6D11"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Large Botanical Leaves along the branches - Vibrant and visible */}
        {/* Leaf 1 */}
        <path
          d="M255 100 C240 80, 215 90, 225 110 C235 130, 265 120, 255 100 Z"
          fill="#4A5D32"
          stroke="#2B341E"
          strokeWidth="1.5"
        />
        {/* Leaf 2 */}
        <path
          d="M185 150 C165 140, 145 155, 155 175 C165 195, 195 170, 185 150 Z"
          fill="#6C6D11"
          stroke="#374126"
          strokeWidth="1.5"
        />
        {/* Leaf 3 */}
        <path
          d="M125 225 C105 215, 90 230, 100 248 C110 265, 135 245, 125 225 Z"
          fill="#374126"
          stroke="#202717"
          strokeWidth="1.5"
        />
        {/* Leaf 4 */}
        <path
          d="M75 280 C60 270, 45 285, 52 302 C60 318, 85 295, 75 280 Z"
          fill="#4A5D32"
          stroke="#2B341E"
          strokeWidth="1.5"
        />
        {/* Leaf 5 */}
        <path
          d="M295 45 C285 30, 265 40, 275 55 C285 70, 305 60, 295 45 Z"
          fill="#6C6D11"
          stroke="#374126"
          strokeWidth="1.5"
        />
        {/* Leaf 6 */}
        <path
          d="M210 190 C195 180, 180 195, 190 210 C200 225, 220 205, 210 190 Z"
          fill="#374126"
          stroke="#202717"
          strokeWidth="1.5"
        />

        {/* Curling root tendrils */}
        <path
          d="M50 250 Q20 280 40 310 T20 340"
          stroke="#6C6D11"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function RootsBottomLeft({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none absolute bottom-0 left-0 overflow-hidden -z-0 ${className}`}>
      <svg
        viewBox="0 0 360 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-72 sm:w-96 h-72 sm:h-96 opacity-70 dark:opacity-65 text-garden-calPoly"
      >
        {/* Main winding root rising from bottom corner */}
        <path
          d="M0 360 C45 310, 95 275, 130 225 C165 175, 185 115, 230 65 C265 25, 315 10, 360 0"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M80 290 C105 235, 150 210, 195 200 C240 190, 275 155, 300 105"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M160 190 C175 145, 210 110, 245 85 C280 60, 315 50, 345 40"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M205 195 C220 165, 255 150, 285 140"
          stroke="#6C6D11"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M245 95 C265 60, 295 40, 330 30"
          stroke="#6C6D11"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Distinctive botanical leaves */}
        <path
          d="M105 260 C115 240, 140 250, 130 270 C120 290, 95 280, 105 260 Z"
          fill="#4A5D32"
          stroke="#2B341E"
          strokeWidth="1.5"
        />
        <path
          d="M175 205 C185 185, 210 195, 200 215 C190 235, 165 225, 175 205 Z"
          fill="#6C6D11"
          stroke="#374126"
          strokeWidth="1.5"
        />
        <path
          d="M235 125 C245 105, 270 115, 260 135 C250 155, 225 145, 235 125 Z"
          fill="#374126"
          stroke="#202717"
          strokeWidth="1.5"
        />
        <path
          d="M285 75 C295 55, 320 65, 310 85 C300 105, 275 95, 285 75 Z"
          fill="#4A5D32"
          stroke="#2B341E"
          strokeWidth="1.5"
        />
        <path
          d="M60 310 C70 290, 95 300, 85 320 C75 340, 50 330, 60 310 Z"
          fill="#6C6D11"
          stroke="#374126"
          strokeWidth="1.5"
        />

        {/* Sprouting curly tendrils */}
        <path
          d="M300 105 Q330 80 320 50 T340 20"
          stroke="#6C6D11"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
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
        className="w-full max-w-lg h-12 opacity-65 text-garden-calPoly"
      >
        <path
          d="M0 30 Q150 10 300 30 T600 30"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M100 25 Q180 48 250 28"
          stroke="#6C6D11"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M350 32 Q420 12 500 30"
          stroke="#6C6D11"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Leaves along divider */}
        <path
          d="M290 25 C280 12, 268 18, 275 28 Z"
          fill="#4A5D32"
        />
        <path
          d="M310 35 C320 48, 332 42, 325 32 Z"
          fill="#6C6D11"
        />
        <path
          d="M175 35 C168 47, 156 42, 163 32 Z"
          fill="#374126"
        />
        <path
          d="M435 20 C442 8, 454 13, 447 23 Z"
          fill="#4A5D32"
        />
      </svg>
    </div>
  );
}

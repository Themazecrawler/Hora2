/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface PanoramicHeaderProps {
  size?: 'sm' | 'lg';
  activeStep?: number; // 1 = Spring, 2 = Summer, 3 = Autumn, 4 = Winter
}

export const PanoramicHeader: React.FC<PanoramicHeaderProps> = ({ size = 'lg', activeStep = 1 }) => {
  const isLarge = size === 'lg';
  const heightClass = isLarge ? 'h-64' : 'h-24 md:h-28';

  return (
    <div className={`relative w-full ${heightClass} overflow-hidden select-none bg-transparent border-0 outline-none shadow-none`}>
      {/* Inline styles for custom premium animations */}
      <style>{`
        @keyframes cloudDrift {
          0% { transform: translateX(-110%); }
          100% { transform: translateX(110vw); }
        }
        @keyframes leafFloat {
          0% { transform: translateY(-20px) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.85; }
          90% { opacity: 0.85; }
          100% { transform: translateY(240px) translateX(20px) rotate(360deg); opacity: 0; }
        }
        @keyframes snowDrift {
          0% { transform: translateY(-20px) translateX(0); opacity: 0; }
          10% { opacity: 0.95; }
          90% { opacity: 0.95; }
          100% { transform: translateY(240px) translateX(12px); opacity: 0; }
        }
        @keyframes blossomSway {
          0%, 100% { transform: rotate(-5deg) translateY(0); }
          50% { transform: rotate(8deg) translateY(-2px); }
        }
        @keyframes pulseSun {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        .animate-cloud-1 {
          animation: cloudDrift 45s linear infinite;
        }
        .animate-cloud-2 {
          animation: cloudDrift 60s linear infinite;
          animation-delay: -20s;
        }
        .animate-leaf-1 {
          animation: leafFloat 12s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        .animate-leaf-2 {
          animation: leafFloat 16s ease-in-out infinite;
          animation-delay: 3.5s;
        }
        .animate-leaf-3 {
          animation: leafFloat 14s ease-in-out infinite;
          animation-delay: 7s;
        }
        .animate-leaf-4 {
          animation: leafFloat 18s ease-in-out infinite;
          animation-delay: 1.8s;
        }
        .animate-snow-1 {
          animation: snowDrift 7s linear infinite;
          animation-delay: 0.2s;
        }
        .animate-snow-2 {
          animation: snowDrift 10s linear infinite;
          animation-delay: 2.5s;
        }
        .animate-snow-3 {
          animation: snowDrift 8s linear infinite;
          animation-delay: 4.5s;
        }
        .animate-snow-4 {
          animation: snowDrift 11s linear infinite;
          animation-delay: 1.2s;
        }
        .animate-snow-5 {
          animation: snowDrift 9s linear infinite;
          animation-delay: 6s;
        }
        .animate-snow-6 {
          animation: snowDrift 12s linear infinite;
          animation-delay: 3.8s;
        }
        .animate-blossom {
          animation: blossomSway 4s ease-in-out infinite;
        }
        .animate-sun-pulse {
          animation: pulseSun 6s ease-in-out infinite;
        }
      `}</style>

      {/* Single seamless panoramic gradient spanning all 4 seasons with soft, desaturated dark-mode seasonal skies */}
      <div 
        className="absolute inset-0 w-full h-full" 
        style={{
          background: 'linear-gradient(to right, #1F2E23 0%, #1F2E23 15%, #332D1E 35%, #332D1E 48%, #33221C 65%, #33221C 78%, #202A36 90%, #202A36 100%)'
        }}
      />

      {/* Grid overlay for placing details (without any vertical border dividing lines) */}
      <div className="absolute inset-0 grid grid-cols-4 h-full w-full">
        
        {/* 🌱 SPRING (Panel 1) */}
        <div className="relative h-full overflow-hidden">
          {/* Spring Sun */}
          <div className="absolute -top-3 -left-3 w-16 h-16 rounded-full bg-[#6CCB70]/15 blur-md pointer-events-none" />
          
          {/* Spring Hills (SVG Wave) */}
          <svg className="absolute bottom-0 w-full h-1/2 text-[#3E5F43]/40 fill-current pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,60 C30,75 70,55 100,70 L100,100 L0,100 Z" />
          </svg>
          <svg className="absolute bottom-0 w-full h-1/3 text-[#3E5F43]/70 fill-current pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,75 C40,60 60,80 100,65 L100,100 L0,100 Z" />
          </svg>

          {/* Plant / Blossom Shoot */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[#6CCB70] animate-blossom origin-bottom pointer-events-none">
            <svg className="w-5 h-5 md:w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path d="M12 22V12M12 12C12 9.5 14 8 16 8M12 12C12 9.5 10 8 8 8M16 8C17.5 8 19 9 19 11M8 8C6.5 8 5 9 5 11" />
              <circle cx="19" cy="11" r="1.5" className="fill-pink-400 stroke-none" />
              <circle cx="5" cy="11" r="1.5" className="fill-pink-400 stroke-none" />
              <circle cx="12" cy="10" r="1.5" className="fill-emerald-500 stroke-none" />
            </svg>
          </div>
        </div>

        {/* ☀️ SUMMER (Panel 2) */}
        <div className="relative h-full overflow-hidden">
          {/* Glowing Summer Sun */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FFD54A]/20 animate-sun-pulse flex items-center justify-center pointer-events-none">
            <div className="w-5 h-5 rounded-full bg-[#FFD54A]/40 shadow-xs" />
          </div>

          {/* Summer hills & beaches */}
          <svg className="absolute bottom-0 w-full h-2/5 text-[#6B5930]/40 fill-current pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,80 C20,70 50,85 100,75 L100,100 L0,100 Z" />
          </svg>
          <svg className="absolute bottom-0 w-full h-1/4 text-[#6B5930]/70 fill-current pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,85 C30,90 70,75 100,85 L100,100 L0,100 Z" />
          </svg>

          {/* Floating pollen particles */}
          <span className="absolute w-1.5 h-1.5 bg-amber-400/80 rounded-full animate-ping top-10 left-6 pointer-events-none" />
          <span className="absolute w-1.5 h-1.5 bg-amber-300/80 rounded-full animate-pulse top-20 left-12 pointer-events-none" style={{ animationDelay: '1s' }} />
        </div>

        {/* 🍂 AUTUMN (Panel 3) */}
        <div className="relative h-full overflow-hidden">
          {/* Soft Autumn Sun / Glow */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-[#F08A5D]/15 blur-md pointer-events-none" />
          
          {/* Autumn hills */}
          <svg className="absolute bottom-0 w-full h-1/2 text-[#6A4436]/40 fill-current pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,65 C30,50 70,70 100,55 L100,100 L0,100 Z" />
          </svg>
          <svg className="absolute bottom-0 w-full h-1/3 text-[#6A4436]/70 fill-current pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,75 C40,80 60,65 100,75 L100,100 L0,100 Z" />
          </svg>

          {/* Drifting Leaves (SVG mini leaves) */}
          <div className="absolute inset-0 pointer-events-none opacity-80">
            <svg className="absolute w-2.5 h-2.5 text-[#F08A5D]/70 fill-current animate-leaf-1 left-[10%] top-0" viewBox="0 0 24 24">
              <path d="M12 2C11.5 6 8.5 9 6 12C3.5 15 3.5 19 6.5 21C9.5 23 13.5 21 16 18C18.5 15 19.5 11 19.5 7C16 7 13.5 5 12 2Z" />
            </svg>
            <svg className="absolute w-2 h-2 text-[#F08A5D]/50 fill-current animate-leaf-2 left-[38%] top-0" viewBox="0 0 24 24">
              <path d="M12 2C11.5 6 8.5 9 6 12C3.5 15 3.5 19 6.5 21C9.5 23 13.5 21 16 18C18.5 15 19.5 11 19.5 7C16 7 13.5 5 12 2Z" />
            </svg>
            <svg className="absolute w-2.5 h-2.5 text-[#F08A5D]/60 fill-current animate-leaf-3 left-[62%] top-0" viewBox="0 0 24 24">
              <path d="M12 2C11.5 6 8.5 9 6 12C3.5 15 3.5 19 6.5 21C9.5 23 13.5 21 16 18C18.5 15 19.5 11 19.5 7C16 7 13.5 5 12 2Z" />
            </svg>
            <svg className="absolute w-2 h-2 text-[#F08A5D]/40 fill-current animate-leaf-4 left-[82%] top-0" viewBox="0 0 24 24">
              <path d="M12 2C11.5 6 8.5 9 6 12C3.5 15 3.5 19 6.5 21C9.5 23 13.5 21 16 18C18.5 15 19.5 11 19.5 7C16 7 13.5 5 12 2Z" />
            </svg>
          </div>
        </div>

        {/* ❄️ WINTER (Panel 4) */}
        <div className="relative h-full overflow-hidden">
          {/* Winter snowy hills */}
          <svg className="absolute bottom-0 w-full h-1/2 text-[#405A73]/40 fill-current pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,70 C40,55 70,75 100,60 L100,100 L0,100 Z" />
          </svg>
          <svg className="absolute bottom-0 w-full h-1/3 text-[#405A73]/70 fill-current pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,80 C30,85 70,70 100,80 L100,100 L0,100 Z" />
          </svg>

          {/* Falling Snowflakes */}
          <div className="absolute inset-0 pointer-events-none opacity-85">
            <div className="absolute w-1.5 h-1.5 bg-white rounded-full animate-snow-1 left-[12%] top-0" />
            <div className="absolute w-1 h-1 bg-white/90 rounded-full animate-snow-2 left-[38%] top-0" />
            <div className="absolute w-1.5 h-1.5 bg-white/80 rounded-full animate-snow-3 left-[55%] top-0" />
            <div className="absolute w-1 h-1 bg-white rounded-full animate-snow-4 left-[82%] top-0" />
            <div className="absolute w-1.5 h-1.5 bg-white/95 rounded-full animate-snow-5 left-[25%] top-0" />
            <div className="absolute w-1 h-1 bg-white/85 rounded-full animate-snow-6 left-[70%] top-0" />
          </div>
        </div>

      </div>

      {/* Overlay clouds drifting across the entire widescreen panorama */}
      <div className="absolute inset-x-0 top-0 h-1/3 pointer-events-none overflow-hidden opacity-90">
        {/* Cloud 1 */}
        <svg className="absolute animate-cloud-1 text-white/20 fill-current w-10 h-5 md:w-12 md:h-6" style={{ top: '10%' }} viewBox="0 0 24 12">
          <path d="M4 10 C2.5 10 1 9 1 7.5 C1 6 2 5 3.5 5 C4 3 6.5 2 8.5 3 C10 1.5 12.5 2 13 4 C14.5 4 15.5 5 15.5 6.5 C15.5 8 14.5 9 13 9 L4 9 Z" />
        </svg>
        {/* Cloud 2 */}
        <svg className="absolute animate-cloud-2 text-white/10 fill-current w-8 h-4 md:w-10 md:h-5" style={{ top: '20%' }} viewBox="0 0 24 12">
          <path d="M4 10 C2.5 10 1 9 1 7.5 C1 6 2 5 3.5 5 C4 3 6.5 2 8.5 3 C10 1.5 12.5 2 13 4 C14.5 4 15.5 5 15.5 6.5 C15.5 8 14.5 9 13 9 L4 9 Z" />
        </svg>
      </div>

      {/* Dynamic highlighted icons acting as the beautiful, seamless Step indicators */}
      <div className="absolute top-4 inset-x-0 flex justify-around items-center px-4 md:px-8 z-20">
        {[
          { step: 1, icon: '🌱', activeBg: 'bg-[#3E5F43] text-[#6CCB70] ring-2 ring-[#6CCB70]/80', glow: 'shadow-[0_0_15px_rgba(108,203,112,0.5)]' },
          { step: 2, icon: '☀️', activeBg: 'bg-[#6B5930] text-[#FFD54A] ring-2 ring-[#FFD54A]/80', glow: 'shadow-[0_0_15px_rgba(255,213,74,0.5)]' },
          { step: 3, icon: '🍂', activeBg: 'bg-[#6A4436] text-[#F08A5D] ring-2 ring-[#F08A5D]/80', glow: 'shadow-[0_0_15px_rgba(240,138,93,0.5)]' },
          { step: 4, icon: '❄️', activeBg: 'bg-[#405A73] text-[#8FC5F5] ring-2 ring-[#8FC5F5]/80', glow: 'shadow-[0_0_15px_rgba(143,197,245,0.5)]' },
        ].map((item) => {
          const isActive = activeStep === item.step;
          return (
            <div key={item.step} className="flex flex-col items-center gap-1 relative">
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-500 border border-white/10 ${
                  isActive
                    ? `${item.activeBg} ${item.glow} scale-125`
                    : 'bg-black/30 backdrop-blur-xs text-stone-300 scale-90'
                }`}
              >
                <span className={`text-base select-none transition-all duration-500 ${isActive ? 'scale-110 filter drop-shadow-md' : 'opacity-60'}`}>
                  {item.icon}
                </span>
              </div>
              
              {/* Soft dot alignment indicator underneath */}
              <div 
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                  isActive 
                    ? 'bg-[#1B1725] scale-125 opacity-100' 
                    : 'bg-transparent scale-50 opacity-0'
                }`} 
              />
            </div>
          );
        })}
      </div>

      {/* Bottom blend fade to screen background color (#1B1725) to blend seamlessly into screen */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1B1725] via-[#1B1725]/60 to-transparent z-15 pointer-events-none" />
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CyclePhase, PhaseInfo } from '../types';

interface CycleRingProps {
  day: number;
  maxDays: number;
  phase: PhaseInfo;
  onDayChange: (day: number) => void;
}

export const CycleRing: React.FC<CycleRingProps> = ({
  day,
  maxDays = 28,
  phase,
  onDayChange,
}) => {
  // SVG Ring Calculations
  // Total circumference is 2 * PI * r (for r=40, it is 2 * 3.14159 * 40 = 251.3)
  const radius = 40;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate stroke offset based on current day
  const progress = day / maxDays;
  const strokeDashoffset = circumference - progress * circumference;

  // Let's color-code segments of the ring:
  // Winter: Days 1-5 (Blue)
  // Spring: Days 6-12 (Green)
  // Summer: Days 13-17 (Yellow/Gold)
  // Autumn: Days 18-28 (Orange/Amber)
  const getSegmentColor = (d: number) => {
    if (d >= 1 && d <= 5) return '#8FC5F5'; // Winter blue
    if (d >= 6 && d <= 12) return '#6CCB70'; // Spring green
    if (d >= 13 && d <= 17) return '#FFD54A'; // Summer gold
    return '#F08A5D'; // Autumn copper
  };

  const activeColor = phase.primaryColor;
  const activeSecondaryColor = phase.secondaryColor;

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Circle Container */}
      <div className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center transition-all duration-500">
        
        {/* SVG Ring */}
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            className="text-gray-100 transition-colors duration-500"
            cx="50"
            cy="50"
            fill="none"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
          
          {/* Multi-colored active segment based on current selection */}
          <circle
            className="transition-all duration-1000 ease-out"
            cx="50"
            cy="50"
            fill="none"
            r={radius}
            stroke={activeColor}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
          />

          {/* Individual segment markers (ticks or small dots) */}
          {Array.from({ length: maxDays }).map((_, i) => {
            const tickDay = i + 1;
            const angle = (i / maxDays) * 360 * (Math.PI / 180) - Math.PI / 2;
            const tx = 50 + radius * Math.cos(angle);
            const ty = 50 + radius * Math.sin(angle);
            const isCurrent = tickDay === day;
            const isSegmentBoundary = [1, 6, 13, 18].includes(tickDay);

            return (
              <circle
                key={tickDay}
                cx={tx}
                cy={ty}
                r={isCurrent ? 2 : isSegmentBoundary ? 1.2 : 0.6}
                fill={isCurrent ? '#ffffff' : getSegmentColor(tickDay)}
                stroke={isCurrent ? activeColor : 'none'}
                strokeWidth={isCurrent ? 1 : 0}
                className="cursor-pointer transition-all hover:scale-150"
                onClick={() => onDayChange(tickDay)}
              />
            );
          })}
        </svg>

        {/* Inner Content */}
        <div 
          className="absolute flex flex-col items-center justify-center bg-white rounded-full shadow-lg border border-gray-100/50"
          style={{ width: '78%', height: '78%' }}
        >
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium font-body tracking-wider uppercase mb-0.5">
            <span>Day</span>
          </div>
          
          {/* Day Counter */}
          <div className="flex items-center justify-center">
            <span 
              className="font-display text-5xl font-extrabold leading-none select-none transition-all duration-300"
              style={{ color: activeColor }}
            >
              {day}
            </span>
          </div>

          <div 
            className="px-4 py-1.5 rounded-full mt-3 font-display font-bold text-xs tracking-wider uppercase transition-all duration-500"
            style={{ backgroundColor: activeSecondaryColor, color: activeColor }}
          >
            {phase.daysText}
          </div>
          
          <span className="text-[11px] font-body text-gray-400 mt-1">
            {phase.subName} Phase
          </span>
        </div>
      </div>
      
    </div>
  );
};

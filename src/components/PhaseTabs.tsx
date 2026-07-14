/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CyclePhase } from '../types';
import { PHASES } from '../data';

interface PhaseTabsProps {
  activePhaseId: CyclePhase;
  onPhaseSelect: (phaseId: CyclePhase) => void;
}

export const PhaseTabs: React.FC<PhaseTabsProps> = ({
  activePhaseId,
  onPhaseSelect,
}) => {
  // Ordered phases
  const phasesList: CyclePhase[] = ['winter', 'spring', 'summer', 'autumn'];

  return (
    <div className="w-full">
      <h3 className="font-display text-lg font-bold text-gray-800 mb-4 flex items-center gap-1.5">
        <span>Seasonal Cycle Flow</span>
        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
        <span className="text-xs font-normal text-gray-400 font-body">Hormonal Seasons</span>
      </h3>
      
      {/* Horizontal Scroll List */}
      <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar -mx-2 px-2 scroll-smooth">
        {phasesList.map((phaseId) => {
          const p = PHASES[phaseId];
          const isActive = activePhaseId === phaseId;
          
          return (
            <button
              key={phaseId}
              id={`phase-flow-tab-${phaseId}`}
              onClick={() => onPhaseSelect(phaseId)}
              className={`
                flex-shrink-0 w-60 p-5 rounded-3xl border text-left cursor-pointer transition-all duration-300 relative group active:scale-98
                ${isActive 
                  ? 'bg-white shadow-md border-transparent scale-[1.02] z-10' 
                  : 'bg-white/60 hover:bg-white hover:shadow-xs border-gray-100 opacity-65 hover:opacity-90'
                }
              `}
              style={{
                borderColor: isActive ? p.primaryColor : undefined,
                boxShadow: isActive ? `0 8px 24px ${p.primaryColor}15` : undefined,
              }}
            >
              {/* Season indicator circle */}
              <div className="flex items-center justify-between mb-3">
                <span 
                  className="font-display font-black text-xs uppercase tracking-widest"
                  style={{ color: p.primaryColor }}
                >
                  {p.subName}
                </span>
                
                <span className="text-[11px] font-body text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                  {p.daysRange}
                </span>
              </div>

              {/* Title & Description */}
              <h4 className="font-display font-bold text-gray-800 text-sm mb-1 group-hover:text-gray-900">
                {p.id.charAt(0).toUpperCase() + p.id.slice(1)} Season
              </h4>
              <p className="font-body text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                {p.description}
              </p>

              {/* Active selection accent line at the bottom */}
              {isActive && (
                <div 
                  className="absolute bottom-0 left-6 right-6 h-1 rounded-t-full"
                  style={{ backgroundColor: p.primaryColor }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, Calendar, Info, Clock, Droplet, Heart, ChevronRight } from 'lucide-react';
import { PhaseInfo } from '../types';

export interface CycleHistoryItem {
  id: string;
  startDate: string;
  endDate: string;
  cycleLength: number;
  periodLength: number;
  avgFlow: 'light' | 'medium' | 'heavy';
  symptomsCount: number;
  avgMood: string;
}

interface CycleHistoryScreenProps {
  onBack: () => void;
  phase: PhaseInfo;
  historyData: CycleHistoryItem[];
}

export const CycleHistoryScreen: React.FC<CycleHistoryScreenProps> = ({
  onBack,
  phase,
  historyData,
}) => {
  // Filter state (options: '3' | '6' | 'year' | 'all') - default chosen must be Last 6
  const [filter, setFilter] = useState<'3' | '6' | 'year' | 'all'>('6');

  // Filter logic
  const getFilteredData = () => {
    switch (filter) {
      case '3':
        return historyData.slice(0, 3);
      case '6':
        return historyData.slice(0, 6);
      case 'year':
        // Filter those in the last year (last 365 days / 12 months, e.g. up to 13 cycles max)
        return historyData.slice(0, 12);
      case 'all':
      default:
        return historyData;
    }
  };

  const filteredHistory = getFilteredData();

  // Helper stats
  const avgCycleLength = Math.round(
    filteredHistory.reduce((sum, item) => sum + item.cycleLength, 0) / (filteredHistory.length || 1)
  );
  const avgPeriodLength = Math.round(
    filteredHistory.reduce((sum, item) => sum + item.periodLength, 0) / (filteredHistory.length || 1)
  );

  return (
    <div className="relative min-h-screen pb-32">
      {/* Header */}
      <div className="p-6 pb-2 flex items-center gap-3.5">
        <button
          onClick={onBack}
          className="p-2.5 rounded-2xl hover:bg-gray-100 text-gray-500 hover:text-gray-800 border border-gray-100 bg-white transition-all cursor-pointer active:scale-95 shadow-2xs flex items-center justify-center"
          title="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="font-display font-extrabold text-2xl text-gray-800">Cycle History</h2>
          <p className="font-body text-xs text-gray-400">Detailed logs of your past biological seasons</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Dynamic Filter Buttons */}
        <div className="flex bg-gray-100/80 p-1 rounded-2xl border border-gray-100/50">
          {(['3', '6', 'year', 'all'] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={`
                flex-1 py-2 text-xs font-display font-bold rounded-xl transition-all cursor-pointer
                ${filter === opt
                  ? 'bg-white text-gray-800 shadow-xs'
                  : 'text-gray-400 hover:text-gray-700'
                }
              `}
            >
              {opt === '3' && 'Last 3'}
              {opt === '6' && 'Last 6'}
              {opt === 'year' && 'Last Year'}
              {opt === 'all' && 'All Cycles'}
            </button>
          ))}
        </div>

        {/* Holistic Stats Header Card */}
        <div className="grid grid-cols-2 gap-3.5">
          <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-2xs space-y-1">
            <span className="text-[10px] font-body text-gray-400 uppercase tracking-wider block">Avg Cycle Length</span>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-black text-2xl text-gray-800">{avgCycleLength}</span>
              <span className="text-xs font-body text-gray-500">days</span>
            </div>
            <p className="text-[9px] font-body text-emerald-500 font-bold leading-normal">Highly Regular • Healthy</p>
          </div>
          
          <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-2xs space-y-1">
            <span className="text-[10px] font-body text-gray-400 uppercase tracking-wider block">Avg Period Length</span>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-black text-2xl text-gray-800">{avgPeriodLength}</span>
              <span className="text-xs font-body text-gray-500">days</span>
            </div>
            <p className="text-[9px] font-body text-gray-400 leading-normal">Winter Phase Duration</p>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-xs uppercase tracking-widest text-gray-400 px-1">
            Recorded Cycles ({filteredHistory.length})
          </h3>

          <div className="space-y-3">
            {filteredHistory.map((item, idx) => {
              // Format dates beautifully
              const startFormatted = new Date(item.startDate).toLocaleDateString(undefined, { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              });
              const endFormatted = new Date(item.endDate).toLocaleDateString(undefined, { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              });

              return (
                <div 
                  key={item.id} 
                  className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs space-y-4 hover:border-gray-200 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-display font-bold text-xs text-gray-400">
                        Cycle #{historyData.length - idx}
                      </span>
                      <h4 className="font-display font-black text-sm text-gray-800 mt-0.5">
                        {startFormatted} – {new Date(item.endDate).toLocaleDateString(undefined, { day: 'numeric' })}
                      </h4>
                      <p className="text-[10px] font-body text-gray-400 mt-0.5">
                        Completed 28-day seasonal flow
                      </p>
                    </div>

                    <div 
                      className="px-3.5 py-1.5 rounded-2xl font-display font-black text-xs text-center border"
                      style={{ 
                        backgroundColor: phase.secondaryColor + '30',
                        borderColor: phase.primaryColor + '20',
                        color: phase.primaryColor
                      }}
                    >
                      {item.cycleLength} Days
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-3.5 border-t border-gray-50 text-[11px] font-body text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Droplet className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span>Period: <strong>{item.periodLength}d</strong></span>
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                      <span>Mood: <strong>{item.avgMood}</strong></span>
                    </div>

                    <div className="flex items-center gap-1.5 justify-end">
                      <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>Logs: <strong>{item.symptomsCount}</strong></span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

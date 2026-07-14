import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, AlertCircle, ArrowLeft } from 'lucide-react';
import { DailyLog, CyclePhase } from '../types';
import { PHASES } from '../data';

interface CycleCalendarProps {
  onBack: () => void;
  lastPeriodDate: string;
  cycleLength: number;
  periodLength: number;
  logs: Record<string, DailyLog>;
  onSelectDate?: (day: number) => void;
}

export const CycleCalendar: React.FC<CycleCalendarProps> = ({
  onBack,
  lastPeriodDate,
  cycleLength,
  periodLength,
  logs,
  onSelectDate,
}) => {
  // Use current real date as the initial focus
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  // Helper to get cycle day & phase for any given Date object
  const getCycleInfoForDate = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const start = new Date(lastPeriodDate);
    start.setHours(0, 0, 0, 0);
    
    const diffTime = d.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // JS Modulo helper for negative diffDays
    const cycleDay = ((diffDays % cycleLength) + cycleLength) % cycleLength + 1;
    
    let phaseId: CyclePhase = 'autumn';
    if (cycleDay >= 1 && cycleDay <= 5) phaseId = 'winter';
    else if (cycleDay >= 6 && cycleDay <= 12) phaseId = 'spring';
    else if (cycleDay >= 13 && cycleDay <= 17) phaseId = 'summer';
    
    return { cycleDay, phaseId };
  };

  // Calendar logic helpers
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // Days in current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // First day of current month index (0: Sunday, 1: Monday, ...)
  const firstDayIndex = new Date(year, month, 1).getDay();

  // Previous month details for filling leading empty spots
  const prevMonthDays = new Date(year, month, 0).getDate();

  // Navigate months
  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const resetToToday = () => {
    const today = new Date();
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Construct grid items
  const calendarCells: { date: Date; isCurrentMonth: boolean }[] = [];

  // Fill in previous month's trailing days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const prevDate = new Date(year, month - 1, prevMonthDays - i);
    calendarCells.push({ date: prevDate, isCurrentMonth: false });
  }

  // Fill in current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    const currDate = new Date(year, month, i);
    calendarCells.push({ date: currDate, isCurrentMonth: true });
  }

  // Fill in next month's leading days to make complete 6-row grid (42 cells)
  const remainingCells = 42 - calendarCells.length;
  for (let i = 1; i <= remainingCells; i++) {
    const nextDate = new Date(year, month + 1, i);
    calendarCells.push({ date: nextDate, isCurrentMonth: false });
  }

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3.5 pb-2">
        <button
          onClick={onBack}
          className="p-2 rounded-2xl hover:bg-gray-100 text-gray-500 hover:text-gray-800 border border-gray-100 bg-white transition-colors cursor-pointer active:scale-95"
          title="Back to Dashboard"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="font-display font-extrabold text-2xl text-gray-800 flex items-center gap-1.5">
            <span>Cycle Forecast</span>
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
          </h2>
          <p className="font-body text-xs text-gray-400">Color-coded seasonal calendar forecast</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        {/* Calendar Nav */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-gray-50 bg-white">
          <button 
            id="prev-month"
            onClick={prevMonth}
            className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 cursor-pointer active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-gray-800 text-base">
              {monthNames[month]} {year}
            </span>
            <button 
              id="today-button"
              onClick={resetToToday}
              className="text-[10px] font-display font-bold px-2 py-0.5 border border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-700 rounded-md transition-colors cursor-pointer"
            >
              Today
            </button>
          </div>

          <button 
            id="next-month"
            onClick={nextMonth}
            className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 cursor-pointer active:scale-95 transition-transform"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid Content */}
        <div className="p-5 bg-white">
          {/* Days of week */}
          <div className="grid grid-cols-7 gap-1 mb-2 text-center">
            {weekDays.map((day) => (
              <span key={day} className="text-[11px] font-display font-semibold text-gray-400 uppercase tracking-wider py-1">
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {calendarCells.map(({ date, isCurrentMonth }, index) => {
              const dateStr = date.toISOString().split('T')[0];
              const isToday = dateStr === todayStr;
              
              // Calculate Cycle Day & Phase
              const { cycleDay, phaseId } = getCycleInfoForDate(date);
              const p = PHASES[phaseId];
              
              // Check if flow is logged on this date
              const logForDay = logs[dateStr];
              const hasFlow = logForDay && logForDay.flow && logForDay.flow !== 'none';

              // Determine special styling for Menstruation (Winter) phase
              const isMenstruation = phaseId === 'winter';
              const isFuture = dateStr > todayStr;
              const isPredictedMenstruation = isMenstruation && isFuture;
              const isLoggedOrPastMenstruation = isMenstruation && (!isFuture || hasFlow);

              return (
                <button
                  key={`${dateStr}-${index}`}
                  id={`calendar-cell-${dateStr}`}
                  onClick={() => {
                    if (onSelectDate) {
                      onSelectDate(cycleDay);
                    }
                    onBack();
                  }}
                  className={`
                    relative aspect-square rounded-2xl flex flex-col items-center justify-center p-1 cursor-pointer transition-all duration-300 group
                    ${isLoggedOrPastMenstruation 
                      ? 'text-white hover:scale-105 shadow-sm font-bold' 
                      : isCurrentMonth 
                        ? 'text-gray-800 hover:scale-105' 
                        : 'text-gray-300'
                    }
                  `}
                  style={{
                    backgroundColor: isLoggedOrPastMenstruation
                      ? p.primaryColor
                      : isPredictedMenstruation
                        ? `${p.primaryColor}15`
                        : isCurrentMonth 
                          ? p.secondaryColor + '50' 
                          : 'transparent',
                    border: isToday 
                      ? isLoggedOrPastMenstruation 
                        ? '2.5px solid rgba(255, 255, 255, 0.9)'
                        : `2.5px solid ${p.primaryColor}`
                      : isPredictedMenstruation
                        ? `1.5px dashed ${p.primaryColor}`
                        : '1px solid transparent',
                  }}
                  title={`Date: ${dateStr}\nCycle Day: ${cycleDay}\nPhase: ${p.name}`}
                >
                  {/* Day number */}
                  <span className={`text-xs font-display font-bold ${isToday ? 'scale-110 font-black' : ''}`}>
                    {date.getDate()}
                  </span>

                  {/* Indicator Dot (Season themed color) */}
                  <span 
                    className="w-1.5 h-1.5 rounded-full mt-0.5 transition-all"
                    style={{ backgroundColor: isLoggedOrPastMenstruation ? '#ffffff' : p.primaryColor }}
                  />

                  {/* Icon or flow indicator */}
                  {hasFlow && (
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500 ring-1 ring-white" title="Menstrual Flow Logged" />
                  )}

                  {/* Active hover effect with phase colors */}
                  <span 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 border-2 transition-opacity pointer-events-none"
                    style={{ borderColor: p.primaryColor }}
                  />
                </button>
              );
            })}
          </div>

          {/* Color Legend */}
          <div className="mt-6 p-4 rounded-2xl bg-gray-50 border border-gray-100/50 space-y-4">
            <div>
              <h4 className="text-[10px] font-display font-semibold uppercase tracking-wider text-gray-400 mb-2.5">
                Seasonal Phase Colors
              </h4>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-body">
                {Object.values(PHASES).map((ph) => (
                  <div key={ph.id} className="flex items-center gap-2">
                    <span 
                      className="w-3 h-3 rounded-full border shadow-xs"
                      style={{ backgroundColor: ph.secondaryColor, borderColor: ph.primaryColor }}
                    />
                    <div>
                      <span className="font-bold text-gray-700">{ph.name}</span>
                      <span className="text-gray-400 text-[9px] block">({ph.subName})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200/50 pt-3">
              <h4 className="text-[10px] font-display font-semibold uppercase tracking-wider text-gray-400 mb-2.5">
                Menstruation (Winter) Forecast Key
              </h4>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-body">
                <div className="flex items-center gap-2">
                  <span 
                    className="w-5 h-5 rounded-lg flex items-center justify-center text-[9px] text-white font-bold"
                    style={{ backgroundColor: PHASES.winter.primaryColor }}
                  >
                    1
                  </span>
                  <div>
                    <span className="font-bold text-gray-700">Logged / Past</span>
                    <span className="text-gray-400 text-[9px] block">Solid fill</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span 
                    className="w-5 h-5 rounded-lg flex items-center justify-center text-[9px] font-bold"
                    style={{ 
                      backgroundColor: `${PHASES.winter.primaryColor}15`,
                      border: `1.5px dashed ${PHASES.winter.primaryColor}`,
                      color: PHASES.winter.primaryColor
                    }}
                  >
                    2
                  </span>
                  <div>
                    <span className="font-bold text-gray-700">Predicted</span>
                    <span className="text-gray-400 text-[9px] block">Dashed border</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help banner */}
        <div className="p-4 bg-indigo-50/50 border-t border-gray-100 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
          <p className="text-[10px] font-body text-gray-500 leading-normal">
            Past dates show your custom logs, while future dates display predicted seasonal trends calculated from your set cycle length. Click any day to jump to its cycle day details.
          </p>
        </div>
      </div>
    </div>
  );
};

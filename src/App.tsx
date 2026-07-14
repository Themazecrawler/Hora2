/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Plus, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Sparkles, 
  Heart, 
  TrendingUp, 
  Smile, 
  Info, 
  PenTool, 
  Flame, 
  Moon, 
  CheckCircle,
  Menu,
  RotateCcw,
  BookOpen,
  CalendarDays,
  Grid,
  MapPin,
  ClipboardList,
  Leaf
} from 'lucide-react';
import { CyclePhase, DailyLog, CycleConfig, Task } from './types';
import { PHASES, DEFAULT_TASKS, ALL_SYMPTOMS, ALL_MOODS, MOOD_MOSAIC_HISTORY } from './data';
import { CycleRing } from './components/CycleRing';
import { PhaseTabs } from './components/PhaseTabs';
import { SeasonalHeader } from './components/SeasonalHeader';
import { CycleCalendar } from './components/CycleCalendar';
import { LogSymptomScreen } from './components/LogSymptomScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { CycleHistoryScreen, CycleHistoryItem } from './components/CycleHistoryScreen';
import { OnboardingFlow, OnboardingData } from './components/OnboardingFlow';

const historyData: CycleHistoryItem[] = [
  { id: 'h1', startDate: '2026-06-16', endDate: '2026-07-13', cycleLength: 28, periodLength: 5, avgFlow: 'medium', symptomsCount: 12, avgMood: 'Calm' },
  { id: 'h2', startDate: '2026-05-19', endDate: '2026-06-15', cycleLength: 28, periodLength: 5, avgFlow: 'heavy', symptomsCount: 14, avgMood: 'Reflective' },
  { id: 'h3', startDate: '2026-04-21', endDate: '2026-05-18', cycleLength: 28, periodLength: 5, avgFlow: 'medium', symptomsCount: 9, avgMood: 'Peak' },
  { id: 'h4', startDate: '2026-03-24', endDate: '2026-04-20', cycleLength: 27, periodLength: 4, avgFlow: 'light', symptomsCount: 11, avgMood: 'Vibrant' },
  { id: 'h5', startDate: '2026-02-24', endDate: '2026-03-23', cycleLength: 28, periodLength: 5, avgFlow: 'medium', symptomsCount: 8, avgMood: 'Reflective' },
  { id: 'h6', startDate: '2026-01-27', endDate: '2026-02-23', cycleLength: 27, periodLength: 5, avgFlow: 'heavy', symptomsCount: 15, avgMood: 'Calm' },
  { id: 'h7', startDate: '2025-12-30', endDate: '2026-01-26', cycleLength: 27, periodLength: 4, avgFlow: 'medium', symptomsCount: 10, avgMood: 'Vibrant' },
  { id: 'h8', startDate: '2025-12-01', endDate: '2025-12-29', cycleLength: 28, periodLength: 5, avgFlow: 'heavy', symptomsCount: 13, avgMood: 'Reflective' },
  { id: 'h9', startDate: '2025-11-03', endDate: '2025-11-30', cycleLength: 27, periodLength: 5, avgFlow: 'medium', symptomsCount: 7, avgMood: 'Optimistic' },
];

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  // Cycle state - Day 14 (Summer - Peak Ovulation) is our beautiful initial showcase day
  const [currentDay, setCurrentDay] = useState<number>(14);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'cycle' | 'log' | 'insights' | 'calendar' | 'settings' | 'cycle-history'>('dashboard');
  const [completedTasks, setCompletedTasks] = useState<string[]>(['su3']); // Pre-check one task for showcase
  
  // Custom user settings
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [periodLength, setPeriodLength] = useState<number>(5);
  const [lastPeriodDate, setLastPeriodDate] = useState<string>(() => {
    // 13 days ago so today aligns exactly with Day 14
    const d = new Date();
    d.setDate(d.getDate() - 13);
    return d.toISOString().split('T')[0];
  });

  // Automatically calculate the current cycle day based on today's date and lastPeriodDate
  const getCalculatedCycleDay = (lastDateStr: string, len: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(lastDateStr);
    start.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 1;
    return (diffDays % len) + 1;
  };

  // Automatically update currentDay when settings change or on component load
  useEffect(() => {
    const calcDay = getCalculatedCycleDay(lastPeriodDate, cycleLength);
    setCurrentDay(calcDay);
  }, [lastPeriodDate, cycleLength]);

  // Load tasks into state so they can be added or deleted
  const [tasks, setTasks] = useState<Task[]>(() => DEFAULT_TASKS);

  // Intention editor states
  const [editingPhaseId, setEditingPhaseId] = useState<CyclePhase>('summer');
  const [newIntentionTitle, setNewIntentionTitle] = useState('');
  const [newIntentionDesc, setNewIntentionDesc] = useState('');
  const [newIntentionTags, setNewIntentionTags] = useState('');

  // Daily symptom log state
  const [logs, setLogs] = useState<Record<string, DailyLog>>(() => {
    const initialLogs: Record<string, DailyLog> = {};
    // Seed standard days for interactive showcase
    initialLogs['2026-07-14'] = {
      date: '2026-07-14',
      cycleDay: 14,
      flow: 'none',
      mood: 'radiant',
      symptoms: ['acne'],
      completedTasks: ['su3'],
      notes: 'Feeling radiant today! Super energized and confident at the presentation.',
    };
    return initialLogs;
  });

  // Calculate current date based on day offset from last period date
  const getSelectedDateString = (dayOffset: number) => {
    const startDate = new Date(lastPeriodDate);
    startDate.setDate(startDate.getDate() + dayOffset - 1);
    return startDate.toISOString().split('T')[0];
  };

  const activeDateString = getSelectedDateString(currentDay);
  const currentLog = logs[activeDateString] || null;

  // Derive phase from selected day
  const getPhaseFromDay = (day: number): CyclePhase => {
    if (day >= 1 && day <= 5) return 'winter';
    if (day >= 6 && day <= 12) return 'spring';
    if (day >= 13 && day <= 17) return 'summer';
    return 'autumn';
  };

  const activePhaseId = getPhaseFromDay(currentDay);
  const phase = PHASES[activePhaseId];

  // Automatically sync editing season with current day's active season
  useEffect(() => {
    setEditingPhaseId(activePhaseId);
  }, [activePhaseId]);

  // Load appropriate tasks for current phase
  const phaseTasks = tasks.filter((t) => t.phase === activePhaseId);

  // Toggle checklist tasks
  const handleToggleTask = (taskId: string) => {
    setCompletedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  // Handle saving symptom log
  const handleSaveLog = (newLog: DailyLog) => {
    setLogs((prev) => ({
      ...prev,
      [newLog.date]: newLog,
    }));
  };

  // Jump to appropriate middle day of a selected phase
  const handleSelectPhase = (phaseId: CyclePhase) => {
    if (phaseId === 'winter') setCurrentDay(1);
    else if (phaseId === 'spring') setCurrentDay(8);
    else if (phaseId === 'summer') setCurrentDay(14);
    else setCurrentDay(22);
  };

  return (
    <div className="min-h-screen bg-[#110E18] text-[#F3E8FF] font-sans flex flex-col items-center justify-start py-6 px-4 md:px-8">
      
      {/* Outer Layout Frame to make it feel like a premium mobile design workspace */}
      <div className={`w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden border border-[#312944] flex flex-col relative min-h-[860px] transition-all duration-500 bg-[#1B1725]`}>
        
        {/* Dynamic Background Gradient reflecting the selected Season */}
        {isOnboarded && (
          <div 
            className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-25"
            style={{ background: phase.bgGradient }}
          />
        )}

        {!isOnboarded ? (
          <OnboardingFlow
            phase={phase}
            onComplete={(data) => {
              if (data.lastPeriodDate) {
                setLastPeriodDate(data.lastPeriodDate);
              }
              setIsOnboarded(true);
            }}
          />
        ) : (
          <>
            {/* Top App Header */}
            <header className="relative z-30 px-6 pt-6 pb-4 bg-transparent flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h1 className="font-display font-extrabold text-xl tracking-tight text-white">
              Cycle Seasons
            </h1>
          </div>

          {/* User profile picture leading to account settings */}
          <div className="flex items-center gap-2.5">
            <div 
              className="w-10 h-10 rounded-full overflow-hidden border-2 shadow-xs transition-all duration-500 hover:scale-105 cursor-pointer"
              style={{ borderColor: phase.primaryColor }}
              onClick={() => setActiveTab('settings')}
              title="Account Settings"
            >
              <img 
                src={phase.avatarUrl} 
                alt="Radiant profile avatar leading to Account Settings"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Inner App Container */}
        <div className="flex-1 overflow-y-auto pb-32 relative z-10 no-scrollbar">



          {/* Render Active View Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Dynamic Animated Header Section (Canvas shader based) */}
              <div className="relative h-64 w-full flex flex-col justify-end p-6 overflow-hidden border-0 outline-none">
                <SeasonalHeader phase={phase} />
                
                {/* Visual Gradient Overlay to seamlessly blend the animation into the dark screen background */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1725] via-[#1B1725]/40 to-transparent z-10 pointer-events-none" />
                
                {/* Header Information Text */}
                <div className="relative z-20 space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#252033]/60 backdrop-blur-md rounded-full border border-white/10">
                    <span 
                      className="text-xs font-display font-black uppercase tracking-wider flex items-center gap-1"
                      style={{ color: phase.primaryColor }}
                    >
                      {activePhaseId === 'spring' && '🌱'}
                      {activePhaseId === 'summer' && '☀️'}
                      {activePhaseId === 'autumn' && '🍁'}
                      {activePhaseId === 'winter' && '❄️'}
                      {phase.subName} Phase
                    </span>
                  </div>

                  <h2 className="font-display font-black text-2xl tracking-tight text-white">
                    {phase.name}
                  </h2>
                  <p className="font-body text-xs text-[#D8B4FE]/80 max-w-sm leading-relaxed">
                    {phase.tagline}
                  </p>
                </div>
              </div>

              {/* Bento Grid layout container */}
              <div className="px-6 space-y-6">

                {/* Left Bento Item: Interactive Cycle Tracker Ring */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center">
                  <CycleRing 
                    day={currentDay} 
                    maxDays={cycleLength} 
                    phase={phase}
                    onDayChange={setCurrentDay}
                  />
                  
                  <button 
                    onClick={() => setActiveTab('log')}
                    className="mt-6 w-full text-white py-3.5 px-6 rounded-2xl font-display font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all shadow-md cursor-pointer"
                    style={{ 
                      backgroundColor: phase.primaryColor,
                      boxShadow: `0 6px 20px ${phase.primaryColor}25`
                    }}
                  >
                    <PenTool className="w-4 h-4" />
                    <span>Log Symptoms</span>
                  </button>
                </div>

                {/* State Attributes Block */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gray-50" style={{ color: phase.primaryColor }}>
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-body text-gray-400 font-semibold uppercase">Energy Flow</span>
                      <span className="font-display font-bold text-sm" style={{ color: phase.primaryColor }}>
                        {phase.energyLevel}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gray-50" style={{ color: phase.primaryColor }}>
                      <Smile className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-body text-gray-400 font-semibold uppercase">Mood State</span>
                      <span className="font-display font-bold text-sm" style={{ color: phase.primaryColor }}>
                        {phase.moodState}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Today's Focus CTA Block */}
                <div 
                  className="rounded-3xl p-6 text-white flex flex-col justify-between shadow-lg relative overflow-hidden transition-all duration-500"
                  style={{ 
                    backgroundColor: phase.primaryColor,
                    boxShadow: `0 8px 30px ${phase.primaryColor}25`
                  }}
                >
                  {/* Subtle leafy/floral organic decoration pattern in background */}
                  <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none transform translate-y-4 translate-x-4">
                    <Leaf className="w-48 h-48" />
                  </div>

                  <div className="space-y-2.5 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white mb-2">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-black text-lg leading-snug">
                      {phase.focusTitle}
                    </h3>
                    <p className="font-body text-xs text-white/90 leading-relaxed">
                      {phase.focusDesc}
                    </p>
                  </div>

                  <button 
                    onClick={() => {
                      // Navigate to Insights or open Log directly
                      setActiveTab('insights');
                    }}
                    className="mt-6 bg-white hover:bg-gray-50 text-gray-800 font-display font-bold text-xs py-3 px-6 rounded-2xl cursor-pointer self-start transition-transform hover:scale-[1.02] active:scale-98 flex items-center gap-1.5 shadow-sm"
                    style={{ color: phase.primaryColor }}
                  >
                    <span>Explore Insights</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Phase Expression checklist tasks */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="font-display text-lg font-bold text-gray-800">
                      Today's Expression
                    </h3>
                    <span 
                      className="text-[10px] font-display font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                      style={{ backgroundColor: phase.secondaryColor, color: phase.primaryColor }}
                    >
                      Active Intentions
                    </span>
                  </div>

                  <div className="space-y-3">
                    {phaseTasks.map((task) => {
                      const isCompleted = completedTasks.includes(task.id);
                      return (
                        <div 
                          key={task.id}
                          id={`task-item-${task.id}`}
                          onClick={() => handleToggleTask(task.id)}
                          className={`
                            group flex items-center p-3.5 rounded-2xl border transition-all cursor-pointer select-none
                            ${isCompleted 
                              ? 'border-gray-100 bg-gray-50/50 opacity-75' 
                              : 'border-gray-100 hover:border-gray-200 bg-white hover:bg-gray-50/30'
                            }
                          `}
                        >
                          <div className="flex-grow mr-4">
                            <h4 className={`font-display font-bold text-xs ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                              {task.title}
                            </h4>
                            <p className="font-body text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                              {task.description}
                            </p>
                            
                            {/* Tags list */}
                            <div className="flex gap-1.5 mt-2">
                              {task.tags.map((tag) => (
                                <span 
                                  key={tag}
                                  className="text-[9px] font-body text-gray-500 px-1.5 py-0.5 rounded-md"
                                  style={{ backgroundColor: phase.secondaryColor + '60' }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <button 
                            id={`task-check-btn-${task.id}`}
                            className={`
                              w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer active:scale-90
                              ${isCompleted 
                                ? 'text-white' 
                                : 'border-gray-200 text-transparent hover:border-gray-400'
                              }
                            `}
                            style={{
                              backgroundColor: isCompleted ? phase.primaryColor : 'transparent',
                              borderColor: isCompleted ? phase.primaryColor : undefined,
                            }}
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* Cycle Seasons Visual Overview Tab */}
          {activeTab === 'cycle' && (
            <div className="p-6 space-y-6">
              <div className="space-y-1.5">
                <h2 className="font-display font-extrabold text-2xl text-gray-800">Seasons Flow</h2>
                <p className="font-body text-xs text-gray-400 leading-relaxed">
                  Understand how your biological cycle mirrors the deep shifts of natural seasons. Click any season to preview its wisdom.
                </p>
              </div>

              {/* Full horizontal season flow tabs list */}
              <PhaseTabs 
                activePhaseId={activePhaseId}
                onPhaseSelect={handleSelectPhase}
              />

              {/* Cycle History Section showcasing 3 most recent cycles */}
              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center px-1">
                  <h3 className="font-display font-extrabold text-sm text-gray-800">Recent Cycles</h3>
                  <button 
                    onClick={() => setActiveTab('cycle-history')}
                    className="text-xs font-display font-bold flex items-center gap-0.5 hover:underline"
                    style={{ color: phase.primaryColor }}
                  >
                    <span>See All</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {historyData.slice(0, 3).map((item, idx) => {
                    const startFormatted = new Date(item.startDate).toLocaleDateString(undefined, { 
                      month: 'short', 
                      day: 'numeric' 
                    });

                    return (
                      <div 
                        key={item.id}
                        className="bg-white rounded-3xl p-4.5 border border-gray-100 shadow-3xs flex justify-between items-center hover:border-gray-200 transition-colors"
                      >
                        <div>
                          <span className="text-[10px] font-display font-bold text-gray-400 uppercase tracking-wider">
                            Cycle #{historyData.length - idx}
                          </span>
                          <h4 className="font-display font-bold text-gray-800 text-xs mt-0.5">
                            {startFormatted} – {new Date(item.endDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                          </h4>
                          <div className="flex gap-3 text-[10px] font-body text-gray-400 mt-1">
                            <span>Period: <strong>{item.periodLength}d</strong></span>
                            <span>Flow: <strong className="capitalize">{item.avgFlow}</strong></span>
                            <span>Mood: <strong>{item.avgMood}</strong></span>
                          </div>
                        </div>
                        
                        <div 
                          className="px-3 py-1.5 rounded-xl font-display font-extrabold text-xs text-center border shrink-0"
                          style={{ 
                            backgroundColor: phase.secondaryColor + '30',
                            borderColor: phase.primaryColor + '20',
                            color: phase.primaryColor
                          }}
                        >
                          {item.cycleLength} Days
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button 
                  onClick={() => setActiveTab('cycle-history')}
                  className="w-full py-3.5 px-4 rounded-2xl border border-gray-100 bg-white flex items-center justify-between text-xs font-display font-bold text-gray-700 hover:bg-gray-50 active:scale-99 transition-all shadow-3xs cursor-pointer group animate-fade-in"
                >
                  <span>View Full Cycles Database</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          )}

          {/* Detailed Log Symptom Screen */}
          {activeTab === 'log' && (
            <LogSymptomScreen
              date={activeDateString}
              cycleDay={currentDay}
              currentLog={currentLog}
              phase={phase}
              onSaveLog={handleSaveLog}
              onBack={() => setActiveTab('dashboard')}
            />
          )}

          {/* Forecast Calendar Screen */}
          {activeTab === 'calendar' && (
            <CycleCalendar
              onBack={() => setActiveTab('dashboard')}
              lastPeriodDate={lastPeriodDate}
              cycleLength={cycleLength}
              periodLength={periodLength}
              logs={logs}
              onSelectDate={(day) => {
                setCurrentDay(day);
              }}
            />
          )}

          {/* Settings Screen */}
          {activeTab === 'settings' && (
            <SettingsScreen
              onBack={() => setActiveTab('dashboard')}
              phase={phase}
              onLogout={() => {
                setIsOnboarded(false);
                setActiveTab('dashboard');
              }}
            />
          )}

          {/* Cycle History Screen */}
          {activeTab === 'cycle-history' && (
            <CycleHistoryScreen
              onBack={() => setActiveTab('cycle')}
              phase={phase}
              historyData={historyData}
            />
          )}

          {/* Holistic Insights & Predictions Tab */}
          {activeTab === 'insights' && (
            <div className="p-6 space-y-6">
              <div className="space-y-1.5">
                <h2 className="font-display font-extrabold text-2xl text-gray-800">Holistic Insights</h2>
                <p className="font-body text-xs text-gray-400 leading-relaxed">
                  Tailored biological insights and cycle schedule projections based on your custom seasonal flow rules.
                </p>
              </div>

              {/* Dynamic Predictions block */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
                <h3 className="font-display font-bold text-sm text-gray-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: phase.primaryColor }} />
                  <span>Cycle Prediction Calendar</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-2xl flex justify-between items-center text-xs">
                    <span className="font-body text-gray-600">Next Menstrual Cycle (Winter)</span>
                    <span className="font-display font-bold text-gray-800">
                      {(() => {
                        const nextStart = new Date(lastPeriodDate);
                        nextStart.setDate(nextStart.getDate() + cycleLength);
                        return nextStart.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                      })()}
                    </span>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-2xl flex justify-between items-center text-xs">
                    <span className="font-body text-gray-600">Predicted Fertile Window (Summer)</span>
                    <span className="font-display font-bold text-gray-800">
                      {(() => {
                        const midCycle = new Date(lastPeriodDate);
                        midCycle.setDate(midCycle.getDate() + 12);
                        const endCycle = new Date(lastPeriodDate);
                        endCycle.setDate(endCycle.getDate() + 16);
                        return `${midCycle.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - ${endCycle.getDate()}`;
                      })()}
                    </span>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-2xl flex justify-between items-center text-xs">
                    <span className="font-body text-gray-600">Predicted Ovulation Day</span>
                    <span className="font-display font-bold text-gray-800">
                      {(() => {
                        const ovDay = new Date(lastPeriodDate);
                        ovDay.setDate(ovDay.getDate() + 13);
                        return ovDay.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                      })()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Holistic Wisdom Cards depending on active phase */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
                <h3 className="font-display font-bold text-sm text-gray-800">
                  Phase Wisdom: {phase.id.toUpperCase()}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-sm flex-shrink-0">
                      🧠
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-gray-700">Mental State</h4>
                      <p className="font-body text-[11px] text-gray-500 mt-1 leading-relaxed">
                        {phase.mentalState}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-sm flex-shrink-0">
                      🥗
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-gray-700">Nutrition & Flow</h4>
                      <p className="font-body text-[11px] text-gray-500 mt-1 leading-relaxed">
                        {phase.nutritionTip}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-sm flex-shrink-0">
                      📖
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-gray-700">Philosophy</h4>
                      <p className="font-body text-[11px] text-gray-500 mt-1 leading-relaxed">
                        {phase.wisdomDesc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Intentions Manager (Today's Expression Editor) */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
                <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                  <div>
                    <h3 className="font-display font-bold text-sm text-gray-800 flex items-center gap-1.5">
                      <Leaf className="w-4 h-4" style={{ color: phase.primaryColor }} />
                      <span>Manage Intentions</span>
                    </h3>
                    <p className="text-[10px] font-body text-gray-400">Edit "Today's Expression" for each season</p>
                  </div>
                  
                  {/* Selector to select which season's intentions to edit */}
                  <select
                    value={editingPhaseId}
                    onChange={(e) => setEditingPhaseId(e.target.value as CyclePhase)}
                    className="text-xs font-display font-semibold bg-gray-50 border border-gray-200 text-gray-700 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-300"
                  >
                    <option value="winter">Winter (Menstruation) ❄️</option>
                    <option value="spring">Spring (Follicular) 🌱</option>
                    <option value="summer">Summer (Ovulation) ☀️</option>
                    <option value="autumn">Autumn (Luteal) 🍂</option>
                  </select>
                </div>

                {/* List of current intentions for the selected phase */}
                <div className="space-y-2.5">
                  {tasks.filter(t => t.phase === editingPhaseId).length > 0 ? (
                    tasks.filter(t => t.phase === editingPhaseId).map((t) => (
                      <div key={t.id} className="flex items-start justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-100/50">
                        <div className="space-y-1 pr-4">
                          <h4 className="font-display font-bold text-xs text-gray-800">{t.title}</h4>
                          {t.description && (
                            <p className="font-body text-[11px] text-gray-500 leading-normal">{t.description}</p>
                          )}
                          {t.tags && t.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {t.tags.map((tag) => (
                                <span key={tag} className="text-[9px] font-display font-medium px-1.5 py-0.5 rounded-md bg-white border border-gray-200 text-gray-400">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            setTasks(prev => prev.filter(task => task.id !== t.id));
                            // Also clear from completed if applicable
                            setCompletedTasks(prev => prev.filter(id => id !== t.id));
                          }}
                          className="p-1.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50/50 transition-colors cursor-pointer"
                          title="Delete Intention"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50/30">
                      <p className="text-xs text-gray-400 font-body italic">No intentions found for {editingPhaseId}.</p>
                    </div>
                  )}
                </div>

                {/* Add a new intention form */}
                <div className="p-4 bg-gray-50/80 rounded-2xl border border-gray-100 space-y-3">
                  <h4 className="text-[11px] font-display font-bold uppercase tracking-wider text-gray-400">
                    Add New Intention
                  </h4>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Intention Title (e.g. Afternoon stretch)"
                      value={newIntentionTitle}
                      onChange={(e) => setNewIntentionTitle(e.target.value)}
                      className="w-full text-xs font-display bg-white border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
                    />
                    <input
                      type="text"
                      placeholder="Description (e.g. Focus on deep breathing for 15 minutes)"
                      value={newIntentionDesc}
                      onChange={(e) => setNewIntentionDesc(e.target.value)}
                      className="w-full text-xs font-body bg-white border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
                    />
                    <input
                      type="text"
                      placeholder="Tags (optional, comma separated, e.g. Self-Care, Physical)"
                      value={newIntentionTags}
                      onChange={(e) => setNewIntentionTags(e.target.value)}
                      className="w-full text-xs font-body bg-white border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (!newIntentionTitle.trim()) return;
                      const newTask: Task = {
                        id: 'custom-' + Date.now(),
                        phase: editingPhaseId,
                        title: newIntentionTitle.trim(),
                        description: newIntentionDesc.trim(),
                        tags: newIntentionTags ? newIntentionTags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
                      };
                      setTasks(prev => [...prev, newTask]);
                      setNewIntentionTitle('');
                      setNewIntentionDesc('');
                      setNewIntentionTags('');
                    }}
                    disabled={!newIntentionTitle.trim()}
                    className="w-full py-2.5 text-xs font-display font-bold text-white rounded-xl transition-all disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed hover:brightness-105"
                    style={{ backgroundColor: phase.primaryColor }}
                  >
                    Add to {PHASES[editingPhaseId].name} List
                  </button>
                </div>
              </div>

              {/* Beautiful phase landscape visualization mock (Hotlinked from design system specs) */}
              {phase.headerImage && (
                <div className="relative rounded-3xl overflow-hidden h-44 shadow-sm group">
                  <img 
                    src={phase.headerImage} 
                    alt="Earthy aesthetic landscape depicting the nature of active luteal or ovulation phases"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                    <p className="text-white font-display font-black text-sm tracking-wide bg-black/20 backdrop-blur-md px-4 py-2 rounded-xl">
                      Honor the Rhythm
                    </p>
                  </div>
                </div>
              )}

            </div>
          )}

        </div> {/* Closes Inner App Container */}

        {/* Persistent Bottom Tabbed Navigation Menu */}
        {activeTab !== 'log' && activeTab !== 'settings' && activeTab !== 'cycle-history' && (
          <nav className="absolute bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-100 py-3 pb-8 px-6 flex justify-around items-center animate-fade-in">
            
            <button 
              id="nav-tab-dashboard"
              onClick={() => setActiveTab('dashboard')}
              className={`
                flex flex-col items-center justify-center px-4 py-1.5 transition-all rounded-full cursor-pointer
                ${activeTab === 'dashboard' 
                  ? 'font-bold scale-[1.03]' 
                  : 'text-gray-500 hover:text-gray-800'
                }
              `}
              style={activeTab === 'dashboard' ? {
                backgroundColor: phase.secondaryColor,
                color: phase.primaryColor,
              } : undefined}
            >
              <Grid className="w-5 h-5" />
              <span className="text-[10px] font-display font-bold mt-1">Dashboard</span>
            </button>

            <button 
              id="nav-tab-cycle"
              onClick={() => setActiveTab('cycle')}
              className={`
                flex flex-col items-center justify-center px-4 py-1.5 transition-all rounded-full cursor-pointer
                ${activeTab === 'cycle' 
                  ? 'font-bold scale-[1.03]' 
                  : 'text-gray-500 hover:text-gray-800'
                }
              `}
              style={activeTab === 'cycle' ? {
                backgroundColor: phase.secondaryColor,
                color: phase.primaryColor,
              } : undefined}
            >
              <RotateCcw className="w-5 h-5" />
              <span className="text-[10px] font-display font-bold mt-1">Cycle</span>
            </button>

            <button 
              id="nav-tab-calendar"
              onClick={() => setActiveTab('calendar')}
              className={`
                flex flex-col items-center justify-center px-4 py-1.5 transition-all rounded-full cursor-pointer
                ${activeTab === 'calendar' 
                  ? 'font-bold scale-[1.03]' 
                  : 'text-gray-500 hover:text-gray-800'
                }
              `}
              style={activeTab === 'calendar' ? {
                backgroundColor: phase.secondaryColor,
                color: phase.primaryColor,
              } : undefined}
            >
              <CalendarDays className="w-5 h-5" />
              <span className="text-[10px] font-display font-bold mt-1">Calendar</span>
            </button>

            <button 
              id="nav-tab-insights"
              onClick={() => setActiveTab('insights')}
              className={`
                flex flex-col items-center justify-center px-4 py-1.5 transition-all rounded-full cursor-pointer
                ${activeTab === 'insights' 
                  ? 'font-bold scale-[1.03]' 
                  : 'text-gray-500 hover:text-gray-800'
                }
              `}
              style={activeTab === 'insights' ? {
                backgroundColor: phase.secondaryColor,
                color: phase.primaryColor,
              } : undefined}
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-[10px] font-display font-bold mt-1">Insights</span>
            </button>

          </nav>
        )}
          </>
        )}

      </div>
    </div>
  );
}

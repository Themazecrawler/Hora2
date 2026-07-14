/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Leaf, 
  Droplet, 
  Zap, 
  Wind, 
  Sparkles, 
  Activity, 
  Brain, 
  Utensils, 
  Smile, 
  AlertCircle, 
  Heart, 
  Frown, 
  Target,
  CheckCircle,
  Flower,
  Flame,
  Moon
} from 'lucide-react';
import { DailyLog, PhaseInfo } from '../types';

interface LogSymptomScreenProps {
  date: string;
  cycleDay: number;
  currentLog: DailyLog | null;
  phase: PhaseInfo;
  onSaveLog: (log: DailyLog) => void;
  onBack: () => void;
}

export const LogSymptomScreen: React.FC<LogSymptomScreenProps> = ({
  date,
  cycleDay,
  currentLog,
  phase,
  onSaveLog,
  onBack,
}) => {
  // State variables hydrated from previous logs or phase defaults
  const [flow, setFlow] = useState<'none' | 'light' | 'medium' | 'heavy'>('none');
  const [mood, setMood] = useState<string>('calm');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>('');
  const [vaginalDischarge, setVaginalDischarge] = useState<'none' | 'dry' | 'sticky' | 'creamy' | 'watery' | 'egg-white'>('none');
  const [sexDrive, setSexDrive] = useState<'none' | 'low' | 'medium' | 'high'>('none');

  // Hydrate states when currentLog changes or when viewing a different day
  useEffect(() => {
    if (currentLog) {
      setFlow(currentLog.flow || 'none');
      setMood(currentLog.mood || 'calm');
      setSelectedSymptoms(currentLog.symptoms || []);
      setNotes(currentLog.notes || '');
      setVaginalDischarge(currentLog.vaginalDischarge || 'none');
      setSexDrive(currentLog.sexDrive || 'none');
    } else {
      setFlow('none');
      // Set default mood based on phase
      if (phase.id === 'winter') {
        setMood('sensitive');
      } else if (phase.id === 'spring') {
        setMood('focused');
      } else if (phase.id === 'summer') {
        setMood('happy');
      } else {
        setMood('calm');
      }
      setSelectedSymptoms([]);
      setNotes('');
      setVaginalDischarge('none');
      setSexDrive('none');
    }
  }, [currentLog, cycleDay, phase]);

  // Toggle symptom selection
  const handleToggleSymptom = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((id) => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleSave = () => {
    onSaveLog({
      date,
      cycleDay,
      flow,
      mood,
      symptoms: selectedSymptoms,
      completedTasks: currentLog?.completedTasks || [],
      notes,
      vaginalDischarge,
      sexDrive,
    });
    onBack();
  };

  const primaryColor = phase.primaryColor;
  const secondaryColor = phase.secondaryColor;

  // Custom wellness tips for each season
  const getSeasonalTip = () => {
    switch (phase.id) {
      case 'spring':
        return {
          title: 'Spring Tip',
          text: 'Your energy is building. Great time to start a new workout routine!',
          icon: Flower
        };
      case 'summer':
        return {
          title: 'Summer Tip',
          text: 'Estrogen and LH are at their peak. Excel in collaborative tasks and creative conversations!',
          icon: Sparkles
        };
      case 'autumn':
        return {
          title: 'Autumn Tip',
          text: 'Progesterone is rising. Focus on detail-oriented organization, cozy nesting, and grounding meals.',
          icon: Leaf
        };
      case 'winter':
        return {
          title: 'Winter Tip',
          text: 'Your body is resetting. Honor the natural urge to withdraw, hydrate, and get deep, restorative rest.',
          icon: Heart
        };
      default:
        return {
          title: 'Wellness Tip',
          text: 'Listen to your body and adjust your pace to sync with your inner seasons.',
          icon: Sparkles
        };
    }
  };

  const tip = getSeasonalTip();
  const TipIcon = tip.icon;

  // Formatting date string nicely
  const formattedDate = new Date(date).toLocaleDateString(undefined, { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="relative min-h-screen pb-32">
      {/* Header Back Button & Main Heading */}
      <div className="p-6 pb-2 space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2.5 rounded-2xl hover:bg-gray-100 text-gray-500 hover:text-gray-800 border border-gray-100 bg-white transition-all cursor-pointer active:scale-95 shadow-2xs flex items-center justify-center"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <span className="text-xs font-display font-extrabold px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-gray-500 uppercase tracking-wider">
            Cycle Day {cycleDay}
          </span>
        </div>

        <div>
          <h2 className="font-display font-extrabold text-2xl text-gray-800 mb-1 leading-tight">
            How are you feeling today?
          </h2>
          <p className="font-body text-xs text-gray-400">
            Capture your symptoms to sync with your inner rhythm.
          </p>
          <p className="text-[10px] font-body text-gray-400 mt-1">
            {formattedDate}
          </p>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="p-6 space-y-6">
        
        {/* Seasonal Tip Card */}
        <div 
          className="relative overflow-hidden rounded-3xl p-5 border shadow-sm transition-all duration-300"
          style={{ 
            backgroundColor: secondaryColor,
            borderColor: `${primaryColor}15`
          }}
        >
          <div className="flex items-start gap-3.5 relative z-10">
            <div className="bg-white/60 rounded-2xl p-2.5 flex items-center justify-center text-gray-800 shadow-3xs">
              <TipIcon className="w-4.5 h-4.5" style={{ color: primaryColor }} />
            </div>
            <div>
              <span className="font-display font-black text-[10px] uppercase tracking-wider block mb-1" style={{ color: primaryColor }}>
                {tip.title}
              </span>
              <p className="font-body text-xs text-gray-700 leading-relaxed font-medium">
                {tip.text}
              </p>
            </div>
          </div>
          
          {/* Decorative background flower watermark */}
          <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none transform rotate-12" style={{ color: primaryColor }}>
            <Flower className="w-24 h-24" />
          </div>
        </div>

        {/* Period Flow Selector */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-xs uppercase tracking-widest text-gray-400">
            Flow
          </h3>
          <div className="flex gap-2.5">
            {([
              { id: 'none', label: 'None', opacity: 0.1 },
              { id: 'light', label: 'Light', opacity: 0.4 },
              { id: 'medium', label: 'Medium', opacity: 0.7 },
              { id: 'heavy', label: 'Heavy', opacity: 1.0 }
            ] as const).map((level) => {
              const isActive = flow === level.id;
              return (
                <button
                  key={level.id}
                  onClick={() => setFlow(level.id)}
                  className="flex-1 py-4 px-2 rounded-2xl border transition-all flex flex-col items-center gap-2 cursor-pointer active:scale-95 bg-white"
                  style={{
                    borderColor: isActive ? primaryColor : '#f3f4f6',
                    backgroundColor: isActive ? `${primaryColor}08` : '#ffffff',
                    borderWidth: isActive ? '2px' : '1px',
                    boxShadow: isActive ? `0 4px 12px ${primaryColor}10` : 'none'
                  }}
                >
                  <Droplet 
                    className="w-5 h-5 transition-transform group-hover:scale-110" 
                    style={{ 
                      color: level.id === 'none' ? '#9ca3af' : '#ef4444',
                      fill: level.id === 'none' ? 'none' : '#ef4444',
                      fillOpacity: level.opacity
                    }} 
                  />
                  <span className={`font-display text-[11px] font-bold ${isActive ? 'text-gray-800' : 'text-gray-500'}`}>
                    {level.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Physical Symptoms Grid */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-xs uppercase tracking-widest text-gray-400">
            Physical Symptoms
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            {([
              { id: 'tender_breasts', label: 'Tender Breasts', icon: Heart },
              { id: 'fatigue', label: 'Fatigue', icon: Frown },
              { id: 'acne', label: 'Acne', icon: Sparkles },
              { id: 'backache', label: 'Backache', icon: Activity },
              { id: 'insomnia', label: 'Insomnia', icon: Moon },
              { id: 'hot_flashes', label: 'Hot Flashes', icon: Flame },
              { id: 'joint_pains', label: 'Joint Pains', icon: Activity },
              { id: 'dry_skin', label: 'Dry Skin', icon: Droplet }
            ] as const).map((symptom) => {
              const isSelected = selectedSymptoms.includes(symptom.id);
              const SIcon = symptom.icon;
              return (
                <button
                  key={symptom.id}
                  onClick={() => handleToggleSymptom(symptom.id)}
                  className="p-3.5 rounded-2xl border transition-all flex items-center gap-3 cursor-pointer active:scale-95 bg-white text-left"
                  style={{
                    borderColor: isSelected ? primaryColor : '#f3f4f6',
                    backgroundColor: isSelected ? `${primaryColor}08` : '#ffffff',
                    borderWidth: isSelected ? '2px' : '1px',
                    boxShadow: isSelected ? `0 4px 12px ${primaryColor}10` : 'none'
                  }}
                >
                  <span className="p-1.5 rounded-xl bg-gray-50 text-gray-600">
                    <SIcon 
                      className="w-4 h-4 transition-transform" 
                      style={{ color: isSelected ? primaryColor : '#9ca3af' }} 
                    />
                  </span>
                  <span className={`font-display text-[11px] font-bold ${isSelected ? 'text-gray-800' : 'text-gray-500'}`}>
                    {symptom.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Vaginal Discharge Category Selector */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-xs uppercase tracking-widest text-gray-400">
            Vaginal Discharge
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {([
              { id: 'none', label: 'None', desc: 'Dry / No fluid' },
              { id: 'dry', label: 'Dry', desc: 'No fluid' },
              { id: 'sticky', label: 'Sticky', desc: 'Glue-like / Thick' },
              { id: 'creamy', label: 'Creamy', desc: 'Lotion-like' },
              { id: 'watery', label: 'Watery', desc: 'Wet / Clear' },
              { id: 'egg-white', label: 'Egg White', desc: 'Stretchy / Slippery' }
            ] as const).map((dischargeOption) => {
              const isActive = vaginalDischarge === dischargeOption.id;
              return (
                <button
                  key={dischargeOption.id}
                  onClick={() => setVaginalDischarge(dischargeOption.id)}
                  className="p-2.5 rounded-2xl border transition-all flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 bg-white h-20"
                  style={{
                    borderColor: isActive ? primaryColor : '#f3f4f6',
                    backgroundColor: isActive ? `${primaryColor}08` : '#ffffff',
                    borderWidth: isActive ? '2px' : '1px',
                    boxShadow: isActive ? `0 4px 12px ${primaryColor}10` : 'none'
                  }}
                >
                  <span className={`font-display text-[11px] font-bold block ${isActive ? 'text-gray-800' : 'text-gray-600'}`}>
                    {dischargeOption.label}
                  </span>
                  <span className="font-body text-[9px] text-gray-400 mt-0.5 leading-tight">
                    {dischargeOption.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sex Drive Category Selector */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-xs uppercase tracking-widest text-gray-400">
            Sex Drive
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {([
              { id: 'none', label: 'None', emoji: '💤' },
              { id: 'low', label: 'Low', emoji: '😌' },
              { id: 'medium', label: 'Medium', emoji: '😏' },
              { id: 'high', label: 'High', emoji: '🔥' }
            ] as const).map((driveOption) => {
              const isActive = sexDrive === driveOption.id;
              return (
                <button
                  key={driveOption.id}
                  onClick={() => setSexDrive(driveOption.id)}
                  className="p-3 rounded-2xl border transition-all flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 bg-white"
                  style={{
                    borderColor: isActive ? primaryColor : '#f3f4f6',
                    backgroundColor: isActive ? `${primaryColor}08` : '#ffffff',
                    borderWidth: isActive ? '2px' : '1px',
                    boxShadow: isActive ? `0 4px 12px ${primaryColor}10` : 'none'
                  }}
                >
                  <span className="text-sm mb-1">{driveOption.emoji}</span>
                  <span className={`font-display text-[10px] font-bold ${isActive ? 'text-gray-800' : 'text-gray-500'}`}>
                    {driveOption.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Emotional Moods Grid */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-xs uppercase tracking-widest text-gray-400">
            Emotional
          </h3>
          <div className="grid grid-cols-3 gap-2.5">
            {([
              { id: 'happy', label: 'Happy', icon: Smile },
              { id: 'anxious', label: 'Anxious', icon: AlertCircle },
              { id: 'calm', label: 'Calm', icon: Heart },
              { id: 'sensitive', label: 'Sensitive', icon: Leaf },
              { id: 'irritable', label: 'Irritable', icon: Frown },
              { id: 'focused', label: 'Focused', icon: Target }
            ] as const).map((moodOption) => {
              const isActive = mood === moodOption.id;
              const MIcon = moodOption.icon;
              return (
                <button
                  key={moodOption.id}
                  onClick={() => setMood(moodOption.id)}
                  className="p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 cursor-pointer active:scale-95 bg-white"
                  style={{
                    borderColor: isActive ? primaryColor : '#f3f4f6',
                    backgroundColor: isActive ? `${primaryColor}08` : '#ffffff',
                    borderWidth: isActive ? '2px' : '1px',
                    boxShadow: isActive ? `0 4px 12px ${primaryColor}10` : 'none'
                  }}
                >
                  <MIcon 
                    className="w-4.5 h-4.5 transition-transform" 
                    style={{ color: isActive ? primaryColor : '#9ca3af' }} 
                  />
                  <span className={`font-display text-[10px] font-bold ${isActive ? 'text-gray-800' : 'text-gray-500'}`}>
                    {moodOption.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Daily Reflections / Journal */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-xs uppercase tracking-widest text-gray-400">
            Daily Reflections
          </h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Journal your physical sensations, energy flow, or reflections today..."
            rows={3}
            className="w-full p-4 rounded-2xl bg-white border border-gray-200 text-xs font-body text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all resize-none"
          />
        </div>

        {/* Asymmetric Seasonal Image Feature */}
        {phase.headerImage && (
          <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-sm border border-gray-100 group mt-4">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10" />
            <img 
              src={phase.headerImage} 
              alt={`${phase.name} awakening landscape`}
              className="w-full h-full object-cover scale-102 transition-transform duration-700 group-hover:scale-100"
            />
            <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-1">
              <span 
                className="text-white font-display font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md"
                style={{ backgroundColor: `${primaryColor}aa` }}
              >
                {phase.name} Awakening
              </span>
            </div>
          </div>
        )}

      </div>

      {/* Floating Save Button Area */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-6 bg-gradient-to-t from-white via-white to-transparent pointer-events-none">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleSave}
            className="pointer-events-auto w-full text-white py-4 rounded-full font-display font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
            style={{ 
              backgroundColor: primaryColor,
              boxShadow: `0 8px 24px ${primaryColor}40`
            }}
          >
            <CheckCircle className="w-5 h-5" />
            <span>Save Today's Log</span>
          </button>
        </div>
      </div>
    </div>
  );
};

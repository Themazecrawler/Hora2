/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle,
  HelpCircle,
  Mail,
  User,
  Heart,
  CalendarDays
} from 'lucide-react';
import { PhaseInfo } from '../types';
import { PanoramicHeader } from './PanoramicHeader';

export interface OnboardingData {
  birthYear: number;
  lastPeriodDate: string | null;
  dontRememberPeriod: boolean;
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
  phase: PhaseInfo;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, phase }) => {
  const [step, setStep] = useState<'welcome' | 'age' | 'period' | 'signup' | 'signin' | 'reset-password'>('welcome');
  
  // Onboarding answers state
  const [birthYear, setBirthYear] = useState<number>(1995);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 13);
    return d.toISOString().split('T')[0];
  });
  const [dontRememberPeriod, setDontRememberPeriod] = useState<boolean>(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Wheel picker configuration for year of birth
  const startYear = 1960;
  const endYear = 2012;
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  const wheelRef = useRef<HTMLDivElement>(null);

  // Align wheel scroll to current birthYear
  useEffect(() => {
    if (step === 'age' && wheelRef.current) {
      const selectedIndex = years.indexOf(birthYear);
      if (selectedIndex !== -1) {
        const itemElement = wheelRef.current.children[selectedIndex] as HTMLElement;
        if (itemElement) {
          wheelRef.current.scrollTop = itemElement.offsetTop - wheelRef.current.clientHeight / 2 + itemElement.clientHeight / 2;
        }
      }
    }
  }, [step, birthYear]);

  // Handle auto centering when scroll ends
  const handleWheelScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollTop = container.scrollTop;
    const itemHeight = 44; // Approx height of each list element
    const centerIndex = Math.round(scrollTop / itemHeight);
    if (centerIndex >= 0 && centerIndex < years.length) {
      const year = years[centerIndex];
      if (year !== birthYear) {
        setBirthYear(year);
      }
    }
  };

  const handleCompleteAll = () => {
    onComplete({
      birthYear,
      lastPeriodDate: dontRememberPeriod ? null : selectedDate,
      dontRememberPeriod,
    });
  };



  // Mini calendar helper state
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState<Date>(new Date());
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const changeMonth = (offset: number) => {
    setCurrentCalendarMonth(prev => {
      const n = new Date(prev);
      n.setMonth(n.getMonth() + offset);
      return n;
    });
  };

  const daysInMonth = getDaysInMonth(currentCalendarMonth);
  const firstDay = getFirstDayOfMonth(currentCalendarMonth);
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const prefixBlanks = Array.from({ length: firstDay }, (_, i) => null);

  const formattedCalendarHeader = currentCalendarMonth.toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric'
  });

  const handleSelectCalendarDay = (dayNum: number) => {
    const y = currentCalendarMonth.getFullYear();
    const m = String(currentCalendarMonth.getMonth() + 1).padStart(2, '0');
    const d = String(dayNum).padStart(2, '0');
    setSelectedDate(`${y}-${m}-${d}`);
    setDontRememberPeriod(false);
  };

  return (
    <div className="flex-1 flex flex-col justify-between min-h-[760px] p-6 relative overflow-hidden bg-[#1B1725]">
      {/* Background visual ambiance */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#6CCB70]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8FC5F5]/5 rounded-full blur-3xl -z-10" />

      {/* RENDER STEP: WELCOME */}
      {step === 'welcome' && (
        <div className="flex-1 flex flex-col justify-between pt-0 animate-fade-in">
          <div className="space-y-5">
            {/* Seasonal Panoramic Header */}
            <div className="-mx-6 -mt-6 mb-4 rounded-t-[40px] overflow-hidden relative">
              <PanoramicHeader size="lg" activeStep={1} />
            </div>

            {/* Title & Slogan */}
            <div className="space-y-2.5 text-center mt-3">
              <h1 className="font-display font-black text-2xl text-white tracking-tight leading-tight px-2">
                Track your cycle through the seasons.
              </h1>
              <p className="font-body text-xs text-[#D8B4FE]/80 max-w-sm mx-auto px-4 leading-relaxed">
                Understand your cycle with a calm, private experience designed around your body's natural rhythm.
              </p>
            </div>

            {/* Privacy Section (Branded with App Identity) */}
            <div className="space-y-3 pt-1 text-left max-w-md mx-auto px-1">
              <div className="p-4 bg-[#252033]/75 border border-[#312944] rounded-2xl shadow-2xs space-y-3">
                <div className="flex gap-3 items-start">
                  <span className="p-2 rounded-xl bg-[#312944] text-[#D8B4FE] shrink-0">
                    <ShieldCheck className="w-4.5 h-4.5" />
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-xs text-white">Your data stays yours</h4>
                    <p className="font-body text-[11px] text-[#D8B4FE]/60 leading-normal mt-0.5">
                      Your biology logs are encrypted directly on your device. We believe in absolute privacy.
                    </p>
                  </div>
                </div>

                <hr className="border-[#312944]" />

                <ul className="space-y-2 text-[11px] font-display font-bold text-[#D8B4FE]/80 pl-2">
                  <li className="flex items-center gap-2">
                    <span className="text-[10px] text-[#D8B4FE]/40">●</span>
                    No advertising trackers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[10px] text-[#D8B4FE]/40">●</span>
                    Anonymous profile supported
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[10px] text-[#D8B4FE]/40">●</span>
                    You can delete your logs at any time
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action buttons (Neutral Styling) */}
          <div className="space-y-2.5 pt-6 border-t border-stone-200/50">
            <button
              onClick={() => setStep('age')}
              className="w-full py-4 bg-[#A78BFA] hover:bg-[#9067F9] text-white rounded-2xl font-display font-bold text-sm shadow-sm active:scale-99 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Get Started</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleCompleteAll}
              className="w-full py-3 hover:bg-stone-50 text-stone-400 hover:text-stone-600 rounded-2xl font-display font-bold text-xs transition-all cursor-pointer text-center"
            >
              Skip for now
            </button>
          </div>
        </div>
      )}

      {/* RENDER STEP: ONBOARDING AGE SCREEN */}
      {step === 'age' && (
        <div className="flex-1 flex flex-col justify-between pt-0 animate-fade-in">
          <div className="space-y-5">
            {/* Small Panoramic Seasonal Header */}
            <div className="-mx-6 -mt-6 mb-4 rounded-t-[40px] overflow-hidden relative">
              <PanoramicHeader size="lg" activeStep={2} />
            </div>

            {/* Back Button */}
            <button
              onClick={() => setStep('welcome')}
              className="flex items-center gap-1.5 text-xs font-display font-bold text-[#D8B4FE]/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to welcome</span>
            </button>

            {/* Header Text */}
            <div className="space-y-1 text-center">
              <h2 className="font-display font-black text-xl text-white">When were you born?</h2>
              <p className="font-body text-xs text-[#D8B4FE]/80 max-w-xs mx-auto">
                We use your birth year to calculate biological age phases and fertility estimates without storing your exact birthday.
              </p>
            </div>

            {/* Beautiful Birth Year Wheel Picker */}
            <div className="relative py-3 max-w-xs mx-auto">
              
              <div 
                ref={wheelRef}
                onScroll={handleWheelScroll}
                className="h-36 overflow-y-auto no-scrollbar scroll-smooth snap-y snap-mandatory relative text-center"
                style={{
                  maskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)'
                }}
              >
                {/* Blank spacing items to make first and last align to center */}
                <div className="h-12" />
                
                {years.map((yr) => {
                  const isSelected = yr === birthYear;
                  return (
                    <div
                      key={yr}
                      onClick={() => setBirthYear(yr)}
                      className={`
                        h-11 flex items-center justify-center font-display font-black snap-center cursor-pointer transition-all duration-200
                        ${isSelected 
                          ? 'text-[#A78BFA] text-2xl scale-110 font-extrabold' 
                          : 'text-[#D8B4FE]/30 text-base hover:text-[#D8B4FE]/70'
                        }
                      `}
                    >
                      {yr}
                    </div>
                  );
                })}

                <div className="h-12" />
              </div>

              {/* Tooltip detail */}
              <div className="text-center text-[10px] font-body text-[#D8B4FE]/60 mt-2 flex items-center justify-center gap-1">
                <span>Selected Birth Year: <strong className="text-white">{birthYear}</strong></span>
                <span>•</span>
                <span>Est. Age: <strong className="text-white">{new Date().getFullYear() - birthYear} years</strong></span>
              </div>
            </div>
          </div>

          {/* Action Footer (Neutral styling) */}
          <div className="space-y-3.5 pt-6 border-t border-[#312944] flex items-center justify-between">
            <button
              onClick={() => setStep('period')}
              className="text-xs font-display font-bold text-[#D8B4FE]/60 hover:text-white transition-colors cursor-pointer decoration-dotted underline"
            >
              Skip this step
            </button>

            <button
              onClick={() => setStep('period')}
              className="px-6 py-3.5 bg-[#A78BFA] hover:bg-[#9067F9] text-white rounded-xl font-display font-bold text-xs shadow-sm active:scale-99 transition-all cursor-pointer flex items-center gap-1"
            >
              <span>Next Step</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* RENDER STEP: ONBOARDING PERIOD SCREEN */}
      {step === 'period' && (
        <div className="flex-1 flex flex-col justify-between pt-0 animate-fade-in">
          <div className="space-y-5">
            {/* Small Panoramic Seasonal Header */}
            <div className="-mx-6 -mt-6 mb-4 rounded-t-[40px] overflow-hidden relative">
              <PanoramicHeader size="lg" activeStep={3} />
            </div>

            {/* Back Button */}
            <button
              onClick={() => setStep('age')}
              className="flex items-center gap-1.5 text-xs font-display font-bold text-[#D8B4FE]/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to birth year</span>
            </button>

            {/* Header Text */}
            <div className="space-y-1 text-center">
              <h2 className="font-display font-black text-xl text-white leading-tight">When did your last period start?</h2>
              <p className="font-body text-[11px] text-[#D8B4FE]/80 max-w-xs mx-auto">
                We use this to predict your current cycle phase and hormonal season.
              </p>
            </div>

            {/* Custom Mini Calendar Selector */}
            <div className="bg-[#252033] border border-[#312944] rounded-3xl p-4 space-y-3 max-w-xs mx-auto shadow-2xs">
              <div className="flex justify-between items-center px-1">
                <button 
                  onClick={() => changeMonth(-1)}
                  className="p-1 rounded-lg hover:bg-[#312944] text-[#D8B4FE] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <span className="font-display font-bold text-xs text-white">
                  {formattedCalendarHeader}
                </span>
                <button 
                  onClick={() => changeMonth(1)}
                  className="p-1 rounded-lg hover:bg-[#312944] text-[#D8B4FE] transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-display font-bold text-[#D8B4FE]/50">
                <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
              </div>

              <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
                {prefixBlanks.map((_, i) => (
                  <div key={`blank-${i}`} />
                ))}
                {calendarDays.map((dNum) => {
                  const dayDateStr = `${currentCalendarMonth.getFullYear()}-${String(currentCalendarMonth.getMonth() + 1).padStart(2, '0')}-${String(dNum).padStart(2, '0')}`;
                  const isSelected = selectedDate === dayDateStr && !dontRememberPeriod;
                  
                  return (
                    <button
                      key={`day-${dNum}`}
                      onClick={() => handleSelectCalendarDay(dNum)}
                      className={`
                        aspect-square rounded-full flex items-center justify-center font-display font-bold text-[11px] transition-all cursor-pointer
                        ${isSelected 
                          ? 'bg-[#A78BFA] text-white scale-110 shadow-md shadow-[#A78BFA]/20' 
                          : 'text-white hover:bg-[#312944] hover:text-white'
                        }
                      `}
                    >
                      {dNum}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* I Don't Remember Button Option */}
            <button
              onClick={() => setDontRememberPeriod(!dontRememberPeriod)}
              className={`
                w-full max-w-xs mx-auto p-3.5 rounded-2xl border transition-all flex items-center justify-center gap-2 cursor-pointer
                ${dontRememberPeriod 
                  ? 'border-[#A78BFA] bg-[#A78BFA]/15 text-white' 
                  : 'border-[#312944] bg-[#252033] text-[#D8B4FE]/80 hover:bg-[#312944]'
                }
              `}
            >
              <CalendarIcon className="w-4 h-4 shrink-0" />
              <span className="font-display font-bold text-xs">I don't remember exactly</span>
            </button>
          </div>

          {/* Action Footer (Neutral Styling) */}
          <div className="space-y-2 pt-6 border-t border-[#312944]">
            <button
              onClick={() => setStep('signup')}
              className="w-full py-4 bg-[#A78BFA] hover:bg-[#9067F9] text-white rounded-2xl font-display font-bold text-sm shadow-sm active:scale-99 transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              <span>Continue to sign up</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* RENDER STEP: SIGN UP SCREEN */}
      {step === 'signup' && (
        <div className="flex-1 flex flex-col justify-between pt-0 animate-fade-in">
          <div className="space-y-4">
            {/* Small Panoramic Seasonal Header */}
            <div className="-mx-6 -mt-6 mb-4 rounded-t-[40px] overflow-hidden relative">
              <PanoramicHeader size="lg" activeStep={4} />
            </div>

            {/* Back Button */}
            <button
              onClick={() => setStep('period')}
              className="flex items-center gap-1.5 text-xs font-display font-bold text-[#D8B4FE]/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to period log</span>
            </button>

            {/* Header Text */}
            <div className="space-y-1 text-center">
              <h2 className="font-display font-black text-xl text-white">Secure Your Timeline</h2>
              <p className="font-body text-xs text-[#D8B4FE]/80 max-w-xs mx-auto">
                Create a private pseudonym profile to keep your seasonal logs secure.
              </p>
            </div>

            {/* Forms in Creamy card */}
            <form 
              onSubmit={(e) => { 
                e.preventDefault(); 
                setIsSuccess(true); 
                setTimeout(() => handleCompleteAll(), 1500); 
              }} 
              className="bg-[#252033] border border-[#312944] p-4 rounded-3xl shadow-2xs space-y-3.5 max-w-sm mx-auto"
            >
              <div className="space-y-1">
                <label className="block text-[10px] font-display font-extrabold text-[#D8B4FE]/50 uppercase tracking-wider px-1">Nickname / Pseudonym</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D8B4FE]/50" />
                  <input
                    type="text"
                    placeholder="e.g. Lavender Sage"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-[#1B1725] border border-[#312944] text-xs rounded-xl focus:outline-none focus:bg-[#1B1725] focus:border-[#A78BFA] transition-all font-display font-bold text-white placeholder-[#D8B4FE]/30"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-display font-extrabold text-[#D8B4FE]/50 uppercase tracking-wider px-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D8B4FE]/50" />
                  <input
                    type="email"
                    placeholder="your.intimacy@privacy.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-[#1B1725] border border-[#312944] text-xs rounded-xl focus:outline-none focus:bg-[#1B1725] focus:border-[#A78BFA] transition-all font-display text-white placeholder-[#D8B4FE]/30"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-display font-extrabold text-[#D8B4FE]/50 uppercase tracking-wider px-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D8B4FE]/50" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-10 py-3 bg-[#1B1725] border border-[#312944] text-xs rounded-xl focus:outline-none focus:bg-[#1B1725] focus:border-[#A78BFA] transition-all font-mono text-white placeholder-[#D8B4FE]/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#D8B4FE]/50 hover:text-[#D8B4FE]/80 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isSuccess ? (
                <div className="p-3 bg-emerald-950/30 text-emerald-400 border border-emerald-900/30 rounded-xl text-center text-xs font-display font-bold animate-fade-in">
                  Account Created! Syncing seasons...
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#A78BFA] hover:bg-[#9067F9] text-white rounded-xl font-display font-bold text-xs shadow-sm active:scale-99 transition-all cursor-pointer mt-2"
                >
                  Create Profile &amp; Finish
                </button>
              )}
            </form>
          </div>

          {/* Footer - Switch to Sign In */}
          <div className="text-center pt-6 border-t border-stone-200/50">
            <span className="text-xs font-body text-stone-400">Already registered? </span>
            <button
              onClick={() => setStep('signin')}
              className="text-xs font-display font-black text-stone-700 hover:underline cursor-pointer"
            >
              Sign In Here
            </button>
          </div>
        </div>
      )}

      {/* RENDER STEP: SIGN IN SCREEN */}
      {step === 'signin' && (
        <div className="flex-1 flex flex-col justify-between pt-0 animate-fade-in">
          <div className="space-y-4">
            {/* Small Panoramic Seasonal Header */}
            <div className="-mx-6 -mt-6 mb-4 rounded-t-[40px] overflow-hidden relative">
              <PanoramicHeader size="lg" />
            </div>

            {/* Back Button */}
            <button
              onClick={() => setStep('signup')}
              className="flex items-center gap-1.5 text-xs font-display font-bold text-stone-400 hover:text-stone-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign Up</span>
            </button>

            {/* Header Text */}
            <div className="space-y-1 text-center">
              <h2 className="font-display font-black text-xl text-stone-800">Welcome Back</h2>
              <p className="font-body text-xs text-stone-500 max-w-xs mx-auto">
                Authenticate securely to restore your biology database and cycle seasons.
              </p>
            </div>

            {/* Sign In Form in Creamy Card */}
            <form 
              onSubmit={(e) => { 
                e.preventDefault(); 
                setIsSuccess(true); 
                setTimeout(() => handleCompleteAll(), 1500); 
              }} 
              className="bg-white border border-stone-150 p-4 rounded-3xl shadow-2xs space-y-3.5 max-w-sm mx-auto"
            >
              <div className="space-y-1">
                <label className="block text-[10px] font-display font-extrabold text-stone-400 uppercase tracking-wider px-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="email"
                    placeholder="your.intimacy@privacy.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-150 text-xs rounded-xl focus:outline-none focus:bg-white focus:border-stone-500 transition-all font-display text-stone-800"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center px-1">
                  <label className="block text-[10px] font-display font-extrabold text-stone-400 uppercase tracking-wider">Password</label>
                  <button
                    type="button"
                    onClick={() => setStep('reset-password')}
                    className="text-[10px] font-display font-bold text-stone-500 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-10 py-3 bg-stone-50 border border-stone-150 text-xs rounded-xl focus:outline-none focus:bg-white focus:border-stone-500 transition-all font-mono text-stone-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isSuccess ? (
                <div className="p-3 bg-[#EBFBEF] text-emerald-800 border border-[#D5F5DC] rounded-xl text-center text-xs font-display font-bold animate-fade-in">
                  Welcome back! Restoring timeline...
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#A78BFA] hover:bg-[#9067F9] text-white rounded-xl font-display font-bold text-xs shadow-sm active:scale-99 transition-all cursor-pointer mt-2"
                >
                  Sign In Securely
                </button>
              )}
            </form>
          </div>

          {/* Footer - Switch to Sign Up */}
          <div className="text-center pt-6 border-t border-stone-200/50">
            <span className="text-xs font-body text-stone-400">Don't have an account? </span>
            <button
              onClick={() => setStep('signup')}
              className="text-xs font-display font-black text-stone-700 hover:underline cursor-pointer"
            >
              Sign Up Here
            </button>
          </div>
        </div>
      )}

      {/* RENDER STEP: RESET PASSWORD SCREEN */}
      {step === 'reset-password' && (
        <div className="flex-1 flex flex-col justify-between pt-0 animate-fade-in">
          <div className="space-y-4">
            {/* Small Panoramic Seasonal Header */}
            <div className="-mx-6 -mt-6 mb-4 rounded-t-[40px] overflow-hidden relative">
              <PanoramicHeader size="lg" />
            </div>

            {/* Back Button */}
            <button
              onClick={() => setStep('signin')}
              className="flex items-center gap-1.5 text-xs font-display font-bold text-stone-400 hover:text-stone-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign In</span>
            </button>

            {/* Header Text */}
            <div className="space-y-1 text-center">
              <h2 className="font-display font-black text-xl text-stone-800">Reset Password</h2>
              <p className="font-body text-xs text-stone-500 max-w-xs mx-auto">
                Enter your registered pseudonym email and we will dispatch a secure recovery key.
              </p>
            </div>

            {/* Form */}
            <form 
              onSubmit={(e) => { 
                e.preventDefault(); 
                setResetSent(true); 
              }} 
              className="bg-white border border-stone-150 p-4 rounded-3xl shadow-2xs space-y-4 max-w-sm mx-auto"
            >
              <div className="space-y-1">
                <label className="block text-[10px] font-display font-extrabold text-stone-400 uppercase tracking-wider px-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="email"
                    placeholder="your.intimacy@privacy.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-150 text-xs rounded-xl focus:outline-none focus:bg-white focus:border-stone-500 transition-all font-display text-stone-800"
                  />
                </div>
              </div>

              {resetSent ? (
                <div className="p-4 bg-[#EBFBEF] text-emerald-800 border border-[#D5F5DC] rounded-2xl text-xs font-body leading-relaxed animate-fade-in space-y-2">
                  <p className="font-display font-black text-xs text-emerald-900 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Reset Instructions Sent
                  </p>
                  <p>Check your private inbox for the self-destructing reset code. Valid for exactly 15 minutes.</p>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#A78BFA] hover:bg-[#9067F9] text-white rounded-xl font-display font-bold text-xs shadow-sm active:scale-99 transition-all cursor-pointer mt-2"
                >
                  Send Reset Link
                </button>
              )}
            </form>
          </div>

          {/* Footer back button */}
          <div className="text-center pt-6 border-t border-stone-200/50">
            <button
              onClick={() => setStep('signin')}
              className="text-xs font-display font-black text-stone-700 hover:underline cursor-pointer"
            >
              Return to Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

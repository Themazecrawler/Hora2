/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CyclePhase = 'winter' | 'spring' | 'summer' | 'autumn';

export interface PhaseInfo {
  id: CyclePhase;
  name: string;
  subName: string;
  daysRange: string;
  daysText: string;
  description: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgGradient: string;
  energyText: string;
  moodText: string;
  energyLevel: 'High' | 'Medium' | 'Low' | 'Rising';
  moodState: 'Peak' | 'Optimistic' | 'Reflective' | 'Calm' | 'Vibrant';
  focusTitle: string;
  focusDesc: string;
  wisdomTitle: string;
  wisdomDesc: string;
  nutritionTip: string;
  mentalState: string;
  avatarUrl: string;
  headerImage?: string;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  cycleDay: number; // 1 to 28
  flow: 'none' | 'light' | 'medium' | 'heavy';
  mood: string; // e.g. 'vibrant', 'radiant', 'social', etc.
  symptoms: string[]; // e.g. ['cramps', 'fatigue']
  completedTasks: string[]; // list of completed task IDs
  notes: string;
  vaginalDischarge?: 'none' | 'dry' | 'sticky' | 'creamy' | 'watery' | 'egg-white';
  sexDrive?: 'none' | 'low' | 'medium' | 'high';
}

export interface CycleConfig {
  cycleLength: number; // typically 28
  periodLength: number; // typically 5
  lastPeriodDate: string; // YYYY-MM-DD
}

export interface Task {
  id: string;
  phase: CyclePhase;
  title: string;
  description: string;
  tags: string[];
}

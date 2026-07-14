/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PhaseInfo, Task } from './types';

export const PHASES: Record<string, PhaseInfo> = {
  winter: {
    id: 'winter',
    name: 'Winter',
    subName: 'Menstruation',
    daysRange: 'Day 1–5',
    daysText: 'RENEWING',
    description: 'Your body is in its lowest energy state, shedding the old to prepare for a new growth cycle.',
    tagline: 'Rest. Recovery. Reflection. Gentle movement.',
    primaryColor: '#8FC5F5', // Winter primary
    secondaryColor: '#405A73', // Winter secondary
    accentColor: '#8FC5F5',
    bgGradient: 'linear-gradient(135deg, #1B1725 0%, #405A73 100%)',
    energyText: 'Low',
    moodText: 'Restful',
    energyLevel: 'Low',
    moodState: 'Calm',
    focusTitle: 'Today\'s Rest: Renewal',
    focusDesc: 'Honor the natural urge to withdraw and recharge. Make sleep and quiet hydration a non-negotiable priority.',
    wisdomTitle: 'Winter Rest',
    wisdomDesc: 'The menstrual phase is like deep winter—a time for internal reflection and restoration. Just as nature rests under cover of snow, your body is resetting for the seasons ahead.',
    nutritionTip: 'Incorporate warm foods like soups, bone broths, and iron-rich lentils to support flow and active circulation.',
    mentalState: 'Heightened intuition. This is an ideal time for personal journaling, quiet contemplation, or setting soft intentions for the cycle ahead.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0AUU6ANbnNiziVOS-dSCWq6elIfbVGkRb89tgu5nIVXGrvgKUXBwOoatssmCJrr7ZvkMcWqHh4qZL4sjrSqLMdNiEelk2sRUqu1gWZ4_W1CiONKHjonWrrackK6cduR9Agd-1K9nGm4rvos9_jDbPuWBsyWfhd2HZu3TaT69L9WIsz5p85NgsgCC8gGUgShftb_Hvm3civrWrpZcQ5LegPvMfeTcA3s4Nh-PgNecXH7G5lbDONiimZJO0h24C8irVdgNI_PQYNuR7',
  },
  spring: {
    id: 'spring',
    name: 'Spring',
    subName: 'Follicular',
    daysRange: 'Day 6–12',
    daysText: 'GROWING',
    description: 'Estrogen levels are rising. You\'re feeling lighter, more energetic, and open to planning the days ahead.',
    tagline: 'Energy returning. A time for new beginnings.',
    primaryColor: '#6CCB70', // Spring primary
    secondaryColor: '#3E5F43', // Spring secondary
    accentColor: '#6CCB70',
    bgGradient: 'linear-gradient(135deg, #1B1725 0%, #3E5F43 100%)',
    energyText: 'Rising',
    moodText: 'Optimistic',
    energyLevel: 'Rising',
    moodState: 'Optimistic',
    focusTitle: 'Today\'s Cultivation: Building Intentions',
    focusDesc: 'Use your newly emerging mental clarity to establish goals and engage in creative brainstorming sessions.',
    wisdomTitle: 'Spring Awakening',
    wisdomDesc: 'With rising hormones, your brain is highly receptive to learning and new ideas. Plan out your month and embrace fresh perspectives.',
    nutritionTip: 'Load up on light, nutrient-dense fresh greens, fermented foods, and lean proteins to sustain your rising physical vitality.',
    mentalState: 'High mental focus. You are naturally curious, quick-witted, and ready to kickstart projects or plan workflows.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0AUU6ANbnNiziVOS-dSCWq6elIfbVGkRb89tgu5nIVXGrvgKUXBwOoatssmCJrr7ZvkMcWqHh4qZL4sjrSqLMdNiEelk2sRUqu1gWZ4_W1CiONKHjonWrrackK6cduR9Agd-1K9nGm4rvos9_jDbPuWBsyWfhd2HZu3TaT69L9WIsz5p85NgsgCC8gGUgShftb_Hvm3civrWrpZcQ5LegPvMfeTcA3s4Nh-PgNecXH7G5lbDONiimZJO0h24C8irVdgNI_PQYNuR7',
  },
  summer: {
    id: 'summer',
    name: 'Summer',
    subName: 'Ovulation',
    daysRange: 'Day 13–17',
    daysText: 'PEAK',
    description: 'Estrogen and LH levels are at their zenith. You are biologically primed for connection and expression. Leverage this natural charisma.',
    tagline: 'Peak Confidence. High Energy. Socializing. Creativity.',
    primaryColor: '#FFD54A', // Summer primary
    secondaryColor: '#6B5930', // Summer secondary
    accentColor: '#FFD54A',
    bgGradient: 'linear-gradient(135deg, #1B1725 0%, #6B5930 100%)',
    energyText: 'High',
    moodText: 'Peak',
    energyLevel: 'High',
    moodState: 'Peak',
    focusTitle: 'Today\'s Focus: Visibility',
    focusDesc: 'Your communication skills are amplified. Now is the perfect time for that presentation, collaborative workshop, or key conversation.',
    wisdomTitle: 'Summer Bloom',
    wisdomDesc: 'This is your season of highest verbal and social magnetism. Outward energy is at its maximum—collaborate, celebrate, and express yourself.',
    nutritionTip: 'Savor hydrating raw foods, fresh fruits, berries, and brassicas to assist your liver in parsing peak hormone levels.',
    mentalState: 'Peak sociability and high empathy. Connecting with friends and expressing your ideas feels highly organic and rewarding.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhdsEUt2aqePH7kDLKlRl_DJOplVmp-5PIhQZmvYe0fqfjzyQ3W7M9AxYvapR2aH5kx63HHNgi5zvrMyQE7Vv8WDmPgZKwvBN0L8ipGUgOV9fojgqKHaQJeUb_lwtNIxR8G67xllOTJJDVY66LFMfSaNEAt7nvHVSCpKRKqroJmooMEgvjf7zNn3mD5W5m0vr8LeL6BN97s5cPeyRkA9p28i2_4t3sbrTqT2X8RiDGDSeiQERsLgiUtTJPY1dD5qH1maUY8dcDVxd-',
  },
  autumn: {
    id: 'autumn',
    name: 'Autumn',
    subName: 'Luteal',
    daysRange: 'Day 18–28',
    daysText: 'REFLECTING',
    description: 'Your body is transitioning into rest. Honour your energy levels and find comfort in structured self-care.',
    tagline: 'Slowing down. Reflection. Self-care. Preparation.',
    primaryColor: '#F08A5D', // Autumn primary
    secondaryColor: '#6A4436', // Autumn secondary
    accentColor: '#F08A5D',
    bgGradient: 'linear-gradient(135deg, #1B1725 0%, #6A4436 100%)',
    energyText: 'Slowing',
    moodText: 'Introspective',
    energyLevel: 'Medium',
    moodState: 'Reflective',
    focusTitle: 'Today\'s Preparation: Grounding',
    focusDesc: 'Progesterone levels are soaring, shifting your focus inward. Devote time to administrative details, tidy space organization, and self-care.',
    wisdomTitle: 'Autumn Wisdom',
    wisdomDesc: 'The Luteal phase is for editing. Just as trees shed leaves, reflect on what no longer serves you and prepare to let it go with kindness.',
    nutritionTip: 'Choose complex carbohydrates like sweet potatoes, oats, and roasted root vegetables to maintain steady blood sugar levels.',
    mentalState: 'Nesting, detail-oriented, and highly analytical. Perfect for finishing tasks, wrapping up projects, and reviewing budgets.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZZsuZjoaLwiQyEsNQNuQPmCBt0R_pbwCCGcwSGtzqgq6aGLw0hmlD6pNL-2dZ9czc-vT6Fs7NzrBJl0sn33KfC6M6rhYpKA4-9VLPFAJNF55mtmzZrcsxUQk1e5G1oyeqG8i7t0AG4-e4dU8jWcXCAw91sM3xHvc0xleauQNxmq9MJCpmm0qppEhEGPVtpTdDf4uC3KjePvP_EnsFgDFjF7_3Wyc0-9Rapib-QCNWlQlt_z05hTrvdlbNHUPBsGzCOjXQVp0jSl6h',
    headerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL1zaXxX9oeoo-pcvW6fhKzzfWzC2thOelsQzD0h67Q66NP5QjzpiqJy8ZZe5DekJVKy0_hle9Sqgtq-Tv0oXrBAgWo7B8J6p4Ngyeb7wTGcah5GJhDpN1HrwLv32i6n9bfnVgJj0r7F2GdjOPb7_An0sTKPmPf8NKIfiMDHw_SRIM0n-lR7KqI2KR9KAosIdwdXA5_diJOIYKD4CeU7JrYym5kEMFiCC3ZwwDIezrCDka_w1epC9qvkEerP3z-kOw1zfmT7UMqX4G'
  }
};

export const DEFAULT_TASKS: Task[] = [
  // Winter
  {
    id: 'w1',
    phase: 'winter',
    title: 'Gentle Stretching',
    description: 'Focus on hips and lower back, 15 min.',
    tags: ['Physical', 'Gentle']
  },
  {
    id: 'w2',
    phase: 'winter',
    title: 'Early Bedtime',
    description: 'Aim for 9 hours of restorative, deep sleep.',
    tags: ['Rest', 'Bedtime']
  },
  {
    id: 'w3',
    phase: 'winter',
    title: 'Journal Intentions',
    description: 'Draft reflections on the past cycle and express release.',
    tags: ['Mental', 'Self-Care']
  },

  // Spring
  {
    id: 'sp1',
    phase: 'spring',
    title: 'Goal Setting',
    description: 'Map out three creative intentions for the week ahead.',
    tags: ['Mental', 'High Focus']
  },
  {
    id: 'sp2',
    phase: 'spring',
    title: 'Growth Activity',
    description: '15-minute gentle power flow to channel rising physical energy.',
    tags: ['Physical', 'Yoga']
  },
  {
    id: 'sp3',
    phase: 'spring',
    title: 'Organize Workspace',
    description: 'Clear structural clutter to welcome rising productivity.',
    tags: ['Environment', 'Clarity']
  },

  // Summer
  {
    id: 'su1',
    phase: 'summer',
    title: 'Social Connection',
    description: 'Call a dear friend or attend an energetic meetup tonight.',
    tags: ['Social', 'Connection']
  },
  {
    id: 'su2',
    phase: 'summer',
    title: 'Creative Project',
    description: 'Spend 45 mins working on your favorite passion project.',
    tags: ['Creative', 'Passionate']
  },
  {
    id: 'su3',
    phase: 'summer',
    title: 'Deliver Presentation',
    description: 'Pitch your key ideas during this high-communication window.',
    tags: ['Career', 'Visibility']
  },

  // Autumn
  {
    id: 'au1',
    phase: 'autumn',
    title: 'Self-Care Ritual',
    description: '20 min • Wind down with calming herbal chamomile tea.',
    tags: ['Self-Care', 'Ritual']
  },
  {
    id: 'au2',
    phase: 'autumn',
    title: 'Budget Review',
    description: '15 min • Financial clarity and analytical planning.',
    tags: ['Detail', 'Finance']
  },
  {
    id: 'au3',
    phase: 'autumn',
    title: 'Declutter Living Space',
    description: 'Shed excess items and curate a comforting nesting zone.',
    tags: ['Environment', 'Nesting']
  }
];

export const ALL_SYMPTOMS = [
  { id: 'cramps', label: 'Cramps', icon: '⚡' },
  { id: 'headache', label: 'Headache', icon: '🧠' },
  { id: 'bloating', label: 'Bloating', icon: '🎈' },
  { id: 'fatigue', label: 'Fatigue', icon: '😴' },
  { id: 'tender_breasts', label: 'Tender Breasts', icon: '🌸' },
  { id: 'acne', label: 'Breakouts', icon: '✨' },
  { id: 'backache', label: 'Backache', icon: '🧘' },
  { id: 'insomnia', label: 'Insomnia', icon: '🌙' },
];

export const ALL_MOODS = [
  { id: 'vibrant', label: 'Vibrant', color: '#F4B400' },
  { id: 'radiant', label: 'Radiant', color: '#F4B400' },
  { id: 'social', label: 'Social', color: '#FFF5CC' },
  { id: 'inspired', label: 'Inspired', color: '#FFA000' },
  { id: 'calm', label: 'Calm', color: '#EAF0E4' },
  { id: 'energetic', label: 'Energetic', color: '#4CAF50' },
  { id: 'optimistic', label: 'Optimistic', color: '#DDF5DD' },
  { id: 'reflective', label: 'Reflective', color: '#D96C3A' },
  { id: 'tired', label: 'Tired', color: '#6EA8D9' },
  { id: 'sensitive', label: 'Sensitive', color: '#EDF7FF' },
];

export const MOOD_MOSAIC_HISTORY = [
  { day: 1, mood: 'tired', phase: 'winter' },
  { day: 2, mood: 'sensitive', phase: 'winter' },
  { day: 3, mood: 'calm', phase: 'winter' },
  { day: 4, mood: 'calm', phase: 'winter' },
  { day: 5, mood: 'optimistic', phase: 'winter' },
  { day: 6, mood: 'optimistic', phase: 'spring' },
  { day: 7, mood: 'energetic', phase: 'spring' },
  { day: 8, mood: 'inspired', phase: 'spring' },
  { day: 9, mood: 'optimistic', phase: 'spring' },
  { day: 10, mood: 'energetic', phase: 'spring' },
  { day: 11, mood: 'inspired', phase: 'spring' },
  { day: 12, mood: 'vibrant', phase: 'spring' },
  { day: 13, mood: 'vibrant', phase: 'summer' },
  { day: 14, mood: 'radiant', phase: 'summer' },
  { day: 15, mood: 'social', phase: 'summer' },
  { day: 16, mood: 'vibrant', phase: 'summer' },
  { day: 17, mood: 'social', phase: 'summer' },
  { day: 18, mood: 'calm', phase: 'autumn' },
  { day: 19, mood: 'reflective', phase: 'autumn' },
  { day: 20, mood: 'reflective', phase: 'autumn' },
  { day: 21, mood: 'calm', phase: 'autumn' },
  { day: 22, mood: 'reflective', phase: 'autumn' },
  { day: 23, mood: 'sensitive', phase: 'autumn' },
  { day: 24, mood: 'tired', phase: 'autumn' },
  { day: 25, mood: 'sensitive', phase: 'autumn' },
  { day: 26, mood: 'tired', phase: 'autumn' },
  { day: 27, mood: 'sensitive', phase: 'autumn' },
  { day: 28, mood: 'tired', phase: 'autumn' },
];

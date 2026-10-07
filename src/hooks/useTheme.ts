import { useEffect } from 'react';
import { useStorage } from '../storage/storageContext';

export interface ThemeColors {
  name: string;
  accent: string;
  accentGlow: string;
  accentHover: string;
  bgGradient: string;
}

export const DAILY_THEMES: ThemeColors[] = [
  {
    name: 'Blue Glass (Day 1 / Mon)',
    accent: '#3b82f6',
    accentGlow: 'rgba(59, 130, 246, 0.25)',
    accentHover: '#2563eb',
    bgGradient: 'radial-gradient(circle at 10% 20%, rgba(30, 58, 138, 0.15) 0%, rgba(15, 23, 42, 0) 50%)'
  },
  {
    name: 'Purple Glass (Day 2 / Tue)',
    accent: '#a855f7',
    accentGlow: 'rgba(168, 85, 247, 0.25)',
    accentHover: '#9333ea',
    bgGradient: 'radial-gradient(circle at 80% 20%, rgba(88, 28, 135, 0.15) 0%, rgba(15, 23, 42, 0) 50%)'
  },
  {
    name: 'Green Glass (Day 3 / Wed)',
    accent: '#10b981',
    accentGlow: 'rgba(16, 185, 129, 0.25)',
    accentHover: '#059669',
    bgGradient: 'radial-gradient(circle at 20% 80%, rgba(6, 78, 59, 0.15) 0%, rgba(15, 23, 42, 0) 50%)'
  },
  {
    name: 'Amber Glass (Day 4 / Thu)',
    accent: '#f59e0b',
    accentGlow: 'rgba(245, 158, 11, 0.25)',
    accentHover: '#d97706',
    bgGradient: 'radial-gradient(circle at 80% 80%, rgba(120, 53, 15, 0.15) 0%, rgba(15, 23, 42, 0) 50%)'
  },
  {
    name: 'Rose Glass (Day 5 / Fri)',
    accent: '#f43f5e',
    accentGlow: 'rgba(244, 63, 94, 0.25)',
    accentHover: '#e11d48',
    bgGradient: 'radial-gradient(circle at 50% 30%, rgba(136, 19, 55, 0.15) 0%, rgba(15, 23, 42, 0) 50%)'
  },
  {
    name: 'Cyan Glass (Day 6 / Sat)',
    accent: '#06b6d4',
    accentGlow: 'rgba(6, 182, 212, 0.25)',
    accentHover: '#0891b2',
    bgGradient: 'radial-gradient(circle at 30% 60%, rgba(22, 78, 99, 0.15) 0%, rgba(15, 23, 42, 0) 50%)'
  },
  {
    name: 'Emerald Glass (Day 7 / Sun)',
    accent: '#14b8a6',
    accentGlow: 'rgba(20, 184, 166, 0.25)',
    accentHover: '#0d9488',
    bgGradient: 'radial-gradient(circle at 70% 50%, rgba(19, 78, 74, 0.15) 0%, rgba(15, 23, 42, 0) 50%)'
  }
];

export const useTheme = () => {
  const { profile, updateProfile } = useStorage();

  useEffect(() => {
    const root = document.documentElement;
    const mode = profile.themeMode || 'daily';

    let selectedTheme: ThemeColors;

    if (mode === 'daily') {
      const dayOfWeek = new Date().getDay(); // 0 is Sunday, 1 is Monday
      const themeIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      selectedTheme = DAILY_THEMES[themeIndex] || DAILY_THEMES[0];
    } else if (mode === 'manual' && profile.manualAccent) {
      selectedTheme = {
        name: 'Custom Accent',
        accent: profile.manualAccent,
        accentGlow: `${profile.manualAccent}40`,
        accentHover: profile.manualAccent,
        bgGradient: `radial-gradient(circle at 50% 20%, ${profile.manualAccent}20 0%, rgba(15, 23, 42, 0) 50%)`
      };
    } else {
      // Default to Blue Glass
      selectedTheme = DAILY_THEMES[0];
    }

    // Apply CSS Variables
    root.style.setProperty('--accent-color', selectedTheme.accent);
    root.style.setProperty('--accent-glow', selectedTheme.accentGlow);
    root.style.setProperty('--accent-hover', selectedTheme.accentHover);
    root.style.setProperty('--theme-bg-gradient', selectedTheme.bgGradient);

    if (mode === 'light') {
      root.classList.add('light-mode');
      root.classList.remove('dark-mode');
    } else {
      root.classList.add('dark-mode');
      root.classList.remove('light-mode');
    }
  }, [profile.themeMode, profile.manualAccent]);

  const setThemeMode = async (mode: 'auto' | 'dark' | 'light' | 'daily' | 'manual', manualAccent?: string) => {
    await updateProfile({
      themeMode: mode,
      ...(manualAccent ? { manualAccent } : {})
    });
  };

  return {
    themeMode: profile.themeMode || 'daily',
    setThemeMode,
    dailyThemes: DAILY_THEMES
  };
};

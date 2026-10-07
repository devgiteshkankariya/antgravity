import React from 'react';
import { useStorage } from '../storage/storageContext';
import { Flame, Star, Clock, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenMissionRunner?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMissionRunner }) => {
  const { profile, activeMilestone } = useStorage();

  return (
    <header className="top-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>🏗️</span> ARCHITECTURE QUEST
        </h1>
        <span className="badge badge-active font-mono" style={{ fontSize: '0.7rem' }}>
          {activeMilestone ? `Phase ${activeMilestone.phase} • Week ${activeMilestone.weekNumber}` : 'Phase 1'}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Streak Counter */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '9999px',
            background: profile.currentStreak > 0 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${profile.currentStreak > 0 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
            color: profile.currentStreak > 0 ? '#f87171' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.875rem'
          }}
          title={`Current Streak: ${profile.currentStreak} Days | Longest: ${profile.longestStreak} Days`}
        >
          <Flame size={16} fill={profile.currentStreak > 0 ? '#ef4444' : 'none'} color={profile.currentStreak > 0 ? '#ef4444' : 'currentColor'} />
          <span>{profile.currentStreak} DAYS</span>
        </div>

        {/* Level & XP Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '9999px',
            background: 'rgba(234, 179, 8, 0.15)',
            border: '1px solid rgba(234, 179, 8, 0.3)',
            color: '#facc15',
            fontWeight: 700,
            fontSize: '0.875rem'
          }}
          title={`Total Experience Points: ${profile.xp} XP`}
        >
          <Star size={16} fill="#eab308" color="#eab308" />
          <span>LVL {profile.level || 1}</span>
          <span style={{ fontSize: '0.75rem', opacity: 0.8, fontWeight: 500 }}>({profile.xp || 0} XP)</span>
        </div>

        {/* Pace */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)'
          }}
          title={`Weekly time commitment: ~${profile.weeklyTargetHours} hrs/week`}
        >
          <Clock size={14} />
          <span>{profile.weeklyTargetHours}h/wk Pace</span>
        </div>

        {/* Start Mission Quick Button */}
        {onOpenMissionRunner && (
          <button className="btn btn-primary" onClick={onOpenMissionRunner} style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}>
            <Sparkles size={14} />
            <span>Launch Mission</span>
          </button>
        )}
      </div>
    </header>
  );
};

import React from 'react';
import { useStorage } from '../storage/storageContext';
import { Trophy, Star, Award, CheckCircle2, Lock } from 'lucide-react';

export const AchievementsPage: React.FC = () => {
  const { achievements, profile } = useStorage();

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const xpCurrentLevel = profile.xp % 500;
  const levelProgress = Math.round((xpCurrentLevel / 500) * 100);

  return (
    <div className="page-wrapper animate-fade-in" style={{ maxWidth: '1000px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-active font-mono">RPG Career Mechanics</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Anti-Farming Protected XP Engine</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Achievements & Milestones</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Earn XP and unlock badges for genuine architectural milestones and daily consistency.
          </p>
        </div>

        <div className="badge badge-completed font-mono" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
          {unlockedCount} of {achievements.length} Unlocked
        </div>
      </div>

      {/* Level & XP Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '2rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          border: '1px solid rgba(234, 179, 8, 0.3)',
          background: 'radial-gradient(ellipse at top left, rgba(234, 179, 8, 0.1), transparent 70%)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #eab308, #f59e0b)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px -2px rgba(234, 179, 8, 0.4)'
            }}
          >
            <Trophy size={32} color="#000000" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Level {profile.level || 1}</h2>
              <span className="badge font-mono" style={{ background: 'rgba(234, 179, 8, 0.2)', color: '#facc15' }}>
                {profile.xp || 0} Total XP
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {500 - xpCurrentLevel} XP needed for Level {(profile.level || 1) + 1}
            </div>
          </div>
        </div>

        <div style={{ minWidth: '240px', flex: 1, maxWidth: '380px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
            <span>Level Progress</span>
            <span className="font-mono">{levelProgress}%</span>
          </div>
          <div className="progress-container" style={{ height: '8px' }}>
            <div
              className="progress-fill"
              style={{
                width: `${levelProgress}%`,
                background: 'linear-gradient(90deg, #eab308, #facc15)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className="glass-panel"
            style={{
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              border: `1px solid ${ach.unlocked ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-card)'}`,
              background: ach.unlocked ? 'rgba(16, 185, 129, 0.04)' : 'rgba(255, 255, 255, 0.02)',
              opacity: ach.unlocked ? 1 : 0.75
            }}
          >
            <div
              style={{
                fontSize: '1.75rem',
                width: 44,
                height: 44,
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              {ach.icon}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: ach.unlocked ? '#34d399' : 'var(--text-primary)' }}>
                  {ach.title}
                </h3>
                <span className="font-mono" style={{ fontSize: '0.72rem', color: '#eab308', fontWeight: 600 }}>
                  +{ach.xpAward} XP
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                {ach.description}
              </p>
              {ach.unlocked && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.5rem', fontSize: '0.7rem', color: '#34d399' }}>
                  <CheckCircle2 size={12} />
                  <span>Unlocked</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

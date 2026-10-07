import React, { useState } from 'react';
import { useStorage } from '../storage/storageContext';
import { useTheme } from '../hooks/useTheme';
import { Sliders, Sun, Moon, Palette, Clock, Check, Save } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { profile, updateProfile } = useStorage();
  const { themeMode, setThemeMode, dailyThemes } = useTheme();

  const [name, setName] = useState(profile.name || 'Senior Backend Engineer');
  const [headline, setHeadline] = useState(profile.headline || '');
  const [currentRole, setCurrentRole] = useState(profile.currentRole || '');
  const [targetRole, setTargetRole] = useState(profile.targetRole || '');
  const [manualColor, setManualColor] = useState(profile.manualAccent || '#3b82f6');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      name,
      headline,
      currentRole,
      targetRole,
      manualAccent: manualColor
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="page-wrapper animate-fade-in" style={{ maxWidth: '880px' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span className="badge badge-active font-mono">Platform Configuration</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Preferences & Schedule</span>
        </div>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Settings & Themes</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Customize your daily glassmorphism theme, schedule pace, and career trajectory goals.
        </p>
      </div>

      {/* Theme Selection Card (Section 28) */}
      <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Palette size={20} color="var(--accent-color)" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Theme System & Glassmorphism</h2>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Dark-first glassmorphism is default. The <strong>Daily Changing</strong> mode automatically adapts the glow accent every day of the week to keep your learning journey fresh and alive.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {[
            { id: 'daily' as const, label: 'Daily Changing', desc: 'Shifts with day-of-week' },
            { id: 'dark' as const, label: 'Dark (Default)', desc: 'Deep slate blue glass' },
            { id: 'light' as const, label: 'Light Mode', desc: 'Clean frosted glass' },
            { id: 'manual' as const, label: 'Custom Accent', desc: 'Choose your color' }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setThemeMode(mode.id, manualColor)}
              className={`btn ${themeMode === mode.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.75rem', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}
            >
              <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{mode.label}</div>
              <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>{mode.desc}</div>
            </button>
          ))}
        </div>

        {/* Daily themes preview list */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Daily Palette Rotation (Mon–Sun)
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {dailyThemes.map((dt, idx) => (
              <div
                key={dt.name}
                onClick={() => setThemeMode('manual', dt.accent)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.35rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-card)',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: dt.accent }} />
                <span>{dt.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {themeMode === 'manual' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Custom Accent Color:</label>
            <input
              type="color"
              value={manualColor}
              onChange={(e) => {
                setManualColor(e.target.value);
                setThemeMode('manual', e.target.value);
              }}
              style={{ width: '40px', height: '36px', padding: 0, cursor: 'pointer' }}
            />
          </div>
        )}
      </div>

      {/* Profile & Career Goals */}
      <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem' }}>
          Career Identity & Target Role
        </h2>

        <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                Current Seniority
              </label>
              <input
                type="text"
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              Target Role (Phase 1 Job-Switch)
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              Professional Headline
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary">
              {savedSuccess ? <Check size={16} /> : <Save size={16} />}
              <span>{savedSuccess ? 'Profile Updated!' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

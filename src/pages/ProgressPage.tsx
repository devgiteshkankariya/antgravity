import React from 'react';
import { useStorage } from '../storage/storageContext';
import {
  BarChart3,
  Calendar,
  Clock,
  Flame,
  Award,
  Layers,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import { calculateProjectedDates } from '../utils/dateUtils';

export const ProgressPage: React.FC = () => {
  const { profile, milestones, dailyHistory, updateProfile } = useStorage();

  const completedMilestones = milestones.filter((m) => m.status === 'completed').length;
  const projected = calculateProjectedDates(
    profile.streakStartDate,
    profile.weeklyTargetHours || 9,
    completedMilestones
  );

  const totalTasksCompleted = profile.completedTaskIds.length;
  const estimatedHoursLogged = Math.round((totalTasksCompleted * 25) / 60);

  return (
    <div className="page-wrapper animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-active font-mono">Performance Telemetry</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Local-First Analytics</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Progress & Pace Analytics</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Tracking consistency rather than punishing missed days. Preserving completed work and stretching deadlines automatically.
          </p>
        </div>
      </div>

      {/* Top 4 Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f87171', marginBottom: '0.5rem' }}>
            <Flame size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Streak Consistency</span>
          </div>
          <div className="font-mono" style={{ fontSize: '2rem', fontWeight: 800 }}>
            {profile.currentStreak} Days
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            All-Time Longest: {profile.longestStreak} Days
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#eab308', marginBottom: '0.5rem' }}>
            <Award size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>XP & Level</span>
          </div>
          <div className="font-mono" style={{ fontSize: '2rem', fontWeight: 800 }}>
            LVL {profile.level}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {profile.xp} Experience Points
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#3b82f6', marginBottom: '0.5rem' }}>
            <Clock size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Estimated Focus Time</span>
          </div>
          <div className="font-mono" style={{ fontSize: '2rem', fontWeight: 800 }}>
            ~{estimatedHoursLogged} Hours
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Target: ~115 Hours for Phase 1
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', marginBottom: '0.5rem' }}>
            <CheckCircle2 size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Tasks Logged</span>
          </div>
          <div className="font-mono" style={{ fontSize: '2rem', fontWeight: 800 }}>
            {totalTasksCompleted}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {completedMilestones} Milestones Cleared
          </div>
        </div>
      </div>

      {/* Flexible Timeline Pace Selector */}
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.25rem' }}>
            Flexible Schedule Simulator & Auto-Adjustment
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Section 5 & 23: The roadmap must NOT break when you fall behind. Toggle your current available weekly commitment:
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { hours: 9, days: 90, label: 'Fast Track (9h/wk)', desc: '~9 hours/week → 90-day job switch' },
            { hours: 5, days: 150, label: 'Working Track (5h/wk)', desc: '~5 hours/week → stretches toward 150 days' },
            { hours: 3, days: 210, label: 'Busy Track (3h/wk)', desc: '~3 hours/week → stretches toward 210 days' }
          ].map((pace) => {
            const isSelected = profile.weeklyTargetHours === pace.hours;
            return (
              <div
                key={pace.hours}
                onClick={() => updateProfile({ weeklyTargetHours: pace.hours })}
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'var(--accent-glow)' : 'rgba(255, 255, 255, 0.02)',
                  border: `1px solid ${isSelected ? 'var(--border-accent)' : 'var(--border-card)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                    {pace.label}
                  </span>
                  <span className="badge font-mono" style={{ fontSize: '0.7rem' }}>{pace.days} Days</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {pace.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.25)', fontSize: '0.85rem' }}>
          📅 Current Projection: Target Job-Switch Readiness Date: <strong>{projected.projectedFinishDate}</strong> ({projected.paceDescription})
        </div>
      </div>

      {/* Daily Activity History Table */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>Recent Daily Activity Log</h3>
        {dailyHistory.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            No activity recorded yet. Launch your first daily mission on the dashboard!
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {dailyHistory.slice(-7).reverse().map((h) => (
              <div
                key={h.date}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-card)',
                  fontSize: '0.85rem'
                }}
              >
                <span className="font-mono">{h.date}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{h.tasksCompleted} tasks completed</span>
                <span className="font-mono" style={{ color: 'var(--accent-color)', fontWeight: 600 }}>+{h.xpEarned} XP</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

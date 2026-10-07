import React, { useState } from 'react';
import { useStorage } from '../storage/storageContext';
import { FirstScreenHero } from '../components/FirstScreenHero';
import { DailyArchitectureCard } from '../components/DailyArchitectureCard';
import { MissionRunnerModal } from '../components/MissionRunnerModal';
import {
  Trophy,
  Briefcase,
  CheckCircle2,
  Calendar,
  Compass,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { calculateProjectedDates } from '../utils/dateUtils';

interface DashboardPageProps {
  onNavigate: (tab: any) => void;
  onNavigateToMilestone: (milestoneId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate, onNavigateToMilestone }) => {
  const { profile, milestones, activeMilestone, adrs, jobApplications, saaTopics } = useStorage();
  const [showMissionModal, setShowMissionModal] = useState(false);

  const completedMilestonesCount = milestones.filter((m) => m.status === 'completed').length;
  const phase1Milestones = milestones.filter((m) => m.phase === 1);
  const phase1Completed = phase1Milestones.filter((m) => m.status === 'completed').length;
  const phase1Progress = Math.round((phase1Completed / phase1Milestones.length) * 100);

  // Projected timeline
  const projected = calculateProjectedDates(
    profile.streakStartDate,
    profile.weeklyTargetHours || 9,
    completedMilestonesCount
  );

  // Checkpoints
  const checkpoints = [
    { day: 28, week: 4, title: 'Day 28 Checkpoint', desc: 'Order Service V1, Docker, CI, C4 diagram, Resume V1 public', completed: milestones[3]?.status === 'completed' },
    { day: 56, week: 8, title: 'Day 56 Checkpoint', desc: 'AWS ECS, Terraform, OIDC CI/CD, First 5 Job Applications', completed: milestones[7]?.status === 'completed' },
    { day: 70, week: 10, title: 'Day 70 Checkpoint', desc: 'Kafka event pipeline, DLQ, OpenTelemetry tracing, 2 SLOs', completed: milestones[9]?.status === 'completed' },
    { day: 90, week: 13, title: 'Day 90 Checkpoint', desc: 'RAG service, Well-Architected V2, SAA certified, Job-Switch Ready', completed: milestones[12]?.status === 'completed' }
  ];

  // Core technology progression metrics
  const coreTechProgress = [
    { name: 'TypeScript', percent: 85, color: '#3b82f6' },
    { name: 'Node.js & Express', percent: 95, color: '#22c55e' },
    { name: 'PostgreSQL & Redis', percent: 70, color: '#06b6d4' },
    { name: 'Docker & CI/CD', percent: 65, color: '#38bdf8' },
    { name: 'AWS Cloud (ECS/RDS)', percent: 45, color: '#f59e0b' },
    { name: 'Terraform IaC', percent: 30, color: '#8b5cf6' },
    { name: 'Kafka & EDA', percent: 25, color: '#ec4899' },
    { name: 'Observability (OTel)', percent: 20, color: '#10b981' },
    { name: 'pgvector AI / RAG', percent: 15, color: '#a855f7' }
  ];

  return (
    <div className="page-wrapper animate-fade-in">
      {/* User Hero Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="badge badge-active">Career Elevation Hub</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Target: Job-Switch Ready</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Welcome back, Senior Engineer</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Transforming 7+ years backend experience into Cloud, DevOps, Distributed Systems & AI Architecture.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={() => onNavigate('jobhunt')}>
            <Briefcase size={16} />
            <span>Job Hunt ({jobApplications.length})</span>
          </button>
          <button className="btn btn-primary" onClick={() => setShowMissionModal(true)}>
            <Zap size={16} />
            <span>Launch Today's Focus</span>
          </button>
        </div>
      </div>

      {/* SECTION 42: FIRST SCREEN HERO COMPONENT */}
      <FirstScreenHero
        onStartMission={() => setShowMissionModal(true)}
        onNavigateToMilestone={onNavigateToMilestone}
      />

      {/* DEDICATED DAILY ARCHITECTURE MISSION CARD */}
      <DailyArchitectureCard onNavigateToArchitecture={() => onNavigate('systemdesign')} />

      {/* Grid: High-level dashboard cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {/* Card 1: 90-Day Phase 1 Status */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Compass size={18} color="var(--accent-color)" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Phase 1: Job-Switch Ready</h3>
            </div>
            <span className="badge badge-active">{phase1Progress}% Complete</span>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            The 90-day goal is not premature Architect hubris. The goal is demonstrable, production-tested capability to land senior Cloud / Platform / Backend roles.
          </p>

          <div className="progress-container" style={{ height: '10px', marginBottom: '0.75rem' }}>
            <div className="progress-fill" style={{ width: `${phase1Progress}%` }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>{phase1Completed} of 13 Weeks Done</span>
            <span>Target Finish: {projected.projectedFinishDate}</span>
          </div>
        </div>

        {/* Card 2: Flexible Timeline Pace Engine */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={18} color="#f59e0b" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Flexible Timeline Engine</h3>
            </div>
            <span className="badge font-mono">{profile.weeklyTargetHours}h/week</span>
          </div>

          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            <strong>Active Track:</strong> {projected.paceDescription}
          </div>

          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Life happens! Falling behind does not break your journey. The engine dynamically stretches target dates without punishment.
          </p>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="btn btn-secondary"
              style={{ flex: 1, padding: '0.4rem', fontSize: '0.75rem' }}
              onClick={() => onNavigate('settings')}
            >
              Adjust Available Hours
            </button>
            <button
              className="btn btn-secondary"
              style={{ flex: 1, padding: '0.4rem', fontSize: '0.75rem' }}
              onClick={() => onNavigate('progress')}
            >
              View Analytics
            </button>
          </div>
        </div>

        {/* Card 3: Architecture Decision Records */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Trophy size={18} color="#a855f7" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Architecture Assets</h3>
            </div>
            <span className="badge badge-completed">{adrs.length} ADRs</span>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Every week produces concrete architecture deliverables: ADRs, C4 diagrams, and trade-off justification documents.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
            {adrs.slice(0, 2).map((adr) => (
              <div
                key={adr.id}
                onClick={() => onNavigate('adrs')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.4rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-card)',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                <span className="truncate" style={{ maxWidth: '200px' }}>{adr.id}: {adr.title}</span>
                <span className="badge font-mono" style={{ fontSize: '0.65rem' }}>{adr.status}</span>
              </div>
            ))}
          </div>

          <button className="btn btn-ghost" onClick={() => onNavigate('adrs')} style={{ width: '100%', fontSize: '0.8rem' }}>
            <span>Explore All Architecture Records</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Core Technology Progression Bars */}
      <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Core Technology Competency Matrix</h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Assessing existing backend depth and bridging into Cloud & Distributed Architecture
            </div>
          </div>
          <button className="btn btn-secondary" onClick={() => onNavigate('paths')} style={{ fontSize: '0.8rem' }}>
            <span>View Full Career Tree</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {coreTechProgress.map((item) => (
            <div key={item.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                <span style={{ fontWeight: 600 }}>{item.name}</span>
                <span className="font-mono" style={{ color: 'var(--text-secondary)' }}>{item.percent}%</span>
              </div>
              <div className="progress-container" style={{ height: '6px' }}>
                <div
                  className="progress-fill"
                  style={{
                    width: `${item.percent}%`,
                    background: `linear-gradient(90deg, ${item.color}, var(--accent-color))`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 90-Day Major Checkpoints Timeline */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>90-Day Mission Checkpoints</h3>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Four non-negotiable career milestones to guarantee job-switch readiness
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {checkpoints.map((cp) => (
            <div
              key={cp.day}
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                background: cp.completed ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${cp.completed ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-card)'}`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="badge font-mono" style={{ fontSize: '0.7rem' }}>
                  DAY {cp.day} • WEEK {cp.week}
                </span>
                {cp.completed ? (
                  <CheckCircle2 size={18} color="#34d399" />
                ) : (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pending</span>
                )}
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.35rem', color: cp.completed ? '#34d399' : 'var(--text-primary)' }}>
                {cp.title}
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {cp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Focus Mission Modal */}
      {showMissionModal && (
        <MissionRunnerModal onClose={() => setShowMissionModal(false)} />
      )}
    </div>
  );
};

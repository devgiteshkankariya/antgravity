import React from 'react';
import { useStorage } from '../storage/storageContext';
import { Flame, CheckSquare, Square, Play, Lock, CheckCircle2, ChevronRight } from 'lucide-react';

interface FirstScreenHeroProps {
  onStartMission: () => void;
  onNavigateToMilestone?: (milestoneId: string) => void;
}

export const FirstScreenHero: React.FC<FirstScreenHeroProps> = ({ onStartMission, onNavigateToMilestone }) => {
  const { profile, activeMilestone, nextMilestone, milestones, completeTask } = useStorage();

  if (!activeMilestone) return null;

  // Calculate task completion for current active milestone
  const totalTasks = activeMilestone.tasks.length;
  const completedTasks = activeMilestone.tasks.filter((t) => t.completed).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Key technologies across 90-day phase 1
  const keyTechnologies = [
    { name: 'TypeScript', milestoneId: 'w1' },
    { name: 'Node.js API', milestoneId: 'w2' },
    { name: 'Postgres & Redis', milestoneId: 'w3' },
    { name: 'Docker & CI/CD', milestoneId: 'w4' },
    { name: 'AWS Networking', milestoneId: 'w5' },
    { name: 'AWS ECS & RDS', milestoneId: 'w6' },
    { name: 'Terraform IaC', milestoneId: 'w7' },
    { name: 'Kafka EDA', milestoneId: 'w9' },
    { name: 'Observability', milestoneId: 'w10' },
    { name: 'AI / RAG Slice', milestoneId: 'w11' },
    { name: 'Well-Architected', milestoneId: 'w12' }
  ];

  return (
    <div
      className="glass-panel glass-panel-glow"
      style={{
        padding: '2rem',
        maxWidth: '840px',
        margin: '0 auto 2.5rem auto',
        border: '1px solid var(--border-accent)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle background glow */}
      <div
        style={{
          position: 'absolute',
          top: '-30%',
          right: '-20%',
          width: '350px',
          height: '350px',
          background: 'var(--accent-glow)',
          filter: 'blur(90px)',
          pointerEvents: 'none'
        }}
      />

      {/* Header Bar matching prompt specification */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-card)',
          paddingBottom: '1.25rem',
          marginBottom: '1.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🏗️</span>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.02em' }}>ARCHITECTURE QUEST</h2>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Job-Switch Ready Roadmap • Phase 1</div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.4rem 0.9rem',
            borderRadius: '9999px',
            background: profile.currentStreak > 0 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${profile.currentStreak > 0 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
            fontWeight: 800,
            fontSize: '0.95rem',
            color: profile.currentStreak > 0 ? '#f87171' : 'var(--text-muted)'
          }}
        >
          <Flame size={18} fill={profile.currentStreak > 0 ? '#ef4444' : 'none'} color={profile.currentStreak > 0 ? '#ef4444' : 'currentColor'} />
          <span>🔥 {profile.currentStreak} DAYS</span>
        </div>
      </div>

      {/* CURRENT MISSION SECTION */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--accent-color)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
          CURRENT MISSION
        </div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.25rem' }}>
          {activeMilestone.primarySkill}
        </h3>

        {/* 4-Item Daily Routine Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {activeMilestone.tasks.map((task) => {
            const isCompleted = task.completed;
            let iconText = '📚';
            let label = 'Learn';
            let duration = '20 min';

            if (task.type === 'practice') {
              iconText = '🧪';
              label = 'Practice';
              duration = '20 min';
            } else if (task.type === 'architecture') {
              iconText = '🏗';
              label = 'Architecture';
              duration = '15 min';
            } else if (task.type === 'explain') {
              iconText = '🧠';
              label = 'Explain';
              duration = '5 min';
            } else if (task.type === 'build' || task.type === 'checkpoint') {
              iconText = '📦';
              label = 'Deliverable';
              duration = 'Key Output';
            }

            return (
              <div
                key={task.id}
                onClick={() => completeTask(activeMilestone.id, task.id, !isCompleted)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1.1rem',
                  borderRadius: 'var(--radius-md)',
                  background: isCompleted ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${isCompleted ? 'rgba(16, 185, 129, 0.25)' : 'var(--border-card)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <span style={{ fontSize: '1.1rem' }}>{iconText}</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem', color: isCompleted ? '#34d399' : 'var(--text-primary)' }}>
                        {label}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {duration}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: isCompleted ? 'var(--text-muted)' : 'var(--text-secondary)', textDecoration: isCompleted ? 'line-through' : 'none' }}>
                      {task.title}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--accent-color)' }}>
                    +{task.xp} XP
                  </span>
                  {isCompleted ? (
                    <CheckSquare size={20} color="#34d399" />
                  ) : (
                    <Square size={20} color="var(--text-muted)" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* START MISSION CTA BUTTON */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            className="btn btn-primary"
            onClick={onStartMission}
            style={{
              padding: '0.75rem 2.25rem',
              fontSize: '1rem',
              fontWeight: 700,
              boxShadow: '0 4px 20px -2px var(--accent-glow)'
            }}
          >
            <Play size={18} fill="currentColor" />
            <span>[ START MISSION ]</span>
          </button>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border-card)', margin: '1.5rem 0' }} />

      {/* CURRENT PATH & NEXT MILESTONE */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            CURRENT PATH
          </div>
          <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
            {activeMilestone.title}
          </div>
          <div className="progress-container" style={{ height: '10px', marginBottom: '0.35rem' }}>
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'right' }}>
            {progressPercent}% Complete ({completedTasks}/{totalTasks} tasks)
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            NEXT MILESTONE
          </div>
          <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.2rem' }}>
            {nextMilestone ? nextMilestone.title : 'Phase 1 Complete!'}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {nextMilestone ? nextMilestone.subtitle : 'All 90-day objectives achieved'}
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border-card)', margin: '1.5rem 0' }} />

      {/* 90-DAY MISSION OVERVIEW WITH LOCKS */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
          90-DAY MISSION PROGRESSION
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.6rem' }}>
          {keyTechnologies.map((tech) => {
            const milestone = milestones.find((m) => m.id === tech.milestoneId);
            const isCompleted = milestone?.status === 'completed';
            const isActive = milestone?.status === 'active';
            const isNext = milestone?.status === 'next';
            const isLocked = !isCompleted && !isActive && !isNext;

            return (
              <div
                key={tech.name}
                onClick={() => onNavigateToMilestone && milestone && onNavigateToMilestone(milestone.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  background: isActive ? 'var(--accent-glow)' : 'rgba(255, 255, 255, 0.02)',
                  border: `1px solid ${isActive ? 'var(--border-accent)' : isCompleted ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-card)'}`,
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--text-primary)' : isCompleted ? '#34d399' : 'var(--text-secondary)' }}>
                  {tech.name}
                </span>

                {isCompleted ? (
                  <CheckCircle2 size={14} color="#34d399" />
                ) : isActive ? (
                  <span className="badge badge-active" style={{ fontSize: '0.65rem', padding: '0.05rem 0.35rem' }}>ACTIVE</span>
                ) : isNext ? (
                  <span className="badge badge-next" style={{ fontSize: '0.65rem', padding: '0.05rem 0.35rem' }}>NEXT</span>
                ) : (
                  <Lock size={12} color="var(--text-muted)" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

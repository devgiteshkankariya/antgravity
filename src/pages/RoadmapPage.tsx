import React, { useState } from 'react';
import { useStorage } from '../storage/storageContext';
import { Milestone, MilestoneStatus } from '../types';
import {
  Map,
  CheckCircle2,
  Lock,
  ChevronDown,
  ChevronUp,
  Square,
  CheckSquare,
  Package,
  Layers,
  Sparkles,
  ExternalLink,
  Clock
} from 'lucide-react';
import { calculateProjectedDates } from '../utils/dateUtils';

interface RoadmapPageProps {
  onNavigateToProject?: (weekNumber: number) => void;
}

export const RoadmapPage: React.FC<RoadmapPageProps> = ({ onNavigateToProject }) => {
  const { milestones, completeTask, profile } = useStorage();
  const [phaseFilter, setPhaseFilter] = useState<number | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedMilestoneId, setExpandedMilestoneId] = useState<string | null>(milestones[0]?.id || null);

  const completedCount = milestones.filter((m) => m.status === 'completed').length;
  const projected = calculateProjectedDates(
    profile.streakStartDate,
    profile.weeklyTargetHours || 9,
    completedCount
  );

  const filteredMilestones = milestones.filter((m) => {
    if (phaseFilter !== 'all' && m.phase !== phaseFilter) return false;
    if (statusFilter !== 'all' && m.status !== statusFilter) return false;
    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedMilestoneId(expandedMilestoneId === id ? null : id);
  };

  return (
    <div className="page-wrapper animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-active font-mono">3-Phase Career Blueprint</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>From Senior Backend to Cloud & AI Architect</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Architecture Quest Roadmap</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Phase 1 is rigorously optimized for job-switch readiness. Phases 2 & 3 build deep Kubernetes and AI architect capability.
          </p>
        </div>

        {/* Phase quick filters */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setPhaseFilter('all')}
            className={`btn ${phaseFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
          >
            All Phases
          </button>
          <button
            onClick={() => setPhaseFilter(1)}
            className={`btn ${phaseFilter === 1 ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
          >
            Phase 1 (Days 1–90)
          </button>
          <button
            onClick={() => setPhaseFilter(2)}
            className={`btn ${phaseFilter === 2 ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
          >
            Phase 2 (Days 91–150)
          </button>
          <button
            onClick={() => setPhaseFilter(3)}
            className={`btn ${phaseFilter === 3 ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
          >
            Phase 3 (Days 151–210+)
          </button>
        </div>
      </div>

      {/* Flexible Stretch Timeline Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          background: 'rgba(59, 130, 246, 0.06)',
          borderColor: 'rgba(59, 130, 246, 0.2)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Clock size={20} color="var(--accent-color)" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>
              Flexible Timeline: {projected.paceDescription}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Projected Finish: <strong>{projected.projectedFinishDate}</strong> • Estimated {projected.projectedDurationDays} days total
            </div>
          </div>
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {completedCount} of {milestones.length} Milestones Cleared
        </div>
      </div>

      {/* Milestones List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredMilestones.map((milestone) => {
          const isExpanded = expandedMilestoneId === milestone.id;
          const isCompleted = milestone.status === 'completed';
          const isActive = milestone.status === 'active';
          const isNext = milestone.status === 'next';
          const isLocked = milestone.status === 'locked' || milestone.status === 'later';

          const completedTasks = milestone.tasks.filter((t) => t.completed).length;
          const totalTasks = milestone.tasks.length;
          const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

          return (
            <div
              key={milestone.id}
              className="glass-panel"
              style={{
                border: `1px solid ${isActive ? 'var(--border-accent)' : isCompleted ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-card)'}`,
                background: isActive ? 'rgba(59, 130, 246, 0.04)' : 'var(--bg-card)',
                overflow: 'hidden'
              }}
            >
              {/* Milestone Accordion Header */}
              <div
                onClick={() => toggleExpand(milestone.id)}
                style={{
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: '10px',
                      background: isCompleted ? 'rgba(16, 185, 129, 0.15)' : isActive ? 'var(--accent-glow)' : 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      color: isCompleted ? '#34d399' : isActive ? 'var(--accent-color)' : 'var(--text-muted)',
                      flexShrink: 0
                    }}
                  >
                    {isCompleted ? <CheckCircle2 size={22} /> : isLocked ? <Lock size={18} /> : `W${milestone.weekNumber}`}
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <span className="badge font-mono" style={{ fontSize: '0.68rem' }}>
                        Phase {milestone.phase} • {milestone.dayRange}
                      </span>
                      {isActive && <span className="badge badge-active" style={{ fontSize: '0.68rem' }}>ACTIVE FOCUS</span>}
                      {isNext && <span className="badge badge-next" style={{ fontSize: '0.68rem' }}>NEXT UP</span>}
                      {isCompleted && <span className="badge badge-completed" style={{ fontSize: '0.68rem' }}>COMPLETED</span>}
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.01em' }}>
                      {milestone.title}
                    </h3>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }} className="truncate">
                      {milestone.subtitle}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginLeft: '1rem' }}>
                  <div style={{ textAlign: 'right', minWidth: '90px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{progressPercent}%</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {completedTasks}/{totalTasks} tasks
                    </div>
                  </div>

                  <button className="btn btn-ghost" style={{ padding: '0.35rem' }}>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </div>

              {/* Progress bar line */}
              <div style={{ height: '3px', width: '100%', background: 'rgba(255, 255, 255, 0.05)' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${progressPercent}%`,
                    background: isCompleted ? '#10b981' : 'var(--accent-color)',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-card)', background: 'rgba(0, 0, 0, 0.15)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    {/* Topics covered */}
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        Curriculum Topics
                      </div>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {milestone.topics.map((topic, i) => (
                          <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                            <span style={{ color: 'var(--accent-color)' }}>•</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Build & Deliverable */}
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        Production Build & Output
                      </div>
                      <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-card)', marginBottom: '0.75rem' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Package size={16} color="var(--accent-color)" />
                          <span>{milestone.buildOutput}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          {milestone.buildDescription}
                        </div>
                      </div>

                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        <strong>System Design Case:</strong> {milestone.systemDesignTopic}
                      </div>
                    </div>
                  </div>

                  {/* Tasks Checklist */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                      Milestone Action Tasks (+XP)
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {milestone.tasks.map((task) => (
                        <div
                          key={task.id}
                          onClick={() => completeTask(milestone.id, task.id, !task.completed)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.65rem 0.9rem',
                            borderRadius: 'var(--radius-sm)',
                            background: task.completed ? 'rgba(16, 185, 129, 0.06)' : 'rgba(255, 255, 255, 0.02)',
                            border: `1px solid ${task.completed ? 'rgba(16, 185, 129, 0.25)' : 'var(--border-card)'}`,
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            {task.completed ? <CheckSquare size={18} color="#34d399" /> : <Square size={18} color="var(--text-muted)" />}
                            <span style={{ color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: task.completed ? 'line-through' : 'none' }}>
                              {task.title}
                            </span>
                          </div>
                          <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-color)' }}>
                            +{task.xp} XP
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

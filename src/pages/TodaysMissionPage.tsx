import React, { useState } from 'react';
import { useStorage } from '../storage/storageContext';
import { MissionRunnerModal } from '../components/MissionRunnerModal';
import { DailyArchitectureCard } from '../components/DailyArchitectureCard';
import { INITIAL_MILESTONES } from '../curriculum/phases';
import {
  Target,
  Sparkles,
  BookOpen,
  Code2,
  Cpu,
  HelpCircle,
  ExternalLink,
  CheckCircle2,
  Square,
  AlertTriangle,
  Play
} from 'lucide-react';

export const TodaysMissionPage: React.FC = () => {
  const { activeMilestone, resources, completeTask } = useStorage();
  const [showRunner, setShowRunner] = useState(false);

  const milestone = activeMilestone || INITIAL_MILESTONES[0];

  // Find resources for this milestone
  const milestoneResources = resources.filter((r) => r.milestoneId === milestone.id);

  const completedCount = milestone.tasks.filter((t) => t.completed).length;
  const isAllComplete = completedCount === milestone.tasks.length;

  return (
    <div className="page-wrapper animate-fade-in" style={{ maxWidth: '1000px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-active font-mono">
              WEEK {milestone.weekNumber} • {milestone.dayRange}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Daily Focus Protocol</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>What Should I Do TODAY?</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Execute this precise daily routine. No guesswork. Practice is the minimum standard.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowRunner(true)} style={{ padding: '0.65rem 1.4rem' }}>
          <Play size={18} fill="currentColor" />
          <span>Open Focus Timer</span>
        </button>
      </div>

      {/* DEDICATED DAILY ARCHITECTURE MISSION CARD */}
      <DailyArchitectureCard />

      {/* Routine Overview Card */}
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', border: '1px solid var(--border-accent)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              PRIMARY TOPIC FOR TODAY
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{milestone.primarySkill}</h2>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{milestone.title}</div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399' }}>
              {completedCount} / {milestone.tasks.length} Done
            </div>
            <span className="badge font-mono" style={{ fontSize: '0.7rem' }}>
              +{milestone.xpValue} XP on Completion
            </span>
          </div>
        </div>

        {/* 4 Steps Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          {milestone.tasks.map((task) => {
            const isCompleted = task.completed;
            let icon = <BookOpen size={20} color="var(--accent-color)" />;
            let stepLabel = 'Step 1: 📚 LEARN';
            let timeLabel = '20 minutes';

            if (task.type === 'practice') {
              icon = <Code2 size={20} color="#10b981" />;
              stepLabel = 'Step 2: 🧪 PRACTICE (MINIMUM REQUIREMENT)';
              timeLabel = '20 minutes';
            } else if (task.type === 'architecture') {
              icon = <Cpu size={20} color="#a855f7" />;
              stepLabel = 'Step 3: 🏗 ARCHITECTURE CASE';
              timeLabel = '15 minutes';
            } else if (task.type === 'explain') {
              icon = <HelpCircle size={20} color="#f59e0b" />;
              stepLabel = 'Step 4: 🧠 EXPLAIN & SYNTHESIZE';
              timeLabel = '5 minutes';
            } else if (task.type === 'build' || task.type === 'checkpoint') {
              icon = <Sparkles size={20} color="#ec4899" />;
              stepLabel = 'Weekly Output: 📦 BUILD ARTIFACT';
              timeLabel = 'Milestone Deliverable';
            }

            return (
              <div
                key={task.id}
                onClick={() => completeTask(milestone.id, task.id, !isCompleted)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.1rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  background: isCompleted ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${isCompleted ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-card)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)' }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: isCompleted ? '#34d399' : 'var(--text-muted)' }}>
                        {stepLabel}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>• {timeLabel}</span>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: isCompleted ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: isCompleted ? 'line-through' : 'none' }}>
                      {task.title}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <span className="font-mono" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-color)' }}>
                    +{task.xp} XP
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 size={22} color="#34d399" />
                  ) : (
                    <Square size={22} color="var(--text-muted)" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Practice Minimum Callout Banner */}
        <div
          style={{
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            fontSize: '0.85rem',
            color: '#34d399'
          }}
        >
          💡 <strong>Consistency Principle:</strong> If you only have 20 minutes today, complete the 🧪 Practice task! 
          Anti-farming protection ensures fair XP, and maintaining daily consistency unlocks your next career tier.
        </div>
      </div>

      {/* Suggested Curated Resources for Today's Topic */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Curated Learning Resources for {milestone.primarySkill}</h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Official docs & free labs prioritized (No generic superficial material)
            </div>
          </div>
          <span className="badge badge-next">{milestoneResources.length} Best Free Resources</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {milestoneResources.map((res) => {
            const typeBadgeClass =
              res.type === 'quick' ? 'badge-active' : res.type === 'official' ? 'badge-completed' : 'badge-next';
            return (
              <a
                key={res.id}
                href={res.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-card)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'border-color 0.15s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span className={`badge ${typeBadgeClass}`} style={{ fontSize: '0.68rem', textTransform: 'uppercase' }}>
                      {res.type === 'quick' ? '🟢 Quick' : res.type === 'deep' ? '🟡 Deep' : res.type === 'official' ? '🔴 Official' : '🧪 Lab'}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>~{res.estimatedMinutes} min</span>
                  </div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    {res.title}
                  </h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Provider: {res.provider}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: 600 }}>
                  <span>Open Resource</span>
                  <ExternalLink size={12} />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {showRunner && <MissionRunnerModal onClose={() => setShowRunner(false)} />}
    </div>
  );
};

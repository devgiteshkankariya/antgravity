import React, { useState } from 'react';
import { useStorage } from '../storage/storageContext';
import { DailyArchitectureModal } from './DailyArchitectureModal';
import {
  BookOpen,
  ExternalLink,
  Flame,
  Zap,
  CheckCircle2,
  Circle,
  Layers,
  ArrowRight,
  Code,
  MessageSquare,
  FolderGit2,
  HelpCircle,
  Compass,
  Award
} from 'lucide-react';

interface DailyArchitectureCardProps {
  onNavigateToArchitecture?: () => void;
}

export const DailyArchitectureCard: React.FC<DailyArchitectureCardProps> = ({
  onNavigateToArchitecture
}) => {
  const {
    architectureLessons,
    activeArchitectureLesson,
    updateArchitectureStep,
    profile
  } = useStorage();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const lesson = activeArchitectureLesson || architectureLessons[0];

  if (!lesson) return null;

  // Compute aggregated stats
  const completedLessonsCount = architectureLessons.filter((l) => l.completed).length;
  const questionsAnsweredCount = architectureLessons.filter(
    (l) => l.designCompleted || (l.designAnswer && l.designAnswer.trim().length > 0)
  ).length;
  const projectsAppliedCount = architectureLessons.filter((l) => l.appliedToProject).length;

  const isMissionComplete =
    lesson.learnCompleted &&
    lesson.practiceCompleted &&
    lesson.designCompleted &&
    lesson.explainCompleted;

  return (
    <>
      <div
        className="glass-panel animate-fade-in"
        style={{
          padding: '1.75rem',
          marginBottom: '2.5rem',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.04), rgba(168, 85, 247, 0.03), rgba(15, 23, 42, 0.6))',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-sm)',
                background: 'linear-gradient(135deg, var(--accent-color), #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)'
              }}
            >
              <Layers size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-color)'
                  }}
                >
                  DAILY ARCHITECTURE
                </span>
                <span className="badge font-mono" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
                  Week {lesson.weekNumber} Parallel Track
                </span>
                {isMissionComplete && (
                  <span className="badge badge-completed font-mono" style={{ fontSize: '0.68rem' }}>
                    Mission Done (+200 XP)
                  </span>
                )}
              </div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '0.15rem' }}>
                {lesson.topic}
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button
              className="btn btn-secondary"
              onClick={() => setIsModalOpen(true)}
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
            >
              <span>Focus Mission Workspace</span>
              <ArrowRight size={14} />
            </button>
            {onNavigateToArchitecture && (
              <button
                className="btn btn-ghost"
                onClick={onNavigateToArchitecture}
                style={{ fontSize: '0.8rem', padding: '0.45rem 0.6rem' }}
                title="View All Architecture Lessons"
              >
                <Compass size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Resource Banner & Open Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255, 255, 255, 0.025)',
            border: '1px solid var(--border-card)',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ minWidth: '240px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Resource & Chapter
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--text-primary)' }}>
              {lesson.resourceTitle}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
              Provider: <strong style={{ color: 'var(--text-primary)' }}>{lesson.provider}</strong> • Estimated Time: <strong style={{ color: 'var(--accent-color)' }}>{lesson.estimatedMinutes} mins</strong> (15–20m total daily routine)
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a
              href={lesson.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', textDecoration: 'none', padding: '0.55rem 1rem' }}
            >
              <ExternalLink size={15} />
              <span>Open Resource</span>
            </a>
          </div>
        </div>

        {/* 5 Daily Architecture Action Items (Checklist) */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.75rem'
            }}
          >
            Daily Mission Checklist (15–20 Minutes Target)
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.75rem'
            }}
          >
            {/* Step 1: Learn */}
            <div
              onClick={() => updateArchitectureStep(lesson.id, 'learn', !lesson.learnCompleted)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 0.9rem',
                borderRadius: 'var(--radius-sm)',
                background: lesson.learnCompleted ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${lesson.learnCompleted ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-card)'}`,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {lesson.learnCompleted ? <CheckCircle2 size={16} color="#10b981" /> : <Circle size={16} color="var(--text-muted)" />}
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>Learn (5–8m)</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Read chapter</div>
                </div>
              </div>
              <span className="badge font-mono" style={{ fontSize: '0.65rem' }}>+25 XP</span>
            </div>

            {/* Step 2: Practice */}
            <div
              onClick={() => updateArchitectureStep(lesson.id, 'practice', !lesson.practiceCompleted)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 0.9rem',
                borderRadius: 'var(--radius-sm)',
                background: lesson.practiceCompleted ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${lesson.practiceCompleted ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-card)'}`,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {lesson.practiceCompleted ? <CheckCircle2 size={16} color="#10b981" /> : <Circle size={16} color="var(--text-muted)" />}
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>Practice (~5m)</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Practical drill</div>
                </div>
              </div>
              <span className="badge font-mono" style={{ fontSize: '0.65rem' }}>+50 XP</span>
            </div>

            {/* Step 3: Design */}
            <div
              onClick={() => {
                if (!lesson.designCompleted && !lesson.designAnswer) {
                  setIsModalOpen(true);
                } else {
                  updateArchitectureStep(lesson.id, 'design', !lesson.designCompleted);
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 0.9rem',
                borderRadius: 'var(--radius-sm)',
                background: lesson.designCompleted ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${lesson.designCompleted ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-card)'}`,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {lesson.designCompleted ? <CheckCircle2 size={16} color="#10b981" /> : <Circle size={16} color="var(--text-muted)" />}
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>Design (~5m)</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>10× traffic question</div>
                </div>
              </div>
              <span className="badge font-mono" style={{ fontSize: '0.65rem' }}>+50 XP</span>
            </div>

            {/* Step 4: Explain */}
            <div
              onClick={() => {
                if (!lesson.explainCompleted && !lesson.explainAnswer) {
                  setIsModalOpen(true);
                } else {
                  updateArchitectureStep(lesson.id, 'explain', !lesson.explainCompleted);
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 0.9rem',
                borderRadius: 'var(--radius-sm)',
                background: lesson.explainCompleted ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${lesson.explainCompleted ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-card)'}`,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {lesson.explainCompleted ? <CheckCircle2 size={16} color="#10b981" /> : <Circle size={16} color="var(--text-muted)" />}
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>Explain (~2m)</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>In your own words</div>
                </div>
              </div>
              <span className="badge font-mono" style={{ fontSize: '0.65rem' }}>+25 XP</span>
            </div>

            {/* Step 5: Apply to Project */}
            <div
              onClick={() => updateArchitectureStep(lesson.id, 'apply', !lesson.appliedToProject)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 0.9rem',
                borderRadius: 'var(--radius-sm)',
                background: lesson.appliedToProject ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${lesson.appliedToProject ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-card)'}`,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {lesson.appliedToProject ? <CheckCircle2 size={16} color="#10b981" /> : <Circle size={16} color="var(--text-muted)" />}
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>Apply to Project</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Order Service map</div>
                </div>
              </div>
              <span className="badge" style={{ fontSize: '0.65rem' }}>Project</span>
            </div>
          </div>
        </div>

        {/* Section 5 Metrics Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '1rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-card)'
          }}
        >
          {/* Metric 1: Architecture Streak */}
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Architecture Streak
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem' }}>
              <Flame size={16} color="#f97316" />
              <span className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f97316' }}>
                {profile.architectureStreak || 0} <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>Days</span>
              </span>
            </div>
          </div>

          {/* Metric 2: Architecture XP */}
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Architecture XP
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem' }}>
              <Zap size={16} color="var(--accent-color)" />
              <span className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-color)' }}>
                {profile.architectureXp || 0} <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>XP</span>
              </span>
            </div>
          </div>

          {/* Metric 3: Lessons Completed */}
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Lessons Completed
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem' }}>
              <CheckCircle2 size={16} color="#10b981" />
              <span className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                {completedLessonsCount} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ {architectureLessons.length}</span>
              </span>
            </div>
          </div>

          {/* Metric 4: Architecture Questions Answered */}
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Questions Answered
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem' }}>
              <HelpCircle size={16} color="#a855f7" />
              <span className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#a855f7' }}>
                {questionsAnsweredCount} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ {architectureLessons.length}</span>
              </span>
            </div>
          </div>

          {/* Metric 5: Projects Applied */}
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Projects Applied
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem' }}>
              <FolderGit2 size={16} color="#3b82f6" />
              <span className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#3b82f6' }}>
                {projectsAppliedCount} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ {architectureLessons.length}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Focus Mission Modal */}
      {isModalOpen && (
        <DailyArchitectureModal
          lessonId={lesson.id}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

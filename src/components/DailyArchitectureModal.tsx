import React, { useState, useEffect } from 'react';
import { useStorage } from '../storage/storageContext';
import { DailyArchitectureProgress } from '../types';
import {
  X,
  ExternalLink,
  BookOpen,
  Code,
  Layers,
  MessageSquare,
  CheckCircle2,
  Circle,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Zap,
  Save,
  Check,
  FolderGit2,
  Calendar,
  Flame,
  Award
} from 'lucide-react';

interface DailyArchitectureModalProps {
  lessonId?: string;
  onClose: () => void;
}

export const DailyArchitectureModal: React.FC<DailyArchitectureModalProps> = ({
  lessonId,
  onClose
}) => {
  const {
    architectureLessons,
    activeArchitectureLesson,
    updateArchitectureStep,
    saveArchitectureDetails,
    profile
  } = useStorage();

  const initialLesson =
    (lessonId ? architectureLessons.find((l) => l.id === lessonId) : activeArchitectureLesson) ||
    architectureLessons[0];

  const [currentLessonId, setCurrentLessonId] = useState<string>(initialLesson?.id || 'arch-w1');
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'design' | 'explain' | 'apply'>('learn');

  const lesson = architectureLessons.find((l) => l.id === currentLessonId) || initialLesson;

  // Local state for answers & notes
  const [designAnswer, setDesignAnswer] = useState<string>(lesson?.designAnswer || '');
  const [explainAnswer, setExplainAnswer] = useState<string>(lesson?.explainAnswer || '');
  const [notes, setNotes] = useState<string>(lesson?.notes || '');
  const [saveStatus, setSaveStatus] = useState<string>('');

  // Synchronize when switching lessons
  useEffect(() => {
    if (lesson) {
      setDesignAnswer(lesson.designAnswer || '');
      setExplainAnswer(lesson.explainAnswer || '');
      setNotes(lesson.notes || '');
    }
  }, [lesson?.id]);

  // Focus Timer
  const [timeLeft, setTimeLeft] = useState<number>(8 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  if (!lesson) return null;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTabChange = (tab: 'learn' | 'practice' | 'design' | 'explain' | 'apply', defaultMinutes: number) => {
    setActiveTab(tab);
    setTimeLeft(defaultMinutes * 60);
    setIsRunning(false);
  };

  const handleSaveDesignAnswer = async () => {
    await saveArchitectureDetails(lesson.id, { designAnswer });
    if (!lesson.designCompleted && designAnswer.trim().length > 10) {
      await updateArchitectureStep(lesson.id, 'design', true, designAnswer);
    }
    setSaveStatus('Design answer saved locally!');
    setTimeout(() => setSaveStatus(''), 2500);
  };

  const handleSaveExplainAnswer = async () => {
    await saveArchitectureDetails(lesson.id, { explainAnswer });
    if (!lesson.explainCompleted && explainAnswer.trim().length > 10) {
      await updateArchitectureStep(lesson.id, 'explain', true, explainAnswer);
    }
    setSaveStatus('Explanation saved locally!');
    setTimeout(() => setSaveStatus(''), 2500);
  };

  const handleSaveNotes = async () => {
    await saveArchitectureDetails(lesson.id, { notes });
    setSaveStatus('Notes saved locally!');
    setTimeout(() => setSaveStatus(''), 2500);
  };

  const isMissionFullyComplete =
    lesson.learnCompleted &&
    lesson.practiceCompleted &&
    lesson.designCompleted &&
    lesson.explainCompleted;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '840px', width: '95vw', maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
            borderBottom: '1px solid var(--border-card)',
            paddingBottom: '1rem',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-active font-mono" style={{ fontSize: '0.7rem' }}>
                DAILY ARCHITECTURE MISSION
              </span>
              <span className="badge" style={{ fontSize: '0.7rem', color: 'var(--accent-color)' }}>
                {lesson.provider}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Target: 15–20 Mins / Day
              </span>
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{lesson.topic}</h2>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Week {lesson.weekNumber} Track • Parallel with Career Roadmap
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Lesson switcher */}
            <select
              value={lesson.id}
              onChange={(e) => setCurrentLessonId(e.target.value)}
              className="input-field"
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.6rem', width: '160px' }}
            >
              {architectureLessons.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.completed ? '✓ ' : ''}Week {l.weekNumber}: {l.topic.substring(0, 20)}...
                </option>
              ))}
            </select>
            <button className="btn btn-ghost" onClick={onClose} style={{ padding: '0.4rem' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Mission Completion Banner */}
        {isMissionFullyComplete && (
          <div
            style={{
              padding: '0.85rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.1))',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Award size={22} color="#10b981" />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#10b981' }}>
                  Daily Architecture Mission Complete!
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  All 4 core activities mastered. +50 bonus XP unlocked.
                </div>
              </div>
            </div>
            <span className="badge badge-completed font-mono" style={{ fontSize: '0.75rem' }}>
              +200 Total XP Earned
            </span>
          </div>
        )}

        {/* Timer Bar + Quick Metrics */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-card)',
            marginBottom: '1.25rem',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Flame size={18} color="#f97316" />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Streak:</span>
              <strong className="font-mono" style={{ color: '#f97316', fontSize: '0.9rem' }}>
                {profile.architectureStreak || 0} Days
              </strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={18} color="var(--accent-color)" />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Arch XP:</span>
              <strong className="font-mono" style={{ color: 'var(--accent-color)', fontSize: '0.9rem' }}>
                {profile.architectureXp || 0} XP
              </strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              className="font-mono"
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: isRunning ? 'var(--accent-color)' : 'var(--text-primary)',
                minWidth: '58px'
              }}
            >
              {formatTimer(timeLeft)}
            </div>
            <button
              className={`btn ${isRunning ? 'btn-secondary' : 'btn-primary'}`}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? <Pause size={13} /> : <Play size={13} />}
              <span>{isRunning ? 'Pause' : 'Focus Timer'}</span>
            </button>
            <button
              className="btn btn-ghost"
              style={{ padding: '0.35rem', fontSize: '0.75rem' }}
              onClick={() => {
                setIsRunning(false);
                setTimeLeft(8 * 60);
              }}
              title="Reset Timer"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        {/* Tab Navigation (5 Steps: LEARN, PRACTICE, DESIGN, EXPLAIN, APPLY) */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '1.25rem',
            borderBottom: '1px solid var(--border-card)',
            paddingBottom: '0.5rem',
            overflowX: 'auto'
          }}
        >
          <button
            onClick={() => handleTabChange('learn', 8)}
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'learn' ? 'var(--accent-glow)' : 'transparent',
              border: `1px solid ${activeTab === 'learn' ? 'var(--border-accent)' : 'transparent'}`,
              color: activeTab === 'learn' ? 'var(--text-primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              whiteSpace: 'nowrap'
            }}
          >
            {lesson.learnCompleted ? <CheckCircle2 size={15} color="#10b981" /> : <BookOpen size={15} />}
            <span>1. Learn (5–8m)</span>
            <span className="badge" style={{ fontSize: '0.65rem' }}>+25 XP</span>
          </button>

          <button
            onClick={() => handleTabChange('practice', 5)}
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'practice' ? 'var(--accent-glow)' : 'transparent',
              border: `1px solid ${activeTab === 'practice' ? 'var(--border-accent)' : 'transparent'}`,
              color: activeTab === 'practice' ? 'var(--text-primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              whiteSpace: 'nowrap'
            }}
          >
            {lesson.practiceCompleted ? <CheckCircle2 size={15} color="#10b981" /> : <Code size={15} />}
            <span>2. Practice (~5m)</span>
            <span className="badge" style={{ fontSize: '0.65rem' }}>+50 XP</span>
          </button>

          <button
            onClick={() => handleTabChange('design', 5)}
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'design' ? 'var(--accent-glow)' : 'transparent',
              border: `1px solid ${activeTab === 'design' ? 'var(--border-accent)' : 'transparent'}`,
              color: activeTab === 'design' ? 'var(--text-primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              whiteSpace: 'nowrap'
            }}
          >
            {lesson.designCompleted ? <CheckCircle2 size={15} color="#10b981" /> : <Layers size={15} />}
            <span>3. Design (~5m)</span>
            <span className="badge" style={{ fontSize: '0.65rem' }}>+50 XP</span>
          </button>

          <button
            onClick={() => handleTabChange('explain', 2)}
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'explain' ? 'var(--accent-glow)' : 'transparent',
              border: `1px solid ${activeTab === 'explain' ? 'var(--border-accent)' : 'transparent'}`,
              color: activeTab === 'explain' ? 'var(--text-primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              whiteSpace: 'nowrap'
            }}
          >
            {lesson.explainCompleted ? <CheckCircle2 size={15} color="#10b981" /> : <MessageSquare size={15} />}
            <span>4. Explain (~2m)</span>
            <span className="badge" style={{ fontSize: '0.65rem' }}>+25 XP</span>
          </button>

          <button
            onClick={() => handleTabChange('apply', 3)}
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'apply' ? 'var(--accent-glow)' : 'transparent',
              border: `1px solid ${activeTab === 'apply' ? 'var(--border-accent)' : 'transparent'}`,
              color: activeTab === 'apply' ? 'var(--text-primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              whiteSpace: 'nowrap'
            }}
          >
            {lesson.appliedToProject ? <CheckCircle2 size={15} color="#10b981" /> : <FolderGit2 size={15} />}
            <span>5. Apply to Project</span>
          </button>
        </div>

        {/* Tab 1: LEARN */}
        {activeTab === 'learn' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div
              className="glass-panel"
              style={{
                padding: '1.25rem',
                border: '1px solid var(--border-card)',
                background: 'rgba(255, 255, 255, 0.02)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Resource Material
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: '0.2rem' }}>
                    {lesson.resourceTitle}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    Provider: <strong>{lesson.provider}</strong> • Estimated Time: <strong>{lesson.estimatedMinutes} mins</strong>
                  </div>
                </div>

                <a
                  href={lesson.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}
                >
                  <ExternalLink size={15} />
                  <span>Open Resource</span>
                </a>
              </div>

              <div
                style={{
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(6, 182, 212, 0.08)',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.5'
                }}
              >
                <strong>Study Objective:</strong> Read through this specific chapter on {lesson.provider}. Pay attention to trade-offs, architecture diagrams, and bottlenecks. Opening the link does not automatically mark completion — study the material and manually check off below.
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                background: lesson.learnCompleted ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${lesson.learnCompleted ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-card)'}`
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                  {lesson.learnCompleted ? '✓ Learn Step Completed' : 'Mark Learn Step Complete'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Earns +25 Architecture XP upon completion
                </div>
              </div>

              <button
                className={`btn ${lesson.learnCompleted ? 'btn-secondary' : 'btn-primary'}`}
                onClick={() => updateArchitectureStep(lesson.id, 'learn', !lesson.learnCompleted)}
              >
                {lesson.learnCompleted ? <CheckCircle2 size={16} color="#10b981" /> : <Circle size={16} />}
                <span>{lesson.learnCompleted ? 'Completed' : 'Mark as Complete (+25 XP)'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: PRACTICE */}
        {activeTab === 'practice' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="glass-panel" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                5-Minute Hands-On Exercise
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                Practical Code & Architecture Drill
              </h3>
              <div
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-card)',
                  fontSize: '0.85rem',
                  lineHeight: '1.6',
                  color: 'var(--text-primary)',
                  marginBottom: '1rem'
                }}
              >
                <p style={{ marginBottom: '0.65rem' }}>{lesson.practicePrompt}</p>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-color)' }}>
                  <strong>Project Connection:</strong> {lesson.practiceProjectConnection}
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                💡 <em>Tip: Keep your evolving Order Service codebase or architectural diagram open side-by-side to apply the pattern directly.</em>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                background: lesson.practiceCompleted ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${lesson.practiceCompleted ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-card)'}`
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                  {lesson.practiceCompleted ? '✓ Practice Drill Completed' : 'Mark Practice Drill Complete'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Earns +50 Architecture XP upon completion
                </div>
              </div>

              <button
                className={`btn ${lesson.practiceCompleted ? 'btn-secondary' : 'btn-primary'}`}
                onClick={() => updateArchitectureStep(lesson.id, 'practice', !lesson.practiceCompleted)}
              >
                {lesson.practiceCompleted ? <CheckCircle2 size={16} color="#10b981" /> : <Circle size={16} />}
                <span>{lesson.practiceCompleted ? 'Completed' : 'Mark Complete (+50 XP)'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: DESIGN */}
        {activeTab === 'design' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="glass-panel" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-color)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.4rem' }}>
                System Design Challenge (~5 mins)
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                {lesson.designQuestion}
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Write your architectural design answer below. Address traffic scaling, database bottlenecks, failover, and caching. Your response persists locally.
              </p>

              <textarea
                className="input-field"
                rows={6}
                value={designAnswer}
                onChange={(e) => setDesignAnswer(e.target.value)}
                placeholder="Example: To handle 10x traffic, I would introduce Redis cache-aside with TTL jitter for read endpoints, partition Kafka topics to 12 partitions with concurrent consumer group workers, and enable read replicas on PostgreSQL with connection pooling..."
                style={{ width: '100%', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '0.75rem', resize: 'vertical' }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 600 }}>
                  {saveStatus}
                </span>
                <button className="btn btn-primary" onClick={handleSaveDesignAnswer} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Save size={15} />
                  <span>Save Architecture Answer (+50 XP)</span>
                </button>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: lesson.designCompleted ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${lesson.designCompleted ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-card)'}`
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                  {lesson.designCompleted ? '✓ System Design Challenge Completed' : 'Status: In Progress'}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Marked complete automatically upon saving your answer (+50 XP).
                </div>
              </div>

              <button
                className={`btn ${lesson.designCompleted ? 'btn-secondary' : 'btn-ghost'}`}
                style={{ fontSize: '0.75rem' }}
                onClick={() => updateArchitectureStep(lesson.id, 'design', !lesson.designCompleted, designAnswer)}
              >
                {lesson.designCompleted ? <CheckCircle2 size={15} color="#10b981" /> : <Circle size={15} />}
                <span>{lesson.designCompleted ? 'Completed' : 'Toggle Completed'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: EXPLAIN */}
        {activeTab === 'explain' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="glass-panel" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#a855f7', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.4rem' }}>
                Feynman Technique (~2 mins)
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                Explain the Concept in Your Own Words
              </h3>
              <div
                style={{
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(168, 85, 247, 0.08)',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '1rem',
                  lineHeight: '1.5'
                }}
              >
                Prompt: <strong>{lesson.explainPrompt}</strong>
              </div>

              <textarea
                className="input-field"
                rows={5}
                value={explainAnswer}
                onChange={(e) => setExplainAnswer(e.target.value)}
                placeholder="In plain English without buzzwords: This concept ensures that even if..."
                style={{ width: '100%', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '0.75rem', resize: 'vertical' }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 600 }}>
                  {saveStatus}
                </span>
                <button className="btn btn-primary" onClick={handleSaveExplainAnswer} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Save size={15} />
                  <span>Save Explanation (+25 XP)</span>
                </button>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: lesson.explainCompleted ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${lesson.explainCompleted ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-card)'}`
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                  {lesson.explainCompleted ? '✓ Explain Step Completed' : 'Status: In Progress'}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Earns +25 XP upon saving your synthesized explanation.
                </div>
              </div>

              <button
                className={`btn ${lesson.explainCompleted ? 'btn-secondary' : 'btn-ghost'}`}
                style={{ fontSize: '0.75rem' }}
                onClick={() => updateArchitectureStep(lesson.id, 'explain', !lesson.explainCompleted, explainAnswer)}
              >
                {lesson.explainCompleted ? <CheckCircle2 size={15} color="#10b981" /> : <Circle size={15} />}
                <span>{lesson.explainCompleted ? 'Completed' : 'Toggle Completed'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 5: APPLY TO PROJECT */}
        {activeTab === 'apply' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="glass-panel" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-color)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.4rem' }}>
                Project Application Mapping
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                Connecting Architecture Directly to Order Service
              </h3>
              <div
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-card)',
                  fontSize: '0.88rem',
                  lineHeight: '1.6',
                  color: 'var(--text-primary)',
                  marginBottom: '1rem'
                }}
              >
                <div style={{ marginBottom: '0.5rem', color: 'var(--accent-color)', fontWeight: 600 }}>
                  Project Mapping: {lesson.applyMapping}
                </div>
                <div>{lesson.applyPrompt}</div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Architecture & Implementation Notes for this week:
              </div>

              <textarea
                className="input-field"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Log design decisions, code locations, ADR numbers, or deployment notes..."
                style={{ width: '100%', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '0.75rem', resize: 'vertical' }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 600 }}>
                  {saveStatus}
                </span>
                <button className="btn btn-secondary" onClick={handleSaveNotes} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Save size={15} />
                  <span>Save Notes</span>
                </button>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                background: lesson.appliedToProject ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${lesson.appliedToProject ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-card)'}`
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                  {lesson.appliedToProject ? '✓ Applied to Production Project' : 'Mark as Applied to Project'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Tracks your architecture implementation milestone
                </div>
              </div>

              <button
                className={`btn ${lesson.appliedToProject ? 'btn-secondary' : 'btn-primary'}`}
                onClick={() => updateArchitectureStep(lesson.id, 'apply', !lesson.appliedToProject, notes)}
              >
                {lesson.appliedToProject ? <CheckCircle2 size={16} color="#10b981" /> : <Circle size={16} />}
                <span>{lesson.appliedToProject ? 'Applied' : 'Mark Applied'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            marginTop: '1.5rem',
            borderTop: '1px solid var(--border-card)',
            paddingTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.78rem',
            color: 'var(--text-muted)'
          }}
        >
          <span>All architecture inputs and XP persist locally in IndexedDB</span>
          <button className="btn btn-secondary" onClick={onClose} style={{ fontSize: '0.8rem' }}>
            Close Mission
          </button>
        </div>
      </div>
    </div>
  );
};

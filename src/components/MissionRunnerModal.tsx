import React, { useState, useEffect } from 'react';
import { useStorage } from '../storage/storageContext';
import { X, Play, Pause, RotateCcw, CheckCircle2, Clock, Sparkles, AlertCircle } from 'lucide-react';

interface MissionRunnerModalProps {
  onClose: () => void;
}

export const MissionRunnerModal: React.FC<MissionRunnerModalProps> = ({ onClose }) => {
  const { activeMilestone, completeTask, profile, updateProfile } = useStorage();

  const [activeStep, setActiveStep] = useState<'learn' | 'practice' | 'architecture' | 'explain'>('practice');
  const [selectedDuration, setSelectedDuration] = useState<number>(profile.dailyRoutineMinutes || 60);

  // Focus Timer
  const [timeLeft, setTimeLeft] = useState<number>(20 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [userNotes, setUserNotes] = useState<string>('');
  const [completedSteps, setCompletedSteps] = useState<{ [key: string]: boolean }>({});

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

  if (!activeMilestone) return null;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStepSelect = (step: 'learn' | 'practice' | 'architecture' | 'explain', mins: number) => {
    setActiveStep(step);
    setTimeLeft(mins * 60);
    setIsRunning(false);
  };

  const handleMarkStepComplete = async (stepKey: 'learn' | 'practice' | 'architecture' | 'explain') => {
    setCompletedSteps((prev) => ({ ...prev, [stepKey]: true }));
    const task = activeMilestone.tasks.find((t) => t.type === stepKey);
    if (task) {
      await completeTask(activeMilestone.id, task.id, true);
    }
  };

  const handleDurationChange = async (minutes: number) => {
    setSelectedDuration(minutes);
    await updateProfile({ dailyRoutineMinutes: minutes });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '780px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-card)', paddingBottom: '1rem' }}>
          <div>
            <span className="badge badge-active font-mono" style={{ fontSize: '0.7rem', marginBottom: '0.3rem' }}>
              DAILY MISSION FOCUS ROOM
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{activeMilestone.primarySkill}</h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {activeMilestone.title} • Week {activeMilestone.weekNumber}
            </div>
          </div>
          <button className="btn btn-ghost" onClick={onClose} style={{ padding: '0.4rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Practice Minimum Rule Callout */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            marginBottom: '1.5rem',
            fontSize: '0.82rem',
            color: '#fbbf24'
          }}
        >
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <div>
            <strong>PRACTICE IS THE MINIMUM:</strong> If you are short on time today, complete just the 20-minute 🧪 Practice session. It maintains your streak and counts as a fully successful day!
          </div>
        </div>

        {/* Time Budget Selector */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
            Choose Today's Available Time
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[20, 30, 45, 60, 90].map((mins) => (
              <button
                key={mins}
                onClick={() => handleDurationChange(mins)}
                className={`btn ${selectedDuration === mins ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1, padding: '0.4rem 0.6rem', fontSize: '0.8rem' }}
              >
                {mins} mins {mins === 20 ? '(Min)' : mins === 60 ? '(Std)' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Step Tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {[
            { key: 'learn' as const, label: '📚 LEARN', mins: 20, desc: 'Concepts & Docs' },
            { key: 'practice' as const, label: '🧪 PRACTICE', mins: 20, desc: 'Code & Tests' },
            { key: 'architecture' as const, label: '🏗 ARCH', mins: 15, desc: 'System Design' },
            { key: 'explain' as const, label: '🧠 EXPLAIN', mins: 5, desc: 'Teach & Synthesize' }
          ].map((item) => {
            const isCurrent = activeStep === item.key;
            const isDone = completedSteps[item.key];
            return (
              <button
                key={item.key}
                onClick={() => handleStepSelect(item.key, item.mins)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '0.75rem 0.5rem',
                  borderRadius: 'var(--radius-md)',
                  background: isCurrent ? 'var(--accent-glow)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${isCurrent ? 'var(--border-accent)' : 'var(--border-card)'}`,
                  cursor: 'pointer',
                  textAlign: 'center',
                  color: isCurrent ? 'var(--text-primary)' : 'var(--text-secondary)'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span>{item.label}</span>
                  {isDone && <CheckCircle2 size={14} color="#34d399" />}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.mins} min</div>
              </button>
            );
          })}
        </div>

        {/* Focus Timer Display */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 1rem',
            background: 'rgba(0, 0, 0, 0.25)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-card)',
            marginBottom: '1.5rem'
          }}
        >
          <div className="font-mono" style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '0.05em', color: isRunning ? 'var(--accent-color)' : 'var(--text-primary)' }}>
            {formatTimer(timeLeft)}
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              className="btn btn-primary"
              onClick={() => setIsRunning(!isRunning)}
              style={{ padding: '0.6rem 1.8rem', fontSize: '0.95rem' }}
            >
              {isRunning ? <Pause size={18} /> : <Play size={18} />}
              <span>{isRunning ? 'Pause' : 'Start Timer'}</span>
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setIsRunning(false);
                setTimeLeft(20 * 60);
              }}
            >
              <RotateCcw size={16} />
              <span>Reset</span>
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleMarkStepComplete(activeStep)}
              style={{ borderColor: 'rgba(16, 185, 129, 0.4)', color: '#34d399' }}
            >
              <CheckCircle2 size={16} />
              <span>Mark Step Complete</span>
            </button>
          </div>
        </div>

        {/* Daily Learning & Architecture Reflection Box */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
            📝 Today's Engineering Notes & Architecture Decision Log:
          </label>
          <textarea
            value={userNotes}
            onChange={(e) => setUserNotes(e.target.value)}
            placeholder="Record what you implemented, key insights, benchmark figures, or architecture trade-offs..."
            rows={3}
            style={{ width: '100%', resize: 'vertical' }}
          />
        </div>

        {/* Modal Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid var(--border-card)', paddingTop: '1.25rem' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Close Focus Room
          </button>
          <button
            className="btn btn-primary"
            onClick={async () => {
              await handleMarkStepComplete(activeStep);
              onClose();
            }}
          >
            <Sparkles size={16} />
            <span>Complete & Log Routine (+XP)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

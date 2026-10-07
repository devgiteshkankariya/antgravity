import React, { useState } from 'react';
import { useStorage } from '../storage/storageContext';
import { SystemDesignCase } from '../types';
import { DailyArchitectureModal } from '../components/DailyArchitectureModal';
import {
  Cpu,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Shield,
  Activity,
  DollarSign,
  Layers,
  Database,
  Zap,
  Save,
  Flame,
  ExternalLink,
  BookOpen,
  Code,
  MessageSquare,
  FolderGit2,
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ArchitecturePage: React.FC = () => {
  const {
    systemDesign,
    updateSystemDesignCase,
    architectureLessons,
    updateArchitectureStep,
    profile
  } = useStorage();

  const [pageMode, setPageMode] = useState<'daily' | 'cases'>('daily');
  const [selectedCaseId, setSelectedCaseId] = useState<string>(systemDesign[0]?.id || 'sd-1');
  const [activeTab, setActiveTab] = useState<'overview' | 'failures' | 'tradeoffs' | 'notes'>('overview');
  const [activeModalLessonId, setActiveModalLessonId] = useState<string | null>(null);

  const selectedCase = systemDesign.find((c) => c.id === selectedCaseId) || systemDesign[0];
  const passedCasesCount = systemDesign.filter((c) => c.checklistPassed).length;

  // Daily architecture stats
  const completedDailyCount = architectureLessons.filter((l) => l.completed).length;
  const questionsAnsweredCount = architectureLessons.filter(
    (l) => l.designCompleted || (l.designAnswer && l.designAnswer.trim().length > 0)
  ).length;
  const projectsAppliedCount = architectureLessons.filter((l) => l.appliedToProject).length;

  const handleTogglePassed = async (id: string, current: boolean) => {
    await updateSystemDesignCase(id, { checklistPassed: !current });
  };

  const handleNotesChange = async (notes: string) => {
    if (selectedCase) {
      await updateSystemDesignCase(selectedCase.id, { userNotes: notes });
    }
  };

  if (!selectedCase) return null;

  return (
    <div className="page-wrapper animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-active font-mono">Parallel Architecture Track</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>15–20 mins Daily • Sunday Deep Review</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>System Design & Architecture Hub</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Structured daily architecture missions powered by Free System Design & ByteByteGo, running parallel to your 90-day roadmap.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.03)', padding: '0.35rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
          <button
            className={`btn ${pageMode === 'daily' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
            onClick={() => setPageMode('daily')}
          >
            <Layers size={15} />
            <span>Daily Missions ({completedDailyCount}/13)</span>
          </button>
          <button
            className={`btn ${pageMode === 'cases' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
            onClick={() => setPageMode('cases')}
          >
            <Cpu size={15} />
            <span>10 System Design Cases ({passedCasesCount}/10)</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: DAILY ARCHITECTURE MISSIONS TRACK */}
      {pageMode === 'daily' && (
        <div className="animate-fade-in">
          {/* Quick Stats Bar */}
          <div
            className="glass-panel"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1.25rem',
              padding: '1.25rem 1.5rem',
              marginBottom: '2rem'
            }}
          >
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Architecture Streak
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                <Flame size={18} color="#f97316" />
                <span className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f97316' }}>
                  {profile.architectureStreak || 0} Days
                </span>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Architecture XP
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                <Zap size={18} color="var(--accent-color)" />
                <span className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-color)' }}>
                  {profile.architectureXp || 0} XP
                </span>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Lessons Completed
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  {completedDailyCount} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ {architectureLessons.length}</span>
                </span>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Design Questions Answered
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                <HelpCircle size={18} color="#a855f7" />
                <span className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#a855f7' }}>
                  {questionsAnsweredCount} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ {architectureLessons.length}</span>
                </span>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Projects Applied
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                <FolderGit2 size={18} color="#3b82f6" />
                <span className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#3b82f6' }}>
                  {projectsAppliedCount} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ {architectureLessons.length}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Lessons Grid (Weeks 1 to 13) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
            {architectureLessons.map((l) => {
              const allDone = l.learnCompleted && l.practiceCompleted && l.designCompleted && l.explainCompleted;
              return (
                <div
                  key={l.id}
                  className="glass-panel"
                  style={{
                    padding: '1.5rem',
                    border: allDone ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-card)',
                    background: allDone ? 'rgba(16, 185, 129, 0.03)' : 'rgba(255, 255, 255, 0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    {/* Top line badges */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span className="badge font-mono" style={{ fontSize: '0.7rem' }}>
                        WEEK {l.weekNumber} TRACK
                      </span>
                      {allDone ? (
                        <span className="badge badge-completed font-mono" style={{ fontSize: '0.7rem' }}>
                          ✓ Done (+200 XP)
                        </span>
                      ) : (
                        <span className="badge" style={{ fontSize: '0.7rem', color: 'var(--accent-color)' }}>
                          {l.estimatedMinutes}m • {l.provider}
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                      {l.topic}
                    </h3>

                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                      <strong>Resource:</strong> {l.resourceTitle}
                    </div>

                    {/* Step Checkboxes */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '0.5rem',
                        marginBottom: '1rem',
                        fontSize: '0.75rem'
                      }}
                    >
                      <div
                        onClick={() => updateArchitectureStep(l.id, 'learn', !l.learnCompleted)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          cursor: 'pointer',
                          padding: '0.35rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          background: l.learnCompleted ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.02)'
                        }}
                      >
                        {l.learnCompleted ? <CheckCircle2 size={13} color="#10b981" /> : <Circle size={13} />}
                        <span>Learn (+25)</span>
                      </div>

                      <div
                        onClick={() => updateArchitectureStep(l.id, 'practice', !l.practiceCompleted)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          cursor: 'pointer',
                          padding: '0.35rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          background: l.practiceCompleted ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.02)'
                        }}
                      >
                        {l.practiceCompleted ? <CheckCircle2 size={13} color="#10b981" /> : <Circle size={13} />}
                        <span>Practice (+50)</span>
                      </div>

                      <div
                        onClick={() => updateArchitectureStep(l.id, 'design', !l.designCompleted)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          cursor: 'pointer',
                          padding: '0.35rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          background: l.designCompleted ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.02)'
                        }}
                      >
                        {l.designCompleted ? <CheckCircle2 size={13} color="#10b981" /> : <Circle size={13} />}
                        <span>Design (+50)</span>
                      </div>

                      <div
                        onClick={() => updateArchitectureStep(l.id, 'explain', !l.explainCompleted)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          cursor: 'pointer',
                          padding: '0.35rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          background: l.explainCompleted ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.02)'
                        }}
                      >
                        {l.explainCompleted ? <CheckCircle2 size={13} color="#10b981" /> : <Circle size={13} />}
                        <span>Explain (+25)</span>
                      </div>
                    </div>

                    {/* Applied to project indicator */}
                    <div
                      onClick={() => updateArchitectureStep(l.id, 'apply', !l.appliedToProject)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        marginBottom: '1rem',
                        color: l.appliedToProject ? '#10b981' : 'var(--text-muted)'
                      }}
                    >
                      {l.appliedToProject ? <CheckCircle2 size={14} color="#10b981" /> : <Circle size={14} />}
                      <span>Applied: {l.applyMapping.substring(0, 36)}...</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-card)' }}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{ flex: 1, fontSize: '0.78rem', padding: '0.4rem 0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', textDecoration: 'none' }}
                    >
                      <ExternalLink size={13} />
                      <span>Resource</span>
                    </a>
                    <button
                      className="btn btn-primary"
                      onClick={() => setActiveModalLessonId(l.id)}
                      style={{ flex: 1.5, fontSize: '0.78rem', padding: '0.4rem 0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}
                    >
                      <Layers size={13} />
                      <span>Open Mission</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Modal */}
          {activeModalLessonId && (
            <DailyArchitectureModal
              lessonId={activeModalLessonId}
              onClose={() => setActiveModalLessonId(null)}
            />
          )}
        </div>
      )}

      {/* VIEW 2: 10 SYSTEM DESIGN CASE STUDIES */}
      {pageMode === 'cases' && (
      /* Main Layout: Case Selector Sidebar + Detail View */
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* Left Column: Case Studies List */}
        <div className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem', padding: '0 0.5rem' }}>
            10 Practice Cases
          </div>

          {systemDesign.map((c) => {
            const isSelected = c.id === selectedCase.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCaseId(c.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'var(--accent-glow)' : 'transparent',
                  border: `1px solid ${isSelected ? 'var(--border-accent)' : 'transparent'}`,
                  color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '0.72rem', color: isSelected ? 'var(--accent-color)' : 'var(--text-muted)' }}>
                    Case #{c.number} • {c.difficulty}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }} className="truncate">
                    {c.title}
                  </div>
                </div>

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTogglePassed(c.id, c.checklistPassed);
                  }}
                  style={{ cursor: 'pointer', padding: '0.2rem' }}
                >
                  {c.checklistPassed ? (
                    <CheckCircle2 size={16} color="#34d399" />
                  ) : (
                    <Circle size={16} color="var(--text-muted)" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Case Deep-Dive */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          {/* Header of selected case */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-card)', paddingBottom: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                <span className="badge badge-next font-mono">CASE #{selectedCase.number}</span>
                <span className="badge font-mono">{selectedCase.difficulty}</span>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{selectedCase.title}</h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                {selectedCase.summary}
              </p>
            </div>

            <button
              onClick={() => handleTogglePassed(selectedCase.id, selectedCase.checklistPassed)}
              className={`btn ${selectedCase.checklistPassed ? 'btn-secondary' : 'btn-primary'}`}
              style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}
            >
              {selectedCase.checklistPassed ? (
                <>
                  <CheckCircle2 size={16} color="#34d399" />
                  <span>Mastered</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} />
                  <span>Mark as Mastered</span>
                </>
              )}
            </button>
          </div>

          {/* Sub-tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-card)', paddingBottom: '0.75rem' }}>
            <button
              onClick={() => setActiveTab('overview')}
              className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
            >
              Overview & Scale
            </button>
            <button
              onClick={() => setActiveTab('failures')}
              className={`btn ${activeTab === 'failures' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
            >
              Failure Scenarios & RTO/RPO
            </button>
            <button
              onClick={() => setActiveTab('tradeoffs')}
              className={`btn ${activeTab === 'tradeoffs' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
            >
              Security, Observability & Cost
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`btn ${activeTab === 'notes' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
            >
              My Architecture Notes
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Functional & Non-Functional Requirements
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {selectedCase.requirements.map((req, i) => (
                    <li key={i} style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--accent-color)' }}>✔</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-color)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Back-of-the-Envelope Scale & Capacity Estimate
                </h4>
                <p className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: '1.6' }}>
                  {selectedCase.scaleEstimate}
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Architecture Components Topology
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.75rem' }}>
                  {selectedCase.architectureComponents.map((comp, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--border-card)',
                        fontSize: '0.82rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <Layers size={14} color="var(--accent-color)" />
                      <span>{comp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-card)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                    <Database size={16} color="#06b6d4" />
                    <span>Database Choice & Rationale</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {selectedCase.databaseChoice}
                  </p>
                </div>

                <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-card)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                    <Zap size={16} color="#f59e0b" />
                    <span>Caching & Eviction Strategy</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {selectedCase.cachingStrategy}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Failure Scenarios */}
          {activeTab === 'failures' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 600 }}>
                <AlertTriangle size={18} />
                <span>Designing for Disaster: Chaos Scenarios & Self-Healing</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {selectedCase.failureScenarios.map((scenario, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(239, 68, 68, 0.04)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      fontSize: '0.85rem',
                      lineHeight: '1.6'
                    }}
                  >
                    {scenario}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Tradeoffs, Security, Observability, Cost */}
          {activeTab === 'tradeoffs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  <Shield size={16} color="#10b981" />
                  <span>Security & Zero Trust Considerations</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {selectedCase.securityConsiderations.map((sec, i) => (
                    <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      • {sec}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  <Activity size={16} color="#3b82f6" />
                  <span>SLI, SLO & Observability Metrics</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {selectedCase.observabilityPoints.map((obs, i) => (
                    <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      • {obs}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  <DollarSign size={16} color="#f59e0b" />
                  <span>Cost Economics & FinOps Strategy</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {selectedCase.costConsiderations}
                </p>
              </div>
            </div>
          )}

          {/* Tab 4: My Notes */}
          {activeTab === 'notes' && (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Personal Design Decisions & Interview Rehearsal Notes:
                </label>
                <textarea
                  rows={10}
                  value={selectedCase.userNotes || ''}
                  onChange={(e) => handleNotesChange(e.target.value)}
                  placeholder="Draft your response to: Where is the bottleneck? What is your RTO/RPO? How does the system degrade gracefully under 10x spikes?"
                  className="font-mono"
                  style={{ width: '100%', fontSize: '0.85rem', lineHeight: '1.6' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => alert('Notes automatically saved to local IndexedDB!')}
                >
                  <Save size={16} />
                  <span>Saved in Local-First IndexedDB</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useStorage } from '../storage/storageContext';
import { ProjectEntry } from '../types';
import { CAPSTONE_PROJECTS } from '../curriculum/capstones';
import { ProjectArtifactModal } from '../components/ProjectArtifactModal';
import {
  FolderGit2,
  FileText,
  Share2,
  CheckCircle2,
  Circle,
  ExternalLink,
  Layers,
  Sparkles,
  Award
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { projects, saveProject } = useStorage();
  const [selectedProject, setSelectedProject] = useState<ProjectEntry | null>(null);
  const [modalTab, setModalTab] = useState<'readme' | 'linkedin'>('readme');
  const [activeSection, setActiveSection] = useState<'evolving' | 'capstones'>('evolving');

  const handleOpenArtifactModal = (proj: ProjectEntry, tab: 'readme' | 'linkedin') => {
    setSelectedProject(proj);
    setModalTab(tab);
  };

  const handleToggleComplete = async (project: ProjectEntry) => {
    await saveProject({ ...project, completed: !project.completed });
  };

  return (
    <div className="page-wrapper animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-active font-mono">Portfolio Evidence</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>High-Signal Engineering Output</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Projects & Production Codebase</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Instead of 19 disconnected toy repos, you build ONE evolving production platform that proves progressive mastery.
          </p>
        </div>

        {/* Section switcher */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveSection('evolving')}
            className={`btn ${activeSection === 'evolving' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
          >
            One Evolving Platform (W2–W12)
          </button>
          <button
            onClick={() => setActiveSection('capstones')}
            className={`btn ${activeSection === 'capstones' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
          >
            3 Flagship Capstones
          </button>
        </div>
      </div>

      {activeSection === 'evolving' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Philosophy Banner */}
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderRadius: 'var(--radius-lg)',
              background: 'rgba(59, 130, 246, 0.06)',
              border: '1px solid rgba(59, 130, 246, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                🚀 One Evolving Production Platform Strategy
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Each week adds enterprise capabilities to the Order Service codebase: Postgres → Redis → Docker → CI/CD → AWS ECS → Terraform → Kafka → Observability → RAG.
              </p>
            </div>
            <span className="badge badge-completed">{projects.filter((p) => p.completed).length} / {projects.length} Completed</span>
          </div>

          {/* Projects List */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.5rem' }}>
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: `1px solid ${proj.completed ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-card)'}`
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="badge font-mono">Week {proj.weekNumber}</span>
                      <span className="badge badge-active">{proj.version}</span>
                    </div>

                    <button
                      onClick={() => handleToggleComplete(proj)}
                      className="btn btn-ghost"
                      style={{ padding: '0.2rem 0.4rem', fontSize: '0.75rem' }}
                    >
                      {proj.completed ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#34d399' }}>
                          <CheckCircle2 size={16} />
                          <span>Built</span>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
                          <Circle size={16} />
                          <span>In Progress</span>
                        </div>
                      )}
                    </button>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    {proj.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    {proj.description}
                  </p>

                  {/* Technologies */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                    {proj.technologies.map((t) => (
                      <span key={t} className="badge font-mono" style={{ fontSize: '0.68rem' }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-card)', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                    <strong>Architecture Note:</strong> {proj.architectureSummary}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border-card)', paddingTop: '1rem' }}>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleOpenArtifactModal(proj, 'readme')}
                    style={{ flex: 1, padding: '0.45rem', fontSize: '0.78rem' }}
                  >
                    <FileText size={14} />
                    <span>[ Generate README ]</span>
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleOpenArtifactModal(proj, 'linkedin')}
                    style={{ flex: 1, padding: '0.45rem', fontSize: '0.78rem' }}
                  >
                    <Share2 size={14} />
                    <span>[ LinkedIn Post ]</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Capstones View */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {CAPSTONE_PROJECTS.map((cap) => (
            <div key={cap.id} className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Award size={24} color="var(--accent-color)" />
                  <div>
                    <span className="badge badge-active font-mono">CAPSTONE {cap.number}</span>
                    <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{cap.title}</h2>
                  </div>
                </div>
                <span className="badge badge-completed font-mono" style={{ fontSize: '0.85rem' }}>
                  +{cap.xpReward} XP Reward
                </span>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                {cap.description}
              </p>

              {/* Technologies */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                {cap.technologies.map((t) => (
                  <span key={t} className="badge badge-next font-mono">
                    {t}
                  </span>
                ))}
              </div>

              {/* Architecture Highlights */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Key Architectural Patterns & Highlights
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {cap.architectureHighlights.map((hi, i) => (
                    <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--accent-color)' }}>✔</span>
                      <span>{hi}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables */}
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Executive Deliverables
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.6rem' }}>
                  {cap.deliverables.map((del, i) => (
                    <div key={i} style={{ padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-card)', fontSize: '0.8rem' }}>
                      📦 {del}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Artifact Generator Modal */}
      {selectedProject && (
        <ProjectArtifactModal
          project={selectedProject}
          initialTab={modalTab}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

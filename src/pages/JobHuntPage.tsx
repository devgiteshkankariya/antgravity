import React, { useState } from 'react';
import { useStorage } from '../storage/storageContext';
import { JobApplication } from '../types';
import {
  Briefcase,
  Plus,
  ExternalLink,
  Trash2,
  Edit3,
  Calendar,
  AlertCircle,
  TrendingUp,
  X,
  Save,
  CheckCircle2
} from 'lucide-react';

export const JobHuntPage: React.FC = () => {
  const { jobApplications, saveJobApplication, deleteJobApplication } = useStorage();
  const [editingApp, setEditingApp] = useState<JobApplication | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const targetRoles = [
    'Senior Node.js Backend Engineer',
    'Senior Backend Engineer (TypeScript)',
    'Cloud Engineer (AWS)',
    'Cloud / Platform Engineer',
    'Platform / DevOps Engineer',
    'Solution Architect / Cloud Architect'
  ];

  const filteredApps = jobApplications.filter((app) => {
    if (statusFilter === 'all') return true;
    return app.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApp || !editingApp.company.trim()) return;
    await saveJobApplication(editingApp);
    setEditingApp(null);
  };

  return (
    <div className="page-wrapper animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-active font-mono">Job-Switch Activation</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Target Start: ~Day 55</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Job Hunt & Interview Tracker</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Don't wait for 100% roadmap completion. Start applying from Week 8 as soon as your AWS ECS + CI/CD pipeline is live.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() =>
            setEditingApp({
              id: `job-${Date.now()}`,
              company: '',
              role: 'Senior Platform Engineer (Node.js/AWS)',
              location: 'Remote',
              jobUrl: 'https://',
              applicationDate: new Date().toISOString().split('T')[0],
              resumeVersion: 'Resume-V1-CloudBackend.pdf',
              status: 'Applied',
              interviewStage: 'Initial Application',
              feedback: '',
              missingSkills: '',
              followUpDate: ''
            })
          }
        >
          <Plus size={16} />
          <span>Track New Application</span>
        </button>
      </div>

      {/* Target Roles Banner */}
      <div className="glass-panel" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.75rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          Target High-Compensation Career Roles
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {targetRoles.map((role) => (
            <span key={role} className="badge badge-next" style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}>
              🎯 {role}
            </span>
          ))}
        </div>
      </div>

      {/* Application Funnel Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem', marginBottom: '1.75rem' }}>
        {['Saved', 'Applied', 'Screening', 'Technical', 'System Design', 'Offer'].map((st) => {
          const count = jobApplications.filter((a) => a.status.toLowerCase() === st.toLowerCase()).length;
          return (
            <div
              key={st}
              onClick={() => setStatusFilter(st.toLowerCase())}
              className="glass-panel"
              style={{
                padding: '0.85rem',
                textAlign: 'center',
                cursor: 'pointer',
                borderColor: statusFilter === st.toLowerCase() ? 'var(--accent-color)' : 'var(--border-card)'
              }}
            >
              <div className="font-mono" style={{ fontSize: '1.35rem', fontWeight: 800 }}>{count}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{st}</div>
            </div>
          );
        })}
      </div>

      {/* Job Applications List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.25rem' }}>
        {filteredApps.map((app) => {
          const statusBadge =
            app.status === 'Offer'
              ? 'badge-completed'
              : app.status === 'Technical' || app.status === 'System Design'
              ? 'badge-active'
              : 'badge-next';

          return (
            <div
              key={app.id}
              className="glass-panel"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className={`badge ${statusBadge}`}>{app.status}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.applicationDate}</span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.2rem' }}>
                  {app.company}
                </h3>
                <div style={{ fontSize: '0.88rem', color: 'var(--accent-color)', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {app.role}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  📍 {app.location} • 📄 {app.resumeVersion}
                </div>

                {app.interviewStage && (
                  <div style={{ padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-card)', fontSize: '0.8rem', marginBottom: '0.6rem' }}>
                    <strong>Current Stage:</strong> {app.interviewStage}
                  </div>
                )}

                {app.missingSkills && (
                  <div style={{ fontSize: '0.78rem', color: '#fbbf24', marginBottom: '0.5rem' }}>
                    ⚠️ <strong>Identified Gap:</strong> {app.missingSkills}
                  </div>
                )}

                {app.feedback && (
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                    "{app.feedback}"
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-card)', paddingTop: '0.85rem', marginTop: '1rem' }}>
                <a
                  href={app.jobUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                >
                  <span>Job Link</span>
                  <ExternalLink size={12} />
                </a>

                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button className="btn btn-ghost" onClick={() => setEditingApp(app)} style={{ padding: '0.35rem' }}>
                    <Edit3 size={15} />
                  </button>
                  <button className="btn btn-ghost" onClick={() => deleteJobApplication(app.id)} style={{ padding: '0.35rem', color: '#f87171' }}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit/Add Application Modal */}
      {editingApp && (
        <div className="modal-overlay" onClick={() => setEditingApp(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-card)', paddingBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                {editingApp.company ? `Edit ${editingApp.company} Application` : 'Add New Job Application'}
              </h3>
              <button className="btn btn-ghost" onClick={() => setEditingApp(null)} style={{ padding: '0.35rem' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={editingApp.company}
                    onChange={(e) => setEditingApp({ ...editingApp, company: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    Role Title
                  </label>
                  <input
                    type="text"
                    value={editingApp.role}
                    onChange={(e) => setEditingApp({ ...editingApp, role: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    Status
                  </label>
                  <select
                    value={editingApp.status}
                    onChange={(e) => setEditingApp({ ...editingApp, status: e.target.value as any })}
                  >
                    <option value="Saved">Saved</option>
                    <option value="Applied">Applied</option>
                    <option value="Screening">Recruiter Screening</option>
                    <option value="Technical">Technical Round</option>
                    <option value="System Design">System Design Round</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingApp.location}
                    onChange={(e) => setEditingApp({ ...editingApp, location: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  Job Listing URL
                </label>
                <input
                  type="url"
                  value={editingApp.jobUrl}
                  onChange={(e) => setEditingApp({ ...editingApp, jobUrl: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    Resume Version
                  </label>
                  <input
                    type="text"
                    value={editingApp.resumeVersion}
                    onChange={(e) => setEditingApp({ ...editingApp, resumeVersion: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    Current Interview Stage
                  </label>
                  <input
                    type="text"
                    value={editingApp.interviewStage}
                    onChange={(e) => setEditingApp({ ...editingApp, interviewStage: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  Missing Skills or Questions Encountered
                </label>
                <input
                  type="text"
                  placeholder="e.g., Asked about Kafka tombstone records"
                  value={editingApp.missingSkills}
                  onChange={(e) => setEditingApp({ ...editingApp, missingSkills: e.target.value })}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  Feedback / Notes
                </label>
                <textarea
                  rows={2}
                  value={editingApp.feedback}
                  onChange={(e) => setEditingApp({ ...editingApp, feedback: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid var(--border-card)', paddingTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setEditingApp(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} />
                  <span>Save Application</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

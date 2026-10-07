import React, { useState } from 'react';
import { useStorage } from '../storage/storageContext';
import { SaaTopic } from '../types';
import {
  Award,
  Shield,
  Zap,
  Lock,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  BookOpen
} from 'lucide-react';

export const SaaPage: React.FC = () => {
  const { saaTopics, updateSaaTopic } = useStorage();
  const [selectedDomain, setSelectedDomain] = useState<string>('all');

  const domains = [
    { name: 'Design Secure Architectures (30%)', icon: <Lock size={16} color="#34d399" /> },
    { name: 'Design Resilient Architectures (26%)', icon: <Shield size={16} color="#3b82f6" /> },
    { name: 'Design High-Performing Architectures (24%)', icon: <Zap size={16} color="#f59e0b" /> },
    { name: 'Design Cost-Optimized Architectures (20%)', icon: <DollarSign size={16} color="#a855f7" /> }
  ];

  const filteredTopics = saaTopics.filter((t) => {
    if (selectedDomain === 'all') return true;
    return t.domain === selectedDomain;
  });

  const avgConfidence = Math.round(
    saaTopics.reduce((acc, t) => acc + t.confidence, 0) / (saaTopics.length || 1)
  );

  const weakTopicsCount = saaTopics.filter((t) => t.isWeakTopic || t.confidence < 70).length;

  return (
    <div className="page-wrapper animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-active font-mono">Certification Support Track</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>AWS SAA-C03 Blueprint</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>AWS Solutions Architect Associate (SAA)</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Supporting certification path. The AWS architecture project is more important than simply passing the exam.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div className="badge badge-next font-mono" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
            Readiness Index: {avgConfidence}%
          </div>
        </div>
      </div>

      {/* SAA Philosophy Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.2rem' }}>
            🎓 Practical Cloud Architect Mindset
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Certifications get your resume past the HR filter. Your Terraform codebase, ECS container deployment, and Kafka outbox architecture are what convince hiring directors to give you the offer.
          </p>
        </div>

        <a
          href="https://aws.amazon.com/certification/certified-solutions-architect-associate/"
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary"
          style={{ fontSize: '0.78rem' }}
        >
          <span>Official SAA-C03 Guide</span>
          <ExternalLink size={13} />
        </a>
      </div>

      {/* Domain Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {domains.map((dom) => {
          const domTopics = saaTopics.filter((t) => t.domain === dom.name);
          const domAvg = Math.round(
            domTopics.reduce((acc, t) => acc + t.confidence, 0) / (domTopics.length || 1)
          );

          return (
            <div
              key={dom.name}
              onClick={() => setSelectedDomain(selectedDomain === dom.name ? 'all' : dom.name)}
              className="glass-panel"
              style={{
                padding: '1.25rem',
                cursor: 'pointer',
                borderColor: selectedDomain === dom.name ? 'var(--accent-color)' : 'var(--border-card)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {dom.icon}
                  <span style={{ fontWeight: 700, fontSize: '0.82rem' }}>{dom.name}</span>
                </div>
                <span className="font-mono" style={{ fontSize: '0.8rem', fontWeight: 700 }}>{domAvg}%</span>
              </div>
              <div className="progress-container" style={{ height: '6px' }}>
                <div className="progress-fill" style={{ width: `${domAvg}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Topic Confidence Matrix */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Architectural Topic Confidence Matrix</h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Adjust sliders to reflect your conceptual mastery. Topics below 70% are automatically prioritized.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setSelectedDomain('all')}
              className={`btn ${selectedDomain === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
            >
              All Domains
            </button>
            <span className="badge badge-active" style={{ fontSize: '0.75rem' }}>
              {weakTopicsCount} Needs Revision
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${topic.confidence < 70 ? 'rgba(245, 158, 11, 0.3)' : 'var(--border-card)'}`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>{topic.title}</span>
                    {topic.confidence < 70 && (
                      <span className="badge font-mono" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', fontSize: '0.65rem' }}>
                        Weak Area
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{topic.domain}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="font-mono" style={{ fontSize: '0.88rem', fontWeight: 700, minWidth: '40px', textAlign: 'right' }}>
                    {topic.confidence}%
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={topic.confidence}
                    onChange={(e) => updateSaaTopic(topic.id, { confidence: parseInt(e.target.value) })}
                    style={{ width: '120px', cursor: 'pointer' }}
                  />
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                💡 {topic.notes}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

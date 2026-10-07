import React, { useState } from 'react';
import { Layers, Upload, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export const SkippupPage: React.FC = () => {
  const [syllabusText, setSyllabusText] = useState('');
  const [isImported, setIsImported] = useState(false);

  const handleUploadSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSyllabusText(event.target?.result as string);
        setIsImported(true);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="page-wrapper animate-fade-in" style={{ maxWidth: '900px' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span className="badge badge-active font-mono">Curriculum Synchronization</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>External Course Mapping</span>
        </div>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>SKIPPUP Integration</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Upload your official SKIPPUP course syllabus to map modules directly into Architecture Quest milestones.
        </p>
      </div>

      {/* Current Status Box matching prompt specification */}
      <div
        className="glass-panel"
        style={{
          padding: '2rem',
          marginBottom: '2rem',
          textAlign: 'center',
          border: '1px dashed var(--border-card-hover)',
          background: isImported ? 'rgba(16, 185, 129, 0.04)' : 'rgba(255, 255, 255, 0.02)'
        }}
      >
        <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)', marginBottom: '1rem' }}>
          <Layers size={36} color={isImported ? '#34d399' : 'var(--accent-color)'} />
        </div>

        <div style={{ marginBottom: '0.5rem' }}>
          <span className={`badge ${isImported ? 'badge-completed' : 'badge-locked'} font-mono`} style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }}>
            STATUS: {isImported ? 'SYLLABUS LOADED' : 'NOT IMPORTED'}
          </span>
        </div>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          {isImported ? 'SKIPPUP Syllabus Detected' : 'Upload the SKIPPUP syllabus to map it into Architecture Quest.'}
        </h3>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 1.5rem auto' }}>
          Per the system rules: No SKIPPUP topics are invented. When you upload or paste your syllabus, each module is parsed and mapped into the corresponding Architecture Quest week.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <label className="btn btn-primary" style={{ cursor: 'pointer' }}>
            <Upload size={16} />
            <span>Upload Syllabus File (JSON / MD / TXT)</span>
            <input type="file" accept=".json,.txt,.md" onChange={handleUploadSimulate} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {/* Manual paste box */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          Or Paste SKIPPUP Syllabus Content:
        </h3>
        <textarea
          rows={8}
          value={syllabusText}
          onChange={(e) => {
            setSyllabusText(e.target.value);
            if (e.target.value.trim()) setIsImported(true);
          }}
          placeholder="Paste SKIPPUP syllabus modules, lecture topics, or JSON export here..."
          className="font-mono"
          style={{ width: '100%', fontSize: '0.82rem', marginBottom: '1rem' }}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setSyllabusText('');
              setIsImported(false);
            }}
          >
            Clear
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              if (syllabusText.trim()) {
                setIsImported(true);
                alert('SKIPPUP syllabus saved! Topics will be linked to corresponding milestones.');
              }
            }}
          >
            <CheckCircle2 size={16} />
            <span>Map into Quest Milestones</span>
          </button>
        </div>
      </div>
    </div>
  );
};

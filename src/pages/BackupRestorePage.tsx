import React, { useState } from 'react';
import { useStorage } from '../storage/storageContext';
import {
  DatabaseBackup,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { downloadFile, exportAdrToMarkdown, exportProjectReadme } from '../utils/markdownExporter';

export const BackupRestorePage: React.FC = () => {
  const { exportBackup, importBackup, resetToDefaults, adrs, projects } = useStorage();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleExportJson = async () => {
    try {
      const backup = await exportBackup();
      const jsonString = JSON.stringify(backup, null, 2);
      downloadFile('architecture-quest-backup.json', jsonString, 'application/json');
      setStatusMessage('Journey successfully exported to architecture-quest-backup.json');
    } catch (err: any) {
      alert(`Export error: ${err.message}`);
    }
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const backup = JSON.parse(event.target?.result as string);
        await importBackup(backup);
        setStatusMessage('Journey successfully restored from backup file!');
        setTimeout(() => window.location.reload(), 1000);
      } catch (err: any) {
        alert(`Failed to import backup: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  const handleExportAllAdrs = () => {
    const combinedAdrs = adrs.map((a) => exportAdrToMarkdown(a)).join('\n\n---\n\n');
    downloadFile('all-adrs-export.md', combinedAdrs);
    setStatusMessage('All ADRs exported as combined Markdown document');
  };

  const handleExportAllReadmes = () => {
    const combinedReadmes = projects.map((p) => exportProjectReadme(p)).join('\n\n---\n\n');
    downloadFile('all-projects-readmes.md', combinedReadmes);
    setStatusMessage('All project READMEs exported as Markdown');
  };

  return (
    <div className="page-wrapper animate-fade-in" style={{ maxWidth: '880px' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span className="badge badge-active font-mono">Data Sovereignty & Local-First</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Complete Portable JSON & Markdown</span>
        </div>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Backup & Restore Journey</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          All your milestones, tasks, XP, streaks, ADRs, projects, and job hunt logs are stored locally in your browser's IndexedDB.
        </p>
      </div>

      {statusMessage && (
        <div
          style={{
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#34d399',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.88rem'
          }}
        >
          <CheckCircle2 size={18} />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Export & Import Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Export Card */}
        <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Download size={20} color="var(--accent-color)" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Export Journey</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Download your entire career progress into <code>architecture-quest-backup.json</code>. You can back this up into GitHub, Google Drive, or transfer it to another computer.
            </p>
          </div>

          <button className="btn btn-primary" onClick={handleExportJson} style={{ width: '100%' }}>
            <Download size={16} />
            <span>Export architecture-quest-backup.json</span>
          </button>
        </div>

        {/* Import Card */}
        <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Upload size={20} color="#10b981" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Import Journey</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Restore your complete learning trajectory, completed milestones, ADR records, and job applications from an existing backup JSON file.
            </p>
          </div>

          <label className="btn btn-secondary" style={{ width: '100%', cursor: 'pointer' }}>
            <Upload size={16} />
            <span>Select Backup File to Restore</span>
            <input type="file" accept=".json" onChange={handleImportJson} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {/* Markdown Document Exports */}
      <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Document Markdown Batch Exports
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Section 25: Export your ADRs and Project READMEs as clean Markdown documents ready for your GitHub repositories.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" onClick={handleExportAllAdrs}>
            <FileText size={16} />
            <span>Export All ADRs ({adrs.length}) as Markdown</span>
          </button>
          <button className="btn btn-secondary" onClick={handleExportAllReadmes}>
            <FileText size={16} />
            <span>Export All Project READMEs ({projects.length})</span>
          </button>
        </div>
      </div>

      {/* Danger Zone: Reset test data */}
      <div
        className="glass-panel"
        style={{
          padding: '1.5rem',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          background: 'rgba(239, 68, 68, 0.03)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f87171', marginBottom: '0.5rem' }}>
          <AlertTriangle size={18} />
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Testing & Database Reset</h4>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Reset your local IndexedDB to factory initial state. Used for verification testing.
        </p>
        <button
          className="btn btn-ghost"
          onClick={() => {
            if (confirm('Are you sure you want to reset all local progress to factory defaults?')) {
              resetToDefaults();
            }
          }}
          style={{ color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)' }}
        >
          <RotateCcw size={15} />
          <span>Reset All Data to Factory Seeds</span>
        </button>
      </div>
    </div>
  );
};

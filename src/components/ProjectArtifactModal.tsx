import React, { useState } from 'react';
import { ProjectEntry } from '../types';
import { useStorage } from '../storage/storageContext';
import { X, Copy, Download, Share2, FileCode, Check } from 'lucide-react';
import { exportProjectReadme, generateLinkedInPost, downloadFile } from '../utils/markdownExporter';

interface ProjectArtifactModalProps {
  project: ProjectEntry;
  initialTab?: 'readme' | 'linkedin';
  onClose: () => void;
}

export const ProjectArtifactModal: React.FC<ProjectArtifactModalProps> = ({
  project,
  initialTab = 'readme',
  onClose
}) => {
  const { saveProject } = useStorage();
  const [tab, setTab] = useState<'readme' | 'linkedin'>(initialTab);
  const [copied, setCopied] = useState(false);

  const [readmeContent, setReadmeContent] = useState<string>(
    project.readmeMarkdown || exportProjectReadme(project)
  );

  const [linkedinContent, setLinkedinContent] = useState<string>(
    project.linkedinPostMarkdown || generateLinkedInPost(project)
  );

  const handleCopy = () => {
    const textToCopy = tab === 'readme' ? readmeContent : linkedinContent;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (tab === 'readme') {
      downloadFile(`README-${project.id}.md`, readmeContent);
    } else {
      downloadFile(`LinkedIn-${project.id}.md`, linkedinContent);
    }
  };

  const handleSave = async () => {
    const updated: ProjectEntry = {
      ...project,
      readmeMarkdown: readmeContent,
      linkedinPostMarkdown: linkedinContent
    };
    await saveProject(updated);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '840px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-card)', paddingBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <span className="badge badge-active">{project.version}</span>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{project.title}</h2>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Artifact Generator: High-signal evidence for GitHub and Engineering Leaders
            </div>
          </div>
          <button className="btn btn-ghost" onClick={onClose} style={{ padding: '0.4rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Tab switch */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <button
            onClick={() => setTab('readme')}
            className={`btn ${tab === 'readme' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ flex: 1, padding: '0.5rem' }}
          >
            <FileCode size={16} />
            <span>GitHub README Generator</span>
          </button>
          <button
            onClick={() => setTab('linkedin')}
            className={`btn ${tab === 'linkedin' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ flex: 1, padding: '0.5rem' }}
          >
            <Share2 size={16} />
            <span>High-Signal LinkedIn Post</span>
          </button>
        </div>

        {tab === 'linkedin' && (
          <div
            style={{
              padding: '0.65rem 0.9rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.25)',
              fontSize: '0.8rem',
              color: 'var(--text-accent)',
              marginBottom: '1rem'
            }}
          >
            💡 <strong>Hiring Director Rule:</strong> This post highlights <em>What You Built, Architecture Decisions & Lessons</em>. It proves engineering capability rather than saying "I completed a course".
          </div>
        )}

        <div style={{ marginBottom: '1.25rem' }}>
          <textarea
            rows={14}
            value={tab === 'readme' ? readmeContent : linkedinContent}
            onChange={(e) => {
              if (tab === 'readme') setReadmeContent(e.target.value);
              else setLinkedinContent(e.target.value);
            }}
            className="font-mono"
            style={{ fontSize: '0.82rem', width: '100%', lineHeight: '1.6' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-card)', paddingTop: '1.25rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-secondary" onClick={handleCopy}>
              {copied ? <Check size={16} color="#34d399" /> : <Copy size={16} />}
              <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
            </button>
            <button className="btn btn-secondary" onClick={handleDownload}>
              <Download size={16} />
              <span>Download Markdown</span>
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

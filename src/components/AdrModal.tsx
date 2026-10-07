import React, { useState } from 'react';
import { ADR } from '../types';
import { useStorage } from '../storage/storageContext';
import { X, Save, Download, FileText } from 'lucide-react';
import { exportAdrToMarkdown, downloadFile } from '../utils/markdownExporter';

interface AdrModalProps {
  adr?: ADR | null;
  onClose: () => void;
}

export const AdrModal: React.FC<AdrModalProps> = ({ adr, onClose }) => {
  const { saveAdr } = useStorage();

  const [formData, setFormData] = useState<ADR>(
    adr || {
      id: `ADR-00${Math.floor(Math.random() * 900) + 10}`,
      title: '',
      status: 'Accepted',
      date: new Date().toISOString().split('T')[0],
      context: '',
      problem: '',
      options: '',
      decision: '',
      reason: '',
      tradeoffs: '',
      consequences: ''
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    await saveAdr(formData);
    onClose();
  };

  const handleExportMarkdown = () => {
    const md = exportAdrToMarkdown(formData);
    downloadFile(`${formData.id.toLowerCase()}-${formData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`, md);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '820px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-card)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FileText size={22} color="var(--accent-color)" />
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                {adr ? `Edit ${adr.id}` : 'Create Architecture Decision Record (ADR)'}
              </h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Document critical technology choices, trade-offs, and consequences
              </div>
            </div>
          </div>
          <button className="btn btn-ghost" onClick={onClose} style={{ padding: '0.4rem' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 140px', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                ADR ID
              </label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                Title
              </label>
              <input
                type="text"
                placeholder="e.g., Why choose PostgreSQL as primary transactional store"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              >
                <option value="Proposed">Proposed</option>
                <option value="Accepted">Accepted</option>
                <option value="Superseded">Superseded</option>
                <option value="Deprecated">Deprecated</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
              1. Context & Background
            </label>
            <textarea
              rows={2}
              placeholder="What is the architectural context? What workload or user demand drives this decision?"
              value={formData.context}
              onChange={(e) => setFormData({ ...formData, context: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
              2. Problem Statement
            </label>
            <textarea
              rows={2}
              placeholder="What core architectural problem or bottleneck are we addressing?"
              value={formData.problem}
              onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
              3. Considered Options
            </label>
            <textarea
              rows={2}
              placeholder="Option 1: PostgreSQL\nOption 2: DynamoDB\nOption 3: MongoDB"
              value={formData.options}
              onChange={(e) => setFormData({ ...formData, options: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                4. Decision
              </label>
              <textarea
                rows={3}
                placeholder="We decided to adopt..."
                value={formData.decision}
                onChange={(e) => setFormData({ ...formData, decision: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                5. Rationale & Justification
              </label>
              <textarea
                rows={3}
                placeholder="Why did we choose this option? What specific capability justifies it?"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                6. Architectural Trade-offs
              </label>
              <textarea
                rows={3}
                placeholder="What compromises or disadvantages did we accept?"
                value={formData.tradeoffs}
                onChange={(e) => setFormData({ ...formData, tradeoffs: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                7. Consequences & Next Steps
              </label>
              <textarea
                rows={3}
                placeholder="What follow-up implementation is required (connection pooling, migrations, etc.)?"
                value={formData.consequences}
                onChange={(e) => setFormData({ ...formData, consequences: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-card)', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={handleExportMarkdown}>
              <Download size={16} />
              <span>Export as Markdown</span>
            </button>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <Save size={16} />
                <span>Save ADR to Local DB</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

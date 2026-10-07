import React, { useState } from 'react';
import { useStorage } from '../storage/storageContext';
import { ADR } from '../types';
import { AdrModal } from '../components/AdrModal';
import {
  FileCode2,
  Plus,
  Download,
  Trash2,
  Edit3,
  Calendar,
  Layers,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { exportAdrToMarkdown, downloadFile } from '../utils/markdownExporter';

export const AdrsPage: React.FC = () => {
  const { adrs, deleteAdr } = useStorage();
  const [activeAdr, setActiveAdr] = useState<ADR | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredAdrs = adrs.filter((a) => {
    if (filterStatus === 'all') return true;
    return a.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const handleCreateNew = () => {
    setActiveAdr(null);
    setShowModal(true);
  };

  const handleEdit = (adr: ADR) => {
    setActiveAdr(adr);
    setShowModal(true);
  };

  const handleExport = (adr: ADR) => {
    const md = exportAdrToMarkdown(adr);
    downloadFile(`${adr.id.toLowerCase()}-${adr.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`, md);
  };

  return (
    <div className="page-wrapper animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-active font-mono">Architecture Governance</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Michael Nygard Lightweight Standard</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Architecture Decision Records (ADRs)</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Document immutable architectural decisions, constraints, options considered, and trade-offs.
          </p>
        </div>

        <button className="btn btn-primary" onClick={handleCreateNew}>
          <Plus size={16} />
          <span>New Decision Record</span>
        </button>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {['all', 'accepted', 'proposed', 'superseded'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`btn ${filterStatus === st ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', textTransform: 'capitalize' }}
          >
            {st} ({st === 'all' ? adrs.length : adrs.filter((a) => a.status.toLowerCase() === st).length})
          </button>
        ))}
      </div>

      {/* ADR Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.5rem' }}>
        {filteredAdrs.map((adr) => {
          const statusClass =
            adr.status === 'Accepted'
              ? 'badge-active'
              : adr.status === 'Proposed'
              ? 'badge-next'
              : 'badge-locked';

          return (
            <div
              key={adr.id}
              className="glass-panel"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span className="badge font-mono" style={{ fontWeight: 800 }}>{adr.id}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className={`badge ${statusClass}`}>{adr.status}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{adr.date}</span>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem', lineHeight: '1.4' }}>
                  {adr.title}
                </h3>

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                    Context
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }} className="truncate">
                    {adr.context}
                  </p>
                </div>

                <div style={{ marginBottom: '1rem', padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-card)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-color)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                    Decision
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                    {adr.decision}
                  </p>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                    Architectural Trade-Off
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {adr.tradeoffs}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-card)', paddingTop: '1rem' }}>
                <button className="btn btn-secondary" onClick={() => handleExport(adr)} style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}>
                  <Download size={14} />
                  <span>Export MD</span>
                </button>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-ghost" onClick={() => handleEdit(adr)} style={{ padding: '0.4rem', fontSize: '0.75rem' }}>
                    <Edit3 size={15} />
                  </button>
                  <button
                    className="btn btn-ghost"
                    onClick={() => {
                      if (confirm(`Delete ${adr.id}?`)) deleteAdr(adr.id);
                    }}
                    style={{ padding: '0.4rem', color: '#f87171' }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && <AdrModal adr={activeAdr} onClose={() => setShowModal(false)} />}
    </div>
  );
};

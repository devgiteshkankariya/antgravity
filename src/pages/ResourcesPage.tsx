import React, { useState } from 'react';
import { useStorage } from '../storage/storageContext';
import { ResourceItem } from '../types';
import {
  Library,
  ExternalLink,
  Search,
  Plus,
  AlertTriangle,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Filter,
  Save,
  X
} from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const { resources, saveResource } = useStorage();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [editingResource, setEditingResource] = useState<ResourceItem | null>(null);

  const filteredResources = resources.filter((res) => {
    if (typeFilter !== 'all' && res.type !== typeFilter) return false;
    if (
      searchTerm &&
      !res.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !res.topic.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !res.provider.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingResource) return;
    await saveResource(editingResource);
    setEditingResource(null);
  };

  return (
    <div className="page-wrapper animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-active font-mono">Replaceable Curated Metadata</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Official Documentation & Interactive Labs</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Resource Hub & Freshness Index</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            No superficial low-quality content. Only authoritative documentation, official tutorials, and high-signal free labs.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() =>
            setEditingResource({
              id: `res-custom-${Date.now()}`,
              milestoneId: 'w1',
              topic: 'Custom Learning',
              title: '',
              provider: '',
              url: 'https://',
              type: 'quick',
              estimatedMinutes: 20,
              isFree: true,
              lastReviewed: new Date().toISOString().split('T')[0]
            })
          }
        >
          <Plus size={16} />
          <span>Add Custom Resource</span>
        </button>
      </div>

      {/* Freshness & Quality Philosophy Card */}
      <div
        className="glass-panel"
        style={{
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🟢</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>QUICK RESOURCE</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>10–20 min high-impact explanation</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🟡</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>DEEP RESOURCE</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>30–90 min thorough architecture guide</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🔴</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>OFFICIAL RESOURCE</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Primary vendor documentation</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🧪</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>PRACTICAL LAB</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Hands-on code exercise or sandbox</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search resources by topic, title, provider..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2.4rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {['all', 'quick', 'deep', 'official', 'lab'].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`btn ${typeFilter === t ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', textTransform: 'capitalize' }}
            >
              {t === 'all' ? 'All Tiers' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.25rem' }}>
        {filteredResources.map((res) => {
          const typeBadge =
            res.type === 'quick' ? 'badge-active' : res.type === 'deep' ? 'badge-next' : res.type === 'official' ? 'badge-completed' : 'badge';

          // Freshness calculation (flag if > 180 days)
          const lastDate = new Date(res.lastReviewed);
          const now = new Date();
          const diffDays = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
          const needsReview = diffDays > 180 || res.statusReviewNotice;

          return (
            <div
              key={res.id}
              className="glass-panel"
              style={{
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: needsReview ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border-card)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <span className={`badge ${typeBadge}`} style={{ fontSize: '0.68rem', textTransform: 'uppercase' }}>
                    {res.type === 'quick' ? '🟢 Quick' : res.type === 'deep' ? '🟡 Deep' : res.type === 'official' ? '🔴 Official' : '🧪 Lab'}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <Clock size={12} />
                    <span>~{res.estimatedMinutes} min</span>
                  </div>
                </div>

                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  {res.title}
                </h3>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                  <strong>Provider:</strong> {res.provider} • <strong>Topic:</strong> {res.topic}
                </div>

                {needsReview ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: '#fbbf24', marginBottom: '0.75rem' }}>
                    <AlertTriangle size={13} />
                    <span>⚠️ Resource needs review (Last checked: {res.lastReviewed})</span>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    <ShieldCheck size={13} color="#34d399" />
                    <span>Verified Fresh: {res.lastReviewed}</span>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-card)', paddingTop: '0.75rem' }}>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                  style={{ padding: '0.35rem 0.85rem', fontSize: '0.75rem' }}
                >
                  <span>Open Resource</span>
                  <ExternalLink size={12} />
                </a>

                <button
                  className="btn btn-ghost"
                  onClick={() => setEditingResource(res)}
                  style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                >
                  Edit Metadata
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit/Add Resource Modal */}
      {editingResource && (
        <div className="modal-overlay" onClick={() => setEditingResource(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-card)', paddingBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Edit Resource Metadata</h3>
              <button className="btn btn-ghost" onClick={() => setEditingResource(null)} style={{ padding: '0.35rem' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  Title
                </label>
                <input
                  type="text"
                  value={editingResource.title}
                  onChange={(e) => setEditingResource({ ...editingResource, title: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    Provider
                  </label>
                  <input
                    type="text"
                    value={editingResource.provider}
                    onChange={(e) => setEditingResource({ ...editingResource, provider: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    Topic
                  </label>
                  <input
                    type="text"
                    value={editingResource.topic}
                    onChange={(e) => setEditingResource({ ...editingResource, topic: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  URL
                </label>
                <input
                  type="url"
                  value={editingResource.url}
                  onChange={(e) => setEditingResource({ ...editingResource, url: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    Resource Type
                  </label>
                  <select
                    value={editingResource.type}
                    onChange={(e) => setEditingResource({ ...editingResource, type: e.target.value as any })}
                  >
                    <option value="quick">🟢 Quick (10–20 min)</option>
                    <option value="deep">🟡 Deep (30–90 min)</option>
                    <option value="official">🔴 Official Docs</option>
                    <option value="lab">🧪 Practical Lab</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    Est. Minutes
                  </label>
                  <input
                    type="number"
                    value={editingResource.estimatedMinutes}
                    onChange={(e) => setEditingResource({ ...editingResource, estimatedMinutes: parseInt(e.target.value) || 20 })}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  Last Reviewed Date
                </label>
                <input
                  type="date"
                  value={editingResource.lastReviewed}
                  onChange={(e) => setEditingResource({ ...editingResource, lastReviewed: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid var(--border-card)', paddingTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setEditingResource(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} />
                  <span>Save to Local DB</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

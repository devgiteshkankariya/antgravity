import React, { useState } from 'react';
import { X, Save, Tag, Plus, Calendar, Clock, FileText } from 'lucide-react';
import { PersonalNote } from '../types';
import { formatNoteDate } from '../utils/dateFormatter';

interface NoteEditorModalProps {
  note?: PersonalNote | null;
  onClose: () => void;
  onSave: (note: PersonalNote) => Promise<void>;
}

const COMMON_TAGS = [
  'TypeScript',
  'Node.js',
  'AWS',
  'System Design',
  'Architecture',
  'Interview',
  'Learning',
  'Commands',
  'Project',
  'Ideas',
  'General'
];

export const NoteEditorModal: React.FC<NoteEditorModalProps> = ({ note, onClose, onSave }) => {
  const isEditing = Boolean(note && note.id);
  const now = new Date().toISOString();

  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [tags, setTags] = useState<string[]>(note?.tags || []);
  const [customTagInput, setCustomTagInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Created date is immutable if editing, or today if new
  const createdDateStr = note?.createdAt || now;
  // Updated date represents when saved (today)
  const updatedDateStr = now;

  const handleToggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleAddCustomTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    const trimmed = customTagInput.trim();
    if (!trimmed) return;
    if (!tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setCustomTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      const noteToSave: PersonalNote = {
        id: note?.id || '',
        title: title.trim(),
        content: content.trim(),
        tags: tags,
        createdAt: note?.createdAt || now,
        updatedAt: now
      };

      await onSave(noteToSave);
      onClose();
    } catch (err: any) {
      console.error('Failed to save note:', err);
      setError(err?.message || 'Failed to save note.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '720px',
          padding: '2rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-card-hover)',
          borderRadius: 'var(--radius-xl)'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border-card)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '8px',
                background: 'rgba(59, 130, 246, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-color)'
              }}
            >
              <FileText size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.01em' }}>
                {isEditing ? 'EDIT NOTE' : 'NEW NOTE'}
              </h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {isEditing ? 'Update note details and contents' : 'Capture ideas, commands, architecture concepts, or interview notes'}
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onClose}
            style={{ padding: '0.4rem', color: 'var(--text-muted)' }}
            disabled={isSaving}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div
            style={{
              padding: '0.75rem 1rem',
              marginBottom: '1.25rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              fontSize: '0.875rem'
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Title Field */}
          <div>
            <label
              htmlFor="note-title"
              style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                marginBottom: '0.4rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              Title <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              id="note-title"
              type="text"
              placeholder="e.g. TypeScript Generics"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError(null);
              }}
              required
              autoFocus
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                padding: '0.7rem 0.9rem'
              }}
            />
          </div>

          {/* Tags / Categories (Optional) */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.4rem'
              }}
            >
              <label
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Tag size={13} />
                <span>Categories / Tags (Optional)</span>
              </label>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {tags.length} selected
              </span>
            </div>

            {/* Selected tags badges */}
            {tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.6rem' }}>
                {tags.map((t) => (
                  <span
                    key={t}
                    className="badge badge-active"
                    style={{
                      padding: '0.25rem 0.6rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <span>{t}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(t)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        lineHeight: 1
                      }}
                      aria-label={`Remove tag ${t}`}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Common tags clickable suggestions */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.6rem' }}>
              {COMMON_TAGS.map((t) => {
                const isSelected = tags.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleToggleTag(t)}
                    className="badge"
                    style={{
                      cursor: 'pointer',
                      border: isSelected ? '1px solid var(--accent-color)' : '1px solid var(--border-card)',
                      background: isSelected ? 'var(--accent-glow)' : 'rgba(255, 255, 255, 0.03)',
                      color: isSelected ? 'var(--text-accent)' : 'var(--text-secondary)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {t}
                  </button>
                );
              })}
            </div>

            {/* Custom Tag Input */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Or type a custom tag and press Enter..."
                value={customTagInput}
                onChange={(e) => setCustomTagInput(e.target.value)}
                onKeyDown={handleAddCustomTag}
                style={{ fontSize: '0.825rem', padding: '0.45rem 0.75rem' }}
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleAddCustomTag}
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
              >
                <Plus size={14} />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Content Field */}
          <div>
            <label
              htmlFor="note-content"
              style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                marginBottom: '0.4rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              Content
            </label>
            <textarea
              id="note-content"
              rows={9}
              placeholder="Write your notes here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                fontSize: '0.9rem',
                lineHeight: '1.6',
                resize: 'vertical',
                minHeight: '180px',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Automatic Date Information (Read-Only) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-card)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={15} color="var(--text-muted)" />
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                  Created
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  {formatNoteDate(createdDateStr)}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={15} color="var(--text-muted)" />
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                  Updated
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  {formatNoteDate(updatedDateStr)}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '0.75rem',
              marginTop: '0.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-card)'
            }}
          >
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSaving}
            >
              <Save size={16} />
              <span>{isEditing ? 'Save Changes' : 'Save Note'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

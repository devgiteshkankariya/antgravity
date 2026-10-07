import React from 'react';
import {
  X,
  Edit3,
  Trash2,
  Calendar,
  Clock,
  Tag,
  ArrowLeft,
  Copy,
  Check
} from 'lucide-react';
import { PersonalNote } from '../types';
import { formatNoteDate } from '../utils/dateFormatter';

interface NoteViewModalProps {
  note: PersonalNote;
  onClose: () => void;
  onEdit: (note: PersonalNote) => void;
  onDelete: (note: PersonalNote) => void;
}

export const NoteViewModal: React.FC<NoteViewModalProps> = ({
  note,
  onClose,
  onEdit,
  onDelete
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyContent = () => {
    navigator.clipboard.writeText(note.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '780px',
          padding: '2rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-card-hover)',
          borderRadius: 'var(--radius-xl)'
        }}
      >
        {/* Top Navigation & Action Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border-card)',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}
        >
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onClose}
            style={{ padding: '0.4rem 0.75rem', gap: '0.4rem', color: 'var(--text-secondary)' }}
          >
            <ArrowLeft size={16} />
            <span>Back to Notes</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCopyContent}
              style={{ padding: '0.45rem 0.8rem', fontSize: '0.8rem' }}
              title="Copy note text to clipboard"
            >
              {copied ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onEdit(note)}
              style={{ padding: '0.45rem 0.8rem', fontSize: '0.8rem' }}
            >
              <Edit3 size={14} />
              <span>Edit</span>
            </button>

            <button
              type="button"
              className="btn"
              onClick={() => onDelete(note)}
              style={{
                padding: '0.45rem 0.8rem',
                fontSize: '0.8rem',
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#f87171',
                border: '1px solid rgba(239, 68, 68, 0.3)'
              }}
            >
              <Trash2 size={14} />
              <span>Delete</span>
            </button>

            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
              style={{ padding: '0.4rem', marginLeft: '0.25rem', color: 'var(--text-muted)' }}
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Note Title */}
        <div style={{ marginBottom: '1rem' }}>
          <h1
            style={{
              fontSize: '1.65rem',
              fontWeight: 800,
              lineHeight: '1.3',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '0.75rem'
            }}
          >
            {note.title}
          </h1>

          {/* Tags */}
          {note.tags && note.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="badge badge-active"
                  style={{
                    padding: '0.25rem 0.65rem',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}
                >
                  <Tag size={12} />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          )}

          {/* Metadata bar: Created & Updated Dates */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              flexWrap: 'wrap',
              padding: '0.6rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-card)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={14} color="var(--text-muted)" />
              <span>Created:</span>
              <strong style={{ color: 'var(--text-secondary)' }}>{formatNoteDate(note.createdAt)}</strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={14} color="var(--text-muted)" />
              <span>Updated:</span>
              <strong style={{ color: 'var(--text-secondary)' }}>{formatNoteDate(note.updatedAt)}</strong>
            </div>
          </div>
        </div>

        {/* Full Note Content */}
        <div
          style={{
            marginTop: '1.5rem',
            padding: '1.25rem 1.5rem',
            background: 'rgba(10, 14, 23, 0.5)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-lg)',
            minHeight: '220px',
            lineHeight: '1.7',
            fontSize: '0.95rem',
            color: 'var(--text-primary)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontFamily: 'inherit'
          }}
        >
          {note.content || (
            <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
              No content entered for this note.
            </span>
          )}
        </div>

        {/* Bottom Back Button */}
        <div
          style={{
            marginTop: '1.75rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-card)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}
        >
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            style={{ padding: '0.5rem 1rem' }}
          >
            <ArrowLeft size={16} />
            <span>Back to Notes</span>
          </button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onEdit(note)}
            >
              <Edit3 size={15} />
              <span>Edit Note</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

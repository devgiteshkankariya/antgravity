import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { PersonalNote } from '../types';

interface DeleteNoteConfirmModalProps {
  note: PersonalNote;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  isDeleting?: boolean;
}

export const DeleteNoteConfirmModal: React.FC<DeleteNoteConfirmModalProps> = ({
  note,
  onConfirm,
  onCancel,
  isDeleting = false
}) => {
  return (
    <div className="modal-overlay animate-fade-in" onClick={onCancel}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '460px',
          padding: '1.75rem',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          background: 'var(--bg-secondary)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f87171'
              }}
            >
              <AlertTriangle size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Delete Note
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Confirmation required
              </p>
            </div>
          </div>
          <button
            className="btn btn-ghost"
            onClick={onCancel}
            style={{ padding: '0.35rem', color: 'var(--text-muted)' }}
            disabled={isDeleting}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.75rem', lineHeight: '1.5' }}>
            Are you sure you want to delete this note?
          </p>
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-card)',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              fontWeight: 600
            }}
          >
            {note.title}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn"
            onClick={onConfirm}
            disabled={isDeleting}
            style={{
              background: '#dc2626',
              color: '#ffffff',
              boxShadow: '0 2px 10px -2px rgba(220, 38, 38, 0.4)'
            }}
          >
            <Trash2 size={16} />
            <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

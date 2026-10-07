import React, { useState, useMemo } from 'react';
import { useStorage } from '../storage/storageContext';
import { PersonalNote } from '../types';
import { formatNoteDate } from '../utils/dateFormatter';
import { NoteEditorModal } from '../components/NoteEditorModal';
import { NoteViewModal } from '../components/NoteViewModal';
import { DeleteNoteConfirmModal } from '../components/DeleteNoteConfirmModal';
import {
  FileText,
  Plus,
  Search,
  ArrowUpDown,
  Tag,
  Calendar,
  Clock,
  Edit3,
  Trash2,
  X
} from 'lucide-react';

type SortOption = 'newest' | 'updated' | 'oldest' | 'alphabetical';

export const NotesPage: React.FC = () => {
  const { personalNotes, saveNote, deleteNote } = useStorage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Modals
  const [viewingNote, setViewingNote] = useState<PersonalNote | null>(null);
  const [editingNote, setEditingNote] = useState<PersonalNote | null | undefined>(undefined);
  const [deletingNote, setDeletingNote] = useState<PersonalNote | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Collect all unique tags across notes
  const availableTags = useMemo(() => {
    const set = new Set<string>();
    personalNotes.forEach((n) => {
      n.tags?.forEach((t) => set.add(t));
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [personalNotes]);

  // Filter and sort notes
  const filteredAndSortedNotes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    // 1. Filter
    const filtered = personalNotes.filter((note) => {
      // Tag filter
      if (selectedTag !== 'all') {
        if (!note.tags || !note.tags.includes(selectedTag)) {
          return false;
        }
      }

      // Search query filter: check title, content, and tags
      if (q) {
        const titleMatch = note.title.toLowerCase().includes(q);
        const contentMatch = note.content.toLowerCase().includes(q);
        const tagMatch = note.tags?.some((t) => t.toLowerCase().includes(q));
        if (!titleMatch && !contentMatch && !tagMatch) {
          return false;
        }
      }

      return true;
    });

    // 2. Sort
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest': {
          const timeA = new Date(a.createdAt || 0).getTime();
          const timeB = new Date(b.createdAt || 0).getTime();
          return timeB - timeA;
        }
        case 'updated': {
          const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime();
          const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime();
          return timeB - timeA;
        }
        case 'oldest': {
          const timeA = new Date(a.createdAt || 0).getTime();
          const timeB = new Date(b.createdAt || 0).getTime();
          return timeA - timeB;
        }
        case 'alphabetical': {
          return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
        }
        default:
          return 0;
      }
    });
  }, [personalNotes, searchQuery, selectedTag, sortBy]);

  // Handlers
  const handleOpenCreateModal = () => {
    setEditingNote(null); // null = new note
  };

  const handleOpenEditModal = (note: PersonalNote) => {
    setViewingNote(null);
    setEditingNote(note);
  };

  const handleOpenDeleteModal = (note: PersonalNote) => {
    setDeletingNote(note);
  };

  const handleConfirmDelete = async () => {
    if (!deletingNote) return;
    try {
      setIsDeleting(true);
      await deleteNote(deletingNote.id);
      if (viewingNote?.id === deletingNote.id) {
        setViewingNote(null);
      }
      setDeletingNote(null);
    } catch (err) {
      console.error('Failed to delete note:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveNote = async (noteToSave: PersonalNote) => {
    const saved = await saveNote(noteToSave);
    // If we were viewing the note that just got edited, update viewing state
    if (viewingNote && viewingNote.id === saved.id) {
      setViewingNote(saved);
    }
  };

  return (
    <div className="page-wrapper animate-fade-in">
      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.75rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-active font-mono" style={{ textTransform: 'uppercase' }}>
              Personal Knowledge
            </span>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Independent Vault
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Notes
            </h1>
            <span
              style={{
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                fontWeight: 600
              }}
            >
              Total Notes: {personalNotes.length}
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginTop: '0.2rem' }}>
            Personal reference repository for concepts, commands, architecture decisions, and interview prep.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleOpenCreateModal}
          style={{ padding: '0.6rem 1.25rem', fontWeight: 600 }}
        >
          <Plus size={18} />
          <span>New Note</span>
        </button>
      </div>

      {/* Search, Filter & Sort Controls */}
      <div
        className="glass-panel"
        style={{
          padding: '1.25rem',
          marginBottom: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap'
          }}
        >
          {/* Live Search Input */}
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '0.85rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }}
            />
            <input
              type="text"
              placeholder="Search notes by title, content, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                paddingLeft: '2.5rem',
                paddingRight: searchQuery ? '2.5rem' : '1rem',
                fontSize: '0.9rem',
                height: '42px'
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '0.2rem'
                }}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <ArrowUpDown size={14} />
              <span>Sort by:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              style={{
                width: 'auto',
                minWidth: '160px',
                height: '42px',
                fontSize: '0.875rem',
                padding: '0.45rem 0.85rem',
                cursor: 'pointer'
              }}
            >
              <option value="newest">Newest created</option>
              <option value="updated">Recently updated</option>
              <option value="oldest">Oldest</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Tag Filter Pills */}
        {availableTags.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Filter Tag:
            </span>
            <button
              type="button"
              onClick={() => setSelectedTag('all')}
              className="badge"
              style={{
                cursor: 'pointer',
                border: selectedTag === 'all' ? '1px solid var(--accent-color)' : '1px solid var(--border-card)',
                background: selectedTag === 'all' ? 'var(--accent-glow)' : 'rgba(255, 255, 255, 0.03)',
                color: selectedTag === 'all' ? 'var(--text-accent)' : 'var(--text-secondary)'
              }}
            >
              All ({personalNotes.length})
            </button>
            {availableTags.map((tag) => {
              const count = personalNotes.filter((n) => n.tags?.includes(tag)).length;
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className="badge"
                  style={{
                    cursor: 'pointer',
                    border: isSelected ? '1px solid var(--accent-color)' : '1px solid var(--border-card)',
                    background: isSelected ? 'var(--accent-glow)' : 'rgba(255, 255, 255, 0.03)',
                    color: isSelected ? 'var(--text-accent)' : 'var(--text-secondary)'
                  }}
                >
                  <Tag size={11} />
                  <span>{tag} ({count})</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Notes Dashboard Cards Grid */}
      {filteredAndSortedNotes.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {filteredAndSortedNotes.map((note) => {
            return (
              <div
                key={note.id}
                className="glass-panel"
                onClick={() => setViewingNote(note)}
                style={{
                  padding: '1.4rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  position: 'relative',
                  minHeight: '210px',
                  border: '1px solid var(--border-card)',
                  transition: 'transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = 'var(--border-accent)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-card)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-subtle)';
                }}
              >
                <div>
                  {/* Top card bar: Tags & Quick Actions */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      marginBottom: '0.65rem',
                      gap: '0.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', flex: 1 }}>
                      {note.tags && note.tags.length > 0 ? (
                        note.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="badge badge-active"
                            style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem' }}
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="badge" style={{ fontSize: '0.72rem', opacity: 0.6 }}>
                          Note
                        </span>
                      )}
                      {note.tags && note.tags.length > 3 && (
                        <span className="badge" style={{ fontSize: '0.72rem' }}>
                          +{note.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action buttons on card hover */}
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => handleOpenEditModal(note)}
                        style={{ padding: '0.3rem', color: 'var(--text-muted)' }}
                        title="Edit note"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => handleOpenDeleteModal(note)}
                        style={{ padding: '0.3rem', color: '#f87171' }}
                        title="Delete note"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      marginBottom: '0.6rem',
                      lineHeight: '1.4',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {note.title}
                  </h3>

                  {/* Content Preview (Short Preview) */}
                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.55',
                      marginBottom: '1rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {note.content || 'No content.'}
                  </p>
                </div>

                {/* Bottom Metadata: Created & Updated Dates */}
                <div
                  style={{
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-card)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={13} color="var(--text-muted)" />
                    <span>Created:</span>
                    <strong style={{ color: 'var(--text-secondary)' }}>
                      {formatNoteDate(note.createdAt)}
                    </strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Clock size={13} color="var(--text-muted)" />
                    <span>Updated:</span>
                    <strong style={{ color: 'var(--text-secondary)' }}>
                      {formatNoteDate(note.updatedAt)}
                    </strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div
          className="glass-panel"
          style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--radius-xl)'
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'rgba(59, 130, 246, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-color)',
              marginBottom: '1.25rem'
            }}
          >
            <FileText size={32} />
          </div>

          {personalNotes.length === 0 ? (
            <>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                No notes yet
              </h2>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                  maxWidth: '420px',
                  marginBottom: '1.75rem',
                  lineHeight: '1.6'
                }}
              >
                Capture important concepts, ideas and learning notes here.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleOpenCreateModal}
                style={{ padding: '0.7rem 1.5rem', fontWeight: 600 }}
              >
                <Plus size={18} />
                <span>Create Your First Note</span>
              </button>
            </>
          ) : (
            <>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                No notes matching your criteria
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Try adjusting your search terms or clearing the active tag filter.
              </p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag('all');
                }}
              >
                Clear Filters
              </button>
            </>
          )}
        </div>
      )}

      {/* Note View Modal */}
      {viewingNote && (
        <NoteViewModal
          note={viewingNote}
          onClose={() => setViewingNote(null)}
          onEdit={(note) => handleOpenEditModal(note)}
          onDelete={(note) => {
            setViewingNote(null);
            handleOpenDeleteModal(note);
          }}
        />
      )}

      {/* Note Editor Modal (Create or Edit) */}
      {editingNote !== undefined && (
        <NoteEditorModal
          note={editingNote}
          onClose={() => setEditingNote(undefined)}
          onSave={handleSaveNote}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingNote && (
        <DeleteNoteConfirmModal
          note={deletingNote}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingNote(null)}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

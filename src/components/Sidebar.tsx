import React from 'react';
import {
  LayoutDashboard,
  Target,
  Map,
  Compass,
  Cpu,
  FolderGit2,
  FileCode2,
  Library,
  Briefcase,
  Award,
  Trophy,
  BarChart3,
  Sliders,
  DatabaseBackup,
  Layers,
  FileText
} from 'lucide-react';

export type NavigationTab =
  | 'dashboard'
  | 'mission'
  | 'roadmap'
  | 'paths'
  | 'architecture'
  | 'projects'
  | 'adrs'
  | 'notes'
  | 'resources'
  | 'jobhunt'
  | 'saa'
  | 'achievements'
  | 'progress'
  | 'skippup'
  | 'settings'
  | 'backup';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab }) => {
  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'mission', label: "Today's Mission", icon: <Target size={18} />, badge: '60m' },
    { id: 'roadmap', label: 'Roadmap (3 Phases)', icon: <Map size={18} /> },
    { id: 'paths', label: 'Learning Paths', icon: <Compass size={18} /> },
    { id: 'architecture', label: 'System Design', icon: <Cpu size={18} />, badge: '10 Cases' },
    { id: 'projects', label: 'Projects & Code', icon: <FolderGit2 size={18} />, badge: 'Evolving' },
    { id: 'adrs', label: 'ADR Records', icon: <FileCode2 size={18} /> },
    { id: 'notes', label: 'Notes', icon: <FileText size={18} /> },
    { id: 'resources', label: 'Curated Resources', icon: <Library size={18} /> },
    { id: 'jobhunt', label: 'Job Hunt', icon: <Briefcase size={18} />, badge: 'Day 55+' },
    { id: 'saa', label: 'AWS SAA Tracker', icon: <Award size={18} /> },
    { id: 'achievements', label: 'Achievements', icon: <Trophy size={18} /> },
    { id: 'progress', label: 'Progress & Pace', icon: <BarChart3 size={18} /> },
    { id: 'skippup', label: 'Skippup Integration', icon: <Layers size={18} /> },
    { id: 'settings', label: 'Settings & Theme', icon: <Sliders size={18} /> },
    { id: 'backup', label: 'Backup / Restore', icon: <DatabaseBackup size={18} /> }
  ];

  return (
    <aside className="sidebar">
      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-card)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--accent-color), #818cf8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.1rem',
              color: '#ffffff'
            }}
          >
            AQ
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.01em' }}>ARCHITECTURE</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>CAREER QUEST</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem' }}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.6rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'var(--accent-glow)' : 'transparent',
                  border: `1px solid ${isActive ? 'var(--border-accent)' : 'transparent'}`,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                  width: '100%'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: isActive ? 'var(--accent-color)' : 'var(--text-muted)' }}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      padding: '0.1rem 0.45rem',
                      borderRadius: '4px',
                      background: isActive ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.06)',
                      color: isActive ? '#ffffff' : 'var(--text-muted)'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div style={{ padding: '1rem', borderTop: '1px solid var(--border-card)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Local-First DB</span>
          <span style={{ color: '#10b981', fontWeight: 600 }}>● IndexedDB Active</span>
        </div>
      </div>
    </aside>
  );
};

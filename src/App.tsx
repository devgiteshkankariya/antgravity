import React, { useState } from 'react';
import { useStorage } from './storage/storageContext';
import { useTheme } from './hooks/useTheme';
import { Sidebar, NavigationTab } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { MissionRunnerModal } from './components/MissionRunnerModal';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { TodaysMissionPage } from './pages/TodaysMissionPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { LearningPathsPage } from './pages/LearningPathsPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AdrsPage } from './pages/AdrsPage';
import { NotesPage } from './pages/NotesPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { JobHuntPage } from './pages/JobHuntPage';
import { SaaPage } from './pages/SaaPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { ProgressPage } from './pages/ProgressPage';
import { SkippupPage } from './pages/SkippupPage';
import { SettingsPage } from './pages/SettingsPage';
import { BackupRestorePage } from './pages/BackupRestorePage';

export const App: React.FC = () => {
  const { loading } = useStorage();
  useTheme(); // Initializes daily changing / custom theme variables

  const getInitialTab = (): NavigationTab => {
    const path = window.location.pathname.replace(/^\//, '').toLowerCase();
    if (path === 'notes') return 'notes';
    if (
      [
        'mission',
        'roadmap',
        'paths',
        'architecture',
        'projects',
        'adrs',
        'resources',
        'jobhunt',
        'saa',
        'achievements',
        'progress',
        'skippup',
        'settings',
        'backup'
      ].includes(path)
    ) {
      return path as NavigationTab;
    }
    return 'dashboard';
  };

  const [currentTab, setCurrentTab] = useState<NavigationTab>(getInitialTab);
  const [showGlobalMissionRunner, setShowGlobalMissionRunner] = useState(false);

  const handleSelectTab = (tab: NavigationTab) => {
    setCurrentTab(tab);
    const newPath = tab === 'dashboard' ? '/' : `/${tab}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, '', newPath);
    }
  };

  React.useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();
      if (path === 'notes') {
        setCurrentTab('notes');
      } else if (
        [
          'mission',
          'roadmap',
          'paths',
          'architecture',
          'projects',
          'adrs',
          'resources',
          'jobhunt',
          'saa',
          'achievements',
          'progress',
          'skippup',
          'settings',
          'backup'
        ].includes(path)
      ) {
        setCurrentTab(path as NavigationTab);
      } else {
        setCurrentTab('dashboard');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'var(--bg-primary)',
          color: 'var(--text-primary)'
        }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem', animation: 'spin 2s linear infinite' }}>
          🏗️
        </div>
        <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>ARCHITECTURE QUEST</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Opening Local-First IndexedDB Vault...</div>
      </div>
    );
  }

  const renderActivePage = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <DashboardPage
            onNavigate={(tab) => handleSelectTab(tab)}
            onNavigateToMilestone={(id) => handleSelectTab('roadmap')}
          />
        );
      case 'mission':
        return <TodaysMissionPage />;
      case 'roadmap':
        return <RoadmapPage />;
      case 'paths':
        return <LearningPathsPage />;
      case 'architecture':
        return <ArchitecturePage />;
      case 'projects':
        return <ProjectsPage />;
      case 'adrs':
        return <AdrsPage />;
      case 'notes':
        return <NotesPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'jobhunt':
        return <JobHuntPage />;
      case 'saa':
        return <SaaPage />;
      case 'achievements':
        return <AchievementsPage />;
      case 'progress':
        return <ProgressPage />;
      case 'skippup':
        return <SkippupPage />;
      case 'settings':
        return <SettingsPage />;
      case 'backup':
        return <BackupRestorePage />;
      default:
        return (
          <DashboardPage
            onNavigate={(tab) => handleSelectTab(tab)}
            onNavigateToMilestone={(id) => handleSelectTab('roadmap')}
          />
        );
    }
  };

  return (
    <div className="app-container">
      {/* Fixed Left Navigation Sidebar */}
      <Sidebar currentTab={currentTab} onSelectTab={handleSelectTab} />

      {/* Main Content Area */}
      <div className="main-content">
        <Navbar onOpenMissionRunner={() => setShowGlobalMissionRunner(true)} />
        <main>{renderActivePage()}</main>
      </div>

      {/* Global Mission Focus Runner Modal */}
      {showGlobalMissionRunner && (
        <MissionRunnerModal onClose={() => setShowGlobalMissionRunner(false)} />
      )}
    </div>
  );
};

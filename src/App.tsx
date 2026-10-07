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
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [showGlobalMissionRunner, setShowGlobalMissionRunner] = useState(false);

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
            onNavigate={(tab) => setCurrentTab(tab)}
            onNavigateToMilestone={(id) => setCurrentTab('roadmap')}
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
            onNavigate={(tab) => setCurrentTab(tab)}
            onNavigateToMilestone={(id) => setCurrentTab('roadmap')}
          />
        );
    }
  };

  return (
    <div className="app-container">
      {/* Fixed Left Navigation Sidebar */}
      <Sidebar currentTab={currentTab} onSelectTab={(tab) => setCurrentTab(tab)} />

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

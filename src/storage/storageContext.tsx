import React, { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react';
import {
  UserProfile,
  Milestone,
  ADR,
  ProjectEntry,
  ResourceItem,
  JobApplication,
  SaaTopic,
  SystemDesignCase,
  Achievement,
  DailyArchitectureProgress,
  PersonalNote
} from '../types';
import { questDB, AppDataBackup } from './indexedDb';
import {
  INITIAL_USER_PROFILE,
  INITIAL_ADRS,
  INITIAL_PROJECTS,
  INITIAL_SAA_TOPICS,
  INITIAL_ACHIEVEMENTS,
  INITIAL_JOB_APPLICATIONS,
  INITIAL_PERSONAL_NOTES
} from '../data/initialData';
import { INITIAL_MILESTONES } from '../curriculum/phases';
import { SYSTEM_DESIGN_CASES } from '../curriculum/systemDesign';
import { INITIAL_RESOURCES } from '../resources/resourcesData';
import { INITIAL_ARCHITECTURE_LESSONS } from '../curriculum/dailyArchitecture';

interface StorageContextType {
  loading: boolean;
  profile: UserProfile;
  milestones: Milestone[];
  adrs: ADR[];
  projects: ProjectEntry[];
  resources: ResourceItem[];
  jobApplications: JobApplication[];
  saaTopics: SaaTopic[];
  systemDesign: SystemDesignCase[];
  achievements: Achievement[];
  dailyHistory: { date: string; tasksCompleted: number; xpEarned: number }[];
  architectureLessons: DailyArchitectureProgress[];
  personalNotes: PersonalNote[];

  // Active state
  activeMilestone: Milestone | undefined;
  nextMilestone: Milestone | undefined;
  activeArchitectureLesson: DailyArchitectureProgress | undefined;

  // Actions
  completeTask: (milestoneId: string, taskId: string, completed: boolean) => Promise<void>;
  updateArchitectureStep: (
    lessonId: string,
    step: 'learn' | 'practice' | 'design' | 'explain' | 'apply',
    completed: boolean,
    answerOrNote?: string
  ) => Promise<void>;
  saveArchitectureDetails: (
    lessonId: string,
    updates: Partial<DailyArchitectureProgress>
  ) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  saveAdr: (adr: ADR) => Promise<void>;
  deleteAdr: (id: string) => Promise<void>;
  saveProject: (project: ProjectEntry) => Promise<void>;
  saveResource: (resource: ResourceItem) => Promise<void>;
  saveJobApplication: (app: JobApplication) => Promise<void>;
  deleteJobApplication: (id: string) => Promise<void>;
  updateSaaTopic: (id: string, updates: Partial<SaaTopic>) => Promise<void>;
  updateSystemDesignCase: (id: string, updates: Partial<SystemDesignCase>) => Promise<void>;
  unlockAchievement: (id: string) => Promise<void>;
  saveNote: (note: PersonalNote) => Promise<PersonalNote>;
  deleteNote: (id: string) => Promise<void>;

  // Backup & Reset
  exportBackup: () => Promise<AppDataBackup>;
  importBackup: (backup: AppDataBackup) => Promise<void>;
  resetToDefaults: () => Promise<void>;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export const StorageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [milestones, setMilestones] = useState<Milestone[]>(INITIAL_MILESTONES);
  const [adrs, setAdrs] = useState<ADR[]>(INITIAL_ADRS);
  const [projects, setProjects] = useState<ProjectEntry[]>(INITIAL_PROJECTS);
  const [resources, setResources] = useState<ResourceItem[]>(INITIAL_RESOURCES);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>(INITIAL_JOB_APPLICATIONS);
  const [saaTopics, setSaaTopics] = useState<SaaTopic[]>(INITIAL_SAA_TOPICS);
  const [systemDesign, setSystemDesign] = useState<SystemDesignCase[]>(SYSTEM_DESIGN_CASES);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [dailyHistory, setDailyHistory] = useState<{ date: string; tasksCompleted: number; xpEarned: number }[]>([]);
  const [architectureLessons, setArchitectureLessons] = useState<DailyArchitectureProgress[]>(INITIAL_ARCHITECTURE_LESSONS);
  const [personalNotes, setPersonalNotes] = useState<PersonalNote[]>(INITIAL_PERSONAL_NOTES);

  // Load from IndexedDB on initial mount
  useEffect(() => {
    const init = async () => {
      try {
        const data = await questDB.initializeDatabase();
        if (data.profile && data.profile.name) setProfile(data.profile);
        if (data.milestones && data.milestones.length > 0) setMilestones(data.milestones);
        if (data.adrs && data.adrs.length > 0) setAdrs(data.adrs);
        if (data.projects && data.projects.length > 0) setProjects(data.projects);
        if (data.resources && data.resources.length > 0) setResources(data.resources);
        if (data.jobApplications && data.jobApplications.length > 0) setJobApplications(data.jobApplications);
        if (data.saaTopics && data.saaTopics.length > 0) setSaaTopics(data.saaTopics);
        if (data.systemDesign && data.systemDesign.length > 0) setSystemDesign(data.systemDesign);
        if (data.achievements && data.achievements.length > 0) setAchievements(data.achievements);
        if (data.dailyHistory) setDailyHistory(data.dailyHistory);
        if (data.architectureLessons && data.architectureLessons.length > 0) {
          setArchitectureLessons(data.architectureLessons);
        }
        if (data.personalNotes && data.personalNotes.length > 0) {
          setPersonalNotes(data.personalNotes);
        }
      } catch (err) {
        console.error('Failed to initialize IndexedDB, defaulting to initial state:', err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const activeMilestone = useMemo(() => {
    return milestones.find((m) => m.status === 'active') || milestones[0] || INITIAL_MILESTONES[0];
  }, [milestones]);

  const nextMilestone = useMemo(() => {
    return milestones.find((m) => m.status === 'next');
  }, [milestones]);

  const activeArchitectureLesson = useMemo(() => {
    const list = architectureLessons.length > 0 ? architectureLessons : INITIAL_ARCHITECTURE_LESSONS;
    if (!activeMilestone) return list[0];
    return list.find((l) => l.milestoneId === activeMilestone.id) || list[0];
  }, [architectureLessons, activeMilestone]);

  // Complete a task with anti-farming protection and streak maintenance
  const completeTask = async (milestoneId: string, taskId: string, completed: boolean) => {
    const today = new Date().toISOString().split('T')[0];
    const milestoneIndex = milestones.findIndex((m) => m.id === milestoneId);
    if (milestoneIndex === -1) return;

    const milestone = milestones[milestoneIndex];
    const taskIndex = milestone.tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) return;

    const targetTask = milestone.tasks[taskIndex];
    const isFirstTimeCompleted = !profile.completedTaskIds.includes(taskId) && completed;

    // Calculate XP to award
    let xpGain = 0;
    let newCompletedTaskIds = [...profile.completedTaskIds];

    if (isFirstTimeCompleted) {
      xpGain = targetTask.xp;
      newCompletedTaskIds.push(taskId);
    }

    // Update tasks
    const updatedTasks = [...milestone.tasks];
    updatedTasks[taskIndex] = { ...targetTask, completed };

    // Check if entire milestone is now finished
    const allTasksCompleted = updatedTasks.every((t) => t.completed);
    let updatedMilestoneStatus = milestone.status;
    let milestoneXpGain = 0;

    if (allTasksCompleted && milestone.status !== 'completed') {
      updatedMilestoneStatus = 'completed';
      milestoneXpGain = milestone.xpValue;
    }

    const updatedMilestone: Milestone = {
      ...milestone,
      tasks: updatedTasks,
      status: updatedMilestoneStatus,
      completedAt: allTasksCompleted ? today : milestone.completedAt
    };

    let updatedMilestones = [...milestones];
    updatedMilestones[milestoneIndex] = updatedMilestone;

    // If milestone was just completed, unlock the next milestone!
    if (allTasksCompleted && milestone.status !== 'completed') {
      const nextIdx = updatedMilestones.findIndex((m) => m.status === 'next');
      if (nextIdx !== -1) {
        updatedMilestones[nextIdx] = {
          ...updatedMilestones[nextIdx],
          status: 'active',
          unlockedAt: today
        };
        // Also look for the milestone after that and mark as 'next' if it was 'locked' or 'later'
        const subsequentIdx = updatedMilestones.findIndex((m, i) => i > nextIdx && (m.status === 'later' || m.status === 'locked'));
        if (subsequentIdx !== -1) {
          updatedMilestones[subsequentIdx] = {
            ...updatedMilestones[subsequentIdx],
            status: 'next'
          };
        }
      }
    }

    // Update Streak logic
    let newStreak = profile.currentStreak;
    let newLongestStreak = profile.longestStreak;
    let lastDate = profile.lastActivityDate;

    if (completed) {
      if (!lastDate) {
        newStreak = 1;
        newLongestStreak = 1;
      } else if (lastDate === today) {
        // already counted today
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yestStr = yesterday.toISOString().split('T')[0];

        if (lastDate === yestStr) {
          newStreak += 1;
        } else {
          // Missed one or more days, start fresh without harsh punishment
          newStreak = 1;
        }
        if (newStreak > newLongestStreak) {
          newLongestStreak = newStreak;
        }
      }
      lastDate = today;
    }

    const totalXpGain = xpGain + milestoneXpGain;
    const newXp = profile.xp + totalXpGain;
    const newLevel = Math.max(1, Math.floor(newXp / 500) + 1);

    const updatedProfile: UserProfile = {
      ...profile,
      xp: newXp,
      level: newLevel,
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
      lastActivityDate: lastDate,
      streakStartDate: profile.streakStartDate || today,
      completedTaskIds: newCompletedTaskIds
    };

    // Update daily history
    let updatedDailyHistory = [...dailyHistory];
    const todayHistoryIdx = updatedDailyHistory.findIndex((h) => h.date === today);
    if (todayHistoryIdx !== -1) {
      updatedDailyHistory[todayHistoryIdx] = {
        ...updatedDailyHistory[todayHistoryIdx],
        tasksCompleted: updatedDailyHistory[todayHistoryIdx].tasksCompleted + (completed ? 1 : 0),
        xpEarned: updatedDailyHistory[todayHistoryIdx].xpEarned + totalXpGain
      };
    } else {
      updatedDailyHistory.push({
        date: today,
        tasksCompleted: completed ? 1 : 0,
        xpEarned: totalXpGain
      });
    }

    // State update
    setProfile(updatedProfile);
    setMilestones(updatedMilestones);
    setDailyHistory(updatedDailyHistory);

    // Persist to IndexedDB
    await questDB.put('profile', { id: 'main', ...updatedProfile });
    await questDB.putAll('milestones', updatedMilestones);
    await questDB.putAll('dailyHistory', updatedDailyHistory);

    // Check achievements
    if (newCompletedTaskIds.length >= 1) {
      await unlockAchievement('ach-first-task');
    }
    if (newStreak >= 3) {
      await unlockAchievement('ach-streak-3');
    }
    if (newStreak >= 7) {
      await unlockAchievement('ach-streak-7');
    }
    if (updatedMilestones[0].status === 'completed') {
      await unlockAchievement('ach-m1-complete');
    }
    if (updatedMilestones[3] && updatedMilestones[3].status === 'completed') {
      await unlockAchievement('ach-day-28');
    }
    if (updatedMilestones[7] && updatedMilestones[7].status === 'completed') {
      await unlockAchievement('ach-day-56');
    }
    if (updatedMilestones[9] && updatedMilestones[9].status === 'completed') {
      await unlockAchievement('ach-day-70');
    }
    if (updatedMilestones[12] && updatedMilestones[12].status === 'completed') {
      await unlockAchievement('ach-day-90');
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    const updated = { ...profile, ...updates };
    setProfile(updated);
    await questDB.put('profile', { id: 'main', ...updated });
  };

  const saveAdr = async (adr: ADR) => {
    const idx = adrs.findIndex((a) => a.id === adr.id);
    let updated: ADR[];
    if (idx !== -1) {
      updated = [...adrs];
      updated[idx] = adr;
    } else {
      updated = [adr, ...adrs];
    }
    setAdrs(updated);
    await questDB.put('adrs', adr);
  };

  const deleteAdr = async (id: string) => {
    const updated = adrs.filter((a) => a.id !== id);
    setAdrs(updated);
    await questDB.delete('adrs', id);
  };

  const saveProject = async (project: ProjectEntry) => {
    const idx = projects.findIndex((p) => p.id === project.id);
    let updated: ProjectEntry[];
    if (idx !== -1) {
      updated = [...projects];
      updated[idx] = project;
    } else {
      updated = [...projects, project];
    }
    setProjects(updated);
    await questDB.put('projects', project);
  };

  const saveResource = async (resource: ResourceItem) => {
    const idx = resources.findIndex((r) => r.id === resource.id);
    let updated: ResourceItem[];
    if (idx !== -1) {
      updated = [...resources];
      updated[idx] = resource;
    } else {
      updated = [...resources, resource];
    }
    setResources(updated);
    await questDB.put('resources', resource);
  };

  const saveJobApplication = async (app: JobApplication) => {
    const idx = jobApplications.findIndex((j) => j.id === app.id);
    let updated: JobApplication[];
    if (idx !== -1) {
      updated = [...jobApplications];
      updated[idx] = app;
    } else {
      updated = [app, ...jobApplications];
    }
    setJobApplications(updated);
    await questDB.put('jobApplications', app);
  };

  const deleteJobApplication = async (id: string) => {
    const updated = jobApplications.filter((j) => j.id !== id);
    setJobApplications(updated);
    await questDB.delete('jobApplications', id);
  };

  const updateSaaTopic = async (id: string, updates: Partial<SaaTopic>) => {
    const idx = saaTopics.findIndex((s) => s.id === id);
    if (idx === -1) return;
    const updatedTopics = [...saaTopics];
    updatedTopics[idx] = { ...updatedTopics[idx], ...updates };
    setSaaTopics(updatedTopics);
    await questDB.put('saaTopics', updatedTopics[idx]);
  };

  const updateSystemDesignCase = async (id: string, updates: Partial<SystemDesignCase>) => {
    const idx = systemDesign.findIndex((s) => s.id === id);
    if (idx === -1) return;
    const updatedCases = [...systemDesign];
    updatedCases[idx] = { ...updatedCases[idx], ...updates };
    setSystemDesign(updatedCases);
    await questDB.put('systemDesign', updatedCases[idx]);
  };

  const saveNote = async (note: PersonalNote): Promise<PersonalNote> => {
    const idx = personalNotes.findIndex((n) => n.id === note.id);
    const now = new Date().toISOString();
    let updatedNote: PersonalNote;
    let updatedList: PersonalNote[];

    if (idx !== -1) {
      // Preserve original createdAt, update only updatedAt
      updatedNote = {
        ...note,
        createdAt: personalNotes[idx].createdAt || note.createdAt || now,
        updatedAt: now
      };
      updatedList = [...personalNotes];
      updatedList[idx] = updatedNote;
    } else {
      // New note
      const newId = note.id || `note-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      updatedNote = {
        ...note,
        id: newId,
        createdAt: note.createdAt || now,
        updatedAt: now
      };
      updatedList = [updatedNote, ...personalNotes];
    }

    setPersonalNotes(updatedList);
    await questDB.put('personalNotes', updatedNote);
    return updatedNote;
  };

  const deleteNote = async (id: string): Promise<void> => {
    const updated = personalNotes.filter((n) => n.id !== id);
    setPersonalNotes(updated);
    await questDB.delete('personalNotes', id);
  };

  const unlockAchievement = async (id: string) => {
    const ach = achievements.find((a) => a.id === id);
    if (!ach || ach.unlocked) return;

    const updated = achievements.map((a) =>
      a.id === id ? { ...a, unlocked: true, unlockedAt: new Date().toISOString() } : a
    );
    setAchievements(updated);
    await questDB.putAll('achievements', updated);

    // Award bonus XP for achievement
    await updateProfile({
      xp: profile.xp + ach.xpAward,
      achievementsUnlocked: [...profile.achievementsUnlocked, id]
    });
  };

  const updateArchitectureStep = async (
    lessonId: string,
    step: 'learn' | 'practice' | 'design' | 'explain' | 'apply',
    completed: boolean,
    answerOrNote?: string
  ) => {
    const today = new Date().toISOString().split('T')[0];
    const lessonIndex = architectureLessons.findIndex((l) => l.id === lessonId);
    if (lessonIndex === -1) return;

    const currentLesson = architectureLessons[lessonIndex];
    const updatedLesson: DailyArchitectureProgress = { ...currentLesson };

    // Update the specific step boolean or answer
    if (step === 'learn') updatedLesson.learnCompleted = completed;
    if (step === 'practice') updatedLesson.practiceCompleted = completed;
    if (step === 'design') {
      updatedLesson.designCompleted = completed;
      if (answerOrNote !== undefined) updatedLesson.designAnswer = answerOrNote;
    }
    if (step === 'explain') {
      updatedLesson.explainCompleted = completed;
      if (answerOrNote !== undefined) updatedLesson.explainAnswer = answerOrNote;
    }
    if (step === 'apply') {
      updatedLesson.appliedToProject = completed;
      if (answerOrNote !== undefined) updatedLesson.notes = answerOrNote;
    }

    // Anti-farming and XP calculation
    // Learn: +25 XP, Practice: +50 XP, Design: +50 XP, Explain: +25 XP
    // Mission completion bonus: +50 bonus XP when all 4 core steps are completed
    let xpGain = 0;
    const newCompletedTaskIds = [...(profile.completedTaskIds || [])];
    const stepKey = `${lessonId}-${step}`;

    if (completed && step !== 'apply') {
      const stepXpMap: Record<string, number> = {
        learn: 25,
        practice: 50,
        design: 50,
        explain: 25
      };
      const stepXp = stepXpMap[step] || 0;
      if (!newCompletedTaskIds.includes(stepKey)) {
        xpGain += stepXp;
        newCompletedTaskIds.push(stepKey);
      }
    }

    // Check if daily mission is now fully completed
    const allCoreCompleted =
      updatedLesson.learnCompleted &&
      updatedLesson.practiceCompleted &&
      updatedLesson.designCompleted &&
      updatedLesson.explainCompleted;

    const missionBonusKey = `${lessonId}-mission-bonus`;
    if (allCoreCompleted && !newCompletedTaskIds.includes(missionBonusKey)) {
      xpGain += 50; // Mission bonus
      newCompletedTaskIds.push(missionBonusKey);
      updatedLesson.completed = true;
      updatedLesson.completionDate = today;
    }

    // Architecture streak logic
    let newArchStreak = profile.architectureStreak || 0;
    let lastArchDate = profile.lastArchitectureDate;
    let newGeneralStreak = profile.currentStreak;
    let newLongestStreak = profile.longestStreak;
    let lastActivityDate = profile.lastActivityDate;

    if (completed) {
      if (!lastArchDate) {
        newArchStreak = 1;
      } else if (lastArchDate === today) {
        // already counted today
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yestStr = yesterday.toISOString().split('T')[0];
        if (lastArchDate === yestStr) {
          newArchStreak += 1;
        } else {
          newArchStreak = 1;
        }
      }
      lastArchDate = today;

      // Also refresh general streak
      if (!lastActivityDate) {
        newGeneralStreak = 1;
        newLongestStreak = Math.max(newLongestStreak, 1);
      } else if (lastActivityDate === today) {
        // already active today
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yestStr = yesterday.toISOString().split('T')[0];
        if (lastActivityDate === yestStr) {
          newGeneralStreak += 1;
        } else {
          newGeneralStreak = 1;
        }
        if (newGeneralStreak > newLongestStreak) {
          newLongestStreak = newGeneralStreak;
        }
      }
      lastActivityDate = today;
    }

    const newArchXp = (profile.architectureXp || 0) + xpGain;
    const newTotalXp = profile.xp + xpGain;
    const newLevel = Math.max(1, Math.floor(newTotalXp / 500) + 1);

    const updatedProfile: UserProfile = {
      ...profile,
      xp: newTotalXp,
      level: newLevel,
      architectureXp: newArchXp,
      architectureStreak: newArchStreak,
      lastArchitectureDate: lastArchDate,
      currentStreak: newGeneralStreak,
      longestStreak: newLongestStreak,
      lastActivityDate: lastActivityDate,
      completedTaskIds: newCompletedTaskIds
    };

    // Update daily history if XP was earned
    let updatedDailyHistory = [...dailyHistory];
    if (xpGain > 0) {
      const existingHistoryIndex = updatedDailyHistory.findIndex((h) => h.date === today);
      if (existingHistoryIndex !== -1) {
        updatedDailyHistory[existingHistoryIndex] = {
          ...updatedDailyHistory[existingHistoryIndex],
          tasksCompleted: updatedDailyHistory[existingHistoryIndex].tasksCompleted + 1,
          xpEarned: updatedDailyHistory[existingHistoryIndex].xpEarned + xpGain
        };
      } else {
        updatedDailyHistory.push({
          date: today,
          tasksCompleted: 1,
          xpEarned: xpGain
        });
      }
    }

    // Persist to IndexedDB
    await questDB.put('architectureLessons', updatedLesson);
    if (xpGain > 0 || completed) {
      await questDB.put('profile', updatedProfile);
      for (const h of updatedDailyHistory) {
        await questDB.put('dailyHistory', h);
      }
    }

    // Update React states
    const updatedLessons = [...architectureLessons];
    updatedLessons[lessonIndex] = updatedLesson;
    setArchitectureLessons(updatedLessons);
    setProfile(updatedProfile);
    setDailyHistory(updatedDailyHistory);
  };

  const saveArchitectureDetails = async (
    lessonId: string,
    updates: Partial<DailyArchitectureProgress>
  ) => {
    const lessonIndex = architectureLessons.findIndex((l) => l.id === lessonId);
    if (lessonIndex === -1) return;

    const currentLesson = architectureLessons[lessonIndex];
    const updatedLesson: DailyArchitectureProgress = { ...currentLesson, ...updates };

    await questDB.put('architectureLessons', updatedLesson);
    const updatedLessons = [...architectureLessons];
    updatedLessons[lessonIndex] = updatedLesson;
    setArchitectureLessons(updatedLessons);
  };

  const exportBackup = async () => {
    return await questDB.exportBackup();
  };

  const importBackup = async (backup: AppDataBackup) => {
    await questDB.importBackup(backup);
    const data = await questDB.initializeDatabase();
    setProfile(data.profile);
    setMilestones(data.milestones);
    setAdrs(data.adrs);
    setProjects(data.projects);
    setResources(data.resources);
    setJobApplications(data.jobApplications);
    setSaaTopics(data.saaTopics);
    setSystemDesign(data.systemDesign);
    setAchievements(data.achievements);
    setDailyHistory(data.dailyHistory);
    setArchitectureLessons(data.architectureLessons || []);
    setPersonalNotes(data.personalNotes || []);
  };

  const resetToDefaults = async () => {
    indexedDB.deleteDatabase('ArchitectureQuestDB');
    window.location.reload();
  };

  return (
    <StorageContext.Provider
      value={{
        loading,
        profile,
        milestones,
        adrs,
        projects,
        resources,
        jobApplications,
        saaTopics,
        systemDesign,
        achievements,
        dailyHistory,
        architectureLessons,
        personalNotes,
        activeMilestone,
        nextMilestone,
        activeArchitectureLesson,
        completeTask,
        updateArchitectureStep,
        saveArchitectureDetails,
        updateProfile,
        saveAdr,
        deleteAdr,
        saveProject,
        saveResource,
        saveJobApplication,
        deleteJobApplication,
        updateSaaTopic,
        updateSystemDesignCase,
        unlockAchievement,
        saveNote,
        deleteNote,
        exportBackup,
        importBackup,
        resetToDefaults
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = (): StorageContextType => {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error('useStorage must be used within a StorageProvider');
  }
  return context;
};

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
  DailyArchitectureProgress
} from '../types';
import { INITIAL_USER_PROFILE, INITIAL_ADRS, INITIAL_PROJECTS, INITIAL_SAA_TOPICS, INITIAL_ACHIEVEMENTS, INITIAL_JOB_APPLICATIONS } from '../data/initialData';
import { INITIAL_MILESTONES } from '../curriculum/phases';
import { SYSTEM_DESIGN_CASES } from '../curriculum/systemDesign';
import { INITIAL_RESOURCES } from '../resources/resourcesData';
import { INITIAL_ARCHITECTURE_LESSONS } from '../curriculum/dailyArchitecture';

const DB_NAME = 'ArchitectureQuestDB';
const DB_VERSION = 3;

export interface AppDataBackup {
  version: number;
  exportedAt: string;
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
  architectureLessons?: DailyArchitectureProgress[];
}

export class QuestDB {
  private db: IDBDatabase | null = null;

  async open(): Promise<IDBDatabase> {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains('profile')) {
          db.createObjectStore('profile', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('milestones')) {
          db.createObjectStore('milestones', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('adrs')) {
          db.createObjectStore('adrs', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('projects')) {
          db.createObjectStore('projects', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('resources')) {
          db.createObjectStore('resources', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('jobApplications')) {
          db.createObjectStore('jobApplications', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('saaTopics')) {
          db.createObjectStore('saaTopics', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('systemDesign')) {
          db.createObjectStore('systemDesign', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('achievements')) {
          db.createObjectStore('achievements', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('dailyHistory')) {
          db.createObjectStore('dailyHistory', { keyPath: 'date' });
        }
        if (!db.objectStoreNames.contains('architectureLessons')) {
          db.createObjectStore('architectureLessons', { keyPath: 'id' });
        }
      };

      request.onblocked = () => {
        console.warn('IndexedDB upgrade blocked. Closing stale connection...');
        if (this.db) {
          this.db.close();
          this.db = null;
        }
      };

      request.onsuccess = () => {
        this.db = request.result;
        this.db.onversionchange = () => {
          console.warn('Database version change requested. Closing connection.');
          this.db?.close();
          this.db = null;
        };
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  // Generic helpers
  async getAll<T>(storeName: string): Promise<T[]> {
    const db = await this.open();
    if (!db.objectStoreNames.contains(storeName)) {
      console.warn(`Object store "${storeName}" not found. Returning empty array.`);
      return [];
    }
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result as T[]);
      req.onerror = () => reject(req.error);
    });
  }

  async put<T>(storeName: string, item: T): Promise<void> {
    const db = await this.open();
    if (!db.objectStoreNames.contains(storeName)) {
      console.warn(`Object store "${storeName}" not found. Cannot put.`);
      return;
    }
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.put(item);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  async putAll<T>(storeName: string, items: T[]): Promise<void> {
    const db = await this.open();
    if (!db.objectStoreNames.contains(storeName)) {
      console.warn(`Object store "${storeName}" not found. Cannot putAll.`);
      return;
    }
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      items.forEach((item) => store.put(item));
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async delete(storeName: string, key: IDBValidKey): Promise<void> {
    const db = await this.open();
    if (!db.objectStoreNames.contains(storeName)) {
      return;
    }
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  async clear(storeName: string): Promise<void> {
    const db = await this.open();
    if (!db.objectStoreNames.contains(storeName)) {
      return;
    }
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  // Initialize seed data if empty
  async initializeDatabase(): Promise<{
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
  }> {
    const db = await this.open();

    // Check profile
    const existingProfile = await this.getAll<{ id: string } & UserProfile>('profile');
    let profile: UserProfile;
    if (existingProfile.length === 0) {
      profile = { ...INITIAL_USER_PROFILE };
      await this.put('profile', { id: 'main', ...profile });
    } else {
      const { id, ...rest } = existingProfile[0];
      profile = rest as UserProfile;
    }

    // Check milestones
    let milestones = await this.getAll<Milestone>('milestones');
    if (milestones.length === 0) {
      milestones = [...INITIAL_MILESTONES];
      await this.putAll('milestones', milestones);
    }

    // Check ADRs
    let adrs = await this.getAll<ADR>('adrs');
    if (adrs.length === 0) {
      adrs = [...INITIAL_ADRS];
      await this.putAll('adrs', adrs);
    }

    // Check Projects
    let projects = await this.getAll<ProjectEntry>('projects');
    if (projects.length === 0) {
      projects = [...INITIAL_PROJECTS];
      await this.putAll('projects', projects);
    }

    // Check Resources
    let resources = await this.getAll<ResourceItem>('resources');
    if (resources.length === 0) {
      resources = [...INITIAL_RESOURCES];
      await this.putAll('resources', resources);
    }

    // Check Job Applications
    let jobApplications = await this.getAll<JobApplication>('jobApplications');
    if (jobApplications.length === 0) {
      jobApplications = [...INITIAL_JOB_APPLICATIONS];
      await this.putAll('jobApplications', jobApplications);
    }

    // Check SAA Topics
    let saaTopics = await this.getAll<SaaTopic>('saaTopics');
    if (saaTopics.length === 0) {
      saaTopics = [...INITIAL_SAA_TOPICS];
      await this.putAll('saaTopics', saaTopics);
    }

    // Check System Design Cases
    let systemDesign = await this.getAll<SystemDesignCase>('systemDesign');
    if (systemDesign.length === 0) {
      systemDesign = [...SYSTEM_DESIGN_CASES];
      await this.putAll('systemDesign', systemDesign);
    }

    // Check Achievements
    let achievements = await this.getAll<Achievement>('achievements');
    if (achievements.length === 0) {
      achievements = [...INITIAL_ACHIEVEMENTS];
      await this.putAll('achievements', achievements);
    }

    // Check Daily History
    const dailyHistory = await this.getAll<{ date: string; tasksCompleted: number; xpEarned: number }>('dailyHistory');

    // Check Architecture Lessons
    let architectureLessons = await this.getAll<DailyArchitectureProgress>('architectureLessons');
    if (architectureLessons.length === 0) {
      architectureLessons = [...INITIAL_ARCHITECTURE_LESSONS];
      await this.putAll('architectureLessons', architectureLessons);
    }

    return {
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
      architectureLessons
    };
  }

  // Backup & Restore
  async exportBackup(): Promise<AppDataBackup> {
    const data = await this.initializeDatabase();
    return {
      version: 2,
      exportedAt: new Date().toISOString(),
      ...data
    };
  }

  async importBackup(backup: AppDataBackup): Promise<void> {
    if (!backup || !backup.milestones || !backup.profile) {
      throw new Error('Invalid backup file format.');
    }

    await this.clear('profile');
    await this.put('profile', { id: 'main', ...backup.profile });

    await this.clear('milestones');
    await this.putAll('milestones', backup.milestones);

    await this.clear('adrs');
    await this.putAll('adrs', backup.adrs || []);

    await this.clear('projects');
    await this.putAll('projects', backup.projects || []);

    await this.clear('resources');
    await this.putAll('resources', backup.resources || []);

    await this.clear('jobApplications');
    await this.putAll('jobApplications', backup.jobApplications || []);

    await this.clear('saaTopics');
    await this.putAll('saaTopics', backup.saaTopics || []);

    await this.clear('systemDesign');
    await this.putAll('systemDesign', backup.systemDesign || []);

    await this.clear('achievements');
    await this.putAll('achievements', backup.achievements || []);

    await this.clear('dailyHistory');
    if (backup.dailyHistory && backup.dailyHistory.length > 0) {
      await this.putAll('dailyHistory', backup.dailyHistory);
    }

    await this.clear('architectureLessons');
    if (backup.architectureLessons && backup.architectureLessons.length > 0) {
      await this.putAll('architectureLessons', backup.architectureLessons);
    } else {
      await this.putAll('architectureLessons', INITIAL_ARCHITECTURE_LESSONS);
    }
  }
}

export const questDB = new QuestDB();

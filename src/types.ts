export type RoutineType = 'learn' | 'practice' | 'architecture' | 'explain';

export interface DailyRoutineItem {
  type: RoutineType;
  title: string;
  durationMinutes: number;
  description: string;
  completed: boolean;
  xpAwarded: number;
}

export type MilestoneStatus = 'active' | 'next' | 'later' | 'locked' | 'completed';

export interface MilestoneTask {
  id: string;
  title: string;
  type: RoutineType | 'build' | 'deliverable' | 'checkpoint';
  description?: string;
  completed: boolean;
  xp: number;
}

export interface Milestone {
  id: string; // e.g., 'w1', 'w2', 'm91', etc.
  phase: 1 | 2 | 3;
  weekNumber: number;
  dayRange: string;
  title: string;
  subtitle: string;
  primarySkill: string;
  topics: string[];
  buildOutput: string;
  buildDescription: string;
  systemDesignTopic: string;
  deliverable: string;
  additionalTasks?: string[];
  status: MilestoneStatus;
  plannedDurationDays: number;
  actualDurationDays: number;
  tasks: MilestoneTask[];
  unlockedAt?: string;
  completedAt?: string;
  xpValue: number;
}

export interface ResourceMetadata {
  id: string;
  title: string;
  provider: string;
  url: string;
  type: string;
  topic: string;
  milestoneId: string;
  estimatedTime: string;
  freeOrPaid: 'Free' | 'Paid';
  lastReviewed: string;
}

export interface ResourceItem {
  id: string;
  milestoneId: string;
  topic: string;
  title: string;
  provider: string;
  url: string;
  type: 'quick' | 'deep' | 'official' | 'lab';
  estimatedMinutes: number;
  isFree: boolean;
  lastReviewed: string; // YYYY-MM-DD
  statusReviewNotice?: boolean;
  estimatedTime?: string;
  freeOrPaid?: 'Free' | 'Paid';
}

export interface ADR {
  id: string; // ADR-001, ADR-002, etc.
  title: string;
  status: 'Proposed' | 'Accepted' | 'Superseded' | 'Deprecated';
  date: string;
  context: string;
  problem: string;
  options: string;
  decision: string;
  reason: string;
  tradeoffs: string;
  consequences: string;
  milestoneId?: string;
}

export interface ProjectEntry {
  id: string;
  weekNumber: number;
  title: string;
  version: string; // e.g. "Order Service V1"
  description: string;
  technologies: string[];
  architectureSummary: string;
  githubUrl?: string;
  liveUrl?: string;
  completed: boolean;
  readmeMarkdown?: string;
  linkedinPostMarkdown?: string;
  c4DiagramSummary?: string;
  tradeoffs?: string;
  failureScenarios?: string;
  securityNotes?: string;
  observabilityNotes?: string;
  costNotes?: string;
}

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  location: string;
  jobUrl: string;
  applicationDate: string;
  resumeVersion: string;
  status: 'Saved' | 'Applied' | 'Screening' | 'Technical' | 'System Design' | 'Offer' | 'Rejected';
  interviewStage: string;
  feedback: string;
  missingSkills: string;
  followUpDate: string;
}

export interface SaaTopic {
  id: string;
  domain: string;
  title: string;
  confidence: number; // 0 - 100
  notes: string;
  isWeakTopic: boolean;
}

export interface SaaPracticeExam {
  id: string;
  title: string;
  date: string;
  scorePercent: number;
  passed: boolean;
  weakAreas: string[];
}

export interface UserProfile {
  name: string;
  headline: string;
  currentRole: string;
  targetRole: string;
  level: number;
  xp: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string; // YYYY-MM-DD
  streakStartDate: string;
  weeklyTargetHours: number; // 9, 5, or 3
  dailyRoutineMinutes: number; // 20, 30, 45, 60, 90
  completedTaskIds: string[]; // Anti-farming ledger
  achievementsUnlocked: string[];
  themeMode: 'auto' | 'dark' | 'light' | 'daily' | 'manual';
  manualAccent: string;
  architectureStreak?: number;
  architectureXp?: number;
  lastArchitectureDate?: string;
}

export interface DailyArchitectureProgress {
  id: string; // e.g. 'arch-w1', 'arch-w2', ...
  milestoneId: string; // 'w1', 'w2', ...
  weekNumber: number;
  topic: string;
  resourceTitle: string;
  provider: string; // e.g. 'Free System Design' | 'ByteByteGo' | 'AWS Well-Architected'
  url: string;
  estimatedMinutes: number;
  resourceMetadata?: ResourceMetadata;

  // 1. Learn
  learnTitle: string;
  learnSummary: string;
  learnCompleted: boolean;

  // 2. Practice
  practicePrompt: string;
  practiceProjectConnection: string;
  practiceCompleted: boolean;

  // 3. Design
  designQuestion: string;
  designAnswer: string;
  designCompleted: boolean;

  // 4. Explain
  explainPrompt: string;
  explainAnswer: string;
  explainCompleted: boolean;

  // 5. Apply
  applyPrompt: string;
  applyMapping: string; // e.g. "Caching → Redis Cache-Aside"
  appliedToProject: boolean;

  // Additional tracking
  notes: string;
  completed: boolean;
  completionDate?: string;
}

export interface SystemDesignCase {
  id: string;
  number: number;
  title: string;
  difficulty: 'Intermediate' | 'Advanced' | 'Architect';
  summary: string;
  requirements: string[];
  scaleEstimate: string;
  architectureComponents: string[];
  databaseChoice: string;
  cachingStrategy: string;
  failureScenarios: string[];
  securityConsiderations: string[];
  observabilityPoints: string[];
  tradeoffs: string[];
  costConsiderations: string;
  checklistPassed: boolean;
  userNotes?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpAward: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface PersonalNote {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

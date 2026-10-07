# 🏗️ ARCHITECTURE QUEST

**A Local-First Career-Learning Platform for Senior Backend Engineers**

Elevate from **Senior Node.js Developer** → **Cloud / Platform Engineer** → **Cloud / Solution Architect** → **AI Cloud Architect**.

---

## 🎯 Core Philosophy & Objectives

- **Job-Switch Ready in 90 Days (Phase 1)**: Focuses on tangible, high-signal cloud engineering competencies (Node.js, TypeScript, PostgreSQL, Redis, Docker, GitHub Actions, AWS ECS/Fargate, Terraform, Apache Kafka, OpenTelemetry, pgvector RAG, and AWS SAA preparation).
- **One Evolving Production Platform**: Rather than building 19 disconnected toy apps, each milestone builds upon a single evolving production platform (Order Service V1 → V2 → V3 → AWS ECS → Terraform → OIDC → Kafka → Observability → AI Documentation RAG).
- **System Design Every Week**: 10 progressive case studies (TinyURL, Notification, Payment Ledger, Flash-Sale Inventory, E-Commerce EDA, Real-Time Chat, Video Streaming, Ride Sharing, Enterprise RAG, Autonomous AI Agent Platform).
- **Flexible Timeline Engine**:
  - ~9 hrs/week → 90-day fast track
  - ~5 hrs/week → stretches toward ~150 days
  - ~3 hrs/week → stretches toward ~210 days
  - *Never punishes missed days. Preserves all completed progress and recalculates target dates seamlessly.*
- **Practice is the Minimum Standard**: Daily 60-minute routine (20m Learn, 20m Practice, 15m Architecture, 5m Explain). If short on time, completing the 20-minute practice session counts as a successful day!
- **Local-First Data Sovereignty**: All milestones, tasks, XP, streaks, ADRs, projects, and job applications persist in the browser's **IndexedDB**. Includes one-click JSON backup & restore and Markdown export.

---

## 📁 Architecture & Codebase Structure

```
d:/antgravity/
├── src/
│   ├── components/
│   │   ├── AdrModal.tsx                # Interactive ADR creator & Markdown exporter
│   │   ├── FirstScreenHero.tsx         # Section 42 First Screen dashboard representation
│   │   ├── MissionRunnerModal.tsx      # Daily focus room with timers & step runner
│   │   ├── Navbar.tsx                  # Top header with streak, level, XP, pace
│   │   ├── ProjectArtifactModal.tsx    # GitHub README & LinkedIn post generator
│   │   └── Sidebar.tsx                 # 15-tab navigation panel
│   ├── curriculum/
│   │   ├── capstones.ts                # 3 Flagship Capstone projects specifications
│   │   ├── phases.ts                   # 13 weeks of Phase 1 + Phase 2 & Phase 3 milestones
│   │   └── systemDesign.ts             # 10 comprehensive system design case studies
│   ├── data/
│   │   └── initialData.ts              # Seed profile, seed ADRs, projects, SAA topics, achievements
│   ├── hooks/
│   │   └── useTheme.ts                 # Daily changing glassmorphic theme engine
│   ├── pages/
│   │   ├── AchievementsPage.tsx        # RPG progression & achievement badges
│   │   ├── AdrsPage.tsx                # Architecture Decision Records governance hub
│   │   ├── ArchitecturePage.tsx        # System design track & failure drills
│   │   ├── BackupRestorePage.tsx       # JSON import/export & Markdown batch downloads
│   │   ├── DashboardPage.tsx           # Main career hub & competency matrix
│   │   ├── JobHuntPage.tsx             # Job application funnel starting Day 55
│   │   ├── LearningPathsPage.tsx       # 5 long-term career pillars & roadmap states
│   │   ├── ProgressPage.tsx            # Pace analytics & schedule simulator
│   │   ├── ProjectsPage.tsx            # The 1 evolving production platform showcase
│   │   ├── ResourcesPage.tsx           # 4-tier curated free resource index & freshness check
│   │   ├── RoadmapPage.tsx             # Interactive 3-phase milestone roadmap
│   │   ├── SaaPage.tsx                 # AWS SAA-C03 domain tracker & confidence matrix
│   │   ├── SettingsPage.tsx            # Theme mode & career profile editor
│   │   ├── SkippupPage.tsx             # External SKIPPUP syllabus upload & mapper
│   │   └── TodaysMissionPage.tsx       # Dedicated 'What do I do today?' workflow
│   ├── resources/
│   │   └── resourcesData.ts            # Replaceable curated resources with freshness metadata
│   ├── storage/
│   │   ├── indexedDb.ts                # Native typed IndexedDB storage engine & backup
│   │   └── storageContext.tsx          # React Context providing reactive state & persistence
│   ├── utils/
│   │   ├── dateUtils.ts                # Dynamic timeline stretch & pacing equations
│   │   └── markdownExporter.ts         # Markdown and JSON file download helpers
│   ├── types.ts                        # Master TypeScript interfaces
│   ├── index.css                       # Premium glassmorphic dark-first styling system
│   ├── App.tsx                         # Main app router & layout container
│   └── main.tsx                        # Application mount point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

---

## 🚀 Setup & Local Execution

### Prerequisites
- Node.js `v18.0.0` or newer (Tested on Node.js `v22.6.0`)
- npm `10.x` or newer

### Installation
```bash
# In d:\antgravity
npm install
```

### Running Locally (Development Mode)
```bash
npm run dev
```
The server will start at: **`http://localhost:5173/`**

### Building for Production
```bash
npm run build
```

---

## 🛡️ Anti-Farming XP System

XP is earned strictly on genuine task completion:
- **Learn Task**: +25 XP
- **Practice Task**: +50 XP
- **Architecture Task**: +50 XP
- **Explain Task**: +25 XP
- **Weekly Milestone Completion**: +250 XP
- **Major Checkpoint / Project**: +500 XP
- **Capstone Project**: +1000 XP

*Anti-Farming Ledger:* Completed task IDs are stored in a persistent set (`completedTaskIds`). Toggling checkboxes on and off will never grant duplicate XP.

---

## 🎨 Daily Changing Theme Engine

- **Mon**: Blue Glass
- **Tue**: Purple Glass
- **Wed**: Green Glass
- **Thu**: Amber Glass
- **Fri**: Rose Glass
- **Sat**: Cyan Glass
- **Sun**: Emerald Glass
- *Also supports Dark, Light, and Manual Hex Accent customization in Settings.*

---

## 📦 Data Sovereignty: Backup & Restore

All state resides in your local browser's **IndexedDB**:
1. Go to **Backup / Restore** in the sidebar.
2. Click **Export architecture-quest-backup.json** to download your full state.
3. Import the JSON on any machine to restore your streak, XP, ADRs, and completed tasks.
4. Export all ADRs or Project READMEs as clean Markdown for your public GitHub portfolio.

import { Milestone } from '../types';

export const INITIAL_MILESTONES: Milestone[] = [
  // ==========================================
  // PHASE 1: WEEKS 1 TO 13 (DAYS 1 TO 90)
  // JOB-SWITCH READY
  // ==========================================
  {
    id: 'w1',
    phase: 1,
    weekNumber: 1,
    dayRange: 'Days 1–7',
    title: 'TypeScript Fundamentals & Advanced Types',
    subtitle: 'Strict typing, modern toolchains & system design estimation',
    primarySkill: 'TypeScript Advanced Types',
    topics: [
      'Strict Type System & Compiler Config',
      'Interfaces, Types, Unions & Intersections',
      'Discriminated Unions & Type Narrowing',
      'Generics, Constraints & Conditional Types',
      'Built-in Utility Types (Partial, Pick, Omit, Record)',
      'ESModules & Vitest Testing Pipeline'
    ],
    buildOutput: 'Production TS Template Repo',
    buildDescription: 'Strict TypeScript repository scaffold with ESLint, Vitest, and GitHub repository integration.',
    systemDesignTopic: 'Requirements & Scale Estimation (URL Shortener)',
    deliverable: 'Initial architecture learning repository & 20 job postings skill analysis',
    additionalTasks: [
      'Analyze 20 senior backend / cloud job postings and record repeated skills in your Career Log',
      'Write estimation equations for URL Shortener (QPS, storage, bandwidth)'
    ],
    status: 'active',
    plannedDurationDays: 7,
    actualDurationDays: 7,
    xpValue: 250,
    tasks: [
      { id: 'w1-l', title: 'Learn TypeScript Advanced Types & strict compiler flags', type: 'learn', completed: false, xp: 25 },
      { id: 'w1-p', title: 'Practice generics, narrowing & typed utility functions with Vitest', type: 'practice', completed: false, xp: 50 },
      { id: 'w1-a', title: 'Architecture: URL Shortener requirements, QPS & capacity estimation', type: 'architecture', completed: false, xp: 50 },
      { id: 'w1-e', title: 'Explain: Discriminated unions vs polymorphic classes in 5 minutes', type: 'explain', completed: false, xp: 25 },
      { id: 'w1-b', title: 'Build: Complete TypeScript + ESLint + Vitest repository scaffold', type: 'build', completed: false, xp: 100 }
    ]
  },
  {
    id: 'w2',
    phase: 1,
    weekNumber: 2,
    dayRange: 'Days 8–14',
    title: 'Node.js + TypeScript Production API',
    subtitle: 'Order Service V1: Enterprise Node runtime, validation & PostgreSQL',
    primarySkill: 'Node.js Runtime & Express Enterprise API',
    topics: [
      'Node.js Runtime Internals & Event Loop Phases Revision',
      'Asynchronous Flow & Memory Leak Avoidance',
      'Express REST Architecture with Clean Controller / Service Layers',
      'Request Validation using Zod',
      'Custom Typed Domain Errors & Centralized Error Handler',
      'Structured JSON Logging with Pino & Correlated Request IDs',
      'Health Check Endpoints (/live, /ready)'
    ],
    buildOutput: 'Order Service V1',
    buildDescription: 'Production-ready Node.js + Express + TypeScript API with PostgreSQL, Zod validation, and Pino logging.',
    systemDesignTopic: 'API Design, Idempotency Keys & Rate Limiting',
    deliverable: 'Public GitHub Repository for Order Service V1',
    status: 'next',
    plannedDurationDays: 7,
    actualDurationDays: 7,
    xpValue: 250,
    tasks: [
      { id: 'w2-l', title: 'Learn Event loop microtasks/macrotasks & Zod schema validation', type: 'learn', completed: false, xp: 25 },
      { id: 'w2-p', title: 'Practice building typed route handlers and custom error middleware', type: 'practice', completed: false, xp: 50 },
      { id: 'w2-a', title: 'Architecture: Designing Idempotency Keys for payment and order creation', type: 'architecture', completed: false, xp: 50 },
      { id: 'w2-e', title: 'Explain: How Node handles I/O multiplexing without blocking', type: 'explain', completed: false, xp: 25 },
      { id: 'w2-b', title: 'Build: Implement Order Service V1 and publish to GitHub', type: 'build', completed: false, xp: 100 }
    ]
  },
  {
    id: 'w3',
    phase: 1,
    weekNumber: 3,
    dayRange: 'Days 15–21',
    title: 'PostgreSQL + Redis + Docker',
    subtitle: 'Order Service V2: Performance indexing, cache-aside & containerization',
    primarySkill: 'PostgreSQL Tuning, Redis Caching & Docker',
    topics: [
      'PostgreSQL B-Tree Indexes, Composite Indexes & EXPLAIN ANALYZE',
      'ACID Transactions & Row-level Locking (SELECT FOR UPDATE)',
      'Redis Cache-Aside Pattern, TTL, Key Expiration & Invalidation',
      'Multi-Stage Dockerfile (Build stage vs runtime stage, non-root user)',
      'Container Networking, Healthchecks & Volume Persistency',
      'Docker Compose orchestration for App, Postgres, and Redis'
    ],
    buildOutput: 'Order Service V2',
    buildDescription: 'Multi-container stack with Node.js, Postgres, Redis cache-aside, and Docker Compose.',
    systemDesignTopic: 'Caching Strategies (Cache-Aside, Write-Through) & DB Scaling',
    deliverable: 'Complete Docker Compose local production stack',
    status: 'later',
    plannedDurationDays: 7,
    actualDurationDays: 7,
    xpValue: 250,
    tasks: [
      { id: 'w3-l', title: 'Learn Postgres query plans, index bloat & Redis cache-aside mechanics', type: 'learn', completed: false, xp: 25 },
      { id: 'w3-p', title: 'Practice profiling slow queries with EXPLAIN ANALYZE and Redis TTL caching', type: 'practice', completed: false, xp: 50 },
      { id: 'w3-a', title: 'Architecture: Cache penetration, stampede & database replication strategies', type: 'architecture', completed: false, xp: 50 },
      { id: 'w3-e', title: 'Explain: Write-through vs Cache-aside trade-offs for order placement', type: 'explain', completed: false, xp: 25 },
      { id: 'w3-b', title: 'Build: Package Order Service V2 with multi-stage Docker and compose file', type: 'build', completed: false, xp: 100 }
    ]
  },
  {
    id: 'w4',
    phase: 1,
    weekNumber: 4,
    dayRange: 'Days 22–28',
    title: 'GitHub Actions + Architecture Documentation',
    subtitle: 'Day 28 Checkpoint: Automated CI, C4 model diagrams & ADR-001',
    primarySkill: 'CI/CD Pipelines & Architecture Communication',
    topics: [
      'GitHub Actions Workflow Triggers & Matrix Builds',
      'Automated Linting, Unit Testing & Docker Image Build in CI',
      'C4 Model: Context, Container, Component, Code diagrams',
      'Architecture Decision Records (ADR format and lifecycle)',
      'Technical README drafting for Engineering Hiring Managers',
      'Updating LinkedIn and Resume V1 with measurable backend accomplishments'
    ],
    buildOutput: 'CI Pipeline & Architecture Documentation Suite',
    buildDescription: 'GitHub Actions workflow, C4 diagrams, ADR-001 (Why PostgreSQL?), and polished project README.',
    systemDesignTopic: 'Load Balancing (L4 vs L7) & Horizontal Scaling',
    deliverable: 'Project V1 publicly documented, Resume V1 updated, Day 28 Checkpoint achieved',
    status: 'locked',
    plannedDurationDays: 7,
    actualDurationDays: 7,
    xpValue: 250,
    tasks: [
      { id: 'w4-l', title: 'Learn GitHub Actions runners, caching & C4 modeling principles', type: 'learn', completed: false, xp: 25 },
      { id: 'w4-p', title: 'Practice writing GitHub Action workflows and Mermaid C4 diagrams', type: 'practice', completed: false, xp: 50 },
      { id: 'w4-a', title: 'Architecture: Load balancer health checks, sticky sessions & L4 vs L7', type: 'architecture', completed: false, xp: 50 },
      { id: 'w4-e', title: 'Explain: Walk through ADR-001 justification for relational vs NoSQL store', type: 'explain', completed: false, xp: 25 },
      { id: 'w4-b', title: 'Checkpoint: Achieve Day 28 milestone (Public GitHub, CI, C4, Resume V1)', type: 'checkpoint', completed: false, xp: 150 }
    ]
  },
  {
    id: 'w5',
    phase: 1,
    weekNumber: 5,
    dayRange: 'Days 29–35',
    title: 'AWS Core & Cloud Networking',
    subtitle: 'VPC, multi-AZ high availability & AWS SAA exam preparation kick-off',
    primarySkill: 'AWS Networking, IAM & Security Fundamentals',
    topics: [
      'AWS Global Infrastructure: Regions, Availability Zones & Edge Locations',
      'AWS IAM: Roles, Policies, Principle of Least Privilege',
      'VPC Design: Public Subnets, Private Subnets, CIDR calculation',
      'Internet Gateway, NAT Gateway & Route Table Associations',
      'Security Groups (Stateful) vs Network ACLs (Stateless)',
      'Application Load Balancer (ALB) & Target Groups',
      'AWS Billing Alarm & Budget Alerts Configuration'
    ],
    buildOutput: 'Multi-AZ AWS VPC (Manual configuration first)',
    buildDescription: 'Manually constructed custom VPC with public and private subnets across 2 AZs, NAT Gateway, and security groups.',
    systemDesignTopic: 'High Availability, Multi-AZ Resilience & Disaster Recovery Fundamentals',
    deliverable: 'Validated custom AWS VPC & AWS SAA study schedule initiated',
    status: 'locked',
    plannedDurationDays: 7,
    actualDurationDays: 7,
    xpValue: 250,
    tasks: [
      { id: 'w5-l', title: 'Learn VPC CIDR blocks, routing tables, and AWS IAM role assumptions', type: 'learn', completed: false, xp: 25 },
      { id: 'w5-p', title: 'Practice configuring AWS billing alarms and building custom VPC manually', type: 'practice', completed: false, xp: 50 },
      { id: 'w5-a', title: 'Architecture: Multi-AZ failover and NAT Gateway cost optimization', type: 'architecture', completed: false, xp: 50 },
      { id: 'w5-e', title: 'Explain: Security Groups vs Network ACLs with realistic packet flow', type: 'explain', completed: false, xp: 25 },
      { id: 'w5-b', title: 'Build: Complete manual multi-AZ VPC deployment with working bastion/NAT', type: 'build', completed: false, xp: 100 }
    ]
  },
  {
    id: 'w6',
    phase: 1,
    weekNumber: 6,
    dayRange: 'Days 36–42',
    title: 'AWS Compute + Data + Integration',
    subtitle: 'Deploy Order Service to ECS/Fargate + RDS PostgreSQL + ALB',
    primarySkill: 'AWS ECS Fargate, ECR, RDS & Managed Integration',
    topics: [
      'Elastic Container Registry (ECR) repository setup and image push',
      'ECS Clusters, Task Definitions & Fargate Serverless Compute',
      'Application Load Balancer routing to ECS dynamic task containers',
      'Amazon RDS PostgreSQL: Multi-AZ standby, parameter groups, backups',
      'ElastiCache Redis & DynamoDB fundamentals',
      'AWS Messaging: SQS queues, dead-letter queues, SNS fan-out, EventBridge',
      'Architecture Decision Record: ADR-002 (SQS vs Kafka)'
    ],
    buildOutput: 'Order Service on AWS ECS/Fargate',
    buildDescription: 'Deploy Order Service container to AWS ECS/Fargate behind ALB talking to RDS PostgreSQL.',
    systemDesignTopic: 'Message Queues: SQS vs Kafka comparison & Delivery Guarantees',
    deliverable: 'Live ECS/Fargate service URL and ADR-002 documentation',
    status: 'locked',
    plannedDurationDays: 7,
    actualDurationDays: 7,
    xpValue: 250,
    tasks: [
      { id: 'w6-l', title: 'Learn ECS Task Definitions, Fargate CPU/memory allocations & RDS IAM auth', type: 'learn', completed: false, xp: 25 },
      { id: 'w6-p', title: 'Practice pushing Docker image to ECR and creating ECS service behind ALB', type: 'practice', completed: false, xp: 50 },
      { id: 'w6-a', title: 'Architecture: SQS standard vs FIFO vs Kafka partition ordering', type: 'architecture', completed: false, xp: 50 },
      { id: 'w6-e', title: 'Explain: ADR-002 SQS vs Kafka architectural trade-offs', type: 'explain', completed: false, xp: 25 },
      { id: 'w6-b', title: 'Build: Deploy Order Service container to ECS Fargate with RDS Postgres', type: 'build', completed: false, xp: 100 }
    ]
  },
  {
    id: 'w7',
    phase: 1,
    weekNumber: 7,
    dayRange: 'Days 43–49',
    title: 'Infrastructure as Code with Terraform',
    subtitle: 'Automate VPC, ECS, RDS & ALB with reproducible Terraform modules',
    primarySkill: 'Terraform Modules & State Management',
    topics: [
      'Terraform HCL Syntax, Providers & Resource Declarations',
      'Terraform Input Variables, Local Values & Output Values',
      'Remote State in S3 with DynamoDB State Locking',
      'Creating Modular Infrastructure (vpc, ecs, rds, alb modules)',
      'State Management Commands (terraform plan, apply, destroy, import)',
      'Secret management in Terraform without hardcoding credentials'
    ],
    buildOutput: 'Terraform AWS Infrastructure Codebase',
    buildDescription: 'Terraform repo recreating the complete AWS stack. Must prove terraform destroy -> apply recreation.',
    systemDesignTopic: 'Payment System Design (Transactions, Idempotency, 2PC vs Saga)',
    deliverable: 'Tested Terraform codebase recreating complete cloud infrastructure on demand',
    status: 'locked',
    plannedDurationDays: 7,
    actualDurationDays: 7,
    xpValue: 250,
    tasks: [
      { id: 'w7-l', title: 'Learn Terraform remote backends, state locking & module best practices', type: 'learn', completed: false, xp: 25 },
      { id: 'w7-p', title: 'Practice structuring reusable Terraform modules for VPC and ECS', type: 'practice', completed: false, xp: 50 },
      { id: 'w7-a', title: 'Architecture: Payment system idempotency, double-spend prevention & ledger', type: 'architecture', completed: false, xp: 50 },
      { id: 'w7-e', title: 'Explain: Terraform declarative state vs imperative configuration scripts', type: 'explain', completed: false, xp: 25 },
      { id: 'w7-b', title: 'Build: Execute terraform destroy -> terraform apply recreation test', type: 'build', completed: false, xp: 100 }
    ]
  },
  {
    id: 'w8',
    phase: 1,
    weekNumber: 8,
    dayRange: 'Days 50–56',
    title: 'Secure Deployment Pipeline & Job Hunt Activation',
    subtitle: 'Day 55 Job Hunt start & Day 56 Checkpoint: GitHub OIDC to AWS ECS',
    primarySkill: 'CI/CD Automation & GitHub OIDC AWS Authentication',
    topics: [
      'GitHub Actions OIDC AWS Federation (Zero stored AWS credentials)',
      'Automated Test -> Docker Build -> ECR Push -> ECS Task Update',
      'Terraform automated plan/apply in pull requests',
      'Environment Variables, Secrets Manager & AWS SSM Parameter Store',
      'Cloud Cost Awareness & Right-sizing ECS container tasks',
      'Activating the Job Search tracker (Applications start around Day 55)'
    ],
    buildOutput: 'Order Service V3 with Zero-Key OIDC CI/CD',
    buildDescription: 'Fully automated deployment pipeline without stored credentials. Project V3 goes live.',
    systemDesignTopic: 'Distributed Inventory System Design (Locking & Reservation)',
    deliverable: 'Live Production Pipeline, Project V3 Live, Day 56 Checkpoint, First Job Applications Sent',
    status: 'locked',
    plannedDurationDays: 7,
    actualDurationDays: 7,
    xpValue: 250,
    tasks: [
      { id: 'w8-l', title: 'Learn AWS IAM OpenID Connect (OIDC) identity provider with GitHub Actions', type: 'learn', completed: false, xp: 25 },
      { id: 'w8-p', title: 'Practice configuring OIDC trust policy and least-privilege IAM roles', type: 'practice', completed: false, xp: 50 },
      { id: 'w8-a', title: 'Architecture: Inventory reservation pattern with TTL expiry and concurrency', type: 'architecture', completed: false, xp: 50 },
      { id: 'w8-e', title: 'Explain: Why storing static AWS IAM keys in CI is an anti-pattern', type: 'explain', completed: false, xp: 25 },
      { id: 'w8-b', title: 'Checkpoint: Day 56 Checkpoint (Live ECS, OIDC CI/CD, First 5 Job Applications)', type: 'checkpoint', completed: false, xp: 150 }
    ]
  },
  {
    id: 'w9',
    phase: 1,
    weekNumber: 9,
    dayRange: 'Days 57–63',
    title: 'Apache Kafka & Event-Driven Architecture',
    subtitle: 'Order -> Kafka -> Inventory -> Notification with retry, DLQ & replay',
    primarySkill: 'Kafka Architecture & Event-Driven Microservices',
    topics: [
      'Kafka Broker Architecture: Topics, Partitions, Replicas, Leaders',
      'Producers: Partitioning Keys, ACKS (all, 1, 0), Compression',
      'Consumers: Consumer Groups, Partition Rebalancing, Offset Commits',
      'At-Least-Once vs At-Most-Once delivery guarantees',
      'Dead-Letter Queue (DLQ) pattern for poison-pill messages',
      'Consumer idempotency & out-of-order message handling',
      'Running Kafka locally via Docker Compose (avoiding costly cloud Kafka)'
    ],
    buildOutput: 'Event-Driven Order & Notification Service',
    buildDescription: 'Multi-service event flow: Order Service publishes events to Kafka -> Inventory and Notification consumers process with DLQ.',
    systemDesignTopic: 'E-Commerce Event-Driven Architecture & Outbox Pattern',
    deliverable: 'Tested local Kafka cluster with resilient producer, consumer, DLQ and replay scripts',
    status: 'locked',
    plannedDurationDays: 7,
    actualDurationDays: 7,
    xpValue: 250,
    tasks: [
      { id: 'w9-l', title: 'Learn Kafka partition mechanics, consumer group offset commits & DLQs', type: 'learn', completed: false, xp: 25 },
      { id: 'w9-p', title: 'Practice implementing Kafka producers with kafkajs and consumer group rebalance', type: 'practice', completed: false, xp: 50 },
      { id: 'w9-a', title: 'Architecture: Transactional Outbox Pattern to guarantee DB & Kafka consistency', type: 'architecture', completed: false, xp: 50 },
      { id: 'w9-e', title: 'Explain: How Kafka achieves high throughput compared to traditional message queues', type: 'explain', completed: false, xp: 25 },
      { id: 'w9-b', title: 'Build: Complete Order -> Kafka -> Inventory -> Notification with DLQ & Replay', type: 'build', completed: false, xp: 100 }
    ]
  },
  {
    id: 'w10',
    phase: 1,
    weekNumber: 10,
    dayRange: 'Days 64–70',
    title: 'Observability & System Reliability',
    subtitle: 'Day 70 Checkpoint: OpenTelemetry, CloudWatch dashboards, SLIs/SLOs & Chaos test',
    primarySkill: 'OpenTelemetry, Distributed Tracing & Site Reliability',
    topics: [
      'The 3 Pillars: Structured Logs, Metrics, and Distributed Tracing',
      'OpenTelemetry Node.js SDK (Auto-instrumentation vs Manual spans)',
      'Correlated Trace IDs propagated across HTTP and Kafka headers',
      'SLI, SLO, and SLA definitions (Latency p95/p99, Error budget)',
      'Resilience patterns: Timeouts, Exponential Backoff, Circuit Breaker',
      'Graceful degradation when non-critical dependencies fail',
      'Failure drill: Intentionally terminate a dependency and verify recovery'
    ],
    buildOutput: 'Observability Dashboard & Chaos Test Report',
    buildDescription: 'OpenTelemetry instrumentation, CloudWatch dashboard, 2 SLO definitions, and failure recovery experiment document.',
    systemDesignTopic: 'System Observability, Distributed Tracing & Error Budgeting',
    deliverable: 'Day 70 Checkpoint: Working OTel traces, 2 SLOs, dependency kill post-mortem report',
    status: 'locked',
    plannedDurationDays: 7,
    actualDurationDays: 7,
    xpValue: 250,
    tasks: [
      { id: 'w10-l', title: 'Learn OpenTelemetry context propagation and SLI/SLO mathematical formulas', type: 'learn', completed: false, xp: 25 },
      { id: 'w10-p', title: 'Practice configuring OTel traces in Node.js and setting CloudWatch alarms', type: 'practice', completed: false, xp: 50 },
      { id: 'w10-a', title: 'Architecture: Circuit breaker states (Closed, Open, Half-Open) and fallback', type: 'architecture', completed: false, xp: 50 },
      { id: 'w10-e', title: 'Explain: Distributed tracing context propagation over Kafka message headers', type: 'explain', completed: false, xp: 25 },
      { id: 'w10-b', title: 'Checkpoint: Day 70 Checkpoint (OTel tracing live, 2 SLOs active, Chaos test)', type: 'checkpoint', completed: false, xp: 150 }
    ]
  },
  {
    id: 'w11',
    phase: 1,
    weekNumber: 11,
    dayRange: 'Days 71–77',
    title: 'AI / RAG Slice for Platform Documentation',
    subtitle: 'TypeScript LLM integration, pgvector semantic search & RAG query engine',
    primarySkill: 'AI Integration, Vector Embeddings & pgvector RAG',
    topics: [
      'LLM API Integration with TypeScript',
      'Text Chunking Strategies (Fixed size vs semantic markdown headers)',
      'Generating Vector Embeddings for Architecture Docs and ADRs',
      'PostgreSQL pgvector extension setup, HNSW index & cosine similarity',
      'Retrieval-Augmented Generation (RAG) query flow',
      'Basic prompt evaluation, context injection & hallucination guardrails',
      'Building a production-minded, thin documentation assistant'
    ],
    buildOutput: 'Project Documentation RAG Assistant',
    buildDescription: 'RAG microservice in TypeScript answering technical questions about architecture, ADRs, and runbooks using pgvector.',
    systemDesignTopic: 'RAG Architecture at Scale (Ingestion pipeline, Chunking, Vector DB, Caching)',
    deliverable: 'Tested RAG module querying local architecture markdown files with semantic accuracy',
    status: 'locked',
    plannedDurationDays: 7,
    actualDurationDays: 7,
    xpValue: 250,
    tasks: [
      { id: 'w11-l', title: 'Learn Vector embeddings, cosine similarity math & pgvector indexing', type: 'learn', completed: false, xp: 25 },
      { id: 'w11-p', title: 'Practice writing text chunking scripts and vector similarity SQL queries', type: 'practice', completed: false, xp: 50 },
      { id: 'w11-a', title: 'Architecture: Vector database scaling, hybrid keyword-vector search trade-offs', type: 'architecture', completed: false, xp: 50 },
      { id: 'w11-e', title: 'Explain: Why RAG is preferable to fine-tuning for dynamic company documentation', type: 'explain', completed: false, xp: 25 },
      { id: 'w11-b', title: 'Build: Complete TypeScript RAG query engine over platform ADRs and runbooks', type: 'build', completed: false, xp: 100 }
    ]
  },
  {
    id: 'w12',
    phase: 1,
    weekNumber: 12,
    dayRange: 'Days 78–84',
    title: 'AWS Well-Architected Framework & Security Hardening',
    subtitle: 'Architecture V1 -> V2 review, IAM least-privilege, KMS & 3+ SAA exams',
    primarySkill: 'AWS Well-Architected Pillars & Cloud Security',
    topics: [
      'The 6 Well-Architected Pillars (Operational, Security, Reliability, Performance, Cost, Sustainability)',
      'Security: Least Privilege IAM, AWS Secrets Manager, KMS customer managed keys',
      'Data Encryption at Rest and in Transit across ALB, ECS, and RDS',
      'Conducting an Architecture Review: Identifying high-risk issues',
      'Refactoring Architecture V1 into Architecture V2 with documented trade-offs',
      'Cost optimization audit (NAT Gateway hours, Fargate sizing, RDS reserve options)',
      'Completing 3+ full AWS Solutions Architect Associate practice exams'
    ],
    buildOutput: 'Architecture V2 Blueprint & Well-Architected Review',
    buildDescription: 'Formal Well-Architected Review document comparing Architecture V1 to V2, detailing improvements and cost trade-offs.',
    systemDesignTopic: 'Cloud Security Architecture (Zero Trust, WAF, KMS, Tokenization)',
    deliverable: 'Architecture V2 artifact, Security audit report, 3+ SAA practice exam scores (>75%)',
    status: 'locked',
    plannedDurationDays: 7,
    actualDurationDays: 7,
    xpValue: 250,
    tasks: [
      { id: 'w12-l', title: 'Learn AWS Well-Architected Lens questions & KMS key rotation policies', type: 'learn', completed: false, xp: 25 },
      { id: 'w12-p', title: 'Practice auditing IAM roles with Access Advisor and migrating secrets to Secrets Manager', type: 'practice', completed: false, xp: 50 },
      { id: 'w12-a', title: 'Architecture: Zero trust network segmentation and defense-in-depth principles', type: 'architecture', completed: false, xp: 50 },
      { id: 'w12-e', title: 'Explain: Architecture V1 vs V2 trade-offs regarding cost vs fault tolerance', type: 'explain', completed: false, xp: 25 },
      { id: 'w12-b', title: 'Build: Complete Well-Architected Review V2 document and 3 SAA mock exams', type: 'build', completed: false, xp: 100 }
    ]
  },
  {
    id: 'w13',
    phase: 1,
    weekNumber: 13,
    dayRange: 'Days 85–90',
    title: 'System Design Interview Mastery & Job-Switch Buffer',
    subtitle: 'Day 90 Checkpoint: Mock design rounds, portfolio polish & AWS SAA exam',
    primarySkill: 'Architecture Interviewing & Technical Storytelling',
    topics: [
      'Leading a 45-minute Senior/Platform System Design interview',
      'Technical communication: Requirements, Back-of-the-envelope, High-level, Deep-dive',
      'Behavioral architecture stories using STAR method (Situation, Task, Action, Result)',
      'Polishing GitHub repositories: Architecture diagrams, benchmark figures, runbooks',
      'Drafting 4 high-signal technical LinkedIn posts demonstrating engineering depth',
      'Taking or booking the AWS Certified Solutions Architect Associate (SAA-C03) exam',
      'Buffer time to catch up on any unfinished milestone without pressure'
    ],
    buildOutput: 'Complete Senior Cloud / Platform Engineer Portfolio',
    buildDescription: 'Full public portfolio demonstrating Node.js, AWS, Terraform, Kafka, OTel, and RAG.',
    systemDesignTopic: 'Full Mock System Design Rounds & Architecture Trade-off Defense',
    deliverable: 'Day 90 Checkpoint: Job-switch ready, 6 system design cases mastered, SAA certified or booked',
    status: 'locked',
    plannedDurationDays: 6,
    actualDurationDays: 6,
    xpValue: 250,
    tasks: [
      { id: 'w13-l', title: 'Learn System design interview structure and behavioral executive communication', type: 'learn', completed: false, xp: 25 },
      { id: 'w13-p', title: 'Practice 2 full 45-minute timed mock system design interviews with rubrics', type: 'practice', completed: false, xp: 50 },
      { id: 'w13-a', title: 'Architecture: Defending architectural trade-offs under interviewer pressure', type: 'architecture', completed: false, xp: 50 },
      { id: 'w13-e', title: 'Explain: Walk through your 90-day platform architecture from end to end', type: 'explain', completed: false, xp: 25 },
      { id: 'w13-b', title: 'Checkpoint: Day 90 Final Phase 1 Checkpoint (Job-Switch Ready)', type: 'checkpoint', completed: false, xp: 200 }
    ]
  },

  // ==========================================
  // PHASE 2: DAYS 91–150
  // KUBERNETES & DISTRIBUTED SYSTEMS
  // ==========================================
  {
    id: 'm91',
    phase: 2,
    weekNumber: 14,
    dayRange: 'Days 91–105',
    title: 'Kubernetes Core & Workload Deployment',
    subtitle: 'Pods, ReplicaSets, Deployments, Services & Ingress Controllers',
    primarySkill: 'Kubernetes Architecture & Orchestration',
    topics: [
      'Kubernetes Control Plane: kube-apiserver, etcd, kube-scheduler, kube-controller-manager',
      'Worker Nodes: kubelet, kube-proxy, container runtime',
      'Deployments, Rolling Updates, Rollbacks & Resource Requests/Limits',
      'Services: ClusterIP, NodePort, LoadBalancer & Ingress (Nginx / ALB)',
      'ConfigMaps, Secrets & Volume Mounts',
      'Probes: livenessProbe, readinessProbe, startupProbe'
    ],
    buildOutput: 'Kubernetes Order Platform Manifests',
    buildDescription: 'Declarative K8s manifests running Order Service with zero-downtime rolling updates.',
    systemDesignTopic: 'Container Orchestration at Scale & Multi-Tenant Clusters',
    deliverable: 'Tested local Kubernetes cluster (k3d / minikube) running production manifests',
    status: 'next',
    plannedDurationDays: 14,
    actualDurationDays: 14,
    xpValue: 300,
    tasks: [
      { id: 'm91-1', title: 'Understand control plane reconciliation loop & etcd raft consensus', type: 'learn', completed: false, xp: 30 },
      { id: 'm91-2', title: 'Deploy multi-pod application with health probes and resource limits', type: 'practice', completed: false, xp: 60 },
      { id: 'm91-3', title: 'Configure Ingress routing and TLS termination', type: 'build', completed: false, xp: 100 }
    ]
  },
  {
    id: 'm106',
    phase: 2,
    weekNumber: 15,
    dayRange: 'Days 106–120',
    title: 'EKS, Helm & GitOps with ArgoCD',
    subtitle: 'Managed AWS EKS, package management with Helm & automated GitOps sync',
    primarySkill: 'AWS EKS, Helm Charts & GitOps',
    topics: [
      'Amazon EKS Cluster Provisioning with Terraform',
      'AWS IAM Roles for Service Accounts (IRSA)',
      'Packaging Microservices into Reusable Helm Charts (values.yaml, templates)',
      'GitOps Principles: Git as Single Source of Truth',
      'ArgoCD Deployment, Application Sets & Automated Drift Detection',
      'Horizontal Pod Autoscaler (HPA) based on CPU/Memory metrics'
    ],
    buildOutput: 'Helm Chart Suite & GitOps Pipeline',
    buildDescription: 'Complete Helm chart for Order Service deployed via ArgoCD onto EKS cluster.',
    systemDesignTopic: 'GitOps Continuous Delivery & Canary Deployments',
    deliverable: 'Automated GitOps repository syncing changes to EKS via ArgoCD',
    status: 'later',
    plannedDurationDays: 14,
    actualDurationDays: 14,
    xpValue: 300,
    tasks: [
      { id: 'm106-1', title: 'Learn IRSA OIDC federation for Kubernetes pods accessing AWS resources', type: 'learn', completed: false, xp: 30 },
      { id: 'm106-2', title: 'Write parameterized Helm chart for Order Service with staging/prod values', type: 'practice', completed: false, xp: 60 },
      { id: 'm106-3', title: 'Deploy ArgoCD and set up automated sync with rollback capability', type: 'build', completed: false, xp: 100 }
    ]
  },
  {
    id: 'm121',
    phase: 2,
    weekNumber: 16,
    dayRange: 'Days 121–135',
    title: 'Distributed Systems Core Principles',
    subtitle: 'CAP Theorem, Consensus, Distributed Locks & Partitioning',
    primarySkill: 'Distributed Systems Architecture',
    topics: [
      'CAP Theorem & PACELC Trade-offs in real production databases',
      'Strong Consistency vs Eventual Consistency (Tunable consistency in DynamoDB)',
      'Leader-Follower Replication, Quorum Reads/Writes (R + W > N)',
      'Consistent Hashing & Data Partitioning strategies',
      'Distributed Locking with Redis (Redlock) vs Zookeeper/Etcd leases',
      'Two-Phase Commit (2PC) limitations vs Distributed Consensus (Raft/Paxos)'
    ],
    buildOutput: 'Distributed Lock & Quorum Simulator',
    buildDescription: 'Node.js demonstration of distributed lease acquisition and split-brain mitigation.',
    systemDesignTopic: 'Distributed Storage Engines & Global Consensus Protocols',
    deliverable: 'Technical architecture deep-dive report on distributed consistency models',
    status: 'later',
    plannedDurationDays: 14,
    actualDurationDays: 14,
    xpValue: 300,
    tasks: [
      { id: 'm121-1', title: 'Deep dive into Raft consensus visualization and election safety', type: 'learn', completed: false, xp: 30 },
      { id: 'm121-2', title: 'Implement safe distributed lock with auto-renewing heartbeat lease in TypeScript', type: 'practice', completed: false, xp: 60 },
      { id: 'm121-3', title: 'Design partitioned cache using consistent hashing with virtual nodes', type: 'build', completed: false, xp: 100 }
    ]
  },
  {
    id: 'm136',
    phase: 2,
    weekNumber: 17,
    dayRange: 'Days 136–150',
    title: 'Advanced Microservices & Saga Orchestration',
    subtitle: 'Domain Boundaries, API Gateway, Database per Service & Saga Pattern',
    primarySkill: 'Microservices Decomposition & Saga Transactions',
    topics: [
      'Domain-Driven Design (Bounded Contexts & Aggregate Roots)',
      'Database-per-Service: Avoiding distributed joins with materialized views',
      'API Gateway Pattern (Routing, Rate Limiting, Auth Offloading)',
      'Saga Pattern: Choreography vs Orchestration for distributed transactions',
      'Compensating transactions & handling failure mid-saga',
      'Event Sourcing and CQRS (Command Query Responsibility Segregation)'
    ],
    buildOutput: 'Order & Payment Saga Orchestrator',
    buildDescription: 'Working Saga Orchestrator coordinating Order, Payment, and Inventory microservices with rollback compensating actions.',
    systemDesignTopic: 'Global E-Commerce Distributed Transactions & Saga Recovery',
    deliverable: 'Tested Saga implementation with failure injection demonstrating automatic compensating rollback',
    status: 'later',
    plannedDurationDays: 14,
    actualDurationDays: 14,
    xpValue: 300,
    tasks: [
      { id: 'm136-1', title: 'Compare Saga Orchestration (state machine) vs Choreography (event-driven)', type: 'learn', completed: false, xp: 30 },
      { id: 'm136-2', title: 'Implement compensating transactions for payment refund and stock un-reservation', type: 'practice', completed: false, xp: 60 },
      { id: 'm136-3', title: 'Build and verify complete Saga state machine in TypeScript with test suite', type: 'build', completed: false, xp: 100 }
    ]
  },

  // ==========================================
  // PHASE 3: DAYS 151–210+
  // AI ARCHITECT & GLOBAL CLOUD ARCHITECTURE
  // ==========================================
  {
    id: 'm151',
    phase: 3,
    weekNumber: 18,
    dayRange: 'Days 151–170',
    title: 'Autonomous AI Agents & Model Context Protocol (MCP)',
    subtitle: 'Tool use, agentic reasoning loops, memory systems & MCP server integration',
    primarySkill: 'AI Agent Architecture & MCP Protocols',
    topics: [
      'Agentic Design Patterns: ReAct (Reason + Act), Reflection, Multi-agent collaboration',
      'Model Context Protocol (MCP) Client and Server specifications',
      'Tool Calling with structured schemas and JSON schema validation',
      'Short-term vs Long-term Vector Memory systems for autonomous agents',
      'Guardrails, Rate-limiting, and cost containment for LLM API calls',
      'Building an Enterprise Architecture Assistant with MCP tool access'
    ],
    buildOutput: 'Architecture Review AI Agent with MCP Tools',
    buildDescription: 'Agentic assistant capable of querying GitHub repos, inspecting Terraform plans, and evaluating architecture against Well-Architected criteria.',
    systemDesignTopic: 'AI Agent Platform with Distributed Tool Execution',
    deliverable: 'Working MCP server and agent harness running local tools with structured telemetry',
    status: 'locked',
    plannedDurationDays: 20,
    actualDurationDays: 20,
    xpValue: 400,
    tasks: [
      { id: 'm151-1', title: 'Study MCP JSON-RPC protocol specification and tool discovery lifecycle', type: 'learn', completed: false, xp: 40 },
      { id: 'm151-2', title: 'Build custom MCP server exposing cloud cost estimation and ADR validation tools', type: 'practice', completed: false, xp: 80 },
      { id: 'm151-3', title: 'Implement agentic loop with tool reflection and structured output', type: 'build', completed: false, xp: 150 }
    ]
  },
  {
    id: 'm171',
    phase: 3,
    weekNumber: 19,
    dayRange: 'Days 171–190',
    title: 'Multi-Region Cloud Architecture & Disaster Recovery',
    subtitle: 'Active-Active deployments, global databases, Route53 latency routing & RTO/RPO',
    primarySkill: 'Global Cloud Architecture & Disaster Recovery',
    topics: [
      'Disaster Recovery Strategies: Backup & Restore, Pilot Light, Warm Standby, Multi-Region Active-Active',
      'Defining and achieving Recovery Time Objective (RTO) and Recovery Point Objective (RPO)',
      'AWS Route 53 Latency-Based, Geolocation & Failover DNS Routing',
      'Amazon Aurora Global Database with sub-second replication latency',
      'DynamoDB Global Tables with multi-region active-active writes',
      'Cross-region data consistency, replication lag & conflict resolution (Last-Write-Wins vs CRDT)'
    ],
    buildOutput: 'Multi-Region Failover Architecture Blueprint',
    buildDescription: 'Complete multi-region Terraform blueprint featuring automated Route 53 health-check failover and cross-region Aurora replication.',
    systemDesignTopic: 'Global Ride-Sharing Platform (Geo-sharding, Multi-Region Active-Active)',
    deliverable: 'Automated multi-region failover simulation and RTO/RPO calculation spreadsheet',
    status: 'locked',
    plannedDurationDays: 20,
    actualDurationDays: 20,
    xpValue: 400,
    tasks: [
      { id: 'm171-1', title: 'Calculate RTO/RPO financial impact and multi-region egress cost models', type: 'learn', completed: false, xp: 40 },
      { id: 'm171-2', title: 'Configure Route 53 health-checked DNS failover between primary and secondary regions', type: 'practice', completed: false, xp: 80 },
      { id: 'm171-3', title: 'Simulate region outage and document automated recovery steps', type: 'build', completed: false, xp: 150 }
    ]
  },
  {
    id: 'm191',
    phase: 3,
    weekNumber: 20,
    dayRange: 'Days 191–210+',
    title: 'Flagship AI Cloud Architecture Platform & Principal Review',
    subtitle: 'End-to-End Capstone: Distributed cloud-native platform integrating EDA, K8s, RAG & AI Agents',
    primarySkill: 'Principal Solution Architecture & Executive Storytelling',
    topics: [
      'Synthesizing Backend + Cloud + DevOps + Distributed Systems + AI into one coherent platform',
      'Executive Architecture Presentation: Justifying $50k/mo cloud spend and ROI',
      'FinOps Principles: Cloud Unit Economics, Spot Instances, Saving Plans',
      'Defending architecture against Principal Architect & Staff+ level panels',
      'Creating open-source architecture whitepaper and conference-grade diagrams',
      'Landing the high-paying Cloud Architect / Principal Backend Engineer offer'
    ],
    buildOutput: 'Flagship AI Cloud Architecture Platform',
    buildDescription: 'Production-ready showcase platform combining event-driven microservices, Kubernetes on AWS, Terraform IaC, OpenTelemetry, and agentic AI.',
    systemDesignTopic: 'Enterprise AI Cloud Architecture Platform Design',
    deliverable: 'Conference-grade GitHub portfolio, published whitepaper, and executive architecture defense presentation',
    status: 'locked',
    plannedDurationDays: 20,
    actualDurationDays: 20,
    xpValue: 500,
    tasks: [
      { id: 'm191-1', title: 'Conduct comprehensive FinOps cost optimization and unit economics analysis', type: 'learn', completed: false, xp: 50 },
      { id: 'm191-2', title: 'Record a 15-minute high-impact video architecture walkthrough for hiring directors', type: 'practice', completed: false, xp: 100 },
      { id: 'm191-3', title: 'Final Capstone: Publish Flagship Platform and achieve Cloud Architect rank', type: 'checkpoint', completed: false, xp: 250 }
    ]
  }
];

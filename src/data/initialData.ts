import { UserProfile, ADR, ProjectEntry, SaaTopic, Achievement, JobApplication } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Senior Backend Engineer',
  headline: 'Senior Node.js Backend Developer → Cloud / Platform Engineer → Architect',
  currentRole: 'Senior Node.js Backend Developer (7+ YOE)',
  targetRole: 'Cloud / Platform Engineer / Solution Architect',
  level: 1,
  xp: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastActivityDate: '',
  streakStartDate: '',
  weeklyTargetHours: 9, // Options: 9 (90 days), 5 (150 days), 3 (210 days)
  dailyRoutineMinutes: 60, // Options: 20, 30, 45, 60, 90
  completedTaskIds: [],
  achievementsUnlocked: [],
  themeMode: 'daily',
  manualAccent: '#3b82f6'
};

export const INITIAL_ADRS: ADR[] = [
  {
    id: 'ADR-001',
    title: 'Why Choose PostgreSQL as the Primary Database for Order Service',
    status: 'Accepted',
    date: '2026-03-01',
    context: 'Order Service V1 requires an ACID-compliant transactional datastore capable of managing order life-cycles, inventory reservations, customer profiles, and audit trails under concurrent load.',
    problem: 'Choosing between a relational database (PostgreSQL), document store (MongoDB), or distributed NoSQL (DynamoDB) for core e-commerce order processing.',
    options: '1. PostgreSQL (ACID relational)\n2. MongoDB (Flexible document store)\n3. Amazon DynamoDB (High-throughput key-value)',
    decision: 'Adopt PostgreSQL as the primary transactional storage engine for Order Service.',
    reason: 'Order states, payment authorizations, and inventory decrements require strict atomicity and serializable isolation to prevent double allocation. PostgreSQL provides battle-tested ACID compliance, JSONB support for dynamic order line-item attributes, rock-solid B-tree indexing, and native pgvector extension capability for future AI/RAG integration.',
    tradeoffs: 'Relational databases require deliberate vertical scaling or read-replica connection pooling (PgBouncer) compared to out-of-the-box horizontal partitioning in DynamoDB. However, order transactions strictly demand consistency over partition tolerance at this phase.',
    consequences: 'All order modifications will execute within database transactions. Connection pooling must be configured via PgBouncer or RDS Proxy in AWS.',
    milestoneId: 'w4'
  },
  {
    id: 'ADR-002',
    title: 'AWS SQS vs Apache Kafka for Asynchronous Event Distribution',
    status: 'Accepted',
    date: '2026-03-15',
    context: 'Order Service needs to notify downstream microservices (Inventory, Notification, Analytics) whenever an order status transitions (e.g., `OrderPlaced`, `PaymentConfirmed`, `OrderCancelled`).',
    problem: 'Determine whether to use AWS SQS / SNS (managed message queue) or Apache Kafka (distributed event log) as the communication backbone.',
    options: '1. AWS SQS + SNS Fanout (Fully managed queues)\n2. Apache Kafka (Distributed commit log)\n3. RabbitMQ (AMQP message broker)',
    decision: 'Use AWS SQS for simple task-worker offloading in Phase 1 AWS deployment; introduce Apache Kafka in Week 9 for multi-consumer event stream replay and partition ordering.',
    reason: 'SQS provides zero-maintenance, infinite autoscaling for simple point-to-point queues. However, Kafka is essential when multiple decoupled consumer groups need to independently consume identical historical event streams, guarantee strict partition key ordering (by `order_id`), and replay events from specific offsets.',
    tradeoffs: 'Kafka introduces operational overhead (cluster management, partition sizing, consumer group rebalancing) whereas SQS is serverless. We mitigate Kafka cost by running local KRaft clusters in Docker for development and evaluating AWS MSK only for production scale.',
    consequences: 'Downstream consumers must be engineered to be strictly idempotent to handle at-least-once delivery guarantees.',
    milestoneId: 'w6'
  },
  {
    id: 'ADR-003',
    title: 'AWS ECS Fargate vs Kubernetes (EKS) for Phase 1 Container Orchestration',
    status: 'Accepted',
    date: '2026-03-22',
    context: 'The platform must run containerized Node.js services reliably in AWS with automated scaling, zero server patching, and low maintenance overhead during the 90-day job-switch phase.',
    problem: 'Choosing the appropriate compute orchestration platform between AWS ECS Fargate and AWS EKS (Kubernetes) for Phase 1.',
    options: '1. AWS ECS Fargate (Serverless container management)\n2. AWS EKS (Managed Kubernetes)\n3. AWS App Runner / Elastic Beanstalk (PaaS)',
    decision: 'Adopt AWS ECS with AWS Fargate serverless launch type for Phase 1 (first 90 days), deferring Kubernetes / EKS to Phase 2 (Days 91-150).',
    reason: 'ECS Fargate eliminates EC2 node provisioning, OS patching, and Kubernetes control-plane complexity. It integrates natively with Application Load Balancers, CloudWatch, and AWS IAM roles for tasks. For a 90-day job-switch timeline with ~9 hours/week, mastering ECS + Terraform delivers high-signal cloud competence without sinking 60+ hours into Kubernetes primitives.',
    tradeoffs: 'ECS is proprietary to AWS and lacks the rich declarative ecosystem of Helm, ArgoCD, and CRDs. These will be tackled systematically in Phase 2 once the initial cloud engineer foundation is secure.',
    consequences: 'Deployment definitions will use ECS Task Definitions and Terraform `aws_ecs_service` modules.',
    milestoneId: 'w6'
  }
];

export const INITIAL_PROJECTS: ProjectEntry[] = [
  {
    id: 'proj-w2',
    weekNumber: 2,
    title: 'Order Service V1',
    version: 'V1.0',
    description: 'Production-ready Node.js & TypeScript REST API with PostgreSQL, Zod validation, and Pino structured logging.',
    technologies: ['Node.js', 'TypeScript', 'Express', 'PostgreSQL', 'Zod', 'Pino', 'Vitest'],
    architectureSummary: 'Layered architecture: Controller -> Service -> Repository. Centralized error handling mapping domain exceptions to HTTP status codes with correlated UUID request IDs.',
    completed: false,
    githubUrl: 'https://github.com/your-username/order-service-v1',
    readmeMarkdown: `# 📦 Order Service V1

A production-grade, strictly typed e-commerce Order Processing API built with Node.js, TypeScript, Express, and PostgreSQL.

## 🏗️ Architecture & Technical Decisions
- **Layered Clean Architecture**: Strict decoupling between HTTP controllers, domain business logic, and repository database operations.
- **Strict Validation**: Every inbound request is validated at runtime using **Zod** schemas, providing compile-time type safety with zero runtime leaks.
- **High-Performance Structured Logging**: **Pino** emits JSON logs with correlated \`x-request-id\` headers for end-to-end traceability.
- **Defensive Error Handling**: Typed domain exceptions (\`NotFoundError\`, \`ConflictError\`, \`ValidationError\`) handled by a global error boundary.

## 🚀 Getting Started
\`\`\`bash
npm install
npm run test
npm run dev
\`\`\`
`,
    linkedinPostMarkdown: `🚀 Building Order Service V1: Why I Chose Strict TypeScript & Zod Over Generic Express

Over the past week, I've been engineering the first iteration of my cloud-native Order Service platform. 

Here is what I built and the architectural trade-offs made:
🔹 Replaced untyped request bodies with strict Zod runtime schemas.
🔹 Implemented correlation IDs across all request lifecycles using Pino JSON structured logging.
🔹 Standardized domain errors to prevent internal database schemas from leaking to API consumers.

Next week: Integrating Redis cache-aside and containerizing with multi-stage Docker builds.

Check out the GitHub repo: https://github.com/your-username/order-service-v1
#NodeJS #TypeScript #BackendArchitecture #SoftwareEngineering #CloudReady`
  },
  {
    id: 'proj-w3',
    weekNumber: 3,
    title: 'Order Service V2 (Caching & Containers)',
    version: 'V2.0',
    description: 'Added Redis cache-aside layer, PostgreSQL index tuning with EXPLAIN ANALYZE, and multi-stage Docker Compose.',
    technologies: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Docker Compose'],
    architectureSummary: 'Cache-aside pattern with TTL invalidation. Optimized database indexes using EXPLAIN ANALYZE. Packaged via multi-stage non-root Dockerfile.',
    completed: false,
    githubUrl: 'https://github.com/your-username/order-service-v2'
  },
  {
    id: 'proj-w4',
    weekNumber: 4,
    title: 'Order Service V3 (CI & Architecture Docs)',
    version: 'V3.0',
    description: 'Day 28 Checkpoint: Automated GitHub Actions CI pipeline, C4 system architecture diagrams, and ADR-001.',
    technologies: ['GitHub Actions', 'Docker', 'Mermaid C4', 'ADR', 'Markdown'],
    architectureSummary: 'Continuous integration running linter, Vitest test suite, and automated Docker container builds. C4 Context & Container diagrams documenting system topology.',
    completed: false,
    githubUrl: 'https://github.com/your-username/order-service-v3'
  },
  {
    id: 'proj-w6',
    weekNumber: 6,
    title: 'AWS Cloud Deployment (ECS + RDS)',
    version: 'V4.0',
    description: 'Deploy Order Service container to AWS ECS/Fargate behind an Application Load Balancer with Multi-AZ RDS PostgreSQL.',
    technologies: ['AWS VPC', 'ECS Fargate', 'RDS PostgreSQL', 'ALB', 'ECR'],
    architectureSummary: 'High-availability multi-AZ deployment. Stateless containers in private subnets with NAT Gateway; public ALB terminating SSL and routing health checks.',
    completed: false
  },
  {
    id: 'proj-w7',
    weekNumber: 7,
    title: 'Terraform Infrastructure as Code',
    version: 'V5.0',
    description: 'Automated reproduction of the entire AWS architecture using modular Terraform HCL with S3 backend state locking.',
    technologies: ['Terraform', 'HCL', 'AWS S3', 'DynamoDB', 'AWS Providers'],
    architectureSummary: 'Modular IaC architecture: `modules/vpc`, `modules/ecs`, `modules/rds`, `modules/alb`. Validated through automated destroy and recreation cycles.',
    completed: false
  },
  {
    id: 'proj-w9',
    weekNumber: 9,
    title: 'Event-Driven Architecture with Kafka',
    version: 'V6.0',
    description: 'Decoupled Order, Inventory, and Notification services communicating via Kafka topics with DLQ and consumer replay.',
    technologies: ['Apache Kafka', 'Node.js', 'kafkajs', 'Docker', 'Transactional Outbox'],
    architectureSummary: 'Asynchronous event stream with partition key ordering by `order_id`. Dead-letter queues for poison-pill handling and consumer group rebalancing.',
    completed: false
  },
  {
    id: 'proj-w10',
    weekNumber: 10,
    title: 'Observability & SRE Reliability Suite',
    version: 'V7.0',
    description: 'OpenTelemetry distributed tracing, CloudWatch latency dashboards, 2 formal SLOs, and chaos dependency kill report.',
    technologies: ['OpenTelemetry', 'CloudWatch', 'SLI/SLO', 'Jaeger', 'Prometheus'],
    architectureSummary: 'W3C TraceContext propagation across HTTP and Kafka headers. P99 latency alerts and automated dependency failure post-mortem documentation.',
    completed: false
  },
  {
    id: 'proj-w11',
    weekNumber: 11,
    title: 'Architecture Documentation RAG Engine',
    version: 'V8.0',
    description: 'TypeScript RAG assistant utilizing PostgreSQL `pgvector` to semantically query system runbooks, architecture decisions, and ADRs.',
    technologies: ['TypeScript', 'pgvector', 'PostgreSQL', 'Embeddings', 'Gemini API', 'RAG'],
    architectureSummary: 'Chunking pipeline storing 1536-dim embeddings in PostgreSQL with HNSW indexing. Sub-second semantic search with context-injected responses.',
    completed: false
  }
];

export const INITIAL_SAA_TOPICS: SaaTopic[] = [
  { id: 'saa-1', domain: 'Design Resilient Architectures (26%)', title: 'Multi-AZ VPC Subnet Design & NAT Gateways', confidence: 80, notes: 'Understand public vs private route tables and NAT Gateway placement.', isWeakTopic: false },
  { id: 'saa-2', domain: 'Design Resilient Architectures (26%)', title: 'Route 53 Routing Policies & DNS Health Checks', confidence: 75, notes: 'Failover vs Latency vs Geolocation routing policies.', isWeakTopic: false },
  { id: 'saa-3', domain: 'Design Resilient Architectures (26%)', title: 'Auto Scaling Groups & ALB Target Groups', confidence: 85, notes: 'Scaling policies (target tracking, step scaling) and drain timeouts.', isWeakTopic: false },
  { id: 'saa-4', domain: 'Design High-Performing Architectures (24%)', title: 'Amazon RDS Multi-AZ vs Read Replicas', confidence: 90, notes: 'Multi-AZ is synchronous for DR; Read Replicas are asynchronous for read offloading.', isWeakTopic: false },
  { id: 'saa-5', domain: 'Design High-Performing Architectures (24%)', title: 'ElastiCache (Redis vs Memcached) Caching Strategies', confidence: 85, notes: 'Redis supports data structures, clustering, pub/sub; Memcached is pure multithreaded key-value.', isWeakTopic: false },
  { id: 'saa-6', domain: 'Design High-Performing Architectures (24%)', title: 'DynamoDB Partition Keys & Global Secondary Indexes', confidence: 65, notes: 'Deep dive into hot partitions, RCU/WCU calculation, and GSI/LSI differences.', isWeakTopic: true },
  { id: 'saa-7', domain: 'Design Secure Architectures (30%)', title: 'AWS IAM Roles, Policies & Cross-Account Access', confidence: 85, notes: 'Role assumption, trust policies, and least-privilege boundary policies.', isWeakTopic: false },
  { id: 'saa-8', domain: 'Design Secure Architectures (30%)', title: 'AWS KMS Envelope Encryption & Secrets Manager', confidence: 70, notes: 'Customer managed keys, automatic key rotation, and KMS API quotas.', isWeakTopic: true },
  { id: 'saa-9', domain: 'Design Secure Architectures (30%)', title: 'Security Groups vs Network ACLs', confidence: 95, notes: 'Stateful security groups at instance level vs stateless NACLs at subnet boundary.', isWeakTopic: false },
  { id: 'saa-10', domain: 'Design Cost-Optimized Architectures (20%)', title: 'S3 Storage Classes & Lifecycle Transitions', confidence: 90, notes: 'Standard -> Standard-IA -> Glacier Flexible -> Deep Archive transition rules.', isWeakTopic: false },
  { id: 'saa-11', domain: 'Design Cost-Optimized Architectures (20%)', title: 'Compute Savings Plans vs Reserved Instances vs Spot', confidence: 75, notes: 'Spot interruptions, 1-3 year commitments, and convertible options.', isWeakTopic: false }
];

export const INITIAL_JOB_APPLICATIONS: JobApplication[] = [
  {
    id: 'job-1',
    company: 'Stripe',
    role: 'Senior Platform Engineer (Node.js/Cloud)',
    location: 'Remote / US',
    jobUrl: 'https://stripe.com/jobs',
    applicationDate: '2026-03-20',
    resumeVersion: 'Resume-V1-CloudBackend.pdf',
    status: 'Saved',
    interviewStage: 'Preparation',
    feedback: 'Requires strong understanding of idempotency and payment ledgers.',
    missingSkills: 'Distributed tracing at scale',
    followUpDate: '2026-03-25'
  },
  {
    id: 'job-2',
    company: 'Datadog',
    role: 'Cloud Software Engineer (Node.js/AWS)',
    location: 'Remote / Hybrid',
    jobUrl: 'https://datadoghq.com/careers',
    applicationDate: '2026-03-22',
    resumeVersion: 'Resume-V1-CloudBackend.pdf',
    status: 'Applied',
    interviewStage: 'Recruiter Screen',
    feedback: 'Loved the OpenTelemetry and Terraform hands-on project portfolio.',
    missingSkills: 'eBPF basics',
    followUpDate: '2026-03-28'
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'ach-first-task', title: 'First Spark', description: 'Complete your first daily learning or practice task', icon: '⚡', xpAward: 50, unlocked: false },
  { id: 'ach-practice-minimum', title: 'Consistency Standard', description: 'Complete the 20-minute practice minimum routine', icon: '🧪', xpAward: 50, unlocked: false },
  { id: 'ach-streak-3', title: 'Momentum Builder', description: 'Maintain a 3-day learning streak', icon: '🔥', xpAward: 100, unlocked: false },
  { id: 'ach-streak-7', title: 'Unstoppable Habit', description: 'Maintain a 7-day learning streak', icon: '🌟', xpAward: 200, unlocked: false },
  { id: 'ach-m1-complete', title: 'TypeScript Master', description: 'Complete Week 1: TypeScript Advanced Types & Project Scaffold', icon: '🛡️', xpAward: 250, unlocked: false },
  { id: 'ach-day-28', title: 'Day 28 Checkpoint', description: 'Complete Week 4: Order Service V1 public, Docker, CI, and Resume V1', icon: '🏆', xpAward: 500, unlocked: false },
  { id: 'ach-aws-pioneer', title: 'Cloud Pioneer', description: 'Deploy Order Service to AWS ECS/Fargate with RDS', icon: '☁️', xpAward: 250, unlocked: false },
  { id: 'ach-terraform-master', title: 'Infrastructure Architect', description: 'Recreate complete AWS infrastructure with Terraform', icon: '🏗️', xpAward: 250, unlocked: false },
  { id: 'ach-day-56', title: 'Day 56 Checkpoint', description: 'Automate OIDC deployment pipeline and activate Job Search', icon: '💼', xpAward: 500, unlocked: false },
  { id: 'ach-kafka-streamer', title: 'Event-Driven Architect', description: 'Implement Kafka event pipeline with retry and DLQ', icon: '📡', xpAward: 250, unlocked: false },
  { id: 'ach-day-70', title: 'Day 70 Checkpoint', description: 'Deploy OpenTelemetry tracing, SLOs, and survive chaos drill', icon: '🔬', xpAward: 500, unlocked: false },
  { id: 'ach-rag-builder', title: 'AI Engineer', description: 'Build documentation RAG query service with pgvector', icon: '🧠', xpAward: 250, unlocked: false },
  { id: 'ach-day-90', title: 'Job-Switch Ready!', description: 'Complete all 13 weeks of Phase 1: Portfolio, SAA & mock interviews', icon: '👑', xpAward: 1000, unlocked: false }
];

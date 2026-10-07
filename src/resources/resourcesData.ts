import { ResourceItem } from '../types';

export const INITIAL_RESOURCES: ResourceItem[] = [
  // ==========================================
  // WEEK 1: TYPESCRIPT FUNDAMENTALS
  // ==========================================
  {
    id: 'res-w1-quick',
    milestoneId: 'w1',
    topic: 'TypeScript Advanced Types',
    title: 'TypeScript in 20 Minutes: Generics, Unions & Strict Types',
    provider: 'TypeScript Official Walkthrough',
    url: 'https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html',
    type: 'quick',
    estimatedMinutes: 20,
    isFree: true,
    lastReviewed: '2026-02-15'
  },
  {
    id: 'res-w1-deep',
    milestoneId: 'w1',
    topic: 'TypeScript Advanced Types',
    title: 'Tackling TypeScript: In-Depth Type Manipulations & Mapped Types',
    provider: 'Dr. Axel Rauschmayer / ExploringJS',
    url: 'https://exploringjs.com/tackling-ts/',
    type: 'deep',
    estimatedMinutes: 60,
    isFree: true,
    lastReviewed: '2026-01-20'
  },
  {
    id: 'res-w1-official',
    milestoneId: 'w1',
    topic: 'TypeScript Handbook',
    title: 'Official TypeScript Handbook: Narrowing & Generics',
    provider: 'Microsoft Official Documentation',
    url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
    type: 'official',
    estimatedMinutes: 45,
    isFree: true,
    lastReviewed: '2026-03-01'
  },
  {
    id: 'res-w1-lab',
    milestoneId: 'w1',
    topic: 'TypeScript Exercises',
    title: 'Type-Challenges Interactive Open-Source Lab',
    provider: 'GitHub Type-Challenges Community',
    url: 'https://github.com/type-challenges/type-challenges',
    type: 'lab',
    estimatedMinutes: 40,
    isFree: true,
    lastReviewed: '2026-02-28'
  },

  // ==========================================
  // WEEK 2: NODE.JS + TYPESCRIPT PRODUCTION API
  // ==========================================
  {
    id: 'res-w2-quick',
    milestoneId: 'w2',
    topic: 'Node.js Event Loop',
    title: 'The Node.js Event Loop, Timers, and process.nextTick() Explained',
    provider: 'Node.js Official Learn',
    url: 'https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick',
    type: 'quick',
    estimatedMinutes: 20,
    isFree: true,
    lastReviewed: '2026-02-10'
  },
  {
    id: 'res-w2-deep',
    milestoneId: 'w2',
    topic: 'Express & Zod Production Architecture',
    title: 'Production REST API Architecture with TypeScript, Express & Zod',
    provider: 'Node Best Practices Guide (Goldbergyoni)',
    url: 'https://github.com/goldbergyoni/nodebestpractices',
    type: 'deep',
    estimatedMinutes: 60,
    isFree: true,
    lastReviewed: '2026-02-18'
  },
  {
    id: 'res-w2-official',
    milestoneId: 'w2',
    topic: 'Node.js Documentation',
    title: 'Node.js Official Documentation & Best Practices',
    provider: 'Node.js Official',
    url: 'https://nodejs.org/docs/latest/api/',
    type: 'official',
    estimatedMinutes: 40,
    isFree: true,
    lastReviewed: '2026-03-01'
  },
  {
    id: 'res-w2-lab',
    milestoneId: 'w2',
    topic: 'Hands-on Production API',
    title: 'Build a Fully Typed Express + PostgreSQL CRUD with Zod and Pino',
    provider: 'Node.js Official Labs',
    url: 'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs',
    type: 'lab',
    estimatedMinutes: 45,
    isFree: true,
    lastReviewed: '2026-02-20'
  },

  // ==========================================
  // WEEK 3: POSTGRES + REDIS + DOCKER
  // ==========================================
  {
    id: 'res-w3-quick',
    milestoneId: 'w3',
    topic: 'PostgreSQL Indexing & EXPLAIN',
    title: 'Understanding PostgreSQL EXPLAIN ANALYZE in 15 Minutes',
    provider: 'PostgreSQL Official Tutorial',
    url: 'https://www.postgresql.org/docs/current/using-explain.html',
    type: 'quick',
    estimatedMinutes: 20,
    isFree: true,
    lastReviewed: '2026-01-15'
  },
  {
    id: 'res-w3-deep',
    milestoneId: 'w3',
    topic: 'Redis Caching Patterns',
    title: 'Redis Cache-Aside Pattern, TTL & Invalidation Strategies',
    provider: 'Redis University Official',
    url: 'https://redis.io/learn/howtos/solutions/caching/cache-aside',
    type: 'deep',
    estimatedMinutes: 50,
    isFree: true,
    lastReviewed: '2026-02-22'
  },
  {
    id: 'res-w3-official',
    milestoneId: 'w3',
    topic: 'Docker Multi-stage Builds',
    title: 'Docker Official Multi-Stage Build Documentation',
    provider: 'Docker Official Docs',
    url: 'https://docs.docker.com/build/building/multi-stage/',
    type: 'official',
    estimatedMinutes: 30,
    isFree: true,
    lastReviewed: '2026-03-01'
  },
  {
    id: 'res-w3-lab',
    milestoneId: 'w3',
    topic: 'Docker Compose Local Stack',
    title: 'Assemble Multi-Container App, Postgres & Redis Stack with Compose',
    provider: 'Docker Get Started Labs',
    url: 'https://docs.docker.com/compose/gettingstarted/',
    type: 'lab',
    estimatedMinutes: 45,
    isFree: true,
    lastReviewed: '2026-02-12'
  },

  // ==========================================
  // WEEK 4: GITHUB ACTIONS + C4 + ADR
  // ==========================================
  {
    id: 'res-w4-quick',
    milestoneId: 'w4',
    topic: 'C4 Model Diagrams',
    title: 'The C4 Model for Visualising Software Architecture',
    provider: 'Simon Brown / C4 Model Official',
    url: 'https://c4model.com/',
    type: 'quick',
    estimatedMinutes: 20,
    isFree: true,
    lastReviewed: '2026-02-01'
  },
  {
    id: 'res-w4-deep',
    milestoneId: 'w4',
    topic: 'Architecture Decision Records',
    title: 'Documenting Architecture Decisions with ADRs (Michael Nygard format)',
    provider: 'ADR GitHub Organization',
    url: 'https://adr.github.io/',
    type: 'deep',
    estimatedMinutes: 40,
    isFree: true,
    lastReviewed: '2026-01-28'
  },
  {
    id: 'res-w4-official',
    milestoneId: 'w4',
    topic: 'GitHub Actions',
    title: 'GitHub Actions Official Documentation & Workflow Syntax',
    provider: 'GitHub Official',
    url: 'https://docs.github.com/en/actions',
    type: 'official',
    estimatedMinutes: 35,
    isFree: true,
    lastReviewed: '2026-03-01'
  },
  {
    id: 'res-w4-lab',
    milestoneId: 'w4',
    topic: 'CI Pipeline Lab',
    title: 'Build and Publish a Container via GitHub Actions CI Workflow',
    provider: 'GitHub Skills Interactive Lab',
    url: 'https://skills.github.com/',
    type: 'lab',
    estimatedMinutes: 45,
    isFree: true,
    lastReviewed: '2026-02-25'
  },

  // ==========================================
  // WEEK 5: AWS CORE + NETWORKING
  // ==========================================
  {
    id: 'res-w5-quick',
    milestoneId: 'w5',
    topic: 'AWS VPC Fundamentals',
    title: 'AWS VPC & Subnet Networking in 15 Minutes',
    provider: 'AWS Skill Builder Official',
    url: 'https://explore.skillbuilder.aws/learn',
    type: 'quick',
    estimatedMinutes: 20,
    isFree: true,
    lastReviewed: '2026-02-14'
  },
  {
    id: 'res-w5-deep',
    milestoneId: 'w5',
    topic: 'AWS Solutions Architect Associate Guide',
    title: 'AWS SAA-C03 Official Exam Guide & Study Blueprint',
    provider: 'AWS Training & Certification',
    url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
    type: 'deep',
    estimatedMinutes: 60,
    isFree: true,
    lastReviewed: '2026-03-01'
  },
  {
    id: 'res-w5-official',
    milestoneId: 'w5',
    topic: 'AWS Networking Docs',
    title: 'Amazon VPC User Guide: Route Tables, NAT Gateways & Security Groups',
    provider: 'AWS Official Documentation',
    url: 'https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html',
    type: 'official',
    estimatedMinutes: 45,
    isFree: true,
    lastReviewed: '2026-03-01'
  },
  {
    id: 'res-w5-lab',
    milestoneId: 'w5',
    topic: 'AWS VPC Hands-on Workshop',
    title: 'AWS Hands-on Workshop: Build a Modular Multi-AZ VPC',
    provider: 'AWS Workshops Official',
    url: 'https://workshops.aws/categories/Networking',
    type: 'lab',
    estimatedMinutes: 60,
    isFree: true,
    lastReviewed: '2026-02-20'
  },

  // ==========================================
  // WEEK 6: AWS ECS / FARGATE / RDS
  // ==========================================
  {
    id: 'res-w6-quick',
    milestoneId: 'w6',
    topic: 'Amazon ECS & Fargate',
    title: 'Deploying Containers with Amazon ECS and Fargate Serverless Compute',
    provider: 'AWS Containers Official',
    url: 'https://aws.amazon.com/fargate/',
    type: 'quick',
    estimatedMinutes: 20,
    isFree: true,
    lastReviewed: '2026-02-15'
  },
  {
    id: 'res-w6-deep',
    milestoneId: 'w6',
    topic: 'Amazon RDS & ElastiCache',
    title: 'High Availability Multi-AZ Architecture with RDS PostgreSQL',
    provider: 'AWS Architecture Center',
    url: 'https://aws.amazon.com/rds/postgresql/',
    type: 'deep',
    estimatedMinutes: 50,
    isFree: true,
    lastReviewed: '2026-02-18'
  },
  {
    id: 'res-w6-official',
    milestoneId: 'w6',
    topic: 'AWS ECS Documentation',
    title: 'Amazon Elastic Container Service Official Developer Guide',
    provider: 'AWS Official Documentation',
    url: 'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html',
    type: 'official',
    estimatedMinutes: 40,
    isFree: true,
    lastReviewed: '2026-03-01'
  },
  {
    id: 'res-w6-lab',
    milestoneId: 'w6',
    topic: 'ECS Hands-on Workshop',
    title: 'Deploy a Node.js Microservice to ECS Fargate with ALB and RDS',
    provider: 'AWS Workshops Official',
    url: 'https://ecsworkshop.com/',
    type: 'lab',
    estimatedMinutes: 60,
    isFree: true,
    lastReviewed: '2026-02-22'
  },

  // ==========================================
  // WEEK 7: TERRAFORM
  // ==========================================
  {
    id: 'res-w7-quick',
    milestoneId: 'w7',
    topic: 'Terraform Fundamentals',
    title: 'Terraform in 20 Minutes: State, Providers & Declarative HCL',
    provider: 'HashiCorp Developer Official',
    url: 'https://developer.hashicorp.com/terraform/intro',
    type: 'quick',
    estimatedMinutes: 20,
    isFree: true,
    lastReviewed: '2026-02-10'
  },
  {
    id: 'res-w7-deep',
    milestoneId: 'w7',
    topic: 'Terraform Modules & Remote State',
    title: 'Reusable Terraform Modules with S3 Backend and DynamoDB Locking',
    provider: 'HashiCorp Tutorials',
    url: 'https://developer.hashicorp.com/terraform/tutorials/modules/module',
    type: 'deep',
    estimatedMinutes: 55,
    isFree: true,
    lastReviewed: '2026-02-16'
  },
  {
    id: 'res-w7-official',
    milestoneId: 'w7',
    topic: 'HashiCorp AWS Provider',
    title: 'Official Terraform AWS Provider Resource Reference',
    provider: 'HashiCorp Registry',
    url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs',
    type: 'official',
    estimatedMinutes: 40,
    isFree: true,
    lastReviewed: '2026-03-01'
  },
  {
    id: 'res-w7-lab',
    milestoneId: 'w7',
    topic: 'Terraform Hands-on Lab',
    title: 'Spin Up and Destroy an Automated AWS Infrastructure Stack',
    provider: 'HashiCorp Interactive Tutorials',
    url: 'https://developer.hashicorp.com/terraform/tutorials/aws-get-started',
    type: 'lab',
    estimatedMinutes: 50,
    isFree: true,
    lastReviewed: '2026-02-25'
  },

  // ==========================================
  // WEEK 8: GITHUB OIDC + AWS DEPLOYMENT
  // ==========================================
  {
    id: 'res-w8-quick',
    milestoneId: 'w8',
    topic: 'GitHub Actions OIDC AWS',
    title: 'Configuring OpenID Connect in AWS for GitHub Actions (No Static Keys)',
    provider: 'GitHub Official Security Docs',
    url: 'https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect',
    type: 'quick',
    estimatedMinutes: 20,
    isFree: true,
    lastReviewed: '2026-02-12'
  },
  {
    id: 'res-w8-deep',
    milestoneId: 'w8',
    topic: 'Production Deployment Pipelines',
    title: 'Building a Zero-Trust Continuous Deployment Pipeline with Terraform & ECS',
    provider: 'AWS Open Source Blog',
    url: 'https://aws.amazon.com/blogs/opensource/deploy-applications-to-amazon-ecs-using-github-actions/',
    type: 'deep',
    estimatedMinutes: 45,
    isFree: true,
    lastReviewed: '2026-02-19'
  },
  {
    id: 'res-w8-official',
    milestoneId: 'w8',
    topic: 'AWS IAM Identity Providers',
    title: 'Creating OpenID Connect (OIDC) Identity Providers in IAM',
    provider: 'AWS Official Documentation',
    url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html',
    type: 'official',
    estimatedMinutes: 30,
    isFree: true,
    lastReviewed: '2026-03-01'
  },
  {
    id: 'res-w8-lab',
    milestoneId: 'w8',
    topic: 'OIDC Deployment Pipeline Lab',
    title: 'Deploy Container from GitHub to Amazon ECR and ECS using OIDC Role',
    provider: 'GitHub Skills / AWS Labs',
    url: 'https://github.com/aws-actions/amazon-ecs-deploy-task-definition',
    type: 'lab',
    estimatedMinutes: 50,
    isFree: true,
    lastReviewed: '2026-02-24'
  },

  // ==========================================
  // WEEK 9: APACHE KAFKA & EDA
  // ==========================================
  {
    id: 'res-w9-quick',
    milestoneId: 'w9',
    topic: 'Apache Kafka Architecture',
    title: 'Apache Kafka Quickstart: Topics, Partitions, and Consumer Groups',
    provider: 'Apache Kafka Official',
    url: 'https://kafka.apache.org/quickstart',
    type: 'quick',
    estimatedMinutes: 20,
    isFree: true,
    lastReviewed: '2026-02-05'
  },
  {
    id: 'res-w9-deep',
    milestoneId: 'w9',
    topic: 'Kafka Microservices Patterns',
    title: 'Event-Driven Microservices Patterns: Idempotency, DLQ, and Replay',
    provider: 'Confluent Developer Hub',
    url: 'https://developer.confluent.io/patterns/',
    type: 'deep',
    estimatedMinutes: 60,
    isFree: true,
    lastReviewed: '2026-02-20'
  },
  {
    id: 'res-w9-official',
    milestoneId: 'w9',
    topic: 'Kafka Core Documentation',
    title: 'Official Apache Kafka Documentation & Producer/Consumer Design',
    provider: 'Apache Software Foundation',
    url: 'https://kafka.apache.org/documentation/',
    type: 'official',
    estimatedMinutes: 45,
    isFree: true,
    lastReviewed: '2026-03-01'
  },
  {
    id: 'res-w9-lab',
    milestoneId: 'w9',
    topic: 'Local Kafka Docker Lab',
    title: 'Run Multi-Broker Kafka with KRaft in Docker and Kafkajs Producers',
    provider: 'Confluent / GitHub Community',
    url: 'https://developer.confluent.io/quickstart/kafka-docker/',
    type: 'lab',
    estimatedMinutes: 50,
    isFree: true,
    lastReviewed: '2026-02-26'
  },

  // ==========================================
  // WEEK 10: OPENTELEMETRY & RELIABILITY
  // ==========================================
  {
    id: 'res-w10-quick',
    milestoneId: 'w10',
    topic: 'OpenTelemetry Fundamentals',
    title: 'OpenTelemetry in 15 Minutes: Traces, Spans, Metrics & Baggage',
    provider: 'OpenTelemetry Official Docs',
    url: 'https://opentelemetry.io/docs/what-is-opentelemetry/',
    type: 'quick',
    estimatedMinutes: 20,
    isFree: true,
    lastReviewed: '2026-02-14'
  },
  {
    id: 'res-w10-deep',
    milestoneId: 'w10',
    topic: 'Site Reliability Engineering',
    title: 'Google SRE Book: Service Level Objectives (SLIs, SLOs & Error Budgets)',
    provider: 'Google SRE Official Books',
    url: 'https://sre.google/sre-book/service-level-objectives/',
    type: 'deep',
    estimatedMinutes: 60,
    isFree: true,
    lastReviewed: '2026-01-30'
  },
  {
    id: 'res-w10-official',
    milestoneId: 'w10',
    topic: 'OpenTelemetry Node.js SDK',
    title: 'Official OpenTelemetry Node.js Documentation and Auto-Instrumentation',
    provider: 'OpenTelemetry GitHub',
    url: 'https://opentelemetry.io/docs/languages/js/',
    type: 'official',
    estimatedMinutes: 40,
    isFree: true,
    lastReviewed: '2026-03-01'
  },
  {
    id: 'res-w10-lab',
    milestoneId: 'w10',
    topic: 'Chaos & Observability Lab',
    title: 'Instrument Express App with OpenTelemetry Collector and Jaeger Tracing',
    provider: 'OpenTelemetry Workshop',
    url: 'https://opentelemetry.io/docs/demo/',
    type: 'lab',
    estimatedMinutes: 50,
    isFree: true,
    lastReviewed: '2026-02-23'
  },

  // ==========================================
  // WEEK 11: AI / RAG SLICE
  // ==========================================
  {
    id: 'res-w11-quick',
    milestoneId: 'w11',
    topic: 'pgvector & Embeddings',
    title: 'PostgreSQL pgvector in 15 Minutes: Vectors, Indexes & Cosine Distance',
    provider: 'pgvector Official GitHub',
    url: 'https://github.com/pgvector/pgvector',
    type: 'quick',
    estimatedMinutes: 20,
    isFree: true,
    lastReviewed: '2026-02-18'
  },
  {
    id: 'res-w11-deep',
    milestoneId: 'w11',
    topic: 'Production RAG Architecture',
    title: 'Building Production-Grade RAG: Chunking, Retrieval & Evaluation',
    provider: 'Anthropic / Google GenAI Developer Guides',
    url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/context-window-rag',
    type: 'deep',
    estimatedMinutes: 50,
    isFree: true,
    lastReviewed: '2026-02-20'
  },
  {
    id: 'res-w11-official',
    milestoneId: 'w11',
    topic: 'Google Gemini & LLM APIs',
    title: 'Google GenAI SDK Official TypeScript Documentation',
    provider: 'Google Official Docs',
    url: 'https://ai.google.dev/gemini-api/docs',
    type: 'official',
    estimatedMinutes: 35,
    isFree: true,
    lastReviewed: '2026-03-01'
  },
  {
    id: 'res-w11-lab',
    milestoneId: 'w11',
    topic: 'Documentation RAG Lab',
    title: 'Implement Semantic Search over Architecture ADRs using TypeScript and pgvector',
    provider: 'Open Source GenAI Labs',
    url: 'https://github.com/pgvector/pgvector-node',
    type: 'lab',
    estimatedMinutes: 45,
    isFree: true,
    lastReviewed: '2026-02-28'
  },

  // ==========================================
  // WEEK 12: WELL-ARCHITECTED & SECURITY
  // ==========================================
  {
    id: 'res-w12-quick',
    milestoneId: 'w12',
    topic: 'AWS Well-Architected Framework',
    title: 'AWS Well-Architected Framework: The 6 Pillars in 20 Minutes',
    provider: 'AWS Official Whitepapers',
    url: 'https://aws.amazon.com/architecture/well-architected/',
    type: 'quick',
    estimatedMinutes: 20,
    isFree: true,
    lastReviewed: '2026-02-20'
  },
  {
    id: 'res-w12-deep',
    milestoneId: 'w12',
    topic: 'AWS Security Hardening',
    title: 'Cloud Security Best Practices: KMS, Secrets Manager, and Least-Privilege IAM',
    provider: 'AWS Security Documentation',
    url: 'https://docs.aws.amazon.com/security/',
    type: 'deep',
    estimatedMinutes: 50,
    isFree: true,
    lastReviewed: '2026-02-15'
  },
  {
    id: 'res-w12-official',
    milestoneId: 'w12',
    topic: 'Well-Architected Tool Docs',
    title: 'AWS Well-Architected Tool User Guide & Milestone Reviews',
    provider: 'AWS Official Documentation',
    url: 'https://docs.aws.amazon.com/wellarchitected/latest/userguide/intro.html',
    type: 'official',
    estimatedMinutes: 40,
    isFree: true,
    lastReviewed: '2026-03-01'
  },
  {
    id: 'res-w12-lab',
    milestoneId: 'w12',
    topic: 'Architecture Review Lab',
    title: 'Perform a Formal Well-Architected Review on Order Service V1 vs V2',
    provider: 'AWS Workshops Official',
    url: 'https://wellarchitectedlabs.com/',
    type: 'lab',
    estimatedMinutes: 60,
    isFree: true,
    lastReviewed: '2026-02-25'
  },

  // ==========================================
  // WEEK 13: SYSTEM DESIGN & INTERVIEW POLISH
  // ==========================================
  {
    id: 'res-w13-quick',
    milestoneId: 'w13',
    topic: 'System Design Interview Cheatsheet',
    title: 'The System Design Primer: 45-Minute Interview Strategy & Back-of-the-Envelope',
    provider: 'Donne Martin / System Design Primer',
    url: 'https://github.com/donnemartin/system-design-primer',
    type: 'quick',
    estimatedMinutes: 20,
    isFree: true,
    lastReviewed: '2026-03-01'
  },
  {
    id: 'res-w13-deep',
    milestoneId: 'w13',
    topic: 'Behavioral Architecture Stories',
    title: 'Staff & Principal Engineering Interviews: Leading Architecture Discussions',
    provider: 'StaffEng Official',
    url: 'https://staffeng.com/guides',
    type: 'deep',
    estimatedMinutes: 45,
    isFree: true,
    lastReviewed: '2026-01-15'
  },
  {
    id: 'res-w13-official',
    milestoneId: 'w13',
    topic: 'AWS SAA Practice Exams',
    title: 'Official AWS Solutions Architect Associate Official Practice Question Set',
    provider: 'AWS Skill Builder Official',
    url: 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/12485/official-practice-question-set-aws-certified-solutions-architect-associate-saa-c03-english',
    type: 'official',
    estimatedMinutes: 60,
    isFree: true,
    lastReviewed: '2026-03-01'
  },
  {
    id: 'res-w13-lab',
    milestoneId: 'w13',
    topic: 'Mock Interview Simulator',
    title: 'Interactive System Design Interview Rubric & Peer Mock Framework',
    provider: 'Open Source System Design Lab',
    url: 'https://github.com/donnemartin/system-design-primer#how-to-approach-a-system-design-interview-question',
    type: 'lab',
    estimatedMinutes: 45,
    isFree: true,
    lastReviewed: '2026-02-28'
  }
];

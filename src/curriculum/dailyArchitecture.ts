import { DailyArchitectureProgress } from '../types';

const RAW_ARCHITECTURE_LESSONS: DailyArchitectureProgress[] = [
  // ==========================================
  // WEEK 1: REQUIREMENTS & ESTIMATION
  // ==========================================
  {
    id: 'arch-w1',
    milestoneId: 'w1',
    weekNumber: 1,
    topic: 'System Requirements, Capacity Estimation & API Contracts',
    resourceTitle: 'System Requirements, Capacity Estimation & Back-of-the-Envelope Math',
    provider: 'Free System Design',
    url: 'https://freesystemdesign.com/',
    estimatedMinutes: 18,
    learnTitle: 'System Design Primer: Requirements & Scale Estimation',
    learnSummary: 'Understand functional vs non-functional requirements, QPS calculation, throughput, bandwidth and storage capacity modeling before writing single lines of code.',
    learnCompleted: false,
    practicePrompt: 'Calculate the read/write QPS, 5-year storage requirements, and cache memory for an enterprise URL Shortener handling 500M links/month.',
    practiceProjectConnection: 'Connects to your initial TypeScript repository scaffold and capacity estimation equations in Week 1 deliverable.',
    practiceCompleted: false,
    designQuestion: 'How would you design a collision-free unique Key Generation Service (KGS) that generates 7-character Base62 keys under 20,000 writes/sec?',
    designAnswer: '',
    designCompleted: false,
    explainPrompt: 'Explain in your own words why back-of-the-envelope capacity estimations dictate whether a relational database or NoSQL key-value store is required.',
    explainAnswer: '',
    explainCompleted: false,
    applyPrompt: 'How will you apply scale estimation and strict type contracts to your current TypeScript repository?',
    applyMapping: 'Requirements & Scale Estimation → Sizing Node.js memory limits & database connection pool size',
    appliedToProject: false,
    notes: '',
    completed: false
  },

  // ==========================================
  // WEEK 2: API DESIGN, IDEMPOTENCY & RATE LIMITING
  // ==========================================
  {
    id: 'arch-w2',
    milestoneId: 'w2',
    weekNumber: 2,
    topic: 'Production API Design, Idempotency & Rate Limiting',
    resourceTitle: 'API Architecture: Idempotency Keys, Status Codes & Token Bucket Rate Limiting',
    provider: 'Free System Design',
    url: 'https://freesystemdesign.com/',
    estimatedMinutes: 20,
    learnTitle: 'RESTful API Best Practices, Idempotency and Rate Limiting',
    learnSummary: 'Master the mechanics of Idempotency Keys in distributed REST APIs, token bucket rate limiting algorithms, and structured error responses.',
    learnCompleted: false,
    practicePrompt: 'Design the request lifecycle for handling `Idempotency-Key: <uuid>` header on `POST /api/v1/orders`.',
    practiceProjectConnection: 'Integrates directly into Order Service V1 with Zod validation and Pino structured logging.',
    practiceCompleted: false,
    designQuestion: 'A client clicks "Submit Order" twice during a 3-second network pause. Walk through the exact database and cache steps to guarantee zero duplicate charges and consistent responses.',
    designAnswer: '',
    designCompleted: false,
    explainPrompt: 'Explain the difference between idempotent HTTP verbs (GET, PUT, DELETE) versus non-idempotent verbs (POST), and why network timeouts cause double-billing without explicit idempotency.',
    explainAnswer: '',
    explainCompleted: false,
    applyPrompt: 'How does idempotency fit into Order Service V1?',
    applyMapping: 'API Design & Idempotency → Idempotency Key header validation and deduplication store',
    appliedToProject: false,
    notes: '',
    completed: false
  },

  // ==========================================
  // WEEK 3: CACHING & DATABASE SCALING
  // ==========================================
  {
    id: 'arch-w3',
    milestoneId: 'w3',
    weekNumber: 3,
    topic: 'Caching Strategies, Redis & Database Scaling',
    resourceTitle: 'Cache-Aside Pattern, TTL, Invalidation & Database Sharding',
    provider: 'Free System Design',
    url: 'https://freesystemdesign.com/',
    estimatedMinutes: 20,
    learnTitle: 'Caching Patterns: Cache-Aside vs Write-Through vs Write-Back',
    learnSummary: 'Deep dive into cache penetration, cache stampede (thundering herd), cache avalanche, and database read replica scaling.',
    learnCompleted: false,
    practicePrompt: 'Implement the Cache-Aside pattern logic in pseudo-code: Read from Redis, on miss query Postgres with EXPLAIN index, write back with jittered TTL.',
    practiceProjectConnection: 'Directly applied to Order Service V2 with Redis caching layer and Docker Compose.',
    practiceCompleted: false,
    designQuestion: '100,000 requests hit your API for a viral product whose cache key just expired. How do you prevent your PostgreSQL database from collapsing under the thundering herd?',
    designAnswer: '',
    designCompleted: false,
    explainPrompt: 'Explain Cache-Aside vs Write-Through caching patterns and their respective data consistency trade-offs.',
    explainAnswer: '',
    explainCompleted: false,
    applyPrompt: 'How is caching applied to Order Service V2?',
    applyMapping: 'Caching → Redis Cache-Aside with jittered TTL and EXPLAIN ANALYZE indexing',
    appliedToProject: false,
    notes: '',
    completed: false
  },

  // ==========================================
  // WEEK 4: LOAD BALANCING & HORIZONTAL SCALING
  // ==========================================
  {
    id: 'arch-w4',
    milestoneId: 'w4',
    weekNumber: 4,
    topic: 'Load Balancing (L4 vs L7) & Horizontal Scaling',
    resourceTitle: 'Load Balancers, Health Checks, Sticky Sessions & Horizontal Pod Scaling',
    provider: 'Free System Design',
    url: 'https://freesystemdesign.com/',
    estimatedMinutes: 18,
    learnTitle: 'L4 vs L7 Load Balancers and Stateless Scaling Architecture',
    learnSummary: 'Understand how Application Load Balancers (L7) inspect HTTP headers and paths versus Network Load Balancers (L4) routing raw TCP packets with ultra-low latency.',
    learnCompleted: false,
    practicePrompt: 'Draft a C4 Container diagram illustrating an ALB distributing requests across 3 stateless Node.js container instances behind a NAT Gateway.',
    practiceProjectConnection: 'Directly incorporated into Week 4 C4 Diagrams and ADR-001 documentation.',
    practiceCompleted: false,
    designQuestion: 'Why are sticky sessions considered an architectural liability when designing horizontally scalable, auto-recovering microservices?',
    designAnswer: '',
    designCompleted: false,
    explainPrompt: 'Explain how health-check endpoints (/live vs /ready) allow load balancers to execute zero-downtime rolling updates.',
    explainAnswer: '',
    explainCompleted: false,
    applyPrompt: 'How will you apply stateless architecture in Order Service V3?',
    applyMapping: 'Load Balancing → Stateless container design with health checks (/health/live, /health/ready)',
    appliedToProject: false,
    notes: '',
    completed: false
  },

  // ==========================================
  // WEEK 5: AWS NETWORKING & MULTI-AZ RELIABILITY
  // ==========================================
  {
    id: 'arch-w5',
    milestoneId: 'w5',
    weekNumber: 5,
    topic: 'High Availability, Multi-AZ VPC Architecture & Disaster Recovery',
    resourceTitle: 'AWS Well-Architected Reliability Pillar: VPC Subnet Segmentation & Fault Isolation',
    provider: 'AWS Well-Architected Framework',
    url: 'https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html',
    estimatedMinutes: 20,
    learnTitle: 'Designing Resilient Cloud Networks: Public/Private Subnets & Route Tables',
    learnSummary: 'Study the AWS Well-Architected Reliability Pillar principles for multi-AZ failover, NAT Gateway egress architecture, and security boundaries.',
    learnCompleted: false,
    practicePrompt: 'Design the CIDR subnet layout for a production VPC across 2 Availability Zones (`us-east-1a`, `us-east-1b`) separating ALB, compute, and database.',
    practiceProjectConnection: 'Directly powers your manual AWS VPC setup and AWS SAA preparation in Week 5.',
    practiceCompleted: false,
    designQuestion: 'An entire AWS Availability Zone loses power. How does your multi-AZ VPC architecture automatically sustain traffic without human intervention?',
    designAnswer: '',
    designCompleted: false,
    explainPrompt: 'Explain the difference between stateful Security Groups (applied to ENIs) and stateless Network ACLs (applied to subnet boundaries).',
    explainAnswer: '',
    explainCompleted: false,
    applyPrompt: 'How does VPC isolation apply to your cloud deployment?',
    applyMapping: 'Network Security → Isolating PostgreSQL and Redis in private subnets with zero direct internet access',
    appliedToProject: false,
    notes: '',
    completed: false
  },

  // ==========================================
  // WEEK 6: COMPUTE & ASYNC MESSAGING (SQS VS KAFKA)
  // ==========================================
  {
    id: 'arch-w6',
    milestoneId: 'w6',
    weekNumber: 6,
    topic: 'Designing Scalable Cloud Services: Message Queues vs Event Streams',
    resourceTitle: 'Asynchronous Architecture: Amazon SQS vs Apache Kafka Comparison',
    provider: 'Free System Design',
    url: 'https://freesystemdesign.com/',
    estimatedMinutes: 20,
    learnTitle: 'Message Queuing vs Distributed Commit Logs: When to Use SQS vs Kafka',
    learnSummary: 'Understand competing consumer patterns, visibility timeouts, Dead-Letter Queues (DLQs), and when distributed log replay is strictly required.',
    learnCompleted: false,
    practicePrompt: 'Complete the rationale for ADR-002: Evaluate SQS Standard vs SQS FIFO vs Apache Kafka for order event delivery.',
    practiceProjectConnection: 'Powers your AWS ECS/Fargate deployment and the creation of ADR-002 in Week 6.',
    practiceCompleted: false,
    designQuestion: 'You need to process 5,000 order cancellation events per minute. Some events fail due to 3rd-party vendor outages. How do you prevent poison-pill events from blocking the entire pipeline?',
    designAnswer: '',
    designCompleted: false,
    explainPrompt: 'Explain visibility timeout in SQS and how it prevents message duplication when workers process tasks concurrently.',
    explainAnswer: '',
    explainCompleted: false,
    applyPrompt: 'How does asynchronous worker architecture apply to your project?',
    applyMapping: 'Async Processing → Offloading email and notification dispatch to asynchronous workers',
    appliedToProject: false,
    notes: '',
    completed: false
  },

  // ==========================================
  // WEEK 7: PAYMENT SYSTEM ARCHITECTURE & TRANSACTIONS
  // ==========================================
  {
    id: 'arch-w7',
    milestoneId: 'w7',
    weekNumber: 7,
    topic: 'Distributed Payment Systems, ACID Transactions & Double-Entry Ledgers',
    resourceTitle: 'Designing a Scalable Payment System: Zero Data Loss, Ledger Accounting & 2PC vs Sagas',
    provider: 'Free System Design',
    url: 'https://freesystemdesign.com/',
    estimatedMinutes: 20,
    learnTitle: 'Financial Software Architecture: Double-Entry Bookkeeping & Payment Gateways',
    learnSummary: 'Understand immutable ledgers (every debit has an equal credit), payment state machines, handling asynchronous webhooks, and preventing double-spend.',
    learnCompleted: false,
    practicePrompt: 'Design the database schema for a double-entry ledger ensuring Sum(Debits) - Sum(Credits) === 0 at all times.',
    practiceProjectConnection: 'Connects to your Terraform automated infrastructure and Week 7 Payment System Design topic.',
    practiceCompleted: false,
    designQuestion: 'An external payment gateway takes 45 seconds to respond to a charge request. How do you design your payment service so customer web requests never hang or time out?',
    designAnswer: '',
    designCompleted: false,
    explainPrompt: 'Explain why Two-Phase Commit (2PC) is considered fragile across microservices compared to the Saga pattern with compensating transactions.',
    explainAnswer: '',
    explainCompleted: false,
    applyPrompt: 'How does transaction safety apply to your Order Service?',
    applyMapping: 'ACID Consistency → Database row-level locking (SELECT FOR UPDATE) and idempotent payment intents',
    appliedToProject: false,
    notes: '',
    completed: false
  },

  // ==========================================
  // WEEK 8: DISTRIBUTED INVENTORY & CONCURRENCY
  // ==========================================
  {
    id: 'arch-w8',
    milestoneId: 'w8',
    weekNumber: 8,
    topic: 'Distributed Inventory Reservation & Flash Sale Concurrency',
    resourceTitle: 'High-Concurrency Inventory Systems: Preventing Overselling with Distributed Locks',
    provider: 'Free System Design',
    url: 'https://freesystemdesign.com/',
    estimatedMinutes: 18,
    learnTitle: 'Flash-Sale Architecture: Redis Lua Scripting & Optimistic Concurrency',
    learnSummary: 'Learn how top e-commerce architectures prevent overselling under extreme traffic spikes using in-memory atomic decrement scripts and temporary checkout reservations.',
    learnCompleted: false,
    practicePrompt: 'Write pseudo-code for a Redis atomic Lua script that checks stock and decrements if available stock >= requested quantity.',
    practiceProjectConnection: 'Aligns with your Week 8 Deployment Pipeline, live Project V3, and Week 8 Inventory System topic.',
    practiceCompleted: false,
    designQuestion: '10,000 customers click "Buy Now" on 50 remaining concert tickets within 500 milliseconds. How do you design the reservation flow so that tickets are never oversold?',
    designAnswer: '',
    designCompleted: false,
    explainPrompt: 'Explain pessimistic locking in SQL vs optimistic locking (`version` column) vs in-memory Redis atomic operations for high-concurrency stock counts.',
    explainAnswer: '',
    explainCompleted: false,
    applyPrompt: 'How do you apply inventory reservations to Order Service V3?',
    applyMapping: 'Concurrency Control → Redis TTL keyspace reservation expiring after 15 minutes if cart is abandoned',
    appliedToProject: false,
    notes: '',
    completed: false
  },

  // ==========================================
  // WEEK 9: EVENT-DRIVEN ARCHITECTURE & KAFKA
  // ==========================================
  {
    id: 'arch-w9',
    milestoneId: 'w9',
    weekNumber: 9,
    topic: 'Event-Driven Microservices & Transactional Outbox Pattern',
    resourceTitle: 'Event-Driven Architecture: Kafka Partitions, Consumer Groups & Outbox Pattern',
    provider: 'Free System Design',
    url: 'https://freesystemdesign.com/',
    estimatedMinutes: 20,
    learnTitle: 'Building Reliable Event-Driven Systems with Kafka and Debezium',
    learnSummary: 'Understand how the Transactional Outbox Pattern guarantees that a database commit and a Kafka event publish succeed or fail together with zero dual-write vulnerabilities.',
    learnCompleted: false,
    practicePrompt: 'Diagram the Transactional Outbox Pattern: Order Service writes to `orders` and `outbox` table in a single local SQL transaction; outbox poller publishes to Kafka.',
    practiceProjectConnection: 'Directly aligns with your Week 9 Kafka local Docker stack (Order → Kafka → Inventory → Notification).',
    practiceCompleted: false,
    designQuestion: 'Your Order Service saves an order to PostgreSQL, but network dies right before sending the event to Kafka. What dual-write bug occurred, and how does the Outbox Pattern eliminate it?',
    designAnswer: '',
    designCompleted: false,
    explainPrompt: 'Explain how Kafka consumer groups distribute partition consumption across worker nodes and what triggers a partition rebalance.',
    explainAnswer: '',
    explainCompleted: false,
    applyPrompt: 'How does event streaming apply to your microservices architecture?',
    applyMapping: 'Async Processing → Kafka event stream with partition key ordering by `order_id` and DLQ replay',
    appliedToProject: false,
    notes: '',
    completed: false
  },

  // ==========================================
  // WEEK 10: OBSERVABILITY, SLOS & RELIABILITY
  // ==========================================
  {
    id: 'arch-w10',
    milestoneId: 'w10',
    weekNumber: 10,
    topic: 'Site Reliability Engineering, Distributed Tracing & Circuit Breakers',
    resourceTitle: 'Software Architecture: OpenTelemetry Distributed Tracing, SLI/SLO & Circuit Breakers',
    provider: 'ByteByteGo Software Architecture',
    url: 'https://bytebytego.com/guides/software-architecture/',
    estimatedMinutes: 20,
    learnTitle: 'The 3 Pillars of Observability and Fault-Tolerant System Design',
    learnSummary: 'Explore context propagation with OpenTelemetry spans, mathematical definitions of SLIs, SLOs, and SLAs, and circuit breaker state machines (Closed, Open, Half-Open).',
    learnCompleted: false,
    practicePrompt: 'Define two production SLOs for Order Service (e.g. 99.9% of orders processed in < 300ms) and calculate the permissible error budget per 30-day window.',
    practiceProjectConnection: 'Directly implemented in Week 10 Day 70 Checkpoint (OpenTelemetry, CloudWatch dashboards, Chaos test).',
    practiceCompleted: false,
    designQuestion: 'A downstream payment partner begins failing with 30-second timeouts. How does a Circuit Breaker prevent your entire Node.js thread pool from grinding to a halt?',
    designAnswer: '',
    designCompleted: false,
    explainPrompt: 'Explain how W3C traceparent headers propagate distributed tracing context across HTTP requests and Kafka record headers.',
    explainAnswer: '',
    explainCompleted: false,
    applyPrompt: 'How does SRE reliability apply to your production platform?',
    applyMapping: 'Reliability & Observability → Exponential backoff with jitter, Circuit Breakers & OpenTelemetry tracing',
    appliedToProject: false,
    notes: '',
    completed: false
  },

  // ==========================================
  // WEEK 11: AI / RAG ARCHITECTURE
  // ==========================================
  {
    id: 'arch-w11',
    milestoneId: 'w11',
    weekNumber: 11,
    topic: 'Enterprise RAG Systems & Vector Database Architecture',
    resourceTitle: 'Architecting Production RAG: Chunking, Vector Embeddings & Hybrid Search',
    provider: 'ByteByteGo Software Architecture',
    url: 'https://bytebytego.com/guides/software-architecture/',
    estimatedMinutes: 20,
    learnTitle: 'Retrieval-Augmented Generation at Scale: Ingestion, Indexing and Guardrails',
    learnSummary: 'Understand sliding window chunking with semantic overlap, generating 1536-dim embeddings, HNSW indexing in pgvector, and hybrid retrieval (vector similarity + BM25 keyword search).',
    learnCompleted: false,
    practicePrompt: 'Write a PostgreSQL query utilizing `pgvector` and `<=>` cosine distance operator to retrieve top-3 relevant ADR chunks for a query embedding.',
    practiceProjectConnection: 'Powers your Week 11 Project Documentation RAG Assistant over architecture ADRs and runbooks.',
    practiceCompleted: false,
    designQuestion: 'How do you enforce document Access Control Lists (ACLs) in a vector database to ensure engineering users never retrieve confidential HR documents in a RAG response?',
    designAnswer: '',
    designCompleted: false,
    explainPrompt: 'Explain why RAG is architecturally superior to model fine-tuning for rapidly changing internal company technical documentation.',
    explainAnswer: '',
    explainCompleted: false,
    applyPrompt: 'How does vector search apply to your technical platform?',
    applyMapping: 'AI Capabilities → pgvector semantic document assistant querying platform ADRs and runbooks',
    appliedToProject: false,
    notes: '',
    completed: false
  },

  // ==========================================
  // WEEK 12: WELL-ARCHITECTED & SECURITY
  // ==========================================
  {
    id: 'arch-w12',
    milestoneId: 'w12',
    weekNumber: 12,
    topic: 'AWS Well-Architected Framework: 6 Pillars Review & Cloud Security',
    resourceTitle: 'AWS Well-Architected Framework: Security, Cost Optimization & Resilience',
    provider: 'AWS Well-Architected Framework',
    url: 'https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html',
    estimatedMinutes: 20,
    learnTitle: 'Conducting an Architecture Review: Identifying High-Risk Issues (HRIs)',
    learnSummary: 'Examine the 6 pillars of AWS Well-Architected: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability.',
    learnCompleted: false,
    practicePrompt: 'Conduct a formal Well-Architected review on Order Service V1 vs V2, identifying 3 high-risk security and cost issues.',
    practiceProjectConnection: 'Forms the core of Week 12 Architecture V1 → V2 Blueprint and SAA exam preparation.',
    practiceCompleted: false,
    designQuestion: 'How would you re-architect your cloud deployment to cut monthly AWS spend by 35% without degrading 99.95% availability or increasing latency?',
    designAnswer: '',
    designCompleted: false,
    explainPrompt: 'Explain the Principle of Least Privilege in AWS IAM roles and how customer managed keys in AWS KMS ensure defense-in-depth.',
    explainAnswer: '',
    explainCompleted: false,
    applyPrompt: 'How do you apply Well-Architected principles to your platform?',
    applyMapping: 'Security & Governance → IAM least privilege, AWS Secrets Manager & zero-key OIDC authentication',
    appliedToProject: false,
    notes: '',
    completed: false
  },

  // ==========================================
  // WEEK 13: INTERVIEW MASTERY & TRADE-OFF DEFENSE
  // ==========================================
  {
    id: 'arch-w13',
    milestoneId: 'w13',
    weekNumber: 13,
    topic: 'System Design Interview Mastery & Executive Trade-off Defense',
    resourceTitle: '45-Minute System Design Interview Strategy: Requirements, Deep-Dives & Trade-offs',
    provider: 'Free System Design',
    url: 'https://freesystemdesign.com/',
    estimatedMinutes: 20,
    learnTitle: 'The Senior Engineer & Architect Interview Framework',
    learnSummary: 'Master leading a 45-minute architectural interview: Scope requirements (5m) → High-level architecture (10m) → Deep-dive bottlenecks (20m) → Trade-offs & Wrap-up (10m).',
    learnCompleted: false,
    practicePrompt: 'Prepare your opening 5-minute structural response to: "Design a distributed real-time notification engine for 10M active users."',
    practiceProjectConnection: 'Directly prepares you for Senior Platform / Cloud Architect interview rounds in Week 13.',
    practiceCompleted: false,
    designQuestion: 'An interviewer challenges your choice of PostgreSQL over DynamoDB for order storage. How do you defend your architectural decision with data and trade-offs?',
    designAnswer: '',
    designCompleted: false,
    explainPrompt: 'Explain how you present architectural trade-offs to senior leadership without sounding defensive or dogmatic.',
    explainAnswer: '',
    explainCompleted: false,
    applyPrompt: 'How will you present your 90-day platform in an interview?',
    applyMapping: 'Career Storytelling → Presenting your evolving platform with C4 diagrams, ADRs, and chaos drill evidence',
    appliedToProject: false,
    notes: '',
    completed: false
  }
];

export const INITIAL_ARCHITECTURE_LESSONS: DailyArchitectureProgress[] = RAW_ARCHITECTURE_LESSONS.map((lesson) => ({
  ...lesson,
  resourceMetadata: {
    id: `res-meta-${lesson.id}`,
    title: lesson.resourceTitle,
    provider: lesson.provider,
    url: lesson.url,
    type: 'architecture-guide',
    topic: lesson.topic,
    milestoneId: lesson.milestoneId,
    estimatedTime: `${lesson.estimatedMinutes} mins`,
    freeOrPaid: 'Free' as const,
    lastReviewed: '2026-03-01'
  }
}));

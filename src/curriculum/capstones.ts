export interface CapstoneProject {
  id: string;
  number: number;
  title: string;
  tagline: string;
  technologies: string[];
  description: string;
  architectureHighlights: string[];
  deliverables: string[];
  githubRepoTemplate: string;
  xpReward: number;
}

export const CAPSTONE_PROJECTS: CapstoneProject[] = [
  {
    id: 'cap-1',
    number: 1,
    title: 'Enterprise Inventory Intelligence Platform',
    tagline: 'High-concurrency event-driven platform handling flash-sale inventory reservation with automated recovery and observability.',
    technologies: [
      'Node.js',
      'TypeScript',
      'PostgreSQL',
      'Redis',
      'Kafka',
      'Docker',
      'AWS ECS Fargate',
      'Terraform',
      'OpenTelemetry'
    ],
    description: 'A cloud-native inventory intelligence platform built to solve high-concurrency reservation challenges during peak traffic events. Features distributed locking, outbox event publishing to Kafka, containerized deployment on AWS ECS via Terraform, and full OpenTelemetry tracing with CloudWatch SLO dashboards.',
    architectureHighlights: [
      'Stateless Order & Inventory microservices packaged in multi-stage Docker containers',
      'Redis Lua-based atomic stock decrement with 15-minute reservation TTL expiration',
      'Transactional Outbox pattern guaranteeing zero lost events between PostgreSQL and Kafka',
      'Dead-Letter Queue (DLQ) and consumer replay worker for poisoned messages',
      'Terraform modules for VPC, ECS Fargate, RDS PostgreSQL, and ALB with zero-key OIDC CI/CD',
      'Distributed context propagation using OpenTelemetry over HTTP and Kafka record headers'
    ],
    deliverables: [
      'Public GitHub repository with production-grade TypeScript codebase and Vitest unit/integration tests',
      'Terraform infrastructure repository with proven `destroy` and `apply` recreation scripts',
      'Comprehensive Architecture Decision Record suite (ADR-001 through ADR-005)',
      'Mermaid C4 System Context and Container diagrams',
      'Chaos drill report detailing behavior during killed database/broker dependencies'
    ],
    githubRepoTemplate: 'github.com/your-username/enterprise-inventory-platform',
    xpReward: 1000
  },
  {
    id: 'cap-2',
    number: 2,
    title: 'Cloud-Native E-Commerce Platform',
    tagline: 'Multi-service event-driven architecture orchestrated with Kubernetes on AWS EKS, Helm, and GitOps with ArgoCD.',
    technologies: [
      'AWS EKS',
      'Docker',
      'Kubernetes',
      'Helm',
      'ArgoCD',
      'Kafka',
      'Redis',
      'PostgreSQL',
      'Terraform',
      'CI/CD',
      'Observability'
    ],
    description: 'An advanced Kubernetes-orchestrated distributed e-commerce platform implementing Domain-Driven Design, database-per-service pattern, Saga orchestration for distributed checkouts, and declarative GitOps continuous delivery through ArgoCD on AWS EKS.',
    architectureHighlights: [
      'Kubernetes Deployments with strict resource requests/limits, liveness/readiness probes, and HPA',
      'Custom Helm chart suite managing dev, staging, and production environments with values.yaml hierarchy',
      'Automated GitOps reconciliation loop using ArgoCD with instant rollback on health check failure',
      'Saga orchestrator state machine handling order placement, payment capture, and inventory reservation with compensating transactions',
      'AWS IAM Roles for Service Accounts (IRSA) enforcing least-privilege pod-level AWS access'
    ],
    deliverables: [
      'Helm chart repository with automated linting and GitHub Actions test matrix',
      'GitOps configuration repository linked to live AWS EKS cluster',
      'Saga compensation test suite simulating payment gateway timeouts and rollback verification',
      'Full C4 component diagram showing inter-service gRPC and Kafka event communication'
    ],
    githubRepoTemplate: 'github.com/your-username/cloudnative-ecommerce-k8s',
    xpReward: 1000
  },
  {
    id: 'cap-3',
    number: 3,
    title: 'AI Cloud Architecture Platform',
    tagline: 'Autonomous AI architectural review and RAG knowledge assistant with Model Context Protocol (MCP) and multi-region resilience.',
    technologies: [
      'TypeScript',
      'LLM APIs',
      'Vector Embeddings',
      'pgvector',
      'RAG',
      'Model Context Protocol (MCP)',
      'AI Agents',
      'AWS',
      'Kubernetes',
      'Observability',
      'Security'
    ],
    description: 'A flagship AI-powered cloud platform providing automated architecture review against the AWS Well-Architected Framework. Combines semantic vector search over company runbooks and ADRs, dynamic tool execution via Model Context Protocol (MCP), and multi-region active-active disaster recovery.',
    architectureHighlights: [
      'Retrieval-Augmented Generation (RAG) pipeline utilizing PostgreSQL `pgvector` with HNSW cosine indexing',
      'Model Context Protocol (MCP) server providing agents with tools to parse Terraform plans and query AWS CloudWatch metrics',
      'Autonomous reasoning loop with token cost budgeting, structured JSON validation, and human-in-the-loop gates',
      'Multi-region active-active architecture blueprint with Route 53 latency routing and Aurora Global Database',
      'AI Guardrails and PII redaction layer preventing prompt injection and data leaks'
    ],
    deliverables: [
      'Production TypeScript RAG and Agent codebase with MCP tool definitions',
      'Live demonstration querying platform architecture documents with cited references',
      'Executive Architecture Presentation slide deck and FinOps cost breakdown',
      'Conference-grade whitepaper comparing RAG vs Fine-Tuning for Enterprise Cloud Architecture'
    ],
    githubRepoTemplate: 'github.com/your-username/ai-cloud-architecture-platform',
    xpReward: 1000
  }
];

import React, { useState } from 'react';
import { useStorage } from '../storage/storageContext';
import {
  Compass,
  Server,
  Cloud,
  Terminal,
  Cpu,
  Sparkles,
  CheckCircle2,
  Lock,
  ChevronRight
} from 'lucide-react';

export const LearningPathsPage: React.FC = () => {
  const { milestones } = useStorage();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const careerPillars = [
    {
      id: 'backend',
      title: 'BACKEND EXCELLENCE',
      icon: <Server size={20} color="#22c55e" />,
      color: '#22c55e',
      skills: ['Node.js Runtime', 'TypeScript Strict Types', 'Enterprise REST & GraphQL', 'PostgreSQL & Indexing', 'Redis Caching', 'Apache Kafka EDA'],
      state: 'ACTIVE'
    },
    {
      id: 'cloud',
      title: 'AWS CLOUD PLATFORM',
      icon: <Cloud size={20} color="#3b82f6" />,
      color: '#3b82f6',
      skills: ['VPC & Multi-AZ Subnets', 'ECS & Fargate Serverless Compute', 'Amazon RDS PostgreSQL', 'DynamoDB & ElastiCache', 'Application Load Balancer (ALB)', 'AWS SAA Architecture'],
      state: 'ACTIVE'
    },
    {
      id: 'devops',
      title: 'DEVOPS & INFRASTRUCTURE AS CODE',
      icon: <Terminal size={20} color="#f59e0b" />,
      color: '#f59e0b',
      skills: ['Multi-Stage Docker', 'GitHub Actions OIDC CI/CD', 'Terraform Modular IaC', 'Kubernetes Deployments & Services (Phase 2)', 'Helm Charts & ArgoCD (Phase 2)', 'Continuous Delivery'],
      state: 'ACTIVE / NEXT'
    },
    {
      id: 'architecture',
      title: 'SYSTEM ARCHITECTURE & SRE',
      icon: <Cpu size={20} color="#a855f7" />,
      color: '#a855f7',
      skills: ['System Design (10 Core Cases)', 'Distributed Systems & Consistency (Phase 2)', 'Microservices & Saga Pattern (Phase 2)', 'OpenTelemetry Distributed Tracing', 'CloudWatch SLO/SLI Metrics', 'AWS Well-Architected Framework'],
      state: 'ACTIVE / PARALLEL'
    },
    {
      id: 'ai',
      title: 'AI ARCHITECTURE & RAG',
      icon: <Sparkles size={20} color="#ec4899" />,
      color: '#ec4899',
      skills: ['LLM APIs & Text Chunking', 'Vector Embeddings & Cosine Distance', 'pgvector Semantic Document Retrieval', 'Autonomous AI Agents (Phase 3)', 'Model Context Protocol / MCP (Phase 3)', 'AI Observability & Cost Guardrails (Phase 3)'],
      state: 'ACTIVE / PHASE 3'
    }
  ];

  return (
    <div className="page-wrapper animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-active font-mono">5 Career Pillars</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Long-Term Architecture Tree</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Career Learning Paths</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Deliberately designed around your 7+ YOE Node.js background: AWS, DevOps, Reliability, and AI. No irrelevant Java or frontend side-tracks.
          </p>
        </div>
      </div>

      {/* Roadmap States Legend (Section 22) */}
      <div
        className="glass-panel"
        style={{
          padding: '1rem 1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
          fontSize: '0.82rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#34d399' }} />
          <span><strong>🟢 ACTIVE:</strong> Current focus (TypeScript, Node, Postgres, Docker, AWS, Terraform, Kafka, OTel, RAG)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#60a5fa' }} />
          <span><strong>🔵 NEXT:</strong> Days 91–150 (Kubernetes, EKS, Helm, Distributed Systems, Microservices)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#94a3b8' }} />
          <span><strong>⚪ LATER:</strong> Days 151–210+ (Agents, MCP, AI Security, Multi-region, Flagship)</span>
        </div>
      </div>

      {/* Pillars Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {careerPillars.map((pillar) => (
          <div key={pillar.id} className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)' }}>
                    {pillar.icon}
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{pillar.title}</h3>
                </div>
                <span className="badge font-mono" style={{ fontSize: '0.7rem' }}>{pillar.state}</span>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Target Technical Competencies
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {pillar.skills.map((skill, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '0.5rem 0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid var(--border-card)',
                        fontSize: '0.82rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>{skill}</span>
                      <CheckCircle2 size={14} color="#34d399" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-card)', paddingTop: '0.85rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Integrated into Weekly Production Platform & Deliverables
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

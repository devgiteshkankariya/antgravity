import { ADR, ProjectEntry } from '../types';

export const downloadFile = (filename: string, content: string, contentType: string = 'text/markdown') => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportAdrToMarkdown = (adr: ADR): string => {
  return `# ${adr.id}: ${adr.title}

- **Status**: ${adr.status}
- **Date**: ${adr.date}
${adr.milestoneId ? `- **Milestone**: ${adr.milestoneId}\n` : ''}
## Context
${adr.context}

## Problem Statement
${adr.problem}

## Considered Options
${adr.options}

## Decision
${adr.decision}

## Rationale & Justification
${adr.reason}

## Architectural Trade-offs
${adr.tradeoffs}

## Consequences & Follow-up Actions
${adr.consequences}
`;
};

export const exportProjectReadme = (project: ProjectEntry): string => {
  if (project.readmeMarkdown) return project.readmeMarkdown;

  return `# 📦 ${project.title} (${project.version})

> ${project.description}

## 🛠️ Technology Stack
${project.technologies.map((t) => `- **${t}**`).join('\n')}

## 🏗️ Architecture Overview
${project.architectureSummary}

## ⚖️ Architectural Decisions & Trade-offs
${project.tradeoffs || 'Documented in Architecture Quest ADR records.'}

## 🛡️ Failure Scenarios & Self-Healing
${project.failureScenarios || '- Dependency isolation and circuit breaking.\n- Health check endpoint auto-restarts container task.'}

## 📊 Observability & Metrics
${project.observabilityNotes || '- OpenTelemetry trace spans propagated via request headers.\n- Structured JSON logging with correlation IDs.'}

## 💰 Cost Considerations
${project.costNotes || '- Serverless container tasks scaled down during idle testing periods.'}
`;
};

export const generateLinkedInPost = (project: ProjectEntry): string => {
  if (project.linkedinPostMarkdown) return project.linkedinPostMarkdown;

  return `🚀 Engineering Update: ${project.title} (${project.version})

Over the past week, I've been advancing the architecture of my cloud-native production platform.

Here is what I built and the technical decisions made:

🔹 WHAT I BUILT:
${project.title} — ${project.description}

🔹 WHY I BUILT IT:
To solve real-world scalability and operational reliability challenges using ${project.technologies.slice(0, 3).join(', ')}.

🔹 ARCHITECTURE & TECHNICAL DECISIONS:
${project.architectureSummary}

🔹 KEY LESSONS & TRADE-OFFS:
Designing for failure upfront rather than bolting on reliability as an afterthought.

${project.githubUrl ? `🔗 GitHub Repository: ${project.githubUrl}\n` : ''}
#BackendEngineering #SoftwareArchitecture #CloudReady #NodeJS #AWS #DevOps`;
};

export type Project = {
  id: string;
  title: string;
  tagline: string;
  size: 'lg' | 'md' | 'sm';
  accent: string; // tailwind gradient
  year: string;
  role: string;
  stack: string[];
  problem: string;
  solution: string;
  impact: string[];
  architecture: { step: string; desc: string }[];
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: 'travel-planner',
    title: 'Multi-Agent Travel Itinerary Planner',
    tagline: 'Agentic RAG on AWS Bedrock that plans trips like a human travel agent.',
    size: 'lg',
    accent: 'from-indigo-500/30 via-fuchsia-500/20 to-rose-500/30',
    year: '2026',
    role: 'AI Engineer · Architect',
    stack: ['AWS Bedrock', 'LangGraph', 'Claude', 'Python', 'Streamlit', 'OpenSearch'],
    problem:
      'Static itinerary tools fail when users have layered preferences — budget, vibe, dietary needs, pacing. They return brochures, not plans.',
    solution:
      'Designed a multi-agent system on AWS Bedrock where specialist agents (Researcher, Budget, Local-Expert, Planner) collaborate via LangGraph, grounded by a RAG layer over curated travel corpora.',
    impact: [
      '4 specialist agents orchestrated via LangGraph',
      'Sub-5s plan generation for 3-day trips',
      'Grounded responses cut hallucinations vs. naive LLM by ~70%',
    ],
    architecture: [
      { step: 'User Intent', desc: 'Streamlit UI captures structured prefs + free text.' },
      { step: 'Router Agent', desc: 'Decomposes the goal into sub-tasks per specialist.' },
      { step: 'RAG Layer', desc: 'OpenSearch hybrid retrieval over travel knowledge base.' },
      { step: 'Specialists', desc: 'Researcher / Budget / Local-Expert run in parallel.' },
      { step: 'Planner Agent', desc: 'Synthesises a day-by-day itinerary with citations.' },
    ],
  },
  {
    id: 'rag-chatbot',
    title: 'Enterprise RAG Chatbot',
    tagline: 'Hybrid retrieval + OCR over messy PDFs, wrapped in a chat UI users actually trust.',
    size: 'lg',
    accent: 'from-cyan-500/30 via-sky-500/20 to-emerald-500/30',
    year: '2026',
    role: 'AI Engineer',
    stack: ['Azure OpenAI', 'ChromaDB', 'BM25', 'Tesseract OCR', 'LangChain', 'Streamlit'],
    problem:
      'Internal docs are a graveyard — scanned PDFs, tables, half-broken exports. Pure semantic search misses exact terms; pure keyword misses meaning.',
    solution:
      'Built a hybrid retrieval pipeline (semantic + BM25) with OCR fallback for image PDFs, served via Azure OpenAI and a Streamlit chat UI with source citations.',
    impact: [
      'Hybrid scoring lifted answer accuracy on internal eval set',
      'OCR pipeline unlocked ~30% of previously unreadable docs',
      'Citations + confidence chips built user trust',
    ],
    architecture: [
      { step: 'Ingestion', desc: 'PDF → text / OCR fallback for scanned pages.' },
      { step: 'Chunking', desc: 'Semantic chunking with overlap, metadata tagged.' },
      { step: 'Index', desc: 'ChromaDB embeddings + BM25 keyword index.' },
      { step: 'Hybrid Retrieval', desc: 'Reciprocal rank fusion of both signals.' },
      { step: 'Answer', desc: 'Azure OpenAI synthesises with inline citations.' },
    ],
  },
  {
    id: 'cloudops-auditor',
    title: 'CloudOps Auditor',
    tagline: 'Continuous posture checks across AWS accounts with one-click remediation hints.',
    size: 'md',
    accent: 'from-amber-500/30 via-orange-500/20 to-red-500/30',
    year: '2026',
    role: 'Cloud & Infra Engineer',
    stack: ['AWS', 'Python', 'boto3', 'Lambda', 'EventBridge'],
    problem: 'Drift and misconfig sneak in between audits. Manual checks don\'t scale.',
    solution:
      'Event-driven auditor that scans accounts on a schedule + on change, scores findings, and posts actionable fixes.',
    impact: ['Catches drift within minutes', 'Severity-scored findings', 'Slack-ready reports'],
    architecture: [
      { step: 'Trigger', desc: 'EventBridge schedule + Config change events.' },
      { step: 'Scan', desc: 'Lambda fan-out per service via boto3.' },
      { step: 'Score', desc: 'Rule engine assigns severity + remediation.' },
      { step: 'Report', desc: 'Findings pushed to Slack + S3 archive.' },
    ],
  },
  {
  id: 'portfolio',
  title: 'This Portfolio',
  tagline:
    'A handcrafted developer portfolio with cinematic intro, terminal-inspired hero, and an MDX-powered blog.',
  size: 'md',
  accent: 'from-violet-500/30 via-purple-500/20 to-pink-500/30',
  year: '2026',
  role: 'Designer · Engineer',
  stack: [
    'Next.js 16',
    'Tailwind v4',
    'Framer Motion',
    'Lenis',
    'MDX',
    'TypeScript',
    'Vercel',
  ],
  problem: 'Most dev portfolios feel like résumés in HTML.',
  solution:
    'Built a cinematic, motion-driven experience where every interaction feels intentional.',
  impact: [
    'Cinematic cold-open intro animation',
    'Terminal-inspired hero with interactive command line',
    'Ambient dot-grid background with cursor parallax',
    'MDX blog with reading time, related posts, and tag system',
    'Custom CursorGlow and smooth-scroll layer',
  ],
  architecture: [
    { step: 'Shell', desc: 'Next.js 16 App Router + Tailwind v4 tokens.' },
    { step: 'Motion', desc: 'Framer Motion choreography + Lenis smooth scroll.' },
    { step: 'Hero', desc: 'Terminal CLI, rotating taglines, ambient cursor grid.' },
    { step: 'Content', desc: 'MDX blog with frontmatter, reading time, related posts.' },
    { step: 'SEO', desc: 'Sitemap, RSS, OG metadata, Vercel deployment.' },
  ],
},,
]; 

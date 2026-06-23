export const profile = {
  name: 'Luv Pahwa',
  role: 'Cloud & AI Engineer',
  tagline: 'Building intelligent systems on the cloud.',
  bio: 'Engineer at LTIMindtree working on Cloud & Infra Management. I build agentic AI workflows, RAG systems, and cloud-native tools.',
  location: 'Chennai, India',
  email: 'luvpahwa52@gmail.com',
  socials: {
    github: 'https://github.com/luvpahwa52',
    linkedin: 'https://linkedin.com/in/luvpahwa',
  },
};

export const skills = {
  Cloud: ['AWS', 'Azure', 'GCP', 'Terraform', 'Docker'],
  AI: ['LangChain', 'LangGraph', 'RAG', 'Vector DBs', 'Bedrock', 'Azure OpenAI'],
  Languages: ['Python', 'TypeScript', 'Bash'],
  Tools: ['Streamlit', 'ChromaDB', 'BM25', 'FastAPI', 'Git'],
};

export const projects = [
  {
    title: 'CloudOps Auditor',
    desc: 'Multi-cloud SaaS for cost audits, security scanning, and agentic recommendations.',
    stack: ['AWS', 'Azure', 'LangGraph', 'Next.js'],
    link: '#',
    status: 'building',
  },
  {
    title: 'RAG Chatbot',
    desc: 'Hybrid retrieval (BM25 + vector) chatbot with reranking, citations, and follow-up handling.',
    stack: ['Azure OpenAI', 'ChromaDB', 'Streamlit'],
    link: '#',
    status: 'shipped',
  },
  {
    title: 'Travel Itinerary Planner',
    desc: 'AI-powered travel planner built on AWS Bedrock with agentic workflows.',
    stack: ['AWS Bedrock', 'Python', 'Streamlit'],
    link: '#',
    status: 'shipped',
  },
];

export const certs = [
  { name: 'AWS Solutions Architect Associate', date: 'Jul 2026', status: 'in-progress' },
  { name: 'AWS AI Practitioner', date: '2026', status: 'done' },
];
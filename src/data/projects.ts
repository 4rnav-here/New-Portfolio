export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  codeUrl: string;
  liveUrl?: string;
  featured?: boolean;
}

export const mainProjects: Project[] = [
  {
    id: "task-management",
    title: "Task Management App",
    description: "Full-stack task manager with CRUD operations, server actions, and user authentication. Built for productivity enthusiasts who want a clean, no-nonsense task tracker.",
    techStack: ["Next.js", "MongoDB", "TypeScript", "Tailwind CSS", "Auth.js"],
    codeUrl: "https://github.com/4rnav-here",
    liveUrl: "https://example.vercel.app",
    featured: true,
  },
  {
    id: "jwt-notes",
    title: "JWT Auth Notes App",
    description: "Secure note-taking application with JWT authentication, audio-to-text transcription, and advanced sorting & filtering. Your thoughts, encrypted and organized.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    codeUrl: "https://github.com/4rnav-here",
    featured: true,
  },
  {
    id: "langgraph-excel",
    title: "LangGraph Excel Parser + Chatbot",
    description: "AI-powered Excel processor with conversational querying. Upload spreadsheets, preprocess data through an agent pipeline, and ask questions in natural language.",
    techStack: ["Python", "LangGraph", "LangChain", "Streamlit", "OpenAI"],
    codeUrl: "https://github.com/4rnav-here",
    featured: true,
  },
  {
    id: "fuel-detection",
    title: "Fuel Irregularity Detection System",
    description: "Telemetry data analysis pipeline for detecting fuel anomalies. Practical ML application for real-world logistics and fleet management challenges.",
    techStack: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
    codeUrl: "https://github.com/4rnav-here",
    featured: true,
  },
];

export const aiProjects: Project[] = [
  {
    id: "risk-scoring",
    title: "ML Risk Scoring Model",
    description: "Predictive model for assessing risk factors using ensemble methods and feature engineering.",
    techStack: ["Python", "XGBoost", "Pandas"],
    codeUrl: "https://github.com/4rnav-here",
  },
  {
    id: "langchain-qa",
    title: "Document Q&A System",
    description: "RAG-based question answering over custom documents using LangChain and vector embeddings.",
    techStack: ["Python", "LangChain", "FAISS"],
    codeUrl: "https://github.com/4rnav-here",
  },
  {
    id: "data-analysis",
    title: "Data Analysis Pipeline",
    description: "End-to-end data preprocessing and visualization toolkit for exploratory analysis.",
    techStack: ["Python", "Pandas", "Seaborn"],
    codeUrl: "https://github.com/4rnav-here",
  },
];

export const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Python",
  "Tailwind CSS",
  "Git",
  "Docker",
];

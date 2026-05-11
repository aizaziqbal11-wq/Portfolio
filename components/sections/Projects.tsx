'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import ProjectModal, { Project } from '@/components/modals/ProjectModal'

const PROJECTS: Project[] = [
  {
    title: 'Smart Talk AI Chatbot',
    tagline: 'Fine-tuned Llama-3 powered communication coach',
    description: 'A custom-trained AI chatbot for professional dialogue improvement, featuring a Flutter UI and Llama-3 backend.',
    longDescription: 'Smart Talk is a specialized AI chatbot built by fine-tuning Meta’s Llama-3 8B model using QLoRA and Unsloth for efficient performance on T4 GPUs. The model is accessible via a Flask API hosted on Google Colab and tunneled through Ngrok to a responsive Flutter mobile app. It features integrated Speech-to-Text capabilities and is specifically trained to analyze tone and suggest professional communication improvements.',
    stack: ['Python', 'Llama-3', 'Unsloth', 'Hugging Face', 'Flutter', 'Flask', 'Ngrok', 'Google Colab'],
    features: [
      'Domain-specific Fine-tuning (QLoRA)',
      'Real-time Speech-to-Text integration',
      'Tone Analysis & Professional Rewriting',
      'Cloud-hosted Inference (Google Colab)',
      'Secure Tunneling via Ngrok',
      'Cross-platform Flutter Mobile UI',
    ],
    color: '#5b5ef4',
    emoji: '🤖',
    github: 'https://github.com/aizaziqbal11-wq/Smart_Talk_AI_Chatbot-',
    demo: 'https://github.com/aizaziqbal11-wq/Smart_Talk_AI_Chatbot-',
  },
  {
    title: 'Medical AI Chatbot (RAG)',
    tagline: 'Retrieval-augmented medical knowledge system',
    description: 'Domain-specific AI that ingests medical docs and answers with citations.',
    longDescription: 'A medical knowledge assistant built with RAG architecture. Ingests PDF medical documents into a FAISS vector store using HuggingFace embeddings, then uses a fine-tuned LLM to answer questions with accurate citations. Designed for healthcare professionals who need quick, reliable information retrieval from large document corpora.',
    stack: ['Python', 'RAG', 'FAISS', 'HuggingFace', 'FastAPI', 'LangChain', 'PyMuPDF'],
    features: [
      'PDF ingestion and chunking pipeline',
      'FAISS vector similarity search',
      'HuggingFace embedding models',
      'Citation-backed answers',
      'Multi-document corpus support',
      'REST API for integration',
    ],
    color: '#10b981',
    emoji: '🏥',
    github: 'https://github.com',
  },
  {
    title: 'AI Teacher Evaluation',
    tagline: 'NLP-powered teaching performance analytics',
    description: 'Automated system that analyzes feedback and generates teacher reports.',
    longDescription: 'An automated evaluation platform using NLP to analyze teaching quality. Processes student feedback, classroom session transcripts, and assessment scores to generate detailed performance reports. Uses sentiment analysis, keyword extraction, and scoring algorithms to produce actionable insights for educators and administrators.',
    stack: ['Python', 'NLP', 'spaCy', 'React', 'PostgreSQL', 'Docker', 'Celery'],
    features: [
      'Sentiment analysis on student feedback',
      'Keyword extraction and topic modeling',
      'Automated PDF report generation',
      'Admin dashboard with analytics',
      'Batch processing with Celery',
      'Exportable charts and insights',
    ],
    color: '#f59e0b',
    emoji: '📊',
    github: 'https://github.com',
    demo: 'https://demo.example.com',
  },
 {
  title: 'Full-Stack Web Projects',
  tagline: 'Responsive web apps with backend integration',
  description: 'Collection of dynamic web applications built using PHP, Firebase, and modern frontend technologies.',
  longDescription: 'Developed multiple full-stack web applications including portfolio websites and database-driven systems. Focused on responsive UI design, backend connectivity, authentication, and clean, maintainable code using PHP, MySQL, Firebase, and REST APIs.',
  stack: ['PHP', 'MySQL', 'Firebase', 'HTML', 'CSS', 'JavaScript', 'Flask'],
  features: [
    'Dynamic database-driven websites',
    'User authentication with Firebase',
    'REST API integration',
    'Responsive UI design',
    'Backend form handling and validation',
  ],

    color: '#a78bfa',
    emoji: '🌐',
    github: 'https://github.com',
    demo: 'https://demo.example.com',
  },
 {
  title: 'Law Firm Website',
  tagline: 'Professional legal services platform with case management',
  description: 'A responsive law firm website showcasing legal services with integrated case management and client portal.',
  longDescription: 'Built a professional law firm website featuring service listings, attorney profiles, case management system, and secure client portal. The platform includes appointment booking, document management, and communication tools designed specifically for legal practices. Implements secure authentication, data encryption, and compliance with legal industry standards.',
  stack: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'HTML', 'CSS'],
  features: [
    'Attorney profiles and expertise listing',
    'Service offerings showcase',
    'Secure client portal',
    'Appointment booking system',
    'Document management',
    'Fully responsive design',
  ],
  color: '#dc2626',
  emoji: '⚖️',
  github: 'https://github.com/aizaziqbal11-wq/LawFirm',
  demo: 'https://law-firm-k23ridb3l-aizaziqbal11-4651s-projects.vercel.app/',
 },
 
]

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const { ref, isInView } = useScrollAnimation(0.1)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      onClick={onClick}
      className="project-card group relative overflow-hidden"
      data-hover
    >
      {/* Top color line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }} />

      <div className="p-4 sm:p-5 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <span className="text-3xl sm:text-4xl">{project.emoji}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg" style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}>
              Click to expand
            </span>
            <motion.span className="text-lg" style={{ color: project.color }} whileHover={{ rotate: 45 }} transition={{ duration: 0.2 }}>↗</motion.span>
          </div>
        </div>

        <h3 className="text-base sm:text-lg font-bold mb-1.5 group-hover:gradient-text transition-all" style={{ color: 'var(--text-1)', fontFamily: 'var(--font-instrument)' }}>
          {project.title}
        </h3>
        <p className="text-xs mb-1" style={{ color: project.color, fontFamily: 'var(--font-dm-mono)' }}>{project.tagline}</p>
        <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-2)' }}>{project.description}</p>

        {/* Stack preview */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map(t => (
            <span key={t} className="px-2.5 py-1 rounded-md text-xs font-mono" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
              {t}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="px-2.5 py-1 rounded-md text-xs font-mono" style={{ color: 'var(--text-3)' }}>
              +{project.stack.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="projects" className="snap-section">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-72 h-72 opacity-10 blur-3xl rounded-full" style={{ background: 'var(--accent-2)' }} />
      </div>

      <div className="container-main w-full" ref={ref}>
        <div className="section-label">
          <span className="num">03.</span>
          <span className="text">Projects</span>
          <div className="line" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
            style={{ fontFamily: 'var(--font-instrument)', color: 'var(--text-1)' }}
          >
            Things I've <span className="gradient-text">Built</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm"
            style={{ color: 'var(--text-3)', fontFamily: 'var(--font-dm-mono)' }}
          >
            Click any card for details →
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} onClick={() => setSelected(p)} />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

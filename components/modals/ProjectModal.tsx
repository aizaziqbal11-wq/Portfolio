'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export type Project = {
  title: string
  tagline: string
  description: string
  longDescription: string
  stack: string[]
  features: string[]
  color: string
  emoji: string
  github: string
  demo?: string
  images?: string[]
}

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0)

  // Close on ESC
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [onClose])

  // Lock scroll
  useEffect(() => {
    if (project) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [project])

  // Reset carousel on project change
  useEffect(() => {
    setCurrentImageIdx(0)
  }, [project])

  const handlePrevImage = () => {
    if (!project?.images) return
    setCurrentImageIdx((prev) => (prev - 1 + project.images!.length) % project.images!.length)
  }

  const handleNextImage = () => {
    if (!project?.images) return
    setCurrentImageIdx((prev) => (prev + 1) % project.images!.length)
  }

  return (
    <AnimatePresence>
      {project && (
        <div className="modal-overlay">
          {/* Backdrop */}
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="modal-content"
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          >
            {/* Hero Banner with Image Carousel */}
            {project.images && project.images.length > 0 ? (
              <div className="relative w-full overflow-hidden flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${project.color}22 0%, ${project.color}08 100%)`, minHeight: '350px' }}>
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all hover:scale-110 z-20"
                  style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)', color: 'var(--text-2)', backdropFilter: 'blur(10px)' }}
                >
                  ✕
                </button>

                {/* Image Container */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center justify-center w-full"
                    style={{ minHeight: '350px' }}
                  >
                    <img
                      src={project.images[currentImageIdx]}
                      alt={`${project.title} image ${currentImageIdx + 1}`}
                      style={{ maxWidth: '90%', maxHeight: '300px', objectFit: 'contain', padding: '10px' }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-black/50 backdrop-blur flex items-center justify-center text-white hover:bg-black/70 transition-all z-10 text-lg"
                    >
                      ←
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-black/50 backdrop-blur flex items-center justify-center text-white hover:bg-black/70 transition-all z-10 text-lg"
                    >
                      →
                    </button>
                  </>
                )}

                {/* Image Counter & Dots - Bottom */}
                <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3">
                  <div className="flex gap-2">
                    {project.images.map((_, i) => (
                      <motion.button
                        key={i}
                        onClick={() => setCurrentImageIdx(i)}
                        className="h-2 rounded-full transition-all cursor-pointer"
                        animate={{
                          width: i === currentImageIdx ? 32 : 8,
                          background: i === currentImageIdx ? project.color : 'rgba(255,255,255,0.4)',
                        }}
                        whileHover={{ scale: 1.2 }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-white bg-black/50 backdrop-blur px-3 py-1.5 rounded">
                    {currentImageIdx + 1}/{project.images.length}
                  </span>
                </div>
              </div>
            ) : (
              <div
                className="relative h-40 sm:h-52 flex items-center justify-center overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${project.color}22 0%, ${project.color}08 100%)`,
                  borderBottom: `1px solid ${project.color}30`,
                }}
              >
                {/* Decorative grid */}
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: `linear-gradient(${project.color} 1px, transparent 1px), linear-gradient(90deg, ${project.color} 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }} />
                <div className="text-6xl sm:text-8xl">{project.emoji}</div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all hover:scale-110"
                  style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)', color: 'var(--text-2)', backdropFilter: 'blur(10px)' }}
                >
                  ✕
                </button>

                {/* Color accent dot */}
                <div className="absolute bottom-4 left-6 flex gap-1.5">
                  {[0.9, 0.5, 0.25].map((o, i) => (
                    <div key={i} className="w-2 h-2 rounded-full" style={{ background: project.color, opacity: o }} />
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-4 sm:p-5 md:p-7">
              <h2 className="text-xl sm:text-2xl font-bold mb-1" style={{ color: 'var(--text-1)', fontFamily: 'var(--font-instrument)' }}>
                {project.title}
              </h2>
              <p className="text-sm mb-5" style={{ color: project.color }}>{project.tagline}</p>

              {/* Description */}
              <p className="text-xs sm:text-sm leading-relaxed mb-6" style={{ color: 'var(--text-2)' }}>
                {project.longDescription}
              </p>

              {/* Tech Stack */}
              <div className="mb-6">
                <h3 className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--text-3)' }}>Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map(t => (
                    <span key={t} className="px-3 py-1.5 text-xs font-mono rounded-lg border" style={{ background: 'var(--card)', border: `1px solid ${project.color}30`, color: project.color }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--text-3)' }}>Key Features</h3>
                <ul className="space-y-2">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm" style={{ color: 'var(--text-2)' }}>
                      <span style={{ color: project.color }} className="mt-0.5">◆</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Links */}
              <div className="flex gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all hover:-translate-y-0.5"
                  style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text-1)' }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium text-white transition-all hover:-translate-y-0.5"
                    style={{ background: `linear-gradient(135deg, ${project.color}, var(--accent-2))`, boxShadow: `0 4px 20px ${project.color}40` }}
                  >
                    <span>↗</span>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

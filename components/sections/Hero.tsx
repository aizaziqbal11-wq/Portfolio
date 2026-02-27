'use client'

import { useChat } from '@/context/ChatContext'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const PLACEHOLDERS = [
  'Ask me about AI projects...',
  'What tech stack do I use?',
  'How can I help your team?',
  'Looking for an AI developer?',
  'Explore my latest work...',
]

function AISearchBar() {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [value, setValue] = useState('')
  const { openWithMessage } = useChat()

  // Add this import at top of Hero.tsx:
  // import { useChat } from '@/context/ChatContext'

  useEffect(() => {
    const target = PLACEHOLDERS[idx]
    const speed = deleting ? 35 : 70
    const timeout = setTimeout(() => {
      if (!deleting && charIdx < target.length) {
        setText(target.slice(0, charIdx + 1))
        setCharIdx(c => c + 1)
      } else if (!deleting && charIdx === target.length) {
        setTimeout(() => setDeleting(true), 1800)
      } else if (deleting && charIdx > 0) {
        setText(target.slice(0, charIdx - 1))
        setCharIdx(c => c - 1)
      } else {
        setDeleting(false)
        setIdx(i => (i + 1) % PLACEHOLDERS.length)
      }
    }, speed)
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, idx])

  const handleSubmit = () => {
    if (!value.trim()) return
    openWithMessage(value.trim())
    setValue('')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.9 }}
      className="ai-search flex items-center gap-3 px-5 py-3.5 max-w-sm"
      whileHover={{ scale: 1.01 }}
    >
      <span className="text-sm shrink-0" style={{ color: 'var(--accent)' }}>✦</span>
      <div className="flex-1 relative">
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          className="w-full bg-transparent text-sm outline-none"
          style={{ color: 'var(--text-1)' }}
        />
        {!value && (
          <span className="absolute inset-0 flex items-center text-sm pointer-events-none" style={{ color: 'var(--text-3)' }}>
            {text}
            <span className="ml-0.5 inline-block w-0.5 h-4 animate-blink" style={{ background: 'var(--accent)' }} />
          </span>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs transition-all hover:scale-110"
        style={{ background: 'var(--accent)', opacity: value ? 1 : 0.3 }}
        aria-label="Ask AI"
      >
        ↑
      </button>
    </motion.div>
  )
}

export default function Hero() {
  const avatarRef = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 80, damping: 20 })
  const springY = useSpring(my, { stiffness: 80, damping: 20 })

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      const el = avatarRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      mx.set((e.clientX - cx) * 0.08)
      my.set((e.clientY - cy) * 0.08)
    }
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [mx, my])

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] } })
  }

  return (
    <section id="hero" className="snap-section justify-center">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, var(--accent-2) 0%, transparent 70%)' }} />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
          backgroundSize: '70px 70px',
        }} />
      </div>

      <div className="container-main relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 md:gap-12 lg:gap-20 pt-8 md:pt-16">

          {/* Left — Avatar */}
          <motion.div
            ref={avatarRef}
            className="shrink-0 flex flex-col items-center gap-4 mt-8 lg:mt-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              style={{ x: springX, y: springY }}
              className="animate-float"
            >
              <div className="avatar-ring">
                <Image
                  src="/portfolio.jpeg"
                  alt="Aizaz Iqbal"
                  width={288}
                  height={288}
                  className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-2xl object-cover border"
                  style={{
                    border: '1px solid var(--border)',
                    boxShadow: '0 20px 60px var(--shadow), 0 0 40px var(--glow)',
                  }}
                  priority
                />
              </div>
            </motion.div>

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-[10px] sm:text-xs font-mono glass"
              style={{ color: 'var(--text-2)', border: '1px solid var(--border-accent)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
              Available for work
            </motion.div>
          </motion.div>

          {/* Right — Text */}
          <div className="flex-1 text-center lg:text-left">
            {/* Label */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-6" style={{ background: 'var(--glow)', border: '1px solid var(--border-accent)', color: 'var(--accent)' }}>
              ✦ AI & Software Engineer
            </motion.div>

            {/* Name */}
            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="font-bold leading-none mb-3"
              style={{ fontSize: 'clamp(2rem, 7vw, 6.5rem)', fontFamily: 'var(--font-instrument)', color: 'var(--text-1)' }}>
              Aizaz
              <br />
              <span className="gradient-text">Iqbal</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" className="text-sm md:text-base lg:text-lg mb-3" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-dm-mono)' }}>
              Python · Flutter · AI · Next.js
            </motion.p>

            {/* Bio */}
            <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible" className="text-sm md:text-base leading-relaxed max-w-lg mb-8 mx-auto lg:mx-0" style={{ color: 'var(--text-2)' }}>
              I build intelligent software — from LLM-powered chatbots and RAG systems to cross-platform mobile apps and scalable web platforms.
            </motion.p>

            {/* AI Search Bar */}
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="mb-8 flex justify-center lg:justify-start">
              <AISearchBar />
            </motion.div>

            {/* CTAs */}
            <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-3 justify-center lg:justify-start w-full sm:w-auto">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group px-5 sm:px-7 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all hover:-translate-y-0.5 w-full sm:w-auto"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', boxShadow: '0 8px 28px var(--glow-strong)' }}
              >
                View Projects
                <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-5 sm:px-7 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 w-full sm:w-auto"
                style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text-1)' }}
              >
                Get in Touch
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col sm:flex-row gap-6 sm:gap-8 mt-8 md:mt-10 pt-6 md:pt-8 border-t justify-center lg:justify-start w-full" style={{ borderColor: 'var(--border)' }}>
              {[['3+', 'Years Exp.'], ['15+', 'Projects'], ['5+', 'AI Systems']].map(([n, l]) => (
                <div key={l} className="text-center lg:text-left">
                  <div className="text-xl md:text-2xl font-bold gradient-text">{n}</div>
                  <div className="text-[9px] md:text-xs mt-0.5" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-dm-mono)' }}>{l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: 'var(--text-3)' }}>scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} className="w-px h-10" style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
      </motion.div>
    </section>
  )
}

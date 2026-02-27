'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const cards = [
  { emoji: '🤖', title: 'AI / ML', desc: 'RAG, LLMs, NLP, production AI systems' },
  { emoji: '📱', title: 'Flutter', desc: 'Cross-platform mobile, clean UX' },
  { emoji: '🌐', title: 'Web Dev', desc: 'Full-stack, Next.js, scalable APIs' },
  { emoji: '🔗', title: 'Networking', desc: 'Infrastructure, DevOps, protocols' },
]

export default function About() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="about" className="snap-section">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 opacity-10 blur-3xl rounded-full" style={{ background: 'var(--accent)' }} />
      </div>

      <div className="container-main w-full" ref={ref}>
        <div className="section-label">
          <span className="num">01.</span>
          <span className="text">About Me</span>
          <div className="line" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-14 items-center">
          {/* Left */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-7"
              style={{ fontFamily: 'var(--font-instrument)', color: 'var(--text-1)' }}
            >
              Building things that<br />
              <span className="gradient-text">actually matter</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-4 text-sm leading-relaxed mb-7"
              style={{ color: 'var(--text-2)' }}
            >
              <p>I'm a software engineer focused on the intersection of AI and real-world product development. I love turning complex research into systems people actually use.</p>
              <p>My work spans intelligent chatbots, RAG-powered knowledge systems, cross-platform mobile apps, and modern web platforms — all built with performance and simplicity in mind.</p>
              <p>I care deeply about clean code, thoughtful UX, and shipping things that work reliably at scale.</p>
            </motion.div>

            {/* Tech chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap gap-2"
            >
              {['Python', 'Dart', 'TypeScript', 'Next.js', 'FastAPI', 'LangChain', 'PyTorch', 'Flutter'].map(t => (
                <span key={t} className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all hover:-translate-y-0.5"
                  style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--accent)' }}>
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -5, scale: 1.03 }}
                className="p-4 sm:p-5 rounded-2xl transition-shadow duration-300"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  cursor: 'default',
                }}
              >
                <span className="text-2xl sm:text-3xl mb-3 block">{c.emoji}</span>
                <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--text-1)' }}>{c.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

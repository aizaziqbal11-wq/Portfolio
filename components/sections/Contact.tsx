'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const LINKS = [
  {
    label: 'Email',
    value: 'aizaziqbal11@gmail.com',
    href: 'https://mail.google.com/mail/u/0/#inbox?compose=new',
    icon: '✉️',
  },
  {
    label: 'GitHub',
    value: 'aizaziqbal11-wq',
    href: 'https://github.com/aizaziqbal11-wq',
    icon: '⌥',
  },
  {
    label: 'LinkedIn',
    value: 'Aizaz Iqbal',
    href: 'https://www.linkedin.com/in/aizaz-iqbal-4b1411247/',
    icon: '◈',
  },
]

export default function Contact() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="contact" className="snap-section" style={{ background: 'var(--surface)' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--border), transparent)' }} />

      {/* Large bg text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[18vw] font-bold" style={{ color: 'var(--text-1)', opacity: 0.018, fontFamily: 'var(--font-instrument)' }}>CONTACT</span>
      </div>

      <div className="container-main w-full relative z-10" ref={ref}>
        <div className="section-label">
          <span className="num">04.</span>
          <span className="text">Contact</span>
          <div className="line" />
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-5"
            style={{ fontFamily: 'var(--font-instrument)', color: 'var(--text-1)' }}
          >
            Let's <span className="gradient-text">Connect</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base leading-relaxed mb-12"
            style={{ color: 'var(--text-2)' }}
          >
            Open to full-time roles, freelance collaborations, and interesting AI projects.
            Drop a message — I respond to every one.
          </motion.p>

          {/* Contact cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mb-10"
          >
            {LINKS.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4 rounded-2xl transition-shadow duration-300 group"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                }}
                data-hover
              >
                <span className="text-2xl">{l.icon}</span>
                <div className="text-left">
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-3)' }}>{l.label}</div>
                  <div className="text-xs sm:text-sm font-medium group-hover:gradient-text transition-all" style={{ color: 'var(--text-1)' }}>{l.value}</div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Resume button */}
          <motion.a
            href="/resume.pdf"
            download
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-6 sm:px-10 py-3 sm:py-4 rounded-2xl text-sm sm:text-base font-semibold text-white"
            style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)',
              boxShadow: '0 12px 40px var(--glow-strong)',
            }}
          >
            <span>↓</span>
            Download Resume
          </motion.a>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-16 pt-8 border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="text-xs font-mono" style={{ color: 'var(--text-3)' }}>
            Made by Aizaz Iqbal with lots of coffee and ♥️ 
          </p>
        </motion.div>
      </div>
    </section>
  )
}

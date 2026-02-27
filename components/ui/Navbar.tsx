'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'
import { useActiveSection } from '@/hooks/useActiveSection'
import AizazLogo from './AizazLogo'

const NAV_LINKS = [
  { href: 'hero', label: 'Home' },
  { href: 'about', label: 'About' },
  { href: 'skills', label: 'Skills' },
  { href: 'projects', label: 'Projects' },
  { href: 'contact', label: 'Contact' },
]

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={toggle}
      className="relative w-14 h-7 rounded-full border flex items-center px-1 overflow-hidden"
      style={{
        background: isDark ? 'rgba(91,94,244,0.15)' : 'rgba(91,94,244,0.1)',
        borderColor: 'var(--border-accent)',
      }}
      aria-label="Toggle theme"
      whileTap={{ scale: 0.95 }}
    >
      {/* Track icons */}
      <span className="absolute left-1.5 text-[10px] select-none">🌙</span>
      <span className="absolute right-1.5 text-[10px] select-none">☀️</span>

      {/* Thumb */}
      <motion.div
        layout
        animate={{ x: isDark ? 0 : 26 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className="w-5 h-5 rounded-full z-10"
        style={{ background: 'var(--accent)' }}
      />
    </motion.button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(NAV_LINKS.map(l => l.href))

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-[900]"
    >
      <div
        className="transition-all duration-500"
        style={{
          background: scrolled ? 'var(--glass-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          boxShadow: scrolled ? '0 8px 40px var(--shadow)' : 'none',
        }}
      >
        <div className="container-main flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <button onClick={() => scrollTo('hero')} className="transition-all hover:scale-105">
            <AizazLogo className="w-32 h-8 md:w-40 md:h-10" />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
                style={{ color: active === link.href ? 'var(--accent)' : 'var(--text-2)' }}
              >
                {active === link.href && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: 'var(--glow)' }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="/resume.pdf"
              download
              className="hidden sm:flex items-center gap-1 md:gap-2 px-2.5 md:px-4 py-2 text-xs md:text-sm font-medium rounded-lg border transition-all duration-200 hover:-translate-y-0.5"
              style={{
                borderColor: 'var(--border-accent)',
                color: 'var(--accent)',
                background: 'var(--glow)',
              }}
            >
              Resume ↓
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg"
              style={{ background: 'var(--card)' }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <div className="flex flex-col gap-1.5 w-5">
                <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} className="block h-px w-full" style={{ background: 'var(--text-1)' }} />
                <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block h-px w-full" style={{ background: 'var(--text-1)' }} />
                <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} className="block h-px w-full" style={{ background: 'var(--text-1)' }} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}
          >
            <div className="container-main py-4 flex flex-col gap-1">
              {NAV_LINKS.map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="py-3 px-4 text-left text-sm rounded-lg transition-colors"
                  style={{ color: active === link.href ? 'var(--accent)' : 'var(--text-2)', background: active === link.href ? 'var(--glow)' : 'transparent' }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

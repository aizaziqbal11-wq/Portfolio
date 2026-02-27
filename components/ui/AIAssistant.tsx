'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChat } from '@/context/ChatContext'

type Msg = { id: number; role: 'user' | 'ai'; text: string }

export default function AIAssistant() {
  const { isOpen, setIsOpen, pendingMessage, clearPending } = useChat()

  const [visible, setVisible] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: 0, role: 'ai', text: "Hey! 👋 I'm Aizaz's AI assistant powered by Gemini. Ask me anything about his skills, projects, or how to get in touch!" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Show button after scrolling past hero
  useEffect(() => {
    const fn = () => {
      const hero = document.getElementById('hero')
      if (!hero) return
      setVisible(window.scrollY > hero.clientHeight * 0.6)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Auto scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs])

  // Close when back at top
  useEffect(() => {
    if (!visible) setIsOpen(false)
  }, [visible])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300)
  }, [isOpen])

  // Handle message sent from hero search bar
  useEffect(() => {
    if (pendingMessage && isOpen) {
      sendMessage(pendingMessage)
      clearPending()
    }
  }, [pendingMessage, isOpen])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return

    const userMsg: Msg = { id: Date.now(), role: 'user', text }
    setMsgs(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const history = msgs.slice(1).map(m => ({ role: m.role, text: m.text }))
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      })
      const data = await res.json()
      setMsgs(prev => [...prev, { id: Date.now() + 1, role: 'ai', text: data.reply }])
    } catch {
      setMsgs(prev => [...prev, { id: Date.now() + 1, role: 'ai', text: 'Sorry, something went wrong. Try again!' }])
    } finally {
      setLoading(false)
    }
  }

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    await sendMessage(text)
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Floating Button */}
          <motion.button
            key="fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            onClick={() => setIsOpen(!isOpen)}
            className="fixed bottom-6 right-6 z-[800] w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
              boxShadow: '0 8px 32px var(--glow-strong)',
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            aria-label="AI Assistant"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.svg
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </motion.svg>
              ) : (
                <motion.span
                  key="icon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xl"
                >
                  ✦
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Chat Window */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                className="fixed bottom-24 right-6 z-[800] w-80 md:w-96 flex flex-col rounded-2xl overflow-hidden"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border-accent)',
                  boxShadow: '0 24px 80px var(--shadow), 0 0 40px var(--glow)',
                  maxHeight: '520px',
                }}
              >
                {/* Header */}
                <div
                  className="px-5 py-4 flex items-center gap-3 border-b shrink-0"
                  style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                    style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}
                  >
                    ✦
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>
                      AI Assistant
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block shrink-0" />
                      <span className="text-xs" style={{ color: 'var(--text-2)' }}>
                        Powered by Gemini
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="ml-auto p-1.5 rounded-lg hover:opacity-70 transition-opacity shrink-0"
                    style={{ color: 'var(--text-2)' }}
                  >
                    ✕
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
                  {msgs.map(msg => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className="max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                        style={
                          msg.role === 'user'
                            ? { background: 'var(--accent)', color: 'white', borderBottomRightRadius: '6px' }
                            : { background: 'var(--card)', color: 'var(--text-2)', border: '1px solid var(--border)', borderBottomLeftRadius: '6px' }
                        }
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}

                  {loading && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div
                        className="px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5"
                        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
                      >
                        {[0, 0.18, 0.36].map(d => (
                          <motion.span
                            key={d}
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: d }}
                            className="w-1.5 h-1.5 rounded-full block"
                            style={{ background: 'var(--accent)' }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t shrink-0" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && send()}
                      placeholder="Ask about skills, projects..."
                      disabled={loading}
                      className="flex-1 px-4 py-2.5 text-sm rounded-xl outline-none disabled:opacity-50"
                      style={{
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-1)',
                      }}
                    />
                    <button
                      onClick={send}
                      disabled={!input.trim() || loading}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white disabled:opacity-40 transition-all hover:scale-105"
                      style={{ background: 'var(--accent)' }}
                    >
                      {loading ? (
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : '↑'}
                    </button>
                  </div>
                  <p className="text-center text-[10px] mt-2" style={{ color: 'var(--text-3)' }}>
                    Powered by Google Gemini
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}
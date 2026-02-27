'use client'

import { createContext, useContext, useState } from 'react'

interface ChatContextType {
  isOpen: boolean
  pendingMessage: string
  openWithMessage: (msg: string) => void
  clearPending: () => void
  setIsOpen: (val: boolean) => void
}

const ChatContext = createContext<ChatContextType>({
  isOpen: false,
  pendingMessage: '',
  openWithMessage: () => {},
  clearPending: () => {},
  setIsOpen: () => {},
})

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [pendingMessage, setPendingMessage] = useState('')

  const openWithMessage = (msg: string) => {
    setPendingMessage(msg)
    setIsOpen(true)
  }

  const clearPending = () => setPendingMessage('')

  return (
    <ChatContext.Provider value={{ isOpen, pendingMessage, openWithMessage, clearPending, setIsOpen }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => useContext(ChatContext)
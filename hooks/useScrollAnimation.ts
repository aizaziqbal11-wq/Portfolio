'use client'

import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function useScrollAnimation(amount = 0.2) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount })
  return { ref, isInView }
}

"use client"

import React, { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useCursorStore } from '@/store/useCursorStore'

type Particle = { id: number; x: number; y: number; rx: number; ry: number; rot: number }

export function CursorEngine() {
  const { mode, text } = useCursorStore()
  const [isVisible, setIsVisible] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])

  // Raw position coordinates (updated instantly on mousemove)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Spring settings tuned for minimal latency but smooth organic momentum
  const cursorXSpring = useSpring(cursorX, { damping: 38, stiffness: 320, mass: 0.15 })
  const cursorYSpring = useSpring(cursorY, { damping: 38, stiffness: 320, mass: 0.15 })

  const idCounter = useRef(0)

  useEffect(() => {
    let lastX = 0
    let lastY = 0

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)

      // Calculate distance from last particle
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY)
      if (dist > 12) { // Spawn more frequently
        lastX = e.clientX
        lastY = e.clientY
        const newId = idCounter.current++
        
        const randomX = (Math.random() - 0.5) * 40
        const randomY = (Math.random() - 0.5) * 40 + 20 // fall downwards slightly
        const randomRot = Math.random() * 360
        
        // Add new particle and cap trail to 30
        setParticles(prev => [...prev.slice(-30), { 
          id: newId, x: e.clientX, y: e.clientY, rx: randomX, ry: randomY, rot: randomRot 
        }])

        // Remove particle after lifespan
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newId))
        }, 1000)
      }
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorX, cursorY, isVisible])

  if (!isVisible) return null

  // Girly Pink Flower Cursor Variants
  const flowerVariants = {
    default: {
      width: 32,
      height: 32,
      scale: 1,
      rotate: 0,
      opacity: 0.9,
    },
    button: {
      width: 48,
      height: 48,
      scale: 1.2,
      rotate: 90,
      opacity: 1,
    },
    text: {
      width: 24,
      height: 24,
      scale: 0.8,
      rotate: -45,
      opacity: 0.8,
    },
    hidden: {
      opacity: 0,
      scale: 0,
    }
  }

  return (
    <>
      {/* Particle Trail */}
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.8, scale: 0.6, rotate: p.rot, x: p.x, y: p.y }}
            animate={{ opacity: 0, scale: 0.2, rotate: p.rot + 180, x: p.x + p.rx, y: p.y + p.ry }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
            className="fixed top-0 left-0 pointer-events-none z-[9998]"
            style={{ translateX: '-50%', translateY: '-50%', color: '#FF69B4' }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 drop-shadow-[0_0_5px_rgba(255,105,180,0.8)]">
              <path d="M12 2C10.5 2 9.5 3.5 10 5C8.5 4.5 7 5.5 7.5 7C6 7 5 8.5 5.5 10C4 10.5 3.5 12 4.5 13C3.5 14 4.5 15.5 6 15C5.5 16.5 7 17.5 8.5 17C8 18.5 9.5 19.5 11 19C11 20.5 13 20.5 13 19C14.5 19.5 16 18.5 15.5 17C17 17.5 18.5 16.5 18 15C19.5 15.5 20.5 14 19.5 13C20.5 12 20 10.5 18.5 10C19 8.5 17.5 7 16.5 7.5C17 6 15.5 4.5 14 5C14.5 3.5 13.5 2 12 2Z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          color: '#FF1493', // Hot pink
          textShadow: '0 0 10px #FF1493',
        }}
        variants={flowerVariants}
        animate={mode}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_0_10px_rgba(255,20,147,0.9)]">
          <path d="M12 2C10.5 2 9.5 3.5 10 5C8.5 4.5 7 5.5 7.5 7C6 7 5 8.5 5.5 10C4 10.5 3.5 12 4.5 13C3.5 14 4.5 15.5 6 15C5.5 16.5 7 17.5 8.5 17C8 18.5 9.5 19.5 11 19C11 20.5 13 20.5 13 19C14.5 19.5 16 18.5 15.5 17C17 17.5 18.5 16.5 18 15C19.5 15.5 20.5 14 19.5 13C20.5 12 20 10.5 18.5 10C19 8.5 17.5 7 16.5 7.5C17 6 15.5 4.5 14 5C14.5 3.5 13.5 2 12 2Z" />
          <circle cx="12" cy="11" r="3" fill="#FFE4E1" />
        </svg>
        {mode === 'button' && text && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -bottom-6 text-[10px] font-bold tracking-widest text-[#FF1493] uppercase pointer-events-none select-none drop-shadow-md bg-white/80 px-2 py-0.5 rounded-full"
          >
            {text}
          </motion.span>
        )}
      </motion.div>
    </>
  )
}

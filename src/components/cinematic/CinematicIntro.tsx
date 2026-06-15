'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useState, useEffect } from 'react'
import { CrystalScene } from './CrystalScene'
import { PostEffects } from './PostEffects'
import { motion } from 'framer-motion'

export function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [sequenceDone, setSequenceDone] = useState(false)

  const handleSequenceComplete = () => {
    setSequenceDone(true)
    onComplete()
  }

  // Once sequence is done, the fragments stay in the background forming the UI borders
  return (
    <motion.div 
      className="fixed inset-0"
      style={{ 
        zIndex: sequenceDone ? 0 : 50,
        pointerEvents: sequenceDone ? 'none' : 'auto'
      }}
    >
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 45 }} 
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={['#000000']} />
        <Suspense fallback={null}>
          <CrystalScene onComplete={handleSequenceComplete} />
          <PostEffects />
        </Suspense>
      </Canvas>
      
      {/* Starting darkness overlay */}
      <motion.div 
        className="absolute inset-0 bg-black z-10 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
    </motion.div>
  )
}

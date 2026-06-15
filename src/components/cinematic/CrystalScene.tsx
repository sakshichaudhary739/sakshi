'use client'

import { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { CrystalFragments } from './CrystalFragments'

const sphereMaterial = new THREE.MeshPhysicalMaterial({
  transmission: 1,
  thickness: 2,
  roughness: 0.02,
  ior: 1.6,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
  color: new THREE.Color('#ffffff'),
  attenuationColor: new THREE.Color('#F472B6'),
  attenuationDistance: 2.5,
})

export function CrystalScene({ onComplete }: { onComplete: () => void }) {
  const { camera } = useThree()
  const sphereRef = useRef<THREE.Mesh>(null)
  const [exploded, setExploded] = useState(false)
  
  // React refs to track GSAP animated values so they can be read in useFrame
  const explosionProgress = useRef({ value: 0 })
  const reassemblyProgress = useRef({ value: 0 })
  const dissolveProgress = useRef({ value: 0 })

  useEffect(() => {
    const tl = gsap.timeline()
    
    // 1. Emergence (0s to 3.5s) - Slow, elegant fade and scale
    if (sphereRef.current) {
      tl.fromTo(sphereRef.current.scale, 
        { x: 0.01, y: 0.01, z: 0.01 }, 
        { x: 3, y: 3, z: 3, duration: 3.5, ease: 'power3.inOut' }
      )
      
      // 2. Cracking tension & slowing time (3.5s to 6s)
      tl.to(sphereRef.current.rotation, {
        y: Math.PI * 6,
        duration: 2.5,
        ease: 'power4.in',
        onComplete: () => setExploded(true)
      }, 3.5)
    } else {
      setTimeout(() => setExploded(true), 6000)
    }

    // 3. Explosion (6s to 11s) - Violent start, then extreme slow motion
    tl.to(explosionProgress.current, {
      value: 1,
      duration: 5,
      ease: 'expo.out' // Starts incredibly fast, then slows down to a crawl
    }, 6)

    // Camera flythrough (6s to 11s)
    tl.to(camera.position, {
      z: 2,
      duration: 5,
      ease: 'power2.out'
    }, 6)

    // 4. Magnetic Reassembly (9s to 13.5s) - Overlaps with the end of the explosion
    tl.to(reassemblyProgress.current, {
      value: 1,
      duration: 4.5,
      ease: 'back.out(1.2)'
    }, 9)

    // Camera pulls back to reveal text (9s to 13.5s)
    tl.to(camera.position, {
      z: 16,
      duration: 4.5,
      ease: 'power3.inOut'
    }, 9)

    // 5. Hold text for 2.5 seconds (13.5s to 16.0s)
    // 6. Text Shatter & Dissolve into wind (16.0s to 18.5s)
    tl.to(dissolveProgress.current, {
      value: 1,
      duration: 2.5,
      ease: 'power3.in',
      onComplete: () => onComplete()
    }, 16.0)

  }, [camera, onComplete])

  useFrame(() => {
    if (sphereRef.current && !exploded) {
      sphereRef.current.rotation.x += 0.001
      sphereRef.current.rotation.y += 0.002
    }
  })

  return (
    <>
      <Environment preset="studio" environmentIntensity={0.8} />
      <directionalLight position={[10, 10, 10]} intensity={3} color="#ffffff" />
      <directionalLight position={[-10, -10, -10]} intensity={1.5} color="#F472B6" />
      <ambientLight intensity={0.2} color="#F472B6" />

      {!exploded && (
        <mesh ref={sphereRef}>
          <icosahedronGeometry args={[1, 32]} />
          <primitive object={sphereMaterial} />
        </mesh>
      )}

      {exploded && (
        <CrystalFragments 
          explosionProgress={explosionProgress} 
          reassemblyProgress={reassemblyProgress} 
          dissolveProgress={dissolveProgress}
        />
      )}
    </>
  )
}

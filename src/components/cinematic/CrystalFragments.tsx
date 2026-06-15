/* eslint-disable */
'use client'

import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 12000

function getTextPoints(text: string, count: number): { x: number, y: number }[] {
  if (typeof document === 'undefined') {
    return Array(count).fill({ x: 0, y: 0 })
  }
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return Array(count).fill({ x: 0, y: 0 })

  const width = 1000
  const height = 400
  canvas.width = width
  canvas.height = height

  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, width, height)
  // Use Playfair or a serif font if available, fallback to elegant sans
  ctx.font = 'bold 180px system-ui, -apple-system, sans-serif'
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, width / 2, height / 2)

  const imageData = ctx.getImageData(0, 0, width, height).data
  const points: { x: number, y: number }[] = []

  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      const index = (y * width + x) * 4
      if (imageData[index] > 128) {
        points.push({
          x: (x - width / 2) * 0.02,
          y: -(y - height / 2) * 0.02
        })
      }
    }
  }

  const sampledPoints: { x: number, y: number }[] = []
  if (points.length === 0) return Array(count).fill({ x: 0, y: 0 })
  
  // Guarantee full coverage of the text to make it perfectly solid
  // by looping over all available points evenly instead of random selection
  for (let i = 0; i < count; i++) {
    sampledPoints.push(points[i % points.length])
  }

  // Sort left to right to create writing sequence
  sampledPoints.sort((a, b) => a.x - b.x)
  return sampledPoints
}

export function CrystalFragments({ 
  explosionProgress, 
  reassemblyProgress,
  dissolveProgress
}: { 
  explosionProgress: React.MutableRefObject<{value: number}>,
  reassemblyProgress: React.MutableRefObject<{value: number}>,
  dissolveProgress: React.MutableRefObject<{value: number}>
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null)

  const { startPositions, explodedPositions, assembledPositions, rotations, scales, windVectors } = useMemo(() => {
    const startPositions = new Float32Array(COUNT * 3)
    const explodedPositions = new Float32Array(COUNT * 3)
    const assembledPositions = new Float32Array(COUNT * 3)
    const rotations = new Float32Array(COUNT * 3)
    const scales = new Float32Array(COUNT)
    const windVectors = new Float32Array(COUNT * 3)

    const textPoints = getTextPoints('Sakshi', COUNT)

    for (let i = 0; i < COUNT; i++) {
      // Start: densely packed in a sphere (radius 2.5)
      const u = Math.random()
      const v = Math.random()
      const theta = 2 * Math.PI * u
      const phi = Math.acos(2 * v - 1)
      const r = 2.5 * Math.cbrt(Math.random())
      
      startPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      startPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      startPositions[i * 3 + 2] = r * Math.cos(phi)

      // Exploded: thrown violently outwards (radius 15-30)
      const explosionR = 15 + Math.random() * 20
      explodedPositions[i * 3] = explosionR * Math.sin(phi) * Math.cos(theta)
      explodedPositions[i * 3 + 1] = explosionR * Math.sin(phi) * Math.sin(theta)
      explodedPositions[i * 3 + 2] = explosionR * Math.cos(phi)

      // Assembled: Form the text Sakshi
      const pt = textPoints[i]
      assembledPositions[i * 3] = pt.x 
      assembledPositions[i * 3 + 1] = pt.y
      assembledPositions[i * 3 + 2] = 0 // Flat perfectly sharp text

      rotations[i * 3] = Math.random() * Math.PI * 2
      rotations[i * 3 + 1] = Math.random() * Math.PI * 2
      rotations[i * 3 + 2] = Math.random() * Math.PI * 2

      // Make them smaller to look like sparkling lines/dust
      scales[i] = 0.01 + Math.random() * 0.03

      // Wind blowing right, spreading vertically and deeply
      windVectors[i * 3] = 10 + Math.random() * 30 // Right
      windVectors[i * 3 + 1] = (Math.random() - 0.5) * 20 // Up/Down
      windVectors[i * 3 + 2] = (Math.random() - 0.5) * 20 // Depth
    }

    return { startPositions, explodedPositions, assembledPositions, rotations, scales, windVectors }
  }, [])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((state) => {
    if (!meshRef.current) return
    const ep = explosionProgress.current.value
    const rp = reassemblyProgress.current.value
    const dp = dissolveProgress.current.value

    const time = state.clock.elapsedTime

    for (let i = 0; i < COUNT; i++) {
      const idx = i * 3
      
      // Calculate individual particle progress based on X-sorting
      // Left-most particles (i=0) assemble first, right-most (i=COUNT) assemble last
      const sequenceDelay = (i / COUNT) * 0.7 // 0 to 0.7
      // We map the global rp (0 to 1) to local rp (0 to 1)
      const localRp = Math.max(0, Math.min(1, (rp - sequenceDelay) * 3.33))

      // Magnetic hovering - Fades out completely to 0 when localRp is 1 so it locks solid
      const hoverX = 0
      const hoverY = 0
      const hoverZ = Math.sin(time * 1.2 + i * 0.2) * 0.05 * localRp * (1 - localRp)

      const x = THREE.MathUtils.lerp(
        THREE.MathUtils.lerp(startPositions[idx], explodedPositions[idx], ep),
        assembledPositions[idx] + hoverX,
        localRp
      )
      const y = THREE.MathUtils.lerp(
        THREE.MathUtils.lerp(startPositions[idx + 1], explodedPositions[idx + 1], ep),
        assembledPositions[idx + 1] + hoverY,
        localRp
      )
      const z = THREE.MathUtils.lerp(
        THREE.MathUtils.lerp(startPositions[idx + 2], explodedPositions[idx + 2], ep),
        assembledPositions[idx + 2] + hoverZ,
        localRp
      )

      // Add wind dissolve offset
      const wX = windVectors[idx] * Math.pow(dp, 2)
      const wY = windVectors[idx + 1] * Math.pow(dp, 2)
      const wZ = windVectors[idx + 2] * Math.pow(dp, 2)

      dummy.position.set(x + wX, y + wY, z + wZ)
      
      const dissolveSpin = dp * 15
      const rotAmount = ep * 15 * (1 - localRp) + dissolveSpin
      
      dummy.rotation.set(
        rotations[idx] + rotAmount,
        rotations[idx + 1] + rotAmount,
        rotations[idx + 2] + rotAmount
      )

      const s = scales[i]
      // Sparkle fades out completely as it becomes solid
      const sparkle = localRp * (1 - localRp) * (1 + Math.sin(time * 10 + i) * 0.5)
      
      // When moving to target, stretch along velocity to look like lines
      const velocityStretch = (1 - localRp) * ep * 5
      
      // When localRp approaches 1, force the scale to be large enough (0.055) to overlap perfectly
      // into a solid, defined block without gaps.
      const solidScale = THREE.MathUtils.lerp(0, 0.055, localRp)

      const dissolveScale = 1 - Math.pow(dp, 1.5) // Shrinks to 0 during dissolve

      const finalScaleX = THREE.MathUtils.lerp(s + sparkle * s + velocityStretch * s, solidScale, localRp) * dissolveScale
      const finalScaleY = THREE.MathUtils.lerp(s + sparkle * s, solidScale, localRp) * dissolveScale
      const finalScaleZ = THREE.MathUtils.lerp(s + sparkle * s, solidScale * 0.2, localRp) * dissolveScale

      dummy.scale.set(finalScaleX, finalScaleY, finalScaleZ)

      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null as any, null as any, COUNT]}>
      {/* Tiny sphere acts as a sparkling dot/line */}
      <sphereGeometry args={[1, 8, 8]} />
      <meshPhysicalMaterial 
        transmission={0} 
        roughness={0.15} 
        ior={1.5} 
        thickness={0} 
        color="#FF1493" 
        emissive="#C71585"
        emissiveIntensity={2}
      />
    </instancedMesh>
  )
}

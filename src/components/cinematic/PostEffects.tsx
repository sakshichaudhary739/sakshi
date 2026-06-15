// @ts-nocheck
'use client'

import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

export function PostEffects() {
  return (
    <EffectComposer disableNormalPass>
      {/* Bloom creates the luxurious glow and light bleeding around reflections */}
      <Bloom 
        luminanceThreshold={0.6} 
        mipmapBlur 
        intensity={1.2} 
      />
      {/* @ts-ignore */}
      <Vignette eskil={false} offset={0.1} darkness={1.2} />
    </EffectComposer>
  )
}

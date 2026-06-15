'use client'

import { useState } from 'react'
import { CinematicIntro } from '@/components/cinematic/CinematicIntro'
import { Education } from '@/components/portfolio/Education'
import { TechSkills } from '@/components/portfolio/TechSkills'
import { Experience } from '@/components/portfolio/Experience'
import { Projects } from '@/components/portfolio/Projects'
import { Certifications } from '@/components/portfolio/Certifications'
import { Leadership } from '@/components/portfolio/Leadership'
import { Languages } from '@/components/portfolio/Languages'
import { Contact } from '@/components/portfolio/Contact'
import { ProfessionalSummary } from '@/components/portfolio/ProfessionalSummary'
import { motion } from 'framer-motion'

function FloralDivider() {
  return (
    <motion.div 
      className="relative w-full my-10 flex justify-center items-center max-w-4xl mx-auto text-[#FF1493]"
      initial={{ opacity: 0, scale: 0.5, y: 100 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      {/* Animated Sparkle Glow Behind */}
      <motion.div
        animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-48 h-16 bg-[#FF69B4]/30 blur-[24px] rounded-full"
      />
      
      {/* Sharp Floral Line SVG */}
      <svg viewBox="0 0 800 60" fill="none" className="w-full h-auto drop-shadow-[0_0_12px_rgba(255,20,147,0.9)] relative z-10">
        <defs>
          <linearGradient id="line-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="#FF1493" />
            <stop offset="80%" stopColor="#FF1493" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        
        {/* Left sharp line with geometric leaves */}
        <path d="M50 30 L350 30" stroke="url(#line-glow)" strokeWidth="2" />
        <path d="M320 20 L350 30 L320 40 Z" fill="#FF1493" />
        <path d="M280 23 L310 30 L280 37 Z" fill="#FF1493" opacity="0.75" />
        <path d="M240 25 L270 30 L240 35 Z" fill="#FF1493" opacity="0.5" />

        {/* Center sharp geometric flower */}
        <g transform="translate(400, 30)">
          {/* Vertical sharp petals */}
          <path d="M0 -22 L8 0 L0 22 L-8 0 Z" fill="#FF1493" />
          {/* Horizontal sharp petals */}
          <path d="M-22 0 L0 -8 L22 0 L0 8 Z" fill="#FF69B4" opacity="0.9" />
          {/* Inner sharp diamond wireframe */}
          <path d="M0 -14 L14 0 L0 14 L-14 0 Z" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />
          {/* Center glowing sparkle */}
          <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" className="animate-pulse drop-shadow-[0_0_5px_#FFFFFF]" />
        </g>

        {/* Right sharp line with geometric leaves */}
        <path d="M750 30 L450 30" stroke="url(#line-glow)" strokeWidth="2" />
        <path d="M480 20 L450 30 L480 40 Z" fill="#FF1493" />
        <path d="M520 23 L490 30 L520 37 Z" fill="#FF1493" opacity="0.75" />
        <path d="M560 25 L530 30 L560 35 Z" fill="#FF1493" opacity="0.5" />
      </svg>
      
      {/* High-speed Shimmer overlay line moving back and forth */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] overflow-hidden mix-blend-overlay -translate-y-1/2">
        <motion.div
          animate={{ x: ["-100%", "300%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-1/4 h-full bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_10px_white]"
        />
      </div>
    </motion.div>
  )
}


export default function Home() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <main className="bg-transparent min-h-screen">
      <CinematicIntro onComplete={() => setIntroDone(true)} />

      {/* ── Professional Portfolio Section ── */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 2 }}
        className="relative z-30 bg-transparent min-h-screen flex flex-col items-center py-20 overflow-hidden"
      >
        {/* Pulsing ambient light orb */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(244,114,182,0.3) 0%, rgba(190,24,93,0.2) 50%, transparent 70%)',
          }}
        />

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            initial: {},
            animate: { transition: { staggerChildren: 0.15 } }
          }}
          className="flex flex-col items-center text-center px-10" style={{ zoom: 1.1 }}
        >
          {/* Mask container for "Arham" */}
          <div className="overflow-hidden py-1">
            <motion.h1
              variants={{
                initial: { y: "110%", filter: 'blur(8px)' },
                animate: { y: 0, filter: 'blur(0px)', transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-6xl md:text-8xl lg:text-[8rem] font-medium tracking-tighter text-transparent bg-clip-text leading-[1.1] font-playfair"
              style={{
                backgroundImage: 'linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.45) 50%, #FFFFFF 100%)',
                backgroundSize: '200% auto',
                animation: 'shimmer 8s linear infinite',
              }}
            >
              Sakshi
            </motion.h1>
          </div>



          {/* Subtitle */}
          <div className="overflow-hidden mt-6 py-1">
            <motion.p
              variants={{
                initial: { opacity: 0, y: "100%", filter: 'blur(4px)' },
                animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-2xl md:text-4xl font-medium tracking-tighter text-transparent bg-clip-text uppercase mt-2 pb-1 font-playfair"
              style={{
                backgroundImage: 'linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.45) 50%, #FFFFFF 100%)',
                backgroundSize: '200% auto',
                animation: 'shimmer 8s linear infinite',
              }}
            >
              Computer Science Engineer
            </motion.p>
          </div>

          {/* Detailed Shimmering Intro Text */}
          <motion.div
            variants={{
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 } }
            }}
            className="max-w-3xl md:max-w-6xl mt-8 space-y-8 text-left px-4"
          >
            <p
              className="text-xl md:text-2xl font-medium tracking-tight leading-relaxed text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.6) 50%, #FFFFFF 100%)',
                backgroundSize: '200% auto',
                animation: 'shimmer 8s linear infinite',
              }}
            >
              Hi, I'm <span className="text-white font-semibold">Sakshi</span>, an Undergraduate Computer Science Engineering student passionate about Artificial Intelligence, Machine Learning, Cloud Computing, and Natural Language Processing.
            </p>
            <p
              className="text-xl md:text-2xl font-medium tracking-tight leading-relaxed text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.6) 50%, #FFFFFF 100%)',
                backgroundSize: '200% auto',
                animation: 'shimmer 8s linear infinite',
              }}
            >
              I build scalable applications, intelligent systems, and data-driven solutions that solve real-world challenges. My interests span software engineering, full-stack development, and building impactful technology products.
            </p>
            <p
              className="text-xl md:text-2xl font-medium tracking-tight leading-relaxed text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.6) 50%, #FFFFFF 100%)',
                backgroundSize: '200% auto',
                animation: 'shimmer 8s linear infinite',
              }}
            >
              This portfolio highlights my projects, research, technical skills, certifications, and professional journey as I continue exploring emerging technologies and building impactful solutions.
            </p>
          </motion.div>

          {/* Education Section */}
          <div className="w-full mt-8">
            <Education />
          </div>

          {/* Animated Silvery Divider */}
          <div className="w-full mt-8">
            <FloralDivider />
          </div>

          {/* Experience Section */}
          <div className="w-full mt-8">
            <Experience />
          </div>

          {/* Animated Silvery Divider */}
          <div className="w-full mt-8">
            <FloralDivider />
          </div>

          {/* Projects Section */}
          <div className="w-full mt-8">
            <Projects />
          </div>

          {/* Animated Silvery Divider */}
          <div className="w-full mt-8">
            <FloralDivider />
          </div>

          {/* Technical Skills Section */}
          <div className="w-full mt-8">
            <TechSkills />
          </div>

          {/* Animated Silvery Divider */}
          <div className="w-full mt-8">
            <FloralDivider />
          </div>

          {/* Certifications Section */}
          <div className="w-full mt-8">
            <Certifications />
          </div>

          {/* Animated Silvery Divider */}
          <div className="w-full mt-8">
            <FloralDivider />
          </div>

          {/* Leadership Section */}
          <div className="w-full mt-8">
            <Leadership />
          </div>

          {/* Animated Silvery Divider */}
          <div className="w-full mt-8">
            <FloralDivider />
          </div>

          {/* Languages Section */}
          <div className="w-full mt-8">
            <Languages />
          </div>

          {/* Animated Silvery Divider */}
          <div className="w-full mt-8">
            <FloralDivider />
          </div>

          {/* Contact & Footer Section */}
          <div className="w-full mt-8">
            <Contact />
          </div>
        </motion.div>
      </motion.div>
    </main>
  )
}


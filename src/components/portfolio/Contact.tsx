'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function Contact() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isCardHovered, setIsCardHovered] = useState(false)

  const stopColor = isCardHovered ? 'rgba(255, 105, 180, 0.9)' : 'rgba(255, 255, 255, 0.35)'
  const stopColorEdge = isCardHovered ? 'rgba(255, 105, 180, 0)' : 'rgba(255, 255, 255, 0)'

  return (
    <section className="w-full py-28 relative flex flex-col items-center">
      {/* Small uppercase category label */}
      <motion.p
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(24px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="text-sm md:text-base font-mono tracking-[0.4em] text-[#FF69B4] uppercase mb-4 drop-shadow-[0_0_8px_rgba(255,105,180,0.6)]"
      >
        OPEN FOR COLLABORATION
      </motion.p>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(24px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-transparent bg-clip-text text-center px-4 max-w-4xl"
        style={{
          backgroundImage: 'linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.5) 50%, #FFFFFF 100%)',
          backgroundSize: '200% auto',
          animation: 'shimmer 8s linear infinite',
        }}
      >
        Dreaming Up Digital Utopias
      </motion.h2>

      {/* Description text */}
      <motion.p
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(24px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="text-lg md:text-xl text-white/55 font-light text-center max-w-2xl mt-6 px-6 leading-relaxed"
      >
        I’m always thrilled to cross paths with visionary minds and trailblazing teams. Whether we’re weaving complex algorithms, sketching out a moonshot idea, or just sharing a virtual cup of coffee, my inbox is always open for inspiration.
      </motion.p>

      {/* Glassmorphic Action Card */}
      <motion.div
        ref={cardRef}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(24px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        whileHover={{
          scale: 1.015,
          borderColor: 'rgba(255, 105, 180, 0.35)',
          boxShadow: '0 0 35px rgba(255, 105, 180, 0.06)',
          transition: { duration: 0.3, ease: 'easeOut' }
        }}
        className="relative rounded-3xl border border-white/10 p-8 md:p-12 mt-12 max-w-2xl w-full mx-auto overflow-hidden bg-white/[0.01] backdrop-blur-[24px] text-center"
      >
        {/* Dynamic Glowing Border Beam SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl z-20">
          <defs>
            <linearGradient id="silver-gradient-contact" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={stopColorEdge} />
              <stop offset="30%" stopColor={stopColor} />
              <stop offset="50%" stopColor={stopColor} />
              <stop offset="100%" stopColor={stopColorEdge} />
            </linearGradient>
          </defs>
          <rect
            x="0.75"
            y="0.75"
            width="calc(100% - 1.5px)"
            height="calc(100% - 1.5px)"
            rx="23"
            ry="23"
            fill="none"
            stroke="url(#silver-gradient-contact)"
            strokeWidth="1.5"
            className="transition-all duration-300"
            style={{
              strokeDasharray: isCardHovered ? "200 500" : "150 550",
              animation: isCardHovered ? "borderBeam 4s linear infinite" : "borderBeam 8s linear infinite",
              opacity: isCardHovered ? 0.8 : 0.4
            }}
          />
        </svg>

        <h3 className="text-3xl md:text-4xl font-medium text-white/90 tracking-tight mb-3">
          Ready to Ignite Innovation?
        </h3>
        <p className="text-base md:text-lg text-white/50 font-light mb-8 max-w-md mx-auto leading-relaxed">
          Let's channel raw creativity into elegant, intelligent solutions that leave a lasting sparkle.
        </p>

        {/* Action Button */}
        <motion.a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=sakshi.chaudhary739@gmail.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-white text-black font-semibold text-base md:text-lg px-8 py-3.5 rounded-full hover:bg-neutral-200 transition-colors duration-300 pointer-events-auto shadow-lg"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
        >
          Say Hello ✨
          <ArrowRight className="w-4.5 h-4.5" />
        </motion.a>
      </motion.div>

      {/* Connect & Follow Section */}
      <div className="mt-20 flex flex-col items-center gap-6 w-full max-w-4xl px-4">
        <p className="text-sm md:text-base font-mono tracking-[0.3em] text-[#FF69B4]/80 uppercase drop-shadow-[0_0_8px_rgba(255,105,180,0.4)]">
          CONNECT & FOLLOW
        </p>

        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 justify-center items-center w-full mt-4">
          {[
            {
              label: 'Email',
              value: 'sakshi.chaudhary739@gmail.com',
              link: 'https://mail.google.com/mail/?view=cm&fs=1&to=sakshi.chaudhary739@gmail.com',
              icon: (
                <svg className="w-8 h-8 text-black drop-shadow-[0_2px_4px_rgba(255,105,180,0.3)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Cute Envelope with a Heart Seal */}
                  <rect width="20" height="16" x="2" y="4" rx="3" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  <path d="M12 16.5c-1.5-1.5-2.5-2.5-2.5-3.5 0-1 1-1.5 1.5-1.5s1 1.5 1 1.5 0.5-1.5 1.5-1.5c.5 0 1.5.5 1.5 1.5 0 1-1 2-2.5 3.5z" fill="#FF1493" stroke="none" />
                </svg>
              )
            },
            {
              label: 'GitHub',
              value: 'github.com/sakshichaudhary739',
              link: 'https://github.com/sakshichaudhary739',
              icon: (
                <svg className="w-8 h-8 text-black drop-shadow-[0_2px_4px_rgba(255,105,180,0.3)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Cute Fox/Cat Face */}
                  <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7 .58 10a11.95 11.95 0 0 1-5.14 9.77H8.14A11.95 11.95 0 0 1 3 13c1-3-.82-9.42.58-10 1.4-.58 4.64.26 6.42 2.26C10.65 5.09 11.33 5 12 5z" />
                  <circle cx="9" cy="13" r="1.5" fill="currentColor" />
                  <circle cx="15" cy="13" r="1.5" fill="currentColor" />
                  <path d="M12 16v1" />
                </svg>
              )
            },
            {
              label: 'LinkedIn',
              value: 'linkedin.com/in/sakshi-1a4064289',
              link: 'https://www.linkedin.com/in/sakshi-1a4064289/',
              icon: (
                <svg className="w-8 h-8 text-black drop-shadow-[0_2px_4px_rgba(255,105,180,0.3)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Cute Badge for LinkedIn */}
                  <rect x="2" y="2" width="20" height="20" rx="8" />
                  <text x="12" y="16.5" fontSize="13" fontWeight="900" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="sans-serif">in</text>
                  <circle cx="19" cy="5" r="1.5" fill="#FF1493" stroke="none" />
                </svg>
              )
            }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3 text-center">
              <motion.a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.96 }}
                className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black pointer-events-auto shadow-xl"
              >
                {item.icon}
              </motion.a>
              <div className="flex flex-col items-center">
                <span className="text-xs font-mono tracking-widest text-[#FF69B4]/80 uppercase">{item.label}</span>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-base text-white/55 hover:text-white font-light mt-1.5 transition-colors pointer-events-auto break-all px-2 block max-w-[240px]"
                >
                  {item.value}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Closing phrase */}
        <motion.p
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(24px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="text-xl md:text-2xl font-light tracking-widest text-white/60 mt-4 text-center italic"
        >
          Let's craft the future with a touch of magic.
        </motion.p>
      </div>

      {/* Bottom Footer Border Separator */}
      <div className="w-full border-t border-white/5 mt-24 pt-8 px-8 flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
        <p className="text-sm md:text-base text-white/35 font-light">
          © 2026 Sakshi. All rights reserved.
        </p>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF1493] shadow-[0_0_8px_rgba(255,20,147,0.8)] animate-pulse" />
          <span className="text-sm md:text-base text-white/50 font-light">Available for opportunities</span>
        </div>

        <div className="flex gap-6 text-sm md:text-base text-white/35 font-light">
          <a href="#" className="hover:text-white transition-colors">Work</a>
          <a href="#" className="hover:text-white transition-colors">About</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </section>
  )
}

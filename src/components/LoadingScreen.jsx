import React from 'react';
import { motion } from 'framer-motion';

const title = 'HADIYA';
const letters = title.split('');

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.12,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 40, blur: 8 },
  visible: {
    opacity: 1,
    y: 0,
    blur: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const LoadingScreen = () => {
  return (
    <div className="min-h-screen w-full bg-[#050814] text-white relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Cinematic top/bottom bars */}
      <motion.div
        className="pointer-events-none absolute top-0 left-0 right-0 h-24 md:h-32 bg-[#050814]"
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-[#050814]"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Center glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[320px] md:w-[420px] h-[320px] md:h-[420px] rounded-full bg-[#3f5e96]/40 blur-[120px]" />
      </div>

      {/* Main title */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <motion.div
          className="mb-6 text-xs md:text-sm tracking-[0.45em] uppercase text-gray-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          a portfolio by
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-2 md:gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {letters.map((ch, i) => (
            <motion.span
              key={`${ch}-${i}`}
              variants={letterVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.25em]"
            >
              {ch}
            </motion.span>
          ))}
        </motion.div>

        {/* Underline sweep */}
        <motion.div
          className="mt-6 h-[2px] w-40 md:w-56 bg-gradient-to-r from-transparent via-[#3f5e96] to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'center' }}
        />

        {/* Tagline */}
        <motion.p
          className="mt-6 text-xs md:text-sm text-gray-400 uppercase tracking-[0.35em] text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.7 }}
        >
          now loading experience
        </motion.p>

        {/* Progress bar */}
        <motion.div
          className="mt-10 w-40 md:w-56 h-[1px] bg-white/10 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-[#3f5e96] via-white to-[#3f5e96]"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;


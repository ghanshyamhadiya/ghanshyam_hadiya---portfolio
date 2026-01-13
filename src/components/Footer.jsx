import React, { useState, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMail } from 'react-icons/hi';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { ArrowUp } from 'lucide-react';

const SocialButton = memo(({ icon: Icon, href, label, delay = 0 }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="relative w-14 h-14 rounded-full bg-[#3f5e96]/20 border-2 border-[#3f5e96]/30 backdrop-blur-sm flex items-center justify-center text-white hover:text-white transition-all duration-400 group overflow-hidden"
    initial={{ opacity: 0, y: 20, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay: 0.3 + delay, duration: 0.5, type: 'spring', stiffness: 200 }}
    whileHover={{ scale: 1.15, y: -4, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
    aria-label={label}
  >
    <Icon size={22} className="z-10 relative" />
    <motion.div
      className="absolute inset-0 bg-[#3f5e96] rounded-full"
      initial={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    />
  </motion.a>
));

const Footer = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const currentYear = new Date().getFullYear();

  const socialLinks = useMemo(() => [
    {
      icon: FiGithub,
      href: 'https://github.com/ghanshyamhadiya',
      label: 'GitHub',
    },
    {
      icon: FiLinkedin,
      href: 'https://www.linkedin.com/in/ghanshyam-hadiya-13971b2bb',
      label: 'LinkedIn',
    },
    {
      icon: HiOutlineMail,
      href: 'mailto:ghanshyamhadiya013@gmail.com',
      label: 'Email',
    },
  ], []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.footer
      className="bg-[#141e30] py-16 md:py-20 relative overflow-hidden font-sans border-t-2 border-[#3f5e96]/30"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={footerVariants}
      >
      {/* Subtle background texture (shared with projects) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12"
          variants={itemVariants}
        >
          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Ghanshyam Hadiya
          </motion.h2>
          <motion.p 
            className="text-gray-300 text-base sm:text-lg max-w-md mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Building digital experiences with creativity and code.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex justify-center gap-6 sm:gap-8 mb-12"
          variants={itemVariants}
        >
          {socialLinks.map((link, index) => (
            <motion.div
              key={index}
              className="relative"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <SocialButton
                href={link.href}
                icon={link.icon}
                label={link.label}
                delay={index * 0.1}
              />
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-2 px-4 rounded-lg shadow-lg border-2 border-black/10 whitespace-nowrap"
                    initial={{ opacity: 0, y: 5, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.9 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    {link.label}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#3f5e96]"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="border-t-2 border-black/10 pt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          <p className="text-white text-sm sm:text-base font-medium">
            &copy; {currentYear} Ghanshyam Hadiya. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#3f5e96]/20 hover:bg-[#3f5e96] text-white hover:text-white border-2 border-[#3f5e96]/30 hover:border-[#3f5e96] transition-all duration-300 font-semibold text-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Back to Top</span>
            <ArrowUp size={16} />
          </motion.button>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default memo(Footer);

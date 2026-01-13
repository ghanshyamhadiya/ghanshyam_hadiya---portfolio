import React, { useEffect, useRef, useState, memo, useMemo } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { Download, Mail, Github, Linkedin, Twitter, ArrowDown } from "lucide-react";
import ProfileImage from "../assets/memoji-computer.0c295dc9.png";

const SocialButton = memo(({ icon: Icon, href, delay = 0 }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="relative w-12 h-12 rounded-full bg-[#3f5e96]/20 border border-[#3f5e96]/30 hover:border-[#3f5e96]/50 transition-all duration-500 flex items-center justify-center group shadow-sm hover:shadow-md"
    initial={{ opacity: 0, y: 20, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{
      delay: 1.2 + delay,
      duration: 0.6,
      type: "spring",
      stiffness: 200,
      damping: 15,
    }}
    whileHover={{ scale: 1.15, rotate: 5, y: -3 }}
    whileTap={{ scale: 0.9 }}
  >
    <Icon
      className="text-white transition-colors duration-500 z-10"
      size={18}
    />
    <motion.div
      className="absolute inset-0 bg-black rounded-full"
      initial={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    />
  </motion.a>
));

const TypewriterText = memo(({ jobTitles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout;
    const currentTitle = jobTitles[currentIndex];

    if (isTyping) {
      if (displayText.length < currentTitle.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        setCurrentIndex((prev) => (prev + 1) % jobTitles.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentIndex, jobTitles]);

  return (
    <div className="relative h-10 sm:h-12 md:h-14 flex items-center">
      <span className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        {displayText}
      </span>
      <motion.span
        className="inline-block w-0.5 h-6 sm:h-8 md:h-10 bg-[#3f5e96] ml-2"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
});

const ActionButtons = memo(() => (
  <motion.div
    className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.0, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
  >
    <motion.a
      href="#contact"
      className="relative px-8 py-4 bg-black text-white rounded-full font-semibold text-base sm:text-lg overflow-hidden group shadow-lg hover:shadow-xl w-full sm:w-auto max-w-[280px] sm:max-w-none"
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={(e) => {
        e.preventDefault();
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black"
        initial={{ x: "-100%" }}
        whileHover={{ x: "0%" }}
        transition={{ duration: 0.4 }}
      />
      <span className="relative z-10 flex items-center justify-center gap-2">
        <Mail size={18} />
        Contact Me
      </span>
    </motion.a>

    <motion.a
      href="/src/assets/Ghanshyam_Hadiya.pdf"
      download
      className="relative px-8 py-4 border-2 border-[#3f5e96] text-white rounded-full font-semibold text-base sm:text-lg hover:bg-[#3f5e96] hover:text-white transition-all duration-400 overflow-hidden group shadow-lg hover:shadow-xl w-full sm:w-auto max-w-[280px] sm:max-w-none"
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="absolute inset-0 bg-[#3f5e96]"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
      <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-400">
        <Download size={18} />
        Download Resume
      </span>
    </motion.a>
  </motion.div>
));

const FloatingElements = memo(() => {
  const elements = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 3,
      delay: Math.random() * 2,
    })), []
  );

  return (
    <>
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute rounded-full bg-black/5"
          style={{
            width: `${el.size}px`,
            height: `${el.size}px`,
            left: `${el.left}%`,
            top: `${el.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
});

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const controls = useAnimation();
  const imageControls = useAnimation();
  const [cursorActive, setCursorActive] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotate: 0,
      transition: { 
        duration: 1.2, 
        delay: 0.3, 
        type: 'spring', 
        stiffness: 100,
        damping: 15
      },
    },
  };

  const jobTitles = useMemo(
    () => [
      "Full Stack Developer...",
      "React Developer...",
      "Node.js Engineer...",
      "UI/UX Enthusiast...",
    ],
    []
  );

  const socialIcons = [
    { icon: Github, href: "https://github.com/ghanshyamhadiya" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/ghanshyam-hadiya-13971b2bb" },
    { icon: Twitter, href: "https://twitter.com" },
  ];

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
    imageControls.start("visible");
  }, [controls, imageControls]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center bg-[#141e30] text-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle background texture (shared with projects) */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
      
      {/* Main Content */}
      <motion.div
        className="relative flex flex-col items-center z-10 w-full max-w-6xl mx-auto"
        style={{ y, opacity }}
      >
        {/* Image Section */}
        <motion.div
          className="relative flex flex-col items-center mb-8"
          variants={imageVariants}
          initial="hidden"
          animate={imageControls}
        >
          <motion.div
            className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.4, type: "spring" }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-black/5 blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <img 
              src={ProfileImage} 
              alt="Ghanshyam Hadiya" 
              className="relative w-full h-full object-cover rounded-full"
            />
          </motion.div>
          
          <motion.div
            className="bg-[#3f5e96]/20 border border-[#3f5e96]/30 rounded-full px-6 sm:px-8 md:px-12 py-2.5 sm:py-3 shadow-sm backdrop-blur-sm"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <span className="text-white font-medium text-sm sm:text-base">
              Hello, I'm
            </span>
          </motion.div>
        </motion.div>

        {/* Text + Buttons Section */}
        <motion.div
          className="mt-6 sm:mt-8 space-y-6 sm:space-y-8 max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate={controls}
            className="space-y-3"
          >
            <div
              onMouseMove={(e) => {
                setCursorActive(true);
                setCursorPos({ x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => setCursorActive(false)}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-tight tracking-tight">
                Ghanshyam{' '}
                <motion.span
                  className="relative inline-block px-2 sm:px-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-black rounded-lg"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{ originX: 0 }}
                  />
                  <motion.span
                    className="relative z-10 text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.6, duration: 0.4 }}
                  >
                    Hadiya
                  </motion.span>
                </motion.span>
              </h1>
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
              I'm a
            </span>
            <TypewriterText jobTitles={jobTitles} />
          </motion.div>

          <motion.p 
            className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed px-4 sm:px-0 max-w-3xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.6 }}
          >
            Crafting modern web applications with cutting-edge technologies.
            <br className="hidden sm:block" />
            Passionate about elegant solutions and exceptional user experiences.
          </motion.p>

          <ActionButtons />

          <motion.div 
            className="flex gap-4 sm:gap-5 justify-center pt-6 sm:pt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            {socialIcons.map((social, index) => (
              <SocialButton
                key={index}
                href={social.href}
                icon={social.icon}
                delay={index * 0.15}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - desktop only to avoid overlap with mobile nav */}
      <motion.div
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.6 }}
      >
        <span className="text-xs text-gray-400 font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} className="text-white" />
        </motion.div>
      </motion.div>

      {/* Bottom Fade Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#141e30] to-transparent pointer-events-none" />

      {/* Custom cursor for name hover */}
      {cursorActive && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-[9999]"
          style={{ x: cursorPos.x - 16, y: cursorPos.y - 16 }}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-full border border-white/60 backdrop-blur-sm" />
            <div className="absolute inset-2 rounded-full border border-[#3f5e96]/80 opacity-80" />
            <div className="absolute inset-3 rounded-full bg-white/20 blur-[6px]" />
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default memo(Hero);

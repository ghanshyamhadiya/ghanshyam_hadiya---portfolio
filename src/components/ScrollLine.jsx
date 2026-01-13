import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const sections = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const ScrollLine = () => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, {
    damping: 35,
    stiffness: 300,
    mass: 0.5,
  });

  // Rocket vertical position along the rail
  const rocketY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      
      // Calculate overall scroll progress (0 to 1) for the line
      const overallProgress = maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;
      progress.set(overallProgress);

      // Find section elements
      const sectionElements = sections
        .map((section) => ({
          ...section,
          element: document.querySelector(`#${section.id}`),
        }))
        .filter((s) => s.element)
        .sort((a, b) => a.element.offsetTop - b.element.offsetTop);

      if (sectionElements.length === 0) return;

      const scrollPosition = scrollTop + windowHeight * 0.35; // Trigger point

      let currentActiveIndex = 0;
      let currentProgress = 0;

      sectionElements.forEach((section, index) => {
        const element = section.element;
        const sectionTop = element.offsetTop;
        const sectionHeight = element.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;

        // Check if currently in this section
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          currentActiveIndex = index;
          
          // Calculate progress within current section (0 to 1)
          const progressInSection = Math.max(
            0,
            Math.min(1, (scrollPosition - sectionTop) / sectionHeight)
          );
          currentProgress = progressInSection;
        }
      });

      // Handle edge cases
      if (scrollPosition < sectionElements[0]?.element.offsetTop) {
        currentActiveIndex = 0;
        currentProgress = 0;
      } else if (scrollPosition >= sectionElements[sectionElements.length - 1]?.element.offsetTop) {
        currentActiveIndex = sectionElements.length - 1;
        currentProgress = 1;
      }

      setActiveSectionIndex(currentActiveIndex);
      setSectionProgress(currentProgress);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [progress]);

  // Calculate dot fill progress
  const getDotFillProgress = (index) => {
    if (activeSectionIndex > index) {
      // Section has been passed - fully filled
      return 1;
    } else if (activeSectionIndex === index) {
      // Current section - fill based on scroll progress
      return sectionProgress;
    } else {
      // Future section - not filled
      return 0;
    }
  };

  const handleDotClick = (sectionId) => {
    const targetSection = document.querySelector(`#${sectionId}`);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center h-[65vh] max-h-[520px]"
      style={{ pointerEvents: "none" }}
    >
      {/* Vertical Line / Rocket Rail */}
      <div className="relative w-[6px] h-full flex items-center justify-center">
        {/* Background Rail */}
        <div className="absolute inset-0 w-[3px] rounded-full bg-gradient-to-b from-white/10 via-blue-300/20 to-purple-400/30 shadow-[0_0_20px_rgba(56,189,248,0.35)]" />

        {/* Animated Fill Rail */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[4px] rounded-full origin-top bg-gradient-to-b from-sky-400 via-indigo-400 to-fuchsia-400 shadow-[0_0_30px_rgba(129,140,248,0.9)]"
          style={{
            height: "100%",
            scaleY: smoothProgress,
          }}
        />

        {/* Rocket */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: rocketY,
            pointerEvents: "auto",
          }}
        >
          <motion.div
            className="relative w-9 h-9 md:w-10 md:h-10 flex items-center justify-center"
            animate={{
              y: [0, -2, 0],
              rotate: [-1.5, 1.5, -1.5],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Rocket body */}
            <div className="relative z-20 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-tr from-sky-400 via-indigo-500 to-fuchsia-500 shadow-[0_0_25px_rgba(129,140,248,0.9)] border border-white/40 flex items-center justify-center">
              <div className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-slate-900/90 border border-white/30 shadow-inner" />
            </div>

            {/* Rocket nose */}
            <div className="absolute -top-2 w-0 h-0 border-l-[9px] border-r-[9px] border-b-[14px] border-l-transparent border-r-transparent border-b-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" />

            {/* Rocket fins */}
            <div className="absolute -bottom-1 left-0 w-2 h-3 bg-fuchsia-500/90 rounded-br-full blur-[0.2px]" />
            <div className="absolute -bottom-1 right-0 w-2 h-3 bg-fuchsia-500/90 rounded-bl-full blur-[0.2px]" />

            {/* Flame */}
            <motion.div
              className="absolute -bottom-3 w-3 h-5 rounded-full bg-gradient-to-b from-amber-300 via-orange-400 to-red-500 blur-[1px]"
              animate={{
                scaleY: [1, 1.25, 0.9, 1.2, 1],
                opacity: [0.9, 1, 0.7, 1, 0.9],
              }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Exhaust particles */}
            <motion.div
              className="absolute -bottom-4 w-8 h-8"
              animate={{
                scale: [0.6, 1, 0.8, 1],
                opacity: [0.5, 0.2, 0.45, 0.1],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeOut",
              }}
            >
              <div className="absolute inset-0 rounded-full border border-amber-300/40 blur-[1px]" />
              <div className="absolute inset-1 rounded-full border border-orange-400/20 blur-[2px]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Dots Container - Positioned to align with line */}
      <div className="absolute inset-0 flex flex-col justify-between items-center">
        {sections.map((section, index) => {
          const fillProgress = getDotFillProgress(index);
          const isActive = activeSectionIndex === index;
          const isFilled = fillProgress > 0;
          
          return (
            <motion.div
              key={section.id}
              className="relative flex items-center justify-center cursor-pointer group"
              style={{ 
                pointerEvents: "auto",
                width: "34px",
                height: "34px",
              }}
              onClick={() => handleDotClick(section.id)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              whileHover={{ scale: 1.15 }}
            >
              {/* Outer Circle Ring */}
              <motion.div
                className="absolute w-6 h-6 rounded-full border-2 bg-slate-900/80 backdrop-blur-md z-10 shadow-[0_0_18px_rgba(148,163,184,0.7)]"
                animate={{
                  borderColor: isActive || isFilled ? "rgba(56,189,248,0.9)" : "rgba(148,163,184,0.6)",
                  boxShadow: isActive
                    ? "0 0 25px rgba(96,165,250,0.95)"
                    : "0 0 10px rgba(15,23,42,0.8)",
                  scale: isActive ? 1.25 : 1,
                }}
                transition={{
                  type: "spring",
                  damping: 22,
                  stiffness: 380,
                  mass: 0.5,
                }}
              />

              {/* Fill Circle */}
              <motion.div
                className="absolute w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-sky-400 via-indigo-400 to-fuchsia-500 z-20 shadow-[0_0_16px_rgba(129,140,248,1)]"
                style={{
                  scale: fillProgress,
                }}
                transition={{
                  type: "spring",
                  damping: 24,
                  stiffness: 420,
                  mass: 0.3,
                }}
              />

              {/* Pulsing Ring for Active Dot */}
              {isActive && (
                <motion.div
                  className="absolute w-8 h-8 rounded-full border border-sky-400/60 z-0"
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.65, 0, 0.65],
                  }}
                  transition={{
                    duration: 2.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}

              {/* Tooltip */}
              <motion.div
                className="absolute left-8 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50"
                initial={{ x: -5 }}
              >
                <div className="relative bg-black text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-xl">
                  {section.label}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-black rotate-45" />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollLine;
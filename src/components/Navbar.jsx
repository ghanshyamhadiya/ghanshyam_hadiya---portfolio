import { useState, useEffect, useCallback, memo, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { Home, Code2, FolderGit2, Mail } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home", icon: Home },
  { href: "#skills", label: "Skills", icon: Code2 },
  { href: "#projects", label: "Projects", icon: FolderGit2 },
  { href: "#contact", label: "Contact", icon: Mail },
];

const socialLinks = [
  { icon: <FiGithub size={18} />, href: "https://github.com/ghanshyamhadiya", label: "GitHub" },
  { icon: <FiLinkedin size={18} />, href: "https://www.linkedin.com/in/ghanshyam-hadiya-13971b2bb", label: "LinkedIn" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activePath, setActivePath] = useState("#home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const navRef = useRef(null);
  const { scrollY } = useScroll();
  
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const navbarBlur = useTransform(scrollY, [0, 100], [8, 20]);
  const navbarShadow = useTransform(scrollY, [0, 100], [0, 0.5]);

  const handleScroll = useCallback(() => {
    const position = window.scrollY;
    setScrolled(position > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const sections = navLinks.map((link) => document.querySelector(link.href)).filter(Boolean);

    const handleSpy = () => {
      let current = "#home";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.3) {
          current = `#${section.id}`;
        }
      });
      setActivePath(current);
    };

    window.addEventListener("scroll", handleSpy, { passive: true });
    handleSpy();
    return () => window.removeEventListener("scroll", handleSpy);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Top Navbar - Hidden on mobile, visible on desktop */}
      <motion.nav
        ref={navRef}
        className="hidden md:block fixed w-full z-[9999]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: navbarOpacity,
          backdropFilter: `blur(${navbarBlur}px)`,
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ 
          opacity: navbarOpacity,
          backdropFilter: `blur(${navbarBlur}px)`,
        }}
      >
        <motion.div
          className={`absolute inset-0 transition-all duration-500 ${
            scrolled
              ? "bg-black/50 backdrop-blur-xl border-b border-[#3f5e96]/30"
              : "bg-transparent backdrop-blur-none"
          }`}
          style={{
            boxShadow: scrolled 
              ? `0 10px 40px rgba(0, 0, 0, ${navbarShadow})` 
              : 'none',
            zIndex: -1
          }}
        />

        {/* Gradient Accent Line */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-[#3f5e96] to-transparent"
          initial={{ width: 0 }}
          animate={{ width: scrolled ? "100%" : "0%" }}
          transition={{ duration: 0.6 }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-[10000]">
          <div className="flex justify-between items-center py-3 sm:py-4">
            {/* Logo */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <a 
                href="#home" 
                onClick={(e) => handleNavClick(e, "#home")} 
                className="flex items-center gap-2 group relative"
              >
                {/* Glowing Background */}
                <motion.div
                  className="absolute inset-0 -inset-x-2 -inset-y-1 rounded-xl bg-[#3f5e96]/20 opacity-0 group-hover:opacity-100 blur-xl"
                  transition={{ duration: 0.3 }}
                />
                
                <motion.span 
                  className="text-[#3f5e96] text-xl sm:text-2xl font-bold"
                  whileHover={{ rotate: -15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  &lt;
                </motion.span>
                
                <motion.span 
                  className="text-white text-xl sm:text-2xl font-extrabold tracking-tight relative z-10"
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  GH
                </motion.span>
                
                <motion.span 
                  className="text-[#3f5e96] text-xl sm:text-2xl font-bold"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  /&gt;
                </motion.span>

                {/* Animated Underline */}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#3f5e96] to-cyan-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
              </a>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-2 lg:gap-4">
              <div className="flex items-center gap-1 lg:gap-2 bg-[#1e293b]/50 backdrop-blur-sm rounded-2xl p-1.5 border border-[#3f5e96]/20">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activePath === link.href;
                  const isHovered = hoveredLink === link.href;
                  
                  return (
                    <motion.div
                      key={link.href}
                      onHoverStart={() => setHoveredLink(link.href)}
                      onHoverEnd={() => setHoveredLink(null)}
                      className="relative"
                    >
                      <motion.a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                          isActive
                            ? "text-white"
                            : "text-gray-300 hover:text-white"
                        }`}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {/* Underline indicator */}
                        <motion.span
                          className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-gradient-to-r from-transparent via-[#3f5e96] to-transparent"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0.3 }}
                          transition={{ duration: 0.25 }}
                        />

                        {/* Icon */}
                        <motion.div
                          className="relative z-10"
                          animate={{
                            rotate: isHovered ? [0, -10, 10, 0] : 0,
                            scale: isActive ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon size={16} />
                        </motion.div>

                        {/* Label */}
                        <span className="relative z-10 hidden lg:inline">{link.label}</span>

                        {/* Active Indicator */}
                        {isActive && (
                          <motion.div
                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                          />
                        )}
                      </motion.a>
                    </motion.div>
                  );
                })}
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-2 border-l border-[#3f5e96]/30 pl-4 ml-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-10 h-10 rounded-xl bg-[#1e293b]/50 border border-[#3f5e96]/20 hover:border-[#3f5e96]/50 text-white flex items-center justify-center transition-all duration-300 group overflow-hidden"
                    whileHover={{ scale: 1.1, y: -2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {/* Hover Background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#3f5e96] to-cyan-500 rounded-xl"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                    
                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-[#3f5e96] rounded-xl blur-md opacity-0 group-hover:opacity-50"
                      transition={{ duration: 0.3 }}
                    />
                    
                    <span className="relative z-10">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </motion.nav>


      {/* Mobile Bottom Navbar */}
      <motion.div
        className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-[9999]"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="relative bg-[#1e293b]/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/30 p-2 border border-[#3f5e96]/30">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#3f5e96]/20 to-cyan-500/20 rounded-2xl blur-xl" />
          
          <div className="relative flex justify-around items-center">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = activePath === href;
              
              return (
                <motion.button
                  key={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={`relative flex flex-col items-center text-xs font-medium transition-all duration-300 rounded-xl p-2.5 min-w-[60px] ${
                    isActive 
                      ? "text-white" 
                      : "text-gray-400"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Active Background */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-[#3f5e96] to-cyan-500/80 rounded-xl"
                        layoutId="activeMobileNav"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>

                  <motion.div
                    className="relative z-10"
                    animate={{ 
                      scale: isActive ? 1.15 : 1,
                      rotate: isActive ? [0, -10, 10, 0] : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon size={20} />
                  </motion.div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default memo(Navbar);

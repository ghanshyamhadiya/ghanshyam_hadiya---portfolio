import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileCode2, Palette, SquareCode, Atom, GitFork,
  Server, Rocket, Database, Send, Package, Grid, Sparkles
} from 'lucide-react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const categories = [
    { id: 'all', label: 'All Skills', icon: Grid, color: 'from-blue-500 to-cyan-500' },
    { id: 'frontend', label: 'Frontend', icon: Palette, color: 'from-purple-500 to-pink-500' },
    { id: 'backend', label: 'Backend', icon: Server, color: 'from-green-500 to-emerald-500' },
    { id: 'tools', label: 'Tools', icon: Package, color: 'from-orange-500 to-red-500' }
  ];

  const skills = [
    { name: 'HTML5', icon: FileCode2, category: 'frontend', level: 95 },
    { name: 'CSS3', icon: Palette, category: 'frontend', level: 90 },
    { name: 'JavaScript', icon: SquareCode, category: 'frontend', level: 88 },
    { name: 'React', icon: Atom, category: 'frontend', level: 85 },
    { name: 'Redux', icon: GitFork, category: 'frontend', level: 80 },
    { name: 'Tailwind', icon: Palette, category: 'frontend', level: 92 },
    { name: 'Bootstrap', icon: Grid, category: 'frontend', level: 88 },

    { name: 'Node.js', icon: Server, category: 'backend', level: 85 },
    { name: 'Express', icon: Rocket, category: 'backend', level: 82 },
    { name: 'MongoDB', icon: Database, category: 'backend', level: 80 },
    { name: 'SQL', icon: Database, category: 'backend', level: 78 },
    { name: 'EJS', icon: SquareCode, category: 'backend', level: 85 },

    { name: 'Git', icon: GitFork, category: 'tools', level: 90 },
    { name: 'Postman', icon: Send, category: 'tools', level: 85 },
    { name: 'NPM', icon: Package, category: 'tools', level: 88 },
  ];

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return skills;
    return skills.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const skillCardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5,
      y: 50,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.8
      }
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      y: -50,
      transition: { duration: 0.2 }
    }
  };

  const categoryButtonVariants = {
    inactive: {
      scale: 1,
      backgroundColor: 'rgba(63, 94, 150, 0.2)',
    },
    active: {
      scale: 1.05,
      backgroundColor: 'rgba(63, 94, 150, 1)',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      scale: 1.08,
      backgroundColor: 'rgba(63, 94, 150, 0.4)',
    }
  };

  return (
    <section id="skills" className="relative py-20 bg-[#141e30] overflow-hidden">
      {/* Subtle background texture (shared with projects) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <Sparkles className="text-[#3f5e96] w-8 h-8" />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Technical <span className="bg-gradient-to-r from-[#3f5e96] to-cyan-400 bg-clip-text text-transparent">Skills</span>
            </h2>
            <Sparkles className="text-[#3f5e96] w-8 h-8" />
          </motion.div>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex justify-center gap-3 sm:gap-4 mb-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map(({ id, label, icon: Icon, color }) => (
            <motion.button
              key={id}
              onClick={() => setActiveCategory(id)}
              variants={categoryButtonVariants}
              initial="inactive"
              animate={activeCategory === id ? "active" : "inactive"}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold text-sm sm:text-base transition-all duration-300 ${
                activeCategory === id
                  ? 'text-white shadow-lg shadow-[#3f5e96]/50'
                  : 'text-gray-300'
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
          >
            {filtered.map((skill, index) => {
              const Icon = skill.icon;
              const isHovered = hoveredSkill === skill.name;
              
              return (
                <motion.div
                  key={skill.name}
                  variants={skillCardVariants}
                  onHoverStart={() => setHoveredSkill(skill.name)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  className="group relative"
                  style={{ perspective: '1000px' }}
                >
                  {/* Skill Card */}
                  <motion.div
                    className="relative h-32 sm:h-36 md:h-40 rounded-2xl overflow-hidden cursor-pointer"
                    whileHover={{ 
                      y: -8,
                      rotateY: 5,
                      rotateX: 5,
                      transition: { duration: 0.3 }
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Glassmorphism Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b]/90 to-[#0f172a]/90 backdrop-blur-xl border border-[#3f5e96]/30 rounded-2xl" />
                    
                    {/* Animated Gradient Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#3f5e96]/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 rounded-2xl"
                      transition={{ duration: 0.3 }}
                    />

                    {/* Glowing Border Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: isHovered
                          ? 'linear-gradient(135deg, rgba(63, 94, 150, 0.5), rgba(6, 182, 212, 0.5))'
                          : 'transparent',
                        boxShadow: isHovered
                          ? '0 0 30px rgba(63, 94, 150, 0.6), inset 0 0 30px rgba(63, 94, 150, 0.1)'
                          : 'none',
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center p-4 z-10">
                      {/* Icon */}
                      <motion.div
                        className="mb-2"
                        animate={{
                          rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
                          scale: isHovered ? 1.2 : 1,
                        }}
                        transition={{
                          rotate: { duration: 0.5, ease: "easeInOut" },
                          scale: { duration: 0.3 }
                        }}
                      >
                        <Icon 
                          className="text-4xl sm:text-5xl text-white drop-shadow-lg" 
                          style={{ filter: isHovered ? 'drop-shadow(0 0 10px rgba(63, 94, 150, 0.8))' : 'none' }}
                        />
                      </motion.div>

                      {/* Skill Name */}
                      <motion.span
                        className="text-white font-bold text-xs sm:text-sm text-center"
                        animate={{
                          scale: isHovered ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {skill.name}
                      </motion.span>

                      {/* Progress Bar */}
                      <motion.div
                        className="absolute bottom-2 left-2 right-2 h-1 bg-[#3f5e96]/20 rounded-full overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#3f5e96] to-cyan-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: isHovered ? `${skill.level}%` : 0 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        />
                      </motion.div>

                      {/* Floating Particles Effect */}
                      {isHovered && (
                        <>
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-[#3f5e96] rounded-full"
                              initial={{
                                x: '50%',
                                y: '50%',
                                opacity: 0.8,
                                scale: 0
                              }}
                              animate={{
                                x: `${50 + (Math.random() - 0.5) * 100}%`,
                                y: `${50 + (Math.random() - 0.5) * 100}%`,
                                opacity: 0,
                                scale: [0, 1, 0]
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.1,
                                ease: "easeOut"
                              }}
                            />
                          ))}
                        </>
                      )}
                    </div>

                    {/* Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={isHovered ? { x: '200%' } : { x: '-100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.div>

                  {/* Shadow */}
                  <motion.div
                    className="absolute -z-10 inset-0 bg-[#3f5e96]/20 rounded-2xl blur-xl"
                    animate={{
                      opacity: isHovered ? 0.6 : 0.2,
                      scale: isHovered ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Stats Footer */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-8 px-8 py-4 rounded-2xl bg-[#1e293b]/50 backdrop-blur-xl border border-[#3f5e96]/30">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">{skills.length}+</div>
              <div className="text-xs sm:text-sm text-gray-400">Technologies</div>
            </div>
            <div className="w-px h-12 bg-[#3f5e96]/30" />
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">{categories.length}</div>
              <div className="text-xs sm:text-sm text-gray-400">Categories</div>
            </div>
            <div className="w-px h-12 bg-[#3f5e96]/30" />
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">100%</div>
              <div className="text-xs sm:text-sm text-gray-400">Passion</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

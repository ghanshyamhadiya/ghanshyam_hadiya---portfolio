import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';

const ProjectCard = ({ project, index, isHovered, onHover, onLeave }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isEven = index % 2 === 0;

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.article
      className={`group relative flex flex-col ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      } gap-8 md:gap-12 items-start`}
      variants={cardVariants}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Project Number */}
      <motion.div
        className="absolute -left-8 md:-left-12 top-0 text-[#3f5e96]/10 font-mono text-6xl md:text-8xl font-bold select-none"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
      >
        {String(index + 1).padStart(2, '0')}
      </motion.div>

      {/* Content Section */}
      <div className={`flex-1 ${isEven ? 'md:pr-8' : 'md:pl-8'} relative z-10`}>
        {/* Year & Status */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[#3f5e96] text-xs font-mono tracking-wider">
            {project.year}
          </span>
          <span className="h-1 w-1 rounded-full bg-[#3f5e96]/40" />
          <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">
            {project.status}
          </span>
        </div>

        {/* Title */}
        <motion.h3
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
          whileHover={{ x: isEven ? 4 : -4 }}
          transition={{ duration: 0.2 }}
        >
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:text-[#3f5e96] transition-colors duration-300"
          >
            {project.title}
          </a>
        </motion.h3>

        {/* Description */}
        <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag, tagIndex) => (
            <motion.span
              key={tag}
              className="text-xs md:text-sm px-3 py-1.5 bg-[#1e293b] text-gray-300 rounded border border-[#3f5e96]/20 font-mono"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: tagIndex * 0.05, duration: 0.3 }}
              whileHover={{
                borderColor: '#3f5e96',
                backgroundColor: '#1e293b',
                scale: 1.05,
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          <motion.a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group/link"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <Github size={18} className="group-hover/link:rotate-12 transition-transform" />
            <span className="text-sm font-medium">Code</span>
          </motion.a>
          <span className="text-gray-600">/</span>
          <motion.a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group/link"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <ExternalLink size={18} className="group-hover/link:rotate-12 transition-transform" />
            <span className="text-sm font-medium">Live</span>
          </motion.a>
        </div>
      </div>

      {/* Visual Section - Placeholder for project image/screenshot */}
      <div
        className={`flex-1 relative ${
          isEven ? 'md:pl-8' : 'md:pr-8'
        } w-full md:w-auto`}
      >
        <motion.div
          className="relative aspect-video bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-lg overflow-hidden border border-[#3f5e96]/10"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#3f5e96]/0 via-[#3f5e96]/0 to-[#3f5e96]/0"
            animate={
              isHovered
                ? {
                    background: [
                      'linear-gradient(135deg, rgba(63,94,150,0) 0%, rgba(63,94,150,0) 100%)',
                      'linear-gradient(135deg, rgba(63,94,150,0.1) 0%, rgba(63,94,150,0.05) 100%)',
                      'linear-gradient(135deg, rgba(63,94,150,0) 0%, rgba(63,94,150,0) 100%)',
                    ],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Project preview placeholder - you can replace this with actual screenshots */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-[#3f5e96]/20 border border-[#3f5e96]/30 flex items-center justify-center">
                <ExternalLink className="text-[#3f5e96]" size={24} />
              </div>
              <p className="text-gray-500 text-sm font-mono">
                {project.title}
              </p>
            </div>
          </div>

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(63,94,150,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(63,94,150,0.1) 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className={`absolute top-1/2 ${
            isEven ? 'right-0 md:-right-4' : 'left-0 md:-left-4'
          } w-8 md:w-12 h-px bg-[#3f5e96]/30`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
        />
      </div>

      {/* Connecting line between cards (desktop only) */}
      {index < 2 && (
        <motion.div
          className="hidden md:block absolute left-12 top-full w-px h-24 bg-gradient-to-b from-[#3f5e96]/20 to-transparent"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
        />
      )}
    </motion.article>
  );
};

export default ProjectCard;

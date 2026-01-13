import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // <--- IMPORTANT: Import Link

const Button = memo(({
  children,
  primary = true,
  onClick,
  className = '',
  to,
  type = 'button',
  download = false,
  href = null,
  icon = null,
  size = 'md'
}) => {
  const baseStyles = "rounded-lg font-semibold transition-all flex items-center justify-center gap-2";

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  // Enhanced color schemes with better contrast
  const primaryStyles = "bg-[#3f5e96] text-white hover:bg-[#3f5e96]/90 border border-[#3f5e96]";
  const secondaryStyles = "bg-transparent border-2 border-[#3f5e96] text-white hover:bg-[#3f5e96] hover:text-white";

  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${primary ? primaryStyles : secondaryStyles} ${className}`;

  const buttonVariants = {
    hover: {
      scale: 1.03
    },
    tap: { scale: 0.97 }
  };

  // Determine which component to render based on props
  let Component = 'button'; // Default to a button
  const propsToPass = {
    onClick,
    className: buttonStyles,
    whileHover: "hover",
    whileTap: "tap",
    variants: buttonVariants,
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2 }
  };

  if (to) {
    Component = Link; // Render React Router's Link
    propsToPass.to = to; // Pass 'to' prop to Link
  } else if (href) {
    Component = 'a'; // Render a standard anchor tag
    propsToPass.href = href; // Pass 'href' prop to <a>
    if (download) {
      propsToPass.download = download; // Pass 'download' to <a> if specified
    }
    propsToPass.target = "_blank"; // Good practice for external links
    propsToPass.rel = "noopener noreferrer"; // Security for external links
  } else {
    propsToPass.type = type; // Pass 'type' to <button>
  }

  return (
    <motion.div
      className="inline-block" // Ensure motion.div doesn't break flex layout
      whileHover={{ scale: 1.03 }} // Apply hover animation to the wrapper
      whileTap={{ scale: 0.97 }} // Apply tap animation to the wrapper
    >
      <Component
        {...propsToPass} 
      >
        {icon && <span className="text-lg">{icon}</span>}
        {children}
      </Component>
    </motion.div>
  );
});

export default Button;
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { toggleTheme } from '../features/themeSlice';

const ThemeToggle = () => {
  const { darkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="p-2 rounded-full bg-white border border-gray-200 text-black transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      {darkMode ? (
        <FiSun className="text-black" size={20} />
      ) : (
        <FiMoon className="text-black" size={20} />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
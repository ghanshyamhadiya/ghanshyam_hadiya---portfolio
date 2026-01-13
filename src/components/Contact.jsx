import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, ArrowRight, Check, X, MessageSquare, Phone } from 'lucide-react';

const Button = memo(({ children, className, onClick, type, disabled }) => {
  return (
    <motion.button
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled}
      className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-[#3f5e96] text-white hover:bg-[#3f5e96]/90 border-2 border-[#3f5e96] shadow-lg hover:shadow-xl ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.05, y: -2 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {children}
    </motion.button>
  );
});

const StatusMessage = memo(({ status, message, onClose }) => {
  if (!status) return null;

  const isSuccess = status === 'success';
  const Icon = isSuccess ? Check : X;

  return (
    <motion.div
      className={`mt-4 bg-[#3f5e96]/20 border-2 ${
        isSuccess ? 'border-[#3f5e96]/50' : 'border-red-500/50'
      } rounded-xl p-4 flex items-center gap-3 relative shadow-md`}
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`${isSuccess ? 'bg-[#3f5e96]' : 'bg-red-500'} rounded-full p-1.5 flex-shrink-0`}>
        <Icon className="text-white" size={18} />
      </div>
      <p className={`${isSuccess ? 'text-white' : 'text-red-300'} text-sm font-semibold flex-1`}>
        {message}
      </p>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-white transition-colors"
      >
        <X size={18} />
      </button>
    </motion.div>
  );
});

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSubmitStatus(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to send your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus(null);
        setErrorMessage('');
      }, 5000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerChildren = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 md:py-28 bg-[#141e30] text-white font-inter overflow-hidden"
    >
      {/* Subtle background texture (shared with projects) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Get In Touch
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-[#3f5e96] mx-auto mb-8 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.p 
            className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            I'm excited to connect! Whether you have a project idea, a question, or
            just want to say hi, drop me a message, and I'll get back to you soon.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-[#1e293b]/90 backdrop-blur-xl border-2 border-[#3f5e96]/40 rounded-3xl shadow-2xl shadow-[#3f5e96]/10 p-8 sm:p-10 lg:p-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {/* Left Column: Send Message Form */}
          <motion.div className="space-y-6" variants={staggerChildren}>
            <motion.h3
              className="text-3xl sm:text-4xl font-bold text-white flex items-center gap-3"
              variants={fadeInUp}
            >
              <MessageSquare size={32} />
              Send a Message
            </motion.h3>

            <form ref={form} onSubmit={handleSubmit} className="space-y-5">
              <motion.div variants={fadeInUp}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-5 py-4 bg-[#0f172a] border-2 border-[#3f5e96]/40 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#3f5e96] focus:border-[#3f5e96] transition-all duration-300 placeholder-gray-500 text-base font-medium shadow-inner"
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-5 py-4 bg-[#0f172a] border-2 border-[#3f5e96]/40 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#3f5e96] focus:border-[#3f5e96] transition-all duration-300 placeholder-gray-500 text-base font-medium shadow-inner"
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className="w-full px-5 py-4 bg-[#0f172a] border-2 border-[#3f5e96]/40 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#3f5e96] focus:border-[#3f5e96] transition-all duration-300 placeholder-gray-500 text-base font-medium shadow-inner"
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows={6}
                  className="w-full px-5 py-4 bg-[#0f172a] border-2 border-[#3f5e96]/40 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#3f5e96] focus:border-[#3f5e96] transition-all duration-300 placeholder-gray-500 resize-none text-base font-medium shadow-inner"
                ></textarea>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <>
                      Send Message <Send className="ml-1 h-5 w-5" />
                    </>
                  )}
                </Button>
              </motion.div>
              <AnimatePresence>
                {submitStatus && (
                  <StatusMessage
                    status={submitStatus}
                    message={
                      errorMessage ||
                      (submitStatus === 'success'
                        ? "Your message has been sent! I'll get back to you soon."
                        : 'Something went wrong. Please try again.')
                    }
                    onClose={() => setSubmitStatus(null)}
                  />
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Right Column: Let's Connect */}
          <motion.div
            className="relative rounded-2xl flex flex-col items-center justify-center p-8 sm:p-10 lg:p-12 bg-[#3f5e96]/20 border-2 border-[#3f5e96]/30 shadow-lg"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3
              className="text-3xl sm:text-4xl font-bold text-white mb-6 flex items-center gap-3"
              variants={fadeInUp}
            >
              <Mail size={32} />
              Let's Connect
            </motion.h3>
            <motion.div 
              className="w-20 h-1 bg-[#3f5e96] mx-auto mb-8 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
            />
            <motion.p 
              className="text-white text-base sm:text-lg mb-10 max-w-md leading-relaxed text-center font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I'm available for freelance projects, full-time roles, or just a chat
              about tech. Reach out, and let's create something amazing together!
            </motion.p>

            <div className="space-y-4 w-full">
              <motion.a
                href="mailto:ghanshyamhadiya013@gmail.com"
                className="flex items-center justify-center gap-3 text-lg sm:text-xl text-white hover:text-[#3f5e96] transition-colors group p-4 rounded-xl hover:bg-[#3f5e96]/20 border-2 border-transparent hover:border-[#3f5e96]/30"
                variants={fadeInUp}
                whileHover={{ x: 5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail size={24} className="text-white group-hover:rotate-12 transition-transform" />
                <span className="font-semibold">ghanshyamhadiya013@gmail.com</span>
                <ArrowRight
                  size={20}
                  className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                />
              </motion.a>
            </div>

            <motion.div
              className="mt-12"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-full p-2 bg-black/10">
                <div className="bg-white rounded-full p-6 shadow-lg">
                  <motion.svg
                    className="w-12 h-12 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    animate={{
                      y: [0, -5, 0],
                      rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: 'loop'
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </motion.svg>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

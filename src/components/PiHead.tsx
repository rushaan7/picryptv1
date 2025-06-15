
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import MinimalLogo from './MinimalLogo';

export default function PiHead() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.8]);
  
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );

    const container = containerRef.current;
    if (container) {
      observer.observe(container);
      return () => observer.unobserve(container);
    }
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6"
      style={{ y, opacity }}
    >
      {/* Main Content Container */}
      <motion.div className="max-w-4xl mx-auto text-center space-y-16">
        {/* Logo */}
        <motion.div
          className="flex justify-center mb-16"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ 
            scale: isInView ? 1 : 0.95, 
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 20 
          }}
          transition={{ 
            duration: 1,
            ease: "easeOut"
          }}
        >
          <MinimalLogo size="lg" />
        </motion.div>

        {/* Main Heading */}
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.h1 
            className="text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-[0.9] text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Mathematical
            </motion.div>
            <motion.div
              className="font-light text-gray-300"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              Encryption
            </motion.div>
          </motion.h1>
        </motion.div>
        
        {/* Subtitle */}
        <motion.div 
          className="max-w-2xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.p 
            className="text-lg md:text-xl font-light leading-relaxed text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            Leveraging the infinite, non-repeating sequence of{' '}
            <motion.span 
              className="text-white font-normal"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              π
            </motion.span>
            {' '}to create unbreakable cryptographic systems.
          </motion.p>

          {/* Mathematical Expression */}
          <motion.div 
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center space-x-4 px-6 py-3 bg-white/[0.02] backdrop-blur-sm rounded-full border border-white/[0.05]"
              whileHover={{ 
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                borderColor: "rgba(255, 255, 255, 0.08)"
              }}
              transition={{ duration: 0.2 }}
            >
              <span className="font-mono text-lg text-white">π =</span>
              <span className="font-mono text-lg text-gray-300 tracking-wide">
                3.14159265358979...
              </span>
              <span className="text-xl text-gray-400">∞</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="pt-8"
        >
          <Link
            to="/explainer"
            className="group relative inline-flex items-center"
          >
            <motion.div
              className="px-8 py-4 text-base font-light bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-full relative overflow-hidden text-white"
              whileHover={{ 
                scale: 1.02,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderColor: "rgba(255, 255, 255, 0.12)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <span className="relative z-10 mr-3 tracking-wide">Explore the Mathematics</span>
              
              <motion.svg 
                className="w-4 h-4 relative z-10" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center cursor-pointer group"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs font-light mb-3 tracking-widest uppercase text-gray-500">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent">
            <motion.div
              className="w-px h-4 bg-white/40"
              animate={{ 
                y: [0, 32, 0], 
                opacity: [1, 0.2, 1] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

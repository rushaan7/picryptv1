
import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface PiCryptLayoutProps {
  children: React.ReactNode;
}

export default function PiCryptLayout({ children }: PiCryptLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Minimal Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-px bg-white/20 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main Grid */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Subtle Graph Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" preserveAspectRatio="none">
          <motion.path
            d="M0,400 Q400,200 800,300 T1600,250"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 4, delay: 1 }}
          />
          <motion.path
            d="M0,600 Q600,400 1200,500"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 5, delay: 1.5 }}
          />
        </svg>

        {/* Minimal Mathematical Symbols */}
        {['π', '∞', '∑'].map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-white/[0.02] font-light text-4xl pointer-events-none select-none"
            style={{
              left: `${20 + (i * 30)}%`,
              top: `${30 + (i * 20)}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.02, 0.01, 0.02]
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          delay: 0.2 
        }}
      >
        {children}
      </motion.div>

      {/* Minimal Corner Accents */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-0 left-0 w-20 h-20 border-l border-t border-white/[0.05]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-20 h-20 border-r border-b border-white/[0.05]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        />
      </div>
    </motion.div>
  );
}

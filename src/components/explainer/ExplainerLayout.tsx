
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ExplainerLayoutProps {
  children: ReactNode;
}

export default function ExplainerLayout({ children }: ExplainerLayoutProps) {
  return (
    <motion.div 
      className="min-h-screen bg-black relative overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Graph-like Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Subtle mathematical curves */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" preserveAspectRatio="none">
          <motion.path
            d="M0,300 Q200,100 400,200 T800,150 L800,0 L0,0 Z"
            fill="rgba(255, 255, 255, 0.01)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 1 }}
          />
          <motion.path
            d="M0,500 Q300,300 600,400 T1200,350"
            stroke="rgba(255, 255, 255, 0.03)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, delay: 1.5 }}
          />
        </svg>

        {/* Floating mathematical symbols */}
        {['π', '∞', '∑', '∫'].map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-white/[0.015] font-light text-6xl pointer-events-none select-none"
            style={{
              left: `${15 + (i * 25)}%`,
              top: `${20 + (i * 15)}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.015, 0.008, 0.015]
            }}
            transition={{
              duration: 15 + i * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 3
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Subtle corner accents */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-0 left-0 w-24 h-24 border-l border-t border-white/[0.03]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-24 h-24 border-r border-b border-white/[0.03]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
        />
      </div>
    </motion.div>
  );
}

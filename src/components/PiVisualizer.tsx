
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getPiDigits } from '@/utils/encryption';

interface PiVisualizerProps {
  isActive: boolean;
  highlightCount?: number;
}

export default function PiVisualizer({ isActive, highlightCount = 0 }: PiVisualizerProps) {
  const [piDigits] = useState(() => getPiDigits(200));
  const [visibleCount, setVisibleCount] = useState(50);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setVisibleCount(prev => Math.min(prev + 5, piDigits.length));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isActive, piDigits.length]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.02
      }
    }
  };

  const digitVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    },
    highlighted: {
      opacity: 1,
      scale: 1.2,
      color: '#4ade80',
      textShadow: '0 0 10px rgba(74, 222, 128, 0.5)',
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="mb-8 p-6 rounded-lg neumorphic-inset overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="flex items-center mb-4">
            <motion.div
              className="w-2 h-2 bg-pi-accent rounded-full mr-3"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <h3 className="text-pi-light/80 font-medium">
              π Digit Stream
            </h3>
          </div>

          <div className="font-mono text-sm leading-relaxed">
            <span className="text-pi-accent font-bold">π = </span>
            <motion.div 
              className="inline-block"
              layout
            >
              {piDigits.slice(0, visibleCount).map((digit, index) => (
                <motion.span
                  key={index}
                  className="inline-block mx-0.5"
                  variants={digitVariants}
                  animate={
                    index < highlightCount ? 'highlighted' : 'visible'
                  }
                  style={{
                    color: index < highlightCount ? '#4ade80' : '#e2e8f0'
                  }}
                >
                  {digit}
                </motion.span>
              ))}
              
              {/* Typing cursor */}
              {visibleCount < piDigits.length && (
                <motion.span
                  className="inline-block w-0.5 h-4 bg-pi-accent ml-1"
                  animate={{
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.div>
          </div>

          {/* Progress indicator */}
          <div className="mt-4 flex justify-between text-xs text-pi-light/50">
            <span>Digits revealed: {visibleCount}</span>
            <span>Using positions: {highlightCount > 0 ? `0-${highlightCount-1}` : 'None'}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

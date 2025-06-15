
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';
import { getPiDigits } from '@/utils/encryption';

interface PiDigitStreamOverlayProps {
  isActive: boolean;
  length: number;
}

export default function PiDigitStreamOverlay({ isActive, length }: PiDigitStreamOverlayProps) {
  const piDigits = useMemo(() => getPiDigits(50), []);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Flowing Pi Digits */}
          <div className="absolute inset-0">
            {piDigits.slice(0, length + 10).map((digit, index) => (
              <motion.div
                key={`${digit}-${index}`}
                className="absolute text-white/[0.15] font-mono text-4xl font-light"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -50,
                  opacity: 0,
                  scale: 0.5
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 50,
                  opacity: [0, 0.15, 0],
                  scale: [0.5, 1, 0.3]
                }}
                transition={{
                  duration: 3,
                  delay: index * 0.1,
                  ease: "linear"
                }}
              >
                {digit}
              </motion.div>
            ))}
          </div>

          {/* Flowing Lines */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

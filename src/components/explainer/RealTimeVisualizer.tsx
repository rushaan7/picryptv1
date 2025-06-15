
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';
import { getPiDigits } from '@/utils/encryption';
import CharacterBlock from './CharacterBlock';

interface RealTimeVisualizerProps {
  text: string;
  isAnimating: boolean;
}

export default function RealTimeVisualizer({ text, isAnimating }: RealTimeVisualizerProps) {
  const piDigits = useMemo(() => getPiDigits(100), []);

  return (
    <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-2xl p-8">
      <motion.h3 
        className="text-2xl font-light tracking-wide bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Character-by-Character Transformation
      </motion.h3>

      <div className="space-y-3 max-w-full overflow-x-auto">
        <AnimatePresence>
          {text.split('').map((char, index) => (
            <motion.div
              key={`${char}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <CharacterBlock
                char={char}
                piDigit={parseInt(piDigits[index] || '0')}
                index={index}
                isAnimating={isAnimating}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {text.length === 0 && (
        <motion.div
          className="text-center py-16 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-white/[0.02] border border-white/[0.05] rounded-full flex items-center justify-center text-2xl">
              π
            </div>
            <p className="font-light text-sm tracking-wide">
              Start typing to see the encryption in action...
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

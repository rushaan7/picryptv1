
import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface CharacterBlockProps {
  char: string;
  piDigit: number;
  index: number;
  isAnimating: boolean;
}

export default function CharacterBlock({ char, piDigit, index, isAnimating }: CharacterBlockProps) {
  const { original, encrypted, calculation } = useMemo(() => {
    const originalCode = char.charCodeAt(0);
    const encryptedCode = (originalCode + piDigit) % 65536;
    const encryptedChar = String.fromCharCode(encryptedCode);
    
    return {
      original: { char, code: originalCode },
      encrypted: { char: encryptedChar, code: encryptedCode },
      calculation: `${originalCode} + ${piDigit} = ${encryptedCode}`
    };
  }, [char, piDigit]);

  return (
    <motion.div
      className="flex items-center space-x-4 p-6 bg-white/[0.02] border border-white/[0.05] rounded-xl backdrop-blur-sm"
      animate={isAnimating ? { scale: [1, 1.02, 1] } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
    >
      {/* Position */}
      <div className="flex-shrink-0 w-12 h-12 bg-white/[0.03] border border-white/[0.08] rounded-lg flex items-center justify-center">
        <span className="text-white font-mono text-sm font-medium">{index}</span>
      </div>

      {/* Original Character */}
      <div className="text-center min-w-[80px]">
        <div className="text-2xl font-mono text-white mb-1">'{original.char}'</div>
        <div className="text-xs text-gray-400 font-light">ASCII: {original.code}</div>
      </div>

      {/* Pi Digit */}
      <div className="text-center min-w-[60px]">
        <div className="text-lg font-mono text-gray-300 mb-1">π[{index}]</div>
        <div className="text-2xl font-mono text-white font-bold">{piDigit}</div>
      </div>

      {/* Calculation */}
      <div className="flex-1 text-center">
        <motion.div
          className="font-mono text-gray-300 text-sm font-light"
          animate={isAnimating ? { color: ['#d1d5db', '#ffffff', '#d1d5db'] } : {}}
          transition={{ duration: 0.8, delay: index * 0.1 }}
        >
          {calculation}
        </motion.div>
      </div>

      {/* Arrow */}
      <div className="flex-shrink-0">
        <motion.div
          className="text-white text-2xl"
          animate={isAnimating ? { x: [0, 5, 0] } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          →
        </motion.div>
      </div>

      {/* Encrypted Character */}
      <div className="text-center min-w-[80px]">
        <motion.div
          className="text-2xl font-mono text-white mb-1"
          animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          '{encrypted.char}'
        </motion.div>
        <div className="text-xs text-gray-400 font-light">ASCII: {encrypted.code}</div>
      </div>
    </motion.div>
  );
}

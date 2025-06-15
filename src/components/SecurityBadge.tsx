
import { motion, AnimatePresence } from 'framer-motion';

interface SecurityBadgeProps {
  strength: number;
  processTime: number;
  isVisible: boolean;
}

export default function SecurityBadge({ strength, processTime, isVisible }: SecurityBadgeProps) {
  const getStrengthColor = (strength: number) => {
    if (strength >= 80) return '#4ade80'; // Green
    if (strength >= 60) return '#eab308'; // Yellow
    if (strength >= 40) return '#f97316'; // Orange
    return '#ef4444'; // Red
  };

  const getStrengthLabel = (strength: number) => {
    if (strength >= 80) return 'Very Strong';
    if (strength >= 60) return 'Strong';
    if (strength >= 40) return 'Moderate';
    return 'Weak';
  };

  const badgeVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${strength}%`,
      transition: {
        duration: 1,
        delay: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="p-6 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.05]"
          variants={badgeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-light text-lg tracking-wide">Encryption Strength</h4>
            <span 
              className="text-sm font-medium px-3 py-1 rounded-full border"
              style={{ 
                color: getStrengthColor(strength),
                borderColor: getStrengthColor(strength) + '40'
              }}
            >
              {getStrengthLabel(strength)}
            </span>
          </div>

          {/* Strength Bar */}
          <div className="relative h-2 bg-white/[0.05] rounded-full overflow-hidden mb-4">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{ backgroundColor: getStrengthColor(strength) }}
              variants={progressVariants}
              initial="hidden"
              animate="visible"
            />
            
            {/* Animated glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>

          {/* Stats */}
          <div className="flex justify-between text-sm text-gray-400 mb-4">
            <span className="font-light">Strength: {strength}/100</span>
            <span className="font-light">Processed in {processTime.toFixed(2)}ms</span>
          </div>

          {/* Security Features */}
          <div className="pt-4 border-t border-white/[0.05]">
            <div className="flex flex-wrap gap-2">
              {[
                'π-based cipher',
                'Client-side only',
                'No data transmission',
                'Mathematical encryption'
              ].map((feature, index) => (
                <motion.span
                  key={feature}
                  className="px-3 py-1 text-xs bg-white/[0.05] text-gray-300 rounded-full border border-white/[0.08] font-light"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {feature}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

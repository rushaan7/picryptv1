
import { motion } from 'framer-motion';

interface MinimalLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function MinimalLogo({ size = 'md', showText = true }: MinimalLogoProps) {
  const sizeClasses = {
    sm: { container: 'w-8 h-8', text: 'text-lg ml-2' },
    md: { container: 'w-12 h-12', text: 'text-xl ml-3' },
    lg: { container: 'w-16 h-16', text: 'text-3xl ml-4' }
  };

  return (
    <motion.div 
      className="flex items-center group cursor-pointer"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Clean Pi Symbol */}
      <motion.div
        className={`${sizeClasses[size].container} relative flex items-center justify-center`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 100 100"
          className="relative z-10"
        >
          {/* Perfect Pi Symbol */}
          <motion.g
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          >
            {/* Top horizontal line of π */}
            <motion.path
              d="M20 35 L80 35"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            
            {/* Left vertical line of π */}
            <motion.path
              d="M30 35 L30 75"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            />
            
            {/* Right vertical line of π */}
            <motion.path
              d="M70 35 L70 75"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            />
          </motion.g>

          {/* Subtle accent dot */}
          <motion.circle
            cx="85"
            cy="30"
            r="1"
            fill="rgba(255, 255, 255, 0.4)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 0.3, delay: 1.4 }}
          />
        </svg>
      </motion.div>

      {/* Clean Typography */}
      {showText && (
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.span
            className={`${sizeClasses[size].text} font-light tracking-wide text-white`}
          >
            PiCrypt
          </motion.span>
          
          {size === 'lg' && (
            <motion.span
              className="text-xs font-extralight tracking-widest mt-1 text-gray-400 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.4 }}
            >
              Mathematical Encryption
            </motion.span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

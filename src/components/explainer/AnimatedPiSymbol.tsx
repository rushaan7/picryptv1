
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function AnimatedPiSymbol() {
  const symbolRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (symbolRef.current) {
      gsap.to(symbolRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }
  }, []);

  return (
    <motion.div
      ref={symbolRef}
      className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-8"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, type: "spring", stiffness: 100 }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        className="drop-shadow-2xl"
      >
        {/* Outer glow ring */}
        <motion.circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="url(#piGradient)"
          strokeWidth="2"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        
        {/* Pi symbol */}
        <motion.path
          d="M50 80 L150 80 M75 80 L75 140 M125 80 Q140 100 140 120 Q140 140 125 140"
          stroke="url(#piGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        />
        
        {/* Floating digits */}
        {['3', '1', '4', '1', '5', '9'].map((digit, index) => (
          <motion.text
            key={index}
            x={100 + Math.cos((index * 60) * Math.PI / 180) * 70}
            y={100 + Math.sin((index * 60) * Math.PI / 180) * 70}
            fill="#80ffdb"
            className="text-2xl font-ibm-mono font-bold"
            textAnchor="middle"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ delay: 2 + index * 0.1 }}
          >
            {digit}
          </motion.text>
        ))}
        
        <defs>
          <linearGradient id="piGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5e60ce" />
            <stop offset="50%" stopColor="#80ffdb" />
            <stop offset="100%" stopColor="#5e60ce" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

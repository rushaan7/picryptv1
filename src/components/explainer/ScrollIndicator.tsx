
import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  return (
    <motion.div
      className="flex flex-col items-center text-gray-500"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <span className="text-sm font-light mb-3 tracking-widest uppercase">Scroll to explore</span>
      <motion.div
        className="w-6 h-10 border-2 border-white/[0.15] rounded-full flex justify-center"
        animate={{ borderColor: ['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.25)', 'rgba(255,255,255,0.15)'] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="w-1 h-3 bg-white/40 rounded-full mt-2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}

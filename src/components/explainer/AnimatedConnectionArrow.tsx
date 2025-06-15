
import { motion } from 'framer-motion';

interface AnimatedConnectionArrowProps {
  delay?: number;
}

export default function AnimatedConnectionArrow({ delay = 0 }: AnimatedConnectionArrowProps) {
  return (
    <div className="flex justify-center my-8">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
      >
        <motion.div
          className="w-1 h-12 bg-gradient-to-b from-academia-accent to-academia-highlight"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
          viewport={{ once: true }}
        />
        <motion.div
          className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-academia-highlight"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.4 }}
          viewport={{ once: true }}
        />
      </motion.div>
    </div>
  );
}

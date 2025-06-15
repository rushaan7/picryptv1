
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative py-16 px-6 mt-24"
    >
      {/* Gradient separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
      
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-6"
        >
          {/* Developer credit */}
          <div className="space-y-3">
            <p className="text-gray-600 text-sm font-light tracking-wider uppercase">
              Crafted with precision
            </p>
            <motion.h3
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-2xl font-light tracking-wide bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text text-transparent"
            >
              Developed by Rushan Khan
            </motion.h3>
          </div>

          {/* Decorative elements */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center justify-center space-x-4 mt-8"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-white/[0.2] to-transparent flex-1 max-w-32" />
            <div className="w-2 h-2 rounded-full bg-white/30" />
            <div className="h-px bg-gradient-to-r from-transparent via-white/[0.2] to-transparent flex-1 max-w-32" />
          </motion.div>

          {/* Mathematical signature */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-gray-600 font-mono text-xs tracking-widest mt-6"
          >
            π = 3.14159265358979323846...
          </motion.p>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-white/[0.02] to-transparent rounded-full blur-3xl" />
      </div>
    </motion.footer>
  );
}

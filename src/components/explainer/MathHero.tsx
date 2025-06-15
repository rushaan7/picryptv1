
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AnimatedPiSymbol from './AnimatedPiSymbol';
import ScrollIndicator from './ScrollIndicator';

export default function MathHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-8 left-8 z-10"
      >
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] rounded-full text-white font-light transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to PiCrypt
        </Link>
      </motion.div>

      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Animated Pi Symbol */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.68, -0.55, 0.265, 1.55] }}
          className="flex justify-center mb-12"
        >
          <AnimatedPiSymbol />
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-6xl md:text-8xl font-extralight tracking-tight leading-[0.9] bg-gradient-to-b from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            PiCrypt
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">
            Mathematical Encryption Using π
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Explore how the infinite, non-repeating digits of π create a unique approach to text encryption through mathematical chaos and deterministic randomness.
        </motion.p>

        {/* Mathematical Formula Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-2xl p-8 max-w-2xl mx-auto"
        >
          <div className="font-mono text-lg">
            <span className="text-gray-500">f(char) = </span>
            <span className="text-white">(ASCII</span>
            <span className="text-gray-500"> + </span>
            <span className="text-gray-300">π[i]</span>
            <span className="text-gray-500">) mod </span>
            <span className="text-white">65536</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
        <ScrollIndicator />
      </div>
    </section>
  );
}

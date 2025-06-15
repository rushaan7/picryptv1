
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import RealTimeVisualizer from './RealTimeVisualizer';

export default function InteractiveDemo() {
  const [inputText, setInputText] = useState('Hello');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleInputChange = (value: string) => {
    setInputText(value.slice(0, 20)); // Limit length for performance
    setIsAnimating(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [inputText]);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-950/50 to-black section-animate">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-extralight tracking-tight leading-tight bg-gradient-to-b from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-8">
            Live Encryption Demo
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
            Watch your text transform in real-time as π-digits flow through the encryption process
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Input Section */}
          <motion.div
            className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-2xl p-8 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <label className="block text-white font-light text-lg mb-4 tracking-wide">
              Enter text to encrypt (max 20 characters):
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full bg-black/80 border border-white/[0.15] rounded-lg px-4 py-3 text-white font-mono text-lg focus:border-white/[0.3] focus:outline-none transition-all duration-200 placeholder-gray-500"
              placeholder="Type something..."
            />
          </motion.div>

          {/* Real-time Visualizer */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <RealTimeVisualizer text={inputText} isAnimating={isAnimating} />
          </motion.div>

          {/* Usage Note */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 font-mono text-sm font-light">
              ⚠️ Educational purposes only - Do not misuse the encryption technique
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

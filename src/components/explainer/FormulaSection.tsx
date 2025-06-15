
import { motion } from 'framer-motion';
import { useState } from 'react';
import { getPiDigits } from '@/utils/encryption';

export default function FormulaSection() {
  const [selectedChar, setSelectedChar] = useState('A');
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const piDigits = getPiDigits(10);
  const charCode = selectedChar.charCodeAt(0);
  const piDigit = parseInt(piDigits[selectedIndex]);
  const result = (charCode + piDigit) % 65536;
  const resultChar = String.fromCharCode(result);

  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-950/50 section-animate">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-extralight tracking-tight leading-tight bg-gradient-to-b from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-8">
            Mathematical Foundation
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
            Understanding why π makes the perfect foundation for deterministic encryption
          </p>
        </motion.div>

        {/* Interactive Formula */}
        <motion.div
          className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-2xl p-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-light tracking-wide bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
              Pi-Based Cipher Formula
            </h3>
            
            <div className="font-mono text-2xl md:text-3xl text-white">
              <span>f(char) = (</span>
              <motion.span 
                className="text-gray-300 cursor-pointer px-2 py-1 rounded bg-white/[0.05] hover:bg-white/[0.08] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedChar(selectedChar === 'A' ? 'B' : 'A')}
              >
                {charCode}
              </motion.span>
              <span> + π[</span>
              <motion.span 
                className="text-gray-400 cursor-pointer px-2 py-1 rounded bg-white/[0.05] hover:bg-white/[0.08] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedIndex((selectedIndex + 1) % 10)}
              >
                {selectedIndex}
              </motion.span>
              <span>]) mod 65536</span>
            </div>
          </div>

          {/* Live Calculation */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div 
              className="text-center p-6 bg-white/[0.03] border border-white/[0.08] rounded-xl"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-4xl font-mono text-white mb-3">{selectedChar}</div>
              <div className="text-sm text-gray-500 mb-2">Character</div>
              <div className="text-lg font-mono text-gray-300">ASCII: {charCode}</div>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 bg-white/[0.03] border border-white/[0.08] rounded-xl"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-4xl font-mono text-gray-300 mb-3">{piDigit}</div>
              <div className="text-sm text-gray-500 mb-2">π Digit at position {selectedIndex}</div>
              <div className="text-xs font-mono text-gray-600">
                π = {piDigits.join('')}...
              </div>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 bg-white/[0.03] border border-white/[0.08] rounded-xl"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-4xl font-mono text-white mb-3">{resultChar}</div>
              <div className="text-sm text-gray-500 mb-2">Encrypted Result</div>
              <div className="text-lg font-mono text-gray-300">ASCII: {result}</div>
            </motion.div>
          </div>

          <motion.div
            className="text-center text-gray-600 text-sm font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Click on the highlighted values to see how different inputs affect the output
          </motion.div>
        </motion.div>

        {/* Why Pi? */}
        <motion.div
          className="mt-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-light tracking-wide bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-12 text-center">
            Why π is Perfect for Encryption
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white/[0.02] border border-white/[0.05] p-8 rounded-2xl"
              whileHover={{ scale: 1.01, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <h4 className="text-xl font-light text-white mb-6">
                Mathematical Properties
              </h4>
              <ul className="space-y-4 text-gray-400 font-light">
                <li>• <strong className="text-gray-300">Irrational:</strong> Never repeats or terminates</li>
                <li>• <strong className="text-gray-300">Normal:</strong> Each digit appears with equal frequency</li>
                <li>• <strong className="text-gray-300">Infinite:</strong> Provides unlimited keyspace</li>
                <li>• <strong className="text-gray-300">Deterministic:</strong> Same input always gives same output</li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="bg-white/[0.02] border border-white/[0.05] p-8 rounded-2xl"
              whileHover={{ scale: 1.01, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <h4 className="text-xl font-light text-white mb-6">
                Cryptographic Benefits
              </h4>
              <ul className="space-y-4 text-gray-400 font-light">
                <li>• <strong className="text-gray-300">No key exchange:</strong> π is universally known</li>
                <li>• <strong className="text-gray-300">Position-based:</strong> Context affects every character</li>
                <li>• <strong className="text-gray-300">Lightweight:</strong> Minimal computational overhead</li>
                <li>• <strong className="text-gray-300">Transparent:</strong> Algorithm is completely open</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

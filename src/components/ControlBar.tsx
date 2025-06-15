
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Unlock, Copy, Zap } from 'lucide-react';
import { useState } from 'react';

interface ControlBarProps {
  onEncrypt: () => void;
  onDecrypt: () => void;
  onCopy: () => void;
  isProcessing: boolean;
  hasContent: boolean;
  mode: 'encrypt' | 'decrypt';
  onModeChange: (mode: 'encrypt' | 'decrypt') => void;
}

export default function ControlBar({ 
  onEncrypt, 
  onDecrypt, 
  onCopy, 
  isProcessing, 
  hasContent, 
  mode, 
  onModeChange 
}: ControlBarProps) {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const handleProcess = () => {
    if (mode === 'encrypt') {
      onEncrypt();
    } else {
      onDecrypt();
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Clean Background */}
      <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.05]" />
      
      <div className="relative p-6">
        {/* Mode Selector */}
        <motion.div 
          className="flex items-center justify-center mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative bg-black/20 rounded-xl p-1 border border-white/[0.08]">
            <motion.div
              className="absolute top-1 bottom-1 w-1/2 bg-white/[0.08] rounded-lg backdrop-blur-sm"
              animate={{
                x: mode === 'encrypt' ? 0 : '100%'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            
            <div className="relative flex">
              <button
                onClick={() => onModeChange('encrypt')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors duration-300 ${
                  mode === 'encrypt' ? 'text-white' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span className="font-light">Encrypt</span>
              </button>
              
              <button
                onClick={() => onModeChange('decrypt')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors duration-300 ${
                  mode === 'decrypt' ? 'text-white' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Unlock className="w-4 h-4" />
                <span className="font-light">Decrypt</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-4">
          {/* Main Process Button */}
          <motion.button
            onClick={handleProcess}
            disabled={!hasContent || isProcessing}
            className={`group relative flex items-center space-x-3 px-8 py-4 rounded-xl font-light text-lg transition-all duration-300 ${
              hasContent && !isProcessing
                ? 'text-white bg-white/[0.08] border border-white/[0.12] hover:bg-white/[0.12] cursor-pointer'
                : 'text-gray-500 bg-white/[0.02] border border-white/[0.03] cursor-not-allowed'
            }`}
            whileHover={hasContent && !isProcessing ? { scale: 1.02, y: -1 } : {}}
            whileTap={hasContent && !isProcessing ? { scale: 0.98 } : {}}
          >
            {/* Processing Animation */}
            <AnimatePresence mode="wait">
              {isProcessing ? (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center space-x-3"
                >
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span>Processing...</span>
                </motion.div>
              ) : (
                <motion.div
                  key="static"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center space-x-3"
                >
                  {mode === 'encrypt' ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                  <span>{mode === 'encrypt' ? 'Encrypt Text' : 'Decrypt Text'}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Copy Button */}
          <motion.button
            onClick={onCopy}
            className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-gray-400 hover:text-white transition-all duration-300 border border-white/[0.05]"
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Copy className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Status Bar */}
        <motion.div
          className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-center space-x-6 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span className="font-light">Quantum-Safe</span>
          </div>
          
          <div className="w-px h-4 bg-white/[0.08]" />
          
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span className="font-light">Client-Side</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

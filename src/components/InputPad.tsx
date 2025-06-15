
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Copy, Check, FileText, Lock, Unlock } from 'lucide-react';

interface InputPadProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  isEncrypting?: boolean;
}

export default function InputPad({ 
  value, 
  onChange, 
  placeholder, 
  label, 
  isEncrypting = false 
}: InputPadProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [copied, setCopied] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const isReadOnly = onChange === (() => {});

  useEffect(() => {
    setCharCount(value.length);
  }, [value]);

  const handleCopy = async () => {
    if (value) {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getLabelIcon = () => {
    if (label.includes('Encrypted')) return <Lock className="w-4 h-4" />;
    if (label.includes('Decrypted') || label.includes('Plain')) return <Unlock className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      layout
    >
      {/* Clean Background */}
      <motion.div
        className="absolute inset-0 rounded-2xl transition-all duration-500 ease-out"
        style={{
          background: isFocused 
            ? 'rgba(255, 255, 255, 0.06)' 
            : 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(20px)',
          border: isFocused 
            ? '1px solid rgba(255, 255, 255, 0.12)' 
            : '1px solid rgba(255, 255, 255, 0.05)'
        }}
      />

      <div className="relative p-6">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-3">
            <motion.div
              className="p-2 rounded-lg bg-white/[0.05] text-white/70"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.08)"
              }}
              transition={{ duration: 0.2 }}
            >
              {getLabelIcon()}
            </motion.div>
            <div>
              <h3 className="text-white font-light text-lg tracking-wide">
                {label}
              </h3>
              <p className="text-gray-400 text-sm font-light mt-1">
                {isReadOnly ? 'Read-only output' : 'Enter your text'}
              </p>
            </div>
          </div>

          {/* Copy Button */}
          <AnimatePresence mode="wait">
            {value && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                onClick={handleCopy}
                className="p-2 rounded-lg bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="w-4 h-4 text-green-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0, rotate: 90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Copy className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Textarea */}
        <motion.div className="relative">
          <motion.textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            readOnly={isReadOnly}
            className="w-full h-40 bg-transparent text-white placeholder-gray-500 font-mono text-sm leading-relaxed resize-none focus:outline-none transition-all duration-300"
            animate={{
              scale: isFocused ? 1.005 : 1
            }}
            transition={{ duration: 0.2 }}
          />

          {/* Processing Overlay */}
          <AnimatePresence>
            {isEncrypting && (
              <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-3 text-white">
                  <motion.div
                    className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="font-light">Processing...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.05]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="font-mono font-light">
              {charCount} characters
            </span>
            
            <AnimatePresence>
              {charCount > 0 && (
                <motion.div
                  className="flex items-center space-x-2 text-gray-400"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="w-1.5 h-1.5 bg-green-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="font-light">Ready</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center space-x-2">
            <motion.div
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                isFocused ? 'bg-white' : 'bg-gray-600'
              }`}
              animate={{
                scale: isFocused ? [1, 1.1, 1] : 1
              }}
              transition={{ duration: 1, repeat: isFocused ? Infinity : 0 }}
            />
            <span className="text-xs text-gray-500 font-light tracking-wide uppercase">
              {isFocused ? 'Active' : 'Standby'}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

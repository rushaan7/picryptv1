
import { useState, useCallback } from 'react';
import { Toaster } from 'react-hot-toast';
import PiCryptLayout from '@/components/PiCryptLayout';
import PiHead from '@/components/PiHead';
import InputPad from '@/components/InputPad';
import ControlBar from '@/components/ControlBar';
import PiVisualizer from '@/components/PiVisualizer';
import SecurityBadge from '@/components/SecurityBadge';
import Footer from '@/components/explainer/Footer';
import { piEncrypt, piDecrypt, EncryptionResult, DecryptionResult } from '@/utils/encryption';
import { toast } from 'react-hot-toast';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResult, setLastResult] = useState<EncryptionResult | DecryptionResult | null>(null);
  const [showVisualizer, setShowVisualizer] = useState(false);

  const handleProcess = useCallback(async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to process');
      return;
    }

    setIsProcessing(true);
    setShowVisualizer(true);

    // Simulate processing delay for better UX
    await new Promise(resolve => setTimeout(resolve, 600));

    try {
      if (mode === 'encrypt') {
        const result = piEncrypt(inputText);
        setOutputText(result.encrypted);
        setLastResult(result);
        toast.success('Text encrypted successfully!');
      } else {
        const result = piDecrypt(inputText);
        if (result.success) {
          setOutputText(result.decrypted);
          setLastResult(result);
          toast.success('Text decrypted successfully!');
        } else {
          setOutputText('Decryption failed. Please check your input.');
          setLastResult(null);
          toast.error('Decryption failed. Please verify your encrypted text.');
        }
      }
    } catch (error) {
      console.error('Processing error:', error);
      setOutputText('An error occurred during processing.');
      setLastResult(null);
      toast.error('Processing failed. Please try again.');
    }

    setIsProcessing(false);
  }, [inputText, mode]);

  const handleCopy = useCallback(async () => {
    if (!outputText) {
      toast.error('No text to copy');
      return;
    }
    
    try {
      await navigator.clipboard.writeText(outputText);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  }, [outputText]);

  const handleModeChange = useCallback((newMode: 'encrypt' | 'decrypt') => {
    setMode(newMode);
    setOutputText('');
    setLastResult(null);
    setShowVisualizer(false);
  }, []);

  const isEncryptionResult = (result: any): result is EncryptionResult => {
    return result && typeof result.strength === 'number';
  };

  return (
    <PiCryptLayout>
      <PiHead />
      
      <div className="max-w-4xl mx-auto px-6 py-24 space-y-12">
        {/* Input Section */}
        <InputPad
          value={inputText}
          onChange={setInputText}
          placeholder={mode === 'encrypt' ? "Enter text to encrypt..." : "Enter encrypted text to decrypt..."}
          label={mode === 'encrypt' ? "Plain Text" : "Encrypted Text"}
          isEncrypting={isProcessing}
        />

        {/* Control Bar */}
        <ControlBar
          onEncrypt={handleProcess}
          onDecrypt={handleProcess}
          onCopy={handleCopy}
          isProcessing={isProcessing}
          hasContent={!!inputText.trim()}
          mode={mode}
          onModeChange={handleModeChange}
        />

        {/* Pi Visualizer */}
        <PiVisualizer 
          isActive={showVisualizer}
          highlightCount={inputText.length}
        />

        {/* Output Section */}
        {outputText && (
          <InputPad
            value={outputText}
            onChange={() => {}} // Read-only
            placeholder=""
            label={mode === 'encrypt' ? "Encrypted Text" : "Decrypted Text"}
          />
        )}

        {/* Security Badge */}
        {lastResult && isEncryptionResult(lastResult) && (
          <SecurityBadge
            strength={lastResult.strength}
            processTime={lastResult.processTime}
            isVisible={!!outputText}
          />
        )}
      </div>

      {/* Footer */}
      <Footer />

      {/* Toast Container */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(0, 0, 0, 0.9)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            fontSize: '14px',
            backdropFilter: 'blur(20px)'
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#000000',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#000000',
            },
          },
        }}
      />
    </PiCryptLayout>
  );
};

export default Index;

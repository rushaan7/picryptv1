
import { PI_DIGITS } from './piGenerator';

export interface EncryptionResult {
  encrypted: string;
  strength: number;
  processTime: number;
}

export interface DecryptionResult {
  decrypted: string;
  success: boolean;
  processTime: number;
}

// Encrypt text using pi-based cipher
export function piEncrypt(text: string): EncryptionResult {
  const startTime = performance.now();
  
  if (!text) {
    return {
      encrypted: '',
      strength: 0,
      processTime: 0
    };
  }

  const encrypted = text.split('').map((char, index) => {
    const charCode = char.charCodeAt(0);
    const piDigit = parseInt(PI_DIGITS[index % PI_DIGITS.length]);
    const encryptedCode = (charCode + piDigit) % 65536;
    return String.fromCharCode(encryptedCode);
  }).join('');

  const endTime = performance.now();
  const processTime = endTime - startTime;

  // Calculate encryption strength based on text length and character diversity
  const uniqueChars = new Set(text).size;
  const strength = Math.min(100, Math.floor((text.length * uniqueChars) / 10));

  return {
    encrypted,
    strength,
    processTime
  };
}

// Decrypt pi-encrypted text
export function piDecrypt(encryptedText: string): DecryptionResult {
  const startTime = performance.now();
  
  if (!encryptedText) {
    return {
      decrypted: '',
      success: false,
      processTime: 0
    };
  }

  try {
    const decrypted = encryptedText.split('').map((char, index) => {
      const encryptedCode = char.charCodeAt(0);
      const piDigit = parseInt(PI_DIGITS[index % PI_DIGITS.length]);
      const originalCode = (encryptedCode - piDigit + 65536) % 65536;
      return String.fromCharCode(originalCode);
    }).join('');

    const endTime = performance.now();
    const processTime = endTime - startTime;

    return {
      decrypted,
      success: true,
      processTime
    };
  } catch (error) {
    const endTime = performance.now();
    const processTime = endTime - startTime;

    return {
      decrypted: '',
      success: false,
      processTime
    };
  }
}

// Get pi digits for visualization
export function getPiDigits(count: number = 100): string[] {
  return PI_DIGITS.slice(0, count).split('');
}

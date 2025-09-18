import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PreLoginAnimationProps {
  onComplete?: () => void;
}

const PreLoginAnimation: React.FC<PreLoginAnimationProps> = ({ onComplete }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  
  const words = ['MODIBBO', 'ADAMA', 'UNIVERSITY'];
  const currentWord = words[currentWordIndex];
  
  useEffect(() => {
    if (currentWordIndex < words.length) {
      if (currentLetterIndex < currentWord.length) {
        const timer = setTimeout(() => {
          setCurrentLetterIndex(prev => prev + 1);
        }, 80);
        return () => clearTimeout(timer);
      } else {
        // Word complete, move to next word after a pause
        const timer = setTimeout(() => {
          if (currentWordIndex < words.length - 1) {
            setCurrentWordIndex(prev => prev + 1);
            setCurrentLetterIndex(0);
          } else {
            // All words complete, wait then finish
            setTimeout(() => {
              onComplete?.();
            }, 500);
          }
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [currentWordIndex, currentLetterIndex, currentWord.length, onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-mau-primary via-mau-secondary to-mau-dark flex items-center justify-center z-[-1]">
      <div className="text-center">
        {/* University Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-full shadow-2xl flex items-center justify-center p-3">
            <img 
              src="/MAU.jpg" 
              alt="MAU Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* Animated University Name */}
        <div className="space-y-4">
          {words.map((word, wordIndex) => (
            <div key={wordIndex} className="text-white text-3xl md:text-5xl font-bold tracking-wider">
              {word.split('').map((letter, letterIndex) => (
                <motion.span
                  key={`${wordIndex}-${letterIndex}`}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ 
                    opacity: wordIndex < currentWordIndex || 
                             (wordIndex === currentWordIndex && letterIndex < currentLetterIndex) ? 1 : 0,
                    y: wordIndex < currentWordIndex || 
                       (wordIndex === currentWordIndex && letterIndex < currentLetterIndex) ? 0 : -50
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  className="inline-block"
                >
                  {letter === ' ' ? (
                    '\u00A0'
                  ) : (
                    letter
                  )}
                </motion.span>
              ))}
            </div>
          ))}
        </div>

        {/* Motto */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: currentWordIndex >= words.length ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-mau-light text-lg mt-6"
        >
          Knowledge and Humanism
        </motion.p>

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8"
        >
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PreLoginAnimation;
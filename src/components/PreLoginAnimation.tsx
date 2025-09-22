import React from 'react';
import { motion } from 'framer-motion';

const PreLoginAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center"
      >
        <motion.div 
          className="w-32 h-32 mx-auto mb-6 bg-white rounded-full shadow-2xl flex items-center justify-center"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
        </motion.div>
        
        <motion.h1 
          className="text-white text-4xl font-bold tracking-wider mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          MAU Assistant
        </motion.h1>
        
        <motion.p 
          className="text-blue-100 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Loading your experience...
        </motion.p>
        
        <motion.div 
          className="mt-8 flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-white rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PreLoginAnimation;
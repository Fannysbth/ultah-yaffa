"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions } from '@/data/quizQuestions';
import { QuizItem } from '@/types';

interface QuizProps {
  onFinish: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ onFinish }) => {
  const [index, setIndex] = useState(0);
  const [hoveredOption, setHoveredOption] = useState<'a' | 'b' | null>(null);
  const current: QuizItem = quizQuestions[index];
  const progress = ((index + 1) / quizQuestions.length) * 100;

  const handleChoose = (choice: 'a' | 'b') => {
    if (index + 1 >= quizQuestions.length) {
      setTimeout(onFinish, 800);
    } else {
      setIndex(i => i + 1);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto"
    >
<div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl shadow-2xl p-6 md:p-10 border-2 border-red-200">
        {/* Header */}
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-red-600">Tes Kepribadian</h2>
            <motion.span 
              className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              {index + 1}/{quizQuestions.length}
            </motion.span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-red-100 rounded-full h-3 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-red-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <motion.p 
              className="text-xl md:text-2xl font-semibold text-gray-800 mb-8"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 0.5 }}
            >
              {current.question}
            </motion.p>

            {/* Options */}
            <div className="space-y-4">
              {(['a', 'b'] as const).map((option, idx) => (
                <motion.button
                  key={option}
                  onClick={() => handleChoose(option)}
                  onHoverStart={() => setHoveredOption(option)}
                  onHoverEnd={() => setHoveredOption(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.03, x: 10 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full text-left p-5 md:p-6 rounded-2xl border-2 transition-all duration-300 ${
                    hoveredOption === option 
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-red-500 shadow-lg' 
                      : 'bg-white text-gray-800 border-red-200 hover:border-red-400 shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                        hoveredOption === option 
                          ? 'bg-white text-red-500 border-white' 
                          : 'bg-red-100 text-red-500 border-red-300'
                      }`}
                      animate={hoveredOption === option ? { rotate: 360 } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {option.toUpperCase()}
                    </motion.div>
                    <span className="text-base md:text-lg font-medium">
                      {current[option]}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Decorative elements */}
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({length: quizQuestions.length}).map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full ${i <= index ? 'bg-red-500' : 'bg-red-200'}`}
              animate={i === index ? { scale: [1, 1.5, 1] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
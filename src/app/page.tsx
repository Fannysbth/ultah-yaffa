"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quiz } from '@/components/Quiz';
import { ScrollStory } from '@/components/ScrollStory';
import { Finale } from '@/components/Finale';

export default function BirthdayExperience() {
  const [stage, setStage] = useState<'quiz' | 'story' | 'finale'>('quiz');

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-red-100 py-6 px-4 md:px-6 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {stage === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Quiz onFinish={() => setStage('story')} />
          </motion.div>
        )}
        
        {stage === 'story' && (
          <motion.div
            key="story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ScrollStory onFinish={() => setStage('finale')} />
          </motion.div>
        )}
        
        {stage === 'finale' && (
          <motion.div
            key="finale"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Finale onFinish={() => setStage('story')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

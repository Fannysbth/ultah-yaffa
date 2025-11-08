"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Confetti = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, delay: number}>>([]);
  
  useEffect(() => {
    const newParticles = Array.from({length: 50}, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 bg-red-500 rounded-full"
          style={{ left: `${p.x}%`, top: '-10px' }}
          animate={{
            y: ['0vh', '100vh'],
            rotate: [0, 360],
            opacity: [1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
};
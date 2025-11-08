"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { scrollStoryData } from "@/data/scrollStoryData";

interface ScrollStoryProps {
  onFinish: () => void;
}

export const ScrollStory: React.FC<ScrollStoryProps> = ({ onFinish }) => {
  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowTransition(false), 4000); // durasi 4 detik
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-3xl mx-auto space-y-8 pb-20"
    >
      {showTransition ? (
        // 🎬 Bagian Transisi “Memproses hasil kepribadian kamu…”
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-pink-600 glitch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "mirror" }}
          >
            Memproses hasil kepribadian kamu…
          </motion.h2>

          <motion.p
            className="text-lg mt-6 text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1.5 }}
          >
            Tapi tunggu, kayaknya aku pernah liat kamu deh…
          </motion.p>
        </div>
      ) : (
        // ✨ Cerita Kita ✨
        <>
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            ✨Sedikit Cerita✨
          </motion.h2>

          {scrollStoryData.map((block, idx) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative"
            >
              <motion.div
                className="bg-gradient-to-br from-white to-red-50 rounded-3xl p-6 md:p-8 shadow-xl border-2 border-red-100"
                whileHover={{
                  scale: 1.02,
                  boxShadow:
                    "0 25px 50px -12px rgba(239, 68, 68, 0.25)",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {block.id}
                </motion.div>

                {block.title && (
                  <motion.h3
                    className="text-xl md:text-2xl font-bold text-red-600 mb-4"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {block.title}
                  </motion.h3>
                )}

                <motion.p
                  className="text-gray-700 text-base md:text-lg leading-relaxed"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {block.text}
                </motion.p>

                <motion.div
                  className="absolute bottom-2 right-2 text-red-200 text-4xl"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ❤️
                </motion.div>
              </motion.div>
            </motion.div>
          ))}

          <motion.div
            className="flex justify-center pt-8"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={onFinish}
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-lg font-bold rounded-full shadow-2xl"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 20px 40px rgba(239, 68, 68, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Lanjut ke Kejutan 🎁
            </motion.button>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

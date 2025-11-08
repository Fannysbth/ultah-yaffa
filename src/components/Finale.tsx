"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Confetti } from '@/components/Confetti';
import { Gallery } from '@/components/Gallery';

interface FinaleProps {
  onFinish: () => void;
}

export const Finale: React.FC<FinaleProps> = ({ onFinish }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [clickedStars, setClickedStars] = useState<number[]>([]);
  const [selectedStar, setSelectedStar] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Scroll ke atas dan mulai musik
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setShowMessage(true), 500);

    // Coba autoplay musik
    if (audioRef.current) {
      const playMusic = async () => {
        try {
          await audioRef.current!.play();
        } catch (err) {
          console.log("Autoplay diblokir, user perlu interaksi dulu:", err);
        }
      };
      playMusic();
    }
  }, []);

  const starMessages = [
    "Semoga kau hari ini bahagia ✨",
    "Tahun ini penuh kesuksesan 🌟",
    "Tetap jadi diri sendiri yang keren 💫",
    "Sehat selalu ya! 🌈",
    "Makin cantik ⭐",
    "Semoga impianmu tercapai 💝",
    "Cepat wisuda 🔥",
    "Lebih sayang keluarga dan orang tua 🎉",
    "Dapat pasangan hidup satu untuk selamanya 💖",
    "Banyak berkah datang 🕊️",
    "Semoga selalu dikelilingi cinta 💐",
    "Makin dewasa, makin bahagia 🌸",
    "Jangan takut gagal 💪",
    "Terus bersinar seperti bintang 🌠",
    "Lebih taat agama dan sayang Tuhan Yesus🌷",
    "Hidupmu penuh warna 🌈",
    "Makin pintar 🫶",
    "Dapat NILAI terbaik 💖",
    "Selamat 21 tahun yang luar biasa 🎂",
    "Teman terbaik! 🤗",
    "Love you! Jangan lupa tetap sayang sama Fanny ya 💕"
  ];

  const handleStarClick = (i: number) => {
    if (!clickedStars.includes(i)) {
      setClickedStars([...clickedStars, i]);
    }
    setSelectedStar(i);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 pb-20">
      <Confetti />

      {/* Audio otomatis */}
      <audio ref={audioRef} loop autoPlay>
        <source src="/music/lagu2.mp3" type="audio/mpeg" />
      </audio>

      {/* Card utama */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 1 }}
        className="bg-gradient-to-br from-red-500 via-pink-500 to-red-600 rounded-3xl p-8 md:p-12 shadow-2xl text-white relative overflow-hidden"
      >
        {/* Pola latar belakang animasi */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />

        {/* Isi kartu */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative z-10"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 text-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎂 Happy Birthday! 🎂
          </motion.h1>
          <motion.h2
            className="text-3xl md:text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            🥳TYSA YAFFA SEREMILKA SIMBOLON🥳
          </motion.h2>

          {showMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="space-y-4 text-center text-lg md:text-xl"
            >
              <motion.p initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
                21 tahun bukan waktu yang sebentar.
              </motion.p>
              <motion.p initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.9 }}>
                Terima kasih sudah jalan sejauh ini,
              </motion.p>
              <motion.p initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.1 }}>
                dan tetaplah berjalan,
              </motion.p>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.3, type: "spring" }}
                className="text-2xl md:text-3xl font-bold mt-6"
              >
                💜 karena ada banyak kejutan yang menunggumu 💜
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      <Gallery />

      {/* Bintang */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-2 border-red-200"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-red-600 mb-6 text-center">
          🌟 Harapanku Untukmu 🌟
        </h3>
        <p className="text-center text-gray-600 mb-6">
          Tiup Lilinnya agar harapanmu TERWUJUD!
        </p>

        <div className="grid grid-cols-5 gap-3 md:gap-4">
          {Array.from({ length: 21 }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => handleStarClick(i)}
              className={`aspect-square rounded-xl flex items-center justify-center text-3xl md:text-4xl transition-all ${
                clickedStars.includes(i)
                  ? 'bg-gradient-to-br from-red-500 to-pink-500 shadow-lg'
                  : 'bg-gradient-to-br from-red-100 to-pink-100 hover:from-red-200 hover:to-pink-200'
              }`}
              whileHover={{ scale: 1.2, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              animate={
                clickedStars.includes(i)
                  ? { rotate: [0, 360], scale: [1, 1.2, 1] }
                  : {}
              }
              transition={{ duration: 0.5 }}
            >
            🕯️
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {selectedStar !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              className="mt-6 p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border-2 border-red-200"
            >
              <p className="text-lg md:text-xl text-gray-800 text-center font-medium">
                {starMessages[selectedStar]}
              </p>
              <motion.button
                onClick={() => setSelectedStar(null)}
                className="mt-4 mx-auto block px-6 py-2 bg-red-500 text-white rounded-full text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Tutup
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tombol Back */}
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
                     ← Back
                  </motion.button>
    </div>
  );
};

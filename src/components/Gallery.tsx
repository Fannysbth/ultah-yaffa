"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { photos } from '@/data/photos';

export const Gallery: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setActivePhoto((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = photos.length - 1;
      if (next >= photos.length) next = 0;
      return next;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-gradient-to-br from-white to-red-50 rounded-3xl p-6 md:p-8 shadow-xl border-2 border-red-200"
    >
      <h3 className="text-2xl md:text-3xl font-bold text-red-600 mb-6 text-center flex items-center justify-center gap-2">
        📸 Memori Kita 📸
      </h3>

      <div className="relative">
        {/* Foto utama */}
        <div className="relative h-96 md:h-[480px] bg-black rounded-2xl overflow-hidden mb-4 flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activePhoto}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) paginate(1);
                else if (swipe > swipeConfidenceThreshold) paginate(-1);
              }}
              className="absolute w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
            >
              {/* Gambar utama */}
              <motion.img
                src={photos[activePhoto].src}
                alt={photos[activePhoto].caption}
                className="object-contain w-full h-full bg-black"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              />

              {/* Overlay teks */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 md:p-6 rounded-b-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="text-lg md:text-2xl font-bold mb-1">
                  {photos[activePhoto].caption}
                </h4>
                <p className="text-sm md:text-base">
                  {photos[activePhoto].description}
                </p>
                <p className="text-xs text-gray-300 mt-2">
                  💡 Geser kiri/kanan untuk lihat foto lain
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Tombol navigasi */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-red-500 text-xl md:text-2xl font-bold shadow-lg hover:scale-110 transition-all z-10"
          >
            ‹
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-red-500 text-xl md:text-2xl font-bold shadow-lg hover:scale-110 transition-all z-10"
          >
            ›
          </button>
        </div>

        {/* Thumbnail */}
        <div className="flex gap-2 md:gap-3 justify-center overflow-x-auto pb-2">
          {photos.map((photo, i) => (
            <motion.button
              key={photo.id}
              onClick={() => {
                setDirection(i > activePhoto ? 1 : -1);
                setActivePhoto(i);
              }}
              className={`flex-shrink-0 w-16 h-20 md:w-20 md:h-28 rounded-xl border-2 overflow-hidden transition-all ${
                i === activePhoto
                  ? 'ring-4 ring-red-500 border-red-500 scale-110'
                  : 'border-red-200 hover:border-red-400'
              } bg-black`}
              whileHover={{ scale: i === activePhoto ? 1.1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="object-contain w-full h-full"
              />
            </motion.button>
          ))}
        </div>

        {/* Counter */}
        <div className="text-center mt-4 text-sm text-gray-500">
          Foto {activePhoto + 1} dari {photos.length}
        </div>
      </div>
    </motion.div>
  );
};

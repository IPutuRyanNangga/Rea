'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight, ChevronLeft, Pause, Play, Sparkles, BookOpen, ArrowLeft, RefreshCw } from 'lucide-react';

export default function PremiumMemoryBook() {
  const [step, setStep] = useState('intro'); 
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const bookPages = [
    {
      id: 0,
      type: 'cover',
      title: "Luangkan Waktu Sebentar Yaaa",
      subtitle: "Maaf aku ga bisa romantis",
    },
    {
      id: 1,
      type: 'content',
      image: "/foto1.jpeg",
      date: "Pertemuan Pertama",
      text: "Awal pertemuan kita di gunung nebula (jujur aku lupa nama gunungnya). dari yang awalnya ku kira cuman seorang random biasa, sampai sekarang aku sesayang ini. itu jadi momen yang selalu ku ingat, apalagi ketika salah kirim chat wkwkwkwk",
    },
    {
      id: 2,
      type: 'content',
      image: "/foto2.jpeg",
      date: "Entitas Imut",
      text: "Kata-kata entitas imut menjadi kata yang sering kmu bilang di awal sampai sekarang. dan itu jadi candaan yang selalu ku ingat",
    },
    {
      id: 3,
      type: 'content',
      image: "/foto3.jpeg",
      date: "Awal Mabar",
      text: "Ini adalah momen dimana awal kita saling mengenal. awalnya aku kira kamu random biasa yang bertahan sebentar, tapi ternyata kamu adalah seseorang yang sangat spesial. aku senang bisa mengenalmu dan berbagi banyak momen seru bersama.",
    },
    {
      id: 4,
      type: 'content',
      image: "/foto4.jpeg",
      date: "Momen",
      text: "Singkat cerita, kita sudah dekat dan ada banyak masalah yang muncul. tapi aku selalu suka caramu mengatasi masalahnya, dan jujur aku sangat kagum dengan hal itu",
    },
    {
      id: 5,
      type: 'content',
      image: "/foto5.jpeg",
      date: "Sekarang",
      text: "Sekarang aku masih ga nyangka, rasa sayang yang dulu cuman sekecil molekul bisa bertambah terus dengan drastis. Intinya aku sayang sama kmu, Love U Rea Mawardyn",
      hasForm: true, 
    }
  ];

  const handleEnter = () => {
    setStep('book');
    if (audioRef.current && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleExit = () => {
    setStep('intro');
  };

  const handleFinish = () => {
    setStep('outro');
  };

  const handleRestart = () => {
    setStep('intro');
    setCurrentPage(0);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const paginate = (newDirection: number) => {
    if (
      (newDirection === 1 && currentPage < bookPages.length - 1) ||
      (newDirection === -1 && currentPage > 0)
    ) {
      setDirection(newDirection);
      setCurrentPage((prev) => prev + newDirection);
    }
  };

  const pageVariants = {
    initial: (dir: number) => ({
      rotateY: dir === 1 ? 90 : -90,
      opacity: 0,
      z: -500,
      scale: 0.9,
    }),
    animate: {
      rotateY: 0,
      opacity: 1,
      z: 0,
      scale: 1,
      transition: { duration: 0.8, type: "spring", stiffness: 60, damping: 15 }
    },
    exit: (dir: number) => ({
      rotateY: dir === 1 ? -90 : 90,
      opacity: 0,
      z: -500,
      scale: 0.9,
      transition: { duration: 0.5, ease: "easeInOut" }
    })
  };

  const bgStars = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5,
  }));

  const bgHearts = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    x: Math.random() * 100,
    duration: Math.random() * 15 + 15,
    delay: Math.random() * 10,
  }));

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden relative font-sans md:cursor-default">
      
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[100] hidden md:flex items-center justify-center mix-blend-screen"
        animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div className="absolute w-full h-full bg-rose-500 rounded-full blur-[10px] opacity-40" />
        <Heart size={16} className="text-rose-300 drop-shadow-[0_0_8px_rgba(244,63,94,1)]" fill="currentColor" />
      </motion.div>

      <audio ref={audioRef} loop src="/lagu.mp3" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] bg-rose-800/20 rounded-full mix-blend-screen filter blur-[150px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }} 
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute top-[20%] -right-[20%] w-[70vw] h-[70vw] bg-violet-800/20 rounded-full mix-blend-screen filter blur-[150px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.35, 0.15] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] bg-fuchsia-800/20 rounded-full mix-blend-screen filter blur-[120px]" 
        />

        {bgStars.map((star) => (
          <motion.div
            key={`star-${star.id}`}
            className="absolute bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            style={{ width: star.size, height: star.size, top: `${star.y}%`, left: `${star.x}%` }}
            animate={{ opacity: [0.1, 1, 0.1], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: star.duration, repeat: Infinity, delay: star.delay, ease: "easeInOut" }}
          />
        ))}

        {bgHearts.map((heart) => (
          <motion.div
            key={`heart-${heart.id}`}
            className="absolute text-rose-500/20"
            initial={{ bottom: "-10%", left: `${heart.x}%`, opacity: 0, rotate: 0 }}
            animate={{ 
              bottom: "110%", 
              opacity: [0, 0.6, 0.6, 0],
              rotate: 360,
              x: [0, Math.random() * 50 - 25, 0]
            }}
            transition={{ duration: heart.duration, repeat: Infinity, delay: heart.delay, ease: "linear" }}
          >
            <Heart size={heart.size} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        
        {step === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="z-10 flex flex-col items-center justify-center text-center max-w-lg"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8 relative"
            >
              <div className="absolute inset-0 bg-rose-500 rounded-full blur-2xl opacity-40 animate-pulse" />
              <Heart className="text-rose-400 relative z-10 drop-shadow-[0_0_20px_rgba(244,63,94,0.6)]" size={100} fill="currentColor" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-serif text-white font-bold mb-4 tracking-wide drop-shadow-lg">
              Teruntuk 
            </h1>
            <h1 className="text-4xl md:text-5xl font-serif text-white font-bold mb-4 tracking-wide drop-shadow-lg">
              Rea Mawardyn yang Aku Sayang
            </h1>
            <p className="text-rose-200/80 text-lg md:text-xl mb-12 font-light tracking-wide">
              Aku ga tau harus bilang apa. yang jelas aku sayang
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEnter}
              className="cursor-pointer group relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-white font-medium text-lg shadow-[0_0_30px_rgba(244,63,94,0.3)] hover:shadow-[0_0_50px_rgba(244,63,94,0.6)] transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 w-0 bg-gradient-to-r from-rose-500 to-violet-500 transition-all duration-500 ease-out group-hover:w-full z-0" />
              <span className="relative z-10 flex items-center gap-3">
                <BookOpen size={22} className="group-hover:animate-bounce" />
                Buka Buku
              </span>
            </motion.button>
          </motion.div>
        )}

        {step === 'book' && (
          <motion.div
            key="book-section"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100, scale: 0.8, rotateX: 20 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full flex flex-col items-center z-10 relative"
          >
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              onClick={handleExit}
              className="absolute top-0 left-2 sm:left-6 sm:top-6 z-50 flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white/70 shadow-lg hover:text-white hover:bg-white/10 hover:border-white/30 transition-all group cursor-pointer"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium tracking-wide text-sm">Tutup</span>
            </motion.button>

            <div className="absolute top-0 right-2 sm:top-6 sm:right-6 z-50">
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                onClick={toggleMusic}
                className="flex items-center gap-3 px-4 py-2 sm:px-5 sm:py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white shadow-xl hover:bg-white/20 transition-all group cursor-pointer"
              >
                <div className="relative flex items-center justify-center">
                  {isPlaying ? <Pause size={20} className="text-rose-400" /> : <Play size={20} className="text-white ml-1" />}
                  {isPlaying && (
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-0 bg-rose-400 rounded-full blur-md -z-10" />
                  )}
                </div>
                <span className="font-medium tracking-wide text-sm hidden sm:block">
                  {isPlaying ? 'Memutar Memori' : 'Putar Lagu'}
                </span>
              </motion.button>
            </div>

            <div className="w-full max-w-5xl relative perspective-[2000px] flex justify-center mt-20 sm:mt-10">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full max-w-md lg:max-w-4xl bg-[#faf8f5] rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),inset_5px_0_20px_rgba(0,0,0,0.05)] border-l-[12px] border-[#6b4c3a] overflow-hidden min-h-[500px] sm:min-h-[600px] flex flex-col relative"
                >
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] opacity-40 mix-blend-multiply pointer-events-none z-20" />

                  {bookPages[currentPage].type === 'cover' ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-16 text-center border-[6px] border-double border-[#d4c5b9] m-4 sm:m-6 rounded-lg relative z-10 bg-gradient-to-br from-[#faf8f5] to-[#f0eadd]">
                      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                        <Heart className="text-rose-500 mb-8 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]" size={80} fill="currentColor" />
                      </motion.div>
                      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-[#3d3329] font-bold mb-6 tracking-tight leading-tight">
                        {bookPages[currentPage].title}
                      </h1>
                      <p className="text-lg lg:text-2xl text-[#8b7a6b] italic font-light tracking-wide px-4">
                        {bookPages[currentPage].subtitle}
                      </p>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col lg:flex-row h-full relative z-10 overflow-y-auto overflow-x-hidden">
                      <div className="w-full lg:w-1/2 p-6 lg:p-12 flex items-center justify-center bg-[#f2ebd9] border-b lg:border-b-0 lg:border-r border-[#d4c5b9] relative overflow-hidden min-h-[300px]">
                        <motion.div 
                          whileHover={{ scale: 1.05, rotate: -2 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="bg-white p-4 pb-10 lg:pb-16 shadow-2xl rounded-sm transform rotate-1 border border-gray-200 w-full max-w-[250px] sm:max-w-[300px] lg:max-w-[350px] cursor-pointer"
                        >
                          <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                            <img src={bookPages[currentPage].image} alt="Kenangan" className="w-full h-full object-cover object-center" />
                          </div>
                          <p className="text-center mt-4 lg:mt-6 font-serif text-gray-600 italic text-base lg:text-xl border-b border-gray-200/50 inline-block w-full">
                            ~ {bookPages[currentPage].date} ~
                          </p>
                        </motion.div>
                      </div>
                      
                      <div className="w-full lg:w-1/2 p-6 lg:p-14 flex flex-col justify-center bg-gradient-to-br from-[#faf8f5] to-[#f4eee4]">
                        <div className="flex items-center gap-3 mb-4 lg:mb-6">
                          <Sparkles className="text-rose-400" size={24} />
                          <h2 className="text-2xl lg:text-4xl font-serif text-[#3d3329] font-bold">
                            {bookPages[currentPage].date}
                          </h2>
                        </div>
                        
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.8 }}
                          className="w-full"
                        >
                          <p className="leading-relaxed text-[#5a4f45] text-base lg:text-xl font-medium mb-6">
                            {bookPages[currentPage].text}
                          </p>

                          {bookPages[currentPage].hasForm && (
                            <form 
                              action="https://formspree.io/f/xpqylqlb" 
                              method="POST" 
                              className="mt-6 flex flex-col gap-3 w-full"
                            >
                              <textarea 
                                name="pesan_dari_kesayangan" 
                                placeholder="Jika kmu mau balas, tulis di sini aja ya sayang" 
                                className="w-full p-4 rounded-xl bg-white/60 border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white transition-all text-[#5a4f45] placeholder:text-[#a89f91] resize-none" 
                                rows={4} 
                                required
                              ></textarea>
                              <button 
                                type="submit" 
                                className="self-end bg-rose-400 text-white px-6 py-2.5 rounded-full font-medium shadow-[0_4px_15px_rgba(244,63,94,0.3)] hover:bg-rose-500 hover:shadow-[0_6px_20px_rgba(244,63,94,0.5)] hover:-translate-y-1 transition-all"
                              >
                                Kirim Pesan ❤️
                              </button>
                            </form>
                          )}

                        </motion.div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-4 sm:gap-8 mt-6 sm:mt-10 mb-8 sm:mb-0">
              <button 
                onClick={() => paginate(-1)}
                disabled={currentPage === 0}
                className={`group flex items-center justify-center p-3 sm:p-4 rounded-full transition-all duration-300 ${
                  currentPage === 0 
                    ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5' 
                    : 'bg-white/10 text-white hover:bg-white/20 hover:scale-110 backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(244,63,94,0.4)] cursor-pointer'
                }`}
              >
                <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform sm:w-7 sm:h-7" />
              </button>
              
              <div className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-inner">
                {bookPages.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
                      currentPage === idx ? 'w-6 sm:w-8 bg-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.8)]' : 'w-1.5 sm:w-2 bg-white/30'
                    }`}
                  />
                ))}
              </div>

              {currentPage === bookPages.length - 1 ? (
                <button 
                  onClick={handleFinish}
                  className="group flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-all duration-300 bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:scale-105 backdrop-blur-xl shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:shadow-[0_0_30px_rgba(244,63,94,0.6)] cursor-pointer font-medium"
                >
                  <span className="flex items-center gap-2">
                    Selesai <Heart size={18} fill="currentColor" className="group-hover:animate-ping absolute right-4 opacity-50" />
                    <Heart size={18} fill="currentColor" className="relative z-10" />
                  </span>
                </button>
              ) : (
                <button 
                  onClick={() => paginate(1)}
                  className="group flex items-center justify-center p-3 sm:p-4 rounded-full transition-all duration-300 bg-white/10 text-white hover:bg-white/20 hover:scale-110 backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(244,63,94,0.4)] cursor-pointer"
                >
                  <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform sm:w-7 sm:h-7" />
                </button>
              )}
            </div>
          </motion.div>
        )}

        {step === 'outro' && (
          <motion.div
            key="outro"
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }} 
            className="z-50 flex flex-col items-center justify-center text-center absolute inset-0 m-auto h-screen"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="mb-6 relative"
            >
              <div className="absolute inset-0 bg-rose-500 rounded-full blur-[40px] opacity-60 animate-pulse" />
              <Heart className="text-rose-500 relative z-10 drop-shadow-[0_0_30px_rgba(244,63,94,0.8)]" size={120} fill="currentColor" />
            </motion.div>

            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-6xl md:text-8xl font-serif text-white font-bold mb-4 tracking-widest drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            >
              I Love U
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1.5 }}
              className="text-rose-200/80 text-xl md:text-3xl mb-12 font-light tracking-widest italic"
            >
              Sekali lagi, maaf aku ga bisa romantis hehehe
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRestart}
              className="cursor-pointer group flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
              Baca Sekali Lagi
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
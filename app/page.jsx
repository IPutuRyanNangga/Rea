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
  
  const audioRef = useRef(null);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const bookPages = [
    {
      id: 0,
      type: 'cover',
      title: "Luangkan Waktu Sebentar Yaaa ✨",
      subtitle: "Maaf aku ga bisa romantis.. 🥺👉👈",
    },
    {
      id: 1,
      type: 'content',
      image: "/foto1.jpeg",
      date: "Pertemuan Pertama 🏔️",
      text: "Awal pertemuan kita di gunung nebula (jujur aku lupa nama gunungnya 😅). Dari yang awalnya ku kira cuman seorang random biasa, sampai sekarang aku sesayang ini ❤️. Itu jadi momen yang selalu ku ingat, apalagi ketika salah kirim chat wkwkwkwk 🤣",
    },
    {
      id: 2,
      type: 'content',
      image: "/foto2.jpeg",
      date: "Entitas Imut 🧸",
      text: "Kata-kata 'entitas imut' menjadi kata yang sering kamu bilang di awal sampai sekarang 🥰. Dan itu jadi candaan yang selalu ku ingat setiap kali melihatmu ✨",
    },
    {
      id: 3,
      type: 'content',
      image: "/foto3.jpeg",
      date: "Awal Mabar 🎮",
      text: "Ini adalah momen dimana awal kita saling mengenal lebih dekat 🤝. Awalnya aku kira kamu random biasa yang bertahan sebentar, tapi ternyata kamu adalah seseorang yang sangat spesial 🌟. Aku senang bisa mengenalmu dan berbagi banyak momen seru bersama! 🥳",
    },
    {
      id: 4,
      type: 'content',
      image: "/foto4.jpeg",
      date: "Momen 🌈",
      text: "Singkat cerita, kita sudah dekat dan ada banyak masalah yang muncul 🌊. Tapi aku selalu suka caramu mengatasi masalahnya, dan jujur aku sangat kagum dengan hal itu.. kamu hebat banget! 👑",
    },
    {
      id: 5,
      type: 'content',
      image: "/foto5.jpeg",
      date: "Sekarang 💖",
      text: "Sekarang aku masih ga nyangka, rasa sayang yang dulu cuman sekecil molekul ⚛️ bisa bertambah terus dengan drastis 📈. Intinya aku sayang banget sama kmu, Love U Rea Mawardyn! 💘🌹",
      hasForm: true, 
    }
  ];

  const handleEnter = () => {
    setStep('book');
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleExit = () => setStep('intro');
  const handleFinish = () => setStep('outro');
  const handleRestart = () => {
    setStep('intro');
    setCurrentPage(0);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const paginate = (newDirection) => {
    if ((newDirection === 1 && currentPage < bookPages.length - 1) || (newDirection === -1 && currentPage > 0)) {
      setDirection(newDirection);
      setCurrentPage((prev) => prev + newDirection);
    }
  };

  const pageVariants = {
    initial: (dir) => ({ rotateY: dir === 1 ? 90 : -90, opacity: 0, z: -500, scale: 0.9 }),
    animate: { rotateY: 0, opacity: 1, z: 0, scale: 1, transition: { duration: 0.8, type: "spring", stiffness: 60, damping: 15 } },
    exit: (dir) => ({ rotateY: dir === 1 ? -90 : 90, opacity: 0, z: -500, scale: 0.9, transition: { duration: 0.5, ease: "easeInOut" } })
  };

  // --- KOMPONEN EFEK LATAR BELAKANG KOMPLEKS ---
  const BackgroundEffects = () => {
    // Membuat data statis agar tidak re-render terus menerus
    const stars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 3 + 2
    }));

    const floatingHearts = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      size: Math.random() * 20 + 15,
      x: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 20
    }));

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#050505]">
        {/* 1. Dynamic Nebulas (Cahaya Aurora) */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3] 
          }} 
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] bg-rose-900/30 rounded-full mix-blend-screen filter blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 30, 0],
            opacity: [0.2, 0.4, 0.2] 
          }} 
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute top-[20%] -right-[15%] w-[80vw] h-[80vw] bg-violet-900/20 rounded-full mix-blend-screen filter blur-[150px]" 
        />
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1] 
          }} 
          transition={{ duration: 10, repeat: Infinity }} 
          className="absolute bottom-0 left-[20%] w-[50vw] h-[50vw] bg-fuchsia-900/20 rounded-full mix-blend-screen filter blur-[100px]" 
        />

        {/* 2. Twinkling Stars */}
        {stars.map((star) => (
          <motion.div
            key={`star-${star.id}`}
            className="absolute bg-white rounded-full shadow-[0_0_5px_white]"
            style={{ 
              width: star.size, 
              height: star.size, 
              top: `${star.y}%`, 
              left: `${star.x}%` 
            }}
            animate={{ 
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1] 
            }}
            transition={{ 
              duration: star.duration, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}

        {/* 3. Floating 3D Hearts */}
        {floatingHearts.map((heart) => (
          <motion.div
            key={`heart-${heart.id}`}
            className="absolute text-rose-500/10"
            initial={{ bottom: "-10%", left: `${heart.x}%`, opacity: 0, rotate: 0 }}
            animate={{ 
              bottom: "110%", 
              opacity: [0, 0.7, 0.7, 0],
              rotate: 360,
              x: [0, 50, -50, 0]
            }}
            transition={{ 
              duration: heart.duration, 
              repeat: Infinity, 
              delay: heart.delay, 
              ease: "linear" 
            }}
          >
            <Heart size={heart.size} fill="currentColor" />
          </motion.div>
        ))}

        {/* 4. Mouse Follow Glow (Interactive Dust) */}
        <motion.div
          className="absolute w-96 h-96 bg-rose-500/10 rounded-full filter blur-[80px]"
          animate={{ 
            x: mousePosition.x - 192, 
            y: mousePosition.y - 192 
          }}
          transition={{ type: "spring", damping: 30, stiffness: 50 }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden relative font-sans md:cursor-default text-white">
      
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[100] hidden md:flex items-center justify-center mix-blend-screen"
        animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div className="absolute w-full h-full bg-rose-500 rounded-full blur-[10px] opacity-40" />
        <Heart size={16} className="text-rose-300" fill="currentColor" />
      </motion.div>

      <audio ref={audioRef} loop src="/lagu.mp3" />

      {/* Render Latar Belakang Baru */}
      <BackgroundEffects />

      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div key="intro" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} className="z-10 flex flex-col items-center text-center max-w-lg">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }} className="mb-8 relative">
              <div className="absolute inset-0 bg-rose-500 rounded-full blur-2xl opacity-40 animate-pulse" />
              <Heart className="text-rose-400 relative z-10" size={100} fill="currentColor" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Teruntuk Rea Mawardyn 🌹</h1>
            <p className="text-rose-200/80 text-lg mb-12 italic px-4">Aku ga tau harus bilang apa.. yang jelas aku sayang ❤️</p>
            <button onClick={handleEnter} className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full font-medium text-lg shadow-xl hover:bg-white/20 transition-all flex items-center gap-3 active:scale-95">
              <BookOpen size={22} /> Buka Buku Kenangan 📖
            </button>
          </motion.div>
        )}

        {step === 'book' && (
          <motion.div key="book-section" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100, scale: 0.8 }} transition={{ duration: 0.8 }} className="w-full flex flex-col items-center z-10 relative">
            <button onClick={handleExit} className="absolute top-0 left-2 sm:left-6 sm:top-6 text-white/70 flex items-center gap-2 hover:text-white transition-all bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm"><ArrowLeft size={18}/> Tutup 🚪</button>
            
            <button onClick={toggleMusic} className="absolute top-0 right-2 sm:top-6 sm:right-6 bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all flex items-center gap-2 backdrop-blur-sm">
              {isPlaying ? <Pause size={20}/> : <Play size={20}/>} <span>{isPlaying ? 'Mute' : 'Play'}</span>
            </button>

            <div className="w-full max-w-5xl relative perspective-[2000px] flex justify-center mt-20 sm:mt-10">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div key={currentPage} custom={direction} variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-md lg:max-w-4xl bg-[#faf8f5] rounded-xl shadow-2xl border-l-[12px] border-[#6b4c3a] overflow-hidden min-h-[500px] sm:min-h-[600px] flex flex-col relative text-[#3d3329]">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] opacity-40 mix-blend-multiply pointer-events-none" />
                  
                  {bookPages[currentPage].type === 'cover' ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#faf8f5] to-[#f0eadd]">
                      <Heart className="text-rose-500 mb-8" size={80} fill="currentColor" />
                      <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-6 leading-tight">{bookPages[currentPage].title}</h1>
                      <p className="text-xl italic text-[#8b7a6b]">{bookPages[currentPage].subtitle}</p>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col lg:flex-row h-full overflow-y-auto">
                      <div className="w-full lg:w-1/2 p-6 flex items-center justify-center bg-[#f2ebd9]">
                        <div className="bg-white p-4 shadow-2xl rounded-sm transform rotate-1 w-full max-w-[300px]">
                          <img src={bookPages[currentPage].image} alt="Kenangan" className="w-full aspect-square object-cover bg-gray-200" />
                          <p className="text-center mt-4 font-serif text-gray-600 italic text-sm">~ {bookPages[currentPage].date} ~</p>
                        </div>
                      </div>
                      <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
                        <h2 className="text-2xl lg:text-4xl font-serif font-bold mb-6 text-rose-600">{bookPages[currentPage].date}</h2>
                        <p className="leading-relaxed text-lg font-medium text-[#5a4f45]">{bookPages[currentPage].text}</p>
                        {bookPages[currentPage].hasForm && (
                          <form action="https://formspree.io/f/xpqylqlb" method="POST" className="mt-8 flex flex-col gap-3">
                            <textarea name="pesan" placeholder="Tulis balasan di sini ya sayang... 💌" className="w-full p-4 rounded-xl border border-rose-200 bg-white/50 focus:bg-white focus:outline-rose-400 transition-all text-[#5a4f45] resize-none" rows={4} required />
                            <button type="submit" className="bg-rose-500 text-white py-3 rounded-full font-bold shadow-lg hover:bg-rose-600 transition-all active:scale-95">Kirim Pesan ❤️</button>
                          </form>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-8 mt-10 mb-10">
              <button onClick={() => paginate(-1)} disabled={currentPage === 0} className="p-4 rounded-full bg-white/10 disabled:opacity-20 transition-all hover:bg-white/20"><ChevronLeft size={28}/></button>
              <div className="flex gap-2">
                {bookPages.map((_, i) => (
                  <div key={i} className={`h-2 w-2 rounded-full transition-all duration-300 ${currentPage === i ? 'w-6 bg-rose-500' : 'bg-white/30'}`} />
                ))}
              </div>
              {currentPage === bookPages.length - 1 ? (
                <button onClick={handleFinish} className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full font-bold shadow-lg hover:scale-105 transition-all active:scale-95">Selesai ❤️</button>
              ) : (
                <button onClick={() => paginate(1)} className="p-4 rounded-full bg-white/10 transition-all hover:bg-white/20"><ChevronRight size={28}/></button>
              )}
            </div>
          </motion.div>
        )}

        {step === 'outro' && (
          <motion.div key="outro" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="z-50 flex flex-col items-center text-center">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Heart className="text-rose-500 mb-6 drop-shadow-[0_0_20px_rgba(244,63,94,0.5)]" size={120} fill="currentColor" />
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-serif font-bold mb-4 drop-shadow-2xl">I Love U ❤️</h1>
            <p className="text-rose-200/80 text-xl italic mb-12">Sekali lagi, maaf aku ga bisa romantis hehehe ✌️😁</p>
            <button onClick={handleRestart} className="flex items-center gap-2 text-white/50 hover:text-white transition-all bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-sm"><RefreshCw size={18}/> Baca Sekali Lagi 🔄</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
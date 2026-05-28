"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
    },
  },
};

const slide3ContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const slide3ItemVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const cyclingWords = ["tech leaders", "innovators", "developers", "creatives", "builders"];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const scrollToSectionInHero = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const totalFrames = 113; // new_000.webp to new_112.webp

  // Cycle words for the logo slide text
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % cyclingWords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Preload all frames inside useEffect to keep it clean and SSR-safe
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    // Formatter to pad frame index, e.g., 003 or 074
    const formatIndex = (index: number) => {
      return String(index).padStart(3, "0");
    };

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      // Load static WebP frames directly from the public folder
      img.src = `/hands/new_${formatIndex(i)}.webp?v=1`;
      img.onload = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / totalFrames) * 100));

        if (loadedCount === totalFrames) {
          setImages(loadedImages);
          setLoading(false);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  // Setup GSAP Canvas scroll sequence and text fades
  useEffect(() => {
    if (loading || images.length === 0) return;

    // Standard registration inside hook ensures window presence
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fit canvas resolution to actual device size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      drawFrame(Math.round(sequence.frame));
    };

    // Responsive Object-Fit Cover drawing algorithm
    const drawFrame = (index: number) => {
      const img = images[index];
      if (!img) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.width;
      const imgHeight = img.height;

      const ratioX = canvasWidth / imgWidth;
      const ratioY = canvasHeight / imgHeight;
      const ratio = Math.max(ratioX, ratioY);

      const newWidth = imgWidth * ratio;
      const newHeight = imgHeight * ratio;
      const x = (canvasWidth - newWidth) / 2;
      const y = (canvasHeight - newHeight) / 2;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, x, y, newWidth, newHeight);
    };

    // Track active frames dynamically
    const sequence = { frame: 0 };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    let isAutoScrolling = false;

    // Master scrubbing ScrollTrigger timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          if (isAutoScrolling) return;

          const p = self.progress;
          const dir = self.direction; // 1 = down, -1 = up

          const p11 = (11 / 78) * 0.5;
          const p40 = (40 / 78) * 0.5;

          if (dir === 1 && p >= p11 && p < p40) {
            isAutoScrolling = true;
            const startScroll = self.start;
            const endScroll = self.end;
            const targetScroll = startScroll + p40 * (endScroll - startScroll);

            window.scrollTo({
              top: targetScroll,
              behavior: "smooth"
            });

            setTimeout(() => {
              isAutoScrolling = false;
            }, 1000);
          }
        }
      },
    });

    // 1. Scrub canvas frames from 0 to 78, then reverse back to 0
    tl.to(sequence, {
      frame: 78,
      snap: "frame",
      ease: "none",
      duration: 5,
      onUpdate: () => {
        drawFrame(Math.round(sequence.frame));
      },
    }, 0);

    tl.to(sequence, {
      frame: 0,
      snap: "frame",
      ease: "none",
      duration: 5,
      onUpdate: () => {
        drawFrame(Math.round(sequence.frame));
      },
    }, 5);

    // 2. Slide 1 (Welcome): starts fully visible on load, fades out between 0.5s and 2.0s of timeline progress
    tl.to(".text-slide-1",
      { opacity: 0, y: -45, duration: 1.5, ease: "power1.inOut" },
      0.5
    );


    // 3. Slide 2 (Connect): enters at 3.8s, peaks, exits at 6.3s
    tl.fromTo(".text-slide-3",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power1.out" },
      3.8
    );
    tl.to(".text-slide-3",
      { opacity: 0, y: -30, duration: 0.7, ease: "power1.in" },
      6.3
    );

    // 4. Slide 3 (Logo Reveal Climax): enters at 6.8s and stays static until the end
    tl.fromTo(".logo-slide",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1.0, duration: 1.5, ease: "power2.out" },
      6.8
    );

    // 5. Fade out background blobs from 5s to 10s (reversing timeline progress)
    tl.to(".bg-blob", {
      opacity: 0,
      duration: 5,
      ease: "power1.inOut"
    }, 5);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [loading, images]);

  return (
    <div ref={containerRef} className="relative w-full h-[350vh] bg-black">

      {/* 1. Loader screen (Pre-caching states) */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black font-mono select-none">
          <div className="flex flex-col items-start gap-4 p-8 border border-white/10 max-w-sm w-full relative">
            {/* Tech Corner Accents */}
            <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/50"></span>
            <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/50"></span>
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/50"></span>
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/50"></span>

            <div className="flex justify-between w-full text-[10px] uppercase tracking-widest text-white/50">
              <span>Syncing Frames</span>
              <span>{progress}%</span>
            </div>

            {/* Flat high-tech loading meter */}
            <div className="w-full h-1.5 bg-white/5 overflow-hidden">
              <div
                className="h-full bg-emerald-400 transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <span className="text-[9px] uppercase tracking-widest text-white/30">
              LOADING DEV COMMUNITY HANDS SEQUENCES
            </span>
          </div>
        </div>
      )}

      {/* 2. Sticky Canvas Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Animated Green Gradient Blobs */}
        <div className="bg-blob absolute top-[15%] left-[15%] w-[35vw] h-[35vw] rounded-full bg-emerald-500/15 blur-[100px] animate-blob-float pointer-events-none z-0" />
        <div className="bg-blob absolute bottom-[15%] right-[15%] w-[40vw] h-[40vw] rounded-full bg-teal-500/10 blur-[130px] animate-blob-float-reverse pointer-events-none z-0" />

        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover pointer-events-none relative z-20"
        />

        {/* Subtle grid mesh overlay for futuristic high-tech styling */}
        <div className="absolute inset-0 z-30 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] opacity-40 pointer-events-none"></div>

        {/* Ambient Dark Vignette overlay */}
        <div className="absolute inset-0 z-30 bg-gradient-to-t from-black via-transparent to-black opacity-90 pointer-events-none"></div>

        {/* 3. Sleek Monospace Overlaid Text Panels */}
        <div className="absolute inset-0 z-10 flex items-center justify-center p-6 text-center select-none pointer-events-none font-mono">

          {/* Panel 1 */}
          <div className="text-slide-1 absolute inset-0 w-full h-full opacity-100 flex flex-col items-center justify-center gap-3" style={{ willChange: "transform, opacity" }}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-3"
            >
              <h1 className="flex flex-col items-center leading-none text-center gap-1.5 sm:gap-3 font-sans">
                <span className="overflow-hidden inline-block py-1">
                  <motion.span
                    variants={itemVariants}
                    className="text-xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-wider text-emerald-400 font-mono block"
                  >Welcome to</motion.span>
                </span>
                <span className="overflow-hidden inline-block py-1">
                  <motion.span
                    variants={itemVariants}
                    className="text-4xl sm:text-6xl lg:text-8xl font-black uppercase tracking-tight text-white block"
                  >DEV COMMUNITY</motion.span>
                </span>
              </h1>
              <span className="overflow-hidden inline-block py-1">
                <motion.p
                  variants={itemVariants}
                  className="text-[11px] sm:text-xs text-white/80 max-w-md uppercase tracking-wider mt-2 block"
                >Kalyani Government Engineering College</motion.p>
              </span>
            </motion.div>

            {/* Lower Thirds Container */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="hero-lower-third absolute bottom-12 left-10 right-10 hidden md:flex justify-between items-end pointer-events-none z-30 font-mono text-left w-[calc(100%-5rem)]"
            >
              {/* Bottom Left */}
              <div className="flex flex-col gap-1.5 max-w-md">
                <span className="overflow-hidden inline-block py-0.5">
                  <motion.span 
                    variants={itemVariants}
                    className="text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-semibold block"
                  >KGEC Developer Relations</motion.span>
                </span>
                <span className="overflow-hidden inline-block py-0.5">
                  <motion.h3 
                    variants={itemVariants}
                    className="text-xs font-medium text-white/90 leading-normal uppercase tracking-wider block"
                  >Bridging the gap between learning and production for a smarter, more connected community</motion.h3>
                </span>
              </div>

              {/* Bottom Right */}
              <motion.div 
                variants={itemVariants} 
                className="flex items-center gap-2"
              >
                <span className="px-4 py-1.5 text-[9px] uppercase tracking-widest text-white/90 border border-white/10 rounded-full bg-black/40 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.02)]">Development</span>
                <div className="w-4 h-[1px] bg-white/20"></div>
                <span className="px-4 py-1.5 text-[9px] uppercase tracking-widest text-white/90 border border-white/10 rounded-full bg-black/40 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.02)]">Open Source</span>
                <div className="w-4 h-[1px] bg-white/20"></div>
                <span className="px-4 py-1.5 text-[9px] uppercase tracking-widest text-white/90 border border-white/10 rounded-full bg-black/40 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.02)]">Innovation</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Panel 3 - Promoting Connect to Phase 2 */}
          <div className="text-slide-3 absolute opacity-0 flex flex-col items-center gap-3" style={{ willChange: "transform, opacity" }}>
            <motion.div
              variants={slide3ContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="flex flex-col items-center gap-3"
            >
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white max-w-3xl leading-none font-sans flex flex-wrap justify-center gap-x-3 sm:gap-x-4">
                <span className="overflow-hidden inline-block py-1">
                  <motion.span variants={slide3ItemVariants} className="block">Build.</motion.span>
                </span>
                <span className="overflow-hidden inline-block py-1">
                  <motion.span variants={slide3ItemVariants} className="block text-emerald-400">Learn.</motion.span>
                </span>
                <span className="overflow-hidden inline-block py-1">
                  <motion.span variants={slide3ItemVariants} className="block">Collaborate.</motion.span>
                </span>
              </h2>
              <span className="overflow-hidden inline-block py-1">
                <motion.p
                  variants={slide3ItemVariants}
                  className="text-[11px] sm:text-xs text-white/80 max-w-2xl uppercase tracking-wider mt-2 leading-relaxed text-center max-w-xl block"
                >A student-driven developer community at Kalyani Government Engineering College focused on technology, innovation, open source, Web3, AI, and real-world development.</motion.p>
              </span>
            </motion.div>
          </div>

          {/* Centered Logo Reveal (Phase 3 - Climax reveal at the end of scroll track) */}
          <div className="logo-slide absolute opacity-0 scale-50 z-20 flex flex-col items-center gap-5 pointer-events-none" style={{ willChange: "transform, opacity" }}>
            <img
              src="/logo.jpg"
              alt="Dev Community KGEC Logo"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-emerald-500/20 shadow-[0_0_80px_rgba(16,185,129,0.1)]"
            />
            <div className="flex flex-col items-center">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-white/80 border border-white/10 px-2 py-0.5 rounded-sm bg-black/40 backdrop-blur-sm">
                Dev Community KGEC
              </span>
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-widest text-white mt-3 text-center leading-tight max-w-none font-sans flex items-center justify-center gap-x-2 flex-wrap">
                <span>Empowering future</span>
                <span className="relative inline-flex h-[1.2em] overflow-hidden text-emerald-400">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={cyclingWords[currentWordIndex]}
                      initial={{ y: "80%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-80%", opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="block font-bold whitespace-nowrap"
                    >
                      {cyclingWords[currentWordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h2>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-4 pointer-events-auto">
              <a
                href="#contact"
                onClick={scrollToSectionInHero}
                className="px-8 py-3.5 bg-emerald-500 text-black hover:bg-emerald-400 font-bold uppercase tracking-[0.2em] text-xs sm:text-sm rounded-sm transition-all duration-300 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:scale-105 block"
              >
                Join Community
              </a>
              <a
                href="#events"
                onClick={scrollToSectionInHero}
                className="px-8 py-3.5 bg-transparent text-white border border-emerald-500/30 hover:border-emerald-400 font-bold uppercase tracking-[0.2em] text-xs sm:text-sm rounded-sm transition-all duration-300 hover:scale-105 block"
              >
                Explore Events
              </a>
            </div>
          </div>

        </div>


      </div>

    </div>
  );
}

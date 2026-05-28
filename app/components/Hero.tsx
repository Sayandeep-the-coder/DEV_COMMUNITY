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

  const [isMobile, setIsMobile] = useState<boolean | null>(null);

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

  // Detect mobile viewport on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Cycle words for the logo slide text
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % cyclingWords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Preload all frames inside useEffect to keep it clean and SSR-safe
  useEffect(() => {
    if (isMobile === null) return;

    let active = true;
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];
    const framesCount = isMobile ? 267 : 113;

    // Formatter to pad frame index, e.g., 003 or 074
    const formatIndex = (index: number) => {
      return String(index).padStart(3, "0");
    };

    setLoading(true);
    setProgress(0);

    // Failsafe timeout: if assets take too long to load (e.g. over LAN/Wi-Fi), proceed anyway
    const failsafeTimeout = setTimeout(() => {
      if (active) {
        console.warn("Preloading timed out. Forcing load completion.");
        setImages(loadedImages);
        setLoading(false);
      }
    }, 8000);

    for (let i = 0; i < framesCount; i++) {
      const img = new Image();
      const frameNum = isMobile ? i + 1 : i;
      const path = isMobile
        ? `/hands_mobile/frame_${formatIndex(frameNum)}.webp?v=1`
        : `/hands/new_${formatIndex(frameNum)}.webp?v=1`;

      // Set handlers BEFORE assigning .src to avoid race conditions with cached images
      img.onload = () => {
        if (!active) return;
        loadedCount++;
        setProgress(Math.round((loadedCount / framesCount) * 100));

        if (loadedCount === framesCount) {
          clearTimeout(failsafeTimeout);
          setImages(loadedImages);
          setLoading(false);
        }
      };

      img.onerror = () => {
        if (!active) return;
        loadedCount++;
        setProgress(Math.round((loadedCount / framesCount) * 100));

        if (loadedCount === framesCount) {
          clearTimeout(failsafeTimeout);
          setImages(loadedImages);
          setLoading(false);
        }
      };

      img.src = path;
      loadedImages.push(img);
    }

    return () => {
      active = false;
      clearTimeout(failsafeTimeout);
    };
  }, [isMobile]);

  // Setup GSAP Canvas scroll sequence and text fades
  useEffect(() => {
    if (isMobile === null) return;
    if (loading || images.length === 0) return;

    // Standard registration inside hook ensures window presence
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Responsive Object-Fit Cover drawing algorithm
    const drawFrame = (index: number, scaleFactor: number = 1, yOffset: number = 0) => {
      const img = images[Math.max(0, Math.min(index, images.length - 1))];
      if (!img) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.width;
      const imgHeight = img.height;

      const ratioX = canvasWidth / imgWidth;
      const ratioY = canvasHeight / imgHeight;
      const ratio = Math.max(ratioX, ratioY) * scaleFactor;

      const newWidth = imgWidth * ratio;
      const newHeight = imgHeight * ratio;
      const x = (canvasWidth - newWidth) / 2;
      const y = (canvasHeight - newHeight) / 2 + yOffset;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, x, y, newWidth, newHeight);
    };

    // Fit canvas resolution to actual device size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      
      const progress = isMobile ? sequence.frame / 266 : 0;
      const currentScale = isMobile ? (0.85 + progress * 0.25) : 1.0;
      const currentYOffset = isMobile ? (canvas.height * 0.08) : 0;
      
      drawFrame(Math.round(sequence.frame), currentScale, currentYOffset);
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

    if (isMobile) {
      // 1. Scrub canvas frames from 0 to 266 (frame_001 to frame_267) linearly across the entire scroll track
      tl.to(sequence, {
        frame: 266,
        snap: "frame",
        ease: "none",
        duration: 10,
        onUpdate: () => {
          const progress = sequence.frame / 266;
          const currentScale = 0.85 + progress * 0.25; // Scale from 0.85 (start) to 1.1 (end) as we scroll
          const currentYOffset = canvas.height * 0.08; // Shift hands down by 8% of canvas height to point more to the button
          drawFrame(Math.round(sequence.frame), currentScale, currentYOffset);
        },
      }, 0);
    } else {
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
    }

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

    // 4. Slide 3 (Logo Reveal Climax): enters at 6.6s and stays static until the end
    tl.fromTo(".logo-slide",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1.0, duration: 1.8, ease: "power1.inOut" },
      6.6
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
  }, [loading, images, isMobile]);

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

      {/* 2. Sticky Canvas/Video Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Animated Green Gradient Blobs */}
        <div className="bg-blob absolute top-[22%] left-[8%] w-[65vw] h-[65vw] md:w-[35vw] md:h-[35vw] rounded-full bg-emerald-500/25 md:bg-emerald-500/15 blur-[60px] md:blur-[100px] animate-blob-float pointer-events-none z-0" />
        <div className="bg-blob absolute bottom-[22%] right-[8%] w-[75vw] h-[75vw] md:w-[40vw] md:h-[40vw] rounded-full bg-teal-500/15 md:bg-teal-500/10 blur-[80px] md:blur-[130px] animate-blob-float-reverse pointer-events-none z-0" />

        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover pointer-events-none relative z-20"
          style={{ mixBlendMode: "screen" }}
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
              <h1 className="flex flex-col items-center leading-none text-center gap-2 sm:gap-3 font-sans">
                <span className="overflow-hidden inline-block py-1">
                  <motion.span
                    variants={itemVariants}
                    className="text-sm sm:text-lg lg:text-4xl font-extrabold uppercase tracking-widest text-emerald-400 font-mono block"
                  >Welcome to</motion.span>
                </span>
                <span className="overflow-hidden inline-block py-1">
                  <motion.span
                    variants={itemVariants}
                    className="text-[9.5vw] sm:text-6xl lg:text-8xl font-black uppercase tracking-tight text-white block"
                    style={{ letterSpacing: "-0.03em" }}
                  >DEV COMMUNITY</motion.span>
                </span>
              </h1>
              <span className="overflow-hidden inline-block py-1">
                <motion.p
                  variants={itemVariants}
                  className="text-[10px] sm:text-xs lg:text-sm text-white/80 max-w-md uppercase tracking-wider mt-2 block"
                >Kalyani Government Engineering College</motion.p>
              </span>
            </motion.div>



            {/* Lower Thirds Container */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="hero-lower-third absolute bottom-12 left-4 sm:left-6 md:left-10 right-4 sm:right-6 md:right-10 hidden md:flex justify-between items-end gap-8 pointer-events-none z-30 font-mono text-left w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] md:w-[calc(100%-5rem)]"
            >
              {/* Bottom Left */}
              <div className="flex flex-col gap-1.5 max-w-sm lg:max-w-md">
                <span className="overflow-hidden inline-block py-0.5">
                  <motion.span 
                    variants={itemVariants}
                    className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-emerald-400 font-semibold block"
                  >KGEC Developer Relations</motion.span>
                </span>
                <span className="overflow-hidden inline-block py-0.5">
                  <motion.h3 
                    variants={itemVariants}
                    className="text-[9px] sm:text-[10px] font-medium text-white/90 leading-normal uppercase tracking-wider block"
                  >Bridging the gap between learning and production for a smarter, more connected community</motion.h3>
                </span>
              </div>

              {/* Bottom Right */}
              <motion.div 
                variants={itemVariants} 
                className="flex items-center gap-2 flex-wrap justify-end max-w-[42%]"
              >
                <span className="px-2.5 py-1.5 text-[7px] sm:text-[8px] uppercase tracking-widest text-white/90 border border-white/10 rounded-full bg-black/40 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.02)]">Development</span>
                <div className="w-4 h-[1px] bg-white/20"></div>
                <span className="px-2.5 py-1.5 text-[7px] sm:text-[8px] uppercase tracking-widest text-white/90 border border-white/10 rounded-full bg-black/40 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.02)]">Open Source</span>
                <div className="w-4 h-[1px] bg-white/20"></div>
                <span className="px-2.5 py-1.5 text-[7px] sm:text-[8px] uppercase tracking-widest text-white/90 border border-white/10 rounded-full bg-black/40 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.02)]">Innovation</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Panel 3 - Promoting Connect to Phase 2 */}
          <div className="text-slide-3 absolute opacity-0 hidden md:flex flex-col items-center gap-3" style={{ willChange: "transform, opacity" }}>
            <motion.div
              variants={slide3ContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="flex flex-col items-center gap-3"
            >
              <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black uppercase tracking-tight text-white max-w-3xl leading-none font-sans flex flex-wrap justify-center gap-x-3 sm:gap-x-4">
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
                  className="text-[10px] sm:text-xs lg:text-sm text-white/80 max-w-2xl uppercase tracking-wider mt-2 leading-relaxed text-center max-w-xl block"
                >A student-driven developer community at Kalyani Government Engineering College focused on technology, innovation, open source, Web3, AI, and real-world development.</motion.p>
              </span>
            </motion.div>
          </div>

          {/* Centered Logo Reveal (Phase 3 - Climax reveal at the end of scroll track) */}
          <div className="logo-slide absolute opacity-0 scale-95 z-20 flex flex-col items-center gap-5 pointer-events-none -translate-y-16 md:translate-y-0" style={{ willChange: "transform, opacity" }}>
            <img
              src="/logo.jpg"
              alt="Dev Community KGEC Logo"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-emerald-500/20 shadow-[0_0_80px_rgba(16,185,129,0.1)]"
            />
            <div className="flex flex-col items-center">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-white/80 border border-white/10 px-2 py-0.5 rounded-sm bg-black/40 backdrop-blur-sm">
                Dev Community KGEC
              </span>
              <h2 className="text-xl sm:text-3xl font-black uppercase tracking-widest text-white mt-3 text-center leading-tight max-w-none font-sans flex flex-col items-center gap-y-1 sm:gap-y-2">
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

            {isMobile && (
              <button
                onClick={() => {
                  const aboutSection = document.getElementById("about");
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="px-4 py-2 bg-emerald-500 text-black hover:bg-emerald-400 active:scale-95 font-bold uppercase tracking-[0.05em] text-[9px] rounded-sm transition-all duration-300 pointer-events-auto flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:scale-105 mt-2"
              >
                <span>Learn More</span>
                <svg className="w-3.5 h-3.5 animate-bounce mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            )}

            {/* CTA Buttons */}
            <div className="hidden md:flex flex-wrap justify-center gap-4 mt-4 pointer-events-auto">
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

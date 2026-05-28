"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";

// replaced typewriter with a simple fade-in paragraph

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [boxOpenComplete, setBoxOpenComplete] = useState(false);
  const [allTextDone, setAllTextDone] = useState(false);
  const scrollLockedRef = useRef(false);

  const boxVariants = {
    hidden: { scaleX: 0, scaleY: 0, opacity: 0 },
    visible: {
      opacity: 1,
      // keyframes: start as a point, expand horizontally to a line, then open vertically
      scaleX: [0, 1, 1],
      scaleY: [0, 0.02, 1],
      transition: {
          duration: 1.0,
          times: [0, 0.6, 1],
          ease: [0.25, 0.1, 0.25, 1] as const,
          delay: 0.4,
      }
    }
  };

  // single completion handler for the combined typewriter
  const handleTypewriterComplete = useCallback(() => {
    setAllTextDone(true);
    scrollLockedRef.current = false;
    document.body.style.overflow = "";
  }, []);

  // Lock scroll when section comes into view, unlock when all text is done
  useEffect(() => {
    if (isSectionInView && !allTextDone && !scrollLockedRef.current) {
      scrollLockedRef.current = true;
      document.body.style.overflow = "hidden";
    }
  }, [isSectionInView, allTextDone]);

  // (no-op) allTextDone will be set when the single Typewriter completes

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const paragraph1 = "Dev Community KGEC is a collaborative tech community built by students of Kalyani Government Engineering College. Our mission is to help students grow through hands-on learning, networking, hackathons, workshops, open-source contributions, and real-world project development.";
  const paragraph2 = "We believe learning technology should go beyond classrooms. Through community-driven initiatives, we create a thriving ecosystem where developers, designers, creators, and innovators can learn together and build impactful digital solutions.";
  const paragraph3 = "Whether you are a beginner exploring programming for the first time or an experienced developer working on advanced systems, Dev Community KGEC provides a robust platform to learn, contribute, and grow. Join us to be part of a vibrant community that empowers you to turn your ideas into reality and prepares you for the future of technology.";
  const combinedText = `${paragraph1}\n\n${paragraph2}\n\n${paragraph3}`;

  return (
    <section id="about" className="page-section page-section--fit relative bg-[#000000] min-h-screen flex items-center border-t border-white/[0.04] overflow-hidden font-mono text-white select-none">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-emerald-500/[0.02] rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-emerald-500/[0.02] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full py-10 sm:py-16 md:py-20" ref={sectionRef}>
        <div className="flex flex-col gap-12">
          
          {/* Header */}
          <SectionHeading label="// 01 / Who We Are" heading="ABOUT US" />

          {/* Glowing, Corner-bracketed Text Block */}
          <motion.div 
            variants={boxVariants}
            initial="hidden"
            animate={isSectionInView ? "visible" : "hidden"}
            onAnimationComplete={(definition: any) => {
              if (definition === "visible") {
                // show text shortly after box reveal finishes
                  setTimeout(() => setBoxOpenComplete(true), 150);
                // after a further delay, restore scrolling and signal completion
                  setTimeout(() => {
                    setAllTextDone(true);
                    scrollLockedRef.current = false;
                    document.body.style.overflow = "";
                    try {
                      window.dispatchEvent(new CustomEvent("section:animation:done", { detail: { id: "about" } }));
                    } catch (e) {}
                  }, 600);
              }
            }}
            className="group relative p-4 sm:p-8 bg-white/[0.01] border border-white/[0.03] transition-all duration-300 hover:bg-white/[0.02] mx-auto w-full md:w-full lg:w-11/12 xl:w-4/5 max-w-6xl min-h-[360px] sm:h-[480px] overflow-visible flex items-center"
            style={{ transformOrigin: "center center" }}
          >
            {/* Center green dot that expands horizontally into a line then fades */}
            <motion.span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 rounded-full z-30"
              initial={{ width: 8, height: 8, opacity: 1 }}
              animate={{ width: [8, '100%'], height: [8, 4], opacity: [1, 1, 0] }}
              transition={{ duration: 1.0, times: [0, 0.6, 1], ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            />
            {/* Tech Bracket Corners */}
            <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-emerald-400"></span>
            <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-emerald-400"></span>
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-emerald-400"></span>
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-emerald-400"></span>

            <div className="h-full flex flex-col justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/60 leading-relaxed font-normal text-left">
              {boxOpenComplete && (
                <>
                  <motion.p
                    className="whitespace-pre-wrap text-[12px] sm:text-sm text-white/60 leading-relaxed"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
                  >
                    {combinedText}
                  </motion.p>
                </>
              )}
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}

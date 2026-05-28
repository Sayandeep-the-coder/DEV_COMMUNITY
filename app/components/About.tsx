"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  startTrigger?: boolean;
  onComplete?: () => void;
}

function TypewriterText({ text, speed = 8, delay = 0, startTrigger = false, onComplete }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  
  useEffect(() => {
    if (!startTrigger) return;
    const t = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(t);
  }, [startTrigger, delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [started, text, speed, onComplete]);

  return (
    <p>
      {displayedText}
      {started && displayedText.length < text.length && (
        <span className="inline-block w-1.5 h-3 bg-emerald-400 ml-0.5 animate-pulse align-middle"></span>
      )}
    </p>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [boxOpenComplete, setBoxOpenComplete] = useState(false);
  const [allTextDone, setAllTextDone] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const scrollLockedRef = useRef(false);

  const boxVariants = {
    hidden: { scaleX: 0, scaleY: 0.005, opacity: 0 },
    visible: {
      scaleX: 1,
      scaleY: [0.005, 0.005, 1],
      opacity: 1,
      transition: {
        duration: 1.0,
        times: [0, 0.4, 1],
        ease: [0.25, 1, 0.5, 1] as const,
        delay: 0.8,
      }
    }
  };

  const handleParagraphComplete = useCallback(() => {
    setCompletedCount(prev => prev + 1);
  }, []);

  // Lock scroll when section comes into view, unlock when all text is done
  useEffect(() => {
    if (isSectionInView && !allTextDone && !scrollLockedRef.current) {
      scrollLockedRef.current = true;
      document.body.style.overflow = "hidden";
    }
  }, [isSectionInView, allTextDone]);

  // Track when all 3 paragraphs are done
  useEffect(() => {
    if (completedCount >= 3) {
      setAllTextDone(true);
      scrollLockedRef.current = false;
      document.body.style.overflow = "";
    }
  }, [completedCount]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const paragraph1 = "Dev Community KGEC is a collaborative tech community built by students of Kalyani Government Engineering College. Our mission is to help students grow through hands-on learning, networking, hackathons, workshops, open-source contributions, and real-world project development.";
  const paragraph2 = "We believe learning technology should go beyond classrooms. Through community-driven initiatives, we create a thriving ecosystem where developers, designers, creators, and innovators can learn together and build impactful digital solutions.";
  const paragraph3 = "Whether you are a beginner exploring programming for the first time or an experienced developer working on advanced systems, Dev Community KGEC provides a robust platform to learn, contribute, and grow.";

  return (
    <section id="about" className="relative bg-[#000000] min-h-screen flex items-center border-t border-white/[0.04] overflow-hidden font-mono text-white select-none">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-emerald-500/[0.02] rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-emerald-500/[0.02] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full py-20" ref={sectionRef}>
        <div className="flex flex-col gap-8">
          
          {/* Header */}
          <SectionHeading label="// 01 / Who We Are" heading="ABOUT US" />

          {/* Glowing, Corner-bracketed Text Block */}
          <motion.div 
            variants={boxVariants}
            initial="hidden"
            animate={isSectionInView ? "visible" : "hidden"}
            onAnimationComplete={(definition: any) => {
              if (definition === "visible") {
                setBoxOpenComplete(true);
              }
            }}
            className="group relative p-8 bg-white/[0.01] border border-white/[0.03] transition-all duration-300 hover:bg-white/[0.02] w-full"
            style={{ originX: 0.5, originY: 0.5 }}
          >
            {/* Tech Bracket Corners */}
            <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-emerald-400"></span>
            <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-emerald-400"></span>
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-emerald-400"></span>
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-emerald-400"></span>

            <div className="flex flex-col gap-6 text-sm text-white/60 leading-relaxed font-normal text-left min-h-[180px]">
              {boxOpenComplete && (
                <>
                  <TypewriterText 
                    text={paragraph1} 
                    speed={8} 
                    delay={0} 
                    startTrigger={boxOpenComplete}
                    onComplete={handleParagraphComplete}
                  />
                  <TypewriterText 
                    text={paragraph2} 
                    speed={8} 
                    delay={2000} 
                    startTrigger={boxOpenComplete}
                    onComplete={handleParagraphComplete}
                  />
                  <TypewriterText 
                    text={paragraph3} 
                    speed={8} 
                    delay={3600} 
                    startTrigger={boxOpenComplete}
                    onComplete={handleParagraphComplete}
                  />
                </>
              )}
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  animationFrom?: gsap.TweenVars;
  animationTo?: gsap.TweenVars;
}

export default function SplitText({
  text,
  className = "",
  delay = 0,
  duration = 0.5,
  stagger = 0.03,
  animationFrom = { opacity: 0, y: 30, filter: "blur(5px)" },
  animationTo = { opacity: 1, y: 0, filter: "blur(0px)" },
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Split the text into words, then words into characters to prevent broken word wrapping.
  const words = text.split(" ");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll(".split-char");

    // Initialize chars at their initial state
    gsap.set(chars, animationFrom);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(chars, {
              ...animationTo,
              duration,
              stagger,
              delay: delay / 1000,
              ease: "power2.out",
              overwrite: "auto",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animationFrom, animationTo, delay, duration, stagger]);

  return (
    <div
      ref={containerRef}
      className={`inline-block flex-wrap select-none [&:not(:has(span))]:opacity-0 ${className}`}
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split("").map((char, cIdx) => (
            <span
              key={cIdx}
              className="split-char inline-block will-change-[transform,opacity,filter]"
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  animateBy?: "letters" | "words";
}

export default function BlurText({
  text,
  className = "",
  delay = 0,
  duration = 0.6,
  stagger = 0.04,
  animateBy = "letters",
}: BlurTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const words = text.split(" ");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const targets = el.querySelectorAll(
      animateBy === "letters" ? ".blur-char" : ".blur-word"
    );

    // Initial state
    gsap.set(targets, { opacity: 0, filter: "blur(12px)", y: 15 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(targets, {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
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
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animateBy, delay, duration, stagger]);

  return (
    <div ref={containerRef} className={`inline-block flex-wrap ${className}`}>
      {words.map((word, wIdx) => {
        if (animateBy === "words") {
          return (
            <span
              key={wIdx}
              className="blur-word inline-block mr-[0.25em] will-change-[transform,opacity,filter]"
            >
              {word}
            </span>
          );
        }

        return (
          <span
            key={wIdx}
            className="inline-block whitespace-nowrap mr-[0.25em]"
          >
            {word.split("").map((char, cIdx) => (
              <span
                key={cIdx}
                className="blur-char inline-block will-change-[transform,opacity,filter]"
              >
                {char}
              </span>
            ))}
          </span>
        );
      })}
    </div>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedContentProps {
  children: React.ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal" | "none";
  reverse?: boolean;
  duration?: number;
  delay?: number;
  threshold?: number;
  className?: string;
}

export default function AnimatedContent({
  children,
  distance = 30,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  delay = 0,
  threshold = 0.15,
  className = "",
}: AnimatedContentProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    let x = 0;
    let y = 0;

    if (direction === "vertical") {
      y = reverse ? -distance : distance;
    } else if (direction === "horizontal") {
      x = reverse ? -distance : distance;
    }

    // Set initial state
    gsap.set(el, {
      opacity: 0,
      x,
      y,
      scale: direction === "none" ? 0.95 : 1,
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(el, {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration,
              delay: delay / 1000,
              ease: "power3.out",
              overwrite: "auto",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [direction, distance, reverse, duration, delay, threshold]);

  return (
    <div
      ref={elementRef}
      className={`will-change-[transform,opacity] ${className}`}
    >
      {children}
    </div>
  );
}

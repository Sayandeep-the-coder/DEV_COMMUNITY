"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface SectionHeadingProps {
  label: string;
  heading: string;
  speed?: number;
}

export default function SectionHeading({ label, heading, speed = 100 }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(heading.substring(0, i + 1));
      i++;
      if (i >= heading.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [isInView, heading, speed]);

  return (
    <div className="flex flex-col gap-2 section-heading-container" ref={ref}>
      <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400/50">
        {label}
      </span>
      <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white flex items-center">
        {displayedText}
        {isInView && displayedText.length < heading.length && (
          <span className="inline-block w-1.5 h-6 bg-emerald-400 ml-1 animate-pulse align-middle"></span>
        )}
      </h2>
    </div>
  );
}

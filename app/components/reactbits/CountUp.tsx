"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function CountUp({
  from = 0,
  to,
  duration = 2,
  delay = 0,
  decimals = 0,
  suffix = "",
  prefix = "",
  className = "",
}: CountUpProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(from);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const countObj = { val: from };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(countObj, {
              val: to,
              duration,
              delay: delay / 1000,
              ease: "power2.out",
              onUpdate: () => {
                setValue(countObj.val);
              },
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
  }, [from, to, duration, delay]);

  const formattedValue = value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={elementRef} className={`tabular-nums ${className}`}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}

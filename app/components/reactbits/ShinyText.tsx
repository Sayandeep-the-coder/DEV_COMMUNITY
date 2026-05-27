"use client";

import React from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className = "",
}: ShinyTextProps) {
  const animationStyle = disabled
    ? {}
    : {
        backgroundImage:
          "linear-gradient(120deg, rgba(255, 255, 255, 0.1) 30%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0.1) 70%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        textFillColor: "transparent",
        WebkitTextFillColor: "transparent",
        animation: `shinyTextSweep ${speed}s linear infinite`,
        display: "inline-block",
      };

  return (
    <span style={animationStyle} className={`font-medium ${className}`}>
      {text}
    </span>
  );
}

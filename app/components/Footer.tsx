"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 4000);
    }
  };

  return (
    <footer className="footer-crt relative min-h-screen flex items-center overflow-hidden font-mono selection:bg-emerald-400 selection:text-black rounded-t-[28px]">
      <div className="w-full mx-auto px-6 sm:px-8 md:px-8 py-6 pb-16 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-8">

          {/* Left: Large brand block */}
          <div className="w-full lg:w-1/2 flex flex-col gap-5 sm:gap-6 pl-0 sm:pl-2 md:pl-6 lg:pl-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <img src="/logo.jpg" alt="Dev Community KGEC Logo" className="hidden sm:block w-14 h-14 sm:w-20 sm:h-20 rounded-full border border-emerald-500/20" />
              <div>
                <p className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white">DEV COMMUNITY</p>
                <div className="text-xs sm:text-sm uppercase tracking-widest text-white/60 mt-1">Kalyani Government Engineering College</div>
              </div>
            </div>

            <p className="mt-2 sm:mt-3 md:mt-6 text-xs sm:text-sm text-white/60 max-w-2xl leading-relaxed">
              Dev Community KGEC is built entirely for developers, designers, CP enthusiasts, and builders to cultivate high-tier engineering excellence.
            </p>
          </div>

          {/* Right: Newsletter and links */}
          <div className="w-full lg:w-1/2 flex flex-col items-start lg:items-end gap-6 sm:gap-8 pr-0 sm:pr-2 md:pr-6 lg:pr-12">
            <div aria-label="Join Dev Community KGEC" className="newsletter-card w-full lg:w-[420px] group relative px-4 sm:px-6 py-4 sm:py-6 bg-white/[0.01] transition-all duration-300 hover:bg-white/[0.02]">
              {/* corner bracket accents */}
              <span className="card-corner top-left" aria-hidden />
              <span className="card-corner top-right" aria-hidden />
              <span className="card-corner bottom-left" aria-hidden />
              <span className="card-corner bottom-right" aria-hidden />

              <div className="text-[9px] sm:text-xs uppercase tracking-widest text-white/40">Join the Dev Community KGEC</div>
              <p className="mt-3 text-[10px] sm:text-[12px] text-white/50">Be part of a dynamic space where coding thrives, innovations take flight, and knowledge knows no bounds.</p>

              <div className="mt-5 flex items-center gap-3">
                <Link href="/join" className="inline-flex items-center gap-3 bg-emerald-500 text-black font-semibold px-4 py-2 rounded-md shadow-sm hover:opacity-95 w-full sm:w-auto justify-center">Join Now</Link>
              </div>
            </div>

            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-8 sm:gap-12 lg:justify-end text-sm text-white/60">
              <div>
                <div className="uppercase tracking-widest text-white/40 mb-3">Social</div>
                <div className="flex flex-col gap-2">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Twitter</a>
                </div>
              </div>

              <div>
                <div className="uppercase tracking-widest text-white/40 mb-3">Contact</div>
                <div className="flex flex-col gap-2">
                  <a href="mailto:contact@devcommunitykgec.in" className="hover:text-white">contact@devcommunitykgec.in</a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Decorative bars behind footer */}
      <div className="bass-bars pointer-events-none" aria-hidden="true">
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>

      {/* thin separator above bottom bar */}
      <div className="absolute left-0 right-0 bottom-12 z-40 h-px bg-white/6 pointer-events-none" />

      <div className="footer-bottom absolute left-0 right-0 bottom-0 z-50 flex items-center justify-start px-6 sm:px-8 md:px-8 lg:px-12 pb-4 text-sm text-white/40">
        <div className="flex items-center gap-2 text-[11px] sm:text-[13px]">
          <span>© {currentYear}</span>
          <img src="/logo.jpg" alt="mini" className="w-4 h-4 rounded-full border border-white/10" />
          <span className="font-semibold tracking-wider">DEV COMMUNITY KGEC</span>
        </div>
      </div>
    </footer>
  );
}

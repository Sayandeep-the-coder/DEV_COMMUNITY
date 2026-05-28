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
      <div className="w-full mx-auto px-4 md:px-6 py-6 pb-16 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">

          {/* Left: Large brand block */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6 pl-2 md:pl-6 lg:pl-12">
            <div className="flex items-center gap-6">
              <img src="/logo.jpg" alt="Dev Community KGEC Logo" className="w-20 h-20 rounded-full border border-emerald-500/20" />
              <div>
                <h1 className="text-6xl md:text-7xl font-black tracking-tight text-white">DEV COMMUNITY</h1>
                <div className="text-sm uppercase tracking-widest text-white/60 mt-1">Kalyani Government Engineering College</div>
              </div>
            </div>

            <p className="mt-3 md:mt-6 text-sm text-white/60 max-w-2xl leading-relaxed">
              Dev Community KGEC is built entirely for developers, designers, CP enthusiasts, and builders to cultivate high-tier engineering excellence.
            </p>
          </div>

          {/* Right: Newsletter and links */}
          <div className="w-full lg:w-1/2 flex flex-col items-end gap-8 pr-2 md:pr-6 lg:pr-12">
            <div className="newsletter-card w-full lg:w-[420px] group relative px-6 py-6 bg-white/[0.01] transition-all duration-300 hover:bg-white/[0.02]">
              {/* corner bracket accents */}
              <span className="card-corner top-left" aria-hidden />
              <span className="card-corner top-right" aria-hidden />
              <span className="card-corner bottom-left" aria-hidden />
              <span className="card-corner bottom-right" aria-hidden />

              <div className="text-xs uppercase tracking-widest text-white/40">Join the Dev Community KGEC</div>
              <p className="mt-3 text-[12px] text-white/50">Be part of a dynamic space where coding thrives, innovations take flight, and knowledge knows no bounds.</p>

              <div className="mt-5 flex items-center gap-3">
                <Link href="/join" className="inline-flex items-center gap-3 bg-emerald-500 text-black font-semibold px-4 py-2 rounded-md shadow-sm hover:opacity-95">Join Now</Link>
              </div>
            </div>

            <div className="w-full lg:w-auto flex gap-12 justify-end text-sm text-white/60">
              <div>
                <div className="uppercase tracking-widest text-white/40 mb-3">Social</div>
                <div className="flex flex-col gap-2">
                  <a href="https://linkedin.com" className="hover:text-white">LinkedIn</a>
                  <a href="https://twitter.com" className="hover:text-white">Twitter</a>
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

      <div className="footer-bottom absolute left-0 right-0 bottom-0 z-50 flex items-center justify-between px-2 md:px-6 lg:px-12 pb-4 text-sm text-white/40">
        <div className="flex items-center gap-2 text-[13px]">
          <span>© {currentYear}</span>
          <img src="/logo.jpg" alt="mini" className="w-4 h-4 rounded-full border border-white/10" />
          <span className="font-semibold tracking-wider">DEV COMMUNITY KGEC</span>
        </div>
        <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
      </div>
    </footer>
  );
}

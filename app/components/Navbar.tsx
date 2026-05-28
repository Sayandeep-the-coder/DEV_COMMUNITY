"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 font-mono ${
      scrolled 
        ? "bg-black/60 backdrop-blur-md border-b border-emerald-500/10 py-4" 
        : "bg-transparent py-6"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center gap-4 select-none">
        
        {/* Brand Group */}
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src="/logo.jpg" 
            alt="Dev Community KGEC Logo" 
            className="w-10 h-10 rounded-full border border-white/10 group-hover:rotate-180 transition-transform duration-500"
          />
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold uppercase tracking-widest text-white">
              Dev Community
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 leading-none">
              KGEC
            </span>
          </div>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[11px] lg:text-xs uppercase tracking-widest text-white/50">
          <a 
            href="#about" 
            onClick={scrollToSection}
            className="hover:text-emerald-400 transition-colors duration-200"
          >
            About
          </a>
          <a 
            href="#what-we-do" 
            onClick={scrollToSection}
            className="hover:text-white transition-colors duration-200"
          >
            What We Do
          </a>
          <a 
            href="#domains" 
            onClick={scrollToSection}
            className="hover:text-white transition-colors duration-200"
          >
            Domains
          </a>
          <a 
            href="#team" 
            onClick={scrollToSection}
            className="hover:text-white transition-colors duration-200"
          >
            Team
          </a>
          <a 
            href="#faq" 
            onClick={scrollToSection}
            className="hover:text-white transition-colors duration-200"
          >
            FAQ
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <a 
            href="#contact"
            onClick={scrollToSection}
            className="relative px-4 sm:px-6 py-2.5 text-[10px] sm:text-[11px] lg:text-xs uppercase tracking-widest text-white hover:text-black font-bold bg-transparent overflow-hidden group border border-emerald-500/30 hover:border-emerald-400 transition-colors duration-300 block w-fit"
          >
            {/* Tech bracket accents for the button */}
            <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-emerald-500/40 group-hover:border-black transition-colors duration-300"></span>
            <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-emerald-500/40 group-hover:border-black transition-colors duration-300"></span>
            <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-emerald-500/40 group-hover:border-black transition-colors duration-300"></span>
            <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-emerald-500/40 group-hover:border-black transition-colors duration-300"></span>
            
            {/* Slide background */}
            <span className="absolute inset-0 bg-emerald-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out -z-10"></span>
            
            Join us
          </a>

                      <button
                        type="button"
                        className="md:hidden relative w-10 h-10 border border-emerald-500/25 text-white flex items-center justify-center"
                        aria-label="Toggle navigation menu"
                        aria-expanded={mobileOpen}
                        onClick={() => setMobileOpen((prev) => !prev)}
                      >
                        <span className="block w-4 h-px bg-white absolute -translate-y-1.5"></span>
                        <span className="block w-4 h-px bg-white"></span>
                        <span className="block w-4 h-px bg-white absolute translate-y-1.5"></span>
                      </button>
        </div>

      </div>

                  {mobileOpen && (
                    <div className="md:hidden border-t border-emerald-500/10 bg-black/95 backdrop-blur-md">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4 uppercase tracking-widest text-[11px] text-white/70">
                        <a href="#about" onClick={scrollToSection} className="hover:text-white">About</a>
                        <a href="#what-we-do" onClick={scrollToSection} className="hover:text-white">What We Do</a>
                        <a href="#domains" onClick={scrollToSection} className="hover:text-white">Domains</a>
                        <a href="#team" onClick={scrollToSection} className="hover:text-white">Team</a>
                        <a href="#faq" onClick={scrollToSection} className="hover:text-white">FAQ</a>
                      </div>
                    </div>
                  )}
    </header>
  );
}

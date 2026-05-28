"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const menuVariants = {
  hidden: { y: "-100%" },
  visible: { 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.08,
      delayChildren: 0.25
    } 
  },
  exit: { 
    y: "-100%", 
    transition: { 
      duration: 0.5, 
      ease: [0.16, 1, 0.3, 1] as const
    } 
  }
};

const linkVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.35, ease: "easeOut" as const } 
  }
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clickedLink, setClickedLink] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

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

  useEffect(() => {
    const sections = ["#about", "#what-we-do", "#domains", "#team", "#faq"];
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const id = `#${entry.target.id}`;
        if (entry.isIntersecting) {
          if (sections.includes(id)) {
            setActiveLink(id);
          }
        } else {
          setActiveLink((prev) => (prev === id ? null : prev));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.querySelector(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;
    const target = document.querySelector(href);
    
    // Set global flag to prevent Hero scroll trigger hijacking
    if (typeof window !== "undefined") {
      (window as any).isNavClickScrolling = true;
    }

    const performScroll = () => {
      if (target) {
        const lenis = (window as any).lenis;
        if (lenis && typeof lenis.scrollTo === "function") {
          lenis.scrollTo(target);
        } else {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      // Reset the flag after the scroll completes (approx 1500ms)
      setTimeout(() => {
        if (typeof window !== "undefined") {
          (window as any).isNavClickScrolling = false;
        }
      }, 1500);
    };

    if (mobileOpen) {
      setClickedLink(href);
      setTimeout(() => {
        performScroll();
        setMobileOpen(false);
        setClickedLink(null);
      }, 500);
    } else {
      setActiveLink(href);
      performScroll();
    }
  };

  const renderDesktopLink = (href: string, label: string) => {
    const isActive = activeLink === href;
    const isHovered = hoveredLink === href;

    return (
      <a
        href={href}
        onClick={scrollToSection}
        onMouseEnter={() => setHoveredLink(href)}
        onMouseLeave={() => setHoveredLink(null)}
        className="relative flex items-center px-3 py-1.5 transition-colors duration-200 select-none text-[11px] lg:text-xs uppercase tracking-widest text-white/50 hover:text-emerald-400 font-mono font-bold"
      >
        <span className="relative flex items-center">
          <AnimatePresence>
            {isHovered && (
              <>
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: -3 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="text-emerald-400 absolute right-full font-mono text-[10px] lg:text-xs"
                >
                  [
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 3 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="text-emerald-400 absolute left-full font-mono text-[10px] lg:text-xs"
                >
                  ]
                </motion.span>
              </>
            )}
          </AnimatePresence>
          <span className={isActive ? "text-emerald-400 transition-colors duration-200" : "transition-colors duration-200"}>
            {label}
          </span>
        </span>
      </a>
    );
  };

  const renderMobileLink = (href: string, label: string) => {
    const isClicked = clickedLink === href;
    return (
      <motion.div variants={linkVariants} className="w-full text-left">
        <a 
          href={href} 
          onClick={scrollToSection} 
          className="relative flex items-center text-2xl font-bold py-2 block w-fit text-white font-mono select-none"
        >
          <span className="relative flex items-center">
            <AnimatePresence>
              {isClicked && (
                <>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: -5 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-emerald-400 absolute right-full font-mono font-bold"
                  >
                    [
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 5 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-emerald-400 absolute left-full font-mono font-bold"
                  >
                    ]
                  </motion.span>
                </>
              )}
            </AnimatePresence>
            <span className={isClicked ? "text-emerald-400 transition-colors duration-300" : "hover:text-emerald-400 transition-colors duration-200"}>
              {label}
            </span>
          </span>
        </a>
      </motion.div>
    );
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-mono ${
      mobileOpen
        ? "bg-transparent py-4"
        : scrolled
          ? "bg-black/60 backdrop-blur-md border-b border-emerald-500/10 py-4" 
          : "bg-transparent py-6"
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex justify-between items-center gap-4 select-none">
        
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
          </div>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[11px] lg:text-xs uppercase tracking-widest text-white/50">
          {renderDesktopLink("#about", "About")}
          {renderDesktopLink("#what-we-do", "What We Do")}
          {renderDesktopLink("#domains", "Domains")}
          {renderDesktopLink("#team", "Team")}
          {renderDesktopLink("#faq", "FAQ")}
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
                        className="md:hidden relative w-10 h-10 border border-emerald-500/25 text-white flex items-center justify-center z-50 cursor-pointer"
                        aria-label="Toggle navigation menu"
                        aria-expanded={mobileOpen}
                        onClick={() => setMobileOpen((prev) => !prev)}
                      >
                        <span className={`block w-4 h-px bg-white absolute transition-all duration-300 ${
                          mobileOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
                        }`}></span>
                        <span className={`block w-4 h-px bg-white absolute transition-opacity duration-300 ${
                          mobileOpen ? "opacity-0" : "opacity-100"
                        }`}></span>
                        <span className={`block w-4 h-px bg-white absolute transition-all duration-300 ${
                          mobileOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
                        }`}></span>
                      </button>
        </div>

      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 w-screen h-screen bg-[#030303] border-b border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.8)] z-40 md:hidden flex flex-col justify-center items-start font-mono select-none"
          >
            <div className="w-full px-8 sm:px-12 flex flex-col items-start gap-4 uppercase tracking-[0.25em] text-sm text-white/70">
              {renderMobileLink("#about", "About")}
              <motion.hr variants={linkVariants} className="w-full border-white/10" />
              {renderMobileLink("#what-we-do", "What We Do")}
              <motion.hr variants={linkVariants} className="w-full border-white/10" />
              {renderMobileLink("#domains", "Domains")}
              <motion.hr variants={linkVariants} className="w-full border-white/10" />
              {renderMobileLink("#team", "Team")}
              <motion.hr variants={linkVariants} className="w-full border-white/10" />
              {renderMobileLink("#faq", "FAQ")}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

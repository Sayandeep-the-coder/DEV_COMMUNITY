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
    <footer className="relative bg-[#000000] border-t border-emerald-500/10 pt-24 pb-16 overflow-hidden font-mono text-white selection:bg-emerald-400 selection:text-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Grid split in two symmetric columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">
          
          {/* Left Column: Brand, Circular SVG Logo, and Detailed Community Info */}
          <div className="flex flex-col justify-between gap-12 lg:gap-0">
            {/* Logo Group */}
            <div className="flex items-center gap-4 select-none">
              {/* Dev Community KGEC Logo Image */}
              <img 
                src="/logo.jpg"
                alt="Dev Community KGEC Logo" 
                className="w-16 h-16 rounded-full border border-emerald-500/20 shrink-0 select-none transition-transform duration-700 hover:rotate-360"
              />
              
              {/* Brand Headers */}
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black tracking-tighter text-white leading-none">
                  DEV COMMUNITY
                </span>
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-white/50 mt-1 pl-0.5">
                  KGEC
                </span>
              </div>
              
              {/* Vertical Stacked subtitle */}
              <div className="flex flex-col text-[7.5px] font-bold tracking-widest text-white/40 leading-tight uppercase pl-3 border-l border-white/10 ml-2">
                <span>Kalyani</span>
                <span>Government</span>
                <span>Engineering</span>
                <span>College</span>
              </div>
            </div>
            
            {/* Tagline / Mission Info aligned at bottom */}
            <div className="flex flex-col gap-5 max-w-lg mt-8 lg:mt-16">
              <p className="text-xs leading-relaxed text-white/70 tracking-wide font-normal">
                Welcome to the Dev Community Kalyani Government Engineering College! 🚀🌐
              </p>
              
              <p className="text-xs leading-relaxed text-white/40 tracking-normal font-normal">
                At the heart of innovation, we bring together a collective of development clubs, including GDSC, ABC, FOSS, and more! 💻 Our mission? To foster a vibrant ecosystem where coding development thrives.
              </p>
              
              {/* Clean metadata badge for industry info */}
              <div className="inline-flex items-center gap-2 text-[9px] uppercase tracking-widest text-white/30 border border-emerald-500/15 px-2.5 py-1 rounded w-fit mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 animate-pulse"></span>
                <span>Industry: Technology, Information and Internet</span>
              </div>
            </div>
          </div>

          {/* Right Column: Newsletter box, Rich Grid Columns, and copyright */}
          <div className="flex flex-col gap-10 lg:pl-12 justify-between">
            {/* Interactive Corner Bracket Newsletter Form */}
            <form 
              onSubmit={handleSubmit} 
              className="group relative flex flex-col gap-4 px-8 py-6 bg-white/[0.01] transition-all duration-300 hover:bg-white/[0.02]"
            >
              {/* Tech Bracket Accents */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/40 transition-all duration-300 group-focus-within:border-emerald-400 group-focus-within:w-4 group-focus-within:h-4"></span>
              <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/40 transition-all duration-300 group-focus-within:border-emerald-400 group-focus-within:w-4 group-focus-within:h-4"></span>
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/40 transition-all duration-300 group-focus-within:border-emerald-400 group-focus-within:w-4 group-focus-within:h-4"></span>
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/40 transition-all duration-300 group-focus-within:border-emerald-400 group-focus-within:w-4 group-focus-within:h-4"></span>

              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 group-focus-within:text-white/70 transition-colors">
                  {subscribed ? "Welcome to the ecosystem" : "Join the Dev Community KGEC"}
                </span>
                
                <button 
                  type="submit" 
                  disabled={subscribed}
                  className="text-white/40 hover:text-white transition-colors duration-200 focus:outline-none cursor-pointer px-1 py-0.5"
                  aria-label="Subscribe"
                >
                  <span className="text-xs font-bold">—</span>
                </button>
              </div>

              <p className="text-[10px] leading-relaxed text-white/30 group-focus-within:text-white/50 transition-colors">
                Be part of a dynamic space where coding thrives, innovations take flight, and knowledge knows no bounds.
              </p>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={subscribed ? "THANK YOU" : "ENTER EMAIL"}
                disabled={subscribed}
                className="w-full bg-transparent border-none text-xs uppercase font-bold tracking-widest text-white placeholder-white/20 focus:outline-none focus:ring-0 p-0"
                required
              />
            </form>

            {/* Rich Grid of Community Lists */}
            <div className="grid grid-cols-3 gap-6 pl-1">
              {/* CLUBS */}
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-black text-white/35 mb-3">
                  Clubs
                </h4>
                <ul className="flex flex-col gap-2 text-xs font-semibold text-white/60">
                  <li>
                    <span className="hover:text-white transition-colors duration-200 cursor-default">
                      GDSC
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-white transition-colors duration-200 cursor-default">
                      ABC
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-white transition-colors duration-200 cursor-default">
                      FOSS
                    </span>
                  </li>
                </ul>
              </div>

              {/* AMBASSADORS */}
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-black text-white/35 mb-3">
                  Ambassadors
                </h4>
                <ul className="flex flex-col gap-2 text-xs font-semibold text-white/60">
                  <li>
                    <span className="hover:text-white transition-colors duration-200 cursor-default">
                      Postman
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-white transition-colors duration-200 cursor-default">
                      GitHub
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-white transition-colors duration-200 cursor-default">
                      Polygon
                    </span>
                  </li>
                </ul>
              </div>

              {/* CONNECT */}
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-black text-white/35 mb-3">
                  Connect
                </h4>
                <ul className="flex flex-col gap-2 text-xs font-semibold text-white/60">
                  <li>
                    <a 
                      href="mailto:contact@devcommunitykgec.in" 
                      className="hover:text-white transition-colors duration-200 text-white/50 hover:underline decoration-white/20"
                    >
                      contact@devcommunitykgec.in
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-white transition-colors duration-200 text-white/50 hover:underline decoration-white/20"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://github.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-white transition-colors duration-200 text-white/50 hover:underline decoration-white/20"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://discord.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-white transition-colors duration-200 text-white/50 hover:underline decoration-white/20"
                    >
                      Discord
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Custom tagline right above copyright */}
            <div className="text-[10px] uppercase tracking-widest text-white/30 pl-1 border-t border-white/5 pt-4">
              Building the future through technology, collaboration, and innovation.
            </div>

            {/* Copyright & Legal Bar */}
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 text-[10px] uppercase tracking-widest text-white/40 pl-1">
              <span className="flex items-center gap-2 font-bold">
                <span>&copy; {currentYear}</span>
                {/* Mini brand symbol logo image */}
                <img 
                  src="/logo.jpg"
                  alt="DC Logo" 
                  className="w-4 h-4 rounded-full border border-white/10 shrink-0 select-none"
                />
                <span className="text-white/60">DEV COMMUNITY KGEC</span>
              </span>
              
              <Link 
                href="/privacy" 
                className="hover:text-white transition-colors font-bold"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}

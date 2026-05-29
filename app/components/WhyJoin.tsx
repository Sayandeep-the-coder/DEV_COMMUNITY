"use client";

import SectionHeading from "./SectionHeading";

export default function WhyJoin() {
  const benefits = [
    "Learn directly from peers and senior mentors",
    "Build impactful, production-ready projects",
    "Participate in high-stakes hackathons and events",
    "Accelerate technical and communication skillsets",
    "Collaborate with extremely talented student builders",
    "Access exclusive internships and career mentorship",
    "Gain practical, real-world industry exposures",
    "Become part of an active, lifetime developer network"
  ];

  

  return (
    <section aria-label="Why Join Dev Community KGEC" className="page-section relative bg-[#000000] py-20 sm:py-24 md:py-32 border-t border-white/[0.04] overflow-hidden font-mono text-white select-none">
      
      {/* Glow effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/[0.015] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-24 items-start">
          
          {/* Left Column: Why Join Dev Community? (now full-width) */}
          <div className="lg:col-span-12 flex flex-col gap-8 sm:gap-10">
            <SectionHeading label="// 05 / Active Incentives" heading="Why Join Us?" />

            <p className="text-xs sm:text-sm text-white/50 leading-relaxed max-w-xl">
              Dev Community KGEC is built entirely for developers, designers, CP enthusiast, and builders to cultivate high-tier engineering excellence:
            </p>

            {/* Dashboard Register Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="group relative p-4 sm:p-5 bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.03] hover:border-white/10 transition-all duration-300 flex flex-col gap-3 pl-5 sm:pl-6"
                >
                  {/* Status Indicator */}
                  <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-500/20 group-hover:bg-emerald-400 transition-colors duration-300"></span>

                  <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors">
                    <span>Benefit register // [0{index + 1}]</span>
                    <span className="font-bold text-emerald-500 animate-pulse">[ ACTIVE ]</span>
                  </div>

                  <span className="text-xs text-white/70 group-hover:text-white transition-colors duration-300 font-semibold leading-relaxed">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column removed per request */}

        </div>
      </div>

    </section>
  );
}

"use client";

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

  const achievements = [
    {
      title: "Active Core Workshops",
      metric: "12+ Events",
      desc: "Organized multiple technical workshops and coding webinars covering full-stack CP, AI, and DevOps."
    },
    {
      title: "Hackathon Milestones",
      metric: "Top Finishes",
      desc: "Participated and secured top ranks in prestigious national-level hackathons and Web3 buildathons."
    },
    {
      title: "Student-Led Products",
      metric: "08+ Projects",
      desc: "Built and deployed multiple open-source utilities and production products solving KGEC student needs."
    },
    {
      title: "Ecosystem Collaborations",
      metric: "Global Networks",
      desc: "Partnered with globally established developer networks, guilds, and community outreach frameworks."
    }
  ];

  return (
    <section className="relative bg-[#080808] py-32 border-t border-white/[0.04] overflow-hidden font-mono text-white select-none">
      
      {/* Glow effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/[0.015] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Why Join Dev Community? (Takes 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400/50">
                // 05 / Active Incentives
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                Why Join Us?
              </h2>
            </div>

            <p className="text-sm text-white/50 leading-relaxed max-w-xl">
              Dev Community KGEC is built entirely for developers, designers, CP enthusiast, and builders to cultivate high-tier engineering excellence:
            </p>

            {/* Dashboard Register Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="group relative p-5 bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.03] hover:border-white/10 transition-all duration-300 flex flex-col gap-3 pl-6"
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

          {/* Right Column: Achievements (Takes 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400/50">
                // 06 / Milestones Completed
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                Achievements
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {achievements.map((ach, index) => (
                <div 
                  key={index}
                  className="group relative p-6 bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.03] hover:border-white/10 transition-all duration-300 flex flex-col gap-2 relative"
                >
                  {/* Tech Bracket Corners */}
                  <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 transition-all duration-300 group-hover:border-emerald-400"></span>
                  <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 transition-all duration-300 group-hover:border-emerald-400"></span>
                  <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 transition-all duration-300 group-hover:border-emerald-400"></span>
                  <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 transition-all duration-300 group-hover:border-emerald-400"></span>

                  <div className="flex justify-between items-baseline select-none">
                    <h3 className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">
                      {ach.title}
                    </h3>
                    <span className="text-[10px] font-black uppercase tracking-wider text-white/40 group-hover:text-white transition-colors">
                      {ach.metric}
                    </span>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed font-normal mt-1">
                    {ach.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

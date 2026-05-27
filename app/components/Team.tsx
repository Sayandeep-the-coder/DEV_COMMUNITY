"use client";

export default function Team() {
  const teams = [
    {
      name: "Community Management",
      role: "Ecosystem Strategy & Culture",
      desc: "Handles overall community growth, alignment, operational guidelines, and ensures a welcoming developer culture.",
      bullets: ["Culture Alignment", "General Operations", "Student Support", "Internal Strategy"]
    },
    {
      name: "Technical Team",
      role: "Coding, FOSS & Project Building",
      desc: "Engineers developer tooling, manages GitHub contribution repositories, maintains community websites, and guides CP contests.",
      bullets: ["Full-Stack Engineering", "Git & GitHub Tooling", "DSA & CP contests", "System Administration"]
    },
    {
      name: "Design Team",
      role: "Brand, Assets & UI/UX UI Design",
      desc: "Crafts custom vector branding, memorable UI layouts, visual assets, post templates, and designs responsive interfaces.",
      bullets: ["UI/UX Interface Design", "Community Assets", "Social Media Graphics", "Visual Identity"]
    },
    {
      name: "Event Operations",
      role: "Workshops, Hackathons & Operations",
      desc: "Coordinates hackathons, bootcamps, and technical speaker webinars. Handles stage operations, scheduling, and resources.",
      bullets: ["Event Planning", "Hackathon Logistics", "Bootcamp Scheduling", "Speaker Coordination"]
    },
    {
      name: "Content & Media",
      role: "Outreach Copy, Blogs & Technical Writing",
      desc: "Produces technical documentations, write-ups, community guides, blog publications, and social media copy narratives.",
      bullets: ["Technical Writing", "Social media copy", "Newsletter Publications", "Community blogging"]
    },
    {
      name: "Partnerships & Outreach",
      role: "Sponsorships, Collaborations & Public Relations",
      desc: "Collaborates with global ecosystems, partners, and startup communities. Secures event sponsorships and drives student outreach.",
      bullets: ["Ecosystem Collaborations", "Sponsorship Outreach", "Public Relations", "Inter-college networks"]
    }
  ];

  return (
    <section id="team" className="relative bg-[#000000] py-32 border-t border-white/[0.04] overflow-hidden font-mono text-white select-none">
      
      {/* Background Vignette Ambient */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-emerald-500/[0.01] rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 max-w-2xl">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400/50">
              // 07 / Meet the Builders
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Meet the Team
            </h2>
          </div>
          <p className="text-xs text-white/50 leading-relaxed font-normal">
            A passionate group of students working together to build a strong, active, and innovative technical ecosystem inside Kalyani Government Engineering College.
          </p>
        </div>

        {/* Core Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {teams.map((team, index) => (
            <div 
              key={index}
              className="group relative p-8 bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.03] hover:border-white/10 transition-all duration-300 flex flex-col justify-between gap-6"
            >
              {/* Tech Bracket Corners */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 transition-all duration-300 group-hover:border-emerald-400 group-hover:w-4 group-hover:h-4"></span>
              <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20 transition-all duration-300 group-hover:border-emerald-400 group-hover:w-4 group-hover:h-4"></span>
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20 transition-all duration-300 group-hover:border-emerald-400 group-hover:w-4 group-hover:h-4"></span>
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 transition-all duration-300 group-hover:border-emerald-400 group-hover:w-4 group-hover:h-4"></span>

              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-[9px] font-bold text-white/25">
                    CORE_DEPT // 0{index + 1}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/5 px-2 py-0.5 rounded-sm border border-emerald-500/10 animate-pulse">
                    Active
                  </span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-bold text-white group-hover:text-white transition-colors">
                    {team.name}
                  </h3>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest leading-none font-semibold">
                    {team.role}
                  </span>
                </div>

                <p className="text-xs text-white/50 leading-relaxed font-normal mt-2">
                  {team.desc}
                </p>
              </div>

              {/* Roles Bullets Bar */}
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 border-t border-white/[0.04] pt-4 text-[9px] uppercase tracking-wider text-white/30 font-bold group-hover:text-white/50 transition-colors">
                {team.bullets.map((b, idx) => (
                  <span key={idx} className="flex items-center gap-1">
                    <span>•</span>
                    <span>{b}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}

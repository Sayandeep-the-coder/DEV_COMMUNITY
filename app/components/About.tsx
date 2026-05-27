"use client";

export default function About() {
  const visionPoints = [
    "Learn modern technologies beyond standard classroom scopes",
    "Build meaningful, real-world projects that solve active problems",
    "Collaborate with peers to develop advanced full-stack workflows",
    "Gain industry exposure by connecting with experts and alumni",
    "Develop leadership, communication, and engineering team skills",
    "Prepare extensively for prestigious internships and future careers"
  ];

  return (
    <section id="about" className="relative bg-[#080808] py-32 border-t border-white/[0.04] overflow-hidden font-mono text-white select-none">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-emerald-500/[0.02] rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-emerald-500/[0.02] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: About Us */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400/50">
                // 01 / Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                About Us
              </h2>
            </div>

            {/* Glowing, Corner-bracketed Text Block */}
            <div className="group relative p-8 bg-white/[0.01] border border-white/[0.03] transition-all duration-300 hover:bg-white/[0.02]">
              {/* Tech Bracket Corners */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-emerald-400"></span>
              <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-emerald-400"></span>
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-emerald-400"></span>
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30 transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-emerald-400"></span>

              <div className="flex flex-col gap-6 text-sm text-white/60 leading-relaxed font-normal">
                <p>
                  Dev Community KGEC is a collaborative tech community built by students of Kalyani Government Engineering College. Our mission is to help students grow through hands-on learning, networking, hackathons, workshops, open-source contributions, and real-world project development.
                </p>
                <p>
                  We believe learning technology should go beyond classrooms. Through community-driven initiatives, we create a thriving ecosystem where developers, designers, creators, and innovators can learn together and build impactful digital solutions.
                </p>
                <p>
                  Whether you are a beginner exploring programming for the first time or an experienced developer working on advanced systems, Dev Community KGEC provides a robust platform to learn, contribute, and grow.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Our Vision */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400/50">
                // 02 / The Roadmap
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                Our Vision
              </h2>
            </div>

            <p className="text-sm text-white/50 leading-relaxed max-w-lg mb-2">
              To create one of the most active and innovative student developer communities, driven by structured pathways:
            </p>

            {/* Vertical Milestones Grid */}
            <div className="flex flex-col gap-3">
              {visionPoints.map((point, index) => (
                <div 
                  key={index}
                  className="group relative flex items-start gap-4 p-4 bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.03] hover:border-white/10 transition-all duration-300 pl-6"
                >
                  {/* Active Indicator Accent Line */}
                  <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-500/30 group-hover:bg-emerald-400 transition-colors duration-300"></span>

                  <span className="text-xs font-bold text-emerald-500/40 group-hover:text-emerald-400 transition-colors duration-300">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  
                  <span className="text-xs text-white/60 group-hover:text-white/90 transition-colors duration-300 font-semibold leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

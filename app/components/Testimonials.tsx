import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Dev Community KGEC helped me move from learning tutorials to building real-world projects with active peers.",
      author: "Student Member",
      dept: "CSE Dept"
    },
    {
      quote: "The community gave me opportunities to participate in hackathons, connect with experts, and improve my engineering skills.",
      author: "Core Contributor",
      dept: "IT Dept"
    },
    {
      quote: "One of the best places in college to learn modern technology practically and bridge the gap with the industry.",
      author: "Alumni Leader",
      dept: "ECE Class of '24"
    }
  ];

  return (
    <section id="testimonials" className="page-section relative bg-[#000000] py-20 sm:py-24 md:py-32 border-t border-white/[0.04] overflow-hidden font-mono text-white select-none">
      {/* Background Ambient Blur */}
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-500/[0.015] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col gap-10 sm:gap-12">
        <div className="flex flex-col gap-12">
          <SectionHeading label="// 08 / Community Feedback" heading="Testimonials" />

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {testimonials.map((test, index) => (
              <div 
                key={index}
                className="group relative p-5 sm:p-8 bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.03] hover:border-white/10 transition-all duration-300 flex flex-col justify-between gap-5 sm:gap-6 pl-5 sm:pl-8"
              >
                <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-500/30 group-hover:bg-emerald-400 transition-colors duration-300"></span>

                <div className="flex flex-col gap-4">
                  <span className="text-2xl sm:text-3xl font-black text-white/25 select-none leading-none">“</span>
                  <p className="text-[11px] sm:text-xs text-white/60 group-hover:text-white/80 transition-colors leading-relaxed font-semibold italic mt-[-10px]">
                    {test.quote}
                  </p>
                </div>

                <div className="flex flex-col gap-0.5 border-t border-white/[0.04] pt-4 select-none">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/80">
                    {test.author}
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-white/40 leading-none">
                    {test.dept}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

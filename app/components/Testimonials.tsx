"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

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

  const faqs = [
    {
      q: "Who can join the community?",
      a: "Any student from Kalyani Government Engineering College interested in technology, development, design, AI, Web3, FOSS, or technical innovation can join. We have space for everyone!"
    },
    {
      q: "Do I need prior coding experience?",
      a: "No prior experience is required. Beginners are always welcome! We run foundational bootcamps, workshops, and peer mentoring to help you start your development journey from scratch."
    },
    {
      q: "Is the community only for developers?",
      a: "No! Designers, creators, content writers, organizers, system administrators, and tech enthusiasts can contribute to active teams. Innovation requires diverse skills."
    },
    {
      q: "How can I participate in upcoming events?",
      a: "Follow our social platforms (LinkedIn, GitHub) and join our community communication channels (Discord/Email) for instant notifications on registrations and schedules."
    }
  ];

  const toggleFAQ = (index: number) => {
    if (expandedFAQ === index) {
      setExpandedFAQ(null);
    } else {
      setExpandedFAQ(index);
    }
  };

  return (
    <section id="faq" className="page-section relative bg-[#000000] py-32 border-t border-white/[0.04] overflow-hidden font-mono text-white select-none">
      
      {/* Background Ambient Blur */}
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-500/[0.015] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-24">
        
        {/* PART 1: TESTIMONIALS */}
        <div className="flex flex-col gap-12">
          <SectionHeading label="// 08 / Community Feedback" heading="Testimonials" />

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((test, index) => (
              <div 
                key={index}
                className="group relative p-8 bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.03] hover:border-white/10 transition-all duration-300 flex flex-col justify-between gap-6 pl-8"
              >
                {/* Visual quote indicator mark */}
                <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-500/30 group-hover:bg-emerald-400 transition-colors duration-300"></span>

                <div className="flex flex-col gap-4">
                  <span className="text-3xl font-black text-white/25 select-none leading-none">“</span>
                  <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors leading-relaxed font-semibold italic mt-[-10px]">
                    {test.quote}
                  </p>
                </div>

                <div className="flex flex-col gap-0.5 border-t border-white/[0.04] pt-4 select-none">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/80">
                    {test.author}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/40 leading-none">
                    {test.dept}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PART 2: FAQ SECTION ACCORDIONS */}
        <div className="flex flex-col gap-12 pt-12 border-t border-white/[0.03]">
          <SectionHeading label="// 09 / General Queries Resolved" heading="FAQ Section" />

          {/* FAQ Accordion Module */}
          <div className="flex flex-col gap-4 max-w-3xl">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="group relative bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.03] hover:border-white/10 transition-all duration-300"
              >
                {/* Tech Bracket Corners */}
                <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 transition-all duration-300 group-hover:border-emerald-400"></span>
                <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 transition-all duration-300 group-hover:border-emerald-400"></span>
                <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 transition-all duration-300 group-hover:border-emerald-400"></span>
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 transition-all duration-300 group-hover:border-emerald-400"></span>

                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 font-bold uppercase tracking-widest text-[11px] sm:text-xs text-white flex justify-between items-center cursor-pointer select-none"
                >
                  <span className="max-w-[85%]">{faq.q}</span>
                  <span className="text-xs text-white/40 group-hover:text-white transition-colors duration-200">
                    {expandedFAQ === index ? "[-]" : "[+]"}
                  </span>
                </button>

                {/* Animated expandable content block */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedFAQ === index 
                      ? "max-h-40 border-t border-white/[0.04]" 
                      : "max-h-0"
                  }`}
                >
                  <p className="p-6 text-xs text-white/50 leading-relaxed font-normal">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}

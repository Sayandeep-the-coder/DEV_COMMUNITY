"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";

export default function FAQ() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

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
    <section id="faq" className="page-section page-section--fit relative bg-[#000000] py-16 sm:py-20 border-t border-white/[0.04] overflow-hidden font-mono text-white select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col gap-8 sm:gap-12">
        <div className="flex flex-col gap-8 sm:gap-12 pt-10 sm:pt-12 border-t border-white/[0.03]">
          <SectionHeading label="// 09 / General Queries Resolved" heading="FAQ Section" />

          {/* FAQ Accordion Module */}
          <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-none">
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
                  className="w-full text-left p-4 sm:p-6 font-bold uppercase tracking-widest text-[10px] sm:text-xs text-white flex justify-between items-center cursor-pointer select-none"
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
                  <p className="p-4 sm:p-6 text-[11px] sm:text-xs text-white/50 leading-relaxed font-normal">
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

"use client";

import { useState } from "react";
import ScrollStack, { ScrollStackItem } from "./reactbits/ScrollStack";
import SectionHeading from "./SectionHeading";

export default function WhatWeDo() {
  const [activeDomain, setActiveDomain] = useState(0);

  const activities = [
    {
      title: "Workshops & Bootcamps",
      tag: "LEARN",
      desc: "Hands-on technical sessions covering modern stacks, keeping students updated with industrial systems.",
      bullets: ["Web Development", "AI & Machine Learning", "Cloud & DevOps", "Cybersecurity & UI/UX"]
    },
    {
      title: "Hackathons",
      tag: "BUILD",
      desc: "We actively organize and participate in internal, national, Web3, and AI buildathons and innovational challenges.",
      bullets: ["Web3 Hackathons", "AI Buildathons", "Open Innovation Challenges", "National competitions"]
    },
    {
      title: "Open Source Collaboration",
      tag: "CONTRIBUTE",
      desc: "Members collaborate on active GitHub repositories and community products using industry-standard git workflows.",
      bullets: ["GitHub Collaboration", "Developer Tooling", "Issue Resolution", "Documentation drives"]
    },
    {
      title: "Networking & Mentorship",
      tag: "NETWORK",
      desc: "Bridge the gap between academia and industry. Connect directly with founders, alumni, and senior developers.",
      bullets: ["Alumni Connect", "Startup Founders", "Industry Experts", "Direct Peer Guidance"]
    }
  ];

  const domains = [
    {
      name: "Web Development",
      shortcut: "WEB-DEV",
      desc: "Building modern full-stack web applications, REST/GraphQL APIs, scaling databases, and configuring deployment pipelines.",
      tags: ["React/Next.js", "Node.js", "PostgreSQL", "Docker", "REST APIs", "GraphQL", "TailwindCSS", "Scalable Systems"]
    },
    {
      name: "Artificial Intelligence",
      shortcut: "AI-ML",
      desc: "Exploring machine learning, deep learning, computer vision, natural language processing, and deploying custom AI agents.",
      tags: ["Python", "TensorFlow/PyTorch", "Generative AI", "NLP", "Computer Vision", "AI Agents", "Scikit-Learn", "LLMs"]
    },
    {
      name: "Blockchain & Web3",
      shortcut: "WEB3",
      desc: "Writing decentralized applications, deploying gas-optimized smart contracts, and building blockchain integrations.",
      tags: ["Solidity", "Ether.js", "Hardhat", "Decentralized Apps (dApps)", "DeFi", "Wallets", "Smart Contracts", "IPFS"]
    },
    {
      name: "Open Source",
      shortcut: "FOSS",
      desc: "Contributing to maintained packages, building community developer tooling, and learning standard product cycles.",
      tags: ["Git & GitHub", "Package Maintenance", "Markdown", "CI/CD Actions", "Issue Debugging", "FOSS Ideologies"]
    },
    {
      name: "Competitive Programming",
      shortcut: "DSA-CP",
      desc: "Mastering advanced data structures, complex algorithms, problem-solving speed, and preparing for engineering interviews.",
      tags: ["C++ / Java", "DSA", "Problem Solving", "Contests", "Time Complexity", "Codeforces/LeetCode"]
    }
  ];

  

  return (
    <section id="what-we-do" aria-label="What Dev Community KGEC Does" className="page-section page-section--fit mt-12 md:mt-20 relative bg-[#000000] py-20 sm:py-24 md:py-32 border-t border-white/[0.04] overflow-hidden font-mono text-white select-none">
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col gap-14 sm:gap-16 md:gap-20">
        
        {/* SECTION 1: WHAT WE DO */}
        <div className="flex flex-col gap-12">
            <div className="section-heading-sticky">
              <SectionHeading label="// 03 / Core Initiatives" heading="What We Do" />
            </div>

          {/* Stacking Card Animation (ReactBits ScrollStack component) */}
          <div className="pt-0 z-0 relative stack-below">
          <ScrollStack 
            useWindowScroll={true} 
            className="w-full border border-white/[0.02] z-0"
            itemDistance={60}
            itemScale={0.04}
            itemStackDistance={20}
            stackPosition="12%"
            scaleEndPosition="5%"
            baseScale={0.90}
            blurAmount={1}
          >
            {activities.map((act, index) => (
              <ScrollStackItem 
                key={index} 
                itemClassName="bg-[#030303] p-5 sm:p-8 md:p-10 border border-white/[0.04] rounded-sm group hover:border-white/10"
              >
                {/* Tech Bracket Corners */}
                <span className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-white/20 transition-all duration-300 group-hover:border-emerald-400 group-hover:w-4.5 group-hover:h-4.5"></span>
                <span className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-white/20 transition-all duration-300 group-hover:border-emerald-400 group-hover:w-4.5 group-hover:h-4.5"></span>
                <span className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-white/20 transition-all duration-300 group-hover:border-emerald-400 group-hover:w-4.5 group-hover:h-4.5"></span>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-white/20 transition-all duration-300 group-hover:border-emerald-400 group-hover:w-4.5 group-hover:h-4.5"></span>

                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center select-none">
                    <span className="text-[9px] uppercase tracking-widest text-emerald-400/60 border border-emerald-500/20 px-2 py-0.5 rounded-sm">
                      {act.tag}
                    </span>
                    <span className="text-[9px] font-bold text-white/20 group-hover:text-white/60 transition-colors">
                      [0{index + 1}]
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight text-white group-hover:text-white/95 transition-colors">
                      {act.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs md:text-sm text-white/50 leading-relaxed font-normal">
                      {act.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-white/[0.04] pt-4 text-[10px] text-white/40 uppercase tracking-widest font-semibold">
                    {act.bullets.map((b, idx) => (
                      <span key={idx} className="flex items-center gap-1.5 group-hover:text-white/70 transition-colors">
                        <span className="w-1 h-1 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 transition-colors"></span>
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
        </div>

        {/* SECTION 2: COMMUNITY DOMAINS */}
        <div id="domains" className="flex flex-col gap-12 pt-12 border-t border-white/[0.03]">
          <SectionHeading label="// 04 / Technical Domains" heading="Ecosystem Domains" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 items-stretch">
            {/* Domain Tabs List */}
            <div className="lg:col-span-1 flex flex-col gap-2">
              {domains.map((dom, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDomain(index)}
                  className={`group relative w-full text-left p-4 sm:p-5 transition-all duration-300 font-bold uppercase tracking-widest text-[11px] sm:text-xs flex justify-between items-center cursor-pointer border ${
                    activeDomain === index 
                      ? "bg-emerald-500 text-black border-emerald-500" 
                      : "bg-white/[0.01] hover:bg-white/[0.02] text-white/60 hover:text-white border-white/[0.03] hover:border-emerald-500/30"
                  }`}
                >
                  <span>{dom.name}</span>
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-sm border ${
                    activeDomain === index 
                      ? "border-black/20 text-black/50" 
                      : "border-white/10 text-white/40"
                  }`}>
                    {dom.shortcut}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Domain Terminal Viewer */}
            <div className="lg:col-span-2 relative p-5 sm:p-8 bg-white/[0.01] border border-white/[0.03] flex flex-col justify-between gap-6 sm:gap-8 group">
              {/* Tech Bracket Accent Corners */}
              <span className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-white/20 transition-all duration-300 group-hover:border-emerald-400 group-hover:w-4.5 group-hover:h-4.5"></span>
              <span className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-white/20 transition-all duration-300 group-hover:border-emerald-400 group-hover:w-4.5 group-hover:h-4.5"></span>
              <span className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-white/20 transition-all duration-300 group-hover:border-emerald-400 group-hover:w-4.5 group-hover:h-4.5"></span>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-white/20 transition-all duration-300 group-hover:border-emerald-400 group-hover:w-4.5 group-hover:h-4.5"></span>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2 select-none border-b border-white/[0.04] pb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/60"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/60"></span>
                  <span className="text-[10px] text-white/30 uppercase font-semibold tracking-widest ml-4">
                    Domain_Console: {domains[activeDomain].shortcut}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white">
                    {domains[activeDomain].name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-white/50 leading-relaxed font-normal">
                    {domains[activeDomain].desc}
                  </p>
                </div>
              </div>

              {/* Technologies Badges Grid */}
              <div className="flex flex-wrap gap-2.5 border-t border-white/[0.04] pt-6">
                {domains[activeDomain].tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="text-[9px] font-bold uppercase tracking-widest bg-white/5 hover:bg-emerald-500 hover:text-black text-white/80 border border-white/10 hover:border-emerald-500 px-3 py-1.5 rounded-sm transition-all duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}

/* PlayVideo removed — spacer simplified to marquee + lower-thirds */

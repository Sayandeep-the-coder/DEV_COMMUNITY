"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import SpotlightCard from "./reactbits/SpotlightCard";

interface Speaker {
  name: string;
  role: string;
  avatar: string;
}

interface CommunityEvent {
  id: number;
  title: string;
  tag: string;
  subtags: string[];
  date: string; // ISO date for countdowns
  dateDisplay: string;
  duration: string;
  venue: string;
  image: string;
  desc: string;
  status: "registering" | "upcoming" | "completed";
  actionText: string;
  logs: string[];
  speakers: Speaker[];
}

const EVENTS_DATA: CommunityEvent[] = [
  {
    id: 1,
    title: "Winter of Code 2026",
    tag: "OPEN SOURCE",
    subtags: ["ALL LEVELS", "100% FREE", "MENTORSHIP"],
    date: "2026-12-15T00:00:00Z",
    dateDisplay: "Dec 15, 2026 - Jan 15, 2027",
    duration: "4 Weeks Campaign",
    venue: "Online",
    image: "/winter_code_2026.png",
    desc: "Build. Contribute. Grow. An Open Source Contribution Program by DEV COMMUNITY, KGEC. This winter, take your first step into the world of open source development. Collaborate with fellow developers, contribute to real-world projects, learn industry-standard workflows, and strengthen your technical profile.",
    status: "registering",
    actionText: "REGISTER NOW",
    logs: [
      "SYS: Initializing Winter of Code 2026 registry...",
      "SYS: Mentorship nodes connected (GitHub, Discord)",
      "SYS: Registration channel ACTIVE...",
      "SYS: Awaiting student contribution payload..."
    ],
    speakers: [
    ]
  }
];

export default function Events() {
  const router = useRouter();
  const [showAll, setShowAll] = useState<boolean>(false);
  const [activeModalEventId, setActiveModalEventId] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);

  // Modal Interactive Form State
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    dept: "",
    year: "1st"
  });
  const [formStep, setFormStep] = useState<"input" | "submitting" | "success">("input");
  const [transmittingLogs, setTransmittingLogs] = useState<string[]>([]);
  const [ticketId, setTicketId] = useState<string>("");

  const activeModalEvent = EVENTS_DATA.find((e) => e.id === activeModalEventId);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Countdown calculations
  useEffect(() => {
    if (!mounted || !activeModalEvent) return;

    const calculateCountdown = () => {
      const now = new Date().getTime();
      const target = new Date(activeModalEvent.date).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown("EVENT STARTED");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const dStr = days > 0 ? `${days}d : ` : "";
      const hStr = hours.toString().padStart(2, "0") + "h : ";
      const mStr = minutes.toString().padStart(2, "0") + "m : ";
      const sStr = seconds.toString().padStart(2, "0") + "s";

      setCountdown(`${dStr}${hStr}${mStr}${sStr}`);
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, [activeModalEvent, mounted]);

  // Open modal and reset registration console state
  const handleOpenModal = (id: number) => {
    setActiveModalEventId(id);
    setIsRegistering(false);
    setFormStep("input");
    setFormState({ name: "", email: "", dept: "", year: "1st" });
    setTransmittingLogs([]);
  };

  // Submit registration payload simulation
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.dept || !activeModalEvent) return;

    setFormStep("submitting");

    const steps = [
      "SYS: Registration payload compilation initiated...",
      `SYS: Bundling parameter metadata (${JSON.stringify(formState).length} bytes)`,
      "SYS: Handshaking with devcommunitykgec/api registry...",
      "SYS: Transmitting cryptographic registration nodes...",
      "SYS: Resolving database locks on main server...",
      "SYS: Commit payload authenticated successfully.",
      "SYS: Finalizing credentials ticket keys..."
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < steps.length) {
        setTransmittingLogs((prev) => [...prev, steps[index]]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          const generatedId = `DC-${activeModalEvent.tag.substring(0, 3)}-${Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase()}`;
          setTicketId(generatedId);
          setFormStep("success");
        }, 650);
      }
    }, 250);
  };

  // Display active events (upcoming/registering) first, or all if toggled
  const displayedEvents = showAll
    ? EVENTS_DATA
    : EVENTS_DATA.filter(e => e.status !== "completed");

  return (
    <section
      id="events"
      aria-label="Dev Community KGEC Catalog"
      className="page-section page-section--fit relative bg-[#000000] py-20 sm:py-24 md:py-32 border-t border-white/[0.04] overflow-hidden font-mono text-white select-none"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-500/[0.015] rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-500/[0.015] rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col gap-12 sm:gap-16">

        {/* Section Headers */}
        <div className="flex flex-col gap-4 items-start text-left">
          <SectionHeading label="// 06 / ACTIVE TIMELINE" heading="Apply to open programs" />

          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-[10px] sm:text-xs text-white/50 max-w-2xl font-mono uppercase tracking-widest font-semibold">
            <span>100% FREE</span>
            <span>•</span>
            <span>Intensive learning sprints</span>
            <span>•</span>
            <span>Hands-on projects</span>
            <span>•</span>
            <span>Meet fellow developers</span>
            <span>•</span>
            <span>Mentorship</span>
            <span>•</span>
            <span>IRL & Online Events</span>
          </div>
        </div>

        {/* Card Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch mt-4">
          {displayedEvents.map((event) => (
            <SpotlightCard
              key={event.id}
              spotlightColor="rgba(0, 213, 91, 0.12)"
              className="w-full bg-[#030303] border border-white/[0.04] p-0 rounded-sm overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-emerald-500/20"
            >
              {/* Tech Bracket Corners */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 transition-all duration-300 group-hover:border-emerald-400"></span>
              <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20 transition-all duration-300 group-hover:border-emerald-400"></span>
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20 transition-all duration-300 group-hover:border-emerald-400"></span>
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 transition-all duration-300 group-hover:border-emerald-400"></span>

              <div
                className="flex flex-col flex-grow cursor-pointer"
                onClick={() => handleOpenModal(event.id)}
              >
                {/* Banner Image */}
                <div className="relative overflow-hidden w-full aspect-square border-b border-white/[0.04]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                  {/* Category overlay label */}
                  <span className="absolute top-3 left-3 text-[8px] font-black uppercase tracking-widest bg-emerald-500 text-black px-2 py-0.5 rounded-sm border border-emerald-400/20">
                    {event.tag}
                  </span>
                </div>

                {/* Card Info Content */}
                <div className="p-5 flex flex-col flex-grow gap-4 justify-between">

                  <div className="flex flex-col gap-3">
                    {/* Titles */}
                    <h3 className="text-sm sm:text-base font-black uppercase tracking-tight text-white group-hover:text-emerald-400 transition-colors duration-300 line-clamp-2 min-h-[40px] leading-tight">
                      {event.title}
                    </h3>

                    {/* Subtags */}
                    <div className="flex flex-wrap gap-1.5">
                      {event.subtags.map((sub, i) => (
                        <span
                          key={i}
                          className="text-[8px] font-extrabold uppercase px-2 py-0.5 bg-white/5 border border-white/10 rounded-sm text-white/50 group-hover:text-white/80 transition-colors"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bullet Info Metadata Grid */}
                  <div className="flex flex-col gap-2 border-t border-white/[0.04] pt-4 text-[10px] text-white/40 tracking-wider font-semibold">
                    {/* Date */}
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-emerald-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span className="group-hover:text-white/70 transition-colors">{event.dateDisplay}</span>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-emerald-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span className="group-hover:text-white/70 transition-colors">{event.duration}</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-emerald-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span className="group-hover:text-white/70 transition-colors truncate">{event.venue}</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Action Button at bottom */}
              <div className="px-5 pb-5">
                <button
                  onClick={() => {
                    if (event.status !== "completed" && event.actionText === "REGISTER NOW") {
                      router.push("/events/kwoc/register");
                    } else {
                      handleOpenModal(event.id);
                    }
                  }}
                  className={`w-full text-center py-2.5 rounded-sm font-bold uppercase tracking-widest text-[10px] sm:text-xs cursor-pointer transition-all duration-300 border ${event.status === "completed"
                    ? "border-white/10 hover:border-white/30 text-white/50 hover:text-white"
                    : "bg-[#00d55b] hover:bg-[#00ff66] text-black border-transparent shadow-[0_4px_12px_rgba(0,213,91,0.1)] hover:shadow-[0_4px_20px_rgba(0,213,91,0.25)]"
                    }`}
                >
                  [ {event.status === "completed" ? "View Archive" : event.actionText} ]
                </button>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Toggle Archive button */}
        <div className="flex justify-center mt-4 select-none">
          <button
            onClick={() => setShowAll(!showAll)}
            className="border border-white/10 hover:border-emerald-500/40 text-white/40 hover:text-emerald-400 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] py-3 px-8 rounded-sm cursor-pointer transition-all duration-300"
          >
            {showAll ? "[ SHOW ACTIVE ONLY ]" : "[ SEE ALL EVENTS ]"}
          </button>
        </div>

      </div>

      {/* Cybernetic Console Overlay Modal */}
      <AnimatePresence>
        {activeModalEventId && activeModalEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 select-text"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative w-full max-w-3xl bg-[#030303] border border-white/10 rounded-sm flex flex-col overflow-hidden max-h-[90vh] md:max-h-[85vh]"
            >
              {/* Tech Bracket Corners */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20"></span>
              <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20"></span>
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20"></span>
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20"></span>

              {/* Console Header Bar */}
              <div className="flex items-center justify-between border-b border-white/[0.04] p-4 bg-[#080808]">
                <div className="flex items-center gap-2 select-none">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/60"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/60"></span>
                  <span className="text-[10px] text-white/30 uppercase font-semibold tracking-widest ml-4 font-mono">
                    EVENT_MONITOR: {activeModalEvent.tag}
                  </span>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setActiveModalEventId(null)}
                  className="text-[9px] text-white/40 hover:text-white uppercase tracking-wider font-mono cursor-pointer font-bold select-none"
                >
                  [ ESC_CLOSE ]
                </button>
              </div>

              {/* Console Body scroll container */}
              <div className="p-6 overflow-y-auto flex-1 custom-scrollbar min-h-[350px]">
                <AnimatePresence mode="wait">
                  {!isRegistering ? (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="flex flex-col gap-6"
                    >
                      {/* Title & Stats */}
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="text-[9px] uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-sm border border-emerald-500/20">
                            {activeModalEvent.tag}
                          </span>
                          <span className="text-[9px] text-white/40 uppercase tracking-widest">
                            VENUE: {activeModalEvent.venue}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white leading-tight">
                          {activeModalEvent.title}
                        </h3>
                      </div>

                      {/* T-Minus Live Countdown for active events */}
                      {mounted && activeModalEvent.status !== "completed" && (
                        <div className="bg-emerald-500/[0.02] border border-emerald-500/15 p-3.5 rounded-sm flex items-center justify-between font-mono">
                          <span className="text-[9px] uppercase tracking-wider text-emerald-400/50">
                            REGISTRATION T-MINUS:
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-emerald-400 animate-pulse tracking-widest">
                            {countdown}
                          </span>
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-[11px] sm:text-xs text-white/60 leading-relaxed font-normal">
                        {activeModalEvent.desc}
                      </p>

                      {/* Speakers Details */}
                      {activeModalEvent.speakers && activeModalEvent.speakers.length > 0 && (
                        <div className="flex flex-col gap-3 border-t border-white/[0.04] pt-4">
                          <span className="text-[9px] uppercase tracking-widest text-white/35">
                            HOSTS & SPEAKERS:
                          </span>
                          <div className="flex flex-wrap gap-5">
                            {activeModalEvent.speakers.map((speaker, index) => (
                              <div key={index} className="flex items-center gap-3">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={speaker.avatar}
                                  alt={speaker.name}
                                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10"
                                />
                                <div className="flex flex-col">
                                  <span className="text-[10px] font-bold text-white/90">
                                    {speaker.name}
                                  </span>
                                  <span className="text-[8px] text-white/40 uppercase tracking-wider">
                                    {speaker.role}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Logs Output Panel */}
                      <div className="bg-black/55 border border-white/[0.04] p-4 rounded-sm">
                        <div className="flex justify-between items-center text-[8px] text-white/25 uppercase tracking-widest border-b border-white/[0.02] pb-2 mb-2">
                          <span>SYSTEM OPERATIONS LOGGER</span>
                          <span className="animate-pulse text-emerald-400 font-bold">● OPERATIONAL</span>
                        </div>
                        <div className="flex flex-col gap-1.5 text-[9px] text-white/50 font-mono">
                          {activeModalEvent.logs.map((log, idx) => (
                            <span key={idx} className="block truncate">
                              &gt; {log}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action footer */}
                      <div className="border-t border-white/[0.04] pt-4 flex justify-end gap-3 select-none">
                        <button
                          onClick={() => setActiveModalEventId(null)}
                          className="border border-white/15 hover:border-white/30 text-white/50 hover:text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest py-2.5 px-6 rounded-sm cursor-pointer transition-all"
                        >
                          [ CLOSE ]
                        </button>

                        {activeModalEvent.status !== "completed" ? (
                          <button
                            onClick={() => router.push("/events/kwoc/register")}
                            className="bg-emerald-500 hover:bg-emerald-400 text-black text-[10px] sm:text-xs font-bold uppercase tracking-widest py-2.5 px-6 rounded-sm cursor-pointer transition-all transform active:scale-95 shadow-[0_4px_12px_rgba(0,213,91,0.1)]"
                          >
                            [ REGISTER NOW ]
                          </button>
                        ) : (
                          <a
                            href="https://github.com/devcommunitykgec"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-emerald-500/25 hover:border-emerald-500/60 text-emerald-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest py-2.5 px-6 rounded-sm text-center transition-all"
                          >
                            [ ACCESS CODE & REPO ]
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="register-form"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="flex flex-col justify-between min-h-[350px]"
                    >
                      {formStep === "input" && (
                        <form onSubmit={handleRegisterSubmit} className="flex flex-col justify-between flex-1 gap-6">
                          <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center border-b border-white/[0.04] pb-2 select-none">
                              <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold font-mono">
                                {"// REGISTRATION PROTOCOL INITIATION"}
                              </span>
                              <button
                                type="button"
                                onClick={() => setIsRegistering(false)}
                                className="text-[9px] text-white/40 hover:text-white uppercase tracking-wider cursor-pointer font-bold"
                              >
                                [ BACK TO LOGS ]
                              </button>
                            </div>

                            <p className="text-[10px] text-white/40">
                              Build registration candidate payload parameters. All fields are required.
                            </p>

                            <div className="flex flex-col gap-3.5 mt-2">
                              {/* Name Input */}
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[9px] text-white/50 uppercase tracking-wider">
                                  $ candidate_name:
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={formState.name}
                                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                  placeholder="e.g., Sourav Pal"
                                  className="w-full bg-[#080808] border border-white/[0.06] focus:border-emerald-500/50 rounded-sm p-2 text-xs text-white focus:outline-none placeholder-white/20 transition-all font-mono"
                                />
                              </div>

                              {/* Email Input */}
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[9px] text-white/50 uppercase tracking-wider">
                                  $ academic_email:
                                </label>
                                <input
                                  type="email"
                                  required
                                  value={formState.email}
                                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                  placeholder="e.g., student@kgec.ac.in"
                                  className="w-full bg-[#080808] border border-white/[0.06] focus:border-emerald-500/50 rounded-sm p-2 text-xs text-white focus:outline-none placeholder-white/20 transition-all font-mono"
                                />
                              </div>

                              {/* Dept & Year Grid */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                  <label className="text-[9px] text-white/50 uppercase tracking-wider">
                                    $ department:
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    value={formState.dept}
                                    onChange={(e) => setFormState({ ...formState, dept: e.target.value })}
                                    placeholder="e.g., CSE / IT / ECE"
                                    className="w-full bg-[#080808] border border-white/[0.06] focus:border-emerald-500/50 rounded-sm p-2 text-xs text-white focus:outline-none placeholder-white/20 transition-all font-mono"
                                  />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                  <label className="text-[9px] text-white/50 uppercase tracking-wider">
                                    $ academic_year:
                                  </label>
                                  <select
                                    value={formState.year}
                                    onChange={(e) => setFormState({ ...formState, year: e.target.value })}
                                    className="w-full bg-[#080808] border border-white/[0.06] focus:border-emerald-500/50 rounded-sm p-2.5 text-xs text-white focus:outline-none transition-all font-mono"
                                  >
                                    <option value="1st">1st Year</option>
                                    <option value="2nd">2nd Year</option>
                                    <option value="3rd">3rd Year</option>
                                    <option value="4th">4th Year</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-white/[0.04] pt-4 flex justify-end gap-3 select-none">
                            <button
                              type="button"
                              onClick={() => setIsRegistering(false)}
                              className="border border-white/15 hover:border-white/30 text-white/50 hover:text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest py-2.5 px-6 rounded-sm cursor-pointer transition-all"
                            >
                              [ CANCEL ]
                            </button>
                            <button
                              type="submit"
                              className="bg-emerald-500 hover:bg-emerald-400 text-black text-[10px] sm:text-xs font-bold uppercase tracking-widest py-2.5 px-6 rounded-sm cursor-pointer transition-all transform active:scale-95"
                            >
                              [ TRANSMIT REGISTRATION PAYLOAD ]
                            </button>
                          </div>
                        </form>
                      )}

                      {formStep === "submitting" && (
                        <div className="flex flex-col justify-between flex-1 gap-4">
                          <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold font-mono border-b border-white/[0.04] pb-2">
                            {"// UPLOADING DATA PACKETS TO TARGET REGISTRY"}
                          </span>
                          <div className="bg-black/80 border border-white/[0.05] p-4 rounded-sm flex-1 font-mono text-[10px] leading-relaxed text-white/60 overflow-y-auto h-[220px]">
                            {transmittingLogs.map((log, index) => (
                              <div key={index} className="flex gap-2">
                                <span className="text-emerald-500">&gt;</span>
                                <span>{log}</span>
                              </div>
                            ))}
                            <div className="flex gap-2 items-center text-emerald-400 mt-2">
                              <span className="animate-pulse">&gt;</span>
                              <span>TRANSMITTING BUNDLES...</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {formStep === "success" && (
                        <div className="flex flex-col justify-between flex-1 gap-6">
                          <div className="flex flex-col gap-5 justify-center flex-1">
                            <div className="w-11 h-11 rounded-full border border-emerald-500/30 flex items-center justify-center bg-emerald-500/5 text-emerald-400 animate-pulse text-lg font-bold select-none">
                              ✓
                            </div>
                            <div className="flex flex-col gap-2">
                              <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                                Transmission Received & Logged
                              </h4>
                              <p className="text-[11px] text-white/40 leading-relaxed max-w-lg">
                                Candidate payload successfully pushed. Save the generated Ticket credential key hash for verification logs on entrance.
                              </p>
                            </div>

                            <div className="w-full bg-[#080808] border border-emerald-500/20 p-4 rounded-sm flex flex-col gap-1.5 select-text">
                              <span className="text-[8px] text-white/30 uppercase tracking-widest font-mono">
                                TICKET CREDENTIAL KEY
                              </span>
                              <span className="text-xs sm:text-sm font-bold text-emerald-400 tracking-widest font-mono select-all select-text selection:bg-emerald-500/20">
                                {ticketId}
                              </span>
                            </div>
                          </div>

                          <div className="border-t border-white/[0.04] pt-4 flex justify-end select-none">
                            <button
                              type="button"
                              onClick={() => {
                                setIsRegistering(false);
                                setFormStep("input");
                              }}
                              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest py-2.5 px-6 rounded-sm cursor-pointer transition-all"
                            >
                              [ RETURN TO EVENT DETAIL ]
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

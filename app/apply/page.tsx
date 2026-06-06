import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Applications Closed | Dev Community KGEC",
  description: "Applications are currently closed for Dev Community KGEC.",
};

export default function ApplyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white selection:bg-emerald-400 selection:text-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.14),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.03),_transparent_35%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
      <main className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-20 sm:px-8 lg:px-12">
        <div className="grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <section className="flex flex-col justify-center gap-6">

            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.4em] text-white/40">Dev Community KGEC</p>
              <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl">
                The applications are closed right now.
                <span className="mt-3 block text-emerald-400">We will be back soon.</span>
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                The next intake is not live yet, but the wait will be worth it. Come back for the reopening window, or keep an eye on our socials so you do not miss the next round.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-sm border border-emerald-400/25 bg-emerald-400 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black transition-transform duration-300 hover:scale-[1.02] hover:bg-emerald-300"
              >
                Back to home
              </Link>
              <a
                href="https://www.instagram.com/dc_kgec/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-sm border border-white/12 bg-white/[0.03] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white/85 transition-colors duration-300 hover:border-emerald-400/40 hover:text-white"
              >
                Follow updates
              </a>
            </div>
          </section>

          <aside className="flex items-stretch lg:justify-end">
            <div className="relative w-full max-w-xl overflow-hidden rounded-[28px] border border-emerald-400/15 bg-white/[0.03] p-6 shadow-[0_0_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
              <span className="absolute left-5 top-5 h-3 w-3 rounded-full border border-emerald-400/40 bg-emerald-400/15" />
              <span className="absolute right-5 top-5 h-3 w-3 rounded-full border border-white/10 bg-white/5" />
              <span className="absolute bottom-5 left-5 h-3 w-3 rounded-full border border-white/10 bg-white/5" />
              <span className="absolute bottom-5 right-5 h-3 w-3 rounded-full border border-emerald-400/40 bg-emerald-400/15" />

              <div className="flex h-full flex-col justify-between gap-8">
                <div className="space-y-4">
                  <div className="text-[10px] uppercase tracking-[0.35em] text-white/35">Status board</div>
                  <div className="rounded-2xl border border-white/8 bg-black/40 p-5">
                    <div className="text-xs uppercase tracking-[0.3em] text-emerald-300/90">Next window</div>
                    <div className="mt-3 text-2xl font-black uppercase tracking-tight text-white">Not live yet</div>
                    <div className="mt-2 text-sm leading-6 text-white/60">
                      Applications are closed for now. We are preparing the next opening with fresh opportunities.
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Explore the website",
                    "Explore our projects",
                    "Explore our events",
                    "Connect with builders",
                  ].map((item) => (
                    <div key={item} className="rounded-xl border border-white/8 bg-white/[0.02] px-3 py-3 text-sm text-white/70">
                      {item}
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/5 px-5 py-4 text-sm leading-6 text-white/70">
                  Missed the window? No problem. The community keeps moving, and the next opening will be announced here first.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

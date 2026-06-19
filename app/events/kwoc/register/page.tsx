import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KWoC 2026 Registration | Dev Community KGEC",
  description: "Register for KGEC Winter of Code 2026 and start your open source contribution journey.",
};

export default function KWoCRegisterPage() {
  return (
    <div className="w-full h-screen pt-20 sm:pt-24 bg-black">
      <iframe
        src="https://kwoc.vercel.app/"
        className="w-full h-full border-0"
        title="KWoC 2026 Registration"
        allowFullScreen
      />
    </div>
  );
}

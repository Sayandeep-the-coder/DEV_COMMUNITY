import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply | Dev Community KGEC",
  description: "Apply to join Dev Community KGEC",
};

export default function ApplyPage() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      <iframe
        src="https://dc-hiring.vercel.app/"
        className="w-full h-full border-none"
        title="Apply to Dev Community KGEC"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import WhatWeDo from "./components/WhatWeDo";
import WhyJoin from "./components/WhyJoin";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhatWeDo />
        <WhyJoin />
        {/* <Team /> */}
        {/*<Testimonials /> {/* (commented out for now since we don't have real testimonials yet, can add back later with real quotes) */}
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

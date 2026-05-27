import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import WhatWeDo from "./components/WhatWeDo";
import WhyJoin from "./components/WhyJoin";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
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
        <Team />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}

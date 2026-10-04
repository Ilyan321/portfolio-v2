import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ResearchSpotlight from "@/components/ResearchSpotlight";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Nav />
      <main>
        <Hero />
        <About />
        <ResearchSpotlight />
        <Projects />
        <Experience />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

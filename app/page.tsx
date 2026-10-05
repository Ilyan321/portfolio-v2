import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  let dbProjects = [];
  let dbCerts = [];

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { data: p } = await supabase.from("v2_projects").select("*").order("position", { ascending: true });
      const { data: c } = await supabase.from("v2_certifications").select("*").order("position", { ascending: true });
      if (p) dbProjects = p;
      if (c) dbCerts = c;
    }
  } catch (error) {
    console.error("Supabase fetch error:", error);
  }

  return (
    <div className="relative min-h-screen">
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects dbProjects={dbProjects} />
        <Experience />
        <Certificates dbCerts={dbCerts} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

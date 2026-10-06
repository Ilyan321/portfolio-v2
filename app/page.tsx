import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ResearchSpotlight from "@/components/ResearchSpotlight";
import { supabase } from "@/lib/supabase";
import { 
  site as defaultSite, 
  stats as defaultStats, 
  techStack as defaultTechStack, 
  experience as defaultExperience, 
  education as defaultEducation,
  researchSpotlight as defaultSpotlight 
} from "@/lib/data";

export default async function Home() {
  let dbProjects: any[] = [];
  let dbCerts: any[] = [];
  let dbExperience: any[] = [];
  let dbEducation: any[] = [];
  let dbConfigs: Record<string, any> = {};

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const [
        { data: p },
        { data: c },
        { data: exp },
        { data: edu },
        { data: cfg },
      ] = await Promise.all([
        supabase.from("v2_projects").select("*").order("position", { ascending: true }),
        supabase.from("v2_certifications").select("*").order("position", { ascending: true }),
        supabase.from("v2_experience").select("*").order("position", { ascending: true }),
        supabase.from("v2_education").select("*").order("position", { ascending: true }),
        supabase.from("v2_site_config").select("*"),
      ]);

      if (p) dbProjects = p;
      if (c) dbCerts = c;
      if (exp) dbExperience = exp;
      if (edu) dbEducation = edu;
      if (cfg) {
        cfg.forEach((row: any) => {
          dbConfigs[row.key] = row.data;
        });
      }
    }
  } catch (error) {
    console.error("Supabase fetch error:", error);
  }

  // Merge profile & contacts configs
  const profileData = {
    ...defaultSite,
    ...(dbConfigs["profile"] || {}),
    ...(dbConfigs["contacts"] || {}),
  };

  const statsData = dbConfigs["stats"] || defaultStats;
  const techStackData = dbConfigs["tech_stack"] || defaultTechStack;
  const spotlightData = dbConfigs["spotlight"] || defaultSpotlight;
  const experienceData = dbExperience.length > 0 ? dbExperience : defaultExperience;
  const educationData = dbEducation.length > 0 ? dbEducation : defaultEducation;

  return (
    <div className="relative min-h-screen">
      <Nav dbProfile={profileData} />
      <main>
        <Hero 
          dbProfile={profileData} 
          dbStats={statsData}
          statsCounts={{ 
            projects: dbProjects.length || 12, 
            certs: dbCerts.length || 7, 
            internships: experienceData.length, 
            skills: techStackData.reduce((acc: number, g: any) => acc + (g.items?.length || 0), 0) 
          }} 
        />
        <About 
          dbProfile={profileData}
          dbEducation={educationData}
          dbTechStack={techStackData}
        />
        <Projects dbProjects={dbProjects} />
        <ResearchSpotlight dbSpotlight={spotlightData} />
        <Experience dbExperience={experienceData} />
        <Certificates dbCerts={dbCerts} />
        <Contact dbProfile={profileData} />
      </main>
      <Footer dbProfile={profileData} />
    </div>
  );
}

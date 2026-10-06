import { supabaseAdmin } from "@/lib/supabase";
import { site, stats, techStack, researchSpotlight, experience, education } from "@/lib/data";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPage() {
  // Defaults from lib/data.ts
  let profileData = {
    name: site.name,
    initials: site.initials,
    role: site.role,
    headline: site.headline,
    subline: site.subline,
    about: site.about,
    location: site.location,
    cvUrl: site.cvUrl,
  };

  let contactsData = {
    email: site.email,
    phone: site.phone,
    whatsapp: site.whatsapp,
    github: site.github,
    linkedin: site.linkedin,
    huggingface: site.huggingface,
  };

  let statsData = stats;
  let techStackData = techStack;
  let spotlightData = researchSpotlight;
  let experienceData: any[] = experience.map((e, idx) => ({ id: `default-${idx}`, ...e, position: idx }));
  let educationData: any[] = education.map((e, idx) => ({ id: `default-${idx}`, ...e, position: idx }));
  let projects: any[] = [];
  let certs: any[] = [];
  let indexedDocs: { slug: string; chunkCount: number; sample: string }[] = [];

  let hiddenProjects: string[] = [];
  let hiddenCerts: string[] = [];

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      // 1. Fetch site configs
      const { data: configs } = await supabaseAdmin.from("v2_site_config").select("key, data");
      if (configs) {
        for (const row of configs) {
          if (row.key === "profile" && row.data) profileData = { ...profileData, ...row.data };
          if (row.key === "contacts" && row.data) contactsData = { ...contactsData, ...row.data };
          if (row.key === "stats" && Array.isArray(row.data) && row.data.length > 0) statsData = row.data;
          if (row.key === "tech_stack" && Array.isArray(row.data) && row.data.length > 0) techStackData = row.data;
          if (row.key === "spotlight" && row.data) spotlightData = { ...spotlightData, ...row.data };
          if (row.key === "hidden_items" && row.data) {
            hiddenProjects = row.data.projects || [];
            hiddenCerts = row.data.certs || [];
          }
        }
      }

      // 2. Fetch experience
      const { data: exp } = await supabaseAdmin
        .from("v2_experience")
        .select("*")
        .order("position", { ascending: true });
      if (exp && exp.length > 0) experienceData = exp;

      // 3. Fetch education
      const { data: edu } = await supabaseAdmin
        .from("v2_education")
        .select("*")
        .order("position", { ascending: true });
      if (edu && edu.length > 0) educationData = edu;

      // 4. Fetch projects & certs
      const { data: p } = await supabaseAdmin.from("v2_projects").select("*").order("position", { ascending: true });
      const { data: c } = await supabaseAdmin.from("v2_certifications").select("*").order("position", { ascending: true });

      if (p) {
        projects = p.map((item: any) => ({
          ...item,
          hidden: item.hidden === true || hiddenProjects.includes(item.id)
        }));
      }
      if (c) {
        certs = c.map((item: any) => ({
          ...item,
          hidden: item.hidden === true || hiddenCerts.includes(item.id)
        }));
      }

      // 5. Fetch RAG indexed docs summary
      const { data: docs } = await supabaseAdmin.from("portfolio_documents").select("id, project_slug, chunk_text");
      if (docs) {
        const summary: Record<string, { slug: string; chunkCount: number; sample: string }> = {};
        for (const doc of docs) {
          const slug = doc.project_slug;
          if (!summary[slug]) {
            summary[slug] = {
              slug,
              chunkCount: 0,
              sample: doc.chunk_text ? doc.chunk_text.slice(0, 150) + "..." : "",
            };
          }
          summary[slug].chunkCount += 1;
        }
        indexedDocs = Object.values(summary);
      }
    }
  } catch (error) {
    console.error("Admin data loading error:", error);
  }

  return (
    <AdminDashboardClient
      initialProfile={profileData}
      initialContacts={contactsData}
      initialExperience={experienceData}
      initialEducation={educationData}
      initialStats={statsData}
      initialTechStack={techStackData}
      initialSpotlight={spotlightData}
      initialProjects={projects}
      initialCerts={certs}
      initialIndexedDocs={indexedDocs}
    />
  );
}

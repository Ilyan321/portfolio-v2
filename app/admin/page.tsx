import { supabaseAdmin } from "@/lib/supabase";
import { ProjectsAdmin } from "@/components/admin/ProjectsAdmin";
import { CertsAdmin } from "@/components/admin/CertsAdmin";

export default async function AdminPage() {
  let projects = [];
  let certs = [];
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { data: p } = await supabaseAdmin.from("v2_projects").select("*").order("position", { ascending: true });
      const { data: c } = await supabaseAdmin.from("v2_certifications").select("*").order("position", { ascending: true });
      if (p) projects = p;
      if (c) certs = c;
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="space-y-12 py-8">
      <section>
        <h2 className="text-2xl font-bold mb-6">Projects</h2>
        <ProjectsAdmin initialProjects={projects || []} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Certifications</h2>
        <CertsAdmin initialCerts={certs || []} />
      </section>
    </div>
  );
}

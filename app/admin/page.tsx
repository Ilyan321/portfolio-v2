import { supabaseAdmin } from "@/lib/supabase";
import { ProjectsAdmin } from "@/components/admin/ProjectsAdmin";
import { CertsAdmin } from "@/components/admin/CertsAdmin";

export default async function AdminPage() {
  const { data: projects } = await supabaseAdmin.from("v2_projects").select("*").order("position", { ascending: true });
  const { data: certs } = await supabaseAdmin.from("v2_certifications").select("*").order("position", { ascending: true });

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

import { supabaseAdmin } from "@/lib/supabase";
import { ProjectsAdmin } from "@/components/admin/ProjectsAdmin";
import { CertsAdmin } from "@/components/admin/CertsAdmin";
import { RAGAdmin } from "@/components/admin/RAGAdmin";

export default async function AdminPage() {
  let projects = [];
  let certs = [];
  let indexedDocs: { slug: string; chunkCount: number; sample: string }[] = [];

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { data: p } = await supabaseAdmin.from("v2_projects").select("*").order("position", { ascending: true });
      const { data: c } = await supabaseAdmin.from("v2_certifications").select("*").order("position", { ascending: true });
      const { data: docs } = await supabaseAdmin.from("portfolio_documents").select("id, project_slug, chunk_text");

      if (p) projects = p;
      if (c) certs = c;

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
    console.error(error);
  }

  return (
    <div className="space-y-16 py-8">
      <section>
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono-label text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>01 //</span>
          <h2 className="font-display text-2xl font-medium" style={{ color: "var(--ink)" }}>Manage Projects</h2>
        </div>
        <ProjectsAdmin initialProjects={projects || []} />
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono-label text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>02 //</span>
          <h2 className="font-display text-2xl font-medium" style={{ color: "var(--ink)" }}>Manage Certifications</h2>
        </div>
        <CertsAdmin initialCerts={certs || []} />
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono-label text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>03 //</span>
          <h2 className="font-display text-2xl font-medium" style={{ color: "var(--ink)" }}>RAG Brain & Vector Ingestion</h2>
        </div>
        <RAGAdmin initialIndexedDocs={indexedDocs} />
      </section>
    </div>
  );
}

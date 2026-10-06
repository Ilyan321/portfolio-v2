"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

function checkAuth() {
  const token = cookies().get('admin_token')?.value;
  if (token !== 'authenticated') {
    throw new Error('Unauthorized');
  }
}

export async function updateProjectPositions(updates: { id: string; position: number }[]) {
  checkAuth();
  for (const update of updates) {
    await supabaseAdmin.from("v2_projects").update({ position: update.position }).eq("id", update.id);
  }
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function createProject(data: any) {
  checkAuth();
  const { data: newProj, error } = await supabaseAdmin.from("v2_projects").insert([data]).select().single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
  return newProj;
}

export async function deleteProject(id: string) {
  checkAuth();
  await supabaseAdmin.from("v2_projects").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateCertPositions(updates: { id: string; position: number }[]) {
  checkAuth();
  for (const update of updates) {
    await supabaseAdmin.from("v2_certifications").update({ position: update.position }).eq("id", update.id);
  }
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function createCert(data: any) {
  checkAuth();
  const { data: newCert, error } = await supabaseAdmin.from("v2_certifications").insert([data]).select().single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
  return newCert;
}

export async function deleteCert(id: string) {
  checkAuth();
  await supabaseAdmin.from("v2_certifications").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateProject(id: string, data: any) {
  checkAuth();
  const { data: updatedProj, error } = await supabaseAdmin.from("v2_projects").update(data).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
  return updatedProj;
}

export async function updateCert(id: string, data: any) {
  checkAuth();
  const { data: updatedCert, error } = await supabaseAdmin.from("v2_certifications").update(data).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
  return updatedCert;
}

// ----------------------------------------------------
// RAG & Vector Knowledge Base Server Actions
// ----------------------------------------------------

export async function fetchGitHubRepos() {
  checkAuth();
  const ghToken = process.env.GITHUB_TOKEN;
  if (!ghToken) {
    throw new Error("Missing GITHUB_TOKEN in environment.");
  }
  const res = await fetch("https://api.github.com/user/repos?per_page=100&sort=updated", {
    headers: {
      Authorization: `Bearer ${ghToken}`,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "IlyanOS-Admin",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }
  const repos = await res.json();
  return repos.map((r: any) => ({
    id: r.id,
    name: r.name,
    full_name: r.full_name,
    private: r.private,
    description: r.description || "No description provided.",
    html_url: r.html_url,
    default_branch: r.default_branch,
    updated_at: r.updated_at,
  }));
}

export async function fetchIndexedDocuments() {
  checkAuth();
  const { data, error } = await supabaseAdmin
    .from("portfolio_documents")
    .select("id, project_slug, chunk_text");
  
  if (error) {
    throw new Error(error.message);
  }
  
  const summary: Record<string, { slug: string; chunkCount: number; sample: string }> = {};
  for (const doc of data || []) {
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
  
  return Object.values(summary);
}

export async function deleteIndexedRepo(slug: string) {
  checkAuth();
  const { error } = await supabaseAdmin
    .from("portfolio_documents")
    .delete()
    .eq("project_slug", slug);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  return { success: true };
}

function chunkText(text: string, chunkSize = 1000, overlap = 200): string[] {
  const chunks: string[] = [];
  let start = 0;
  while (start < text.length) {
    const end = start + chunkSize;
    chunks.push(text.slice(start, end));
    start += (chunkSize - overlap);
  }
  return chunks;
}

async function getEmbeddingsBatch(texts: string[], hfToken: string): Promise<number[][]> {
  const HF_API_URL = "https://router.huggingface.co/hf-inference/models/BAAI/bge-small-en-v1.5";
  const res = await fetch(HF_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${hfToken}`,
    },
    body: JSON.stringify({ inputs: texts }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HF Embedding Error: ${res.status} - ${err}`);
  }
  return await res.json();
}

export async function ingestGitHubRepo(repoFullName: string, customSlug?: string) {
  checkAuth();
  const ghToken = process.env.GITHUB_TOKEN;
  const hfToken = process.env.HF_TOKEN;

  if (!ghToken) throw new Error("Missing GITHUB_TOKEN in environment.");
  if (!hfToken) throw new Error("Missing HF_TOKEN in environment.");

  // Fetch README from GitHub API
  const readmeRes = await fetch(`https://api.github.com/repos/${repoFullName}/readme`, {
    headers: {
      Authorization: `Bearer ${ghToken}`,
      Accept: "application/vnd.github.v3.raw",
      "User-Agent": "IlyanOS-Admin",
    },
    cache: "no-store",
  });

  if (!readmeRes.ok) {
    if (readmeRes.status === 404) {
      throw new Error(`No README found in repository ${repoFullName}`);
    }
    throw new Error(`GitHub API Error: ${readmeRes.status} ${readmeRes.statusText}`);
  }

  const readmeContent = await readmeRes.text();
  if (!readmeContent || readmeContent.trim().length === 0) {
    throw new Error(`README is empty for ${repoFullName}`);
  }

  const slug = customSlug || repoFullName.split("/")[1] || repoFullName;
  const chunks = chunkText(readmeContent);

  // Ingest in batches of 4
  const rows: { project_slug: string; chunk_text: string; embedding: number[] }[] = [];
  for (let i = 0; i < chunks.length; i += 4) {
    const batch = chunks.slice(i, i + 4);
    const embeddings = await getEmbeddingsBatch(batch, hfToken);
    for (let j = 0; j < batch.length; j++) {
      rows.push({
        project_slug: slug,
        chunk_text: batch[j],
        embedding: embeddings[j],
      });
    }
  }

  // Delete previous vectors for this slug
  await supabaseAdmin.from("portfolio_documents").delete().eq("project_slug", slug);

  // Insert new vectors
  const { error: insertErr } = await supabaseAdmin.from("portfolio_documents").insert(rows);
  if (insertErr) {
    throw new Error(`Supabase vector insert error: ${insertErr.message}`);
  }

  revalidatePath("/admin");
  return { success: true, slug, chunksCount: rows.length };
}

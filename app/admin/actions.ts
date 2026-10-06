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

export async function toggleProjectVisibility(id: string, isHidden: boolean) {
  checkAuth();
  try {
    const { data: updatedProj } = await supabaseAdmin
      .from("v2_projects")
      .update({ hidden: isHidden })
      .eq("id", id)
      .select()
      .single();
    
    // Also sync to hidden_items fallback in v2_site_config
    const { data: cfgRow } = await supabaseAdmin.from("v2_site_config").select("data").eq("key", "hidden_items").single();
    const currentHidden = cfgRow?.data?.projects || [];
    const newHiddenList = isHidden 
      ? Array.from(new Set([...currentHidden, id])) 
      : currentHidden.filter((item: string) => item !== id);
    
    await supabaseAdmin.from("v2_site_config").upsert({
      key: "hidden_items",
      data: { ...(cfgRow?.data || {}), projects: newHiddenList },
      updated_at: new Date().toISOString()
    });

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true, hidden: isHidden, project: updatedProj };
  } catch (err: any) {
    console.error("toggleProjectVisibility error:", err);
    return { success: false, error: err.message };
  }
}

export async function updateCert(id: string, data: any) {
  checkAuth();
  const { data: updatedCert, error } = await supabaseAdmin.from("v2_certifications").update(data).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
  return updatedCert;
}

export async function toggleCertVisibility(id: string, isHidden: boolean) {
  checkAuth();
  try {
    const { data: updatedCert } = await supabaseAdmin
      .from("v2_certifications")
      .update({ hidden: isHidden })
      .eq("id", id)
      .select()
      .single();
    
    // Also sync to hidden_items fallback in v2_site_config
    const { data: cfgRow } = await supabaseAdmin.from("v2_site_config").select("data").eq("key", "hidden_items").single();
    const currentHidden = cfgRow?.data?.certs || [];
    const newHiddenList = isHidden 
      ? Array.from(new Set([...currentHidden, id])) 
      : currentHidden.filter((item: string) => item !== id);
    
    await supabaseAdmin.from("v2_site_config").upsert({
      key: "hidden_items",
      data: { ...(cfgRow?.data || {}), certs: newHiddenList },
      updated_at: new Date().toISOString()
    });

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true, hidden: isHidden, cert: updatedCert };
  } catch (err: any) {
    console.error("toggleCertVisibility error:", err);
    return { success: false, error: err.message };
  }
}

// ----------------------------------------------------
// Dynamic Site Configuration Server Actions
// ----------------------------------------------------

export async function saveSiteConfig(key: string, data: any) {
  try {
    checkAuth();
    const { error } = await supabaseAdmin.from("v2_site_config").upsert({
      key,
      data,
      updated_at: new Date().toISOString(),
    });
    if (error) return { success: false, error: error.message };
    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ----------------------------------------------------
// Experience Timeline Server Actions
// ----------------------------------------------------

export async function createExperience(data: any) {
  checkAuth();
  const { data: newExp, error } = await supabaseAdmin.from("v2_experience").insert([data]).select().single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
  return newExp;
}

export async function updateExperience(id: string, data: any) {
  checkAuth();
  const { data: updatedExp, error } = await supabaseAdmin.from("v2_experience").update(data).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
  return updatedExp;
}

export async function deleteExperience(id: string) {
  checkAuth();
  await supabaseAdmin.from("v2_experience").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateExperiencePositions(updates: { id: string; position: number }[]) {
  checkAuth();
  for (const update of updates) {
    await supabaseAdmin.from("v2_experience").update({ position: update.position }).eq("id", update.id);
  }
  revalidatePath("/");
  revalidatePath("/admin");
}

// ----------------------------------------------------
// Education Server Actions
// ----------------------------------------------------

export async function createEducation(data: any) {
  checkAuth();
  const { data: newEdu, error } = await supabaseAdmin.from("v2_education").insert([data]).select().single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
  return newEdu;
}

export async function updateEducation(id: string, data: any) {
  checkAuth();
  const { data: updatedEdu, error } = await supabaseAdmin.from("v2_education").update(data).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
  return updatedEdu;
}

export async function deleteEducation(id: string) {
  checkAuth();
  await supabaseAdmin.from("v2_education").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateEducationPositions(updates: { id: string; position: number }[]) {
  checkAuth();
  for (const update of updates) {
    await supabaseAdmin.from("v2_education").update({ position: update.position }).eq("id", update.id);
  }
  revalidatePath("/");
  revalidatePath("/admin");
}

// ----------------------------------------------------
// RAG & Vector Knowledge Base Server Actions
// ----------------------------------------------------

export async function fetchGitHubRepos() {
  try {
    checkAuth();
    const ghToken = process.env.GITHUB_TOKEN;
    if (!ghToken) {
      return {
        success: false,
        error: "Missing GITHUB_TOKEN environment variable on Vercel. Please add GITHUB_TOKEN in your Vercel Dashboard (Settings > Environment Variables) and redeploy.",
      };
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
      const errText = await res.text();
      return { success: false, error: `GitHub API error ${res.status}: ${errText || res.statusText}` };
    }
    const repos = await res.json();
    const formatted = repos.map((r: any) => ({
      id: r.id,
      name: r.name,
      full_name: r.full_name,
      private: r.private,
      description: r.description || "No description provided.",
      html_url: r.html_url,
      default_branch: r.default_branch,
      updated_at: r.updated_at,
    }));
    return { success: true, repos: formatted };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to fetch GitHub repositories." };
  }
}

export async function fetchIndexedDocuments() {
  try {
    checkAuth();
    const { data, error } = await supabaseAdmin
      .from("portfolio_documents")
      .select("id, project_slug, chunk_text");
    
    if (error) {
      return { success: false, error: `Supabase query error: ${error.message}` };
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

    // Query v2_projects to map portfolio titles to their GitHub repos
    const repoMap: Record<string, string> = {};
    try {
      const { data: projectData } = await supabaseAdmin
        .from("v2_projects")
        .select("title, github");

      for (const p of projectData || []) {
        if (p.title && p.github) {
          const cleanUrl = p.github.replace(/\/$/, "");
          const parts = cleanUrl.split("/");
          if (parts.length >= 2) {
            const repoFullName = parts.slice(-2).join("/");
            repoMap[p.title] = repoFullName;
          }
        }
      }
    } catch {
      // Non-fatal if v2_projects fetch fails
    }
    
    return { success: true, docs: Object.values(summary), repoMap };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to fetch indexed documents." };
  }
}

export async function deleteIndexedRepo(slug: string) {
  try {
    checkAuth();
    const { error } = await supabaseAdmin
      .from("portfolio_documents")
      .delete()
      .eq("project_slug", slug);
    if (error) return { success: false, error: error.message };
    revalidatePath("/admin");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

function cleanUtf16(str: string): string {
  if (typeof (str as any).toWellFormed === "function") {
    return (str as any).toWellFormed();
  }
  return str.replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g, "");
}

function chunkText(text: string, maxChunkSize = 800): string[] {
  const cleaned = cleanUtf16(text.replace(/\r\n/g, "\n"));
  const paragraphs = cleaned.split(/\n\n+/);
  const chunks: string[] = [];
  let currentChunk = "";

  for (const para of paragraphs) {
    const trimmed = para.trim();
    if (!trimmed) continue;

    if (currentChunk.length + trimmed.length + 2 <= maxChunkSize) {
      currentChunk = currentChunk ? `${currentChunk}\n\n${trimmed}` : trimmed;
    } else {
      if (currentChunk) {
        chunks.push(cleanUtf16(currentChunk));
      }
      if (trimmed.length > maxChunkSize) {
        const lines = trimmed.split(/\n+/);
        let subChunk = "";
        for (const line of lines) {
          if (subChunk.length + line.length + 1 <= maxChunkSize) {
            subChunk = subChunk ? `${subChunk}\n${line}` : line;
          } else {
            if (subChunk) chunks.push(cleanUtf16(subChunk));
            if (line.length > maxChunkSize) {
              const words = line.split(" ");
              let wordChunk = "";
              for (const w of words) {
                if (wordChunk.length + w.length + 1 <= maxChunkSize) {
                  wordChunk = wordChunk ? `${wordChunk} ${w}` : w;
                } else {
                  if (wordChunk) chunks.push(cleanUtf16(wordChunk));
                  wordChunk = w;
                }
              }
              subChunk = wordChunk;
            } else {
              subChunk = line;
            }
          }
        }
        currentChunk = subChunk;
      } else {
        currentChunk = trimmed;
      }
    }
  }

  if (currentChunk) {
    chunks.push(cleanUtf16(currentChunk));
  }

  return chunks.length > 0 ? chunks : [cleanUtf16(cleaned.slice(0, maxChunkSize))];
}

async function getEmbeddingsBatch(texts: string[], hfToken: string): Promise<number[][]> {
  const HF_API_URL = "https://router.huggingface.co/hf-inference/models/BAAI/bge-small-en-v1.5";
  const sanitizedTexts = texts.map((t) => cleanUtf16(t));
  const res = await fetch(HF_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${hfToken}`,
    },
    body: JSON.stringify({ inputs: sanitizedTexts }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HF Embedding Error: ${res.status} - ${err}`);
  }
  return await res.json();
}

export async function ingestGitHubRepo(repoFullName: string, customSlug?: string) {
  try {
    checkAuth();
    const ghToken = process.env.GITHUB_TOKEN;
    const hfToken = process.env.HF_TOKEN;

    if (!ghToken) {
      return { success: false, error: "Missing GITHUB_TOKEN on Vercel. Please add GITHUB_TOKEN to Vercel Environment Variables." };
    }
    if (!hfToken) {
      return { success: false, error: "Missing HF_TOKEN on Vercel. Please add HF_TOKEN to Vercel Environment Variables." };
    }

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
        return { success: false, error: `No README found in repository ${repoFullName}` };
      }
      return { success: false, error: `GitHub API Error: ${readmeRes.status} ${readmeRes.statusText}` };
    }

    const readmeContent = await readmeRes.text();
    if (!readmeContent || readmeContent.trim().length === 0) {
      return { success: false, error: `README is empty for ${repoFullName}` };
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
      return { success: false, error: `Supabase vector insert error: ${insertErr.message}` };
    }

    revalidatePath("/admin");
    return { success: true, slug, chunksCount: rows.length };
  } catch (err: any) {
    return { success: false, error: err.message || "Unknown error during ingestion." };
  }
}

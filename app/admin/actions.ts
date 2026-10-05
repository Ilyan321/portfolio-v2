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

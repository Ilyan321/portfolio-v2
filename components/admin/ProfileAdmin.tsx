"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveSiteConfig } from "@/app/admin/actions";

export type ProfileData = {
  name: string;
  initials: string;
  role: string;
  headline: string;
  subline: string;
  about: string;
  location: string;
  cvUrl: string;
};

export type ContactsData = {
  email: string;
  phone: string;
  whatsapp: string;
  github: string;
  linkedin: string;
  huggingface: string;
};

export function ProfileAdmin({
  initialProfile,
  initialContacts,
}: {
  initialProfile: ProfileData;
  initialContacts: ContactsData;
}) {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [contacts, setContacts] = useState<ContactsData>(initialContacts);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setStatusMsg(null);

    try {
      const [resProfile, resContacts] = await Promise.all([
        saveSiteConfig("profile", profile),
        saveSiteConfig("contacts", contacts),
      ]);

      if (!resProfile.success || !resContacts.success) {
        setStatusMsg({
          type: "error",
          text: `Save failed: ${resProfile.error || resContacts.error || "Unknown error"}`,
        });
      } else {
        setStatusMsg({
          type: "success",
          text: "Profile & Contacts updated live on homepage!",
        });
        router.refresh();
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to save profile." });
    } finally {
      setIsSaving(false);
      setTimeout(() => setStatusMsg(null), 5000);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 font-body">
      {/* 1. Identity & Core Hero */}
      <div
        className="p-6 md:p-8 rounded-sm border space-y-6"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
      >
        <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: "var(--border)" }}>
          <div>
            <h3 className="font-mono-label text-sm uppercase tracking-widest" style={{ color: "var(--ink)" }}>
              &gt; Hero Identity & Bio //
            </h3>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
              Primary bio, headlines, and roles displayed in the hero section and metadata.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="space-y-1 sm:col-span-2">
            <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              Full Name
            </label>
            <input
              type="text"
              required
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full font-body text-xs rounded-sm border p-3 outline-none transition-all focus:border-emerald-500"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              Initials / Logo Badge
            </label>
            <input
              type="text"
              required
              value={profile.initials}
              onChange={(e) => setProfile({ ...profile, initials: e.target.value })}
              className="w-full font-mono text-xs rounded-sm border p-3 outline-none transition-all focus:border-emerald-500"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            Primary Role / Title Badge
          </label>
          <input
            type="text"
            required
            value={profile.role}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            className="w-full font-body text-xs rounded-sm border p-3 outline-none transition-all focus:border-emerald-500"
            style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
          />
        </div>

        <div className="space-y-1">
          <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            Hero Headline
          </label>
          <input
            type="text"
            required
            value={profile.headline}
            onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
            className="w-full font-body text-xs rounded-sm border p-3 outline-none transition-all focus:border-emerald-500"
            style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
          />
        </div>

        <div className="space-y-1">
          <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            Hero Subline / Specialties
          </label>
          <input
            type="text"
            required
            value={profile.subline}
            onChange={(e) => setProfile({ ...profile, subline: e.target.value })}
            className="w-full font-body text-xs rounded-sm border p-3 outline-none transition-all focus:border-emerald-500"
            style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
          />
        </div>

        <div className="space-y-1">
          <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            About Bio Paragraph
          </label>
          <textarea
            required
            rows={4}
            value={profile.about}
            onChange={(e) => setProfile({ ...profile, about: e.target.value })}
            className="w-full font-body text-xs rounded-sm border p-3 outline-none transition-all focus:border-emerald-500 leading-relaxed"
            style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              Location
            </label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="w-full font-body text-xs rounded-sm border p-3 outline-none transition-all focus:border-emerald-500"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              CV / Resume Download URL
            </label>
            <input
              type="text"
              value={profile.cvUrl}
              onChange={(e) => setProfile({ ...profile, cvUrl: e.target.value })}
              placeholder="/cv.pdf or Google Drive link"
              className="w-full font-mono text-xs rounded-sm border p-3 outline-none transition-all focus:border-emerald-500"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
            />
          </div>
        </div>
      </div>

      {/* 2. Socials & Contacts */}
      <div
        className="p-6 md:p-8 rounded-sm border space-y-6"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
      >
        <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: "var(--border)" }}>
          <div>
            <h3 className="font-mono-label text-sm uppercase tracking-widest" style={{ color: "var(--ink)" }}>
              &gt; Socials, Channels & Direct Links //
            </h3>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
              Public profile links displayed across header, footer, contact modal, and interactive terminal.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              Email Address
            </label>
            <input
              type="email"
              value={contacts.email}
              onChange={(e) => setContacts({ ...contacts, email: e.target.value })}
              className="w-full font-mono text-xs rounded-sm border p-3 outline-none transition-all focus:border-emerald-500"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              Phone Number
            </label>
            <input
              type="text"
              value={contacts.phone}
              onChange={(e) => setContacts({ ...contacts, phone: e.target.value })}
              className="w-full font-mono text-xs rounded-sm border p-3 outline-none transition-all focus:border-emerald-500"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              WhatsApp Link
            </label>
            <input
              type="text"
              value={contacts.whatsapp}
              onChange={(e) => setContacts({ ...contacts, whatsapp: e.target.value })}
              placeholder="https://wa.me/..."
              className="w-full font-mono text-xs rounded-sm border p-3 outline-none transition-all focus:border-emerald-500"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              GitHub Profile URL
            </label>
            <input
              type="url"
              value={contacts.github}
              onChange={(e) => setContacts({ ...contacts, github: e.target.value })}
              className="w-full font-mono text-xs rounded-sm border p-3 outline-none transition-all focus:border-emerald-500"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              value={contacts.linkedin}
              onChange={(e) => setContacts({ ...contacts, linkedin: e.target.value })}
              className="w-full font-mono text-xs rounded-sm border p-3 outline-none transition-all focus:border-emerald-500"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              Hugging Face Profile URL
            </label>
            <input
              type="url"
              value={contacts.huggingface}
              onChange={(e) => setContacts({ ...contacts, huggingface: e.target.value })}
              className="w-full font-mono text-xs rounded-sm border p-3 outline-none transition-all focus:border-emerald-500"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
            />
          </div>
        </div>
      </div>

      {/* Save Action Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div>
          {statusMsg && (
            <span
              className={`font-mono-label text-xs uppercase tracking-wider ${
                statusMsg.type === "success" ? "text-emerald-500 font-semibold" : "text-red-500"
              }`}
            >
              {statusMsg.type === "success" ? "✓ " : "✕ "}
              {statusMsg.text}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="w-full sm:w-auto font-mono-label relative overflow-hidden rounded-sm border px-8 py-3.5 text-xs uppercase tracking-widest transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--accent)", color: "var(--bg)" }}
        >
          {isSaving ? "Saving Live Changes..." : "[ Save Profile & Contacts ]"}
        </button>
      </div>
    </form>
  );
}

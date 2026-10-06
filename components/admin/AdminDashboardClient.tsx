"use client";

import { useState } from "react";
import { ProfileAdmin, ProfileData, ContactsData } from "./ProfileAdmin";
import { ExperienceAdmin, ExperienceItem } from "./ExperienceAdmin";
import { EducationAdmin, EducationItem } from "./EducationAdmin";
import { SkillsAdmin, StatItem, TechGroup } from "./SkillsAdmin";
import { SpotlightAdmin, ResearchSpotlightData } from "./SpotlightAdmin";
import { ProjectsAdmin } from "./ProjectsAdmin";
import { CertsAdmin } from "./CertsAdmin";
import { RAGAdmin } from "./RAGAdmin";

type AdminDashboardProps = {
  initialProfile: ProfileData;
  initialContacts: ContactsData;
  initialExperience: ExperienceItem[];
  initialEducation: EducationItem[];
  initialStats: StatItem[];
  initialTechStack: TechGroup[];
  initialSpotlight: ResearchSpotlightData;
  initialProjects: any[];
  initialCerts: any[];
  initialIndexedDocs: any[];
};

const TABS = [
  { id: "profile", label: "01 // Profile & Bio", icon: "👤" },
  { id: "experience", label: "02 // Experience", icon: "💼" },
  { id: "education", label: "03 // Education", icon: "🎓" },
  { id: "skills", label: "04 // Skills & Metrics", icon: "⚡" },
  { id: "spotlight", label: "05 // Research Spotlight", icon: "🔬" },
  { id: "projects", label: "06 // Projects", icon: "📂" },
  { id: "certs", label: "07 // Certifications", icon: "📜" },
  { id: "rag", label: "08 // RAG Brain", icon: "🧠" },
];

export function AdminDashboardClient(props: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<string>("profile");

  return (
    <div className="space-y-8 py-4">
      {/* Top Admin Navigation Tabs */}
      <div
        className="flex items-center gap-1.5 p-1.5 rounded-sm border overflow-x-auto no-scrollbar"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-sm font-mono-label text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? "font-semibold shadow-sm"
                  : "opacity-70 hover:opacity-100 hover:bg-white/[0.02]"
              }`}
              style={{
                backgroundColor: isActive ? "var(--bg)" : "transparent",
                color: isActive ? "var(--accent)" : "var(--muted)",
                border: isActive ? "1px solid var(--border)" : "1px solid transparent",
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Panel */}
      <div className="transition-opacity duration-200">
        {activeTab === "profile" && (
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono-label text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                01 //
              </span>
              <h2 className="font-display text-2xl font-medium" style={{ color: "var(--ink)" }}>
                Profile, Bio & Social Links
              </h2>
            </div>
            <ProfileAdmin
              initialProfile={props.initialProfile}
              initialContacts={props.initialContacts}
            />
          </section>
        )}

        {activeTab === "experience" && (
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono-label text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                02 //
              </span>
              <h2 className="font-display text-2xl font-medium" style={{ color: "var(--ink)" }}>
                Work Experience & Timeline
              </h2>
            </div>
            <ExperienceAdmin initialExperience={props.initialExperience} />
          </section>
        )}

        {activeTab === "education" && (
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono-label text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                03 //
              </span>
              <h2 className="font-display text-2xl font-medium" style={{ color: "var(--ink)" }}>
                Education & Academic History
              </h2>
            </div>
            <EducationAdmin initialEducation={props.initialEducation} />
          </section>
        )}

        {activeTab === "skills" && (
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono-label text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                04 //
              </span>
              <h2 className="font-display text-2xl font-medium" style={{ color: "var(--ink)" }}>
                Skills, Tech Stack & Metrics
              </h2>
            </div>
            <SkillsAdmin
              initialStats={props.initialStats}
              initialTechStack={props.initialTechStack}
            />
          </section>
        )}

        {activeTab === "spotlight" && (
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono-label text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                05 //
              </span>
              <h2 className="font-display text-2xl font-medium" style={{ color: "var(--ink)" }}>
                Featured Research Spotlight
              </h2>
            </div>
            <SpotlightAdmin initialSpotlight={props.initialSpotlight} />
          </section>
        )}

        {activeTab === "projects" && (
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono-label text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                06 //
              </span>
              <h2 className="font-display text-2xl font-medium" style={{ color: "var(--ink)" }}>
                Manage Projects
              </h2>
            </div>
            <ProjectsAdmin initialProjects={props.initialProjects || []} />
          </section>
        )}

        {activeTab === "certs" && (
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono-label text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                07 //
              </span>
              <h2 className="font-display text-2xl font-medium" style={{ color: "var(--ink)" }}>
                Manage Certifications
              </h2>
            </div>
            <CertsAdmin initialCerts={props.initialCerts || []} />
          </section>
        )}

        {activeTab === "rag" && (
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono-label text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                08 //
              </span>
              <h2 className="font-display text-2xl font-medium" style={{ color: "var(--ink)" }}>
                RAG Brain & Vector Ingestion
              </h2>
            </div>
            <RAGAdmin initialIndexedDocs={props.initialIndexedDocs || []} />
          </section>
        )}
      </div>
    </div>
  );
}

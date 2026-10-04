import { certificates } from "@/lib/data";
import ScanLine from "./ScanLine";
import { Award, CheckCircle2 } from "./Icons";

export default function Certificates() {
  return (
    <section id="certificates" className="relative border-t py-28" style={{ borderColor: "var(--border)" }}>
      <ScanLine targetId="certificates" />

      <div className="container-px">
        <div className="max-w-2xl">
          <span className="font-mono-label text-xs uppercase" style={{ color: "var(--accent)" }}>
            05 // Verification & Credentials
          </span>
          <h2
            className="font-display mt-3 text-3xl font-medium tracking-tight md:text-4xl"
            style={{ color: "var(--ink)" }}
          >
            Official Industry Certifications
          </h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Verified professional credentials in Cybersecurity, Generative AI engineering, Prompt Optimization, and Agile frameworks.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certificates.map((cert) => (
            <div
              key={cert.title}
              className="flex flex-col justify-between rounded-sm border p-6 transition-all duration-300 hover:border-accent hover:-translate-y-1"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono-label text-[10px] uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                    {cert.tag}
                  </span>
                  <Award className="h-4 w-4" style={{ color: "var(--accent)" }} />
                </div>

                <h3 className="font-display mt-3 text-base font-semibold" style={{ color: "var(--ink)" }}>
                  {cert.title}
                </h3>
                <div className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
                  {cert.issuer} · {cert.date}
                </div>

                <div className="mt-4 space-y-1.5 border-t pt-3" style={{ borderColor: "var(--border)" }}>
                  {cert.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-1.5 font-mono-label text-[11px]" style={{ color: "var(--ink)" }}>
                      <CheckCircle2 className="h-3 w-3" style={{ color: "var(--accent)" }} />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t pt-3" style={{ borderColor: "var(--border)" }}>
                <span className="font-mono-label text-[10px]" style={{ color: "var(--muted)" }}>
                  ID: {cert.credentialId}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

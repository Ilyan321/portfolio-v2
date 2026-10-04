"use client";

import { useState } from "react";
import { site } from "@/lib/data";
import ScanLine from "./ScanLine";
import { Mail, MessageSquare, Linkedin, Github, Send, CheckCircle } from "./Icons";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbw0pvi3omFSFXjAYEM9POUHnbq0ChZQvG2Z7W4IyzilYK6wB3jNDdDFiJ1RJgIjwz8WBQ/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: formData,
        }
      );
      setSubmitted(true);
      form.reset();
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative border-t py-28" style={{ borderColor: "var(--border)" }}>
      <ScanLine targetId="contact" />

      <div className="container-px">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left direct contact info */}
          <div className="lg:col-span-5">
            <span className="font-mono-label text-xs uppercase" style={{ color: "var(--accent)" }}>
              06 // Get In Touch
            </span>
            <h2
              className="font-display mt-3 text-3xl font-medium tracking-tight md:text-4xl"
              style={{ color: "var(--ink)" }}
            >
              Let&apos;s build something impactful.
            </h2>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Open to engineering opportunities, Generative AI research collaborations, and full-stack contracts across global and remote teams.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`mailto:${site.email}`}
                className="chip flex items-center gap-3 rounded-sm border p-4 font-mono-label text-xs"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)", color: "var(--ink)" }}
              >
                <Mail className="h-4 w-4" />
                <span>{site.email}</span>
              </a>

              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="chip flex items-center gap-3 rounded-sm border p-4 font-mono-label text-xs"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)", color: "var(--ink)" }}
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp: {site.phone}</span>
              </a>

              <div className="flex gap-4 pt-2">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chip flex flex-1 items-center justify-center gap-2 rounded-sm border py-3 font-mono-label text-xs"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)", color: "var(--ink)" }}
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chip flex flex-1 items-center justify-center gap-2 rounded-sm border py-3 font-mono-label text-xs"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)", color: "var(--ink)" }}
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right contact form */}
          <div className="lg:col-span-7">
            <div
              className="rounded-sm border p-6 md:p-8"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="h-12 w-12" style={{ color: "var(--accent)" }} />
                  <h3 className="font-display mt-4 text-xl font-medium" style={{ color: "var(--ink)" }}>
                    Message Dispatched Successfully
                  </h3>
                  <p className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
                    Thanks for reaching out. I&apos;ll get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-sm px-4 py-2 font-mono-label text-xs"
                    style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="font-mono-label block text-xs uppercase" style={{ color: "var(--muted)" }}>
                        Name
                      </label>
                      <input
                        required
                        type="text"
                        name="name"
                        placeholder="Ada Lovelace"
                        className="field-input mt-1.5 w-full rounded-sm border bg-transparent px-3.5 py-2.5 text-sm outline-none transition-colors"
                        style={{ borderColor: "var(--border)", color: "var(--ink)" }}
                      />
                    </div>
                    <div>
                      <label className="font-mono-label block text-xs uppercase" style={{ color: "var(--muted)" }}>
                        Email
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="ada@example.com"
                        className="field-input mt-1.5 w-full rounded-sm border bg-transparent px-3.5 py-2.5 text-sm outline-none transition-colors"
                        style={{ borderColor: "var(--border)", color: "var(--ink)" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono-label block text-xs uppercase" style={{ color: "var(--muted)" }}>
                      Subject
                    </label>
                    <input
                      required
                      type="text"
                      name="subject"
                      placeholder="Project Inquiry / Job Opportunity"
                      className="field-input mt-1.5 w-full rounded-sm border bg-transparent px-3.5 py-2.5 text-sm outline-none transition-colors"
                      style={{ borderColor: "var(--border)", color: "var(--ink)" }}
                    />
                  </div>

                  <div>
                    <label className="font-mono-label block text-xs uppercase" style={{ color: "var(--muted)" }}>
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      name="message"
                      placeholder="Tell me about your team, problem space, or timeline..."
                      className="field-input mt-1.5 w-full rounded-sm border bg-transparent px-3.5 py-2.5 text-sm outline-none transition-colors"
                      style={{ borderColor: "var(--border)", color: "var(--ink)" }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-sm py-3 font-mono-label text-xs font-semibold uppercase tracking-wider transition-opacity hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>{loading ? "Transmitting..." : "Send Transmission"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

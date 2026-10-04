"use client";

import { useState } from "react";
import { site } from "@/lib/data";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      // 1. Dispatch through Resend API route
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // 2. Secondary log to Google Sheets
      fetch(
        "https://script.google.com/macros/s/AKfycbw0pvi3omFSFXjAYEM9POUHnbq0ChZQvG2Z7W4IyzilYK6wB3jNDdDFiJ1RJgIjwz8WBQ/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: formData,
        }
      ).catch(() => {});

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
    <section
      id="contact"
      className="relative border-t py-24 md:py-32"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg)",
      }}
    >
      <div className="container-px grid grid-cols-1 gap-14 md:grid-cols-2">
        {/* Left Column: Direct Links & Narrative */}
        <div>
          <h2
            className="font-display mb-6 text-3xl font-medium md:text-4xl"
            style={{ color: "var(--ink)" }}
          >
            Contact
          </h2>

          <p
            className="font-body max-w-md text-base leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            Open to Generative AI engineering, NLP pipelines, and full-stack software roles — Remote or On-Site. Reach out directly or send a message.
          </p>

          <div className="font-mono-label mt-8 flex flex-col gap-3 text-sm">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink inline-flex items-center gap-1.5"
              style={{ color: "var(--accent)" }}
            >
              GitHub ↗
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink inline-flex items-center gap-1.5"
              style={{ color: "var(--accent)" }}
            >
              LinkedIn ↗
            </a>
            <a
              href={site.huggingface}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink inline-flex items-center gap-1.5"
              style={{ color: "var(--accent)" }}
            >
              Hugging Face ↗
            </a>
            <a
              href={`mailto:${site.email}`}
              className="transition-colors hover:text-ink"
              style={{ color: "var(--accent)" }}
            >
              {site.email}
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink inline-flex items-center gap-1.5"
              style={{ color: "var(--accent)" }}
            >
              WhatsApp ↗
            </a>
          </div>
        </div>

        {/* Right Column: Clean Minimalist Form */}
        <div>
          {submitted ? (
            <div
              className="rounded-sm border p-6 font-mono-label text-sm"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--panel)",
                color: "var(--ink)",
              }}
            >
              <div className="font-semibold text-accent mb-2">Message Dispatched</div>
              <p className="text-muted text-xs leading-relaxed">
                Thank you for reaching out. I have received your message and will respond promptly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="font-mono-label text-xs uppercase"
                  style={{ color: "var(--muted)" }}
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="rounded-sm border px-4 py-3 text-sm outline-none transition-colors"
                  style={{
                    backgroundColor: "var(--panel)",
                    borderColor: "var(--border)",
                    color: "var(--ink)",
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="font-mono-label text-xs uppercase"
                  style={{ color: "var(--muted)" }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="you@domain.com"
                  className="rounded-sm border px-4 py-3 text-sm outline-none transition-colors"
                  style={{
                    backgroundColor: "var(--panel)",
                    borderColor: "var(--border)",
                    color: "var(--ink)",
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="font-mono-label text-xs uppercase"
                  style={{ color: "var(--muted)" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Your message or project scope..."
                  className="rounded-sm border px-4 py-3 text-sm outline-none transition-colors resize-none"
                  style={{
                    backgroundColor: "var(--panel)",
                    borderColor: "var(--border)",
                    color: "var(--ink)",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 rounded-sm px-6 py-3 font-mono-label text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 disabled:opacity-50 cursor-pointer"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--bg)",
                }}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

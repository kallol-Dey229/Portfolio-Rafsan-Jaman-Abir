"use client";
import { useState, type FormEvent } from "react";
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon } from "./Icons";
import Reveal from "./Reveal";

const EMAIL = "rafsan.zaman.pro@gmail.com";

const links = [
  { href: `mailto:${EMAIL}`, I: MailIcon, label: "Email", text: EMAIL },
  { href: "tel:+8801716-088918", I: PhoneIcon, label: "Call / WhatsApp", text: "+8801716-088918" },
  { href: "https://www.instagram.com/rafsan_zaman_abir", I: InstagramIcon, label: "Instagram", text: "@rafsan_zaman_abir", ext: true },
  { href: "https://www.facebook.com/share/1NESxLrUj2/?mibextid=wwXIfr", I: FacebookIcon, label: "Facebook", text: "Facebook profile", ext: true },
];

const projectTypes = [
  "Restaurant film",
  "Aerial shoot",
  "360° / FPV",
  "Reel / Short",
  "Editing only",
  "Other",
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", type: projectTypes[0], message: "" });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${form.type} enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Project type: ${form.type}\n\n${form.message}\n\nFrom: ${form.name} (${form.email})`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const input =
    "ff-mono w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:opacity-50 focus:border-[var(--b)]";

  return (
    <section id="contact" className="relative overflow-hidden pt-24" style={{ background: "var(--bg2)" }}>
      <div className="blob -right-20 top-10 h-80 w-80" style={{ background: "var(--a)" }} />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="ff-mono mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.25em]" style={{ color: "var(--b)" }}>
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            Contact · Now booking
          </p>
          <h2 className="ff-head text-4xl font-bold leading-tight sm:text-6xl">
            Let&apos;s make <span className="grad-text">something cinematic.</span>
          </h2>
          <p className="c-muted mt-4 max-w-md">
            Restaurant films, aerial shoots, 360° flights or a full edit. Tell me about your project and I&apos;ll
            get back to you.
          </p>

          <div className="ff-mono mt-6 flex flex-wrap gap-2 text-[11px] uppercase tracking-wider">
            {["Freelance", "Collaborations", "Full-time roles"].map((t) => (
              <span key={t} className="c-muted rounded-full border px-3 py-1" style={{ borderColor: "var(--border)" }}>
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Reveal>
            <form onSubmit={onSubmit} className="glass relative space-y-4 rounded-3xl p-6">
              {/* viewfinder corners */}
              <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-current opacity-30" />
              <span className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-current opacity-30" />
              <span className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-current opacity-30" />
              <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-current opacity-30" />

              <p className="ff-mono c-muted pt-1 text-[11px] uppercase tracking-[0.2em]">Project brief</p>

              <input
                required
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={input}
                style={{ borderColor: "var(--border)" }}
              />
              <input
                required
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={input}
                style={{ borderColor: "var(--border)" }}
              />

              <div>
                <p className="ff-mono c-muted mb-2 text-[11px] uppercase tracking-wider">What do you need?</p>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm({ ...form, type: t })}
                      className={`ff-mono rounded-full px-3.5 py-1.5 text-xs transition-all ${
                        form.type === t ? "btn-grad" : "btn-ghost c-muted"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                required
                rows={5}
                placeholder="Location, date, style, what you have in mind..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={input}
                style={{ borderColor: "var(--border)" }}
              />
              <button type="submit" className="btn-grad ff-mono w-full rounded-xl px-5 py-3.5 text-sm font-medium">
                Send brief
              </button>
            </form>
          </Reveal>

          <Reveal delay={150}>
            <div className="flex flex-col gap-3">
              {links.map(({ href, I, label, text, ext }) => (
                <a
                  key={href}
                  href={href}
                  {...(ext ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="glass spot group flex items-center gap-4 rounded-2xl px-5 py-4 transition-transform hover:translate-x-1"
                >
                  <I className="h-5 w-5 shrink-0" style={{ color: "var(--b)" }} />
                  <span className="min-w-0">
                    <span className="ff-mono c-muted block text-[10.5px] uppercase tracking-wider">{label}</span>
                    <span className="ff-mono block truncate text-sm">{text}</span>
                  </span>
                  <span className="ml-auto opacity-0 transition-opacity group-hover:opacity-100">↗</span>
                </a>
              ))}

              <div className="glass rounded-2xl px-5 py-4">
                <p className="ff-mono c-muted text-[10.5px] uppercase tracking-wider">Based in</p>
                <p className="ff-head mt-1 text-sm font-semibold">
                  Dhaka, Bangladesh · available for travel shoots
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative z-10 mt-20 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="ff-mono c-muted mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} Rafsan Zaman Abir · Video Editor & Cinematographer</p>
          <p>Bashundhara, Dhaka, Bangladesh</p>
        </div>
      </div>
    </section>
  );
}
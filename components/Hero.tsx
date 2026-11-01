import Image from "next/image";
import { ArrowRightIcon, FacebookIcon, InstagramIcon, MailIcon } from "./Icons";
import Typewriter from "./Typewriter";

const badges = [
  { t: "DJI Avata 360", cls: "-left-6 top-10", d: "0s" },
  { t: "DJI Air 3", cls: "-right-5 top-32", d: "0.8s" },
  { t: "Colour Grading", cls: "-left-8 bottom-24", d: "1.4s" },
];

const socials = [
  { h: "https://www.facebook.com/share/1NESxLrUj2/?mibextid=wwXIfr", I: FacebookIcon, l: "Facebook" },
  { h: "https://www.instagram.com/rafsan_zaman_abir", I: InstagramIcon, l: "Instagram" },
  { h: "mailto:rafsan.zaman.pro@gmail.com", I: MailIcon, l: "Email" },
];

const highlights = [
  { k: "Aerial", v: "Cinematography" },
  { k: "360°", v: "FPV Flights" },
  { k: "Edit", v: "& Colour Grade" },
  { k: "Sound", v: "Design" },
];

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="grid-bg absolute inset-0" />
      <div className="blob -left-24 top-10 h-96 w-96" style={{ background: "var(--a)" }} />
      <div className="blob -right-24 bottom-0 h-96 w-96" style={{ background: "var(--b)", animationDelay: "-5s" }} />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 px-6 py-16 md:grid-cols-[1.25fr_1fr]">
        {/* ---------- Left: text ---------- */}
        <div>
          <p className="glass ff-mono c-muted inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.18em]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: "#34d399" }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#34d399" }} />
            </span>
            Available for new projects
          </p>

          <p className="ff-mono mt-8 text-xs uppercase tracking-[0.25em]" style={{ color: "var(--b)" }}>
            Video Editor &amp; Cinematographer · Dhaka
          </p>

          <h1 className="ff-head mt-3 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Rafsan Zaman <span className="grad-text">Abir</span>
          </h1>

          <p className="ff-head mt-4 text-2xl font-medium sm:text-3xl">
            Specialising in{" "}
            <Typewriter
              words={[
                "Cinematic Aerials",
                "Restaurant Films",
                "360° FPV",
                "Colour Grading",
                "Video Editing",
              ]}
            />
          </p>

          <p className="c-muted mt-6 max-w-xl text-[17px] leading-relaxed">
            I shoot with the DJI Air 3 and Avata 360, then cut, grade and finish every film myself.
            From restaurant brand films to travel and event stories, I turn ideas into polished
            videos with a clear look and a reason for every cut.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#restaurants"
              className="btn-grad group ff-mono inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium"
            >
              View my work{" "}
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="btn-ghost c-text ff-mono inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm"
            >
              Book a shoot
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3">
            {socials.map(({ h, I, l }) => (
              <a
                key={l}
                href={h}
                target="_blank"
                rel="noreferrer"
                aria-label={l}
                className="glass c-muted rounded-full p-3 transition-all hover:-translate-y-1 hover:text-[var(--b)]"
              >
                <I className="h-5 w-5" />
              </a>
            ))}
          </div>

          <div
            className="mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-4 border-t pt-6 sm:grid-cols-4"
            style={{ borderColor: "var(--border)" }}
          >
            {highlights.map((h) => (
              <div key={h.k}>
                <p className="ff-head grad-text text-xl font-bold">{h.k}</p>
                <p className="ff-mono c-muted text-[10.5px] uppercase tracking-wider">{h.v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Right: portrait in a viewfinder ---------- */}
        <div className="relative mx-auto w-64 sm:w-72">
          <div className="relative">
            <div
              className="absolute -inset-3 rounded-[1.6rem] opacity-60 blur-2xl"
              style={{ background: "linear-gradient(135deg,var(--a),var(--b))" }}
            />
            <div
              className="relative overflow-hidden rounded-[1.4rem] border"
              style={{ background: "var(--bg2)", borderColor: "var(--border)" }}
            >
              <Image
                src="/images/abir_img.PNG"
                alt="Portrait of Rafsan Zaman Abir"
                width={900}
                height={1200}
                priority
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />

              {/* viewfinder overlay */}
              <span className="absolute left-4 top-4 h-5 w-5 border-l-2 border-t-2 border-white/70" />
              <span className="absolute right-4 top-4 h-5 w-5 border-r-2 border-t-2 border-white/70" />
              <span className="absolute bottom-4 left-4 h-5 w-5 border-b-2 border-l-2 border-white/70" />
              <span className="absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2 border-white/70" />

              <span className="ff-mono absolute left-7 top-7 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/90">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                REC
              </span>
              <span className="ff-mono absolute bottom-7 left-7 text-[10px] uppercase tracking-[0.2em] text-white/80">
                4K · 24 FPS
              </span>
            </div>
          </div>

          {badges.map((b) => (
            <span
              key={b.t}
              className={`glass float ff-mono absolute ${b.cls} rounded-full px-3 py-1.5 text-[11px] shadow-lg`}
              style={{ animationDelay: b.d }}
            >
              {b.t}
            </span>
          ))}
        </div>
      </div>

      <a href="#about" aria-label="Scroll down" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
        <span className="flex h-10 w-6 justify-center rounded-full border pt-2" style={{ borderColor: "var(--border)" }}>
          <span className="float h-2 w-1 rounded-full" style={{ background: "var(--b)" }} />
        </span>
      </a>
    </section>
  );
}
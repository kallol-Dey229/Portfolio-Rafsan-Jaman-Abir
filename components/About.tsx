import Counter from "./Counter";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

const stats = [
  { value: 20, suffix: "+", label: "Videos edited" },
  { value: 4, suffix: "K", label: "Delivery resolution" },
  { value: 2, suffix: "", label: "Drones in the kit" },
  { value: 2, suffix: "+", label: "Years behind the lens", },
];

const gear = [
  {
    name: "DJI Avata 360",
    role: "Immersive FPV",
    desc: "Fast, flowing 360° flights that get reframed in post into shots a normal camera can't make.",
    tag: "360° · FPV",
  },
  {
    name: "DJI Air 3",
    role: "Cinematic aerials",
    desc: "Dual-camera drone for clean establishing shots, smooth reveals and layered compression.",
    tag: "Wide + Tele",
  },
];

const workflow = [
  { step: "01", title: "Shoot", text: "Plan the flight, chase the light, capture clean source footage." },
  { step: "02", title: "Cut", text: "Build the story and the rhythm, trimming everything that doesn't earn its place." },
  { step: "03", title: "Grade", text: "Match shots, shape contrast and push a consistent look." },
  { step: "04", title: "Deliver", text: "Sound, titles and export tuned for the platform it's going to." },
];

const facts = [
  { label: "Based in", value: "Dhaka, Bangladesh" },
  { label: "Focus", value: "Aerial & cinematic edits" },
  { label: "Languages", value: "Bangla · English" },
];

const tools = ["Premiere Pro", "DaVinci Resolve", "After Effects", "Avata 360", "Air 3"];

export default function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle eyebrow="About me" title="I shoot from the sky and tell the story in the cut" />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {/* Bio card, styled like a viewfinder */}
          <Reveal className="md:col-span-2">
            <div className="glass relative h-full overflow-hidden rounded-3xl p-8">
              {/* viewfinder corners */}
              <span className="pointer-events-none absolute left-4 top-4 h-5 w-5 border-l-2 border-t-2 border-current opacity-30" />
              <span className="pointer-events-none absolute right-4 top-4 h-5 w-5 border-r-2 border-t-2 border-current opacity-30" />
              <span className="pointer-events-none absolute bottom-4 left-4 h-5 w-5 border-b-2 border-l-2 border-current opacity-30" />
              <span className="pointer-events-none absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2 border-current opacity-30" />

              <div className="ff-mono mb-6 flex items-center justify-between text-[11px] uppercase tracking-[0.2em]">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                  <span className="c-muted">REC</span>
                </span>
                <span className="c-muted">4K · 24 FPS · 00:00:24:00</span>
              </div>

              <div className="c-muted space-y-4 text-[16.5px] leading-relaxed">
                <p>
                  I&apos;m a video editor and aerial filmmaker. I fly the DJI Avata 360 and DJI Air 3 to capture
                  footage with real motion and scale, then shape it into edits with a clear rhythm, a consistent
                  look and a reason for every cut.
                </p>
                <p>
                  I care about the whole pipeline: planning the shot, flying it safely, and finishing it with
                  color, sound and pacing that make people watch to the end. I&apos;m open to freelance work,
                  collaborations and full-time roles.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {facts.map((f) => (
                  <div key={f.label}>
                    <p className="ff-mono c-muted text-[11px] uppercase tracking-wider">{f.label}</p>
                    <p className="ff-head mt-1 text-sm font-semibold">{f.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {tools.map((t) => (
                  <span
                    key={t}
                    className="ff-mono rounded-full border border-current/20 px-3 py-1 text-[11px] uppercase tracking-wider c-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Stats column */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
            {stats.slice(0, 2).map((s, i) => (
              <Reveal key={s.label} delay={i * 120}>
                <div className="glass h-full rounded-3xl p-6">
                  <p className="ff-head grad-text text-4xl font-bold">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="ff-mono c-muted mt-1 text-[11px] uppercase tracking-wider">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Gear cards */}
          {gear.map((g, i) => (
            <Reveal key={g.name} delay={i * 120} className={i === 0 ? "md:col-span-1" : "md:col-span-1"}>
              <div className="glass group h-full rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="ff-mono c-muted text-[11px] uppercase tracking-[0.2em]">{g.role}</span>
                  <span className="ff-mono rounded-full border border-current/20 px-2.5 py-0.5 text-[10px] uppercase tracking-wider c-muted">
                    {g.tag}
                  </span>
                </div>
                <h3 className="ff-head grad-text mt-4 text-2xl font-bold">{g.name}</h3>
                <p className="c-muted mt-2 text-[15px] leading-relaxed">{g.desc}</p>
              </div>
            </Reveal>
          ))}

          {/* Remaining stats */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
            {stats.slice(2).map((s, i) => (
              <Reveal key={s.label} delay={i * 120}>
                <div className="glass h-full rounded-3xl p-6">
                  <p className="ff-head grad-text text-4xl font-bold">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="ff-mono c-muted mt-1 text-[11px] uppercase tracking-wider">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Timeline / workflow */}
          <Reveal className="md:col-span-3">
            <div className="glass rounded-3xl p-8">
              <div className="flex items-center justify-between">
                <p className="ff-mono c-muted text-[11px] uppercase tracking-[0.2em]">My workflow</p>
                <p className="ff-mono c-muted text-[11px] uppercase tracking-wider">Timeline 01</p>
              </div>

              {/* decorative editing timeline */}
              <div className="mt-5 space-y-1.5" aria-hidden="true">
                <div className="flex h-3 gap-1">
                  <span className="w-[22%] rounded-sm bg-current opacity-30" />
                  <span className="w-[14%] rounded-sm bg-current opacity-15" />
                  <span className="w-[30%] rounded-sm bg-current opacity-40" />
                  <span className="w-[10%] rounded-sm bg-current opacity-15" />
                  <span className="flex-1 rounded-sm bg-current opacity-25" />
                </div>
                <div className="flex h-3 gap-1">
                  <span className="w-[8%]" />
                  <span className="w-[26%] rounded-sm bg-current opacity-20" />
                  <span className="w-[18%] rounded-sm bg-current opacity-35" />
                  <span className="flex-1 rounded-sm bg-current opacity-15" />
                </div>
                <div className="flex h-2 items-end gap-[3px]">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-full rounded-sm bg-current opacity-20"
                      style={{ height: `${30 + ((i * 37) % 70)}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {workflow.map((w) => (
                  <div key={w.step} className="border-t border-current/15 pt-4">
                    <p className="ff-mono grad-text text-sm font-semibold">{w.step}</p>
                    <p className="ff-head mt-1 text-lg font-semibold">{w.title}</p>
                    <p className="c-muted mt-1 text-sm leading-relaxed">{w.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
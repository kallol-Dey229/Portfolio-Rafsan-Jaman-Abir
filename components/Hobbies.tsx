import Image from "next/image";
import { BookIcon, CompassIcon, GamepadIcon } from "./Icons";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

function FilmIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" />
    </svg>
  );
}

function MusicIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path d="M9 18V6l11-2v12" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="17.5" cy="16" r="2.5" />
    </svg>
  );
}

const hobbies = [
  {
    scene: "02",
    title: "Watching films",
    icon: FilmIcon,
    color: "var(--a)",
    text: "I watch with the sound off, then again with it on. Shot length, camera movement and where the cut lands teach me more than any tutorial.",
  },
  {
    scene: "03",
    title: "Gaming",
    icon: GamepadIcon,
    color: "var(--b)",
    text: "Cinematic games are free lessons in framing, lighting and pacing. It's also how I unwind after a long export.",
  },
  {
    scene: "04",
    title: "Reading books",
    icon: BookIcon,
    color: "var(--b)",
    text: "Good edits are good stories. Books keep my sense of structure, tension and release sharp.",
  },
  {
    scene: "05",
    title: "Music & sound",
    icon: MusicIcon,
    color: "var(--a)",
    text: "I build most edits around the track. Finding the beat, the swell and the silence is half of the cut.",
  },
];

const now = [
  { label: "Watching", value: "Add a film or series" },
  { label: "Reading", value: "Add a book" },
  { label: "Playing", value: "Add a game" },
  { label: "Listening", value: "Add an artist or album" },
];

function SceneLabel({ n, light }: { n: string; light?: boolean }) {
  return (
    <div
      className={`ff-mono flex items-center justify-between text-[10.5px] uppercase tracking-[0.2em] ${
        light ? "text-white/80" : "c-muted"
      }`}
    >
      <span className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
        Scene {n}
      </span>
      <span>Take 1</span>
    </div>
  );
}

function FilmStrip() {
  return (
    <div className="mt-10 flex items-center gap-2 overflow-hidden opacity-30" aria-hidden="true">
      {Array.from({ length: 40 }).map((_, i) => (
        <span key={i} className="h-3 w-5 shrink-0 rounded-[3px] border border-current" />
      ))}
    </div>
  );
}

export default function Hobbies() {
  return (
    <section id="beyond" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle eyebrow="Beyond the timeline" title="What feeds the frame" />
        <p className="c-muted mt-4 max-w-2xl text-[16.5px] leading-relaxed">
          The things I do away from the edit bay are the same things that shape how I shoot and cut.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {/* Travel hero card */}
          <Reveal className="md:col-span-2 md:row-span-2">
            <div className="group glass relative h-full min-h-[420px] overflow-hidden rounded-3xl">
              <Image
                src="/images/abir-image.jpeg"
                alt="Traveling photo"
                width={1400}
                height={1750}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />

              {/* viewfinder corners */}
              <span className="absolute left-4 top-4 h-5 w-5 border-l-2 border-t-2 border-white/60" />
              <span className="absolute right-4 top-4 h-5 w-5 border-r-2 border-t-2 border-white/60" />
              <span className="absolute bottom-4 left-4 h-5 w-5 border-b-2 border-l-2 border-white/60" />
              <span className="absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2 border-white/60" />

              <div className="absolute inset-x-0 top-0 p-8">
                <SceneLabel n="01" light />
              </div>

              <div className="absolute bottom-0 p-8 text-white">
                <CompassIcon className="h-8 w-8 text-white/90" />
                <h3 className="ff-head mt-3 text-3xl font-bold">Travel & location scouting</h3>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-white/80">
                  New places, new light, new food and new cultures. Every trip is research for the next shot,
                  and the drone always comes along.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Films + Gaming */}
          {hobbies.slice(0, 2).map((h, i) => (
            <Reveal key={h.title} delay={(i + 1) * 100}>
              <div className="glass spot h-full rounded-3xl p-7">
                <SceneLabel n={h.scene} />
                <h.icon className="mt-6 h-9 w-9" style={{ color: h.color }} />
                <h3 className="ff-head mt-4 text-xl font-semibold">{h.title}</h3>
                <p className="c-muted mt-2 text-sm leading-relaxed">{h.text}</p>
              </div>
            </Reveal>
          ))}

          {/* Books + Music */}
          {hobbies.slice(2).map((h, i) => (
            <Reveal key={h.title} delay={i * 100}>
              <div className="glass spot h-full rounded-3xl p-7">
                <SceneLabel n={h.scene} />
                <h.icon className="mt-6 h-9 w-9" style={{ color: h.color }} />
                <h3 className="ff-head mt-4 text-xl font-semibold">{h.title}</h3>
                <p className="c-muted mt-2 text-sm leading-relaxed">{h.text}</p>
              </div>
            </Reveal>
          ))}

          {/* Currently card */}
          <Reveal delay={200}>
            <div className="glass h-full rounded-3xl p-7">
              <p className="ff-mono c-muted text-[10.5px] uppercase tracking-[0.2em]">On rotation</p>
              <div className="mt-5 space-y-4">
                {now.map((n) => (
                  <div key={n.label} className="border-b border-current/10 pb-3 last:border-0 last:pb-0">
                    <p className="ff-mono c-muted text-[10.5px] uppercase tracking-wider">{n.label}</p>
                    <p className="ff-head mt-0.5 text-sm font-semibold">{n.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <FilmStrip />
      </div>
    </section>
  );
}
"use client";

import { useRef, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { personalVideos } from "@/data/personalWork";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
//
const filters = ["All", ...Array.from(new Set(personalVideos.map((v) => v.category)))];

const poster = (id: string, w = 1280) =>
  `https://image.mux.com/${id}/thumbnail.jpg?time=2&width=${w}`;

const pad = (n: number) => String(n).padStart(2, "0");

export default function PersonalWork() {
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState(0);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const list = personalVideos.filter((v) => filter === "All" || v.category === filter);

  const padLeft = () => {
    const el = trackRef.current;
    return el ? parseFloat(getComputedStyle(el).paddingLeft) || 0 : 0;
  };

  const changeFilter = (f: string) => {
    setFilter(f);
    setActive(0);
    setPlayingIdx(null);
    trackRef.current?.scrollTo({ left: 0, behavior: "auto" });
  };

  // work out which card is currently snapped, stop video if user swiped away
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const pl = padLeft();
    let best = 0;
    let bestDist = Infinity;
    cardRefs.current.forEach((c, i) => {
      if (!c || i >= list.length) return;
      const d = Math.abs(c.offsetLeft - pl - el.scrollLeft);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    if (best !== active) {
      setActive(best);
      setPlayingIdx((p) => (p === best ? p : null));
    }
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    const card = cardRefs.current[i];
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - padLeft(), behavior: "smooth" });
  };

  const prev = () => goTo(Math.max(0, active - 1));
  const next = () => goTo(Math.min(list.length - 1, active + 1));

  const arrowCls =
    "glass grid h-11 w-11 place-items-center rounded-full transition-all hover:-translate-y-0.5 hover:text-[var(--b)] disabled:pointer-events-none disabled:opacity-30";

  return (
    <section id="personal-work" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionTitle eyebrow="Personal work" title="Things I shoot for myself" />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => changeFilter(f)}
                className={`ff-mono rounded-full px-4 py-2 text-xs transition-all ${
                  filter === f ? "btn-grad" : "btn-ghost c-muted"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {list.length > 0 && (
        <Reveal>
          {/* counter + arrows */}
          <div className="mx-auto mt-12 flex max-w-6xl items-center justify-between px-6">
            <p className="ff-mono c-muted flex items-center gap-2 text-[11px] uppercase tracking-[0.2em]">
              <span style={{ color: "var(--b)" }}>
                {pad(active + 1)} / {pad(list.length)}
              </span>
              <span className="md:hidden">· Swipe</span>
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 animate-pulse fill-none stroke-current md:hidden"
                strokeWidth={2}
              >
                <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </p>

            <div className="hidden gap-2 md:flex">
              <button type="button" onClick={prev} disabled={active === 0} aria-label="Previous film" className={arrowCls}>
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth={2}>
                  <path d="M19 12H5m0 0l6-6m-6 6l6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                disabled={active === list.length - 1}
                aria-label="Next film"
                className={arrowCls}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth={2}>
                  <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* ---------- Swipe carousel ---------- */}
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="relative mt-6 flex snap-x snap-mandatory items-start gap-5 overflow-x-auto scroll-smooth px-6 pb-4 lg:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {list.map((v, i) => {
              const isPlaying = playingIdx === i;
              const isActive = active === i;
              const isVertical = v.ratio === "9/16";

              return (
                <div
                  key={`${filter}-${v.playbackId}-${i}`}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className={`shrink-0 snap-start transition-opacity duration-500 ${
                    isVertical
                      ? "w-[72%] sm:w-[46%] lg:w-[30%]"
                      : "w-[86%] sm:w-[72%] lg:w-[60%]"
                  } ${isActive ? "opacity-100" : "opacity-60"}`}
                >
                  <div className="glass overflow-hidden rounded-3xl p-3">
                    <div
                      className="relative w-full overflow-hidden rounded-2xl bg-black"
                      style={{ aspectRatio: v.ratio }}
                    >
                      {isPlaying ? (
                        <MuxPlayer
                          key={v.playbackId}
                          playbackId={v.playbackId}
                          streamType="on-demand"
                          autoPlay
                          accentColor="#ff4d4d"
                          metadata={{ video_title: v.title }}
                          className="h-full w-full"
                          style={{ aspectRatio: v.ratio }}
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => setPlayingIdx(i)}
                          aria-label={`Play ${v.title}`}
                          className="group absolute inset-0 h-full w-full text-left"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={poster(v.playbackId)}
                            alt={v.title}
                            loading={i < 2 ? "eager" : "lazy"}
                            draggable={false}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />

                          {/* viewfinder corners */}
                          <span className="absolute left-4 top-4 h-5 w-5 border-l-2 border-t-2 border-white/60" />
                          <span className="absolute right-4 top-4 h-5 w-5 border-r-2 border-t-2 border-white/60" />
                          <span className="absolute bottom-4 left-4 h-5 w-5 border-b-2 border-l-2 border-white/60" />
                          <span className="absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2 border-white/60" />

                          {v.featured ? (
                            <span className="btn-grad ff-mono absolute left-8 top-7 rounded-full px-3 py-1 text-[10.5px] font-medium uppercase tracking-wider">
                              ★ Featured
                            </span>
                          ) : (
                            <span className="ff-mono absolute left-8 top-7 flex items-center gap-2 text-[10.5px] uppercase tracking-[0.2em] text-white/85">
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                              Film {pad(i + 1)}
                            </span>
                          )}
                          <span className="ff-mono absolute right-8 top-7 text-[10.5px] uppercase tracking-[0.2em] text-white/70">
                            {pad(i + 1)} / {pad(list.length)}
                          </span>

                          <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-white/10 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                            <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-white">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>

                          <span className="absolute bottom-6 left-8 right-8 text-white">
                            <span className="ff-mono block text-[10.5px] uppercase tracking-[0.2em] text-white/70">
                              {v.gear}
                            </span>
                            <span className="ff-head mt-1 block text-2xl font-bold sm:text-3xl">
                              {v.title}
                            </span>
                          </span>
                        </button>
                      )}
                    </div>

                    {/* info */}
                    <div className="px-3 pb-2 pt-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="ff-mono c-muted text-[10.5px] uppercase tracking-wider">
                          {v.category}
                          {v.location ? ` · ${v.location}` : ""}
                        </span>
                        {v.year && <span className="ff-mono c-muted text-[11px]">{v.year}</span>}
                      </div>

                      <h3 className="ff-head mt-1 text-lg font-semibold">{v.title}</h3>
                      <p className="c-muted mt-1 text-sm">{v.tagline}</p>

                      {/* {v.notes && (
                        <ul className="mt-3 space-y-2">
                          {v.notes.map((line) => (
                            <li key={line} className="c-muted flex gap-2.5 text-[13.5px] leading-relaxed">
                              <span
                                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                                style={{ background: "var(--b)" }}
                              />
                              {line}
                            </li>
                          ))}
                        </ul>
                      )} */}

                      {v.tags && (
                        <div className="flex flex-wrap gap-2 pt-4">
                          {v.tags.map((t) => (
                            <span
                              key={t}
                              className="ff-mono c-muted rounded-full border px-2.5 py-0.5 text-[11px]"
                              style={{ borderColor: "var(--border)" }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* dots */}
          <div className="mt-4 flex justify-center gap-2">
            {list.map((v, i) => (
              <button
                key={`${filter}-${v.playbackId}-dot-${i}`}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to film ${i + 1}`}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: active === i ? 28 : 8,
                  background: active === i ? "var(--b)" : "var(--border)",
                }}
              />
            ))}
          </div>
        </Reveal>
      )}
    </section>
  );
}
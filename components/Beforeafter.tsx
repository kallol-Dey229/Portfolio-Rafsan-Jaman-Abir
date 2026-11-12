"use client";

import { useRef, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import { beforeAfterItems } from "@/data/Beforeafter";

const frame = (id: string, t: number, w = 1280) =>
  `https://image.mux.com/${id}/thumbnail.jpg?time=${t}&width=${w}`;

const pad = (n: number) => String(n).padStart(2, "0");

export default function BeforeAfter() {
  const items = beforeAfterItems.filter((i) => !i.playbackId.startsWith("REPLACE"));
  const [active, setActive] = useState(0);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const padLeft = () => {
    const el = trackRef.current;
    return el ? parseFloat(getComputedStyle(el).paddingLeft) || 0 : 0;
  };

  // work out which card is currently snapped, stop video if user swiped away
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const pl = padLeft();
    let best = 0;
    let bestDist = Infinity;
    cardRefs.current.forEach((c, i) => {
      if (!c || i >= items.length) return;
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
  const next = () => goTo(Math.min(items.length - 1, active + 1));

  const arrowCls =
    "glass grid h-11 w-11 place-items-center rounded-full transition-all hover:-translate-y-0.5 hover:text-[var(--b)] disabled:pointer-events-none disabled:opacity-30";

  if (items.length === 0) {
    return (
      <section id="before-after" className="relative py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionTitle eyebrow="Before / After" title="From raw footage to the final look" />
          <div className="glass mt-12 rounded-3xl p-10 text-center">
            <p className="ff-mono c-muted text-sm">
              Add your Mux playback ID in data/Beforeafter.ts to show the video here.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="before-after" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionTitle eyebrow="Before / After" title="From raw footage to the final look" />
            <p className="c-muted mt-4 max-w-2xl text-[16.5px] leading-relaxed">
              Each video shows the original footage first, then the finished edit.
            </p>
          </div>
          <div className="ff-mono c-muted text-[11px] uppercase tracking-[0.2em]">
            {pad(items.length)} {items.length === 1 ? "film" : "films"}
          </div>
        </div>
      </div>

      <Reveal>
        {/* counter + arrows */}
        <div className="mx-auto mt-12 flex max-w-6xl items-center justify-between px-6">
          <p className="ff-mono c-muted flex items-center gap-2 text-[11px] uppercase tracking-[0.2em]">
            <span style={{ color: "var(--b)" }}>
              {pad(active + 1)} / {pad(items.length)}
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
              disabled={active === items.length - 1}
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
          {items.map((item, i) => {
            const isPlaying = playingIdx === i;
            const isActive = active === i;
            const isVertical = item.ratio === "9/16";

            return (
              <div
                key={`${item.playbackId}-${i}`}
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
                    style={{ aspectRatio: item.ratio }}
                  >
                    {isPlaying ? (
                      <MuxPlayer
                        key={item.playbackId}
                        playbackId={item.playbackId}
                        streamType="on-demand"
                        autoPlay
                        accentColor="#8b5cf6"
                        metadata={{ video_title: item.title }}
                        className="h-full w-full"
                        style={{ aspectRatio: item.ratio }}
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setPlayingIdx(i)}
                        aria-label={`Play ${item.title}`}
                        className="group absolute inset-0 h-full w-full text-left"
                      >
                        {/* split poster: before frame on the left, after frame on the right */}
                        {/* eslint-disable @next/next/no-img-element */}
                        <img
                          src={frame(item.playbackId, 1)}
                          alt=""
                          loading={i < 2 ? "eager" : "lazy"}
                          draggable={false}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <img
                          src={frame(item.playbackId, item.afterAt + 1)}
                          alt=""
                          loading={i < 2 ? "eager" : "lazy"}
                          draggable={false}
                          className="absolute inset-0 h-full w-full object-cover"
                          style={{ clipPath: "inset(0 0 0 50%)" }}
                        />
                        {/* eslint-enable @next/next/no-img-element */}
                        <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/30" />
                        <span className="absolute inset-y-0 left-1/2 w-px bg-white/80" />

                        {/* viewfinder corners */}
                        <span className="absolute left-4 top-4 h-5 w-5 border-l-2 border-t-2 border-white/60" />
                        <span className="absolute right-4 top-4 h-5 w-5 border-r-2 border-t-2 border-white/60" />
                        <span className="absolute bottom-4 left-4 h-5 w-5 border-b-2 border-l-2 border-white/60" />
                        <span className="absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2 border-white/60" />

                        <span className="ff-mono absolute right-8 top-7 text-[10.5px] uppercase tracking-[0.2em] text-white/70">
                          {pad(i + 1)} / {pad(items.length)}
                        </span>

                        <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/50 bg-black/40 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                          <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-white">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>

                        <span className="ff-mono absolute bottom-6 left-8 text-[10.5px] uppercase tracking-[0.2em] text-white/80">
                          Before &nbsp;→&nbsp; After
                        </span>
                      </button>
                    )}

                    {/* fixed label, always the same */}
                    <span className="ff-mono pointer-events-none absolute left-8 top-7 z-10 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                      Before &amp; After
                    </span>
                  </div>

                  {/* info */}
                  <div className="px-3 pb-2 pt-4">
                    <span
                      className="ff-mono text-[11px] uppercase tracking-[0.2em]"
                      style={{ color: "var(--b)" }}
                    >
                      {item.category}
                    </span>
                    <h3 className="ff-head mt-1 text-lg font-semibold">{item.title}</h3>
                    {item.description && <p className="c-muted mt-1 text-sm">{item.description}</p>}

                    {item.tags && (
                      <div className="flex flex-wrap gap-2 pt-4">
                        {item.tags.map((t) => (
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
          {items.map((item, i) => (
            <button
              key={`${item.playbackId}-dot-${i}`}
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
    </section>
  );
}
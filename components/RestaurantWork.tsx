"use client";

import { useRef, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { restaurantVideos, services } from "@/data/restaurantWork";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

const poster = (id: string, w = 1280) =>
  `https://image.mux.com/${id}/thumbnail.jpg?time=2&width=${w}`;

const pad = (n: number) => String(n).padStart(2, "0");

export default function RestaurantWork() {
  const videos = restaurantVideos.filter((v) => !v.playbackId.startsWith("REPLACE"));
  const [active, setActive] = useState(0);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  if (videos.length === 0) return null;

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
      if (!c) return;
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
  const next = () => goTo(Math.min(videos.length - 1, active + 1));

  const arrowCls =
    "glass grid h-11 w-11 place-items-center rounded-full transition-all hover:-translate-y-0.5 hover:text-[var(--b)] disabled:pointer-events-none disabled:opacity-30";

  return (
    <section id="restaurants" className="relative py-24" style={{ background: "var(--bg2)" }}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionTitle eyebrow="Restaurant work" title="Food, space and atmosphere, on film" />
            <p className="c-muted mt-4 max-w-2xl text-[16.5px] leading-relaxed">
              Aerial exteriors, 360° walkthroughs and cinematic ambience, edited into films that make
              people want to walk in.
            </p>
          </div>
          <div className="ff-mono c-muted text-[11px] uppercase tracking-[0.2em]">
            {pad(videos.length)} films · 4K
          </div>
        </div>
      </div>

      {/* services marquee */}
      <div className="marquee-wrap mt-12 overflow-hidden">
        <div className="marquee-track flex w-max gap-3">
          {[...services, ...services].map((item, i) => (
            <span
              key={i}
              className="glass ff-mono whitespace-nowrap rounded-full px-5 py-2.5 text-[13px]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ---------- Swipe carousel ---------- */}
      <Reveal>
        <div className="mx-auto mt-14 flex max-w-6xl items-center justify-between px-6">
          <p className="ff-mono c-muted flex items-center gap-2 text-[11px] uppercase tracking-[0.2em]">
            <span style={{ color: "var(--b)" }}>
              {pad(active + 1)} / {pad(videos.length)}
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
              disabled={active === videos.length - 1}
              aria-label="Next film"
              className={arrowCls}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth={2}>
                <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={onScroll}
          className="relative mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-4 lg:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {videos.map((v, i) => {
            const isPlaying = playingIdx === i;
            const isActive = active === i;

            return (
              <div
                key={`${v.playbackId}-${i}`}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={`w-[86%] shrink-0 snap-start transition-opacity duration-500 sm:w-[72%] lg:w-[60%] ${
                  isActive ? "opacity-100" : "opacity-60"
                }`}
              >
                <div className="glass overflow-hidden rounded-3xl p-3">
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
                    {isPlaying ? (
                      <MuxPlayer
                        key={v.playbackId}
                        playbackId={v.playbackId}
                        streamType="on-demand"
                        autoPlay
                        accentColor="#8b5cf6"
                        metadata={{ video_title: `${v.client} - ${v.title}` }}
                        className="h-full w-full"
                        style={{ aspectRatio: "16/9" }}
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setPlayingIdx(i)}
                        aria-label={`Play ${v.client}`}
                        className="group absolute inset-0 h-full w-full text-left"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={poster(v.playbackId)}
                          alt={`${v.client} film`}
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

                        <span className="ff-mono absolute left-8 top-7 flex items-center gap-2 text-[10.5px] uppercase tracking-[0.2em] text-white/85">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                          Film {pad(i + 1)}
                        </span>
                        <span className="ff-mono absolute right-8 top-7 text-[10.5px] uppercase tracking-[0.2em] text-white/70">
                          {pad(i + 1)} / {pad(videos.length)}
                        </span>

                        <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-white/10 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                          <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-white">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>

                        <span className="absolute bottom-6 left-8 right-8 text-white">
                          <span className="ff-mono block text-[10.5px] uppercase tracking-[0.2em] text-white/70">
                            {v.category}
                          </span>
                          <span className="ff-head mt-1 block text-2xl font-bold sm:text-3xl">
                            {v.client}
                          </span>
                        </span>
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 px-3 pb-2 pt-4">
                    <div>
                      <h3 className="ff-head text-lg font-semibold">{v.title}</h3>
                      <p className="c-muted text-sm">
                        {v.client}
                        {v.year ? ` · ${v.year}` : ""}
                      </p>
                    </div>
                    {v.tags && (
                      <div className="flex flex-wrap gap-2">
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
          {videos.map((v, i) => (
            <button
              key={`${v.playbackId}-dot-${i}`}
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

      {/* Equipment note */}
      <div className="mx-auto mt-16 max-w-6xl px-6">
        <div className="glass rounded-2xl p-5 text-center">
          <p className="c-muted mx-auto max-w-2xl text-sm leading-relaxed">
            Shot with the <span className="c-text">DJI Air 3</span>,{" "}
            <span className="c-text">DJI Avata 360</span> and{" "}
            <span className="c-text">iPhone 14 Pro Max</span>, graded and finished for the screen and
            for social.
          </p>
        </div>
      </div>
    </section>
  );
}
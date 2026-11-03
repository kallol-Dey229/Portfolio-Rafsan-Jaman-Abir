"use client";

import { useState } from "react";
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
  const [playing, setPlaying] = useState(false);

  if (videos.length === 0) return null;
  const current = videos[active] ?? videos[0];

  const select = (i: number) => {
    setActive(i);
    setPlaying(false);
  };

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

      <div className="mx-auto mt-14 grid max-w-6xl gap-6 px-6 lg:grid-cols-[1.9fr_1fr]">
        {/* Main screen */}
        <Reveal>
          <div className="glass overflow-hidden rounded-3xl p-3">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
              {playing ? (
                <MuxPlayer
                  key={current.playbackId}
                  playbackId={current.playbackId}
                  streamType="on-demand"
                  autoPlay
                  accentColor="#8b5cf6"
                  metadata={{ video_title: `${current.client} - ${current.title}` }}
                  className="h-full w-full"
                  style={{ aspectRatio: "16/9" }}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label={`Play ${current.client}`}
                  className="group absolute inset-0 h-full w-full text-left"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={current.playbackId}
                    src={poster(current.playbackId)}
                    alt={`${current.client} film`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/30" />

                  {/* viewfinder corners */}
                  <span className="absolute left-4 top-4 h-5 w-5 border-l-2 border-t-2 border-white/60" />
                  <span className="absolute right-4 top-4 h-5 w-5 border-r-2 border-t-2 border-white/60" />
                  <span className="absolute bottom-4 left-4 h-5 w-5 border-b-2 border-l-2 border-white/60" />
                  <span className="absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2 border-white/60" />

                  <span className="ff-mono absolute left-8 top-7 flex items-center gap-2 text-[10.5px] uppercase tracking-[0.2em] text-white/85">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                    Now showing
                  </span>
                  <span className="ff-mono absolute right-8 top-7 text-[10.5px] uppercase tracking-[0.2em] text-white/70">
                    {pad(active + 1)} / {pad(videos.length)}
                  </span>

                  <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-white/10 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                    <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-white">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>

                  <span className="absolute bottom-7 left-8 right-8 text-white">
                    <span className="ff-mono block text-[10.5px] uppercase tracking-[0.2em] text-white/70">
                      {current.category}
                    </span>
                    <span className="ff-head mt-1 block text-2xl font-bold sm:text-4xl">
                      {current.client}
                    </span>
                  </span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 px-3 pb-2 pt-4">
              <div>
                <h3 className="ff-head text-lg font-semibold">{current.title}</h3>
                <p className="c-muted text-sm">
                  {current.client}
                  {current.year ? ` · ${current.year}` : ""}
                </p>
              </div>
              {current.tags && (
                <div className="flex flex-wrap gap-2">
                  {current.tags.map((t) => (
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
        </Reveal>

        {/* Playlist */}
        <Reveal delay={120}>
          <div className="flex h-full flex-col">
            <p className="ff-mono c-muted mb-3 text-[11px] uppercase tracking-[0.2em]">
              Select a film
            </p>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {videos.map((v, i) => {
                const on = i === active;
                return (
                  <button
                    key={`${v.playbackId}-${i}`}
                    type="button"
                    onClick={() => select(i)}
                    aria-label={`Show ${v.client}`}
                    className="glass spot group flex items-center gap-4 rounded-2xl p-2.5 text-left transition-all"
                    style={on ? { borderColor: "var(--a)" } : undefined}
                  >
                    <span className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-xl bg-black sm:w-24 lg:w-32">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={poster(v.playbackId, 480)}
                        alt=""
                        loading="lazy"
                        className={`h-full w-full object-cover transition duration-500 group-hover:scale-110 ${
                          on ? "" : "opacity-70"
                        }`}
                      />
                      {on && (
                        <span className="absolute inset-0 grid place-items-center bg-black/30">
                          <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                        </span>
                      )}
                    </span>
                    <span className="min-w-0">
                      <span
                        className="ff-mono block text-[10px] uppercase tracking-[0.2em]"
                        style={{ color: on ? "var(--b)" : "var(--muted)" }}
                      >
                        {pad(i + 1)} · {v.category}
                      </span>
                      <span className="ff-head mt-0.5 block truncate text-[15px] font-semibold">
                        {v.client}
                      </span>
                      <span className="c-muted block truncate text-xs">{v.title}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="glass mt-3 hidden flex-1 items-end rounded-2xl p-5 lg:flex">
              <p className="c-muted text-sm leading-relaxed">
                Shot with the <span className="c-text">DJI Air 3</span> and{" "}
                <span className="c-text">DJI Avata 360</span> and{" "}
                <span className="c-text">Iphone 14 pro max</span>, graded and finished for the screen
                and for social.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
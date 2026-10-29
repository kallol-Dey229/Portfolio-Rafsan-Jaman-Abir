"use client";

import { useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { restaurantVideos, services, type RestaurantVideo } from "@/data/restaurantWork";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

function VideoCard({ v }: { v: RestaurantVideo }) {
  const [playing, setPlaying] = useState(false);
  const poster = `https://image.mux.com/${v.playbackId}/thumbnail.jpg?time=2&width=960`;

  return (
    <div className="glass spot group overflow-hidden rounded-3xl p-3">
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-black"
        style={{ aspectRatio: v.ratio }}
      >
        {playing ? (
          <MuxPlayer
            playbackId={v.playbackId}
            streamType="on-demand"
            autoPlay
            accentColor="#ff4d4d"
            metadata={{ video_title: `${v.client} – ${v.title}` }}
            className="h-full w-full"
            style={{ aspectRatio: v.ratio }}
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${v.title}`}
            className="absolute inset-0 h-full w-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={poster}
              alt={v.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* viewfinder corners */}
            <span className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-white/60" />
            <span className="absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-white/60" />
            <span className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-white/60" />
            <span className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-white/60" />

            <span className="ff-mono absolute left-5 top-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/80">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
              {v.ratio === "9/16" ? "Reel" : "Film"}
            </span>

            <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-white/10 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6 fill-white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>

      <div className="px-3 pb-3 pt-4">
        <div className="flex items-center justify-between gap-3">
          <span
            className="ff-mono text-[11px] uppercase tracking-[0.2em]"
            style={{ color: "var(--b)" }}
          >
            {v.category}
          </span>
          {v.year && <span className="ff-mono c-muted text-[11px]">{v.year}</span>}
        </div>
        <h3 className="ff-head mt-2 text-lg font-semibold">{v.title}</h3>
        <p className="c-muted text-sm">{v.client}</p>

        {v.tags && (
          <div className="mt-3 flex flex-wrap gap-2">
            {v.tags.map((t) => (
              <span
                key={t}
                className="ff-mono rounded-full border px-2.5 py-0.5 text-[11px]"
                style={{ borderColor: "var(--border)" }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function RestaurantWork() {
  return (
    <section id="restaurants" className="relative py-24" style={{ background: "var(--bg2)" }}>
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle eyebrow="Restaurant work" title="Food, space and atmosphere, on film" />
        <p className="c-muted mt-4 max-w-2xl text-[16.5px] leading-relaxed">
          Aerial exteriors, 360° walkthroughs and close-up food cinematography, edited into films
          and reels that make people hungry before they walk in.
        </p>
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

      {/* videos */}
      <div className="mx-auto mt-14 grid max-w-6xl items-start gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {restaurantVideos.map((v, i) => (
          <Reveal
            key={`${v.playbackId}-${i}`}
            delay={i * 80}
            className={v.ratio === "16/9" && i === 0 ? "lg:col-span-2" : ""}
          >
            <VideoCard v={v} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
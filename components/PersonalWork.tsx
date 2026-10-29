"use client";

import { useState, type MouseEvent } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { personalVideos, type PersonalVideo } from "@/data/personalWork";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

const filters = ["All", ...Array.from(new Set(personalVideos.map((v) => v.category)))];

function Card({ v }: { v: PersonalVideo }) {
  const [playing, setPlaying] = useState(false);
  const poster = `https://image.mux.com/${v.playbackId}/thumbnail.jpg?time=2&width=1280`;
  const isVertical = v.ratio === "9/16";

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (playing) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.style.transform = `perspective(1000px) rotateY(${(x - 0.5) * 6}deg) rotateX(${(0.5 - y) * 6}deg) translateY(-4px)`;
  };
  const onLeave = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`glass spot group flex h-full flex-col overflow-hidden rounded-3xl ${
        v.featured ? "lg:flex-row" : ""
      }`}
    >
      {/* media */}
      <div
        className={`relative overflow-hidden bg-black ${
          v.featured ? "lg:w-3/5" : ""
        } ${isVertical ? "mx-auto w-full max-w-[320px]" : "w-full"}`}
        style={{ aspectRatio: v.ratio }}
      >
        {playing ? (
          <MuxPlayer
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

            <span className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-white/60" />
            <span className="absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-white/60" />
            <span className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-white/60" />
            <span className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-white/60" />

            {v.featured && (
              <span className="btn-grad ff-mono absolute left-6 top-6 rounded-full px-3 py-1 text-[10.5px] font-medium uppercase tracking-wider">
                ★ Featured
              </span>
            )}

            <span className="ff-mono absolute bottom-5 left-6 text-[10px] uppercase tracking-[0.2em] text-white/80">
              {v.gear}
            </span>

            <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-white/10 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6 fill-white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>

      {/* info */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <span className="ff-mono c-muted text-[10.5px] uppercase tracking-wider">
            {v.category}
            {v.location ? ` · ${v.location}` : ""}
          </span>
          {v.year && <span className="ff-mono c-muted text-[11px]">{v.year}</span>}
        </div>

        <h3 className="ff-head mt-1 text-2xl font-bold">{v.title}</h3>
        <p className="c-muted mt-1 text-sm">{v.tagline}</p>

        {v.notes && (
          <ul className="mt-4 space-y-2">
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
        )}

        {v.tags && (
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
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
  );
}

export default function PersonalWork() {
  const [filter, setFilter] = useState<string>("All");
  const list = personalVideos.filter((v) => filter === "All" || v.category === filter);

  return (
    <section id="personal-work" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle eyebrow="Personal work" title="Things I shoot for myself" />
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`ff-mono rounded-full px-4 py-2 text-xs transition-all ${
                  filter === f ? "btn-grad" : "btn-ghost c-muted"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-2">
          {list.map((v, i) => (
            <Reveal
              key={`${v.playbackId}-${i}`}
              delay={(i % 2) * 100}
              className={v.featured ? "lg:col-span-2" : ""}
            >
              <Card v={v} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
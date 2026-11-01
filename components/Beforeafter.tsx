"use client";

import { useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import { beforeAfterItems } from "@/data/Beforeafter";

type Item = (typeof beforeAfterItems)[number];

const frame = (id: string, t: number, w = 1280) =>
  `https://image.mux.com/${id}/thumbnail.jpg?time=${t}&width=${w}`;

function Compare({ item }: { item: Item }) {
  const [started, setStarted] = useState(false);
  const vertical = item.ratio === "9/16";

  return (
    <div className={`glass overflow-hidden rounded-3xl p-3 ${vertical ? "mx-auto max-w-[340px]" : ""}`}>
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-black"
        style={{ aspectRatio: item.ratio }}
      >
        {started ? (
          <MuxPlayer
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
            onClick={() => setStarted(true)}
            aria-label={`Play ${item.title}`}
            className="group absolute inset-0 h-full w-full"
          >
            {/* split poster: before frame on the left, after frame on the right */}
            {/* eslint-disable @next/next/no-img-element */}
            <img
              src={frame(item.playbackId, 1)}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <img
              src={frame(item.playbackId, item.afterAt + 1)}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              style={{ clipPath: "inset(0 0 0 50%)" }}
            />
            {/* eslint-enable @next/next/no-img-element */}
            <span className="absolute inset-0 bg-black/25" />
            <span className="absolute inset-y-0 left-1/2 w-px bg-white/80" />

            <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/50 bg-black/40 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6 fill-white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}

        {/* fixed label, always the same */}
        <span className="ff-mono pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur">
          Before &amp; After
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-3 pb-2 pt-4">
        <div className="min-w-0">
          <span className="ff-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--b)" }}>
            {item.category}
          </span>
          <h3 className="ff-head mt-1 text-lg font-semibold">{item.title}</h3>
          {item.description && <p className="c-muted mt-1 text-sm">{item.description}</p>}
        </div>

        {/* fixed text, not a button */}
        <p className="ff-mono c-muted text-[11px] uppercase tracking-[0.2em]">
          Before &nbsp;→&nbsp; After
        </p>
      </div>

      {item.tags && (
        <div className="flex flex-wrap gap-2 px-3 pb-3">
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
  );
}

export default function BeforeAfter() {
  const items = beforeAfterItems.filter((i) => !i.playbackId.startsWith("REPLACE"));

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
        <SectionTitle eyebrow="Before / After" title="From raw footage to the final look" />
        <p className="c-muted mt-4 max-w-2xl text-[16.5px] leading-relaxed">
          Each video shows the original footage first, then the finished edit.
        </p>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={`${item.playbackId}-${i}`} delay={(i % 2) * 100}>
              <Compare item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
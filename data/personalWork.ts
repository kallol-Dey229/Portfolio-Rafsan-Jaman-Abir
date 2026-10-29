export type PersonalVideo = {
  title: string;
  tagline: string;          // one-line summary
  category: string;         // used for the filter buttons
  playbackId: string;       // Mux dashboard → Asset → Playback ID
  ratio: "16/9" | "9/16";
  featured?: boolean;
  location?: string;
  year?: string;
  gear?: string;            // e.g. "DJI Avata 360"
  notes?: string[];         // short bullets: the idea, the shot, the edit
  tags?: string[];
};

export const personalVideos: PersonalVideo[] = [
  {
    title: "Over the River at Golden Hour",
    tagline: "A slow aerial reveal that ends in a city skyline.",
    category: "Aerial",
    playbackId: "REPLACE_WITH_MUX_PLAYBACK_ID",
    ratio: "16/9",
    featured: true,
    location: "Dhaka",
    year: "2026",
    gear: "DJI Air 3",
    notes: [
      "Shot at sunset with the tele lens for compressed layers.",
      "Cut to the beat of the track, graded warm with lifted shadows.",
    ],
    tags: ["Premiere Pro", "DaVinci Resolve", "Colour grade"],
  },
  {
    title: "Through the Old Streets",
    tagline: "One continuous 360° flight, reframed in post.",
    category: "360° FPV",
    playbackId: "REPLACE_WITH_MUX_PLAYBACK_ID",
    ratio: "16/9",
    location: "Old Dhaka",
    year: "2026",
    gear: "DJI Avata 360",
    notes: ["Reframed the 360 footage into a single smooth camera move."],
    tags: ["Reframe", "Speed ramp"],
  },
  {
    title: "Monsoon Mood",
    tagline: "Short vertical reel built around rain and sound.",
    category: "Reels",
    playbackId: "REPLACE_WITH_MUX_PLAYBACK_ID",
    ratio: "9/16",
    year: "2026",
    gear: "Phone + Air 3",
    notes: ["Sound-first edit with layered ambience."],
    tags: ["Reels", "Sound design"],
  },
];
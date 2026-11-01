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
    title: "Kala Kendra",
    tagline: "A cinematic film capturing the art, culture and atmosphere of Kala Kendra.",
    category: "Cultural film",
    playbackId: "gtP4O5D8wJWH7QtNI9e72xzrKtZm00xhEc02dEocX2sps",
    ratio: "16/9",
    featured: true,
    location: "Dhaka",
    year: "2023",
    gear: "DJI Air 3 & Iphone-14 pro max",
    notes: [
      "Aerial and ground shots combined to show the space and the people in it.",
      "Edited to the rhythm of the music, with a warm, natural colour grade.",
    ],
    tags: ["Premiere Pro", "DaVinci Resolve", "Colour grade"],
  },
  {
    title: "Pohela Boishakh",
    tagline: "A 360° FPV flight through the Bengali New Year celebration on campus.",
    category: "360° FPV",
    playbackId: "iBlkIlB4zXYUM9LzSkbYkBZIcYAimH5RRJbjlGa1XLc",
    ratio: "16/9",
    location: "AIUB, Dhaka",
    year: "2026",
    gear: "DJI Avata 360",
    notes: [
      "Flew the DJI Avata 360 through the crowd, colours and festival stalls, then reframed the 360° footage into one smooth camera move.",
      "Cut to the energy of the day, with speed ramps and a vibrant, festive grade.",
    ],
    tags: ["Avata 360", "Reframe", "Speed ramp", "Event coverage"],
  },
  {
    title: "Nature Colour Grade",
    tagline: "A colour grading study of open fields and a river, shaped for a natural, cinematic look.",
    category: "Colour grading",
    playbackId: "jtW37Cgh98uKVfuEb1CFRFBvqG6vKxPDaOvZH23pSsI",
    ratio: "9/16",
    location: "Open field & River",
    year: "2025",
    gear: "DJI Avata 360 + DJI Air 3",
    notes: [
      "Graded to bring out rich greens, soft skin-neutral tones and clean river highlights.",
      "Balanced contrast and lifted shadows for a calm, filmic mood.",
    ],
    tags: ["Colour grade", "DaVinci Resolve", "Landscape"],
  }

];
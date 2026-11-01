export type RestaurantVideo = {
  title: string;
  client: string;
  category: string;
  playbackId: string;
  ratio: "16/9" | "9/16";
  year?: string;
  tags?: string[];
};

export const services = [
  "Food cinematography",
  "Aerial exteriors",
  "360° FPV walkthroughs",
  "Ambience & interiors",
  "Colour grading",
  "Sound design",
];

export const restaurantVideos: RestaurantVideo[] = [
  {
    title: "Cinematic Restaurant Film",
    client: "Avantra",
    category: "Restaurant film",
    playbackId: "EEDb01SqDV9ruuHphf2AKr2qK400jKGaqcjknfykgWGF00",
    ratio: "16/9",
    year: "2026",
    tags: ["DJI Air 3", "DJI Avata 360"],
  },
  {
    title: "Outdoor & Aerial Showcase",
    client: "Hotel Baywatch",
    category: "Outdoor film",
    playbackId: "FcHJFDcQDunGRrp99Zh2oEx000100D0002t1nBWHG9inqUx8",
    ratio: "16/9",
    year: "2026",
    tags: ["DJI Air 3", "DJI Avata 360"],
  },
  {
    title: "360° FPV Walkthrough",
    client: "AL SHAM",
    category: "Restaurant film",
    playbackId: "zSTtz6Ob02qGM4JVSew45HeW01FTM7yeX9WeEruDVleOM",
    ratio: "16/9",
    year: "2026",
    tags: ["Avata 360", "FPV"],
  },
];
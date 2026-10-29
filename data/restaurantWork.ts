export type RestaurantVideo = {
  title: string;
  client: string;       // restaurant / cafe name
  category: string;     // e.g. "Aerial", "Food reel", "Brand film"
  playbackId: string;   // from Mux dashboard → Asset → Playback ID
  ratio: "16/9" | "9/16";
  year?: string;
  tags?: string[];
};

export const services = [
  "Food cinematography",
  "Aerial exteriors",
  "360° FPV walkthroughs",
  "Menu showcase reels",
  "Ambience & interiors",
  "Instagram Reels",
  "Colour grading",
  "Sound design",
];

export const restaurantVideos: RestaurantVideo[] = [
  {
    title: "Cinemetic Shoot",
    client: "AL SHAM",
    category: "Resturant film",
    playbackId: "zSTtz6Ob02qGM4JVSew45HeW01FTM7yeX9WeEruDVleOM",
    ratio: "16/9",
    year: "2026",
    tags: ["DJI Air 3", "DJI Avata 360"],
  },
  {
    title: "Signature Dish Reel",
    client: "Cafe Name",
    category: "Food reel",
    playbackId: "REPLACE_WITH_MUX_PLAYBACK_ID",
    ratio: "9/16",
    year: "2026",
    tags: ["Reels", "Macro"],
  },
  {
    title: "Inside the Dining Room",
    client: "Restaurant Name",
    category: "360° walkthrough",
    playbackId: "REPLACE_WITH_MUX_PLAYBACK_ID",
    ratio: "16/9",
    year: "2026",
    tags: ["Avata 360", "FPV"],
  },
];
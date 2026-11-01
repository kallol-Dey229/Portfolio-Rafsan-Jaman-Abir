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
  "Menu showcase reels",
  "Ambience & interiors",
  "Instagram Reels",
  "Colour grading",
  "Sound design",
];

export const restaurantVideos: RestaurantVideo[] = [
  {
    title: "Cinemetic Shoot",
    client: "Avantra",
    category: "Restaurant film",
    playbackId: "8Z00XG005M302lb5eQNooLmQB71y6TZzKNPTMjZq9vpZBA",
    ratio: "16/9",
    year: "2026",
    tags: ["DJI Air 3", "DJI Avata 360"],
  },
  {
    title: "Cinemetic Shoot",
    client: "Hotel Baywatch",
    category: "Restaurant outdoor",
    playbackId: "FcHJFDcQDunGRrp99Zh2oEx000100D0002t1nBWHG9inqUx8",
    ratio: "9/16",
    year: "2026",
    tags: ["DJI Air 3", "DJI Avata 360"],
  },
  {
    title: "Cinemetic Shoot",
    client: "AL SHAM",
    category: "Restaurant film",
    playbackId: "zSTtz6Ob02qGM4JVSew45HeW01FTM7yeX9WeEruDVleOM",
    ratio: "16/9",
    year: "2026",
    tags: ["Avata 360", "FPV"],
  },
];
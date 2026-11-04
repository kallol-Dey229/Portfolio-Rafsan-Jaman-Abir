export type BeforeAfterItem = {
  title: string;
  category: string;      
  playbackId: string;     
  afterAt: number;        
  ratio: "16/9" | "9/16";
  description?: string;
  tags?: string[];
};


export const beforeAfterItems: BeforeAfterItem[] = [
  {
  title: "Restaurant Film",
  category: "Restaurant film",
  playbackId: "NIiIVszFkD8024l5pVrBaTHaX5HgwONhCW1TeBp6VBF4",
  afterAt: 8,
  ratio: "9/16",
  description: "Raw restaurant footage first, then the graded and finished cinematic edit for Avantra.",
  tags: ["Avantra", "DJI Air 3", "DJI Avata 360", "Colour grade"],
},
  {
    title: "Colour Grading Process",
    category: "Colour grade",
    playbackId: "9T5wWFhVlhntexjPBzdiMoeeQc026FXbsSybVlGEZG00k",
    afterAt: 8,
    ratio: "9/16",
    description: "Flat footage first, then the graded result.",
    tags: ["DaVinci Resolve", "Colour grade"],
  }
];
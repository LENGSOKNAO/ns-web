export type DressStyle = {
  id: number;
  name: string;
  image: string;
  gridClass: string;
};

export const dressStyles: DressStyle[] = [
  {
    id: 1,
    name: "Casual",
    image: "/images/styles/style-casual.webp",
    gridClass: "md:col-span-1",
  },
  {
    id: 2,
    name: "Formal",
    image: "/images/styles/style-formal.webp",
    gridClass: "md:col-span-2",
  },
  {
    id: 3,
    name: "Party",
    image: "/images/styles/style-party.webp",
    gridClass: "md:col-span-2",
  },
  {
    id: 4,
    name: "Gym",
    image: "/images/styles/style-gym.webp",
    gridClass: "md:col-span-1",
  },
];

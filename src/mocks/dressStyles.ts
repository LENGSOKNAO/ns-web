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
    image: "/images/styles/casual.png",
    gridClass: "md:col-span-1",
  },
  {
    id: 2,
    name: "Formal",
    image: "/assets/images/styles/formal.png",
    gridClass: "md:col-span-2",
  },
  {
    id: 3,
    name: "Party",
    image: "/images/styles/party.png",
    gridClass: "md:col-span-2",
  },
  {
    id: 4,
    name: "Gym",
    image: "/images/styles/gym.png",
    gridClass: "md:col-span-1",
  },
];


import { Feature, FlooringType, Product } from "types/type";

export const features: Feature[] = [
  { id: 1, icon: "/assets/categoryslider/leftrightarrow.png", label: "125mm", width: 25, height: 25 },
  { id: 2, icon: "/assets/categoryslider/upbottomarrow.png", label: "10mm", width: 10, height: 20 },
  { id: 3, icon: "/assets/categoryslider/againupbottom.png", label: "300-1200mm", width: 5, height: 20 },
];

export const products: Product[] = [
  {
    id: 1,
    image: "/assets/categoryslider/Image.png",
    name: "Polar Herringbone SPC",
    price: "Only AED 55/m2",
  },
  {
    id: 2,
    image: "/assets/categoryslider/Image.png",
    name: "Polar SPC",
    price: "Only AED 55/m2",
  },
  {
    id: 3,
    image: "/assets/categoryslider/Image.png",
    name: "Richmond Eco SPC",
    price: "Only AED 55/m2",
  },
  {
    id: 4,
    image: "/assets/categoryslider/Image.png",
    name: "Product Three",
    price: "Only AED 55/m2",
  },
  {
    id: 5,
    image: "/assets/categoryslider/Image.png",
    name: "Product Three",
    price: "Only AED 55/m2",
  },
];


export const flooringTypes: FlooringType[] = [
    { name: "SPC Flooring", price: "AED 150m" },
    { name: "LVT Flooring", price: "AED 180m" },
    { name: "Polar Flooring", price: "AED 200m" },
    { name: "Richmond Flooring", price: "AED 220m" },
  ];

export const blocksData = [
  {
    id: 1,
    heading: 'SPC',
    points: [
      'Bullet points (also called simply “bullets”) draw the reader’s attention.',
      'They provide an easy way for you to present the most important ideas.',
      'The information following each bullet should be brief: ',
      'Bullet points (also called simply “bullets”) draw the reader’s attention.',
      'They provide an easy way for you to present the most important ideas.',
      'The information following each bullet should be brief: ',
    ],
    imageUrl: '/assets/layers/layer1.png',
  },
  {
    id: 2,
    heading: 'LVT',
    points: [
      'Bullet points (also called simply “bullets”) draw the reader’s attention.',
      'They provide an easy way for you to present the most important ideas.',
      'The information following each bullet should be brief: ',
      'Bullet points (also called simply “bullets”) draw the reader’s attention.',
      'They provide an easy way for you to present the most important ideas.',
      'The information following each bullet should be brief: ',
    ],
    imageUrl: '/assets/layers/layers2.png',
  },
];
export const FloorItemsData = [
  { id: 1, title: 'Herringbone Floor', imageUrl: '/assets/layers/Rectangle1.png'},
  { id: 2, title: 'Eco Floor ', imageUrl: '/assets/layers/Rectangle2.png' },
  { id: 3, title: 'Prime Floor', imageUrl: '/assets/layers/Rectangle3.png' },
];
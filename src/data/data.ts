
import { Feature, FlooringType, Product } from "types/type";

export const features: Feature[] = [
  { id: 1, icon: "/assets/categoryslider/leftrightarrow.png", label: "125mm", width: 25, height: 25 },
  { id: 2, icon: "/assets/categoryslider/upbottomarrow.png", label: "10mm", width: 10, height: 20 },
  { id: 3, icon: "/assets/categoryslider/againupbottom.png", label: "300-1200mm", width: 5, height: 20 },
];

export const products: Product[] = [
  {
    id: 1,
    image: "/assets/bin/Image.png",
    name: "Polar Herringbone SPC",
    price: "Only AED 55/m2",
  },
  {
    id: 2,
    image: "/assets/bin/Image.png",
    name: "Polar SPC",
    price: "Only AED 55/m2",
  },
  {
    id: 3,
    image: "/assets/bin/Image.png",
    name: "Richmond Eco SPC",
    price: "Only AED 55/m2",
  },
  {
    id: 4,
    image: "/assets/bin/Image.png",
    name: "Product Three",
    price: "Only AED 55/m2",
  },
  {
    id: 5,
    image: "/assets/bin/Image.png",
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


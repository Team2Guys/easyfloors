
import {FlooringType, Product } from "types/type";
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa';
// import leftrightarrow from "../../../public/assets/categoryslider/leftrightarrow.png";
// import upbottomarrow from "../../../public/assets/categoryslider/upbottomarrow.png";
// import againupbottom from "../../../public/assets/categoryslider/againupbottom.png";


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




export const footerData = {
    company: {
        name: 'easy floors',
        description:
            'Founded with a passion for quality and design. Easyfloors is committed to craftsmanship, customer satisfaction and great value for money.',
    },
    links: [
        {
            title: 'SPC FLOORING',
            items: ['Richmond SPC Eco', 'Richmond SPC Prime', 'Richmond SPC Herringbone', 'Polar SPC Herringbone', 'Polar SPC'],
        },
        {
            title: 'LVT FLOORING',
            items: ['Richmond LVT Comfort', 'Richmond LVT Luxury', 'Polar LVT'],
        },
        {
            title: 'RICHMOND FLOORING',
            items: ['Richmond SPC Eco', 'Richmond SPC Prime', 'Richmond SPC Herringbone', 'Richmond LVT Comfort', 'Richmond LVT Luxury'],
        },
        {
            title: 'POLAR FLOORING',
            items: ['Polar SPC', 'Polar SPC Herringbone', 'Polar LVT'],
        },
        {
            title: 'ACCESSORIES',
            items: ['SPC Skirting', 'Stair Nose', 'T Profile', 'Reducer', 'Quarter Round'],
        },
    ],
    contact: {
        address: 'Agsons, J1 Warehouses, Jebel Ali Industrial – Dubai',
        phone: '+971 50 597 4385',
        email: 'cs@easyfloors.ae',
    },
    social: [
        { icon: FaFacebookF, link: '#' },
        { icon: FaInstagram, link: '#' },
        { icon: FaPinterestP, link: '#' },
    ],
    paymentMethods: ['visa', 'apple-pay', 'tabby', 'mastercard', 'g-pay', 'tamara'],
};

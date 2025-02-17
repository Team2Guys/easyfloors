import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa';
import { Feature, FlooringType, Product } from "types/type";
//HomePage
export const heroItems = [
  {
    backgroundImage: "/assets/images/Home/hero.png",
    offerText: "Limited Time Offer",
    title: "High-Quality Flooring Get",
    highlight: "FREE Samples",
    description:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
    buttonText: "EXPLORE PRODUCTS",
    buttonLink: "/",
    priceText: "Only On AED 49/m²",
    flooringType: "SPC Eco • American Walnut",
    brand: "Polar",
  },
];

export const featureItems = [
    {
      title: "Free Samples",
      description:
        "Spread the cost of your new wood flooring via our low rate finance options 0% interest available at checkout with PayPal credit.",
      icon: "/assets/images/Home/free.png",
    },
    {
      title: "Easy payment",
      description:
        "Spread the cost of your new wood flooring via our low rate finance options 0% interest available at checkout with PayPal credit.",
      icon: "/assets/images/Home/card.png",
    },
    {
      title: "Delivery",
      description:
        "Spread the cost of your new wood flooring via our low rate finance options 0% interest available at checkout with PayPal credit.",
      icon: "/assets/images/Home/truck.png",
    },
    {
      title: "Factory Prices",
      description:
        "Spread the cost of your new wood flooring via our low rate finance options 0% interest available at checkout with PayPal credit.",
      icon: "/assets/images/Home/factory.png",
    },
  ];



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

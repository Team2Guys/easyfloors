import { SocialLink } from "types/types";
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa';
import { Feature, FlooringType, Product } from "types/type";


export const socialLinks: SocialLink[] = [
  { href: '/shpping', alt: 'facebook', className: 'w-[6px] h-[9px] sm:w-[8px] sm:h-[15px]' },
  { href: '/return', alt: 'instagram', className: 'w-[10px] h-[10px] sm:w-[16px] sm:h-[16px]' },
  { href: '/faqs', alt: 'pinterest', className: 'w-[8px] h-[11px] sm:w-[12px] sm:h-[16px]' },
];

  export const menuItems = [
    {
      label: 'SPC Flooring',
      href: '/',    
      submenu: [
        { label: 'SPC Wood', href: '/spc-wood' , image:"/assets/bin/Flooring.png" },
        { label: 'SPC Tiles', href: '/spc-tiles', image:"/assets/bin/Flooring.png" },
        { label: 'SPC Wood', href: '/spc-wood' , image:"/assets/bin/Flooring.png" },
        { label: 'SPC Tiles', href: '/spc-tiles', image:"/assets/bin/Flooring.png" },
        { label: 'SPC Wood', href: '/spc-wood' , image:"/assets/bin/Flooring.png" },
      ],
    },
    {
      label: 'LVT Flooring',
      href: '/',
      submenu: [
        { label: 'Luxury LVT', href: '/lvt-luxury', image:"/assets/bin/Flooring.png" },
        { label: 'Waterproof LVT', href: '/lvt-waterproof', image:"/assets/bin/Flooring.png" },
      ],
    },
    {
      label: 'Richmond Flooring',
      href: '/',
      submenu: [
        { label: 'Richmond Flooring', href: '/spc-wood' , image:"/assets/bin/Flooring.png" },
        { label: 'Richmond Eco SPC', href: '/spc-tiles', image:"/assets/bin/Eco.png" },
        { label: 'Richmond Herringbone SPC', href: '/spc-wood' , image:"/assets/bin/Herringbone.png" },
        { label: 'Richmond Comfort LVT', href: '/spc-tiles', image:"/assets/bin/Comfort.png" },
        { label: 'Richmond Luxury LVT', href: '/spc-wood' , image:"/assets/bin/Luxury.png" },
      ],
    },
    {
      label: 'Polar Flooring',
      href: '/',
      submenu: [
        { label: 'Polar Classic', href: '/polar-classic', image:"/assets/bin/Flooring.png" },
        { label: 'Polar Premium', href: '/polar-premium', image:"/assets/bin/Flooring.png" },
      ],
    },
    { label: 'How to measure', href: '/how-to-measure-your-room', },
    { label: 'Estimator', href: '/estimator', },
    { label: 'Accessories', href: '/accessories', },
    { label: 'About Us', href: '/about-us', },
    { label: 'Contact Us', href: '/contact-us', },
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
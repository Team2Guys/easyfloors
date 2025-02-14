import { SocialLink } from "types/types";


export const socialLinks: SocialLink[] = [
    { href: '/shpping', src: '/assets/images/icon/facebook.png', alt: 'facebook', width: 8, height: 16 },
    { href: '/return', src: '/assets/images/icon/instagram.png', alt: 'instagram', width: 16, height: 16 },
    { href: '/faqs', src: '/assets/images/icon/pinterest.png', alt: 'pinterest', width: 12, height: 16 },
  ];

  export const menuItems = [
    {
      label: 'SPC Flooring',
      href: '/',
      submenu: [
        { label: 'SPC Wood', href: '/spc-wood' , image:"/assets/bin/category.png" },
        { label: 'SPC Tiles', href: '/spc-tiles', image:"/assets/bin/category.png" },
        { label: 'SPC Wood', href: '/spc-wood' , image:"/assets/bin/category.png" },
        { label: 'SPC Tiles', href: '/spc-tiles', image:"/assets/bin/category.png" },
        { label: 'SPC Wood', href: '/spc-wood' , image:"/assets/bin/category.png" },
      ],
    },
    {
      label: 'LVT Flooring',
      href: '/',
      submenu: [
        { label: 'Luxury LVT', href: '/lvt-luxury', image:"/assets/bin/category.png" },
        { label: 'Waterproof LVT', href: '/lvt-waterproof', image:"/assets/bin/category.png" },
      ],
    },
    {
      label: 'Richmond Flooring',
      href: '/',
      submenu: [
        { label: 'Richmond Eco SPC', href: '/richmond-eco', image:"/assets/bin/category.png" },
        { label: 'Richmond Comfort LVT', href: '/richmond-comfort', image:"/assets/bin/category.png" },
      ],
    },
    {
      label: 'Polar Flooring',
      href: '/',
      submenu: [
        { label: 'Polar Classic', href: '/polar-classic', image:"/assets/bin/category.png" },
        { label: 'Polar Premium', href: '/polar-premium', image:"/assets/bin/category.png" },
      ],
    },
    { label: 'How to measure', href: '/', },
    { label: 'Estimator', href: '/', },
    { label: 'Accessories', href: '/', },
    { label: 'About Us', href: '/', },
    { label: 'Contact Us', href: '/', },
  ];
import { SocialLink } from "types/types";


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
    { label: 'About Us', href: '/about', },
    { label: 'Contact Us', href: '/contact-us', },
  ];
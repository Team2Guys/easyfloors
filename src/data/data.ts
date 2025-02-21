import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa';
import { BoxData, CardData, CollectionFeature, CollectionProduct, FAQItem, Feature, FlooringType, TBlogCard, TCategoryData, TImageBanner } from "types/type";
import { SocialLink } from "types/types";


export const generateSlug = (text: string) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};


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
    // { label: 'Estimator', href: '/estimator', },
    { label: 'Accessories', href: '/accessories', },
    { label: 'About Us', href: '/about-us', },
    { label: 'Contact Us', href: '/contact-us', },
  ];


export const features: Feature[] = [
  {  icon: "/assets/categoryslider/leftrightarrow.png", label: "125mm", width: 25, height: 25 },
  {  icon: "/assets/categoryslider/upbottomarrow.png", label: "10mm", width: 10, height: 20 },
  {  icon: "/assets/categoryslider/againupbottom.png", label: "300-1200mm", width: 5, height: 20 },
];



export const flooringTypes: FlooringType[] = [
  { 
    name: "SPC Flooring",
    price: "AED 150m²",
    product:[
      {
        image: "/assets/categoryslider/Image.webp",
        name: "Polar Herringbone SPC",
        price: "Only AED 55/m²",
      },
      {
        image: "/assets/categoryslider/Image.webp",
        name: "Polar SPC",
        price: "Only AED 55/m²",
      },
      {
        image: "/assets/categoryslider/Image.webp",
        name: "Richmond Eco SPC",
        price: "Only AED 55/m²",
      },
      {
        image: "/assets/categoryslider/Image.webp",
        name: "Product Three",
        price: "Only AED 55/m²",
      },
      {
        image: "/assets/categoryslider/Image.webp",
        name: "Product Three",
        price: "Only AED 55/m²",
      },
    ]
  },
  { 
    name: "LVT Flooring", 
    price: "AED 180m²",
    product:[
      {
        image: "/assets/categoryslider/Image.webp",
        name: "Polar Herringbone SPC",
        price: "Only AED 55/m²",
      },
      {
        image: "/assets/categoryslider/Image.webp",
        name: "Polar SPC",
        price: "Only AED 55/m²",
      },
      {
        image: "/assets/categoryslider/Image.webp",
        name: "Richmond Eco SPC",
        price: "Only AED 55/m²",
      },
    ]
  },
  { 
    name: "Polar Flooring", 
    price: "AED 200m²",
    product:[
      {
        image: "/assets/categoryslider/Image.webp",
        name: "Polar Herringbone SPC",
        price: "Only AED 55/m²",
      },
      {
        image: "/assets/categoryslider/Image.webp",
        name: "Polar SPC",
        price: "Only AED 55/m²",
      },
      {
        image: "/assets/categoryslider/Image.webp",
        name: "Richmond Eco SPC",
        price: "Only AED 55/m²",
      },
    ]
  },
  { 
    name: "Richmond Flooring", 
    price: "AED 220m²",
    product:[
      {
        image: "/assets/categoryslider/Image.webp",
        name: "Polar Herringbone SPC",
        price: "Only AED 55/m²",
      },
      {
        image: "/assets/categoryslider/Image.webp",
        name: "Polar SPC",
        price: "Only AED 55/m²",
      },
      {
        image: "/assets/categoryslider/Image.webp",
        name: "Richmond Eco SPC",
        price: "Only AED 55/m²",
      },
      {
        image: "/assets/categoryslider/Image.webp",
        name: "Product Three",
        price: "Only AED 55/m²",
      },
      {
        image: "/assets/categoryslider/Image.webp",
        name: "Product Three",
        price: "Only AED 55/m²",
      },
    ]
  },
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
        address: 'Agsons, J1 Warehouses, Jebel Ali  Industrial – Dubai',
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


export const imageData: TImageBanner = {
  src: '/assets/category/fiveTree.png',
  alt: 'Picture of the author',
};

export const blogCards: TBlogCard[] = [
  {
    id: 1,
    title: "I Am",
    heading: "Polar SPC <br /> Herringbone",
    Link: "/category/",
    backgroundImage: '/assets/category/iam.png',
    features: ["Waterproof", "Scratch proof", "Durable", "Easy to clean"],

  },
  {
    id: 2,
    title: "I Am",
    heading: "Polar <br /> SPC",
    Link: "/category/",
    backgroundImage: '/assets/category/Image7.webp',
    features: ["Waterproof", "Scratch proof", "Durable", "Easy to clean"],
  },
  {
    id: 3,
    title: "I Am",
    heading: "POLAR <br /> LCT",
    Link: "/category/",
    backgroundImage: '/assets/category/Image6.webp',
    features: ["Waterproof", "Scratch proof", "Durable", "Easy to clean"],
  },
  {
    id: 4,
    title: "I Am",
    heading: "RECHMOND <br /> SPC Eco",
    Link: "/category/",
    backgroundImage: '/assets/category/Image5.webp',
    features: ["Waterproof", "Scratch proof", "Durable", "Easy to clean"],
  },
  {
    id: 5,
    title: "I Am",
    heading: "Richmond <br /> SPC Prime",
    Link: "/category/",
    backgroundImage: '/assets/category/Image2.webp',
    features: ["Waterproof", "Scratch proof", "Durable", "Easy to clean"],
  },
  {
    id: 6,
    title: "I Am",
    heading: "Richmond LVT <br /> Comfort",
    Link: "/category/",
    backgroundImage: '/assets/category/Image1.webp',
    features: ["Waterproof", "Scratch proof", "Durable", "Easy to clean"],
  },
  {
    id: 7,
    title: "I Am",
    heading: "Richmond LVT <br /> Luxury",
    Link: "/category/",
    backgroundImage: '/assets/category/Image3.webp',
    features: ["Waterproof", "Scratch proof", "Durable", "Easy to clean"],
  },
  {
    id: 8,
    title: "I Am",
    heading: "Richmond SPC <br /> Herringbone",
    Link: "/category/",
    backgroundImage: '/assets/category/Image4.webp',
    features: ["Waterproof", "Scratch proof", "Durable", "Easy to clean"],
  },
];

export const categoryData: TCategoryData = {
  title: "What Am I?",
  subtitle: "(Compare us)",
  description:
    "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  backgroundImage: "/assets/category/campare-us.png", 
};
export const HomeUserInfo = [
  {
    title: 'Budget Friendly',
    description:
      "High-quality flooring doesn’t have to cost a fortune. Our durable, stylish options are available at factory prices, so you can enjoy premium designs for a fraction of the cost. Stylish and affordable flooring without compromising quality.",
    image: '/assets/images/UserInfo/budget.png',
    icon: '/assets/images/UserInfo/budget-icon.png',
    reverse: true,
  },
  {
    title: 'Overlay Ready',
    description:
      "Skip the hassle of removing old floors. You can install our flooring directly over most existing surfaces, saving time, effort, and money on installation. A smooth transition with minimal disruption.",
    image: '/assets/images/UserInfo/overlay.png',
    icon: '/assets/images/UserInfo/overlay-icon.png',
    reverse: false,
  },
]
export const deliveryCharges = [
  {
    location: 'Dubai ( Next Day Delivery )',
    charges: [
      'Under AED 1,000 - AED 50',
      'Above AED 1,000 - Free',
    ],
  },
  {
    location: 'Sharjah, Ajman, Umm Al Quwain ( 2 Working Days )',
    charges: [
      'Under AED 1,000 - AED 100',
      'Above AED 1,000 - Free',
    ],
  },
  {
    location: 'Abu Dhabi, Fujairah, Ras Al Khaimah ( 2 Working Days )',
    charges: [
      'Under AED 1,000 - AED 200',
      'Above AED 1,000 - Free',
    ],
  },
];
export const policySections = [
  {
    title: 'Can I Return A Purchased Product From EasyFloors.AE, If I Have A Change of Mind?',
    content: [
      'You can return any item within 7 days of receiving your order if it is unused, and in its original packing.',
      'Begin a return simply by emailing our friendly customer service team at <a href="mailto:cs@easyfloors.ae" target="_blank" class="font-bold">cs@easyfloors.ae</a> with your order number and a 2-3 sentence explanation of why you’re returning an item.',
      "We'll get back to you within 24 hours, and we'll give you a return authorisation number (RAN) that you need to include with the package when you send it back to be processed.",
      "Once we get and accept your return, we'll send you your money back. It could take a few days to show up in your account, but we'll start the return process right away.",
    ]
  },
  {
    title: 'What Should I Do If I Receive A Defective Item?',
    content: [
      'If we send you a faulty set, please adhere to the above instructions. You need to enter in the subject line of the email “Defective – Order Number”. We shall respond to your request promptly and offer a substitute for the order.',
      'We understand that if there is an issue with the installation of an item, it will remain unused. For this, you can write to us at <a href="mailto:cs@easyfloors.ae" class="font-bold" target="_blank">cs@easyfloors.ae</a> and we will arrange for one of our skilled representatives to visit the site.'
    ]
  },
  {
    title: 'Who Pays For Return Shipping?',
    content: [
      'If you want to return an item you purchased from us, you will need to pay for the return shipping unless the item is faulty or we sent you the wrong order.',
      'We recommend using a trackable shipping method so we can track the package with you and easyfloors.ae as it comes to you. This will ensure the product gets back to you on time. If the item gets lost or the courier drops it, we can’t help and won’t refund.',
      ' • Items That Are Final Sale',
      ' • Items available during the sale and promotion period',
      ' • Items not in pristine condition, worn or damaged'
    ]
  },
  {
    title: 'Refund Process',
    content: [
      "Once the product has reached our warehouse, we will initiate the refund. The mode of payment will determine how we process the refund: If you paid by card, the refund will be credited back to the same card within four working days after the product is received.",
      "Once we complete the refund process, the duration taken for the funds to reflect in your account will depend on your bank's processing policies. If you need to follow up with your bank or card provider, we will inform you when all actions on our site are completed.",
      "If the payment was made in cash, then the refund will be processed through bank deposit or transfer as soon as we receive the required information from you.",
    ]
  },
  {
    title: 'Get in Touch',
    content: [
      "Have questions about our return and refund policy? Reach out to us at cs@easyfloors.ae. Our customer service team is here to help from 9 am to 6 pm, Monday to Saturday (except on public holidays).",
      'Thanks for shopping with <a href="/" class="font-bold" target="_blank">easyfloors.ae</a>.'
    ]
  },
];
export const faqs: FAQItem[] = [
  {
    id: 1,
    question: "Q. What makes vinyl flooring a good choice for high-traffic areas?",
    answer:
      "Vinyl flooring Abu Dhabi is highly durable and resistant to wear and tear, making it ideal for high-traffic areas. Its water-resistant and scratch-resistant properties ensure it maintains its appearance and functionality even in busy environments.",
  },
  {
    id: 2,
    question: "How long until we deliver your first blog post?",
    answer:
      "Your first consultation will include a comprehensive discussion about your health history and a tailored treatment plan.",
  },
  {
    id: 3,
    question: "How long until we deliver your first blog post?",
    answer: "We are open Monday to Friday from 9 AM to 6 PM.",
  },
  {
    id: 4,
    question: "Do I need a referral?",
    answer:
      "No referral is needed. You can directly book an appointment with us.",
  },
];



export const boxData:BoxData[] = [
  {
    id: 1,
    title: 'Need help with measurement?',
    description: `is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`,
    buttonText: 'Learn More',
    icon: '/assets/images/Home/measure1.png',
  },
  {
    id: 2,
    title: 'Need help with installation',
    description: `is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`,
    buttonText: 'Learn More',
    icon: '/assets/images/Home/Vectorrg.png',
  }
];

export const popupCards: CardData[] = [
  {
    id: 1,
    heading: "Richmond <br /> SPC Eco",
    content: [
      "Cras ornare tristique elit.",
      "Nunc dignissim risus id is",
      "Cras ornare tristique elit.",
      "Nunc dignissim risus id is",
      "Nunc dignissim risus id is",
    ],
  },
  {
    id: 2,
    heading: "Richmond  <br /> SPC Prime",
    content: [
      "Cras ornare tristique elit.",
      "Nunc dignissim risus id is",
      "Cras ornare tristique elit.",
      "Nunc dignissim risus id is",
      "Nunc dignissim risus id is",
    ],
  },
  {
    id: 3,
    heading: "Richmond SPC <br /> Herringbone",
    content: [
      "Cras ornare tristique elit.",
      "Nunc dignissim risus id is",
      "Cras ornare tristique elit.",
      "Nunc dignissim risus id is",
      "Nunc dignissim risus id is",
    ],
  },
  {
    id: 4,
    heading: "Richmond LVT <br /> Comfort",
      content: [
      "Cras ornare tristique elit.",
      "Nunc dignissim risus id is",
      "Cras ornare tristique elit.",
      "Nunc dignissim risus id is",
      "Nunc dignissim risus id is",
    ],
  },
  {
    id: 5,
    heading: "Richmond LVT <br /> Luxury",
    content: [
      "Cras ornare tristique elit.",
      "Nunc dignissim risus id is",
      "Cras ornare tristique elit.",
      "Nunc dignissim risus id is",
      "Nunc dignissim risus id is",
    ],
  },
  {
    id: 6,
    heading: "Polar <br /> SPC",
    content: [
      "Cras ornare tristique elit.",
      "Nunc dignissim risus id is",
      "Cras ornare tristique elit.",
      "Nunc dignissim risus id is",
      "Nunc dignissim risus id is",
    ],
  },
  {
    id: 7,
    heading: "Polar SPC <br /> Herringbone",
    content: [
      "Cras ornare tristique elit.",
      "Nunc dignissim risus id is",
      "Cras ornare tristique elit.",
      "Nunc dignissim risus id is",
      "Nunc dignissim risus id is",
    ],
  },
  {
    id: 7,
    heading: "Polar <br /> LVT",
    content: [
      "Cras ornare tristique elit.",
      "Nunc dignissim risus id is",
      "Cras ornare tristique elit.",
      "Nunc dignissim risus id is",
      "Nunc dignissim risus id is",
    ],
  },
];

export const collectionProducts: CollectionProduct[] = [
  {
    id: "1",
    image: "/assets/allcollection/image1.png",
    name: "Polar  Herringbone SPC",
    price: "6 Items",
  },
  {
    id: "2",
    image: "/assets/allcollection/image1.png",
    name: "Polar Floorings",
    price: "25 Items",
  },
  {
    id: "3",
    image: "/assets/allcollection/image2.png",
    name: "Polar LVT",
    price: "10 Items",
  },
  {
    id: "4",
    image: "/assets/allcollection/image3.png",
    name: "Polar SPC",
    price: "9 Items",
  },
  {
    id: "5",
    image: "/assets/allcollection/image6.png",
    name: "Richmond Comfort LVT",
    price: "8 Items",
  },
  {
    id: "6",
    image: "/assets/allcollection/image6.png",
    name: "Richmond Eco SPC",
    price: "10 Items",
  },
  {
    id: "7",
    image: "/assets/allcollection/image6.png",
    name: "Richmond Floorings",
    price: "34 Items",
  },
  {
    id: "8",
    image: "/assets/allcollection/image7.png",
    name: "Richmond Herringbone SPC",
    price: "6 Items",
  },
  {
    id: "9",
    image: "/assets/allcollection/image9.png",
    name: "Richmond Luxury LVT",
    price: "5 Items",
  },
  {
    id: "10",
    image: "/assets/allcollection/image0.png",
    name: "Richmond Prime SPC",
    price: "6 Items",
  },
];

export const collectionFeatures: CollectionFeature[] = [
  { id: 1, icon: "/assets/categoryslider/leftrightarrow.png", label: "125mm", width: 25, height: 25 },
  { id: 2, icon: "/assets/categoryslider/upbottomarrow.png", label: "10mm", width: 10, height: 20 },
  { id: 3, icon: "/assets/categoryslider/againupbottom.png", label: "300-1200mm", width: 5, height: 20 },
];


export const product=[
  {
    
    image: "/assets/categoryslider/Image.webp",
    name: "Polar Herringbone SPC - American Walnut",
    price: "Only AED 55/m²",
  },
  {
    image: "/assets/categoryslider/Image.webp",
    name: "Polar SPC",
    price: "Only AED 55/m²",
    stock: 0
  },
  {
    image: "/assets/categoryslider/Image.webp",
    name: "Richmond Eco SPC",
    price: "Only AED 55/m²",
  },
  {
    image: "/assets/categoryslider/Image.webp",
    name: "Product Three",
    price: "Only AED 55/m²",
  },
  {
    image: "/assets/categoryslider/Image.webp",
    name: "Product Three",
    price: "Only AED 55/m²",
  },
  {
    image: "/assets/categoryslider/Image.webp",
    name: "Polar SPC",
    price: "Only AED 55/m²",
  },
  {
    image: "/assets/categoryslider/Image.webp",
    name: "Richmond Eco SPC",
    price: "Only AED 55/m²",
  },
  {
    image: "/assets/categoryslider/Image.webp",
    name: "Product Three",
    price: "Only AED 55/m²",
  },
  {
    image: "/assets/categoryslider/Image.webp",
    name: "Product Three",
    price: "Only AED 55/m²",
  },
]

export const categories = [
  {
    title: "Polar",
    items: [
      "Polar",
      "Richmond Floorings",
      "Manufacturer"
    ]
  },
  {
    title: "Richmond Floorings",
    items: [
      "Richmond Prime SPC",
      "Richmond Herringbone SPC",
      "Richmond Comfort LVT"
    ]
  },
  {
    title: "Manufacturer",
    items: [
      "Richmond Prime SPC",
      "Richmond Herringbone SPC",
      "Richmond Comfort LVT"
    ]
  },
  {
    title: "Style",
    items: [
      "Richmond Prime SPC",
      "Richmond Herringbone SPC",
      "Richmond Comfort LVT"
    ]
  },
  {
    title: "Color",
    items: [
      "Richmond Prime SPC",
      "Richmond Herringbone SPC",
      "Richmond Comfort LVT"
    ]
  }
];
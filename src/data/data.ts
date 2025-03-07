import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa';
import { BoxData, CardData, CollectionFeature, CollectionProduct, FAQItem, Feature, FlooringType, ITabbyList, ITabbyPayList, ITamaraList, HeroItem, TBlogCard, TCategoryData, TImageBanner } from "types/type";
import { FAQ, SampleGridData, SocialLink, TAboutUs, } from "types/types";
import * as Yup from 'yup';
import palette from '../../public/assets/images/icon/chat-46.png';
import delivery from '../../public/assets/images/icon/delivery-fast.png';
import privacy from '../../public/assets/images/icon/privacy.png';
import support from '../../public/assets/images/icon/chat-46.png';
import masterCard from './../../public/assets/images/payment-icons/Mastercard-Logo.png'
import viseCard from './../../public/assets/images/payment-icons/visacard-logo.png'
import gPayCard from './../../public/assets/images/payment-icons/googlepay-logo.png'
import { StaticImageData } from 'next/image';
import { EDIT_PRODUCT_PROPS } from 'types/prod';
import { EDIT_CATEGORY, ISUBCATEGORY_EDIT } from 'types/cat';

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


export const initialValues = {
  firstname: "",
  phoneNumber: "",
  whatsappNumber: "",
  email: "",
  area: "",
  selectRooms: "",
  preferredDate: "",
  preferredTime: "",
  findUs: "",
  comment: "",
  contactMethod: {
    whatsapp: false,
    telephone: false,
    email: false,
  },
};

export const validationSchema = Yup.object({
  firstname: Yup.string().required("Name is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Invalid phone number")
    .required("Phone number is required"),
  whatsappNumber: Yup.string().matches(
    /^\d{10}$/,
    "Invalid WhatsApp number"
  ),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  area: Yup.string().required("Area is required"),
  selectRooms: Yup.string().required("Select the number of rooms"),
  preferredDate: Yup.string().required("Preferred date is required"),
});

export const categoryInitialValues: EDIT_CATEGORY = {
  name: '',
  description: '',
  short_description: '',
  Meta_Description: '',
  Meta_Title: '',
  Canonical_Tag: '',
  custom_url: ""
};

export const subcategoryValidationSchema = Yup.object({
  name: Yup.string().required('Add Sub Category Name'),
  category: Yup.string().required('Select Category'),
  custom_url: Yup.string().required('Custom URL is required'),
});

export const categoryValidationSchema = Yup.object({
  name: Yup.string().required('Add  Category Name'),
  custom_url: Yup.string().required('Custom URL is required'),
});

export const subcategoryInitialValues: ISUBCATEGORY_EDIT = {
  name: '',
  description: '',
  short_description: '',
  Meta_Description: '',
  Meta_Title: '',
  custom_url: "",
  category: "",
  Canonical_Tag:"",
  whatamIdetails:[],
  whatAmiTopHeading:""


};


export const AddproductsinitialValues: EDIT_PRODUCT_PROPS = {
  id: 0, // Default value for id (should be generated dynamically)
  name: '',
  price: 0,
  description: '',
  stock: 0,
  discountPrice: 0,
  sale: '', // Added optional property
  colors: [], // Added optional property
  spacification: [],
  posterImageUrl: { imageUrl: "", public_id: "" }, // Must be an array of `ProductImage`
  productImages: [], // Must be an array of `ProductImage`
  hoverImageUrl: { imageUrl: "", public_id: "" }, 
  AdditionalInformation: [],
  custom_url: '',
  plankWidth: '',
  thickness: '',
  ResidentialWarranty: '',
  CommmericallWarranty: '',
  waterproof:false,
  Meta_Title: '',
  Canonical_Tag: '',
  Meta_Description: '',
};

export const AddProductvalidationSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').required('Product Name is Required'),
  description: Yup.string().required('Description is  Required'),
  custom_url: Yup.string().required('Custom Url is Required'),
  price: Yup.number()
    .min(1, 'Minimum sales price must be at least 1')
    .required('Required'),
  discountPrice: Yup.number().nullable(),
});



interface IServiceItem {
  id: number;
  icon: StaticImageData;
  title: string;
}

export const serviceItems: IServiceItem[] = [
  {
    id: 1,
    icon: palette,
    title: 'Unique Everything',
  },
  {
    id: 2,
    icon: delivery,
    title: 'Free Shipping & Return',
  },
  {
    id: 3,
    icon: privacy,
    title: 'Secure Payments',
  },
  {
    id: 4,
    icon: support,
    title: 'Support Customer',
  },
];

export const Appointmentlocation = [
  { value: "Downtown Dubai", label: "Downtown Dubai" },
  { value: "Jumeirah", label: "Jumeirah" },
  { value: "Dubai Marina", label: "Dubai Marina" },
  { value: "Deira", label: "Deira" },
  { value: "Bur Dubai", label: "Bur Dubai" },
  { value: "Al Quoz", label: "Al Quoz" },
  { value: "Business Bay", label: "Business Bay" },
  { value: "Al Barsha", label: "Al Barsha" },
  { value: "Silicon Oasis", label: "Silicon Oasis" },
  { value: "Dubai Internet City", label: "Dubai Internet City" },
]

export const FindUs = [
  { value: "Google", label: "Google" },
  { value: "Tiktok", label: "Tiktok" },
  { value: "Facebook", label: "Facebook" },
  { value: "Friends", label: "Friends" },
  { value: "ReturningCustomer", label: "Returning Customer" },
  { value: "Radio", label: "Radio" },
  { value: "Other", label: "Other" },
]


export const heroItems: HeroItem[] = [ 
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
      { label: 'SPC Wood', href: '/spc-wood', image: "/assets/bin/Flooring.png" },
      { label: 'SPC Tiles', href: '/spc-tiles', image: "/assets/bin/Flooring.png" },
      { label: 'SPC Wood', href: '/spc-wood', image: "/assets/bin/Flooring.png" },
      { label: 'SPC Tiles', href: '/spc-tiles', image: "/assets/bin/Flooring.png" },
      { label: 'SPC Wood', href: '/spc-wood', image: "/assets/bin/Flooring.png" },
    ],
  },
  {
    label: 'LVT Flooring',
    href: '/',
    submenu: [
      { label: 'Luxury LVT', href: '/lvt-luxury', image: "/assets/bin/Flooring.png" },
      { label: 'Waterproof LVT', href: '/lvt-waterproof', image: "/assets/bin/Flooring.png" },
    ],
  },
  {
    label: 'Richmond Flooring',
    href: '/',
    submenu: [
      { label: 'Richmond Flooring', href: '/spc-wood', image: "/assets/bin/Flooring.png" },
      { label: 'Richmond Eco SPC', href: '/spc-tiles', image: "/assets/bin/Eco.png" },
      { label: 'Richmond Herringbone SPC', href: '/spc-wood', image: "/assets/bin/Herringbone.png" },
      { label: 'Richmond Comfort LVT', href: '/spc-tiles', image: "/assets/bin/Comfort.png" },
      { label: 'Richmond Luxury LVT', href: '/spc-wood', image: "/assets/bin/Luxury.png" },
    ],
  },
  {
    label: 'Polar Flooring',
    href: '/',
    submenu: [
      { label: 'Polar Classic', href: '/polar-classic', image: "/assets/bin/Flooring.png" },
      { label: 'Polar Premium', href: '/polar-premium', image: "/assets/bin/Flooring.png" },
    ],
  },
  { label: 'How to measure', href: '/how-to-measure-your-room', },
  // { label: 'Estimator', href: '/estimator', },
  { label: 'Accessories', href: '/accessories', },
  { label: 'About Us', href: '/about-us', },
  { label: 'Contact Us', href: '/contact-us', },
];


export const features: Feature[] = [
  { icon: "/assets/categoryslider/leftrightarrow.png", label: "125mm", width: 25, height: 25 },
  { icon: "/assets/categoryslider/upbottomarrow.png", label: "10mm", width: 10, height: 20 },
  { icon: "/assets/categoryslider/againupbottom.png", label: "300-1200mm", width: 5, height: 20 },
];


export const ThumnailImage = [
  {image:"/assets/bin/slider.png"},
  {image:"/assets/bin/slider.png"},
  {image:"/assets/bin/slider.png"},
  {image:"/assets/bin/slider.png"},
  {image:"/assets/bin/slider.png"},
  {image:"/assets/bin/slider.png"},
  {image:"/assets/bin/slider.png"},
  {image:"/assets/bin/slider.png"},
  {image:"/assets/bin/slider.png"},
  {image:"/assets/bin/slider.png"},
  {image:"/assets/bin/slider.png"},
  {image:"/assets/bin/slider.png"},
  {image:"/assets/bin/slider.png"},
  {image:"/assets/bin/slider.png"},
  {image:"/assets/bin/slider.png"},
  {image:"/assets/bin/slider.png"},
  {image:"/assets/bin/slider.png"},
  {image:"/assets/bin/slider.png"},
  {image:"/assets/bin/slider.png"},
  {image:"/assets/bin/slider.png"},
  {image:"/assets/bin/slider.png"},
  {image:"/assets/bin/slider.png"},
  {image:"/assets/bin/slider.png"},
  {image:"/assets/bin/slider.png"},
]
export const ThumnailBottom = [
  {image:"/assets/bin/thumb1.png" , title:"Click lock system"},
  {image:"/assets/bin/thumb2.png" ,title:"Layers of SPC or LVT"},
  {image:"/assets/bin/thumb2.png" ,title:"Waterproof"},
  {image:"/assets/bin/thumb4.png" ,title:"Easy to clean"},
  {image:"/assets/bin/thumb5.png" ,title:"Scratch resistant"},
  {image:"/assets/bin/thumb6.png" ,title:"the packaging"},

]
export const flooringTypes: FlooringType[] = [
  {
    name: "SPC Flooring",
    price: "AED 150m²",
    product: [
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
    product: [
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
    product: [
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
    product: [
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
      items: ['SPC Skirting', 'L Shape Skirting', 'Stair Nose', 'T Profile', 'Reducer', 'Quarter Round'],
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
  { id: 1, title: 'Herringbone Floor', imageUrl: '/assets/layers/Herringbone-Floor.webp' },
  { id: 2, title: 'Eco Floor ', imageUrl: '/assets/layers/Eco-Floor.webp' },
  { id: 3, title: 'Prime Floor', imageUrl: '/assets/layers/Prime-Floor.webp' },
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
    Link: "/what-am-i/",
    backgroundImage: '/assets/category/Polar-Spc-Herringbone.webp',
    features: ["Waterproof", "Scratch proof", "Durable", "Easy to clean"],

  },
  {
    id: 2,
    title: "I Am",
    heading: "Polar <br /> SPC",
    Link: "/what-am-i/",
    backgroundImage: '/assets/category/Polar-SPC.webp',
    features: ["Waterproof", "Scratch proof", "Durable", "Easy to clean"],
  },
  {
    id: 3,
    title: "I Am",
    heading: "Polar <br /> LVT",
    Link: "/what-am-i/",
    backgroundImage: '/assets/category/Polar-LVT.webp',
    features: ["Waterproof", "Scratch proof", "Durable", "Easy to clean"],
  },
  {
    id: 4,
    title: "I Am",
    heading: "Richmond <br /> SPC Eco",
    Link: "/what-am-i/",
    backgroundImage: '/assets/category/Richmond-SPC-Eco.webp',
    features: ["Waterproof", "Scratch proof", "Durable", "Easy to clean"],
  },
  {
    id: 5,
    title: "I Am",
    heading: "Richmond <br /> SPC Prime",
    Link: "/what-am-i/",
    backgroundImage: '/assets/category/Richmond-SPC-Prime.webp',
    features: ["Waterproof", "Scratch proof", "Durable", "Easy to clean"],
  },
  {
    id: 6,
    title: "I Am",
    heading: "Richmond LVT <br /> Comfort",
    Link: "/what-am-i/",
    backgroundImage: '/assets/category/Richmond-LVT-Comfort.webp',
    features: ["Waterproof", "Scratch proof", "Durable", "Easy to clean"],
  },
  {
    id: 7,
    title: "I Am",
    heading: "Richmond LVT <br /> Luxury",
    Link: "/what-am-i/",
    backgroundImage: '/assets/category/Richmond-LVT-Luxury.webp',
    features: ["Waterproof", "Scratch proof", "Durable", "Easy to clean"],
  },
  {
    id: 8,
    title: "I Am",
    heading: "Richmond SPC <br /> Herringbone",
    Link: "/what-am-i/",
    backgroundImage: '/assets/category/Richmond-SPC-Herringbone.webp',
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
    image: '/assets/images/UserInfo/overlay.webp',
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



export const boxData: BoxData[] = [
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


export const product = [
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

export const faqspage: FAQ[] = [
  { question: "What is your return policy?", answer: "Bullet points (also called simply “bullets”) draw the reader’s attention. They provide an easy way for you to present the most important ideas.The information following each bullet should be brief: Bullet points (also called simply “bullets”) draw the reader’s attention. They provide an easy way for you to present the most important ideas.The information following each bullet should be brief: " },
  { question: "Do you offer international shipping?", answer: "Bullet points (also called simply “bullets”) draw the reader’s attention. They provide an easy way for you to present the most important ideas.The information following each bullet should be brief: Bullet points (also called simply “bullets”) draw the reader’s attention. They provide an easy way for you to present the most important ideas.The information following each bullet should be brief: " },
  { question: "How can I contact customer support?", answer: "Bullet points (also called simply “bullets”) draw the reader’s attention. They provide an easy way for you to present the most important ideas.The information following each bullet should be brief: Bullet points (also called simply “bullets”) draw the reader’s attention. They provide an easy way for you to present the most important ideas.The information following each bullet should be brief: " },
  { question: "What payment methods do you accept?", answer: "Bullet points (also called simply “bullets”) draw the reader’s attention. They provide an easy way for you to present the most important ideas.The information following each bullet should be brief: Bullet points (also called simply “bullets”) draw the reader’s attention. They provide an easy way for you to present the most important ideas.The information following each bullet should be brief: " },
  { question: "Do you have a physical store?", answer: "No, we are an online-only store." },
  { question: "How long does delivery take?", answer: "Standard shipping takes 5-7 business days." },
  { question: "Can I modify my order after placing it?", answer: "Yes, within 24 hours of order confirmation." },
  { question: "Are your products covered by a warranty?", answer: "Yes, all products come with a 1-year warranty." },
  { question: "Do you offer bulk discounts?", answer: "Yes, we provide bulk discounts on large orders." },
  { question: "Is my personal data secure?", answer: "Yes, we use advanced encryption for data security." },
  { question: "Can I track my order?", answer: "Yes, we provide tracking details once shipped." },
  { question: "What happens if I receive a damaged product?", answer: "Contact us immediately for a replacement." },
];

export const tabbyfeature: ITabbyList[] = [
  { id: 1, para: 'No interest. No fees.' },
  { id: 2, para: 'Trusted by 4,5m+ customers.' },
  { id: 3, para: 'Shariah-compliant.' },
];

export const tabbyhowitwork: ITabbyList[] = [
  { id: 1, para: 'Choose Tabby at checkout' },
  { id: 2, para: 'Enter your information and add your debit or credit card.' },
  { id: 3, para: 'Your first payment is taken when the order is made.' },
  { id: 4, para: 'We will send you a reminder when your next payment is due' },
];

export const tabbypayicon: ITabbyPayList[] = [
  { id: 1, imageUrl: masterCard },
  { id: 2, imageUrl: viseCard },
  { id: 3, imageUrl: gPayCard },
];

export const tamarawhy: ITamaraList[] = [
  { id: 1, para: 'Sharia-compliant' },
  { id: 2, para: 'No late fees' },
  { id: 3, para: 'Quick and easy' },
];
export const tamaralist: ITamaraList[] = [
  {
    id: 1,
    para: 'Payment options availability may vary based on your order value and Tamara record.',
  },
  { id: 2, para: 'Subject to terms and conditions.' },
  { id: 3, para: 'Tamara is Sharia-compliant.' },
  { id: 4, para: 'Eligible for customers in United Arab Emirates.' },
  {
    id: 5,
    para: 'Your final payment plan may vary depending on your credit history.',
  },
];

export const tamarafeature: ITamaraList[] = [
  {
    id: 1,
    title: 'Split in 4',
    para: 'Pay a fraction now and the rest in 3 payments over the next 3 months. No late fees, shariah-compliant!*',
  },
  {
    id: 2,
    title: 'Pay in Full',
    para: 'Pay the full amount today and enjoy exclusive perks with Tamara!*',
  },
];

  export const specifications = [
    { label: 'TOTAL THICKNESS', value: '4.0MM' },
    { label: 'VIRGIN STONE/POLYMER CORE', value: '4.0MM VIRGIN WHITE STONE' },
    { label: 'PRE ATTACHED IXPE UNDERLAY', value: 'NONE' },
    { label: 'PLANK SIZE', value: '1220X183MM' },
    { label: 'WEAR LAYER', value: '0.3MM' },
    { label: 'EDGE DETAILS', value: 'UNILIN CLICK LOCK' },
    { label: 'FINISH', value: 'MATT' },
    { label: 'EMBOSSING', value: '3D NATURAL' },
    { label: 'SQM PER CARTON', value: '2.68' },
    { label: 'PIECES PER CARTON', value: '12PCS' },
    { label: 'RESIDENTIAL LIMITED WARRANTY', value: '5 YEAR' },
    { label: 'COMMERCIAL LIMITED WARRANTY', value: '2 YEAR' },
  ];

 export const faqData = [
    {
      id: 'adhesives',
      label: 'Do I Need Any Adhesives to Stick the Planks?',
      content: 'No, you don\'t need any glue or other tools to install SPC Oak flooring. Its easy click-lock system allows the planks to snap together for a secure, smooth fit. This feature removes the mess of adhesives and makes installation quick and easy. Even if you\'re not someone who likes to do things themselves, the click-lock feature makes it great for DIY.',
    },
    {
      id: 'fade',
      label: 'Will The Color and Texture Fade Over Time?',
      content: 'Even after years of daily use, heavy traffic, and sun exposure, the SPC Oak keeps its color and texture. Plus, it has a durable top wear layer that resists dents, scratches, and fading, so it\'s great for busy households and businesses.',
    },
    {
      id: 'planks',
      label: 'How many planks come in a box, and what\'s the coverage area?',
      content: 'The dimensions of these planks are: 1220mm x 183mm. Each box usually covers about 2.01 (Square Meters) and contains around 9 planks, though this can vary. To give you an idea, it can cover a small bathroom, a walk-in closet, or a portion of a medium-sized bedroom. For larger rooms, you\'ll need multiple boxes depending on the total area.',
    },
  ];
export const alternatingData: TAboutUs[] = [
  {
    id: 1,
    image: "/assets/images/aboutus/about2.png",
    alt: "First Image",
    heading: "A satisfactory flooring is our glory",
    paragraph: "Donec sed lorem dapibus, posuere dui eget, molestie ante. Vivamus aliquam gravida nibh, et aliquam risus fringilla aliquam. Cras ornare ac sem ut malesuada. Nulla ut sodales magna. Quisque venenatis sapien vulputate pellentesque.",
  },
  {
    id: 2,
    image: "/assets/images/aboutus/about3.png",
    alt: "Second Image",
    heading: "Best flooring at affordable prices",
    paragraph: "Morbi in risus in nisi eleifend convallis. Etiam pretium varius quam in aliquam. Curabitur malesuada elit sed enim placerat, vitae interdum erat cursus. Morbi laoreet sapien id scelerisque dapibus. Aliquam purus erat volutpat.",
  },
  {
    id: 3,
    image: "/assets/images/aboutus/about1.png",
    alt: "Third Image",
    heading: "Flooring that meets your needs",
    paragraph: "Nunc consequat nibh ut pretium vestibulum. Nulla facilisi. Cras porttitor lacus dolor, quis tincidunt nisl vestibulum at. Mauris tristique diam ex, eget dignissim enim scelerisque non. Pellentesque aliquam nulla nisi, id tristique",
  },
];


export const sampleGridData: SampleGridData[] = [
  {
    id: 1,
    title: "Order 5 free samples",
    description:
      "Order as many free samples as you like to find your style! Free next-day delivery included.",
    buttonText: "Order free samples",
    image: "/assets/images/aboutus/order-free-sample.png",
    alt: "Free sample order",
  },
  {
    id: 2,
    title: "Discover your new favourite floor",
    description:
      "Need some advice? Request a callback to speak to one of our friendly flooring experts.",
    buttonText: "Request a callback",
    image: "/assets/images/aboutus/request-call-back.png",
    alt: "Free sample order",
  },
];




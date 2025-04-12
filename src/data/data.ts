import { BoxData, CardData, FAQItem, Feature, ITabbyList, ITabbyPayList, ITamaraList, HeroItem, TCategoryData, TImageBanner } from "types/type";
import { AuthData, CategoryFeatures, FAQ, SampleGridData, SignAuthData, SocialLink, TAboutUs, WhatAmICategoryData } from "types/types";
import * as Yup from 'yup';
import palette from '../../public/assets/images/icon/chat-46.png';
import delivery from '../../public/assets/images/icon/delivery-fast.png';
import privacy from '../../public/assets/images/icon/privacy.png';
import support from '../../public/assets/images/icon/chat-46.png';
import masterCard from './../../public/assets/images/payment-icons/Mastercard-Logo.png'
import viseCard from './../../public/assets/images/payment-icons/visacard-logo.png'
import gPayCard from './../../public/assets/images/payment-icons/googlepay-logo.png'
import { StaticImageData } from 'next/image';
import { AdditionalInformation } from 'types/prod';
import { EDIT_CATEGORY, ISUBCATEGORY_EDIT } from 'types/cat';
import { MeasurementSection } from '../types/types';
import parsePhoneNumberFromString from "libphonenumber-js/core";
import metadata from 'libphonenumber-js/metadata.min.json';

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

export const phoneValidation = Yup.string()
  .test("valid-phone", "Invalid phone number", (value) => {
    if (!value) return false; // Required field
    const phoneNumber = parsePhoneNumberFromString(value, metadata);
    return phoneNumber && phoneNumber.isValid(); // Checks if phone is valid
  })
  .required("Phone number is required");

export const validationSchema = Yup.object({
  firstname: Yup.string().required("Name is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  whatsappNumber: Yup.string().required("WhatsApp number is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  area: Yup.string().required("Area is required"),
  selectRooms: Yup.string().required("Select the number of rooms"),
  preferredDate: Yup.string().required("Preferred date is required"),
  preferredTime: Yup.string().required("Preferred time is required"),
});

export const categoryInitialValues: EDIT_CATEGORY = {
  name: '',
  description: '',
  short_description: '',
  Meta_Description: '',
  Meta_Title: '',
  Canonical_Tag: '',
  custom_url: "",
  topHeading: "",
  recalledSubCats: [],
  price: "",
};

export const subcategoryValidationSchema = Yup.object({
  name: Yup.string().required('Add Sub Category Name'),
  category: Yup.string().required('Select Category'),
  custom_url: Yup.string().required('Custom URL is required'),
});

export const categoryValidationSchema = Yup.object({
  name: Yup.string().required('Add  Category Name'),
  custom_url: Yup.string().required('Custom URL is required'),
  RecallUrl: Yup.string().required('Custom URL is required for categories and products'),
});

export const subcategoryInitialValues: ISUBCATEGORY_EDIT = {
  name: '',
  description: '',
  short_description: '',
  Meta_Description: '',
  Meta_Title: '',
  custom_url: "",
  category: "",
  Canonical_Tag: "",
  whatamIdetails: [],
  whatAmiTopHeading: "",
  Heading: "",
  recalledByCategories: [],
  recalledSubCats: []
};
export interface IProductValues {
  id?: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  discountPrice?: number;
  AdditionalInformation: AdditionalInformation[];
  custom_url: string;
  plankWidth?: string;
  thickness?: string;
  ResidentialWarranty?: string;
  CommmericallWarranty?: string;
  waterproof?: boolean;
  Meta_Title?: string;
  Canonical_Tag?: string;
  Meta_Description?: string;
  FAQS: AdditionalInformation[];
  boxCoverage?: string;
  products: (string | number)[];
  colorCode?: string;
  colors?: AdditionalInformation[]
  sizes?: { width: string, height: string, thickness: string }[]
  lengthPrice?: string;
}

export const AddproductsinitialValues: IProductValues = {
  id: 0, // Default value for id (should be generated dynamically)
  name: '',
  price: 0,
  description: '',
  stock: 0,
  discountPrice: 0,
  AdditionalInformation: [],
  custom_url: '',
  plankWidth: '',
  thickness: '',
  ResidentialWarranty: '',
  CommmericallWarranty: '',
  waterproof: false,
  Meta_Title: '',
  Canonical_Tag: '',
  Meta_Description: '',
  FAQS: [],
  boxCoverage: "",
  products: [],
  colorCode: "",
  colors: [],
  sizes: [],
  lengthPrice: "",
};


export const excludedKeys = [
  "plankWidth",
  "boxCoverage",
  "CommmericallWarranty",
  "spacification",
  "ResidentialWarranty",
  "waterproof",
  "thickness",
  "subcategory",
  "featureImages",
  "colors"

]
export const excludedKeysFroProducts = [
  "product",
  "colors"

]

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
    // backgroundImage: "/assets/images/Home/hero-min.webp",
    backgroundImage: "https://res.cloudinary.com/dmmeqgdhv/image/upload/v1744112788/hero-min_2_ixg8qo.webp",
    offerText: "Limited Time Offer",
    title: "Starting From Just AED 69 Per Square Metre.",
    highlight: "",
    description:
      "We offer premium-quality flooring solutions at factory-direct prices, with express (1 working day) and standard (2 to 3 days) delivery options.",
    buttonText: "EXPLORE PRODUCTS",
    buttonLink: "/collections",
    priceText: "Starting From AED 69/m²",
    flooringType: "SPC Eco • American Walnut",
    brand: "Polar Flooring",
  },
];

export const featureItems = [
  {
    title: "Free Samples",
    description:
      "Order up to 5 free samples delivered anywhere in the UAE so you can see and feel the quality before you buy.",
    icon: "/assets/images/Home/freee.png",
  },
  {
    title: "Easy payment",
    description:
      "With Tabby or Tamara, split your payment into four easy installments — no hassle, no hidden fees.",
    icon: "/assets/images/Home/card.png",
  },
  {
    title: "Delivery",
    description:
      "Choose Express for a small fee for next-day delivery, or enjoy standard delivery in just 3-4 days anywhere in the UAE.",
    icon: "/assets/images/Home/truck.png",
  },
  {
    title: "Factory Prices",
    description:
      "No middlemen, just high-quality flooring at factory - direct prices. Best value without compromise.",
    icon: "/assets/images/Home/factory.png",
  },
];




export const socialLinks: SocialLink[] = [
  { href: 'https://www.facebook.com/easyfloorsuae', target: '_blank', alt: 'facebook', className: 'w-[6px] h-[9px] sm:w-[8px] sm:h-[15px]' },
  { href: 'https://www.instagram.com/easyfloorsuae/?hl=en', target: '_blank', alt: 'instagram', className: 'w-[10px] h-[10px] sm:w-[16px] sm:h-[16px]' },
  { href: 'https://www.pinterest.com/easyfloorsuae/', target: '_blank', alt: 'pinterest', className: 'w-[8px] h-[11px] sm:w-[12px] sm:h-[16px]' },
];


export const staticMenuItems = [
  { label: "SPC Flooring", href: "spc-flooring", submenu: [] },
  { label: "LVT Flooring", href: "lvt-flooring", submenu: [] },
  { label: "Richmond Flooring", href: "richmond-flooring", submenu: [] },
  { label: "Polar Flooring", href: "polar-flooring", submenu: [] },
  { label: "How to measure", href: "how-to-measure-your-room" },
  { label: "Accessories", href: "accessories", submenu: [] },
  // { label: "Blogs", href: "blogs" },
  { label: "About Us", href: "about-us" },
  { label: "Contact Us", href: "contact-us" },
];


export const features: Feature[] = [
  { icon: "/assets/categoryslider/leftrightarrow.png", label: "125mm", width: 25, height: 25 },
  { icon: "/assets/categoryslider/upbottomarrow.png", label: "10mm", width: 10, height: 20 },
  { icon: "/assets/categoryslider/againupbottom.png", label: "300-1200mm", width: 5, height: 20 },
];

export const accessoryFeature: Feature[] = [
  { icon: "/assets/categoryslider/leftrightarrow.png", label: "125mm", width: 25, height: 25 },
  { icon: "/assets/categoryslider/againupbottom.png", label: "300-1200mm", width: 5, height: 20 },
];

export const ThumnailImage = [
  { image: "/assets/bin/slider.png" },
  { image: "/assets/bin/slider.png" },
  { image: "/assets/bin/slider.png" },
  { image: "/assets/bin/slider.png" },
  { image: "/assets/bin/slider.png" },
  { image: "/assets/bin/slider.png" },
  { image: "/assets/bin/slider.png" },
  { image: "/assets/bin/slider.png" },
  { image: "/assets/bin/slider.png" },
  { image: "/assets/bin/slider.png" },
  { image: "/assets/bin/slider.png" },
  { image: "/assets/bin/slider.png" },
  { image: "/assets/bin/slider.png" },
  { image: "/assets/bin/slider.png" },
  { image: "/assets/bin/slider.png" },
  { image: "/assets/bin/slider.png" },
  { image: "/assets/bin/slider.png" },
  { image: "/assets/bin/slider.png" },
  { image: "/assets/bin/slider.png" },
  { image: "/assets/bin/slider.png" },
  { image: "/assets/bin/slider.png" },
  { image: "/assets/bin/slider.png" },
  { image: "/assets/bin/slider.png" },
  { image: "/assets/bin/slider.png" },
]
export const ThumnailBottom = [
  { image: "/assets/bin/thumb1.png", title: "Click lock system" },
  { image: "/assets/bin/thumb2.png", title: "Layers of SPC or LVT" },
  { image: "/assets/bin/thumb2.png", title: "Waterproof" },
  { image: "/assets/bin/thumb4.png", title: "Easy to clean" },
  { image: "/assets/bin/thumb5.png", title: "Scratch resistant" },
  { image: "/assets/bin/thumb6.png", title: "the packaging" },

]

export const footerData = {
  company: {
    name: 'easy floors',
    description:
      'Founded with a passion for quality and design. Easyfloors is committed to craftsmanship, customer satisfaction and great value for money.',
  },
  contact: {
    address: 'Agsons, J1 Warehouses, Jebel Ali  Industrial – Dubai',
    phone: '+971 50 597 4385',
    email: 'cs@easyfloors.ae',
  },
  paymentMethods: ['visa', 'apple-pay', 'tabby', 'mastercard', 'g-pay', 'tamara'],
};
export const blocksData = [
  {
    id: 1,
    heading: 'SPC Flooring',
    points: [
      'UV layer that protects against fading and surface wear.',
      'Wear a layer that is transparent and highly resistant to damage.',
      'A click-lock system is integrated into its installation structure.',
      'Decorative layer with high-resolution wood or stone designs.',
      'The core layer is made from rigid stone-plastic composite material.',
      'A base layer that adds foundational stability and durability.',
    ],
    imageUrl: 'https://res.cloudinary.com/dmmeqgdhv/image/upload/v1742291723/layer1_11zon_dfk4er.webp',
  },
  {
    id: 2,
    heading: 'LVT Flooring',
    points: [
      'Protective UV coating that prevents discolouration and wear.',
      'Durable wear layer that provides scratch and scuff resistance.',
      'Authentic printed decor layer that mimics natural textures.',
      'Middle stability layer that provides flexibility and structure.',
      'Bottom vinyl layer that enhances resilience and overall strength.',
      'A click-lock system uses glue-down or floating installation methods. ',
    ],
    imageUrl: 'https://res.cloudinary.com/dmmeqgdhv/image/upload/v1742291706/layers2_11zon_zatjqm.webp',
  },
];
export const FloorItemsData = [
  { id: 1, title: 'Herringbone Floor', imageUrl: 'https://res.cloudinary.com/dmmeqgdhv/image/upload/v1742291431/Herringbone-Floor_11zon_11zon_liydgh.webp' },
  { id: 2, title: 'Eco Floor ', imageUrl: 'https://res.cloudinary.com/dmmeqgdhv/image/upload/v1742291254/Eco-Floor_11zon_11zon_ewhoup.webp' },
  { id: 3, title: 'Prime Floor', imageUrl: 'https://res.cloudinary.com/dmmeqgdhv/image/upload/v1742291406/Prime-Floor_11zon_1__11zon_l98nti.webp' },
];


export const imageData: TImageBanner = {
  src: '/assets/category/fiveTree.png',
  alt: 'Picture of the author',
};



export const categoriesFeatures:CategoryFeatures[] = [
  {
    name: "Richmond SPC Eco",
    features: [
      "Easy to maintain",
      "Great wood-look finish",
      "Perfect for DIY installs",
      "VOC-free and safe"
    ],
  },
  {
    name: "Richmond LVT Comfort",
    features: [
      "UV-protected top layer",
      "Kid-friendly flooring",
      "Great for high-traffic zones",
      "Long-lasting colour retention"
    ],
  },
  {
    name: "Richmond LVT Luxury",
    features: [
      "Real-wood proportions",
      "Thick & durable",
      "Perfect for open-plan spaces",
      "Flexible for stair installation"
    ],
  },
  {
    name: "Richmond SPC Prime",
    features: [
      "Wider plank coverage",
      "5-layer acoustic construction",
      "Pre-attached comfort underlay",
      "Reduced footstep sound"
    ],
  },
  {
    name: "Richmond SPC Herringbone",
    features: [
      "Elegant layout pattern",
      "Water-resistant for wet zones",
      "Seamless interlocking fit",
      "Rich, textured finish"
    ],
  },
  {
    name: "Polar SPC Herringbone",
    features: [
      "Budget-friendly option",
      "Free 1mm/2mm foam underlay",
      "Great alternative to straight planks",
      "2-year commercial warranty"
    ],
  },
  {
    name: "Polar LVT",
    features: [
      "Cushioned impact feel",
      "Ideal for kitchens & living areas",
      "User-friendly returns policy",
      "Excellent for light commercial use"
    ],
  },
  {
    name: "Polar SPC",
    features: [
      "Easy clean surface",
      "Click lock holds tight",
      "No shrinking/expansion issues",
      "Indoor fade-resistant finish"
    ],
  }
];


export const categoryData: TCategoryData = {
  title: "What Am I?",
  subtitle: "(Compare us)",
  description:
    `I am more than just a surface beneath your feet. I'm a flooring solution for anyone who wants elegance, strength, and simplicity in their space. I support your everyday life, from busy mornings to quiet evenings, standing strong through it all. With the natural beauty of wood and the toughness of modern design, I resist water, scratches, and the test of time. Whether it’s the sturdy reliability of SPC, the soft comfort of LVT, or the timeless charm of Herringbone, I make every space look and feel better. I am easy to install, simple to maintain, and built to last.
    I am more than something you walk on; we are a collection of flooring solutions that bring durability and simplicity to your space. You can choose any of the flooring solutions that fit your needs. We are here to handle your everyday life, from a busy morning to a simple, relaxing evening. All of the flooring options mentioned are designed to withstand heavy foot traffic and daily wear and tear. Whether you choose the sturdy SPC, the luxurious feel of LVT, or the timeless classiness of Herringbone, I make every room feel simply amazing. All of us are easy to install and simple to maintain while built for durability.`,
  backgroundImage: "/assets/category/campare-us.png",
};
export const HomeUserInfo = [
  {
    title: 'Budget Friendly',
    description:
      "High-quality flooring doesn't have to cost a fortune. Our durable, stylish options are available at factory prices so you can enjoy premium designs for a fraction of the cost. Stylish and affordable flooring without compromising quality.",
      image: 'https://res.cloudinary.com/dmmeqgdhv/image/upload/v1744438022/budget_11zon_icozkb.webp',
    icon: '/assets/images/UserInfo/budget-icon.png',
    reverse: true,
    href: 'about-us'
  },
  {
    title: 'Overlay Ready',
    description:
      "Skip the hassle of removing old floors. You can install our flooring directly over most existing surfaces, saving time, effort, and money on installation. A smooth transition with minimal disruption.",
   
    image: 'https://res.cloudinary.com/dmmeqgdhv/image/upload/v1744438070/Overlay_Ready_iaqqwr.webp',
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
    question: "Do I need underlay for click-lock flooring?",
    answer:
      "The underlay is built into our Richmond flooring, and we will provide it free of charge for our Polar range to add comfort and reduce sound. An underlay can help improve a floor's sound insulation and give it a smoother look and feel.",
  },
  {
    id: 2,
    question: "What are the best types of flooring for Dubai's climate?",
    answer:
      "High temperatures and humidity in Dubai make SPC and LVT flooring ideal. These types of flooring are water-resistant, durable, and won’t warp or expand due to temperature changes.",
  },
  {
    id: 3,
    question: "How do I know which flooring material is best for my space?",
    answer: "The right flooring material depends on the room’s use, foot traffic, and moisture levels. SPC is durable, LVT is comfortable and stylish, and herringbone patterns add a decorative touch. If unsure, consult with a trusted flooring company for expert recommendations.",
  },
];

export const accessoriesfaqs: FAQItem[] = [
  {
    id: 1,
    question: "Do I Need Any Adhesives to Stick the Planks?",
    answer:
      "No, you don’t need any glue or other tools to install SPC Oak flooring. Its easy click-lock system allows the planks to snap together for a secure, smooth fit. This feature removes the mess of adhesives and makes installation quick and easy. Even if you’re not someone who likes to do things themselves, the click-lock feature makes it great for DIY. ",
  },
  {
    id: 2,
    question: "Will The Color and Texture Fade Over Time?",
    answer:
      "Even after years of daily use, heavy traffic, and sun exposure, the SPC Oak keeps its colour and texture. Plus, it has a durable top wear layer that resists dents, scratches, and fading, so it's great for busy households and businesses",
  },
  {
    id: 3,
    question: "How many planks come in a box, and what’s the coverage area?",
    answer: "The dimensions of these planks are: 1220mm x 183mm. Each box usually covers about 2.01 (Square Meters) and contains around 9 planks, though this can vary. To give you an idea, it can cover a small bathroom, a walk-in closet, or a portion of a medium-sized bedroom. For larger rooms, you’ll need multiple boxes depending on the total area.",
  },
];


export const boxData: BoxData[] = [
  {
    id: 1,
    title: 'Need help with measurement?',
    description: `We have a detailed How to Measure Guide to make it easy. If you need further assistance, feel free to contact us—we're here to help!`,
    buttonText: 'Learn More',
    icon: '/assets/images/Home/measure1.png',
    link: '/measurement-appointment',
  },
  {
    id: 2,
    title: 'Need help with installation?',
    description: `Our easy click-lock system makes installation simple—no glue or nails are required. We can connect you with trusted installers for professional assistance.`,
    buttonText: 'Learn More',
    icon: '/assets/images/Home/Vectorrg.png',
    link: '/help-with-installations',
  }
];

export const popupCards: CardData[] = [
  {
    id: 1,
    heading: "Richmond <br /> SPC Eco",
    content: [
      "Integrated IXPE underlay",
      "SPC core construction",
      "Realistic Wood Grain Finish",
      "Affordable price from AED 109",
      "DIY-friendly installation",
    ],
  },
  {
    id: 2,
    heading: "Richmond <br /> SPC Prime",
    content: [
      "Premium designs",
      "Acoustic IXPE underlay",
      "Longer Planks for a more authentic wood finish",
      "A wide range of natural finishes",
      "Durable & water-resistant",
    ],
  },
  {
    id: 3,
    heading: "Richmond SPC <br /> Herringbone",
    content: [
      "Elegant herringbone pattern",
      "Wide range of colours",
      "Integrated IXPE sound barrier",
      "Durable 0.5mm wear layer",
      "Easy payment options",
    ],
  },
  {
    id: 4,
    heading: "Richmond LVT <br /> Comfort",
    content: [
      "Wood-inspired finishes",
      "Durable 0.55mm wear layer",
      "Easy installation",
      "Wide range of colours",
      "Perfect for home or office",
    ],
  },
  {
    id: 5,
    heading: "Richmond LVT <br /> Luxury",
    content: [
      "Premium, wood-like designs",
      "Scratch and stain-resistant",
      "Extra-wide planks",
      "15-year warranty",
      "Free samples, fast delivery",
    ],
  },
  {
    id: 6,
    heading: "Polar <br /> SPC",
    content: [
      "Lots of timeless styles",
      "Wood grain finishes",
      "Water-resistant",
      "Affordable from AED 49.00",
      "Modern and classic",
    ],
  },
  {
    id: 7,
    heading: "Polar SPC <br /> Herringbone",
    content: [
      "Herringbone zig-zag pattern",
      "Free underlay on all orders",
      "Wood-like embossed texture",
      "Multi-colour options",
      "3mm wear layer",
    ],
  },
  {
    id: 8,
    heading: "Polar <br /> LVT",
    content: [
      "Wood-like textured finish",
      "Durable with 0.3mm wear layer",
      "1220mm x 180mm plank size",
      "Free UAE delivery",
      "15-year warranty",
    ],
  },
];

export const timeSlots = [
  { value: "9am-11am", label: "9am-11am" },
  { value: "11am-1pm", label: "11am-1pm" },
  { value: "1pm-3pm", label: "1pm-3pm" },
  { value: "3pm-6pm", label: "3pm-6pm" },
];




export const faqspage: FAQ[] = [
  { question: "Can you put SPC flooring on concrete?", answer: "We often receive this question from our customers. The answer is definitely yes. Stone plastic composite (SPC) looks great on concrete subfloors. By creating a solid foundation, it reduces the possibility of warping or buckling over time. So we have to use a completely flat surface for installation." },
  { question: "When can you walk on LVT flooring after the installation process?", answer: "Our planks have a four-side click lock system for easy installation, and you can walk on them right away after the installation process. However, you should wait 48 hours before walking on glue-down LVT flooring textures, although some manufacturers recommend waiting longer." },
  { question: "Is SPC flooring slippery?", answer: "SPC flooring features a nonslip surface material. Since SPC flooring has a low heat transfer coefficient, it provides excellent anti-skid properties. A few drops of water on SPC flooring will make it feel less slippery than ordinary tile and stone." },
  { question: "Can heavy furniture be placed on oak SPC flooring?", answer: "Yes. The strong and resilient core layer of oak SPC flooring allows it to support heavy furniture. Compared to thinner choices (3 mm), a thicker SPC core (5 mm or more) is better able to resist dents and warping. Because of its stability, the flooring won't buckle or move even when heavy furniture is placed on it. Further, SPC flooring is more durable and impact-resistant than laminate flooring, making it a better option for spaces with heavy furniture. " },
  { question: "Is SPC flooring fireproof?", answer: "Fire-retardant SPC flooring is capable of withstanding flames and delaying the spread of fire. In some ways, this flooring type has stood the test of time over other types since it has proven to be more resistant to extreme temperatures. " },
  { question: "What are the advantages of SPC flooring?", answer: "The dark or light tone wood grain finish of SPC flooring offers a classic and bold look. SPC floor coverings contain a pre-attached IXPE or EVA foam underlay for sound insulation and a soft underfoot feel. These are used in different residential and commercial buildings. It significantly reduces the need for frequent repairs and replacements as well as guarantees the safety of children." },
  { question: "Can I request samples?", answer: "Yes! We offer free flooring samples across our full range. Simply add the samples to your basket and checkout. Order up to 5 free samples delivered anywhere in the UAE so you can see and feel the quality before you buy." },
  { question: "Is there a warranty on your products?", answer: "A luxury vinyl plank flooring manufacturer's warranty varies from product to product and is included with all of our flooring. Our polar products have a two-year commercial warranty and a five-year residential warranty, while our Richmond SPC and LVT floorings have a ten-year domestic warranty and a five-year commercial warranty. " },
  { question: "Is oak SPC flooring pet-friendly?", answer: "All of our durable floors are designed to withstand the rigours of kids and pets. Our flooring is completely free of formaldehyde, ensuring a safe and healthy indoor environment. We also have antibacterial coating on floors that provides excellent antibacterial properties, keeping your space clean and hygienic." },
  { question: "Does Polar LVT flooring fade under sunlight?", answer: "Our Polar LVT Flooring UAE does not fade under sunlight. We can use them for locations that receive direct sunlight, such as sunrooms or rooms with wide windows. The reason is that it contains UV protection, which prevents fading and discolouration caused by exposure to sunshine. The floors' deep antique tones remained after years of exposure to direct sunlight, giving the spaces an energetic and appealing look." },
  { question: "Can I install SPC flooring myself?", answer: "Yes. SPC flooring is an excellent option for do-it-yourself installation because of its simple 4-side click-lock mechanism. Before beginning, just make sure your subfloor is dry, clean, and level. With basic equipment like a rubber mallet, tape measure, and utility knife, the planks may be easily snapped together without the need for glue or nails. However, if you have any concerns or want a flawless finish, it's always a good idea to contact an expert." },
  { question: "Does SPC flooring feel cold?", answer: "There's nothing better than SPC flooring underfoot, no matter what the weather is like. It is made of stone plastic composite with wear layers, which maintains a neutral temperature in summer and a slight warmth in winter to retain heat. The warmth of this flooring makes stepping out of bed in a bedroom more comfortable than stepping on cold tiles. In homes with kids or older adults who may be sensitive to extreme temperatures, this feature is really handy." },
  { question: "Can I use SPC flooring in the bathroom?", answer: "Of course. Because SPC flooring is water-resistant, it's a great option for bathrooms. It is resistant to warping, swelling, and moisture damage, unlike laminate or conventional wood. Even in regions with high humidity, its strong core and protective outer shell offer exceptional longevity. Selecting textured SPC planks will increase safety by preventing slippage in damp areas." },
  { question: "Is SPC or LVT flooring suitable for UAE climates?", answer: "Yes. The UAE's humid and hot atmosphere is something that our Richmond SPC or LVT flooring is made to resist. It is a dependable option for both residential and commercial applications because of its heat- and water-resistant qualities. SPC and LVT provide long-term durability since they do not expand or contract in response to temperature variations like regular wood flooring does. " }
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
    heading: "Your Trusted Online Flooring Store",
    paragraph: "We’re the leading online flooring store in the UAE, offering our valued customers top-quality products from the Richmond and Polar collections. With years of experience, we've earned a solid reputation for being reliable, efficient, and customer satisfaction-centric. Our Jebel Ali warehouse in Dubai holds 60,000 sqm of stock, so we can deliver fast anywhere in the UAE.",
  },
  {
    id: 2,
    image: "/assets/images/aboutus/about3.png",
    alt: "Second Image",
    heading: "For Homes And Businesses In The UAE",
    paragraph: "We cater to a range of customers, including homeowners, commercial properties like schools and offices, flooring contractors, and interior designers. With a direct factory connection and years of hands-on experience, we’ve designed our flooring materials to handle the tough climate of Dubai and the UAE",
  },
  {
    id: 3,
    image: "/assets/images/aboutus/third.webp",
    alt: "Third Image",
    heading: "Why Choose Easy Floors",
    paragraph: "At Easy Floors, we understand that choosing the right flooring is a big decision. We offer many premium options to fit any space and budget, along with a 15-year residential and 5-year commercial warranty enabling you to choose with confidence. Our focus on quality, transparency, and customer satisfaction sets us apart.",
  },
];


export const sampleGridData: SampleGridData[] = [
  {
    id: 1,
    title: "Try Before You Buy",
    description:
      "Order up to 5 free samples, delivered FREE of charge across the UAE to find the perfect match.",
    buttonText: "Order free samples",
    image: "/assets/images/aboutus/order-free-sample.webp",
    alt: "Free sample order",
    href: 'collections'
  },
  {
    id: 2,
    title: "Got Questions? Ask Away!",
    description:
      "Contact our friendly support team for expert advice on all your flooring needs.",
    buttonText: "Request a call back",
    image: "/assets/images/aboutus/request-call-back.png",
    alt: "Free sample order",
    href: 'contact-us'
  },
];

export const WhatAmIcategoryData: WhatAmICategoryData = {
  categoryHeading: "Richmond LVT Comfort",
  categorycontent: "I am another type of flooring that gives you the look and feel of real wood at a fraction of the price. My name stands for Luxury Vinyl Tile and in simple terms, I’m exactly this. I am made of 8 layers of materials to give you a high performing product, designed to outlast others by miles. Included in these 8 layers is a layer of glass fibre, adding to my strength. My top layer is a UV protection film to ensure maximum colour fastness retention and compared to other brands, I blast them out the water.",
  subSections: [
    {
      subHeading: "Where can I be used",
      content: "I offer more flexibility than my Richmond SPC cousins and can be used on level surfaces where you may have a slight gradient. Another area where I am often used is on mezzanine floors where there might be a slight “bounce on the flooring”. I’m also great for commercial areas or high volume traffic as I can be glued down, something my SPC cousins can’t do!",
    },
    {
      subHeading: "Why LVT over SPC",
      content: "To be honest, we both offer exceptional performance levels (naturally of course). SPC is made from stone and I’m made from vinyl. That’s the most obvious difference between us. SPC flooring is harder and I’m softer. In some cases, that’s better. For example, in areas where you might have kids, I provide a softer landing for those bottoms. Rubber is also more expensive than Polymer (oh yeah, I’m a classy one), hence the slightly higher costs of me over SPC. One other key difference is that I can be glued down, whereas Mr SPC can’t be glued down. Not an issue in most cases to be honest but if you have a high traffic area, gluing us planks down is better for longer term use.",
    },
    {
      subHeading: "Do I come with a warranty",
      content: "Yes, as with all Richmond Flooring products, I come with a 5-year warranty for commercial spaces and 15 years for residential areas. This gives you peace of mind that I can be trusted. There are some exceptions. If you fit me wrong or abuse me in ways I am not designed for, then let’s be real and accept that I’m not going to do you any favours. Use me right, look after me with regular cleaning and me and you will be friends for years to come.",
    },
    {
      subHeading: "Can I be used in wet areas?",
      content: "Yes, with my click lock system, you don’t even need glue to keep us planks in place. (however, adhesive for high traffic areas is recommended). The click system ensures that each of us lock into our neighboring plank and leaves zero gaps for water to seep into.",
    },
  ],
  images: [
    { src: "/assets/category/whatami1.png", alt: "Flooring Left" },
    { src: "/assets/category/whatami.png", alt: "Flooring Right" },
  ],
};

export const measurementData: MeasurementSection[] = [
  {
    title: "How to Measure Your Room for Flooring",
    description:
      "Measure your room to ensure that you are purchasing the right amount of flooring. That'll prevent delays, overspending, and shortages. A good measurement will also simplify the installation process and eliminate the need for repeat orders or returns.",
    steps: [],
    image: "",
  },
  {
    title: "General Guidelines for Measuring Your Room ",
    description: `When calculating the width and length of a rectangular or square area, add 5-10% for waste and cutting errors. If you are planning to construct staircases, mantels, or closets in your room, allocate over 10% of your budget to them. 

If you would like professional assistance, we can arrange a measuring service for you with a refundable charge of AED 150 (refunded if you place an order from us). If you wish to measure the area yourself, you will only need a measuring tape, pencil, and paper. Make sure you measure in meters if you will be buying flooring materials that are usually marketed in mete
`,
stepsHeading:"Measuring a Square or Rectangular Room",
    steps: [
      {
        title: "Measure the length:",
        content:
          " Find the room's length, such as five meters.",
      },
      {
        title: "Measure the width:",
        content:
          "Determine the room's width, such as five meters.",
      },
      {
        title: "Measure the total area",
        content:
          "To get the floor size in square meters, multiply the length by the width.",
      },
    ],
    image: "/assets/images/how-to-measure-your-room/measure1.png",
  },
  {
    title: "Measuring an L-shaped or Irregular Room",
    description:
      "For irregular rooms, divide the area into smaller, more manageable rectangles and measure each one separately. When dealing with uneven areas, divide the area into smaller, more manageable rectangles and measure each one independently. Then, make a rough sketch by dividing the room into several rectangular portions and drawing the room plan.",

    steps: [
      {
        title: "Measure Every Section",
        content:
          " Take separate measurements of each section's length and width.",
      },
      {
        title: "Determine the total area.",
        content:
          "The length of every part should be multiplied by its width before adding them all together to get the total size of the space.",
      },
    ],
    image: "/assets/images/how-to-measure-your-room/mearuse2.png",
  },

  {
    title: "Example:",
    description:"(Area A) 10m² + (Area B) 15m² = Total Area: 25m²",
    steps: [
    ],
    image: "",
  },
  {
    title: "Factoring in 10% Waste Allowance",
    description:
      "Add another 10% for waste and cutting adjustments to make sure you have enough flooring.",
    steps: [
      {
        title: "",
        content:
          "Divide an entire area by 10 (e.g., 25m² ÷ 10 = 2.5m²)",
      },
      {
        title: "",
        content:
          "Include this in your overall flooring purchase. (e.g., 25m² + 2.5m² = 27.5m²)",
      },
      {
        title: "",
        content:
          "Place your order and prepare for installation!",
      },
    ],
    image: "",
  },

  {
    title: "Get Expert Guidance from Easy Floors",
    description:
      "With Easy Floors, you have a variety of premium flooring options in Dubai and the United Arab Emirates. If you need additional professional assistance with floor design ideas or flooring recommendations, please email us at cs@easyfloors.ae",
    steps: [],
    image: "",
  },
];



// export const colors = [
//   { code: "3897", color: "/assets/bin/colors/c1.png" },
//   { code: "3895", color: "/assets/bin/colors/c2.png" },
//   { code: "2868", color: "/assets/bin/colors/c3.png" },
//   { code: "6661", color: "/assets/bin/colors/c4.png" },
//   { code: "2636", color: "/assets/bin/colors/c5.png" },
//   { code: "X8355-9", color: "/assets/bin/colors/c6.png" },
//   { code: "3896", color: "/assets/bin/colors/c7.png" },
//   { code: "3891", color: "/assets/bin/colors/c8.png" },
//   { code: "3895", color: "/assets/bin/colors/c9.png" },
//   { code: "2869", color: "/assets/bin/colors/c10.png" },
//   { code: "6661", color: "/assets/bin/colors/c11.png" },
//   { code: "2634", color: "/assets/bin/colors/c12.png" },
//   { code: "X8365-9", color: "/assets/bin/colors/c13.png" },
//   { code: "FC5943", color: "/assets/bin/colors/c14.png" },
//   { code: "FC5943", color: "/assets/bin/colors/c15.png" },
//   { code: "FC5943", color: "/assets/bin/colors/c16.png" },
// ];


export const loginData: AuthData = {
  title: "WELCOME TO <br> EASY FLOORS",
  subtitle: "Sign In",
  description: "Please login using account details below.",
  emailPlaceholder: "Enter your email",
  passwordPlaceholder: "Enter your password",
  forgotPasswordText: "Forgot your password?",
  buttonText: "Sign In",
  footerText: "Don't Have an Account?",
  footerLinkText: "Create account",
  value: ""
};

export const signupData: SignAuthData = {
  title: "WELCOME TO <br> EASY FLOORS",
  subtitle: "Sign Up",
  fullNamePlaceholder: "Enter your full name",
  emailPlaceholder: "Enter your email",
  passwordPlaceholder: "Enter your password",
  retypePasswordPlaceholder: "Retype your password",
  buttonText: "Sign Up",
  footerText: "Already have an account?",
  footerLinkText: "Sign In",
};


export const emirates = [
  { value: "Abu Dhabi", label: "Abu Dhabi" },
  { value: "Dubai", label: "Dubai" },
  { value: "Sharjah", label: "Sharjah" },
  { value: "Ajman", label: "Ajman" },
  { value: "Umm Al-Quwain", label: "Umm Al-Quwain" },
  { value: "Ras Al Khaimah", label: "Ras Al Khaimah" },
  { value: "Fujairah", label: "Fujairah" }
];

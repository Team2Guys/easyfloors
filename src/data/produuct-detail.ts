import { FlooringType, ITabbyList, ITabbyPayList, ITamaraList } from "types/type";
import masterCard from './../../public/assets/images/payment-icons/Mastercard-Logo.png'
import viseCard from './../../public/assets/images/payment-icons/visacard-logo.png'
import gPayCard from './../../public/assets/images/payment-icons/googlepay-logo.png'

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
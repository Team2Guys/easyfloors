import {  OrderHistory, OrderItem, TrackOrderData } from "types/types";

export const orderSummary: OrderItem[] = [
  {
    image: "/assets/bin/cart.png",
    title: "Richmond SPC Eco - Oak History",
    boxes: 2,
    sqm: 2.009,
    price: 357.66,
  },
  {
    image: "/assets/bin/cart.png",
    title: "Luxury Vinyl Plank - Walnut Brown",
    boxes: 3,
    sqm: 3.015,
    price: 529.99,
  },
  {
    image: "/assets/bin/cart.png",
    title: "Modern SPC Flooring - Grey Ash",
    boxes: 1,
    sqm: 1.005,
    price: 199.50,
  },
  {
    image: "/assets/bin/cart.png",
    title: "Modern SPC Flooring - Grey Ash",
    boxes: 1,
    sqm: 1.005,
    price: 199.50,
  },
  {
    image: "/assets/bin/cart.png",
    title: "Modern SPC Flooring - Grey Ash",
    boxes: 1,
    sqm: 1.005,
    price: 199.50,
  },
];


  export const orders: OrderHistory[] = [
    {
      id: "ORD123456",
      email: "john.doe@example.com",
      address: "123 Main Street, New York, NY",
      phone: "+1 234 567 890",
      paymentStatus: "Paid",
      createdAt: "2024-03-24",
    },
    {
      id: "ORD789012",
      email: "jane.smith@example.com",
      address: "456 Elm Street, Los Angeles, CA",
      phone: "+1 987 654 321",
      paymentStatus: "Pending",
      createdAt: "2024-03-23",
    },
  ];
// eslint-disable-next-line
  // @ts-ignore
  export function getOrderData(): TrackOrderData { 
    return {
      orderId: "1228467",
      orderDate: "Fri, 14th Feb",
      estimatedDelivery: "Sun, 16th Feb",
      status: "ready",
      items: [
        {
          name: "Parisio Dining Chair",
          title: "Luxury Dining Chair",  
          image: "/assets/bin/cart.png",
          price: 150450,
          currency: "AED",
          quantity: 1,
          boxes: 2,  
          sqmts: 3.5 
        },
      ],
      products: [
        {
          id: '31',
          name: 'Richmond LVT Comfort - Twine',
          price: 135,
          // eslint-disable-next-line
  // @ts-ignore
          discountPrice: null,
          description: 'test',
          stock: 491,
          posterImageUrl: {
            altText: 'Richmond LVT Comfort - Twine',
            imageUrl: 'https://res.cloudinary.com/dmmeqgdhv/image/upload/v1742374537/uploads/nnh2ta06aglzavyeyoio.webp',
            public_id: 'uploads/nnh2ta06aglzavyeyoio'
          },
          hoverImageUrl: {
            altText: 'Richmond LVT Comfort - Twine',
            imageUrl: 'https://res.cloudinary.com/dmmeqgdhv/image/upload/v1742204657/uploads/b9fpi82gidne1tcf49ey.webp',
            public_id: 'uploads/b9fpi82gidne1tcf49ey'
          },
          custom_url: 'twine',
          waterproof: true,
          plankWidth: '180mm ',
          colorCode: "#FFFFFF",
          colors: [],
          ResidentialWarranty: '15 Years',
          CommmericallWarranty: '5 Years',
          thickness: ' 5mm',
          boxCoverage: '2.196',
          // eslint-disable-next-line
  // @ts-ignore
          subcategory: {
            id: '9',
            name: 'Richmond LVT Comfort',
            custom_url: 'lvt-comfort',
          },
          acessories: [],
          __typename: 'Product'
        }
      ], // ✅ Added products
      totalPrice: 1500, // ✅ Added totalPrice
      payment: {
        cardImage:  "/assets/bin/cart.png",
        cardLastFour: "1234",
        amount: 1500,
        currency: "AED",
      },
      delivery: {
        name: "Muhammad Faad",
        email: "text@email.com",
        address: ` 55 327 9516
Address Street: 103, Al Lu'lu Street
Neighbourhood: Jumeirah 3
City: Jumeirah, Dubai
State: Dubai
Country: United Arab Emirates `,
      },
    }
  }
  
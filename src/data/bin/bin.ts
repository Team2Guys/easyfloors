import { OrderHistory, OrderItem } from "types/types";

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
  
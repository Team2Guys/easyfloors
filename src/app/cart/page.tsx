import React from 'react';
import CartPage from 'components/cart/cart-page';
import Breadcrumb from 'components/Reusable/breadcrumb';
import { fetchProducts } from 'config/fetch';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Your Flooring Cart | Review & Checkout with Easy Floors',
  description:
    "Ready to upgrade your floors? Review your selected items in the Easy Floors cart and proceed to secure checkout when you're ready.",
  openGraph: {
    title: 'Your Flooring Cart | Review & Checkout with Easy Floors',
    description: "Ready to upgrade your floors? Review your selected items in the Easy Floors cart and proceed to secure checkout when you're ready.",
    url: '/cart',
    images: [{url: "/assets/images/logo.webp", alt: 'Easyfloors',
      },
    ],
          type:'website'

  },
  alternates: {
    canonical: 'https://easyfloors.ae/cart',
  },
};
const Cart = async () => {
  const products = await fetchProducts()
  return (
    <>
      <Breadcrumb title="Cart" />
      <CartPage products={products}  />
    </>
  );
};

export default Cart;

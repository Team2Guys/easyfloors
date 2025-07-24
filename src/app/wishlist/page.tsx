import React from 'react'
import WishlistPage from './WishlistPage'
import { Metadata } from 'next';
import logo from "../../../public/assets/images/logo.webp"
export const metadata: Metadata = {
  title: 'Your Flooring Wishlist | Save Favourite Easy Floors Picks',
  description:
    'Save your favourite flooring styles with the Easy Floors wishlist. Compare options, plan your space, and revisit your top picks anytime.',
  openGraph: {
    title: 'Your Flooring Wishlist | Save Favourite Easy Floors Picks',
    description: 'Save your favourite flooring styles with the Easy Floors wishlist. Compare options, plan your space, and revisit your top picks anytime.',
    url: 'https://easyfloors.ae/wishlist',
    images: [{url: logo.src, alt: 'Easyfloors',
      },
    ],
    type:'website'
  },
  alternates: {
    canonical: 'https://easyfloors.ae/wishlist',
  },
};
const page = () => {
  return (
    <WishlistPage/>
  )
}

export default page
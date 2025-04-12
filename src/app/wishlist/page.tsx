import React from 'react'
import WishlistPage from './WishlistPage'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Your Flooring Wishlist | Save Favourite Easy Floors Picks',
  description:
    'Save your favourite flooring styles with the Easy Floors wishlist. Compare options, plan your space, and revisit your top picks anytime.',
  openGraph: {
    title: 'Your Flooring Wishlist | Save Favourite Easy Floors Picks',
    description: 'Save your favourite flooring styles with the Easy Floors wishlist. Compare options, plan your space, and revisit your top picks anytime.',
    url: '/wishlist',
    images: [{url: "/assets/images/logo.png", alt: 'Easyfloors',
      },
    ],
  },
  alternates: {
    canonical: '/wishlist',
  },
};
const page = () => {
  return (
    <WishlistPage/>
  )
}

export default page
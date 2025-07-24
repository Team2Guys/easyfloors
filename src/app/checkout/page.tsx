import Breadcrumb from 'components/Reusable/breadcrumb'
import React from 'react'
import Checkout from './Checkout'
import { Metadata } from 'next';
import logo from "../../../public/assets/images/logo.webp"
export const metadata: Metadata = {
  title: 'Secure Checkout | Complete Your Flooring Order at Easy Floors',
  description:
    'Fast and secure checkout for your Easy Floors order. Enter delivery details, choose payment, and get your dream floors delivered in no time.',
  openGraph: {
    title: 'Secure Checkout | Complete Your Flooring Order at Easy Floors',
    description: 'Fast and secure checkout for your Easy Floors order. Enter delivery details, choose payment, and get your dream floors delivered in no time.',
    url: 'https://easyfloors.ae/checkout',
    images: [{url: `https://easyfloors.ae${logo.src}`, alt: 'Easyfloors',
      },
    ],
    type:'website'
  },
  alternates: {
    canonical: 'https://easyfloors.ae/checkout',
  },
};
const CheckoutPage = async () => {
  return (
    <>
    <Breadcrumb title="Checkout" />
    <Checkout />
    </>
  )
}

export default CheckoutPage
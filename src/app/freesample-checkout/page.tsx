import Breadcrumb from 'components/Reusable/breadcrumb'
import React from 'react'
import { Metadata } from 'next';
import Checkout from 'app/checkout/Checkout';
import logo from "../../../public/assets/images/logo.webp"
export const metadata: Metadata = {
  title: 'Secure Checkout | Complete Your Flooring Order at Easy Floors',
  description:
    'Fast and secure checkout for your Easy Floors order. Enter delivery details, choose payment, and get your dream floors delivered in no time.',
  openGraph: {
    title: 'Secure Checkout | Complete Your Flooring Order at Easy Floors',
    description: 'Fast and secure checkout for your Easy Floors order. Enter delivery details, choose payment, and get your dream floors delivered in no time.',
    url: 'https://easyfloors.ae/freesample-checkout',
    images: [{url: `https://easyfloors.ae${logo.src}`, alt: 'Easyfloors',
      },
    ],
    type:'website'
  },
  alternates: {
    canonical: 'https://easyfloors.ae/freesample-checkout',
  },
};
const CheckoutPage = async () => {
  return (
    <>
    <Breadcrumb title="free sample checkout" />
    <Checkout isFreeSample />
    </>
  )
}

export default CheckoutPage
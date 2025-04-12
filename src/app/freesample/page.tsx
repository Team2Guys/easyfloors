import React from 'react'
import FreeSamplePage from './FreeSamplePage'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Order Free Flooring Samples | Easy Floors UAE',
  description:
    'Try before you buy! Order up to 5 free flooring samples with free delivery across the UAE. Explore colours, textures, and finishes at home.',
  openGraph: {
    title: 'Order Free Flooring Samples | Easy Floors UAE',
    description: 'Try before you buy! Order up to 5 free flooring samples with free delivery across the UAE. Explore colours, textures, and finishes at home.',
    url: 'fullUrl',
    images: [{url: "/assets/images/logo.png", alt: 'Easyfloors',
      },
    ],
  },
  alternates: {
    canonical: '/freesample',
  },
};
const FreeSample = () => {

  return (
    <FreeSamplePage/>
  )
}

export default FreeSample
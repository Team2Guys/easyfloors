import React from 'react';
import Link from 'next/link';
import Container from 'components/common/container/Container';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Easy Floors Shipping Policy | UAE Delivery & Charges Info',
  description:
    "Learn about Easy Floors' shipping options across the UAE. Enjoy free delivery on orders over AED 1000, next-day express shipping, and free sample delivery.",
  openGraph: {
    title: 'Easy Floors Shipping Policy | UAE Delivery & Charges Info',
    description: "Learn about Easy Floors' shipping options across the UAE. Enjoy free delivery on orders over AED 1000, next-day express shipping, and free sample delivery.",
    url: '/shipping-policy',
    images: [{url: "/assets/images/logo.webp", alt: 'Easyfloors',
      },
    ],
  },
  alternates: {
    canonical: '/shipping-policy',
  },
};


const Shipping = () => {
  return (
    <Container className="pt-5 md:pt-20 pb-20 space-y-4">
      <h1 className="text-center text-36 sm:text-[47px] font-semibold mb-4 font-inter">Shipping Policy</h1>
      <p className="text-14 sm:text-20 sm:leading-[26px] font-inter text-justify">
      Our goal is to guarantee that your order is delivered within 48 hours to any mainland location across the UAE, ensuring a smooth and hassle-free buying experience. Feel free to contact us at{' '}
        <Link href="mailto:cs@easyfloors.ae" className="text-black underline font-bold">
          cs@easyfloors.ae
        </Link>{' '}
        for any clarification or further information regarding our delivery process. Your satisfaction is our priority.
      </p>
      
      <h2 className="text-14 sm:text-20 sm:leading-[26px] font-inter font-semibold">Shipping Fee:</h2>
      <h2 className=" text-20 sm:text-24 font-semibold font-inter">Express Service (Dubai Only)</h2>
      <ul className='list-disc px-6 text-14 sm:text-20 sm:leading-[26px] font-inter'>
        <li>Delivery: Next working day (cut-off time 1pm)</li>
        <li>Delivery Cost: <span className="font-currency font-normal text-16 sm:text-25"></span> 150</li>
      </ul>

      <h2 className=" text-20 sm:text-24 font-semibold font-inter">Standard Service (All Emirates)</h2>
        <ul className='list-disc px-6 text-14 sm:text-20 sm:leading-[26px] font-inter'>
        <li>Delivery: 2-3 working days</li>
        <li>Delivery Cost: Free*</li>
        </ul>

        <h2 className=" text-20 sm:text-24 font-semibold font-inter">Self-Collect</h2>
        <ul className='list-disc px-6 text-14 sm:text-20 sm:leading-[26px] font-inter'>
        <li>Monday to Saturday, 9am – 6pm</li>
        <li>Location: <Link href="https://maps.app.goo.gl/VoKEfBJLA2y9fySt5" className='font-normal underline hover:text-primary'>Agsons, J1 Warehouses, Jebel Ali Industrial – Dubai</Link></li>
        </ul>
      <p className='text-14 sm:text-20 sm:leading-[26px] font-inter'>* For orders below <span className="font-currency font-normal text-16 sm:text-25"></span> 1,000 for areas outside of Dubai, a charge of <span className="font-currency font-normal text-16 sm:text-25"></span> 150 will apply</p>
    </Container>
  );
};

export default Shipping;
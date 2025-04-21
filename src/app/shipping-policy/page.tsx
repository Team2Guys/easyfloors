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
    images: [{url: "/assets/images/logo.png", alt: 'Easyfloors',
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
      <p className="text-14 sm:text-20 sm:leading-[26px] font-inter">
      Our goal is to guarantee that your order is delivered within 48 hours to any mainland location across the UAE, ensuring a smooth and hassle-free buying experience. Feel free to contact us at{' '}
        <Link href="mailto:cs@easyfloors.ae" className="text-black underline font-bold">
          cs@easyfloors.ae
        </Link>{' '}
        for any clarification or further information regarding our delivery process. Your satisfaction is our priority.
      </p>
      
      <h2 className=" text-20 sm:text-24 font-semibold font-inter">Express Shipping- Next-day delivery</h2>
      <div className='space-y-2'>
      <h2 className="text-14 sm:text-20 sm:leading-[26px] font-inter font-semibold">Shipping Fee:</h2>
      <ul className='list-disc px-6 text-14 sm:text-20 sm:leading-[26px] font-inter'>
        <li>All Emirates- <span className="font-currency font-normal text-16 sm:text-25"></span> 150</li>
        <li>Free shipping for all orders above <span className="font-currency font-normal text-16 sm:text-25"></span> 1000</li>
      </ul>
      <p className='text-14 sm:text-20 sm:leading-[26px] font-inter'>*Free Express delivery is available for orders above <span className="font-currency font-normal text-16 sm:text-25"></span> 1000. Orders less than <span className="font-currency font-normal text-16 sm:text-25"></span> 1000 will be charged according to the location.</p>
      </div>

      <h2 className=" text-20 sm:text-24 font-semibold font-inter">Standard Shipping- Within 2-3 working days</h2>
      <div className='space-y-2'>
      <h2 className="text-14 sm:text-20 sm:leading-[26px] font-inter font-semibold">Shipping Fee: <span className='font-normal'>Free for all Emirates</span></h2>
      <p className='text-14 sm:text-20 sm:leading-[26px] font-inter'>We also have a self-collect option available where you can select the products on the website and collect them at our Jebel Ali Industrial warehouse.</p>
      </div>
      <div className='space-y-2'>
      <h2 className="text-20 sm:text-24 font-semibold font-inter">Self Collect: Mon-Sat (9 am-6 pm)</h2>
      <p className="text-14 sm:text-20 sm:leading-[26px] font-inter">Location: <Link href="https://maps.app.goo.gl/VoKEfBJLA2y9fySt5" className='font-normal underline hover:text-primary'>Agsons, J1 Warehouses, Jebel Ali Industrial – Dubai</Link></p>
      </div>
      <h2 className=" text-20 sm:text-24 font-semibold font-inter">CASH ON DELIVERY: NOT AVAILABLE</h2>
    </Container>
  );
};

export default Shipping;
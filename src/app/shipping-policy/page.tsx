import React from 'react';
import Link from 'next/link';
import Container from 'components/common/container/Container';
import { deliveryCharges } from 'data/data';
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
    <Container className="pt-5 md:pt-20 pb-20">
      <h1 className="text-center text-36 sm:text-[47px] font-semibold mb-4 font-inter">Shipping Policy</h1>
      <p className="mb-6 text-14 sm:text-20 sm:leading-[26px] font-inter">
      Click below to view a detailed table of charges for in-country delivery. Our goal is to guarantee that your order is delivered within 48 hours to any mainland location across the UAE, thereby, ensuring a smooth and hassle-free buying experience. Charges for Free zones will depend upon specific requirements set forth; hence, we will take care of you if you have any questions concerning the same. Feel free to contact us at {' '}
        <Link href="mailto:cs@easyfloors.ae" className="text-black underline font-bold">
          cs@easyfloors.ae
        </Link>{' '}
        for any clarification or further information regarding our delivery process. Your satisfaction is our priority!
      </p>
      
      <h2 className=" text-20 sm:text-28 font-semibold font-inter">DELIVERY CHARGES</h2>
      {deliveryCharges.map((item, index) => (
        <div key={index} className="mt-4 font-inter">
          <h3 className=" text-14 sm:text-22 font-semibold">{item.location}</h3>
          <ul >
            {item.charges.map((charge, index) => (
              <li key={index} className=" text-12 sm:text-20" dangerouslySetInnerHTML={{ __html: charge || "" }} />
            ))}
          </ul>
        </div>
      ))}
      <h2 className="mt-6  text-16 sm:text-28 font-bold font-inter">CASH ON DELIVERY: NOT AVAILABLE</h2>
    </Container>
  );
};

export default Shipping;
import Container from 'components/common/container/Container';
import { policySections } from 'data/data';
import React from 'react';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Easy Floors Return & Refund Policy | Hassle-Free 7-Day Returns',
  description:
    'Changed your mind? Return unused items within 7 days. Learn about refund timelines, return shipping, and what to do if you receive a defective product.',
  openGraph: {
    title: 'Easy Floors Return & Refund Policy | Hassle-Free 7-Day Returns',
    description: 'Changed your mind? Return unused items within 7 days. Learn about refund timelines, return shipping, and what to do if you receive a defective product.',
    url: '/return-and-refund-policy',
    images: [{url: "/assets/images/logo.webp", alt: 'Easyfloors',
      },
    ],
    type:"website"
  },
  alternates: {
    canonical: 'https://easyfloors.ae/return-and-refund-policy',
  },
};
const ReturnRefundPolicy = () => {
  return (
    <Container className="pt-10 md:pt-20">
      <h1 className="text-center text-36 sm:text-[47px] font-semibold mb-4 font-inter">Return and Refund Policy</h1>
      {policySections.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className=" text-20 sm:text-28 font-semibold mb-2 font-inter">{section.title}</h2>
          {section.content.map((paragraph, i) => (
            <p key={i} className=" text-14 sm:text-20 sm:leading-[26px] mb-2 font-inter" dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>
      ))}
    </Container>
  );
};

export default ReturnRefundPolicy;
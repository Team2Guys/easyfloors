import React from 'react';
import Link from 'next/link';
import Container from 'components/common/container/Container';
import { createMetadata } from 'utils/metadataHelper';
import { pageMetadataData } from 'data/meta-data';
export const metadata = createMetadata(pageMetadataData.shipping_policy);


const Shipping = () => {
  return (
    <Container className="pt-5 md:pt-20 pb-20 space-y-4">
      <h1 className="text-center text-36 sm:text-[47px] font-semibold mb-4 font-inter">Shipping Policy</h1>
      <p className="text-14 sm:text-20 sm:leading-[26px] font-inter text-justify">
      Our goal is to guarantee that your order is delivered to all mainland locations in the UAE within 2 to 3 working days, which ensures a smooth and hassle-free buying experience. You can contact us any time at{' '}
        <Link href="mailto:cs@easyfloors.ae" className="text-black underline font-bold">
          cs@easyfloors.ae
        </Link>{' '}for further information or any clarification regarding our delivery process. Your satisfaction is our priority.
      </p>
      
      <h2 className="text-14 sm:text-20 sm:leading-[26px] font-inter font-semibold">Shipping Fee:</h2>
      <h2 className=" text-20 sm:text-24 font-semibold font-inter">Express Service (Dubai Only)</h2>
      <ul className='list-disc px-6 text-14 sm:text-20 sm:leading-[26px] font-inter'>
        <li>Delivery: Next working day (cut-off time 1pm)</li>
        <li>Delivery Cost: <span className="font-currency font-normal text-16 sm:text-25"></span> 150</li>
      </ul>
        <h2 className=" text-20 sm:text-24 font-semibold font-inter">Standard Service (Dubai)</h2>
        <ul className='list-disc px-6 text-14 sm:text-20 sm:leading-[26px] font-inter'>
        <li>Delivery: 2 working days</li>
        <li>Delivery Cost: Free</li>
        </ul>
      <h2 className=" text-20 sm:text-24 font-semibold font-inter">Standard Service (All Other Emirates)</h2>
        <ul className='list-disc px-6 text-14 sm:text-20 sm:leading-[26px] font-inter'>
        <li>Delivery: 2-3 working days</li>
        <li>Delivery Cost: Free for orders above <span className="font-currency font-normal text-16 sm:text-25"></span> 1,000. <span className="font-currency font-normal text-16 sm:text-25"></span> 150 delivery charge applies for orders below <span className="font-currency font-normal text-16 sm:text-25"></span> 999</li>
        </ul>

        <h2 className=" text-20 sm:text-24 font-semibold font-inter">Self-Collect</h2>
        <ul className='list-disc px-6 text-14 sm:text-20 sm:leading-[26px] font-inter'>
        <li>Monday to Saturday, 9am – 6pm</li>
        <li>Location: <Link href="https://maps.app.goo.gl/BBJjwVKgTK4PPTWR8" className='font-normal underline hover:text-primary'>22nd 15B St - Al Quoz - Al Quoz Industrial Area 4 - Dubai - UAE</Link></li>
        </ul>
    </Container>
  );
};

export default Shipping;
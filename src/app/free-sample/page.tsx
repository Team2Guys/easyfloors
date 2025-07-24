import Container from 'components/common/container/Container'
import { freeSampleImage } from 'data/free-sample'
import { Metadata } from 'next';
import Image from 'next/image'
import React from 'react'
import logo from "../../../public/assets/images/logo.webp"
export const metadata: Metadata = {
  title: 'Order Free Flooring Samples | Easy Floors UAE',
  description:
    'Try before you buy! Order up to 5 free flooring samples with free delivery across the UAE. Explore colours, textures, and finishes at home.',
  openGraph: {
    title: 'Order Free Flooring Samples | Easy Floors UAE',
    description: 'Try before you buy! Order up to 5 free flooring samples with free delivery across the UAE. Explore colours, textures, and finishes at home.',
    url: 'https://easyfloors.ae/free-sample',
    images: [{url: logo.src, alt: 'Easyfloors',
      },
    ],
      type:'website'
  },
  alternates: {
    canonical: 'https://easyfloors.ae/free-sample',
  },
};
const FreeSampleDetail = () => {
  return (
    <Container className='space-y-2 sm:space-y-4 my-10 font-inter'>
      <h1 className='text-center text-36 sm:text-[47px] font-semibold mb-4 font-inter'>Free Samples</h1>
      <p className='text-14 sm:text-20 sm:leading-[26px] text-justify'>At www.easyfloors.ae , we understand that judging the quality and colour of our flooring on your screen isn’t the easiest task in the world. So we’d like to help give you the confidence by sending out free samples. Yes, you can order up to 5 samples which will be delivered FREE OF CHARGE anywhere in the UAE. Add to your basket or drop us a call or message if you need some more help or advice. We’re on hand to help you get exactly what you’re looking for.
      </p>
      <div className='w-full grid grid-cols-5 gap-2'>
        {
          freeSampleImage.map((item,index)=>(
            <div key={index}>
                <Image width={400} height={400} src={item.image} alt='freesample'/>          
            </div>
          ))
        }
      </div>
      <p className='text-14 sm:text-20 sm:leading-[26px] text-justify'>We meticulously pack and ship your choices to guarantee they reach you in flawless condition. Additionally, there’s no pressure to buy afterwards — our focus is solely on helping you discover what you truly adore.</p>
      <p className='text-14 sm:text-20 sm:leading-[26px] text-justify'>Find the essence of quality, texture, and colour firsthand, because the journey to the perfect choice begins with a premium experience.</p>
    </Container>
  )
}

export default FreeSampleDetail
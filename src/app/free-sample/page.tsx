import Container from 'components/common/container/Container'
import { freeSampleImage } from 'data/free-sample'
import Image from 'next/image'
import React from 'react'

const FreeSampleDetail = () => {
  return (
    <Container className='space-y-2 sm:space-y-4 my-10 font-inter'>
      <h1 className='text-center text-36 sm:text-[47px] font-semibold mb-4 font-inter'>Free Samples</h1>
      <p className='text-14 sm:text-20 sm:leading-[26px]'>At Easy Floors, we understand that experiencing our products firsthand is the ultimate proof of their quality. We provide up to 5 complimentary samples delivered right to your doorstep anywhere in the UAE, allowing you to touch, feel, and experience the exceptional quality before you buy. When it comes to selecting materials for your home, office, or any project, making the right choice is essential. Experience the clarity of free samples, guiding you to make informed and confident choices. Customers have the opportunity to request a maximum of 5 samples from any product of their choice. Unfortunately, we do not offer samples for accessories.
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
      <p className='text-14 sm:text-20 sm:leading-[26px]'>We meticulously pack and ship your choices to guarantee they reach you in flawless condition. Additionally, there’s no pressure to buy afterwards — our focus is solely on helping you discover what you truly adore.</p>
      <p className='text-14 sm:text-20 sm:leading-[26px]'>Find the essence of quality, texture, and colour firsthand, because the journey to the perfect choice begins with a premium experience.</p>
    </Container>
  )
}

export default FreeSampleDetail
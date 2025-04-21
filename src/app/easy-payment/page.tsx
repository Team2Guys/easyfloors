import React from 'react'
import Container from 'components/common/container/Container'
import { easyPayment } from 'data/cart'
import Image from 'next/image'

const EasyPayment = () => {
  return (
    <Container className='space-y-2 sm:space-y-4 my-10 font-inter'>
    <h1 className='text-center text-36 sm:text-[47px] font-semibold mb-4 font-inter'>Easy Payment</h1>
    <p className='text-14 sm:text-20 sm:leading-[26px]'>You can shop with us whenever you want and without any stress.  We let you buy what you want now and pay for it later with Easy Payment. There are no interest or other fees.  Trusted partners like Tabby and Tamara can help you break down your purchase into four equal payments of the total amount. You can pay one payment today and the rest over the next three months. It&apos;s easy, safe, and completely clear.</p>
    <p className='text-14 sm:text-20 sm:leading-[26px]'>To set up your plan right away, just choose Tabby or Tamara at checkout.</p>
     <div className="flex  flex-wrap gap-5 pt-3">
      {
          easyPayment.map((array, index) => (
              <Image className=' w-16 h-11 md:w-14 md:h-12 2xl:w-[90px] 2xl:h-[60px] shadow' key={index} width={90} height={60} src={array.image} alt='payment-card' />
          ))
      }
     </div>
    <p className='text-14 sm:text-20 sm:leading-[26px]'>Would you rather pay in full?  You can also pay with Visa, Mastercard, Apple Pay, and Google Pay. This gives you even safer ways to make your purchase.</p>
    <p className='text-14 sm:text-20 sm:leading-[26px]'>Our different payment choices make shopping easier and more accessible, so you can focus on finding what you need without having to worry about how much it will cost right away.</p>

    </Container>
  )
}

export default EasyPayment
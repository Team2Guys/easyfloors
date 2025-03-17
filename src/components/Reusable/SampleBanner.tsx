
import Container from 'components/common/container/Container'
import Image from 'next/image'
import React from 'react'

const SampleBanner = () => {
  return (
    <Container>
      <div className='border-t-[1px] border-t-[#00000033] sm:hidden'></div>
      <div className='w-full h-auto mt-7 xl:mt-14'>
        <div className='flex justify-center items-center'>
          <Image src='/assets/category/newbanner.webp'
            height={200}
            width={800}
            alt='image'
            priority
            className='w-[200px] h-[160px] lg:w-[500px] lg:h-[400px] xl:w-[610px] xl:h-[500px] 2xl:w-[810px] 2xl:h-[669px]'
          />
        </div>
        <div className='w-full flex justify-between items-center border-b-[1px] sm:border-b-2 border-b-[#00000033] mt-5'>
          <div className="w-5/12 sm:w-9/12 lg:w-2/3 overflow-hidden">
            <Image src='/assets/category/delivery-truck.png'
              height={800}
              width={800}
              alt='image'
              priority
              className='h-5 w-10 sm:h-[64px] sm:w-24 xl:w-[238px] xl:h-[122px] animate-moveTruck'
            />
          </div>
          <div className='w-7/12 sm:w-4/12 lg:w-4/12 h-auto'>
            <p className='text-12 sm:text-base md:text-lg lg:text-3xl text-inter xl:text-4xl 2xl:text-[42.6px] text-inter font-medium text-end pr-2 md:pr-7'>Free Samples UAE Wide</p>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default SampleBanner
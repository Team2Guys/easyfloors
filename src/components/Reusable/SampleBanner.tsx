
import Container from 'components/common/container/Container'
import Image from 'next/image'
const bannerImage = '/assets/images/Home/free_sample_image.webp'
import React from 'react'

const SampleBanner = () => {
  return (
    <Container>
      <div className='border-t-[#00000033] border-t-[1px] sm:hidden'></div>
      <div className='h-auto w-full mt-7 xl:mt-14'>
        <div className='flex justify-center items-center'>
          <Image 
          // src='https://res.cloudinary.com/dmmeqgdhv/image/upload/v1742291498/newbanner_11zon_11zon_jr57od.webp'
          src={bannerImage}
            height={200}
            width={800}
            alt='image'
            priority
            className='h-[160px] w-[200px] 2xl:h-[669px] 2xl:w-[810px] lg:h-[400px] lg:w-[500px] xl:h-[500px] xl:w-[610px]'
          />
        </div>
        <div className='flex border-b-[#00000033] border-b-[1px] justify-between w-full items-center mt-5 sm:border-b-2'>
          <div className="w-5/12 lg:w-2/3 overflow-hidden sm:w-9/12">
            <Image src='https://res.cloudinary.com/dmmeqgdhv/image/upload/v1742291653/delivery-truck_11zon_hsjurq.webp'
              height={800}
              width={800}
              alt='image'
              priority
              className='h-5 w-10 animate-moveTruck sm:h-[64px] sm:w-24 xl:h-[122px] xl:w-[238px]'
            />
          </div>
          <div className='h-auto w-7/12 lg:w-4/12 sm:w-4/12'>
            <p className='text-12 text-end text-inter 2xl:text-[42.6px] font-medium lg:text-3xl md:pr-7 md:text-lg pr-2 sm:text-base xl:text-4xl'>Free Samples UAE Wide</p>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default SampleBanner
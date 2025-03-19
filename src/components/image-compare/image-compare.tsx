"use client"
import React, { useState } from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import Container from 'components/common/container/Container';

const ImageCompare = () => {
  const [position, setPosition] = useState(50);

  return (
    <Container className='mt-10'>
      <div className='w-full flex flex-col items-center gap-8 relative'>
        <ReactCompareSlider
          className='w-full h-[195px] md:h-[300px] xl:h-[400px] 2xl:h-[583px]'
          position={position}
          onPositionChange={(pos) => setPosition(pos)}
          itemOne={
            <ReactCompareSliderImage loading='lazy' src='https://res.cloudinary.com/dmmeqgdhv/image/upload/v1742291682/before_11zon_daghbl.webp' alt='Before Image' />
          }
          itemTwo={
            <ReactCompareSliderImage loading='lazy' src='https://res.cloudinary.com/dmmeqgdhv/image/upload/v1742291474/after_11zon_rnlr1c.webp' alt='After Image' />
          }
        />
        {position < 5 ? null : (
          <span className='absolute bottom-4 text-black left-4 bg-white/70 w-[50px] h-[28px] sm:w-[100px] 2xl:w-[157px] text-center lg:h-[35px] 2xl:h-[47px] font-medium font-inter text-14 md:text-20 2xl:text-2 flex justify-center items-center'>
            Before
          </span>
        )}
        {position > 95 ? null : (
          <span className='absolute bottom-4 text-black right-4 bg-white/70 w-[50px] h-[28px] sm:w-[100px] 2xl:w-[157px] text-center lg:h-[35px] 2xl:h-[47px] font-medium font-inter text-14 md:text-20 2xl:text-2 flex justify-center items-center'>
            After
          </span>
        )}
      </div>
    </Container>
  );
};

export default ImageCompare;

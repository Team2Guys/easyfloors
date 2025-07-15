'use client'
import { FloorItemsData } from 'data/data';
import Container from 'components/common/container/Container';
import Image from 'next/image';
import { useState } from 'react';

const FloorItems = () => {
  const [hoverIndex, serHoverImage] = useState<number | null>(null)
  return (
    <Container>
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 md:gap-16 gap-2 ">
        {FloorItemsData.map((item, index) => (
          <div key={index} className="flex flex-col items-center font-inter justify-center ">
            <h3 className="md:text-3xl text-14 md:font-bold md:mb-5 mb-2 whitespace-nowrap">{item.title}</h3>
            <div className='h-[100px] xs:h-full 2xl:h-auto w-full'
                onMouseEnter={() => serHoverImage(index)}
                onMouseLeave={() => serHoverImage(null)}
            >
              <Image
                src={hoverIndex === index ? item.hoverImage : item.imageUrl}
                alt={item.title}
                loading='lazy'
                fill
                className="!relative"
                sizes="(max-width: 768px) 100px, 600px"
              />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default FloorItems;

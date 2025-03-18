import React from 'react';
import { FloorItemsData } from 'data/data'; 
import Container from 'components/common/container/Container';
import Image from 'next/image';

const FloorItems = () => {
  return (
    <Container>
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 md:gap-16 gap-2 ">
        {FloorItemsData.map((item) => (
          <div key={item.id} className="flex flex-col items-center font-inter justify-center ">
            <h3 className="md:text-3xl text-[10px] md:font-bold md:mb-5 mb-2 whitespace-nowrap">{item.title}</h3>
            <Image
              src={item.imageUrl}
              alt={item.title}
              loading='lazy'
              width={800} 
              height={300} 
              className="w-auto h-full"
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default FloorItems;

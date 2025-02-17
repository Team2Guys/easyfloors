import React from 'react';
import { FloorItemsData } from 'data/data'; 
import Container from 'components/common/container/Container';
import Image from 'next/image';

const FloorItems: React.FC = () => {
  return (
    <Container>
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 md:gap-10 gap-2 md:px-6">
        {FloorItemsData.map((item) => (
          <div key={item.id} className="flex flex-col items-center font-inter justify-center md:p-4">
            <h3 className="md:text-3xl text-[12px] font-bold md:mb-5 mb-2">{item.title}</h3>
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={500} 
              height={300} 
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default FloorItems;

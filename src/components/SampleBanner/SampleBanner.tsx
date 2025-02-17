import React from 'react';
import Image from 'next/image';
import { TImageBanner } from 'types/type';
import Container from 'components/common/container/Container';

const SampleBanner: React.FC<{ imageData: TImageBanner }> = ({ imageData }) => {
  return (
   <Container>
     <div className="image-container w-full h-full">
      <Image
        src={imageData.src}
        width={1500}
        height={500}
        alt={imageData.alt}
        className="w-full h-full"
      />
    </div>
   </Container>
  );
};

export default SampleBanner;

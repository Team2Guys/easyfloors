import React from 'react';
import Image from 'next/image';
import Container from 'components/common/container/Container';
import { serviceItems } from 'data/data';

interface servicesProps {
  className?: string;
}

const Services: React.FC<servicesProps> = ({ className }) => {
  return (
    <section className={`py-10 ${className ? className : ''}`}>
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-6 md:gap-10 font-helvetica ">
          {serviceItems.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col justify-center items-center gap-2 xs:gap-3 px-5 sm:px-10 lg:px-6 xl:px-10 bg-white py-10 rounded-sm h-28 xs:h-36 shadow-[0px_2px_12px_#00000018] ${className ? 'custom-service-box' : ''}`}
            >
              <Image src={item.icon} width={100} height={100} alt="icon" className='w-auto' />
              <div className="text-xs xs:text-16 md:text-18 lg:text-14 2xl:text-20 text-center">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Services;

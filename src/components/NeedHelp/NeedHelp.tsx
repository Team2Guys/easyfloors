import Container from 'components/common/container/Container';
import { boxData } from 'data/data';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';  

const NeedHelp: React.FC = () => {
    return (
        <Container>
            <div className="flex justify-center lg:gap-10 sm:gap-5 md:gap-10 gap-4 w-full">
                {boxData.map((box) => (
                    <div key={box.id} className="md:py-10 py-4 md:px-0 px-2 text-center border-[#CCCCCC] border-2 md:w-1/2 font-inter">
                        <div className="max-w-xl mx-auto">
                            <Image
                                src={box.icon} 
                                alt={box.title}
                                width={64}  
                                height={64} 
                                className="mx-auto mb-4 w-full md:h-16 h-10 object-contain"
                            />
                            <div>
                                <h2 className="text-base md:text-3xl font-semibold">{box.title}</h2>
                                <p className="text-gray-600 md:text-lg text-sm md:mt-4 mt-2">{box.description}</p>
                            </div>
                            <div className="md:mt-10 mt-4">
                                <Link
                                    href="#"
                                    className="md:py-3 py-2 px-2 md:text-lg text-sm md:px-12 bg-primary font-inter font-medium xs:font-light text-white"
                                >
                                    {box.buttonText}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default NeedHelp;

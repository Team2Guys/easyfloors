"use client ";

import Image from "next/image";
import { TAboutUsProps } from "types/types";

const AboutUsInfo: React.FC<TAboutUsProps> = ({ sections }) => {
    return (
        <div className="space-y-10 md:pt-8  font-inter ">
            {sections.map((section, index) => (
                <div
                    key={section.id}
                    className={`flex flex-col md:flex-row items-center  md:gap-20 gap-10 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                        }`}
                >
                    <div className="w-full md:w-1/2">
                        <Image
                            src={section.image}
                            alt={section.alt}
                            width={600}
                            height={400}
                            className="w-full h-auto rounded-sm shadow-sm"
                        />
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
                        <h2 className="md:text-3xl text-xl font-bold text-gray-600">{section.heading}</h2>
                        <p className="text-gray-600">{section.paragraph}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AboutUsInfo;

import Link from "next/link";
import { TiArrowRight } from "react-icons/ti";
import { HeroMainProps } from "types/type";
import SaleTimer from "./SaleTimer";
import Image from "next/image";

const HeroMain: React.FC<HeroMainProps> = ({ items }) => {
  return (
    <div className="relative flex flex-col w-full h-[320px] sm:h-[600px] xl:h-[885px]">
      {items.map((item, index) => (
        <div
          key={index}
          className="relative w-full h-[320px] sm:h-[600px] xl:h-[885px]"
        >
          <Image
            src="/assets/images/Home/hero-min.avif"
            alt="hero"
            priority
            fill
            loading="eager"
            className="w-full h-full object-cover hidden sm:block"
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 100vw"

          />

          {/* <Image
            src={item.backgroundImageMobile}
            alt="hero"
            priority
            width={400}
            height={320}
            loading="eager"
            className="w-full h-full object-cover block sm:hidden"
          /> */}
          <div className="bg-background">
            <div className="absolute top-[6%] sm:top-[20%] lg:top-[14%] bg-background left-4 sm:left-0 opacity-90 xs:opacity-95 p-2 sm:p-6 md:p-8 w-[65%] xs:w-[58%] sm:w-[270px] md:w-[300px] lg:w-[400px] xl:w-[500px] shadow-md">
              <div className="flex flex-col justify-start items-start font-inter text-black font-light space-y-1 sm:space-y-3 lg:space-y-4 sm:pl-4 md:pl-5 lg:pl-12 xl:pl-16">
                <div className="flex justify-between items-center w-full text-11 xs:text-12 sm:text-sm">
                  <p className="text-11 xs:text-12 sm:text-sm">{item.offerText}</p>
                  <SaleTimer time='2025-05-27T23:59:59' />
                </div>
                <h2 className="text-14 sm:text-2xl lg:text-[35px] xl:text-5xl leading-[1.2] sm:leading-[1.4] md:leading-[1.6] xl:leading-[67.2px]">
                  Starting From Just <span className='font-currency font-normal text-18 sm:text-3xl lg:text-[42px] xl:text-[55px]'></span>49 Per Square Metre.
                </h2>
                <p className="text-12 sm:text-sm md:text-base sm:leading-6 md:leading-7 w-full text-justify">
                  {item.description}
                </p>
                <Link
                  href={item.buttonLink}
                  className="w-full px-2 py-2 sm:px-5 sm:py-3 xl:px-16 lg:px-6 lg:py-7 text-white bg-primary font-semibold xs:font-medium text-12 sm:text-sm lg:text-20 transition inline-block text-center"
                >
                  {item.buttonText}
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 sm:bottom-5 right-3 sm:right-5 xl:right-14 bg-background opacity-90 xs:opacity-95 p-1 sm:p-4 md:p-5 shadow-md w-[200px] sm:h-auto sm:w-[220px] md:w-[235px] lg:w-[314px] sm:space-y-1 xl:space-y-2 justify-start text-start">
            <Link
              href="/polar-flooring"
              aria-label="Visit american walnut product page"
            >
              <h3 className="text-16 sm:text-sm lg:text-[28px] font-medium">
                {item.brand}
              </h3>
              <div className=" flex justify-start items-center sm:gap-2 mt-1 lg:mt-3 ">
                <div className="w-full"><span className='font-inter text-14 lg:text-xl sm:font-semibold font-normal '>Starting From <span className='font-currency font-normal text-[16px] lg:text-[25px]'></span> 49/m²</span></div>
                <div className="w-fit mt-1">
                  <TiArrowRight size={25} />
                </div>

              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroMain;

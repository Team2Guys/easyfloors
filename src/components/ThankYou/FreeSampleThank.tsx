"use client";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
const FreeSampleThank = () => {


   return (
      <div className="max-w-4xl mx-auto md:p-0 p-2 my-10">
         <h1 className="md:text-6xl text-3xl font-bold text-center font-inter">THANK YOU!</h1>
         <p className="text-center mt-2 md:text-xl text-base md:px-0 px-4">An order confirmation email has been sent to your inbox with all the details.</p>
         <p className="text-center mt-2 md:text-xl text-base md:px-0 px-4">We’ll process your sample shortly, and you’ll receive a notification once it’s on the way. If you have any questions, feel free to reach out to our support team.</p>
         <div className="flex flex-col justify-center items-center gap-4 md:my-16 my-6">
            <Link href="/" className="bg-primary text-white max-w-fit md:px-28 px-8 md:py-4 py-2 flex items-center md:text-lg text-sm font-inter font-light md:gap-3 gap-1"> <IoIosArrowRoundBack className="text-32" />  Back to Shopping</Link>
            <Link href="/return-and-refund-policy" className=" max-w-fit text-black border-black text-lg font-inter md:mt-4 border-b">Read about our return policy</Link>
         </div>
      </div>)
};

export default FreeSampleThank;

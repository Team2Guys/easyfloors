
"use client"

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
import { PaymentQueryParams } from "app/thank-you/page";
import { useMutation } from "@apollo/client";
import { IProduct } from "types/prod";
import { POST_PAYMENT_STATUS } from "graphql/mutations";

const ThankYouComp: React.FC<{ extractedParams: PaymentQueryParams }> = ({ extractedParams }) => {
    const hasRun = useRef(false);
    const [postPaymentStatus, { data, loading, error }] = useMutation(POST_PAYMENT_STATUS);

    useEffect(() => {
        if (!hasRun.current) {
            postPaymentStatus({ variables: { postpaymentStatus: extractedParams } });
            hasRun.current = true;
        }
    }, []);
    const productlength = data?.postpaymentStatus?.products?.length || 0
    return (

        loading ? <p>....loading</p> : error ? <p>{error?.message}</p> :


            data &&
            <div className="max-w-4xl mx-auto md:p-0 p-2">
                <h1 className="md:text-6xl text-3xl font-bold text-center font-inter">THANK YOU!</h1>
                <p className="text-center mt-2 md:text-xl text-base md:px-0 px-4">Say thanks, confirm the payment, provide the order ID and mention that the order confirmation email has been sent.</p>
                <div className="flex flex-col justify-center items-center gap-4 md:my-16 my-6">
                    <Link href="/" className="bg-primary text-white max-w-fit md:px-28 px-8 md:py-4 py-2 flex items-center md:text-lg text-sm font-inter font-light md:gap-3 gap-1"> <IoIosArrowRoundBack className="text-32" />  Back to Shopping</Link>
                    <Link href="/return-and-refund-policy" className=" max-w-fit text-black border-black text-lg font-inter md:mt-4 border-b">Read about our return policy</Link>
                </div>

                <div className="bg-[#FFF9F5]  ">
                    <div className="border-b md:p-7 p-3 ">
                        <h2 className="md:text-3xl text-xl font-inter">Order Summary <sup className="md:text-sm md:ml-3 text-10 text-red-500">*Total {`${productlength}`} {productlength > 1 ? "Items" : "Item"}</sup> </h2>
                    </div>
                    <div className="md:p-10 p-2">
                        <div className="max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                            {data?.postpaymentStatus?.products?.map((item: IProduct, index: number) => (
                                <div key={index} className="md:pr-6">
                                    <div className="flex items-center justify-between border-b gap-5 pb-4 mb-4">
                                        <div className="flex items-center md:gap-5 gap-2">
                                            <Image src={item?.image || ""} width={100} height={100} alt={item.name} className="md:w-20 md:h-20 w-16 h-16 object-cover border p-1" />
                                            <div>
                                                <p className="font-inter font-bold md:text-base text-sm">{item?.name}</p>
                                                <p className="md:text-sm text-gray-600 mt-1 text-12">No. Of Boxes: {item.requiredBoxes} ({item.squareMeter} SQM)</p>
                                            </div>
                                        </div>
                                        <p className="md:text-lg text-base font-semibold">AED {item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 text-right">
                            <div className="flex items-center gap-4 mt-4">
                                <p className="md:text-2xl text-xl whitespace-nowrap font-bold">Total Incl. VAT</p>
                                <span className="flex-grow border-b"></span>
                                <p className="lg:text-xl text-lg font-bold whitespace-nowrap">AED {data?.postpaymentStatus?.totalPrice}</p>
                            </div>
                            <div className="border-t md:mt-12 mt-3  ">
                                <p className="text-left mt-2 md:text-xl text-base">Expected delivery date is s simply dummy text of the printing and</p>
                            </div>
                        </div>

                    </div>



                </div>



            </div>



    );
};

export default ThankYouComp;

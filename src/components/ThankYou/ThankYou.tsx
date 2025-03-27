"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
import { PaymentQueryParams } from "app/thank-you/page";
import { useMutation } from "@apollo/client";
import { POST_PAYMENT_STATUS } from "graphql/mutations";
import OrderSummary from "./OrderSummary"; 

const ThankYouComp: React.FC<{ extractedParams: PaymentQueryParams }> = ({ extractedParams }) => {
  const hasRun = useRef(false);
  const [postPaymentStatus, { data, loading, error }] = useMutation(POST_PAYMENT_STATUS);

  useEffect(() => {
    if (!hasRun.current) {
      postPaymentStatus({ variables: { postpaymentStatus: extractedParams } });
      hasRun.current = true;
    }
  }, []);

  return loading ? (
    <p>....loading</p>
  ) : error ? (
    <p>{error?.message}</p>
  ) : (
    data && (
      <div className="max-w-4xl mx-auto md:p-0 p-2">
        <h1 className="md:text-6xl text-3xl font-bold text-center font-inter">THANK YOU!</h1>
        <p className="text-center mt-2 md:text-xl text-base md:px-0 px-4">
          Say thanks, confirm the payment, provide the order ID and mention that the order confirmation email has been sent.
        </p>
        <div className="flex flex-col justify-center items-center gap-4 md:my-16 my-6">
          <Link
            href="/"
            className="bg-primary text-white max-w-fit md:px-28 px-8 md:py-4 py-2 flex items-center md:text-lg text-sm font-inter font-light md:gap-3 gap-1"
          >
            <IoIosArrowRoundBack className="text-32" /> Back to Shopping
          </Link>
          <Link href="/return-and-refund-policy" className="max-w-fit text-black border-black text-lg font-inter md:mt-4 border-b">
            Read about our return policy
          </Link>
        </div>

        <OrderSummary products={data?.postpaymentStatus?.products} totalPrice={data?.postpaymentStatus?.totalPrice} />
      </div>
    )
  );
};

export default ThankYouComp;

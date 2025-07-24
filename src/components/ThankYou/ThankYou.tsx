"use client";

import React, { useEffect, useRef } from "react";

import { PaymentQueryParams } from "app/thank-you/page";
import { useMutation } from "@apollo/client";
import { POST_PAYMENT_STATUS } from "graphql/mutations";
import OrderSummary from "./OrderSummary";
import CardSkeleton from "components/skaletons/card-skaleton";
import Image from "next/image";
import revalidateTag from "components/ServerActons/ServerAction";
import Shipping from "./Shipping";
import { openDB } from "utils/indexedDB";
const ThankYouComp: React.FC<{ extractedParams: PaymentQueryParams }> = ({ extractedParams }) => {
    const hasRun = useRef(false);
    const [postPaymentStatus, { data, loading, error }] = useMutation(POST_PAYMENT_STATUS);

    const paymenthanlder = async () => {
        if ((!hasRun.current) && extractedParams.success) {
            await postPaymentStatus({ variables: { postpaymentStatus: extractedParams } });
            const db = await openDB();
            const tx = db.transaction("freeSample", "readwrite");
            const tx2 = db.transaction("cart", "readwrite");
            const store2 = tx2.objectStore("cart");
            const store = tx.objectStore("freeSample");
            store.clear();
            store2.clear();
            window.dispatchEvent(new Event("cartUpdated"));

            hasRun.current = true;
            revalidateTag("orders")
            revalidateTag("products")
        }
    }
    useEffect(() => {
        paymenthanlder()
    }, []);


    return (

        loading ? <CardSkeleton length={3} /> : error || !extractedParams.success ?

            <div className="flex justify-center my-20 '">
                <div className="w-full max-w-md">
                    <div className="border-b-4 border-red shadow-lg p-12 text-center flex flex-col items-center">
                        <Image className='flex justify-center' src='/assets/remove.png' alt='remove image' height={50} width={50} />
                        <h2 className="text-4xl font-bold mt-2 mb-3">Payment Unsuccessful</h2>
                        <p className="text-lg text-gray-700 font-medium"> Your payment was not completed. Please try again or contact our support team for assistance.</p>
                    </div>
                </div>
            </div>
            :
            (data &&
                <div className="max-w-4xl mx-auto md:p-0 p-2">
                    <h1 className="md:text-6xl text-3xl font-bold text-center font-inter">THANK YOU!</h1>
                    <p className="text-center mt-2 md:text-xl text-base md:px-0 px-4">Say thanks, confirm the payment, provide the order ID and mention that the order confirmation email has been sent.</p>
                    <Shipping orderid={extractedParams.orderId} />
                    <OrderSummary data={data} />


                </div>)



    );
};

export default ThankYouComp;

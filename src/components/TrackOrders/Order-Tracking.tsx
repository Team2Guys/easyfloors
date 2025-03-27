"use client";

import { PostPaymentStatus } from "types/OrdersProd";

import Container from "components/common/container/Container";
import OrderSummary from "components/ThankYou/OrderSummary";
import { BsTruck } from "react-icons/bs";
import { formatDate, trackingOrder } from "utils/helperFunctions";
import Link from "next/link";
import { SiVisa } from "react-icons/si";


export default function OrderTracking({ data }: { data: PostPaymentStatus }) {
const NewDatas =  {
  postpaymentStatus:data
}

const date = new Date(data.transactionDate)
const formatedDate = formatDate(date)

const TrackingOrder  = trackingOrder(data.shippingMethod.name,date)

const currentDate = new Date();
const isSameDate = formatDate(currentDate);


const sameDate = isSameDate == formatedDate
  return (
    <Container className="w-full py-5 md:py-10 space-y-3 sm:space-y-5 lg:space-y-10">
      <div className="text-center">
        <h1 className="md:text-[30px] 2xl:text-[40px] font-semibold leading-10 text-[#344054]">
          Order ID: <span>{data.orderId}</span>
        </h1>
      </div>

      <div className="flex gap-5 items-center justify-center">
        <div className="border-r-2 pr-5">
          <p className="text-10 sm:text-14 md:text-16 2xl:text-[20px] font-semibold text-[#959BA7]">
            Order date: <span className="text-black">{formatedDate}</span>
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <BsTruck className="w-4 h-4 sm:w-7 sm:h-7 2xl:w-[42px] 2xl:h-[42px] text-primary" />
          <p className="text-10 sm:text-14 md:text-16 2xl:text-[20px] font-semibold text-primary">
            Estimated delivery: <span className="text-black">{data.orderId}</span>
          </p>
        </div>
      </div>

      <hr />

      <div className="w-full mt-5 sm:mt-10">
        <div className="relative flex items-center justify-between mx-auto">
          <div className="absolute top-[32px] sm:top-[38px] md:top-[50px] 2xl:top-[60px] left-1/2 w-full h-[2px] sm:max-w-[100%] md:h-[4px] md:max-w-[95%] xl:max-w-[95%] 2xl:max-w-[95%] mx-auto -translate-x-1/2 bg-[#D0D5DD]"></div>
          {["Confirmed", "Shipped", "Delivered"].map((stage, index) => (
            <div
              key={index}
              className={`flex flex-col relative w-full text-center items-${index === 0 ? "start" : index === 1 ? "center" : "end"
                }`}
            >
              <p className="text-12 sm:text-14 md:text-20 2xl:text-[24px] py-1 text-primary font-semibold">
                {stage}
              </p>
              <div className={`w-[14px] h-[14px] lg:mx-5 sm:w-[20px] sm:h-[20px] md:w-[30px] md:h-[30px] 2xl:w-[35px] 2xl:h-[35px] rounded-full relative z-10 bg-[#D0D5DD] ${sameDate && stage == "Confirmed" || stage == "Shipped" ? "bg-primary" : ""} `}></div>
              <p className="text-10 sm:text-14 md:text-18 2xl:text-[24px] font-semibold text-[#95989C] h-[30px]">
                {index === 2 ? `Expected by, ${TrackingOrder} ` : formatedDate}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap gap-5 md:pt-20">
        <div className="max-w-4xl mx-auto md:order-1 order-2">
          <h2 className="text-xl font-bold mb-6 text-[#616161]">Order details</h2>

          <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            <div className="w-full md:w-1/2 flex flex-col gap-6 md:order-1 order-2">
              <div className="text-base font-semibold">
                <h2 className="text-lg text-gray-400">Contact Information</h2>
                <p className="font-semibold">{data.firstName + " " + data.lastName}</p>
                <p className="text-gray-400">{data.email}</p>
              </div>

              <div className="text-base font-semibold">
                <h2 className="text-lg text-gray-400">Shipping Address</h2>
                <p className="font-semibold">{data.address}</p>
                <p className="text-gray-400">{data.address}</p>
              </div>

              <Link
                href="/"
                className="bg-primary text-white text-center py-2 px-10 w-fit"
              >
                Continue Shopping
              </Link>
            </div>

            <div className="w-full md:w-1/2 flex flex-col gap-6 md:order-2 order-1">
              <div className="text-base font-semibold">
                <h2 className="text-lg text-gray-400">Payment</h2>
                <div className="flex items-center gap-2">
                  <SiVisa  className="text-blue text-4xl shadow px-1 py-0 h-auto w-10" />
                  <p className="text-black">
                    ending with {data.cardLastDigits} -{" "}
                    {data.currency} {data.totalPrice}
                  </p>
                </div>
              </div>

              <div className="text-base mt-4 font-semibold">
                <h2 className="text-lg text-gray-400">Billing Address</h2>
                <p className="font-semibold">{data.address}</p>
                <p className="text-gray-400">{data.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 sm:w-full md:order-2 order-1">
          <OrderSummary data={NewDatas} trackingOrer/>
        </div>
      </div>
    </Container>
  );
}

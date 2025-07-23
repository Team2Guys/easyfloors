import React from "react";
import Image from "next/image";
import { getExpectedDeliveryDate } from "utils/helperFunctions";
import { ORDERS_PROD, PostPaymentStatusResponse } from "types/OrdersProd";

const OrderSummary: React.FC<PostPaymentStatusResponse> = ({ data, trackingOrer }) => {
    const productlength = data?.postpaymentStatus?.products?.length || 0

    const ExpectedDeliveryDAte = getExpectedDeliveryDate(data?.postpaymentStatus?.shippingMethod.name, new Date(data?.postpaymentStatus?.transactionDate));

    const productsPrice = data?.postpaymentStatus.totalPrice - data?.postpaymentStatus.shipmentFee;

    return (

        <div className="bg-[#FFF9F5]  ">
            <div className="border-b md:p-7 p-3 ">
                <h2 className="md:text-3xl text-xl font-inter">Order Summary <sup className="md:text-sm md:ml-3 text-10 text-red-500">*Total {`${productlength}`} {productlength > 1 ? "Items" : "Item"}</sup> </h2>
            </div>
            <div className="md:p-10 p-2">
                <div className="max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                    {data?.postpaymentStatus?.products?.map((item: ORDERS_PROD, index: number) => {

                        const accessoryflag = item?.category?.trim()?.toLowerCase() == "accessories"
                        const colorFlag = accessoryflag && item.selectedColor && item.selectedColor.color
                        return (
                            <div key={index} className="md:pr-6">
                                <div className="flex items-center justify-between border-b gap-5 pb-4 mb-4">
                                    <div className="flex items-center md:gap-5 gap-2">
                                        <Image src={item?.image || ""} width={100} height={100} alt={item.name} className="md:w-20 md:h-20 w-16 h-16 object-cover border p-1" />
                                        <div>
                                            <p className="font-inter font-bold md:text-base text-sm">{item?.name}</p>
                                            <p className="md:text-sm text-gray-600 mt-1 text-12">{accessoryflag ? "Total Required" : "No. Of Boxes"}: {item.requiredBoxes}{accessoryflag ? "m" : ` (${item.squareMeter}  SQM)`}</p>
                                            {colorFlag && <p className="md:text-sm text-gray-600 mt-1 text-12"> Color : {`${item?.selectedColor?.colorName} (${item?.selectedColor?.color})`}</p>}
                                        </div>
                                        <p className="md:text-sm text-gray-600 mt-1 text-12">{accessoryflag ? "Mater Price" : "Box Price"}: <span className="font-currency text-15 font-normal"></span>{item.pricePerBox}</p>
                                    </div>
                                    <p className="md:text-lg text-base font-semibold"><span className="font-currency text-18 font-normal"></span> {item.price.toFixed(2)}</p>
                                </div>
                                <p className="md:text-lg text-base font-semibold">{item.totalPrice === 0 ? 'Free' : (<><span className="font-currency text-18 font-normal"></span> {item.totalPrice.toFixed(2)}</>)}</p>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-6 text-right">
                    {trackingOrer &&
                        <>
                            <div className="flex justify-between">
                                <p className=" whitespace-nowrap font-inter text-20 text-[#818EA1] ">Subtotal</p>
                                <p className=" whitespace-nowrap font-inter text-20 font-normal"><span className="font-currency text-18 font-normal"></span> {productsPrice}</p>

                            </div>

                            <div className="flex justify-between mt-5">
                                <p className=" whitespace-nowrap font-inter text-20 text-[#818EA1] ">Shipping</p>
                                <p className=" whitespace-nowrap font-inter text-20 font-normal">{data.postpaymentStatus.shipmentFee == 0 ? "Free" : (<><span className="font-currency text-18 font-normal"></span> {data.postpaymentStatus.shipmentFee}</>)}</p>

                            </div>
                        </>
                    }

                    <div className="flex items-center gap-4 mt-4">


                        <p className="md:text-2xl text-xl whitespace-nowrap font-bold">Total Incl:</p>
                        <span className="flex-grow border-b"></span>
                        <p className="lg:text-xl text-lg font-bold whitespace-nowrap"><span className="font-currency text-18 font-normal"></span> {data?.postpaymentStatus?.totalPrice}</p>

                    </div>



                    {!trackingOrer && <div className="border-t md:mt-12 mt-3  ">
                        <p className="text-left mt-2 md:text-xl text-base">{ExpectedDeliveryDAte}</p>
                                      </div>}
                </div>

            </div>



        </div>

    );
};

export default OrderSummary;
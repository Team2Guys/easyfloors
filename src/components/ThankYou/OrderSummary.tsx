import React from "react";
import Image from "next/image";
import { IProduct } from "types/prod";

const OrderSummary: React.FC<{ products: IProduct[]; totalPrice: number }> = ({ products, totalPrice }) => {
  const productLength = products?.length || 0;

  return (
    <div className="bg-[#FFF9F5]">
      {/* Order Summary Header */}
      <div className="border-b md:p-7 p-3">
        <h2 className="md:text-3xl text-xl font-inter">
          Order Summary{" "}
          <sup className="md:text-sm md:ml-3 text-10 text-red-500">
            *Total {productLength} {productLength > 1 ? "Items" : "Item"}
          </sup>
        </h2>
      </div>

      {/* Order Items */}
      <div className="md:p-10 p-2">
        <div className="max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {products?.map((item: IProduct, index: number) => (
            <div key={index} className="md:pr-6">
              <div className="flex items-center justify-between border-b gap-5 pb-4 mb-4">
                <div className="flex items-center md:gap-5 gap-2">
                  <Image
                    src={item?.image || ""}
                    width={100}
                    height={100}
                    alt={item.name}
                    className="md:w-20 md:h-20 w-16 h-16 object-cover border p-1"
                  />
                  <div>
                    <p className="font-inter font-bold md:text-base text-sm">{item?.name}</p>
                    <p className="md:text-sm text-gray-600 mt-1 text-12">
                      No. Of Boxes: {item.requiredBoxes} ({item.squareMeter} SQM)
                    </p>
                  </div>
                </div>
                <p className="md:text-lg text-base font-semibold">AED {item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Total Price */}
        <div className="mt-6 text-right">
          <div className="flex items-center gap-4 mt-4">
            <p className="md:text-2xl text-xl whitespace-nowrap font-bold">Total Incl. VAT</p>
            <span className="flex-grow border-b"></span>
            <p className="lg:text-xl text-lg font-bold whitespace-nowrap">AED {totalPrice.toFixed(2)}</p>
          </div>

          {/* Expected Delivery */}
          <div className="border-t md:mt-12 mt-3">
            <p className="text-left mt-2 md:text-xl text-base">
              Expected delivery date is simply dummy text of the printing and
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

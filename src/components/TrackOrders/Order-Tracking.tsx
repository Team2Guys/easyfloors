
  
  "use client"
import Container from "components/common/container/Container"
  import Image from "next/image"
import { BsTruck } from "react-icons/bs"
import { OrderData } from "types/types"
  
  export default function OrderTracking({ order }: { order: OrderData }) {
    return (
      <Container className="w-full py-5 md:py-10 space-y-3 sm:space-y-5 lg:space-y-10">
       <div className="text-center">
       <h1 className="md:text-[30px] 2xl:text-[40px] font-bold leading-10 text-[#344054]">
          Order ID: <span>{order.orderId}</span>
       </h1>
       </div>
        
        <div className="flex gap-5 items-center justify-center">
          <div className="border-r-2 pr-5">
            <p className="text-10 sm:text-14 md:text-16 2xl:text-[20px] font-semibold text-[#959BA7]">
              Order Status: <span className="text-black">{order.orderDate}</span>
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <BsTruck className="w-4 h-4 sm:w-7 sm:h-7 2xl:w-[42px] 2xl:h-[42px] text-[#AFA183]" />
            <p className="text-10 sm:text-14 md:text-16 2xl:text-[20px] font-semibold text-[#AFA183]">
              Estimated delivery: <span className="text-black">{order.estimatedDelivery}</span>
            </p>
          </div>
        </div>
        
        <hr />
        
        <div className="w-full mt-5 sm:mt-10">
          <div className="relative flex items-center justify-between mx-auto">
            <div className="absolute top-[32px] sm:top-[38px] md:top-[50px] 2xl:top-[60px] left-1/2 w-full h-[2px] md:h-[4px] md:max-w-[89%] xl:max-w-[96%] 2xl:max-w-[96%] mx-auto -translate-x-1/2 bg-[#D0D5DD]"></div>
            {["Confirmed", "Ready To Ship", "Delivered"].map((stage, index) => (
              <div key={index} className={`flex flex-col relative w-full text-center items-${index === 0 ? 'start' : index === 1 ? 'center' : 'end'}`}>
                <p className="text-12 sm:text-14 md:text-20 2xl:text-[24px] mt-2 text-[#9C8B6E] font-semibold">{stage}</p>
                <div className="w-[14px] h-[14px] sm:w-[20px] sm:h-[20px] md:w-[30px] md:h-[30px] 2xl:w-[35px] 2xl:h-[35px] rounded-full relative z-10 bg-[#D0D5DD]"></div>
                <p className="text-10 sm:text-14 md:text-18 2xl:text-[22px] text-[#95989C] h-[30px]">{index === 2 ? `Expected by, ${order.estimatedDelivery}` : order.orderDate}</p>
              </div>
            ))}
          </div>
          
          <div className="gap-6 mt-3 md:mt-10">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center gap-4 pb-5">
                <div className="w-14 h-14 md:w-24 md:h-24 2xl:w-40 2xl:h-40 relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="object-cover rounded-lg bg-[#D0D5DD] w-14 h-14 md:w-24 md:h-24 2xl:w-40 2xl:h-40"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="max-sm:text-15 md:text-[18px] xl:text-[22px] 2xl:text-[24px]">{item.name}</h2>
                </div>
                <div className="text-right">
                  <p className="text-14 md:text-[16px] xl:text-[18px] 2xl:text-[24px] font-bold">
                    {item.currency} <span>{item.price}</span>
                  </p>
                  <p className="text-14 md:text-[16px] xl:text-[18px] 2xl:text-[20px]">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    )
  }
  
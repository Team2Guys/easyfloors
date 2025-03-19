"use client";
import Container from 'components/common/container/Container';
import PaymentMethod from 'components/product-detail/payment';
import { fees, paymentcard, UAEStates } from 'data/cart';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { LuMinus, LuPlus } from 'react-icons/lu';
import CartSelect from './cart-select';
import { getCart, removeCartItem } from 'utils/indexedDB';
import { ICart } from 'types/prod';
import { toast } from 'react-toastify';

const CartPage = () => {
  const [cartItems, setCartItems] = useState<ICart[]>([]); 
  const [selectedFee, setSelectedFee] = useState(0);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getCart();
        setCartItems(items);
      } catch {
        toast.error("Error fetching cart items");
      }
    };
  
    fetchCartItems();
  }, []);
  
  const handleRemoveItem = async (id: number) => {
    try {
      await removeCartItem(id); 
      const updatedCart = await getCart();
      setCartItems(updatedCart); 
    } catch {
      toast.error("Error removing item from cart:");
    }
  };

  const updateQuantity = (id: number, index: number) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, requiredBoxes: Math.max(1, (item.requiredBoxes ?? 0) + index) } : item
    ));
  };
  
  const increment = (id: number) => updateQuantity(id, 1);
  const decrement = (id: number) => updateQuantity(id, -1);

  const handleStateSelect = (state: string, fee: number) => {
    setSelectedFee(fee);
  };
  
  
  return (
    
    <Container className='font-inter mt-10  mb-4 sm:mb-10 relative max-sm:max-w-[100%]'>
        <h1 className='text-center xl:text-[48px]'>Your Shopping Cart</h1>
        {
          cartItems.length === 0 ?
          <div className='text-center'>
          <p className='text-center text-[24px] pt-10'>Cart is empty</p>
          <Link href='/' className='text-center text-[18px] bg-primary p-2 flex w-fit mx-auto items-center text-white gap-2 mt-4'>
              <FaArrowLeftLong /> Go Back to Shop
          </Link>
          </div>
          :
        <div className='mt-10 flex flex-wrap md:flex-nowrap gap-5 '>
          <div className=' w-full md:w-[55%] xl:w-[70%] 2xl:w-[65%] px-2'>
          <div className=' max-h-[590px] overflow-x-auto pr-4'>
            <div className=' hidden xl:grid grid-cols-12 text-20 font-light pb-3'>
              <div className='col-span-6'>Product</div>
              <div className='col-span-2 text-center'>Box Qty</div>
              <div className='col-span-2 text-center'>Total Price</div>
              <div className='col-span-2 text-end'>Remove</div>
            </div>
            <div className='border border-b border-[#DEDEDE]'/>
            {cartItems.map((item,cartindex) => (
              <div key={cartindex}>
              <div  className='grid grid-cols-12 text-20 font-light py-2 2xl:py-4'>
                <div className=' col-span-10 xl:col-span-6'>
                  <div className='flex gap-4'>
                    <Image width={170} height={160} className=' w-[74px] md:w-[150px] h-[69px] md:h-[140px]   2xl:w-[170x] 2xl:h-[160px]' src={item.image ?? '/default-image.png'} alt="cart"/>
                    <div>
                      <p className='text-12 sm:text-16 2xl:text-24 font-medium'>{item.name}</p>
                      <p className='text-12 sm:text-14 2xl:text-17'>Price: AED <span>{item.price}</span>/m<sup>2</sup></p>
                      <p className='text-12 sm:text-14 2xl:text-17'>Price Per Box: <span className='font-bold'>AED {item.pricePerBox.toFixed(2)}</span></p>
                      <p className='text-12 sm:text-14 2xl:text-17'>No. Of Boxes: <span className='font-bold'>{item.requiredBoxes ?? 0}</span> ({(item.squareMeter).toFixed(2)} SQM)</p>
                      <div className='flex xl:hidden gap-5 mt-2 items-center'>
                      <div className="flex items-center justify-center border border-[#959595] px-1 py-1 w-fit text-16 text-purple ">
                    <button className="px-1 hover:text-black" onClick={() => decrement(item.id)}>
                      <LuMinus />
                    </button>
                    <span className="text-16 text-purple px-1">{item.requiredBoxes}</span>
                    <button className="px-1 hover:text-black" onClick={() => increment(item.id)}>
                      <LuPlus />
                    </button>
                      </div>
                      <p className='text-14 font-semibold whitespace-nowrap'>AED <span>{(item.pricePerBox * (item.requiredBoxes ?? 0)).toFixed(2)}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-span-2 mx-auto hidden xl:block'>
                  <div className="flex items-center justify-center border border-[#959595] px-1 2xl:px-2 py-2 2xl:py-3 w-fit text-16 text-purple">
                    <button className="px-3 hover:text-black" onClick={() => decrement(item.id)}>
                      <LuMinus />
                    </button>
                    <span className="text-16 text-purple px-2 2xl:px-3">{item.requiredBoxes}</span>
                    <button className=" px-2 2xl:px-3 hover:text-black" onClick={() => increment(item.id)}>
                      <LuPlus />
                    </button>
                  </div>
                </div>
                <div className='col-span-2 text-center hidden xl:block'>
                  <p className='text-16 2xl:text-20 font-semibold'>AED <span>{(item.pricePerBox * (item.requiredBoxes ?? 0)).toFixed(2)}</span></p>
                </div>
                <div className='col-span-2 text-end lg:pr-5'>
                  <button className='text-primary' onClick={() => handleRemoveItem(item.id)}>
                    <svg className=' w-4 h-4  2xl:w-6 2xl:h-5' viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.4688 4H17.8438V1.8125C17.8438 0.847266 17.031 0.0625 16.0313 0.0625H6.96875C5.96904 0.0625 5.15625 0.847266 5.15625 1.8125V4H1.53125C1.02998 4 0.625 4.39102 0.625 4.875V5.75C0.625 5.87031 0.726953 5.96875 0.851563 5.96875H2.56211L3.26162 20.2695C3.30693 21.202 4.10557 21.9375 5.07129 21.9375H17.9287C18.8973 21.9375 19.6931 21.2047 19.7384 20.2695L20.4379 5.96875H22.1484C22.273 5.96875 22.375 5.87031 22.375 5.75V4.875C22.375 4.39102 21.97 4 21.4688 4ZM15.8047 4H7.19531V2.03125H15.8047V4Z" fill="#BF6933"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className='border border-b border-[#DEDEDE]'/>
              </div>
            ))}
          </div> 

          <Link href="/" className='bg-black text-white px-4 py-2 gap-2  justify-center items-center w-fit mt-5 hidden lg:flex'><FaArrowLeftLong /> Continue shopping</Link>
          </div>
          <div className='w-full md:w-[45%] xl:w-[30%] 2xl:w-[35%] bg-background p-3 sm:p-5 space-y-5 h-fit'>
            <div className='flex gap-2 md:gap-5 items-center max-sm:justify-between'>
            <h2 className=' text-18 md:text-20 2xl:text-28'>Order Summary</h2>
            <p className='text-14 text-[#FF0004]'>(*Total {cartItems.length} {cartItems.length === 1 ? "Item" : " Items"})</p>
            </div>
            <div className='border border-b border-[#DEDEDE]'/>

            <div className='flex items-center justify-between text-16 lg:text-20'>
            <p>Subtotal:</p>
            <p>AED {cartItems.reduce((total, item) => total + item.pricePerBox * (item.requiredBoxes ?? 0), 0).toFixed(2)}</p>
            </div>
            <CartSelect select={UAEStates} fees={fees} onSelect={handleStateSelect} />
            <div className='border border-b border-[#DEDEDE]'/>
            <div className='flex items-center justify-between text-16 lg:text-20'>
            <p>Subtotal Incl. VAT</p>
            <p>AED {(cartItems.reduce((total, item) => total + item.pricePerBox * (item.requiredBoxes ?? 0), 0) + selectedFee).toFixed(2)}</p>
            </div>
            <button className='bg-primary text-white px-4 py-3 w-full text-14 md:text-20'>Proceed to Checkout</button>
            <PaymentMethod installments={(cartItems.reduce((total, item) => total + item.pricePerBox * (item.requiredBoxes ?? 0), 0) + selectedFee) / 4}/>
            <p className='tetx-18 xl:text-22 font-semibold'>Buy Now, Pay Later</p>
              <div className='flex justify-between gap-2' >
            {
              paymentcard.map((array,index)=>(
                <Image className=' w-16 h-11 md:w-14 md:h-12 2xl:w-[90px] 2xl:h-[60px]' key={index}  width={90} height={60} src={array.image} alt='payment-card'/>
              ))
            }
              </div>
          </div>
        </div>
        }
        
    </Container>
  )
}

export default CartPage
"use client";
import Container from 'components/common/container/Container';
import PaymentMethod from 'components/product-detail/payment';
import { paymentcard } from 'data/cart';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { LuMinus, LuPlus } from 'react-icons/lu';
import CartSelect from './cart-select';
import { cartremoveFreeSample, getCart, getFreeSamplesCart, openDB, removeCartItem } from 'utils/indexedDB';
import { ICart, IProduct } from 'types/prod';
import { toast } from 'react-toastify';
import RelatedSlider from 'components/related-slider/related-slider';
import { Collapse } from 'antd';
import lightImg from '../../../public/assets/icons/light1(traced).png'
import deliveryImg from '../../../public/assets/icons/delivery-truck 2 (traced).png'
import locationImg from '../../../public/assets/icons/location 1 (traced).png'
import { emirates, generateSlug } from 'data/data';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { formatAED } from 'lib/helperFunctions';
interface CartPageProps {
  products: IProduct[];
}
const CartPage = ({ products }: CartPageProps) => {
  const { Panel } = Collapse;
  const [selectedShipping, setSelectedShipping] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState('Enter Emirate');
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState<ICart[]>([]);
  const [mergedCart, setMergedCart] = useState<ICart[]>([]);
  const [selectedFee, setSelectedFee] = useState(0);
  const nonAccessoryItems = mergedCart.filter(item => item.category !== 'Accessories' && item.category !== "Accessory");
  const accessoryItems = cartItems.filter(item => item.category === 'Accessories' || item.category === "Accessory");
  const [shipping, setShipping] = useState<{ name: string; fee: number; deliveryDuration: string; freeShipping?: number; } | undefined>(undefined);
  const allItemsAreFreeSamples = mergedCart.every(item => item.isfreeSample === true);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getCart();
        const freeSamples = await getFreeSamplesCart();
        const subTotalPrice = items.reduce(
          (total, item) => total + (item.pricePerBox || 0) * (item.requiredBoxes ?? 0),
          0
        );
        setSubTotal(subTotalPrice);
        setCartItems(items);
        setMergedCart([...items, ...freeSamples]);
      } catch {
        toast.error("Error fetching cart items");
      }
    };

    fetchCartItems();
    const handleCartUpdate = () => fetchCartItems();
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);
 

   const handleRemoveItem = async (id: number, isFreeSample: boolean) => {
      try {
        if (isFreeSample) {
          await cartremoveFreeSample(id); 
        } else {
            await removeCartItem(id);
        }
        setMergedCart(prev => prev.filter(item => 
          !(item.id === id && item.isfreeSample === isFreeSample)
        ));
    
        window.dispatchEvent(new Event("cartUpdated"));
      } catch {
        toast.error(`Error removing item from cart.`);
      }
    };
    

    useEffect(() => {
      const subTotalPrice = cartItems.reduce(
        (total, item) => total + (item.pricePerBox || 0) * (item.requiredBoxes ?? 0),
        0
      );
      setSubTotal(subTotalPrice);
      
      // Recalculate shipping and total whenever cart items change
      const fee = calculateShippingFee(subTotalPrice, selectedShipping, selectedCity);
      setSelectedFee(fee);
      
      const totalBeforeTax = subTotalPrice + fee;
      setTotal(totalBeforeTax);
    }, [cartItems]);

  const updateQuantity = async (id: number, change: number) => {
    try {
      const item = cartItems.find((item) => item.id === id);
      if (!item) {
        toast.error("Item not found in cart.");
        return;
      }

      const newRequiredBoxes = (item.requiredBoxes || 0) + change;
      if (newRequiredBoxes < 1) {
        toast.error("Minimum quantity is 1 box.");
        return;
      }
      if (newRequiredBoxes > item.stock) {
        toast.error(`Cannot add more than ${item.stock} boxes.`);
        return;
      }

      const newTotalPrice = item.pricePerBox * newRequiredBoxes;

      const updatedItem = {
        ...item,
        requiredBoxes: newRequiredBoxes,
        totalPrice: newTotalPrice,
        squareMeter: Number(item.boxCoverage) * newRequiredBoxes,
        selectedFee: selectedFee,
        selectedCity: selectedCity,
        shippingMethod: shipping
      };

      const db = await openDB();
      const tx = db.transaction("cart", "readwrite");
      const store = tx.objectStore("cart");
      await new Promise<void>((resolve, reject) => {
        const request = store.put(updatedItem);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
      setCartItems((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === id ? { ...cartItem, requiredBoxes: newRequiredBoxes, totalPrice: newTotalPrice } : cartItem
        )
      );

      // Dispatch event for cart update
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      toast.error("Failed to update item quantity.");
      throw error;
    }
  };

  const increment = (id: number) => updateQuantity(id, 1);
  const decrement = (id: number) => updateQuantity(id, -1);

  useEffect(() => {
    handleShippingSelect("standard");
  }, []);

  const calculateShippingFee = (
    subtotal: number,
    shippingType: string | null,
    selectedCity: string
  ): number => {
    if (!selectedCity) return 0;
    
    switch (shippingType) {
      case 'express':
        return subtotal >= 1000 ? 0 : 150;
      case 'standard':
      case 'self-collect':
        return 0;
      default:
        return 0;
    }
  };
  
  // Update your state handlers in the CartPage component
 const handleStateSelect = (state: string) => {
  setSelectedCity(state);
  localStorage.setItem('selectedEmirate', JSON.stringify(state));

  // If not Dubai, force standard shipping
  if (state !== 'Dubai') {
    setSelectedShipping("standard");
  }

  const fee = calculateShippingFee(subTotal, state === "Dubai" ? selectedShipping : "standard", state);
  setSelectedFee(fee);

  const totalBeforeTax = subTotal + fee;
  setTotal(totalBeforeTax);
};
  
  const handleShippingSelect = (type: string) => {
  setSelectedShipping(type);
  localStorage.setItem('selectedShipping', type);

  if (type === "self-collect") {
    // Save previous city before overriding
    setSelectedCity("Dubai");
    localStorage.setItem('selectedEmirate', JSON.stringify("Dubai"));

    const fee = calculateShippingFee(subTotal, type, "Dubai");
    setSelectedFee(fee);
    setTotal(subTotal + fee);
  } else {
    // Restore previous city if it exists
    const cityToUse = selectedCity;

    setSelectedCity(cityToUse);
    localStorage.setItem('selectedEmirate', JSON.stringify(selectedCity));

    const fee = calculateShippingFee(subTotal, type, cityToUse);
    setSelectedFee(fee);
    setTotal(subTotal + fee);
  }
};

  useEffect(() => {
    localStorage.setItem('shipping', JSON.stringify(shipping));
    localStorage.setItem('shippingFee', JSON.stringify(selectedFee));
    localStorage.setItem('selectedEmirate', JSON.stringify(selectedCity));

  },[selectedCity, selectedShipping]);

  useEffect(() => {
    let shippingData;

    if (selectedShipping === "standard") {
      shippingData = { name: "Standard Shipping", fee: 0, deliveryDuration: "3-4 working days" };
    } else if (selectedShipping === "express") {
      shippingData = { name: "Express Shipping", fee: 150, deliveryDuration: "Next day delivery", freeShipping: 1000 };
    } else if (selectedShipping === "self-collect") {
      shippingData = { name: "Self-Collect", fee: 0, deliveryDuration: "Mon-Sat (9am-6pm)" };
    }
    localStorage.setItem('shipping', JSON.stringify(shippingData));
    setShipping(shippingData);
  }, [selectedShipping]);


  return (
    <Container className='font-inter mt-10  mb-4 sm:mb-10 relative max-sm:max-w-[100%]'>
      <h1 className='text-center xl:text-[48px]'>Your Shopping Cart</h1>
      {
        mergedCart.length === 0 ?

          <div className='text-center'>
            <p className='text-center text-[24px] pt-10'>Cart is empty</p>
            <Link href='/' className='text-center text-[18px] bg-primary p-2 flex w-fit mx-auto items-center text-white gap-2 mt-4'>
              <FaArrowLeftLong /> Go Back to Shop
            </Link>
          </div>
          :
          <>
            <div className='mt-10 flex flex-wrap md:flex-nowrap gap-5 '>
              <div className=' w-full md:w-[55%] xl:w-[70%] 2xl:w-[65%] px-2'>
                {/* product */}
                <div className='max-h-[590px] overflow-x-auto pr-4'>
                {nonAccessoryItems.length > 0 && (
                  <>
                    <div className='hidden xl:grid grid-cols-12 text-20 font-light pb-3'>
                      <div className='col-span-6'>Product</div>
                      <div className='col-span-2 text-center'>Box Qty</div>
                      <div className='col-span-2 text-center'>Price</div>
                      <div className='col-span-2 text-end'>Remove</div>
                    </div>
                    <p className='block xl:hidden text-12 font-semibold font-inter'>Product</p>
                    <div className='border border-b border-[#DEDEDE]' />
                    {nonAccessoryItems.map((item, cartindex) => (
                      <div key={cartindex}>
                        <div className='grid grid-cols-12 text-20 font-light py-2 2xl:py-4 items-center'>
                          <div className='col-span-10 xl:col-span-6'>
                            <div className='flex gap-4'>
                              <div className='w-full max-w-[74px] md:max-w-[150px] h-[69px] md:h-[140px] 2xl:max-w-[170x] 2xl:h-[140px]'>
                                <Image
                                  fill
                                  className='!relative block'
                                  src={item.image ?? '/default-image.png'}
                                  alt="cart"
                                />
                              </div>
                              <div>
                                <Link href={`/${generateSlug(item.category ??"")}/${generateSlug(item.subcategories??"")}/${item.custom_url}`} className='text-12 sm:text-16 2xl:text-24 font-medium'>{item.name}</Link>
                                {
                                  item.isfreeSample ? 
                                  <p className='text-12 sm:text-14 2xl:text-17'>
                                  Price: Free
                                  </p> :
                                  <p className='text-12 sm:text-14 2xl:text-17'>
                                  Price: <span className="font-currency font-normal text-16 2xl:text-22"></span>{" "}
                                  <span>
                                    {item.unit === "sqft"
                                      ? ((item.price?? 0) / 10.764).toFixed(2)
                                      : (item.price ?? 0).toFixed(2)}
                                  </span>
                                  /{item.unit === "sqft" ? "ft" : "m"}<sup>2</sup>
                                  </p>
                                }
                               
                                {
                                  !item.isfreeSample && 
                                  <>
                                  <p className='text-12 sm:text-14 2xl:text-17'>
                                  {item.isAccessory? "Price Per Piece: ": "Price Per box: "} 
                                  <span className='font-bold'><span className="font-currency font-normal text-16 2xl:text-20"></span> {item.pricePerBox && item.pricePerBox.toFixed(2)}</span>
                                  </p>
                                <p className='text-12 sm:text-14 2xl:text-17'>
                                  No. Of Boxes:
                                  <span className='font-bold'> {item.requiredBoxes ?? 0} </span> (
                                  {item.unit === "sqft"
                                    ? ((Number(item.boxCoverage) * 10.764 * (Number(item.requiredBoxes ?? 0))).toFixed(2))
                                    : Number((Number(item.boxCoverage) * (Number(item.requiredBoxes ?? 0))).toFixed(2))
                                  }
                                  {item.unit === "sqft" ? " ft²" : " SQM"}
                                  )
                                </p>
                                  </>
                                }
                                
                                <div className='flex xl:hidden gap-5 mt-2 items-center'>
                                  <div className={`flex items-center justify-center border border-[#959595] px-1 py-1 w-fit text-16 text-purple ${item.isfreeSample ? "hidden" : "block"}`}>
                                    <button className="px-1 hover:text-black" onClick={() => decrement(Number(item.id))}>
                                      <LuMinus />
                                    </button>
                                    <span className="text-16 text-purple px-1">{item.requiredBoxes}</span>
                                    <button className="px-1 hover:text-black" onClick={() => increment(Number(item.id))}>
                                      <LuPlus />
                                    </button>
                                  </div>
                                  <p className='text-14 font-semibold whitespace-nowrap'>Total: <span className="font-currency font-normal text-18"></span> <span>{(item.totalPrice ?? 0).toFixed(2)}</span></p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='col-span-2 mx-auto hidden xl:block'>
                            <div className={`flex items-center justify-center border border-[#959595] px-1 2xl:px-2 py-2 2xl:py-3 w-fit text-16 text-purple ${item.isfreeSample ? "hidden" : "block"}`}>
                              <button className="px-3 hover:text-black" onClick={() => decrement(Number(item.id))}>
                                <LuMinus />
                              </button>
                              <span className="text-16 text-purple px-2 2xl:px-3">{item.requiredBoxes}</span>
                              <button className=" px-2 2xl:px-3 hover:text-black" onClick={() => increment(Number(item.id))}>
                                <LuPlus />
                              </button>
                            </div>
                          </div>
                          <div className='col-span-2 text-center hidden xl:block'>
                            {item.isfreeSample ? <p className='text-16 2xl:text-20 font-semibold'><span>Free</span></p> :
                              <p className='text-16 2xl:text-20 font-semibold'><span className="font-currency font-normal text-20 2xl:text-25 "></span> <span>{formatAED(item.totalPrice ?? 0)}</span></p>}
                          </div>
                          <div className='col-span-2 text-end lg:pr-5'>
                            <button className='text-primary' onClick={() => handleRemoveItem(Number(item.id), item.isfreeSample || false)}>
                              <svg className='w-4 h-4 2xl:w-6 2xl:h-5' viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.4688 4H17.8438V1.8125C17.8438 0.847266 17.031 0.0625 16.0313 0.0625H6.96875C5.96904 0.0625 5.15625 0.847266 5.15625 1.8125V4H1.53125C1.02998 4 0.625 4.39102 0.625 4.875V5.75C0.625 5.87031 0.726953 5.96875 0.851563 5.96875H2.56211L3.26162 20.2695C3.30693 21.202 4.10557 21.9375 5.07129 21.9375H17.9287C18.8973 21.9375 19.6931 21.2047 19.7384 20.2695L20.4379 5.96875H22.1484C22.273 5.96875 22.375 5.87031 22.375 5.75V4.875C22.375 4.39102 21.97 4 21.4688 4ZM15.8047 4H7.19531V2.03125H15.8047V4Z" fill="#BF6933" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className='border border-b border-[#DEDEDE]' />
                      </div>
                    ))}
                  </>
                )} 
                </div>
                 {/* Accessory */}
                 <div className=' max-h-[590px] overflow-x-auto pr-4 mt-7'>
                 {accessoryItems.length > 0 && (
                   <>
                  <div className=' hidden xl:grid grid-cols-12 text-20 font-light pb-3'>
                    <div className='col-span-6'>Accessories</div>
                    <div className='col-span-2 text-center'>Qty m</div>
                    <div className='col-span-2 text-center'>Price</div>
                    <div className='col-span-2 text-end'>Remove</div>
                  </div>
                  <p className='block xl:hidden text-12 font-semibold font-inter'>Accessories</p>
                  <div className='border border-b border-[#DEDEDE]' />
                  {accessoryItems.map((item, cartindex) => (
                    <div key={cartindex}>
                      <div className='grid grid-cols-12 text-20 font-light py-2 2xl:py-4 items-center'>
                        <div className=' col-span-10 xl:col-span-6'>
                          <div className='flex gap-4'>
                            <Image width={170} height={160} className=' w-[74px] md:w-[150px] h-[69px] md:h-[140px]   2xl:w-[170x] 2xl:h-[140px]'
                             src={item?.matchedProductImages?.imageUrl ?? item.image ?? '/default-image.png'} alt="cart"
                            />
                            <div>
                              <Link href={`/accessories/${item.custom_url}`} className='text-14 sm:text-16 2xl:text-24 font-medium'>{item.name}</Link>
                              <p className='text-12 sm:text-14 2xl:text-17 '>Price: <span className="font-currency font-normal text-16 2xl:text-18"></span>{' '}
                               <span>{item.unit === "ft"? ((item.price?? 0) / 3.28084).toFixed(2): (item.price ?? 0).toFixed(2)}</span>/{item.unit === "ft" ? "ft" : "m"}
                              </p>
                              <p className='text-12 sm:text-14 2xl:text-17'>
                              Total Required:
                                  <span className='font-bold'> {item.requiredBoxes ?? 0}{item.unit === "ft" ? "ft" : "m"}</span> 
                              </p> 
                              <p className='text-12 sm:text-14 2xl:text-17'>
                              Color:<span className='font-bold'> {item?.selectedColor?.colorName || "White"}</span>
                              </p> 
                              <div className='flex xl:hidden gap-5 mt-2 items-center'>
                                <div className="flex items-center justify-center border border-[#959595] px-1 py-1 w-fit text-16 text-purple ">
                                  <button className="px-1 hover:text-black" onClick={() => decrement(Number(item.id))}>
                                    <LuMinus />
                                  </button>
                                  <span className="text-16 text-purple px-1">{item.requiredBoxes}</span>
                                  <button className="px-1 hover:text-black" onClick={() => increment(Number(item.id))}>
                                    <LuPlus />
                                  </button>
                                </div>
                                <p className='text-14 font-semibold whitespace-nowrap'>Total: <span className="font-currency font-normal text-18"></span> <span>{(item.totalPrice ?? 0).toFixed(2)}</span></p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-span-2 mx-auto hidden xl:block'>
                          <div className="flex items-center justify-center border border-[#959595] px-1 2xl:px-2 py-2 2xl:py-3 w-fit text-16 text-purple">
                            <button className="px-3 hover:text-black" onClick={() => decrement(Number(item.id))}>
                              <LuMinus />
                            </button>
                            <span className="text-16 text-purple px-2 2xl:px-3">{item.requiredBoxes}</span>
                            <button className=" px-2 2xl:px-3 hover:text-black" onClick={() => increment(Number(item.id))}>
                              <LuPlus />
                            </button>
                          </div>
                        </div>
                        <div className='col-span-2 text-center hidden xl:block'>
                          <p className='text-16 2xl:text-20 font-semibold'><span className="font-currency font-normal"></span> <span>{formatAED(item.totalPrice ?? 0)}</span></p>
                        </div>
                        <div className='col-span-2 text-end lg:pr-5'>
                          <button className='text-primary' onClick={() => handleRemoveItem(Number(item.id), item.isfreeSample || false)}>
                            <svg className=' w-4 h-4  2xl:w-6 2xl:h-5' viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M21.4688 4H17.8438V1.8125C17.8438 0.847266 17.031 0.0625 16.0313 0.0625H6.96875C5.96904 0.0625 5.15625 0.847266 5.15625 1.8125V4H1.53125C1.02998 4 0.625 4.39102 0.625 4.875V5.75C0.625 5.87031 0.726953 5.96875 0.851563 5.96875H2.56211L3.26162 20.2695C3.30693 21.202 4.10557 21.9375 5.07129 21.9375H17.9287C18.8973 21.9375 19.6931 21.2047 19.7384 20.2695L20.4379 5.96875H22.1484C22.273 5.96875 22.375 5.87031 22.375 5.75V4.875C22.375 4.39102 21.97 4 21.4688 4ZM15.8047 4H7.19531V2.03125H15.8047V4Z" fill="#BF6933" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className='border border-b border-[#DEDEDE]' />
                    </div>
                  ))}
                   </>
                )} 
                 </div>
                  {/* accessory end */}
                <Link href="/collections" className='bg-black text-white px-4 py-2 gap-2  justify-center items-center w-fit mt-5 hidden lg:flex'><FaArrowLeftLong /> Continue shopping</Link>
              </div>
              <div className='w-full md:w-[45%] xl:w-[30%] 2xl:w-[35%] bg-background p-3 sm:p-5 space-y-5 h-fit'>
                <div className='flex gap-2 md:gap-5 items-center max-sm:justify-between'>
                  <h2 className=' text-18 md:text-20 2xl:text-28'>Order Summary</h2>
                  <p className='text-14 text-[#FF0004]'>(*Total {mergedCart.length} {mergedCart.length === 1 ? "Item" : " Items"})</p>
                </div>
                <div className='border border-b border-[#DEDEDE]' />
                <div className='flex items-center justify-between text-16 lg:text-20'>
                  <p>Subtotal:</p>
                  <p><span className="font-currency font-normal text-20 2xl:text-25"></span> {formatAED(subTotal)}</p>
                </div>
                {selectedShipping !== "self-collect" && (
                    <CartSelect select={emirates} selectedFee={selectedFee} onSelect={handleStateSelect} />
                  )}

                <Collapse accordion defaultActiveKey={['1']} bordered={false} expandIcon={({ isActive }) => (isActive ? <MdKeyboardArrowDown size={20} /> : <MdKeyboardArrowDown size={20} />)} expandIconPosition="end" className="w-full bg-transparent custom-collapse">
                  <Panel
                    header={<span className="text-slate-500">Shipping Options</span>}
                    key="1"
                    className="!border-b-0"
                  >
                {(selectedCity === "Dubai" || selectedCity == "Enter Emirate") && !allItemsAreFreeSamples && (
                    <div
                      className={`bg-white px-2 xs:px-4 py-2 mt-2 flex gap-2 xs:gap-4 items-center cursor-pointer border-2 ${
                        selectedShipping === "express" ? "border-primary" : "border-transparent"
                      }`}
                      onClick={() => handleShippingSelect("express")}
                    >
                      <Image src={lightImg} alt="icon" className="size-12 xs:size-16" />
                      <div className="text-11 xs:text-16">
                        <strong className="text-15 xs:text-20">Express Service (Dubai Only)</strong>
                        <p className="text-11 xs:text-16">Delivery <strong>Next working day (cut-off time 1pm)</strong></p>
                        <p>Delivery Cost: <strong><span className="font-currency font-normal text-18"></span>150</strong> for orders under <strong><span className="font-currency font-normal text-18"></span>999</strong></p>
                        <p>Free for orders above <strong><span className="font-currency font-normal text-18"></span>1000</strong></p>
                      </div>
                    </div>
                  )}
                    <div
                      className={`bg-white px-2 xs:px-4 py-2 mt-2 flex gap-2 xs:gap-4 items-center cursor-pointer border-2 ${selectedShipping === "standard" ? "border-primary" : "border-transparent"
                        }`}
                      onClick={() => handleShippingSelect("standard")}
                    >
                      <Image src={deliveryImg} alt="icon" className="size-12 xs:size-16" />
                      <div>
                        <strong className="text-15 xs:text-20">Standard Service (All Emirates)</strong>
                        <p className="text-11 xs:text-16">Within <strong>2-3 working days</strong></p>
                        <p className="text-11 xs:text-16">
                          <span>Shipping Fee:</span> <strong>Free</strong>
                        </p>
                      </div>
                    </div>
                    <div className={`bg-white px-2 xs:px-4 py-2 mt-2 flex gap-2 xs:gap-4 items-center cursor-pointer border-2 ${selectedShipping === "self-collect" ? "border-primary" : "border-transparent"
                      }`} onClick={() => handleShippingSelect("self-collect")}
                    >
                      <Image src={locationImg} alt="icon" className="size-12 xs:size-16" />
                      <div>
                        <strong className="text-15 xs:text-20">Self-Collect:</strong>
                        <p className="text-11 xs:text-16">Collection Mon-Sat <strong>(9am-6pm)</strong></p>
                        <p className="text-11 xs:text-16">
                          <span>Location:</span> <strong><Link className="hover:text-primary" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/place/J1+Warehouses/@24.9871787,55.0799029,13z/data=!4m6!3m5!1s0x3e5f43c5045ac9ab:0xe8fe6b6d3731e2f9!8m2!3d24.9871066!4d55.1211025!16s%2Fg%2F11fsb5fcvx?entry=ttu&amp;g_ep=EgoyMDI1MDIxMi4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D">Agsons, J1 Warehouses, Jebel Ali  Industrial – Dubai</Link></strong>
                        </p>
                      </div>
                    </div>
                    
                  </Panel>
                </Collapse> 
      {/* Shipping Fee show when select city */}
                {/* <div className='flex items-center justify-between text-16 lg:text-20'>
                  <p>Shipping Fee:</p>
                  <p>{selectedCity ? selectedFee > 0 ? <p><span className="font-currency font-normal text-18"></span> {selectedFee}</p> : 'Free' : 'Pleae select city'}</p>
                </div> */}
                <div className='border border-b border-[#DEDEDE]' />
                <div className='flex items-center justify-between text-16 lg:text-20'>
                  <p>Total Incl. VAT</p>
                  <p><span className="font-currency font-normal text-20 lg:text-25"></span> {total > 0 ? formatAED(total) : formatAED(subTotal)}</p>

                </div>
                <Link href="/checkout" className='bg-primary text-white px-4 py-3 w-full text-14 md:text-20 block text-center '>Proceed to Checkout</Link>
                
                <p className='text-18 xl:text-22 font-semibold text-center'>Buy Now, Pay Later</p>
                {total > 0 &&
                <PaymentMethod installments={total > 0 ? parseFloat(total.toFixed(2)) /4: parseFloat(subTotal.toFixed(2))/4} />
                }
                <div className='flex justify-between gap-2' >
                  {
                    paymentcard.map((array, index) => (
                      <Image className=' w-16 h-11 md:w-14 md:h-12 2xl:w-[90px] 2xl:h-[60px]' key={index} width={90} height={60} src={array.image} alt='payment-card' />
                    ))
                  }
                </div>
              </div>
            </div>
            <RelatedSlider
              products={products.slice(0, 5)}
            />
          </>
      }
    </Container>
  )
}

export default CartPage
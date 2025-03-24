import CartIcon from 'components/svg/cart-icon';
import FreeSample from 'components/svg/free-sample';
import ProfileIcon from 'components/svg/user-icon';
import Link from 'next/link'
import React from 'react'
import { LuHeart } from 'react-icons/lu'
interface UserIconprops{
  className?: string;
  cartTotal?: number;
  wishlistTotal?: number;
  freeSampleTotal?:number;
}
const UserIcon = ({className,cartTotal,wishlistTotal,freeSampleTotal}:UserIconprops) => {
  return (
    <div className={`flex items-center 2xl:space-x-1 ${className}`}>

    <Link href="/profile" aria-label='Go to profile page' className=' lg:hover:bg-primary flex justify-center items-center h-7 fill-white focus:bg-white focus:fill-black lg:fill-black lg:hover:fill-white  p-1'>
      <ProfileIcon/>
    </Link>
    
    <div className=' border-l-2 border-white lg:border-[#464646] h-4 md:h-6'/>
    <Link href="/wishlist" aria-label='Go to wishlist page' className='relative lg:bg-white flex justify-center items-center h-7  lg:hover:bg-primary text-white active:text-black focus:text-black max-lg:focus:bg-white lg:text-black hover:text-white p-1'>
    {(wishlistTotal ?? 0) > 0 && (
      <span className='absolute text-xs font-semibold bg-primary text-white -top-1 -right-1 w-4 h-4 flex justify-center items-center'>
        {wishlistTotal}
      </span>
    )}
    <LuHeart className='size-4 xl:size-5' />
    </Link>

    <div className=' border-l-2 border-white lg:border-[#464646] h-4 md:h-6 lg:ml-2'/>
    <Link href="/freesample" aria-label='Go to free sample page' className='relative lg:hover:bg-primary fill-white flex justify-center items-center h-7 focus:bg-white focus:fill-black lg:fill-black lg:hover:fill-white  p-1'>
    {(freeSampleTotal ?? 0) > 0 && (
      <span className='absolute text-xs font-semibold bg-primary text-white -top-1 -right-2 w-4 h-4 flex justify-center items-center'>
        {freeSampleTotal}
      </span>
    )}
    <FreeSample/>
    </Link>
    <div className='  border-l-2 border-white lg:border-[#464646] h-4 md:h-6 lg:ml-3'/>
    
    <Link href="/cart" aria-label='Go to cart page' className='relative lg:hover:bg-primary fill-white flex justify-center items-center h-7  focus:bg-white focus:fill-black lg:fill-black lg:hover:fill-white  p-1'>
    {(cartTotal ?? 0) > 0 && (
      <span className='absolute text-xs font-semibold bg-primary text-white -top-1 -right-1 w-4 h-4 flex justify-center items-center'>
        {cartTotal}
      </span>
    )}
    <CartIcon/>

    </Link>

    </div>
  )
}

export default UserIcon
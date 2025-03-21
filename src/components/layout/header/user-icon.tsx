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
}
const UserIcon = ({className,cartTotal,wishlistTotal}:UserIconprops) => {
  return (
    <div className={`flex items-center 2xl:space-x-1 ${className}`}>

    <Link href="/login" aria-label='Go to profile page' className='flex h-7 justify-center p-1 fill-white focus:bg-white focus:fill-black items-center lg:fill-black lg:hover:bg-primary lg:hover:fill-white'>
      <ProfileIcon/>
    </Link>


    <div className='border-l-2 border-white h-4 lg:border-[#464646] md:h-6'/>
    <Link href="/wishlist" aria-label='Go to wishlist page' className='flex h-7 justify-center p-1 text-white active:text-black focus:text-black hover:text-white items-center lg:bg-white lg:hover:bg-primary lg:text-black max-lg:focus:bg-white relative'>
    {(wishlistTotal ?? 0) > 0 && (
      <span className='flex bg-primary h-4 justify-center text-white text-xs w-4 -right-1 -top-1 absolute font-semibold items-center'>
        {wishlistTotal}
      </span>
    )}
    <LuHeart className='size-4 xl:size-5' />
    </Link>

    <div className='border-l-2 border-white h-4 lg:border-[#464646] md:h-6'/>
    <Link href="/" aria-label='Go to free sample page' className='flex h-7 justify-center p-1 fill-white focus:bg-white focus:fill-black items-center lg:fill-black lg:hover:bg-primary lg:hover:fill-white'>
    <FreeSample/>
    </Link>
    <div className='border-l-2 border-white h-4 lg:border-[#464646] md:h-6'/>
    
    <Link href="/cart" aria-label='Go to cart page' className='flex h-7 justify-center p-1 fill-white focus:bg-white focus:fill-black items-center lg:fill-black lg:hover:bg-primary lg:hover:fill-white relative'>
    {(cartTotal ?? 0) > 0 && (
      <span className='flex bg-primary h-4 justify-center text-white text-xs w-4 -right-1 -top-1 absolute font-semibold items-center'>
        {cartTotal}
      </span>
    )}
    <CartIcon/>

    </Link>

    </div>
  )
}

export default UserIcon
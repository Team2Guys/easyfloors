import Link from 'next/link'
import React from 'react'
import { BsCart2 } from 'react-icons/bs'
import { LuHeart, LuUser } from 'react-icons/lu'
import { TbRulerMeasure2 } from 'react-icons/tb'
interface UserIconprops{
  className?: string;
}
const UserIcon = ({className}:UserIconprops) => {
  return (
    <div className={`flex items-center 2xl:space-x-1 ${className}`}>
    <Link href="/profile" className=' lg:bg-white hover:bg-primary text-black hover:text-white p-1 flex items-center justify-center sm:gap-1'>
    <LuUser className='text-14 xl:text-16 2xl:text-20' />
    <span className=' text-white lg:text-[#464646]'>|</span>
    </Link>
    <Link href="/wishlist" className='lg:bg-white hover:bg-primary text-black hover:text-white p-1 flex items-center justify-center sm:gap-1' >
    <LuHeart className='text-14 xl:text-16 2xl:text-20' />
    <span className=' text-white lg:text-[#464646]'>|</span>
    </Link>
    <Link href="/" className='lg:bg-white hover:bg-primary text-black hover:text-white p-1 flex items-center justify-center sm:gap-1'>
    <TbRulerMeasure2 className='text-14 xl:text-16 2xl:text-20' />
    <span className=' text-white lg:text-[#464646]'>|</span>
    </Link>
    <Link href="/cart" className='lg:bg-white hover:bg-primary text-black hover:text-white p-1 flex items-center justify-center sm:gap-1'>
    <BsCart2 className='text-14 xl:text-16 2xl:text-20'/>
    </Link>
    </div>
  )
}

export default UserIcon
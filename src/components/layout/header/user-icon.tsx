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
    <Link href="/profile" className=' lg:bg-white lg:hover:bg-primary text-white active:text-black focus:text-black max-lg:focus:bg-white lg:text-black hover:text-white p-1'>
    <LuUser className='text-15 xl:text-16 2xl:text-20' />
    </Link>
    <span className=' text-white lg:text-[#464646]'>|</span>
    <Link href="/wishlist" className='lg:bg-white  lg:hover:bg-primary text-white active:text-black focus:text-black max-lg:focus:bg-white lg:text-black hover:text-white p-1'>
    <LuHeart className='text-15 xl:text-16 2xl:text-20' />
    </Link>
    <span className=' text-white lg:text-[#464646]'>|</span>
    <Link href="/" className='lg:bg-white  lg:hover:bg-primary text-white active:text-black focus:text-black max-lg:focus:bg-white lg:text-black hover:text-white p-1'>
    <TbRulerMeasure2 className='text-15 xl:text-16 2xl:text-20' />
    </Link>
    <span className=' text-white lg:text-[#464646]'>|</span>
    <Link href="/cart" className='lg:bg-white lg:hover:bg-primary text-white active:text-black focus:text-black max-lg:focus:bg-white lg:text-black hover:text-white p-1'>
    <BsCart2 className='text-15 xl:text-16 2xl:text-20'/>
    </Link>
    </div>
  )
}

export default UserIcon
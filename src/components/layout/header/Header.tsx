import React from 'react'
import TopNav from './top-nav'
import Navbar from './navbar'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <div className='mb-[32px] sm:mb-[38px] lg:mb-[70px]'>
    <TopNav/>
    <Navbar/>
    <Link className='fixed bottom-20 right-10 lg:right-20 z-40 hidden sm:block' href="/">
    <Image width={100} height={100} className=' w-16 h-16 2xl:w-[70px] 2xl:h-[70px]' src="/assets/images/icon/whatsapp-icon.png" alt='whatsapp-icon'/>
    </Link>
    </div>
  )
}

export default Header
import React from 'react'
import TopNav from './top-nav'
import Navbar from './navbar'

const Header = () => {
  return (
    <div className='mb-[32px] sm:mb-[38px] lg:mb-[70px]'>
    <TopNav/>
    <Navbar/>
    </div>
  )
}

export default Header
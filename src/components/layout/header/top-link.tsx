import Link from 'next/link'
import React from 'react'

interface TopLinkprops{
  className?: string;
} 
const TopLink = ({className}:TopLinkprops) => {
  return (
    <div className={`space-x-2 2xl:space-x-5 text-10 xs:text-12 xl:text-14 2xl:text-16 text-white flex font-medium items-center font-inter xs:font-light ${className}`}>
        <Link href='/shipping-policy' className="text-white">Shipping</Link>
        <Link href='/return-and-refund-policy' className="text-white">Returns</Link>
        <Link href='/faqs' className="text-white">FAQs</Link>
    </div>
  )
}

export default TopLink
import Link from 'next/link'
import React from 'react'

interface TopLinkprops{
  className?: string;
} 
const TopLink = ({className}:TopLinkprops) => {
  return (
    <div className={`space-x-2 2xl:space-x-5 text-10 xl:text-14 2xl:text-16 text-white flex  items-center font-inter font-light ${className}`}>
        <Link href='/shipping-policy'>Shipping</Link>
        <Link href='/return-and-refund-policy'>Returns</Link>
        <Link href='/faqs'>FAQs</Link>
    </div>
  )
}

export default TopLink
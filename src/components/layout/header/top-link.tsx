import Link from 'next/link'
import React from 'react'

interface TopLinkprops{
  className?: string;
} 
const TopLink = ({className}:TopLinkprops) => {
  return (
    <div className={`space-x-2 2xl:space-x-5 text-10 xl:text-14 2xl:text-16 text-white flex  items-center ${className}`}>
        <Link href='/shipping'>Shipping</Link>
        <Link href='/returns'>Returns</Link>
        <Link href='/faqs'>FAQs</Link>
    </div>
  )
}

export default TopLink
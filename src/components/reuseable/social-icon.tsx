import { socialLinks } from 'data/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Socialprops{
  className?: string;
}

const SocialIcon = ({className}:Socialprops) => {
  return (
    <div className={`space-x-2 2xl:space-x-5 flex items-center ${className}`}>
      {socialLinks.map((link, index) => (
        <Link key={index} className='bg-white w-[24px] h-[24px] flex items-center justify-center' href={link.href}>
          <Image width={link.width} height={link.height} src={link.src} alt={link.alt} />
        </Link>
      ))}
    </div>
  )
}

export default SocialIcon
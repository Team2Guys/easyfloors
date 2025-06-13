import Link from 'next/link'
import React from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { IoMailSharp } from 'react-icons/io5'
import { PiPhoneCallFill } from 'react-icons/pi'

const ContactInfo = () => {
  return (
    <div className='p-2 sm:p-6'>
      <h1 className='text-24 sm:text-28 font-inter font-semibold leading-8 text-white'>Contact Information</h1>
      <div className='mt-5 sm:mt-8 lg:mt-10 space-y-3 lg:space-y-6'>
        <div className='flex gap-6 items-center text-white'>
          <PiPhoneCallFill size={20} />
          <Link href="tel:+971 50 597 4385">+971 50 597 4385</Link>
        </div>
        <div className='flex gap-6 items-center text-white'>
          <IoMailSharp size={20} />
          <Link href="mailto:Info@easyfloors.ae">Info@easyfloors.ae</Link>
        </div>
        <div className='flex gap-4 md:gap-6 text-white'>
          <FaLocationDot size={22} />
          <Link 
            target='_blank' 
            className='pl-3 sm:pl-0' 
            href="https://www.google.com/maps/place/J1+Warehouses/@24.9871787,55.0799029,11090m/data=!3m1!1e3!4m6!3m5!1s0x3e5f43c5045ac9ab:0xe8fe6b6d3731e2f9!8m2!3d24.9871066!4d55.1211025!16s%2Fg%2F11fsb5fcvx?entry=ttu"
          >
            Agsons, J1 Warehouses, Jebel Ali <br className='hidden sm:block'/> Industrial - Dubai
          </Link>
        </div>
      </div>
      <div className='mt-5 md:mt-20'>
        <iframe 
          className='w-full h-[200px] lg:h-[280px] rounded-lg shadow-lg border border-gray-200'
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178509655045!2d55.11851371500938!3d25.19719698389647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43c5045ac9ab%3A0xe8fe6b6d3731e2f9!2sJ1%20Warehouses!5e0!3m2!1sen!2sae!4v1712345678901!5m2!1sen!2sae"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          title="Easy Floors Location in Jebel Ali"
        >
        </iframe>
      </div>
    </div>
  )
}

export default ContactInfo
import Link from 'next/link'
import React from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { IoMailSharp } from 'react-icons/io5'
import { PiPhoneCallFill } from 'react-icons/pi'

const ContactInfo = () => {
  return (
    <div className=' p-2 sm:p-6'>
        <p className=' text-24 sm:text-28 font-inter font-semibold leading-8 text-white'>Contact Information</p>
        <div className=' mt-5 sm:mt-8 lg:mt-20 space-y-3 lg:space-y-10'>
            <div className='flex gap-6 items-center text-white'>
            <PiPhoneCallFill size={20} />
            <Link href="tel:+971 50 597 4385">+971 50 597 4385</Link>
            </div>
            <div className='flex gap-6 items-center text-white'>
            <IoMailSharp size={20} />
            <Link  href="mailto:Info@easyfloors.ae">Info@easyfloors.ae</Link>
            </div>
            <div className='flex gap-4 md:gap-6  text-white'>
            <FaLocationDot size={22} />
            <Link target='_blank' className='pl-3 sm:pl-0' href="https://maps.app.goo.gl/6VU7dkTZz8PfJbgGA">Agsons, J1 Warehouses, Jebel Ali <br className='hidden sm:block'/> Industrial - Dubai</Link>
            </div>
        </div>
        <div className='mt-5 sm:mt-10'>
        <iframe className='w-full h-[200px] lg:h-[280px]' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2431.2047050460533!2d-2.0494999230756346!3d52.457320040867906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487096ee8cc4ddf3%3A0xbabb78e92d612b45!2sEasy%20Floors!5e0!3m2!1sen!2s!4v1739872013435!5m2!1sen!2s" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
  )
}

export default ContactInfo
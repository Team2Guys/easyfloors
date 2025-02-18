import Container from 'components/common/container/Container'
import ContactInfo from 'components/contact/contact-info'
import Breadcrumb from 'components/Reusable/breadcrumb'
import React from 'react'

const Contact = () => {
  return (
    <>
    <Breadcrumb title='Contact Us' image='/assets/images/Contact/contact-breadcrumb.png'/>
    <Container className='mt-10'>
      <div className=' sm:max-w-[80%] xl:max-w-[57%] 2xl:max-w-[40%] mx-auto text-center font-inter space-y-4'>
        <h2 className='text-[36px] font-semibold leading-10'>Get In Touch With Us</h2>
        <p className='text-[#9F9F9F]'>For more information about our product & services. Please feel free to drop us an email. Our Staff Always be there to help you out. Do not hesitate!</p>
      </div>
      <div className='mt-10 border bg-white shadow p-2'>
          <div className='flex gap-4'>
            <div className='w-[43%] bg-primary'>
              <ContactInfo/>
            </div>
            <div className='w-[57%] bg-red-500 h-20'>
            </div>
          </div>
      </div>
    </Container>
    </>
  )
}

export default Contact
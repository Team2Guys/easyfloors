import Appointment from 'components/appointment/Appointment'
import React from 'react'

const MeasureAppointment = () => {
  return (
    <div className='max-w-[95%] md:max-w-[75%] mx-auto space-y-4 mb-5 md:mb-10'>
     <h1 className='pt-10 text-18 md:text-28 font-semibold text-center font-inter'>Measurement Appointment</h1> 
     <p className=' text-12 md:text-20 text-center font-inter'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>  
     <Appointment/>
    </div>
  )
}

export default MeasureAppointment
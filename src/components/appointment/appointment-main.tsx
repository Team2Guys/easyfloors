import React from 'react'
import Appointment from './Appointment'
import { Appointmentprops } from 'types/type'

const AppointmentMain = ({title,description, AppointsType}:Appointmentprops) => {
  return (
    <div className='max-w-[95%] md:max-w-[75%] mx-auto space-y-4 mb-5 md:mb-10'>
    <h1 className='pt-10 text-18 md:text-28 font-semibold text-center font-inter'>{title}</h1> 
    <p className=' text-14 md:text-20 text-center font-inter' dangerouslySetInnerHTML={{ __html: description || '' }} /> 
    <Appointment AppointsType={AppointsType} />
    </div>
  )
}

export default AppointmentMain
import AppointmentMain from 'components/appointment/appointment-main'
import React from 'react'
import { createMetadata } from 'utils/metadataHelper';
import { pageMetadataData } from 'data/meta-data';
export const metadata = createMetadata(pageMetadataData.measurement_appointment);
const MeasureAppointment = () => {
  return (
  <AppointmentMain AppointsType='APPOINTMENTS' title='Measurement Appointment' description="If you still feel it's a job for the professionals, you can book an appointment using our online booking system. Next, we contact you to confirm the location, date, and time that works best for you. After that, our team goes to the location to take measurements and give a detailed quote. If you decide to proceed with the service, the appointment is free. If you would like professional assistance, we can arrange a measuring service for you with a refundable charge of <span class='font-currency font-normal text-18 md:text-22'></span> 150 (refunded if you place an order with us). Don’t worry – we’ll explain everything clearly during the confirmation call, so it’s simple and fair for everyone"/>
  )
}

export default MeasureAppointment
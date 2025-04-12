import AppointmentMain from 'components/appointment/appointment-main'
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
  title: 'Book a Flooring Measurement Appointment | Easy Floors UAE',
  description:
    'Schedule a professional flooring measurement with Easy Floors. AED 150 fee fully refunded upon order. Accurate sizing, no guesswork.',
  openGraph: {
    title: 'Book a Flooring Measurement Appointment | Easy Floors UAE',
    description: 'Schedule a professional flooring measurement with Easy Floors. AED 150 fee fully refunded upon order. Accurate sizing, no guesswork.',
    url: 'fullUrl',
    images: [{url: "/assets/images/logo.png", alt: 'Easyfloors',
      },
    ],
  },
  alternates: {
    canonical: '/measurement-appointment',
  },
};
const MeasureAppointment = () => {
  return (
  <AppointmentMain AppointsType='APPOINTMENTS' title='Measurement Appointment' description='You can book an appointment using our online booking system. Next, we contact you to confirm the location, date, and time that works best for you. After that, our team goes to the location to take measurements and give a detailed quote. If you decide to proceed with the service, the appointment is free. If you decide not to, there might be a small fee to cover the consultation. Don’t worry – we’ll explain everything clearly during the confirmation call, so it’s simple and fair for everyone.'/>
  )
}

export default MeasureAppointment
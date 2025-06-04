import Breadcrumb from 'components/Reusable/breadcrumb'
import Features from 'components/Reusable/features'
import RoomMeasurement from 'components/RoomMeasurement/RoomMeasurement'
import { featureItems } from 'data/data'
import React from 'react'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Flooring Calculator Guide | How to Measure at Easy Floors UAE',
  description:
    'Measure your room the right way! Use our step-by-step guide to calculate flooring quantity accurately and avoid waste. Expert help is available across the UAE.',
  openGraph: {
    title: 'Flooring Calculator Guide | How to Measure at Easy Floors UAE',
    description: 'Measure your room the right way! Use our step-by-step guide to calculate flooring quantity accurately and avoid waste. Expert help is available across the UAE.',
    url: '/how-to-measure-your-room',
    images: [{url: "/assets/images/logo.webp", alt: 'Easyfloors',
      },
    ],
  },
  alternates: {
    canonical: 'https://easyfloors.ae/how-to-measure-your-room',
  },
};
const MeasureRoom = () => {
  return (
   <>
 
    <Breadcrumb imageClass='h-[180px]' title=" How to Measure Your Room?" image="/assets/images/how-to-measure-your-room/Measure-Your-Room.jpg" />
    <RoomMeasurement/>
    
    <div className='lg:px-4'>
    <Features items={featureItems} />
    </div>
   </>
  )
}

export default MeasureRoom
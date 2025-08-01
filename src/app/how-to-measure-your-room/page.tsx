import Breadcrumb from 'components/Reusable/breadcrumb'
import Features from 'components/Reusable/features'
import RoomMeasurement from 'components/RoomMeasurement/RoomMeasurement'
import { featureItems } from 'data/data'
import React from 'react'
import { createMetadata } from 'utils/metadataHelper';
import { pageMetadataData } from 'data/meta-data';
export const metadata = createMetadata(pageMetadataData.how_to_measure_your_room);
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
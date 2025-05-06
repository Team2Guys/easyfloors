'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';
import React from 'react';
import { AdditionalInfoProps } from 'types/product-detail';


const AdditionalInfo = ({ description, AdditionalInformation,subcategory }:AdditionalInfoProps) => {
  return (
    <Tabs defaultValue="description" className='mt-5 max-w-[90%] mx-auto font-inter'>
      <TabsList className='mx-auto w-full flex justify-center gap-5  sm:mb-10'>
        {
          description.length > 0 && (
            <TabsTrigger value="description" className='data-[state=active]:text-primary text-12 xs:text-14 sm:text-24'>
            Description
            </TabsTrigger>
          )
        }
    
        {
          AdditionalInformation && AdditionalInformation.length > 0 && (
            <TabsTrigger value="specifications" className='data-[state=active]:text-primary text-12 xs:text-14 sm:text-24'>
            Dimensions
            </TabsTrigger>
          )
        }

      </TabsList>
      <TabsContent value="description">
        <p className='text-12 sm:text-14 2xl:text-16'>
          {description}
        </p>
      </TabsContent>
      <TabsContent value="specifications" className='max-w-screen-lg mx-auto rounded-md'>
      <table className="w-full text-left border-collapse  rounded-md text-14">
          <tbody className='rounded-md'>
            <tr className='bg-primary text-white rounded-t-md'>
              <th className="py-2 px-4 rounded-tl-md ">ITEM</th>
              <th className="py-2 px-4 rounded-tr-md">{subcategory}</th>
            </tr>
            {AdditionalInformation && AdditionalInformation.map((spec, index) => (
              <tr key={index} >
                <td className="py-2 px-4 border ">{spec.name}</td>
                <td className="py-2 px-4 border">{spec.detail}</td>
              </tr>
            ))}
          </tbody>
      </table>
      </TabsContent>
    </Tabs>
  );
};

export default AdditionalInfo;
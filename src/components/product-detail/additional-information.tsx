import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';
import { specifications } from 'data/produuct-detail';
import React from 'react';

const AdditionalInfo = () => {
  return (
    <Tabs defaultValue="description" className='mt-5 max-w-[90%] mx-auto font-inter'>
      <TabsList className='mx-auto w-full flex justify-center gap-5  sm:mb-10'>
        <TabsTrigger value="description" className='data-[state=active]:text-primary text-12 xs:text-14 sm:text-24'>
          Description
        </TabsTrigger>
        <TabsTrigger value="specifications" className='data-[state=active]:text-primary text-12 xs:text-14 sm:text-24'>
          Additional Information
        </TabsTrigger>
      </TabsList>
      <TabsContent value="description">
        <h2 className='text-14 sm:text-16 2xl:text-20 font-medium'>Richmond Eco SPC- Oak History</h2>
        <p className='text-12 sm:text-14 2xl:text-16'>
          The SPC Oak mixes warm oak shades with natural woodgrain textures, which makes it a versatile flooring choice. The SPC planks are tough and capable of resisting scratches and stains. As well as providing excellent grip underfoot, the top wear layer also prevents slips and falls. This makes it a safer option for families with children or pets. The oak flooring gives a secure feel compared to the sometimes slippery surface of polished wood floors.
        </p>
        <p className='text-12 sm:text-14 2xl:text-16'>
          The SPC Oak mixes warm oak shades with natural woodgrain textures, which makes it a versatile flooring choice. The SPC planks are tough and capable of resisting scratches and stains. As well as providing excellent grip underfoot, the top wear layer also prevents slips and falls. This makes it a safer option for families with children or pets. The oak flooring gives a secure feel compared to the sometimes slippery surface of polished wood floors.
        </p>
      </TabsContent>
      <TabsContent value="specifications" className='max-w-screen-lg mx-auto rounded-md'>
      <table className="w-full text-left border-collapse  rounded-md text-14">
          <tbody className='rounded-md'>
            <tr className='bg-primary text-white rounded-t-md'>
              <th className="py-2 px-4 rounded-tl-md ">ITEM</th>
              <th className="py-2 px-4 rounded-tr-md">POLAR SPC</th>
            </tr>
            {specifications.map((spec, index) => (
              <tr key={index} >
                <td className="py-2 px-4 border ">{spec.label}</td>
                <td className="py-2 px-4 border">{spec.value}</td>
              </tr>
            ))}
          </tbody>
      </table>
      </TabsContent>
    </Tabs>
  );
};

export default AdditionalInfo;
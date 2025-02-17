import React from 'react';
import { IoSearchSharp } from 'react-icons/io5';
interface SearchBarprops{
  className?: string;
}
const SearchBar = ({className}:SearchBarprops) => {
  return (
    <div className={`relative w-full max-w-[10rem]  sm:max-w-[17rem] ${className}`}>
      <input
        type='text'
        placeholder='Search'
        className='w-full pl-10 pr-4 h-7 text-14 sm:h-6 2xl:h-[31px] rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-100'
      />
      <div className='absolute left-3 top-1/2 transform -translate-y-1/2'>
      <IoSearchSharp className='text-16' />
      </div>
    </div>
  );
};

export default SearchBar;

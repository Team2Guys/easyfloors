import React from 'react';
import Container from 'components/common/container/Container';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from './search-bar';
import UserIcon from './user-icon';
import Megamenu from './Megamenu';
import { menuItems } from 'data/data';
import { FaBars } from 'react-icons/fa6';

const Navbar = () => {
  return (
      <Container className='flex items-center max-sm:gap-4 justify-between bg-white mt-3'>
        <div className='w-2/12 lg:w-[8%] 2xl:w-[10%] border'>
          <Link  href='/'>
            <Image  width={200} height={200} className=' w-[54px] h-[24px] lg:w-[200px] lg:h-[60px]' src='/assets/images/logo/logo.png' alt='logo' />
          </Link>
        </div>
        <div className='w-8/12 lg:w-[65%] 2xl:w-[70%] border max-lg:flex max-lg:justify-center'>
          <div className='hidden lg:flex items-center gap-2 2xl:gap-6 w-fit  justify-between capitalize font-light whitespace-nowrap'>
            {menuItems.map((item, index) => (
              <Megamenu key={index} label={item.label} href={item.href} submenu={item.submenu} />
            ))}
          </div>
          <SearchBar className='block lg:hidden' />
        </div>
        <div className='w-2/12 lg:w-[25%] 2xl:w-[20%] border text-end flex items-center gap-2 justify-between max-lg:justify-end'>
          <SearchBar className='lg:block hidden' />
          <UserIcon className='hidden lg:flex' />
          <div className='lg:hidden flex justify-end'>
          <FaBars size={20} />
          </div>
        </div>
      </Container>
  );
};

export default Navbar;

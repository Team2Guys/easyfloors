'use client';
import Link from 'next/link';
import DarkModeSwitcher from './DarkModeSwitcher';
import DropdownUser from './DropdownUser';
import Image from 'next/image';
import logoimage from '../../../../public/assets/images/logo/logo1.png';
import { FaBars } from 'react-icons/fa';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  //eslint-disable-next-line
  setSidebarOpen: any;
}) => {
  return (
    <header className="sticky top-0 z-40 flex w-full bg-primary dark:bg-black text-white dark:drop-shadow-none border dark:border-blue-50 border-t-0 border-l-0">
      <div className="flex flex-grow items-center justify-between px-4 py-1 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-1 xs:gap-2 sm:gap-4 lg:hidden text-black dark:text-white">
          <FaBars
            className="text-white"
            size={15}
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
          />

          <Link
            className="block flex-shrink-0 lg:hidden w-20 xs:w-[100px]"
            href="/"
          >
            <Image width={100} height={100} src={logoimage} alt="Logo" />
          </Link>
        </div>

        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
              <button className="absolute left-0 top-1/2 -translate-y-1/2">
                <svg
                  className="fill-body hover:fill-primary dark:hover:fill-primary"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                    fill=""
                  />
                </svg>
              </button>

            </div>
          </form>
        </div>

        <div className="flex items-center gap-3">
          <ul className="flex items-center gap-2  text-black dark:text-white">
            <DarkModeSwitcher />
          </ul>

          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;

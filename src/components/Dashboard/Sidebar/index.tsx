'use client';
import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import SidebarLinkGroup from './SidebarLinkGroup';
import { MdOutlineDashboard, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { BiCategoryAlt, BiEnvelope } from 'react-icons/bi';
import { GrCodeSandbox, GrUserAdmin } from 'react-icons/gr';
import { useAppSelector } from 'components/Others/HelperRedux';
import { IoSettingsOutline } from 'react-icons/io5';
import { TfiShoppingCartFull } from 'react-icons/tfi';
import { TbGardenCartOff } from 'react-icons/tb';


interface SidebarProps {
  sidebarOpen: boolean;
  //eslint-disable-next-line
  setSidebarOpen: any;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { loggedInUser } = useAppSelector((state) => state.usersSlice);
  const superAdmin = loggedInUser && loggedInUser.role !== 'Admin';

  const pathname = usePathname();

  const trigger = useRef<HTMLDivElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  const storedSidebarExpanded = 'true';

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, []);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== 'Escape') return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

    const GeneralLinks = [
    { href: '/dashboard/Redirecturls', label: 'View Redirecturls' },
   ,
  ];

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-primary text-white duration-300 ease-linear dark:bg-black lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-2">
        <Link href="/">
          <Image width={176} height={32} src="/assets/images/logo/logo1.png" alt="Logo" priority />
        </Link>

        <button
          /* eslint-disable */
          //@ts-ignore
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <SidebarLinkGroup activeCondition={pathname === '/dashboard'}>
                {(handleClick, open) => {
                  return (
                    <>
                      <Link
                        href="/dashboard"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium  duration-300 ease-in-out hover:bg-black dark:hover:bg-primary ${pathname === '/dashboard' && 'bg-black dark:bg-primary'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          if (sidebarExpanded) {
                            handleClick();
                          } else {
                            setSidebarExpanded(true);
                          }
                        }}
                      >
                        <MdOutlineDashboard size={20} className="text-white" />
                        Dashboard
                        <MdOutlineKeyboardArrowDown
                          size={30}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current text-white ${open && 'rotate-180'
                            }`}
                        />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mb-3 mt-3 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/dashboard"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === '/dashboard' && 'text-white'
                                }`}
                            >
                              eCommerce
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                activeCondition={
                  pathname === '/dashboard/category' ||
                  pathname === '/dashboard/subcategory'
                }
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-black dark:hover:bg-primary ${pathname === '/dashboard/category' ||
                            pathname === '/dashboard/subcategory'
                            ? 'bg-black dark:bg-primary'
                            : ''
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          if (sidebarExpanded) {
                            handleClick();
                          } else {
                            setSidebarExpanded(true);
                          }
                        }}
                      >
                        <BiCategoryAlt size={20} className="text-white" />
                        Category
                        <MdOutlineKeyboardArrowDown
                          size={30}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current text-white ${open && 'rotate-180'
                            }`}
                        />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mb-3 mt-3 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/dashboard/category"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white mt-2.5 ${pathname === '/dashboard/category' &&
                                'text-white'
                                }`}
                            >
                              View Categories
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/dashboard/subcategory"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white mt-2.5 ${pathname === '/dashboard/subcategory' &&
                                'text-white'
                                }`}
                            >
                              View Sub Categories
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                activeCondition={pathname === '/dashboard/products'}
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <Link
                        href="/dashboard"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-black dark:hover:bg-primary ${pathname === '/dashboard/products' &&
                          'bg-black dark:bg-primary'
                          }`}
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default link behavior
                          if (sidebarExpanded) {
                            handleClick();
                          } else {
                            setSidebarExpanded(true);
                          }
                        }}
                      >
                        <GrCodeSandbox size={20} className="text-white" />
                        Products
                        <MdOutlineKeyboardArrowDown
                          size={30}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current text-white ${open && 'rotate-180'
                            }`}
                        />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mb-3 mt-3 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/dashboard/products"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === 'dashboard/products' &&
                                'text-white'
                                } `}
                            >
                              View Products
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>


              <SidebarLinkGroup
                activeCondition={pathname === '/dashboard/accessories'}
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <Link
                        href="/dashboard"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-black dark:hover:bg-primary ${pathname === '/dashboard/accessories' &&
                          'bg-black dark:bg-primary'
                          }`}
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default link behavior
                          if (sidebarExpanded) {
                            handleClick();
                          } else {
                            setSidebarExpanded(true);
                          }
                        }}
                      >
                        <GrCodeSandbox size={20} className="text-white" />
                        Accessories
                        <MdOutlineKeyboardArrowDown
                          size={30}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current text-white ${open && 'rotate-180'
                            }`}
                        />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mb-3 mt-3 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/dashboard/accessories"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === 'dashboard/accessories' &&
                                'text-white'
                                } `}
                            >
                              View accessories
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>




              <SidebarLinkGroup
                activeCondition={pathname === '/dashboard/orders'}
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <Link
                        href="/dashboard"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-black dark:hover:bg-primary ${pathname === '/dashboard/orders' &&
                          'bg-black dark:bg-primary'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          if (sidebarExpanded) {
                            handleClick();
                          } else {
                            setSidebarExpanded(true);
                          }
                        }}
                      >
                        <TfiShoppingCartFull size={20} className="text-white" />
                        Orders
                        <MdOutlineKeyboardArrowDown
                          size={30}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current text-white ${open && 'rotate-180'
                            }`}
                        />
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mb-3 mt-3 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/dashboard/orders"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === 'dashboard/orders' && 'text-white'
                                } `}
                            >
                              View Orders
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/dashboard/free-sample"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === 'dashboard/orders' && 'text-white'
                                } `}
                            >
                              View Free Sample Orders
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup
                activeCondition={pathname === '/dashboard/abundant'}
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <Link
                        href="/dashboard"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-black dark:hover:bg-primary ${pathname === '/dashboard/abundant' &&
                          'bg-black dark:bg-primary'
                          }`}
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default link behavior
                          if (sidebarExpanded) {
                            handleClick();
                          } else {
                            setSidebarExpanded(true);
                          }
                        }}
                      >
                        <TbGardenCartOff size={20} className="text-white" />
                        Abandoned Order
                        <MdOutlineKeyboardArrowDown
                          size={30}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current text-white ${open && 'rotate-180'
                            }`}
                        />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mb-3 mt-3 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/dashboard/abundant"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === 'dashboard/abundant' &&
                                'text-white'
                                } `}
                            >
                              View Abandoned Orders
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup
                activeCondition={pathname === '/dashboard/measurement-appointment'}
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <Link
                        href="/dashboard"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-black dark:hover:bg-primary ${pathname === '/dashboard/measurement-appointment' &&
                          'bg-black dark:bg-primary'
                          }`}
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default link behavior
                          if (sidebarExpanded) {
                            handleClick();
                          } else {
                            setSidebarExpanded(true);
                          }
                        }}
                      >
                        <TbGardenCartOff size={20} className="text-white" />
                        Appointments
                        <MdOutlineKeyboardArrowDown
                          size={30}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current text-white ${open && 'rotate-180'
                            }`}
                        />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mb-3 mt-3 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/dashboard/measurement-appointment"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === 'dashboard/measurement-appointment' &&
                                'text-white'
                                } `}
                            >
                              View Measurement Appointment
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/dashboard/installation-appointments"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === 'dashboard/installation-appointments' &&
                                'text-white'
                                } `}
                            >
                              View Installation Appointment
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>


              <SidebarLinkGroup
                activeCondition={pathname === '/dashboard/usernewsletter'}
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <Link
                        href="/dashboard"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-black dark:hover:bg-primary ${pathname === '/dashboard/usernewsletter' &&
                          'bg-black dark:bg-primary'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          if (sidebarExpanded) {
                            handleClick();
                          } else {
                            setSidebarExpanded(true);
                          }
                        }}
                      >
                        <BiEnvelope size={20} className="text-white" />
                        User Newsletter
                        <MdOutlineKeyboardArrowDown
                          size={30}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current text-white ${open && 'rotate-180'
                            }`}
                        />
                      </Link>

                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mb-3 mt-3 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/dashboard/usernewsletter"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === 'dashboard/usernewsletter' &&
                                'text-white'
                                } `}
                            >
                              View User Newsletter
                            </Link>
                          </li>
                        </ul>
                      </div>

                    </>
                  );
                }}
              </SidebarLinkGroup>
                   <SidebarLinkGroup
                activeCondition={pathname === '/dashboard/general'}
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <Link
                        href="/dashboard"
                        className={`dashboard_side_bar group ${pathname === '/dashboard/general' &&
                          'active'
                          }`}
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default link behavior
                          if (sidebarExpanded) {
                            handleClick();
                          } else {
                            setSidebarExpanded(true);
                          }
                        }}
                      >
                        <TbGardenCartOff size={20} className="text-white" />
                        Generals
                        <MdOutlineKeyboardArrowDown
                          size={30}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current text-white ${open && 'rotate-180'
                            }`}
                        />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mb-3 mt-3 flex flex-col gap-2.5 pl-6">
                          {GeneralLinks.map((link) => (
                            <li key={link?.href}>
                              <Link
                                href={link?.href || ""}
                                className={`dashboard_side_bar_links group ${pathname === link?.href ? 'active' : ''
                                  }`}
                              >
                                {link?.label}
                              </Link>
                            </li>
                          ))}

                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>



              {superAdmin ? (
                <li>
                  <Link
                    href="/dashboard/super-admin"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-black dark:hover:bg-primary ${pathname.includes('super-admin') &&
                      'bg-black dark:bg-primary'
                      }`}
                  >
                    <GrUserAdmin size={20} />
                    Admin
                  </Link>
                </li>
              ) : null}

              <li>
                <Link
                  href="/dashboard/settings"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-black dark:hover:bg-primary ${pathname.includes('settings') && 'bg-black dark:bg-primary'
                    }`}
                >
                  <IoSettingsOutline size={20} />
                  Settings
                </Link>
              </li>
            </ul>
          </div>

        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

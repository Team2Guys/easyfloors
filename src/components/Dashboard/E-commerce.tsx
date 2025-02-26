'use client';
import React from 'react';
import ChartOne from './Charts/ChartOne';
import ChartTwo from './Charts/ChartTwo';
import CardDataStats from './CardDataStats';
import { useAppSelector } from 'components/Others/HelperRedux';
import { IoMdEye } from 'react-icons/io';
import { FiShoppingCart } from 'react-icons/fi';
import { PiUsersThreeFill } from 'react-icons/pi';
import { IoBagOutline } from 'react-icons/io5';
import { BiCategory } from 'react-icons/bi';
import { GrDocumentPerformance } from 'react-icons/gr';
import { RECORDS } from 'types/type';

const ECommerce = ({records}: {records: RECORDS}) => {
  const { loggedInUser }: any = useAppSelector((state) => state.usersSlice);

  const canCheckProfit =
    loggedInUser &&
    (loggedInUser.role == 'Admin' ? loggedInUser.canCheckProfit : true);
  const CanCheckRevnue =
    loggedInUser &&
    (loggedInUser.role == 'Admin' ? loggedInUser.CanCheckRevnue : true);
  const canViewUsers =
    loggedInUser &&
    (loggedInUser.role == 'Admin' ? loggedInUser.canViewUsers : true);
  const canViewSales =
    loggedInUser &&
    (loggedInUser.role == 'Admin' ? loggedInUser.canViewSales : true);
  const canVeiwAdmins =
    loggedInUser &&
    (loggedInUser.role == 'Admin' ? loggedInUser.canVeiwAdmins : true);
  const canVeiwTotalproducts =
    loggedInUser &&
    (loggedInUser.role == 'Admin' ? loggedInUser.canVeiwTotalproducts : true);
  const canVeiwTotalCategories =
    loggedInUser &&
    (loggedInUser.role == 'Admin' ? loggedInUser.canVeiwTotalCategories : true);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 dark:bg-black dark:text-white dark:bg-boxdark dark:border-blue-50 dark:border-strokedark dark:bg-boxdark">
          {!canVeiwAdmins ? null : (
              <CardDataStats
                title="Admins"
                total={records?.totalAdmins ? records?.totalAdmins : '0'}
              >
                <IoMdEye size={25} className="fill-white dark:fill-black" />
              </CardDataStats>
            )}

            {!canCheckProfit ? null : (
              <CardDataStats
                title="Total Sub Categories"
                total={
                  records?.total_sub_categories
                    ? records?.total_sub_categories
                    : ''
                }
              >
                <BiCategory size={25} className="text-white dark:text-black" />
              </CardDataStats>
            )}

            {!CanCheckRevnue ? null : (
              <CardDataStats
                title="Total Revenue"
                total={records?.totalRevenue ? records?.totalRevenue : ''}
              >
                <FiShoppingCart
                  size={25}
                  className="text-white dark:text-black"
                />
              </CardDataStats>
            )}

            {!canViewSales ? null : (
              <CardDataStats
                title="Total Orders"
                total={records?.totalSales ? records?.totalSales : ''}
              >
                <GrDocumentPerformance
                  size={25}
                  className="text-white dark:text-black"
                />
              </CardDataStats>
            )}
            {!canViewSales ? null : (
              <CardDataStats
                title="Abandoned Orders"
                total={
                  records?.Total_abandant_order
                    ? records?.Total_abandant_order
                    : ''
                }
              >
                <GrDocumentPerformance
                  size={25}
                  className="text-white dark:text-black"
                />
              </CardDataStats>
            )}

            {!canVeiwTotalCategories ? null : (
              <CardDataStats
                title="Total Categories"
                total={records?.totalCategories ? records?.totalCategories : ''}
              >
                <IoBagOutline
                  size={25}
                  className="text-white dark:text-black"
                />
              </CardDataStats>
            )}

            {!canVeiwTotalproducts ? null : (
              <CardDataStats
                title="Total Product"
                total={records?.totalProducts ? records?.totalProducts : ''}
              >
                <IoBagOutline
                  size={25}
                  className="text-white dark:text-black"
                />
              </CardDataStats>
            )}
            {!canViewUsers ? null : (
              <CardDataStats
                title="Total Users"
                total={records?.totalUsers ? records?.totalUsers : ''}
              >
                <PiUsersThreeFill
                  size={25}
                  className="fill-white dark:fill-black"
                />
              </CardDataStats>
            )}
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
      </div>
    </>
  );
};

export default ECommerce;

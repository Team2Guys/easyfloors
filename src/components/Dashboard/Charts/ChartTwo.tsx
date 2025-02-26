'use client';

import { ApexOptions } from 'apexcharts';
import axios, { AxiosResponse } from 'axios';
import React, { useLayoutEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Cookies from 'js-cookie';
import { useAppSelector } from 'components/Others/HelperRedux';
import { Skeleton } from 'antd';

const baseColorArray = ['#80CAEE', '#3C50E0'];

const options: ApexOptions = {
  colors: baseColorArray,
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: '25%',
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: '25%',
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Satoshi',
    fontWeight: 500,
    fontSize: '14px',
    // markers: {
    //   radius: 99,
    // },
  },
  fill: {
    opacity: 1,
  },
};

interface ChartTwoState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartTwo: React.FC = () => {
  const { loggedInUser }: any = useAppSelector((state) => state.usersSlice);
  const [state, setState] = useState<ChartTwoState | undefined>();
  const [loading, setLoading] = useState(true);

  const AdminType = loggedInUser && loggedInUser.role == 'super-Admin';

  const getWeeklySales = async () => {
    try {
      const token = Cookies.get('2guysAdminToken');
      const superAdmintoken = Cookies.get('superAdminToken');
      const finaltoken = token ? token : superAdmintoken;

      const response: AxiosResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/sales-record/getWeeklySales_record`,
        {
          headers: {
            token: finaltoken,
          },
        },
      );
      console.log(response.data, 'data');
      const reports = response.data;
      console.log(reports, 'reports');

      const defaultArray = [
        {
          name: 'Revenue',
          data: reports.map((item: any) => item.revenue),
        },
        {
          name: 'Sold Products',
          data: reports.map((item: any) => item.total_sold_product),
        },
      ];

      setState({ series: defaultArray });
      setLoading(false);
    } catch (err: any) {
      console.log(err, 'err');
      setLoading(false);
    }
  };

  console.log(state, 'setState');

  useLayoutEffect(() => {
    getWeeklySales();
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7 shadow-default xl:col-span-4 dark:border-strokedark dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:drop-shadow-none dark:border-blue-50">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold dark:text-white">
            {AdminType ? 'Sales, Revenue and Profit ' : 'Sales And Revenue '}
          </h4>
        </div>
        <div>
          <div className="relative inline-block">
            <p className="inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none dark:text-white">
              {' '}
              Current Week
            </p>
          </div>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-mb-9 -ml-5">
          {loading ? (
            <Skeleton active loading />
          ) : (
            state && (
              <ReactApexChart
                options={options}
                series={state.series}
                type="bar"
                height={350}
                width="100%"
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;

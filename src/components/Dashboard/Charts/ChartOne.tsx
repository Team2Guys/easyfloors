'use client';
import { ApexOptions } from 'apexcharts';
import React, { useLayoutEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useAppSelector } from 'components/Others/HelperRedux';
import { Skeleton } from 'antd';

const getMonthNamesUpToCurrent = () => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const today = new Date();
  const currentMonth = today.getMonth(); // 0-based index (0 = January)

  // Return the month names from January to the current month
  return monthNames.slice(0, currentMonth + 1);
};

const baseColorArray = ['#80CAEE', '#3C50E0'];
const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: baseColorArray,
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3056D3', '#80CAEE'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: getMonthNamesUpToCurrent(),
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 100,
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartOne: React.FC = () => {
  const { loggedInUser } = useAppSelector((state) => state.usersSlice);

  const AdminType = loggedInUser && loggedInUser.role === 'super-Admin';
  const [state, setState] = useState<ChartOneState | undefined>();
  const [loading, setLoading] = useState(true);

  const getMonthlyRecord = async () => {
    try {
      const token = Cookies.get('2guysAdminToken');
      const superAdmintoken = Cookies.get('superAdminToken');
      const finalToken = token ? token : superAdmintoken;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/sales-record/getMonthlySales`,
        {
          headers: {
            token: finalToken,
          },
        },
      );

      const reports = response.data;

      const chartColors = [...baseColorArray];

      const keys = ['Revenue', 'Sales'];
      if (AdminType) {
        keys.unshift('Profit');
        chartColors.unshift('#336699');
      }

      const defaultArray = keys.map((key) => {
        return {
          name: key,
          data: reports.map((report: { [key: string]: number }) => report[key] || 0),
        };
      });

      options.colors = chartColors;

      setState({ series: defaultArray });
    } catch (err) {
      console.error('Error fetching monthly record:', err);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    getMonthlyRecord();
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7 shadow-default sm:px-7 xl:col-span-8 dark:bg-black dark:text-white dark:bg-boxdark dark:drop-shadow-none dark:border-blue-50">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap dark:bg-black dark:text-white dark:bg-boxdark dark:drop-shadow-none dark:border-blue-50">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-48">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary dark:bg-boxdark dark:drop-shadow-none dark:border-blue-50 dak:bg-white">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary dark:bg-white"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold dark:text-whtie">Monthly Record</p>
            </div>
          </div>
          <div className="flex min-w-48">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary dark:bg-boxdark dark:drop-shadow-none dark:border-blue-50 dak:bg-white">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary dark:bg-white"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold dark:text-whtie">Total Sales</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded px-3 py-1 text-xs font-medium dark:text-whtie hover:shadow-card ">
              Month
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          {loading ? (
            <Skeleton active />
          ) : (
            state && (
              <ReactApexChart
                options={options}
                series={state.series}
                type="area"
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

export default ChartOne;

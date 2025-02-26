'use client';

import React, { useState } from 'react';
import { Table, notification } from 'antd';
import Image from 'next/image';
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';
import { FaRegEye } from 'react-icons/fa';
import { LiaEdit } from 'react-icons/lia';
import { IProduct, product } from 'types/type';
import revalidateTag from 'components/ServerActons/ServerAction';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import Link from 'next/link';
import {  } from 'config/fetch';

interface Product {
  id: string;
  name: string;
  category: string;
  posterImageUrl: { imageUrl: string };
  createdAt: string;
  sizes?: { name: string; filterName: string; stock: number }[];
  stock?: number;
  updatedAt: string;
}

/* eslint-disable */
interface CategoryProps {
  Categories: any;
  setCategory: any;
  setselecteMenu: (menu: string) => void;
  loading?: boolean;
  setEditProduct: any;
  // subcetagories: any;
}
/* eslint-enable */

const ViewProduct: React.FC<CategoryProps> = ({
  Categories,
  setCategory,
  setselecteMenu,
  // loading,
  setEditProduct,
  // subcetagories,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // const canAddProduct=loggedInUser && (loggedInUser.role =='Admin' ?   loggedInUser.canAddProduct : true )
  const canAddProduct = true;
  // const canDeleteProduct =
  //   loggedInUser &&
  //   (loggedInUser.role == 'Admin' ? loggedInUser.canDeleteProduct : true);
  const canDeleteProduct = true;
  // const canEditproduct =
  //   loggedInUser &&
  //   (loggedInUser.role == 'Admin' ? loggedInUser.canEditproduct : true);
  const canEditproduct = true;

  const filteredProducts: Product[] =
    Categories?.filter((product: IProduct) => {
      const searchtext = searchTerm.trim().toLowerCase();

      return (
        product.name.toLowerCase().includes(searchtext) ||
        product.description.toLowerCase().includes(searchtext) ||
        product.price.toString().includes(searchtext) ||
        product.discountPrice.toString().includes(searchtext) ||
        (product.colors &&
          product.colors.some((color: string) =>
            color.toLowerCase().includes(searchtext),
          )) ||
        (product.spacification &&
          product.spacification.some((spec) =>
            Object.values(spec).some((value) =>
              value.toString().toLowerCase().includes(searchtext),
            ),
          )) ||
        product.additionalInformation.some((info) =>
          Object.values(info).some((value) =>
            value.toString().toLowerCase().includes(searchtext),
          ),
        ) ||
        (product.categories &&
          product.categories.some((category) =>
            category.name.toLowerCase().includes(searchtext),
          )) ||
        (product.subcategories &&
          product.subcategories.some((subcategory) =>
            subcategory.name.toLowerCase().includes(searchtext),
          ))
      );
    }).sort((a: product, b: product) => {
      const searchText = searchTerm.trim().toLowerCase();

      const aStartsWith = a.name.toLowerCase().startsWith(searchText) ? -1 : 1;
      const bStartsWith = b.name.toLowerCase().startsWith(searchText) ? -1 : 1;

      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

      return aStartsWith - bStartsWith || dateB - dateA;
    }) || [];

  const confirmDelete = (key: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, the Product cannot be recovered.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(key);
      }
    });
  };
  const token = Cookies.get('2guysAdminToken');
  const superAdminToken = Cookies.get('superAdminToken');
  const finalToken = token ? token : superAdminToken;

  const handleDelete = async (key: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/delete-product`,
        {
          headers: {
            productId: key,
            token: finalToken,
          },
        },
      );
      revalidateTag('products');
      console.log(response);
      setCategory((prev: Product[]) => prev.filter((item) => item.id !== key));
      notification.success({
        message: 'Product Deleted',
        description: 'The product has been successfully deleted.',
        placement: 'topRight',
      });
    } catch (err) {
      console.log(err);
      notification.error({
        message: 'Deletion Failed',
        description: 'There was an error deleting the product.',
        placement: 'topRight',
      });
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'posterImageUrl',
      width: 150,
      key: 'posterImageUrl',
      render: (text: string, record: Product) => (
        <Image
          src={`${record?.posterImageUrl}`}
          alt={`Image of ${record.name}`}
          width={200}
          loading='lazy'
          className="sm:w-[80px] sm:h-[80px] rounded-md object-contain"
          height={200}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: "Stock Quantity",
      width: 170,
      dataIndex: "stock",
      key: "stock",
      render: (text: string, record: Product) => {
        const sizes =
          record.sizes && record.sizes.length > 0
            ? record.sizes
            : []

        console.log(sizes, "sizes");

        return (
            sizes.length > 0 ? (
              <select name="custom-select" id="stock">
                <option value="0">
                  Variations Stock
                </option>
                {sizes.map((item, index) => (
                  <option className='flex' disabled key={index} value={index + 1} >
                    <span className='block'>Variant: {item.name} </span>
                    <span>{item.filterName} </span>
                    <span>QTY: {item.stock} </span>
                  </option>
                ))}
              </select>
            ) : (

              <p>{record.stock}</p>
            )
        );
      },
    },
    {
      title: 'Create At',
      dataIndex: 'createdAt',
      key: 'date',
      render: (text: string, record: Product) => {
        const createdAt = new Date(record.createdAt);
        const formattedDate = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, '0')}-${String(
          createdAt.getDate(),
        ).padStart(2, '0')}`;
        return <span>{formattedDate}</span>;
      },
    },

    {
      title: 'Updated At',
      dataIndex: 'createdAt',
      key: 'date',
      render: (text: string, record: Product) => {
        const createdAt = new Date(record.updatedAt);
        const formattedDate = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, '0')}-${String(
          createdAt.getDate(),
        ).padStart(2, '0')}`;
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: 'Time',
      dataIndex: 'createdAt',
      key: 'time',
      render: (text: string, record: Product) => {
        const createdAt = new Date(record.updatedAt);
        const formattedTime = `${String(createdAt.getHours()).padStart(2, '0')}:${String(
          createdAt.getMinutes(),
        ).padStart(2, '0')}`;
        return <span>{formattedTime}</span>;
      },
    },
    {
      title: 'Edited By',
      dataIndex: 'last_editedBy',
      key: 'last_editedBy',
    },
    {
      title: 'Preview',
      key: 'Preview',
      width: 120,
      render: (text: string, record: Product) => {
        return (
          <Link
            className="hover:text-black"
            target="_blank"
            href={`${record.name}`}
          >
            <FaRegEye />
          </Link>
        );
      },
    },
    {
      title: 'Edit',
      key: 'Edit',
      width: 150,
      render: (text: string, record: Product) => (
        <LiaEdit
          className={`${canEditproduct ? 'cursor-pointer' : ''} ${!canEditproduct ? 'cursor-not-allowed text-slate-200' : ''
            }`}
          size={20}
          onClick={() => {
            if (canEditproduct) {
              setEditProduct(record);
              setselecteMenu('Add Products');
            }
          }}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      render: (text: string, record: Product) => (
        <RiDeleteBin6Line
          className={`${canDeleteProduct ? 'text-red-600 cursor-pointer' : ''} ${!canDeleteProduct ? 'cursor-not-allowed text-slate-200' : ''
            }`}
          size={20}
          onClick={() => {
            // if (canDeleteProduct) {
            confirmDelete(record.id);
            // }
          }}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between gap-2 mb-4 items-center flex-nowrap text-black dark:text-white">
          <input
            className="peer lg:p-3 p-2 block outline-none border rounded-md border-gray-200 dark:bg-boxdark dark:bg-transparent dark:border-white text-11 xs:text-sm dark:focus:border-primary focus:border-dark focus:ring-dark-500 disabled:opacity-50 disabled:pointer-events-none dark:text-black"
            type="search"
            placeholder="Search Product"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div>
            <p
              className={`${canAddProduct &&
                'cursor-pointer rounded-md text-nowrap text-12 xs:text-base'
                } py-2 px-4 ${canAddProduct && 'bg-black text-white rounded-md border'
                } flex justify-center dark:bg-primary dark:border-0 ${!canAddProduct &&
                'cursor-not-allowed bg-gray-500 text-white rounded-md'
                }`}
              onClick={() => {
                if (canAddProduct) {
                  setselecteMenu('Add Products');
                  setEditProduct(undefined);
                }
              }}
            >
              Add Products
            </p>
          </div>
      </div>
        {filteredProducts && filteredProducts.length > 0 ? (
          <Table
            className="lg:overflow-hidden overflow-x-scroll !dark:border-strokedark !dark:bg-boxdark !bg-transparent"
            dataSource={filteredProducts}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        ) : (
          <p className="text-primary dark:text-white">No products found</p>
        )}
    </div>
  );
};

export default ViewProduct;
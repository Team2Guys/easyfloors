'use client';

import React, { useState } from 'react';
import { Table, notification } from 'antd';
import Image from 'next/image';
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';
import { FaRegEye } from 'react-icons/fa';
import { LiaEdit } from 'react-icons/lia';
import { product } from 'types/type';
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
}





interface CategoryProps {
  /* eslint-disable */
  Categories: any;
  setCategory: any;
  setselecteMenu: (menu: string) => void;
  loading?: boolean;
  setEditProduct: any;
  /* eslint-enable */
  // subcetagories: any;
}

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
    Categories?.filter((product: any) => {
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
          product.spacification.some((spec: any) =>
            Object.values(spec).some((value: any) =>
              value.toString().toLowerCase().includes(searchtext),
            ),
          )) ||
        product.additionalInformation.some((info: any) =>
          Object.values(info).some((value: any) =>
            value.toString().toLowerCase().includes(searchtext),
          ),
        ) ||
        (product.categories &&
          product.categories.some((category: any) =>
            category.name.toLowerCase().includes(searchtext),
          )) ||
        (product.subcategories &&
          product.subcategories.some((subcategory: any) =>
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

  const confirmDelete = (key: any) => {
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
      render: (text: any, record: Product) => (
        <Image
          src='data:image/jpeg;base64,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'
          alt={`Image of ${record?.name}`}
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
      render: (text: any, record: any) => {
        const sizes =
          record.sizes && record.sizes.length > 0
            ? record.sizes
            : record.filter && record.filter.length > 0
              ? record.filter[0]
              : [];

        console.log(sizes, "sizes");

        return (
          <>
            {sizes.length > 0 ? (
              <select name="custom-select" id="stock">
                <option value="0">
                  Variations Stock
                </option>
                {sizes.map((item: any, index: number) => (
                  <option className='flex' disabled key={index} value={index + 1} >
                    <span className='block'>Variant: {item.name} </span>
                    <span>{item.filterName} </span>
                    <span>QTY: {item.stock} </span>
                  </option>
                ))}
              </select>
            ) : (

              <p>{record.stock}</p>

            )}
          </>
        );
      },
    },
    {
      title: 'Create At',
      dataIndex: 'createdAt',
      key: 'date',
      render: (text: any, record: any) => {
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
      render: (text: any, record: any) => {
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
      render: (text: any, record: any) => {
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
      render: (text: any, record: any) => {
        return (
          <Link
            className="hover:text-black"
            target="_blank"
            href={(record)}
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
      render: (text: any, record: Product) => (
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
      render: (text: any, record: any) => (
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
                } p-2 ${canAddProduct && 'bg-primary text-white rounded-md border'
                } flex justify-center dark:bg-main dark:border-0 ${!canAddProduct &&
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
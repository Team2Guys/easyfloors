'use client';

import React, { useState } from 'react';
import { Table, notification } from 'antd';
import Image from 'next/image';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaRegEye } from 'react-icons/fa';
import { LiaEdit } from 'react-icons/lia';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { IProduct } from 'types/prod';
import { DASHBOARD_MAIN_PRODUCT_PROPS } from 'types/PagesProps';
import { useMutation } from '@apollo/client';
import { REMOVE_PRODUCT } from 'graphql/mutations';
import { FETCH_ALL_PRODUCTS } from 'graphql/queries';

const ViewProduct: React.FC<DASHBOARD_MAIN_PRODUCT_PROPS> = ({
  products,
  setProducts,
  setselecteMenu,
  setEditProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [removeProduct] = useMutation(REMOVE_PRODUCT);


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

  const filteredProducts: IProduct[] = products?.filter((product: IProduct) => {
    const searchtext = searchTerm.trim().toLowerCase();

    return (
      product.name.toLowerCase().includes(searchtext) ||
      product.description.toLowerCase().includes(searchtext) ||
      product.price.toString().includes(searchtext) ||
      product?.discountPrice?.toString().includes(searchtext) ||
      (product.colors &&
        product.colors.some((color: string) =>
          color.toLowerCase().includes(searchtext),
        )) ||

      product.category && product?.category?.name.toLowerCase().includes(searchtext) ||
      product.subcategory && product.subcategory.name.toLowerCase().includes(searchtext)

    );
  }).sort((a: IProduct, b: IProduct) => {
    const searchText = searchTerm.trim().toLowerCase();

    const aStartsWith = a.name.toLowerCase().startsWith(searchText) ? -1 : 1;
    const bStartsWith = b.name.toLowerCase().startsWith(searchText) ? -1 : 1;

    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

    return aStartsWith - bStartsWith || dateB - dateA;
  }) || [];

  const confirmDelete = (key: string | number) => {
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
  // const token = Cookies.get('2guysAdminToken');
  // const superAdminToken = Cookies.get('superAdminToken');
  // const finalToken = token ? token : superAdminToken;

  const handleDelete = async (key: string | number) => {
    try {
      removeProduct({ variables: { id: +key }, refetchQueries: [{ query: FETCH_ALL_PRODUCTS }] })

      setProducts((prev: IProduct[]) => prev.filter((item) => item.id !== key) || []);
      notification.success({
        message: 'Product Deleted',
        description: 'The product has been successfully deleted.',
        placement: 'topRight',
      });
    } catch (err) {
      notification.error({
        message: 'Deletion Failed',
        description: 'There was an error deleting the product.',
        placement: 'topRight',
      });
      throw err
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'posterImageUrl',
      width: 150,
      key: 'posterImageUrl',
      render: (text: string, record: IProduct) => (
        <Image
          src={record.posterImageUrl.imageUrl || ""}
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
      render: (text: string, record: IProduct) => {


        return (

          <p>{record.stock}</p>
        )
      },
    },
    {
      title: 'Create At',
      dataIndex: 'createdAt',
      key: 'date',
      render: (text: string, record: IProduct) => {
        if (!record?.createdAt) {
          return
        }
        const createdAt = new Date(record?.createdAt);
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
      render: (text: string, record: IProduct) => {
        if (!record.updatedAt) return
        const createdAt = new Date(record.updatedAt);
        const formattedDate = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, '0')}-${String(
          createdAt.getDate(),
        ).padStart(2, '0')}`;
        return <span>{formattedDate}</span>;
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
      render: (text: string, record: IProduct) => {
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
      render: (text: string, record: IProduct) => (
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
      render: (text: string, record: IProduct) => (
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
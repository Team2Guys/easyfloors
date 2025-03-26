'use client';

import React, { useState } from 'react';
import { Table, notification } from 'antd';
import Image from 'next/image';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaRegEye } from 'react-icons/fa';
import { LiaEdit } from 'react-icons/lia';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { IAccessories, IProduct } from 'types/prod';
import { DASHBOARD_MAIN_PRODUCT_PROPS } from 'types/PagesProps';
import { useMutation } from '@apollo/client';
import { REMOVE_ACCESSORY, REMOVE_PRODUCT } from 'graphql/mutations';
import { FETCH_ALL_PRODUCTS } from 'graphql/queries';
import { FETCH_ALL_ACCESSORIES } from 'graphql/Accessories';

const ViewProduct: React.FC<DASHBOARD_MAIN_PRODUCT_PROPS> = ({
  products,
  setProducts,
  setselecteMenu,
  setEditProduct,
  accessoryFlag
  
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [removeProduct] = useMutation(REMOVE_PRODUCT);
  const [removeAccessory] = useMutation(REMOVE_ACCESSORY);


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
      product.description?.toLowerCase().includes(searchtext) ||
      product.price?.toString().includes(searchtext) ||
      product?.discountPrice?.toString().includes(searchtext) ||
      product?.ResidentialWarranty?.toString().includes(searchtext) ||
      product?.plankWidth?.toString().includes(searchtext) ||
      product?.stock?.toString().includes(searchtext) ||
      product.category && product?.category?.name.toLowerCase().includes(searchtext) ||
      product.subcategory && product.subcategory.name.toLowerCase().includes(searchtext)
    );
  }).sort((a: IProduct, b: IProduct) => {
    const searchText = searchTerm.trim().toLowerCase();
    
    // First sort by whether the name starts with the search term
    const aStartsWith = a.name.toLowerCase().startsWith(searchText) ? -1 : 1;
    const bStartsWith = b.name.toLowerCase().startsWith(searchText) ? -1 : 1;
  
    // Then sort by creation date (newest first)
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
  
    // If search term is empty, sort by date only (newest first)
    if (!searchText) {
      return dateB - dateA;
    }
  
    // Otherwise, sort by search match first, then by date
    return aStartsWith - bStartsWith || dateB - dateA;
  }) || [];




  const confirmDelete = (key: string | number) => {
    const type = accessoryFlag ? "Accessories" : "product";
    Swal.fire({
      title: 'Are you sure?',
      text: `Once deleted, the ${type} cannot be recovered.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(key, type);
      }
    });
  };
  
  const handleDelete = async (key: string | number, type: "product" | "Accessories") => {
    try {
      if (type === "product") {
        await removeProduct({
          variables: { id: +key },
          refetchQueries: [{ query: FETCH_ALL_PRODUCTS }],
        });
        setProducts((prev: IProduct[]) => prev.filter((item) => item.id !== key) || []);
      } else {
        await removeAccessory({
          variables: { id: +key },
          refetchQueries: [{ query: FETCH_ALL_ACCESSORIES }],
        });
        setProducts((prev: IAccessories[]) => prev.filter((item) => item.id !== key) || []);
      }
  
      notification.success({
        message: `${type.charAt(0).toUpperCase() + type.slice(1)} Deleted`,
        description: `The ${type} has been successfully deleted.`,
        placement: 'topRight',
      });
    } catch (err) {
      notification.error({
        message: 'Deletion Failed',
        description: `There was an error deleting the ${type}.`,
        placement: 'topRight',
      });
      throw err;
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
      key: 'createdAt',
      render: (text: string, record: IProduct) => 
        record?.createdAt ? new Date(record.createdAt).toLocaleString('en-US', { hour12: true }).replace(/:\d{2}\s/, ' ') : null,
    },
    
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text: string, record: IProduct) => 
        record?.updatedAt ? new Date(record.updatedAt).toLocaleString('en-US', { hour12: true }).replace(/:\d{2}\s/, ' ') : null,
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
            href={`/${record.category?.RecallUrl+"/"+record.subcategory?.custom_url+"/"+record.custom_url}`}
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
            {`Add ${accessoryFlag?  "Accessory" :   "Products"}`}
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
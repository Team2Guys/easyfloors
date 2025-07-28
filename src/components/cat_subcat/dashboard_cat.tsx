'use client';

import React, { SetStateAction, useEffect, useState } from 'react';
import { Table, notification } from 'antd';
import Image from 'next/image';
import { RiDeleteBin6Line } from 'react-icons/ri';
// import axios from 'axios';
import { LiaEdit } from 'react-icons/lia';
import revalidateTag from 'components/ServerActons/ServerAction';
// import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { Category } from 'types/cat';
import { useMutation } from '@apollo/client';
import { REMOVE_CATEGORY } from 'graphql/mutations';

interface CategoryProps {
  setMenuType: React.Dispatch<SetStateAction<string>>;
  seteditCategory?: React.Dispatch<SetStateAction<Category | undefined | null>>;
  cetagories?: Category[];
}


const DashboardCat  = ({
  setMenuType,
  seteditCategory,
  cetagories,
}: CategoryProps) => {
  const [category, setCategory] = useState<Category[] | undefined>(cetagories);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [removeCategory] = useMutation(REMOVE_CATEGORY);


  useEffect(() => {
    
    setCategory(cetagories)
  
  }, [cetagories])
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  // const token = Cookies.get('2guysAdminToken');
  // const superAdminToken = Cookies.get('superAdminToken');
  // const finalToken = token ? token : superAdminToken;

  const filteredCategories: Category[] =
    (category &&
      category
        .filter(
          (category) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (category.status && category.status.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (category.description &&
              category.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase())),
        )
        .sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        })) ||
    [];

  const canDeleteCategory = true;
  // const canDeleteCategory =
  //   loggedInUser &&
  //   (loggedInUser.role == 'Admin' ? loggedInUser.canDeleteCategory : true);
  // const canAddCategory = loggedInUser && (loggedInUser.role == 'Admin' ? loggedInUser.canAddCategory : true)
  const canAddCategory = true;

  // const canEditCategory =
  //   loggedInUser &&
  //   (loggedInUser.role == 'Admin' ? loggedInUser.canEditCategory : true);
  const canEditCategory = true;

  const confirmDelete = (key: string | number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, the Category cannot be recovered.',
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

  const handleDelete = async (key: number | string) => {
    try {
   

      await removeCategory({ variables: { id: Number(key) } }); 
      
      setCategory((prev: Category[] | undefined) => (prev ? prev.filter((item) => item.id !== key) : []));
      revalidateTag('categories');
  
      notification.success({
        message: 'Category Deleted',
        description: 'The category has been successfully deleted.',
        placement: 'topRight',
      });
    } catch (err) {
      notification.error({
        message: 'Deletion Failed',
        description: 'There was an error deleting the category.',
        placement: 'topRight',
      });
      return err;
    }
  };

  const handleEdit = (record: Category) => {
    if (seteditCategory) {
      seteditCategory(record);
      setMenuType('CategoryForm');
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'posterImageUrl',
      key: 'posterImageUrl',
      render: (_: string, record: Category) =>
        record.posterImageUrl ? (
          <Image
            src={record.posterImageUrl.imageUrl || ''}
            alt={`Image of ${record.name}`}
            loading='lazy'
            width={50}
            height={50}
          />
        ) : (
          <div>No Image Available </div>
        ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Create At',
      dataIndex: 'createdAt',
      key: 'date',
      render: (_: string, record: Category) => {
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
      render: (_: string, record: Category) => {
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
      title: 'Edit',
      key: 'Edit',
      render: (_:string, record: Category) => (
        <LiaEdit
          className={`cursor-pointer ${canEditCategory && 'text-black dark:text-white'} ${!canEditCategory && 'cursor-not-allowed text-slate-300'}`}
          size={20}
          onClick={() => handleEdit(record)}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: Category) => (
        <RiDeleteBin6Line
          className={`cursor-pointer ${canDeleteCategory && 'text-red-500 dark:text-red-700'} ${
            !canDeleteCategory && 'cursor-not-allowed text-slate-300'
          }`}
          // className="cursor-pointer text-red-500"
          size={20}
          onClick={() => {
            if (canDeleteCategory) {
              confirmDelete(record.id);
            }
          }}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-4 items-center text-dark dark:text-white">
          <input
            className="peer lg:p-3 p-2 block outline-none border rounded-md border-gray-200  dark:bg-transparent dark:border-white text-11 xs:text-sm dark:focus:border-primary focus:border-dark focus:ring-dark-500 disabled:opacity-50 disabled:pointer-events-none dark:text-black"
            type="search"
            placeholder="Search Category"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div>
            <p
              className={`${canAddCategory && 'cursor-pointer'} lg:p-2 md:p-2 ${
                canAddCategory &&
                'bg-black dark:bg-primary dark:border-0 text-white rounded-md border   '
              } flex justify-center ${
                !canAddCategory && 'cursor-not-allowed '
              }`}
              onClick={() => {
                seteditCategory?.(undefined);
                if (canAddCategory) {
                  setMenuType('Add Category');
                }
              }}
            >
              Add Category
            </p>
          </div>
      </div>

        {filteredCategories && filteredCategories.length > 0 ? (
          <Table
            className="overflow-x-scroll lg:overflow-auto"
            dataSource={filteredCategories}
            columns={columns}
            pagination={false}
            rowKey="id"
          />
        ) : (
          'No Categories found'
        )}
    </div>
  );
};

export default DashboardCat ;

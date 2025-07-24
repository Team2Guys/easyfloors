'use client';

import React, { useEffect, useState } from 'react';
import { Table, notification } from 'antd';
import Image from 'next/image';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { LiaEdit } from 'react-icons/lia';
import revalidateTag from 'components/ServerActons/ServerAction';
import Swal from 'sweetalert2';

import Cookies from 'js-cookie';
import { DASHBOARD_VIEW_SUBCATEGORIES_PROPS } from 'types/PagesProps';
import { ISUBCATEGORY } from 'types/cat';
import { useMutation } from '@apollo/client';
import { REMOVE_SUBCATEGORY } from 'graphql/mutations';
import { FETCH_ALL_SUB_CATEGORIES } from 'graphql/queries';


const ViewSubcategries = ({
  setMenuType,
  seteditCategory,
  subCategories,
}: DASHBOARD_VIEW_SUBCATEGORIES_PROPS) => {
  const [category, setCategory] = useState<ISUBCATEGORY[] | undefined>(subCategories);

  useEffect(() => {
    setCategory(subCategories)

  }, [subCategories])

  const [searchTerm, setSearchTerm] = useState<string>('');
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };



  const filteredSubCategories: ISUBCATEGORY[] | undefined = category?.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );



  // const { loggedInUser }: any = useAppSelector((state) => state.usersSlice);
  const [removeCategory] = useMutation(REMOVE_SUBCATEGORY);
  const canDeleteCategory = true;
  const canAddCategory = true;

  const canEditCategory = true;
  // const canEditCategory =
  //   loggedInUser &&
  //   (loggedInUser.role == 'Admin' ? loggedInUser.canEditCategory : true);

  const confirmDelete = (key: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, the Sub Category cannot be recovered.',
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

  const handleDelete = async (key: number) => {
    try {
      await removeCategory({
        variables: { id: Number(key) }, refetchQueries: [{ query: FETCH_ALL_SUB_CATEGORIES }],
        context: {
          headers: {
            Authorization: `Bearer ${finalToken}`,
          },
        },
      });
      setCategory((prev: ISUBCATEGORY[] | undefined) => prev ? prev.filter((item: ISUBCATEGORY) => item.id != key) : []);
      revalidateTag('subcategories');
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

      throw err;
    }
  };
  const handleEdit = (record: ISUBCATEGORY) => {
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
      render: (_: string, record: ISUBCATEGORY) =>
        record.posterImageUrl !== null ? (
          <Image
            src={record?.posterImageUrl?.imageUrl || 'https://res.cloudinary.com/dmmeqgdhv/image/upload/v1740655318/download_krzc9s.jpg'}
            alt={`Image of ${record.name}`}
            loading='lazy'
            width={50}
            height={50}
          />
        ) : (
          <div>No Image Available 2</div>
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
      render: (_: string, record: ISUBCATEGORY) => {
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
      render: (_: string, record: ISUBCATEGORY) => {
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
      render: (_: string, record: ISUBCATEGORY) => {
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
      title: 'Edit',
      key: 'Edit',
      render: (_: string, record: ISUBCATEGORY) => (
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
      render: (_: string, record: ISUBCATEGORY) => (
        <RiDeleteBin6Line
          className={`cursor-pointer ${canDeleteCategory && 'text-red-500 dark:text-red-700'} ${!canDeleteCategory && 'cursor-not-allowed text-slate-300'
            }`}
          // className="cursor-pointer text-red-500"
          size={20}
          onClick={() => {
            if (canDeleteCategory) {
              confirmDelete(Number(record?.id));
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
          className="peer lg:p-3 p-2 block outline-none border rounded-md border-gray-200 dark:bg-boxdark dark:bg-transparent dark:border-white text-11 xs:text-sm dark:focus:border-primary focus:border-dark focus:ring-dark-500 disabled:opacity-50 disabled:pointer-events-none dark:text-black"
          type="search"
          placeholder="Search Sub Categories"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div>
          <p
            className={`${canAddCategory && 'cursor-pointer'} p-2 ${canAddCategory &&
              'dark:bg-primary dark:border-0 bg-black text-white rounded-md border'
              } flex justify-center ${!canAddCategory && 'cursor-not-allowed '
              }`}
            onClick={() => {
              seteditCategory?.(undefined);
              if (canAddCategory) {
                setMenuType('Add Sub Categories');
              }
            }}
          >
            Add Sub Category
          </p>
        </div>
      </div>

      {filteredSubCategories && filteredSubCategories.length > 0 ? (
        <Table
          className="overflow-x-scroll lg:overflow-auto"
          dataSource={filteredSubCategories}
          columns={columns}
          pagination={false}
          rowKey="id"
        />
      ) : (
        'No Sub Categories found'
      )}
    </div>
  );
};

export default ViewSubcategries;

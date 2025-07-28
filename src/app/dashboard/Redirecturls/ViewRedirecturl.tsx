"use client";

import { useMutation } from '@apollo/client';
import { Table } from 'antd';
import revalidateTag from 'components/ServerActons/ServerAction';
import { REMOVE_REVIEW } from 'graphql/general';
import { DateFormatHandler } from 'lib/helperFunctions';
import React, { SetStateAction, useState } from 'react';
import { LiaEdit } from 'react-icons/lia';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { RedirectUrls } from 'types/general';

interface IView_RedirectUrls {
  Redirecturls: RedirectUrls[],
  setselecteMenu: React.Dispatch<SetStateAction<string>>,
  setRedirectUrls: React.Dispatch<SetStateAction<RedirectUrls | undefined>>,
}

export default function ViewRedirecturl({
  Redirecturls,
  setselecteMenu,
  setRedirectUrls
}: IView_RedirectUrls) {

  const [RemoveReview, { loading }] = useMutation(REMOVE_REVIEW);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const canDeleteProduct = true;
  const canEditproduct = true;
  const canAddProduct = true;

  // Handle Search Input Change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Confirm Deletion
  const confirmDelete = (key: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, the redirect URL cannot be recovered.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(key);
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  // Delete Action
  const handleDelete = async (key: number) => {
    try {
      await RemoveReview({
        variables: { id: Number(key) },
        context: {
          headers: {
            Authorization: `Bearer ${""}`, // Provide token if needed
          },
        },
      });
      revalidateTag('reviews');
    } catch (err) {
      console.error(err);
    }
  };

  // Columns for Table
  const columns = [
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      width: 200,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_: string, record: RedirectUrls) => {
        const createdAt = new Date(record?.createdAt ?? "");
        return <span>{DateFormatHandler(createdAt)}</span>;
      }
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (_: string, record: RedirectUrls) => {
        const updatedAt = new Date(record?.updatedAt ?? "");
        return <span>{DateFormatHandler(updatedAt)}</span>;
      }
    },
    {
      title: 'Edit',
      key: 'edit',
      width: 100,
      render: (_: string, record: RedirectUrls) => (
        <LiaEdit
          className={`${canEditproduct ? 'cursor-pointer' : 'cursor-not-allowed text-slate-200'}`}
          size={20}
          onClick={() => {
            if (canEditproduct) {
              setRedirectUrls(record);
              setselecteMenu("Add RedirectUrls");
            }
          }}
        />
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      width: 100,
      render: (_: string, record: RedirectUrls) => (
        loading ? "Deleting..." :
          <RiDeleteBin6Line
            className={`${canDeleteProduct ? 'text-red-600 cursor-pointer' : 'cursor-not-allowed text-slate-200'}`}
            size={20}
            onClick={() => {
              if (canDeleteProduct) {
                confirmDelete(record.id);
              }
            }}
          />
      ),
    },
  ];
    const filteredRedirectUrls = (Redirecturls ?? []).filter(item =>
      item.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.status && item.status.toLowerCase().includes(searchTerm.toLowerCase()))
    );

const sortedRedirectUrls = [...filteredRedirectUrls].sort((a, b) => {
  const dateA = new Date((a.updatedAt ?? "") || (a.createdAt ?? "")).getTime();
  const dateB = new Date((b.updatedAt ?? "") || (b.createdAt ?? "")).getTime();
  return dateB - dateA; // Latest first
});

  return (
    <>
      <div className="flex justify-between gap-2 mb-4 items-center flex-nowrap">
        <input
          className="dashboard_input"
          style={{ width: 'max-content' }}
          type="search"
          placeholder="Search URL"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div>
          <p
            className={`py-2 px-4 rounded-md text-nowrap text-12 xs:text-base ${canAddProduct
              ? 'cursor-pointer text-white bg-black'
              : 'cursor-not-allowed bg-gray-500 text-white'
              }`}
            onClick={() => {
              if (canAddProduct) {
                setselecteMenu("Add RedirectUrls");
                setRedirectUrls(undefined);
              }
            }}
          >
            Add Redirect URL
          </p>
        </div>
      </div>

      <Table
        key={sortedRedirectUrls.map(r => r.id).join(',')}
        dataSource={sortedRedirectUrls}
        columns={columns}
        rowKey="id"
        pagination={false}
        scroll={{ y: 500 }}
      />
    </>
  );
}

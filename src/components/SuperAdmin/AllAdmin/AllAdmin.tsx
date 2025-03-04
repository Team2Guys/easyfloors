import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';
import Loader from 'components/Loader/Loader';
import { FaEdit } from 'react-icons/fa';
import { ColumnType } from 'antd/es/table';
import { AdminRecord } from 'types/type';

function Admins({ setselecteMenu, setEditAdmin,AllAdmins }: any) {//eslint-disable-line
  const [admins, setAdmins] = useState([]);
  const [delLoading, setDelLoading] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setDelLoading(id);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/delete-admin`,
        {
          headers: {
            adminId: id,
          },
        },
      );
      setAdmins((prevAdmins) =>
        prevAdmins.filter((admin: { id: string }) => admin.id !== id),
      );
    } catch (error) {
      throw error;
    } finally {
      setDelLoading(null); 
    }
  };



 useEffect(() => {
  setAdmins(AllAdmins)
 }, [AllAdmins])
 
  
  const columns: Array<ColumnType<AdminRecord>> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: { fullname: string }) => `${record.fullname}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Can Add Product',
      dataIndex: 'canAddProduct',
      key: 'canAddProduct',
      render: (text: string, record: AdminRecord) => (
        <span>{record.canAddProduct ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Can Delete Product',
      dataIndex: 'canDeleteProduct',
      key: 'canDeleteProduct',
      render: (text: string, record: AdminRecord) => (
        <span>{record.canDeleteProduct ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Can Add Category',
      dataIndex: 'canAddCategory',
      key: 'canAddCategory',
      render: (text: string, record: AdminRecord) => (
        <span>{record.canAddCategory ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Can View Product',
      dataIndex: 'canDeleteCategory',
      key: 'canDeleteCategory',
      render: (text: string, record: AdminRecord) => (
        <span>{record.canDeleteCategory ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Can view Profit',
      dataIndex: 'canCheckProfit',
      key: 'canCheckProfit',
      render: (text: string, record: AdminRecord) => (
        <span>{record.canCheckProfit ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Can View Total user',
      dataIndex: 'canViewUsers',
      key: 'canViewUsers',
      render: (text: string, record: AdminRecord) => (
        <span>{record.canViewUsers ? 'Yes' : 'No'}</span>
      ),
    },

    {
      title: 'Edit',
      key: 'edit',
      render: (text: string, record: AdminRecord) => (
        <FaEdit
          className="cursor-pointer text-slate-500"
          size={20}
          onClick={() => {
            setEditAdmin(record);
            setselecteMenu('');
          }}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: AdminRecord) =>
        delLoading === record.id ? ( // Check if loading state matches current admin ID
          <Loader />
        ) : (
          <RiDeleteBin6Line
            className="cursor-pointer text-red-500 dark:text-red-700"
            size={20}
            onClick={() => handleDelete(record.id)}
          />
        ),
    },
  ];

  return (
    
        <>
          <div className="flex justify-between mb-4 items-center text-black dark:text-white ">
            <p>Admins</p>
            <div>
              <button
                onClick={() => setselecteMenu('Add Admin')}
                className="bg-primary text-white"
              >
                Add new Admin
              </button>
            </div>
          </div>
          {admins && admins.length > 0 ? (
            <Table
              className="overflow-auto dark:border-strokedark dark:bg-boxdark"
              dataSource={admins}
              columns={columns}
              pagination={false}
              rowKey="id"
            />
          ) : (
            <div className="flex justify-center"> No Admin found</div>
          )}
        </>

  );
}

export default Admins;

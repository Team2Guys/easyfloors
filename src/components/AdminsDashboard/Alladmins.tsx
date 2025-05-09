'use client';

import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';
import Loader from 'components/Loader/Loader';
import { AdminRecord } from 'types/type';

function Admins({ setselecteMenu }: any) { //eslint-disable-line
  const [admins, setAdmins] = useState([]);
  const [loading, setloading] = useState<boolean>(false);
  const [delLoading, setDelLoading] = useState<string | null>(null);

  useEffect(() => {
    const getAllAdmins = async () => {
      try {
        setloading(true);
        const token = localStorage.getItem('superAdminToken');
        if (!token) {
          return;
        }

        const headers = {
          token: token,
        };

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admins/getAllAdmins`,
          {
            method: 'GET',
            headers: headers,
          },
        );

        const admins = await response.json();
        setAdmins(admins);
        setloading(false);
      } catch (err) {

        setloading(false);
        throw err;
      }
    };

    getAllAdmins();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('superAdminToken');
      if (!token) {
        return;
      }
      setDelLoading(id); 
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admins/deletAdmin/${id}`,
        {
          headers: {
            token: token,
          },
        },
      );
      setAdmins((prevAdmins) =>
        prevAdmins.filter((admin: AdminRecord) => admin._id !== id),
      );
    } catch (error) {
      throw error
    } finally {
      setDelLoading(null);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: AdminRecord) => `${record.fullname}`,
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
      title: 'Can Delete Category',
      dataIndex: 'canDeleteCategory',
      key: 'canDeleteCategory',
      render: (text: string, record: AdminRecord) => (
        <span>{record.canDeleteCategory ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: AdminRecord) =>
        delLoading === record._id ? ( 
          <Loader />
        ) : (
          <RiDeleteBin6Line
            className="cursor-pointer text-red-500 dark:text-red-700"
            size={20}
            onClick={() => handleDelete(record._id)}
          />
        ),
    },
  ];

  return (
    <div>
      {loading ? (
        <div className="flex justify-center mt-10">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-4">
            <p>Admins</p>
            <div>
              <Button
                type="primary"
                className="cursor-pointer p-2 hover:bg-slate-300 dark:border-strokedark dark:bg-boxdark flex justify-center"
                onClick={() => setselecteMenu('Add Admin')}
              >
                Add New Admin
              </Button>
            </div>
          </div>
          {admins && admins.length > 0 ? (
            <Table dataSource={admins} columns={columns} pagination={false} />
          ) : (
            <div className="flex justify-center"> No Admin found</div>
          )}
        </>
      )}
    </div>
  );
}

export default Admins;

'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Loader from 'components/Loader/Loader';
import Toaster from 'components/Toaster/Toaster';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { LabelInput } from '../ui/label-input';
//eslint-disable-next-line
const AddAdmin = ({ setselecteMenu }: any) => {
  const [error, setError] = useState<string | null | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    canAddProduct: false,
    canDeleteProduct: false,
    canAddCategory: false,
    canDeleteCategory: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('superAdminToken');
    if (!token) {
      return;
    }
    setLoading(true);
 
    if (!formData.fullname || !formData.email || !formData.password)
      return setError('All fields are required');
    try {
      const user = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admins/createAdmin`,
        formData,
        {
          headers: {
            token: token,
          },
        },
      );
      Toaster('success', 'Admin user has been sucessufully Created !');
      if (user) {
        setFormData({
          fullname: '',
          email: '',
          password: '',
          canAddProduct: false,
          canDeleteProduct: false,
          canAddCategory: false,
          canDeleteCategory: false,
        });
      }
    } catch (err) {
     
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else {
        setError(JSON.stringify(err));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-sm m-auto p-2 sm:p-10 md:p-20 mt-10">
        <p
          className="text-2xl font-black mb-4 flex items-center justify-center gap-2
       hover:bg-gray-200 w-fit p-2 cursor-pointer"
          onClick={() => {
            setselecteMenu('AllAdmins');
          }}
        >
          {' '}
          <IoMdArrowRoundBack /> Back
        </p>
        <h3 className="text-center mb-10 text-xl">Create New Admin</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <LabelInput
            type="text"
            name="fullname"
            placeholder="Enter Full Name"
            label="First Name"
            value={formData.fullname}
            onChange={handleChange}
            id="fullname"
          />

          <LabelInput
            type="email"
            name="email"
            placeholder="Email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            id="email"
          />
          <LabelInput
            type="password"
            name="password"
            placeholder="Enter Password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            id="password"
          />
          <div className="flex items-center justify-between w-[250px]">
            <label htmlFor="canAddProduct">Can Add Product</label>

            <LabelInput
              type="checkbox"
              name="canAddProduct"
              checked={formData.canAddProduct}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prevData) => ({
                  ...prevData,
                  canAddProduct: e.target.checked,
                }))
              }
              id="canAddProduct"
            />
          </div>

          <div className="flex items-center justify-between w-[250px]">
            <label htmlFor="canDeleteProduct">Can Delete Category</label>

            <LabelInput
              type="checkbox"
              name="canDeleteProduct"
              checked={formData.canDeleteProduct}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prevData) => ({
                  ...prevData,
                  canDeleteProduct: e.target.checked,
                }))
              }
              id="canDeleteProduct"
            />
          </div>

          <div className="flex items-center justify-between w-[250px]">
            <label htmlFor="canAddCategory">Can Add Category</label>

            <LabelInput
              type="checkbox"
              name="canAddCategory"
              checked={formData.canAddCategory}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prevData) => ({
                  ...prevData,
                  canAddCategory: e.target.checked,
                }))
              }
              id="canAddCategory"
            />
          </div>

          <div className="flex items-center justify-between w-[250px]">
            <label htmlFor="canDeleteCategory">Can Delete Category</label>
            <LabelInput
              type="checkbox"
              name="canDeleteCategory"
              checked={formData.canDeleteCategory}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prevData) => ({
                  ...prevData,
                  canDeleteCategory: e.target.checked,
                }))
              }
              id="canDeleteCategory"
            />
          </div>

          {error ? (
            <div className="flex justify-center text-red-600">{error}</div>
          ) : null}
          <div className="flex flex-col justify-center items-center space-y-3 lg:pt-8">
            <button
              className="bg-black text-white p-3 rounded-none w-full md:w-28"
              type="submit"
            >
              {loading ? <Loader color="#fff" /> : 'Create'}{' '}
            </button>
          </div>
        </form>
    </div>
  );
};

export default AddAdmin;

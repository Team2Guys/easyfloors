'use client';

import React, { useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import Toaster from 'components/Toaster/Toaster';
import { useAppDispatch } from 'components/Others/HelperRedux';
import { loggedInAdminAction } from 'redux/slices/Admin/AdminsSlice';
import USRcomponent from 'components/userComponent/userComponent';
import { IoIosLock, IoMdMail } from 'react-icons/io';
import NoneAuth from 'hooks/None-AuthHook';

import Cookies from 'js-cookie';

const DashboardLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const intialvalue = {
    email: '',
    password: '',
  };

  const handleChange = (e: any) => { //eslint-disable-line
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [formData, setFormData] = useState(intialvalue);

  const [error, setError] = useState<string | null | undefined>();
  const [loading, setloading] = useState<boolean | null | undefined>(false);
  const [adminType, setadminType] = useState<string | undefined>('Admin');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!formData.email || !formData.password) {
      return setError('All fields are rquired');
    }
    try {
      setloading(true);
      const url =
        adminType == 'Admin'
          ? '/api/admin/login'
          : '/api/admin/superadmin-login';

      const user = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + url,
        formData,
      );
      console.log(user.data, 'user');
      setloading(false);
      dispatch(loggedInAdminAction(user.data.user));

      Cookies.set(
        adminType == 'Admin' ? '2guysAdminToken' : 'superAdminToken',
        user.data.token,
        {
          expires: 24 * 60 * 60 * 1000,
        },
      );

      setFormData(intialvalue);
      Toaster('success', 'You have sucessfully login');

      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (err: any) { //eslint-disable-line
      console.log(err, 'err');
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setloading(false);
    }
  };

  const inputFields = [
    {
      type: 'email',
      name: 'email',
      id: 'email',
      placeholder: 'Email',
      value: formData.email,
      onChange: handleChange,
      Icon: IoMdMail,
      iconClassName: 'text-red-500',
    },
    {
      type: 'password',
      name: 'password',
      id: 'password',
      placeholder: 'Enter Password',
      value: formData.password,
      onChange: handleChange,
      Icon: IoIosLock,
      iconClassName: 'text-red-500',
    },
  ];

  return (
    <div>
        <USRcomponent
          handleSubmit={handleSubmit}
          error={error}
          loading={loading}
          inputFields={inputFields}
          title="Sign In as Admin"
          buttonTitle="Sign In"
          setadminType={setadminType}
          adminType={adminType}
        />
    </div>
  );
};

export default NoneAuth(DashboardLogin);

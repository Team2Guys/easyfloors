'use client';

import React, { useState } from 'react';


import { useRouter } from 'next/navigation';
import Toaster from 'components/Toaster/Toaster';
import { useAppDispatch } from 'components/Others/HelperRedux';
import { loggedInAdminAction } from "../../../../redux/slices/Admin/AdminsSlice";
import USRcomponent from 'components/userComponent/userComponent';
import { IoIosLock, IoMdMail } from 'react-icons/io';
import NoneAuth from 'hooks/None-AuthHook'
import { useMutation } from '@apollo/client';
import { ADMIN_LOGIN } from 'graphql/mutations';
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

  const [loginError, setError] = useState<string | null | undefined>();
  const [adminType, setadminType] = useState<string | undefined>('Admin');

  const [adminLogin, {loading}] = useMutation(ADMIN_LOGIN);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!formData.email || !formData.password) {
      return setError('All fields are rquired');
    }
    try {

      const {email, password} = formData

      const url =
        adminType == 'Admin'
          ? '/api/admin/login'
          : '/api/admin/superadmin-login';

          const response = await adminLogin({
            variables: { email, password },
          });
      dispatch(loggedInAdminAction(response.data.adminLogin));
      Cookies.set(
        adminType == 'Admin' ? '2guysAdminToken' : 'superAdminToken',
        response.data.adminLogin.token,
        {
          expires: 24 * 60 * 60 * 1000,
        },
      );
      console.log(url, "url") //eslint-disable-line

      setFormData(intialvalue);
      Toaster('success', 'You have sucessfully login');

      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (err: any) { //eslint-disable-line
    
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
      throw err;
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
          error={loginError}
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

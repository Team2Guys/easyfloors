'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useAppDispatch } from 'components/Others/HelperRedux';
import { loggedInAdminAction } from '../redux/slices/Admin/AdminsSlice';

export const useAdminAuthInit = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const adminToken = Cookies.get('admin_access_token');
    const superAdminToken = Cookies.get('super_admin_access_token');
    const userData = Cookies.get('loggedInUser');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        dispatch(loggedInAdminAction(parsedUser));
      } catch {
        console.error('Failed to parse loggedInUser from cookie');
      }
    } else if (adminToken || superAdminToken) {
      dispatch(loggedInAdminAction({
        token: adminToken || superAdminToken,
        role: adminToken ? 'Admin' : 'superAdmin',
        fullname: 'User',
      }));
    }
  }, [dispatch]);
};

'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from 'components/Others/HelperRedux';
import { loggedInAdminAction } from 'redux/slices/Admin/AdminsSlice';
import Cookies from 'js-cookie';
import { getAdminData } from 'components/serverActions/fetch';



//eslint-disable-next-line
function ProtectedRoute(WrappedComponent: any) {
  //eslint-disable-next-line
  const Wrapper = (props: any) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const AddminProfileTriggerHandler = async (token: string | undefined) => {
      try {
        const admin = await getAdminData(token)
        dispatch(loggedInAdminAction(admin));
      } catch (err) {
        Cookies.remove('2guysAdminToken');
        Cookies.remove('superAdminToken');
        router.push('/dashboard/Admin-login');
        return err
      }
    };
    useEffect(() => {
      const token = Cookies.get('admin_access_token');
      const superAdmintoken = Cookies.get('super_admin_access_token');
      const Finaltoken = superAdmintoken ? superAdmintoken : token;
      AddminProfileTriggerHandler(Finaltoken, );
    }, [router]);
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
}

export default ProtectedRoute;

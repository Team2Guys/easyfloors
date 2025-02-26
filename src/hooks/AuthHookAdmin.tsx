'use client';
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Loader from 'components/Loader/Loader';
// import { useAppDispatch } from 'components/Others/HelperRedux';
// import { loggedInAdminAction } from 'redux/slices/Admin/AdminsSlice';
// import axios from 'axios';
// import Cookies from 'js-cookie';


//eslint-disable-next-line
function ProtectedRoute(WrappedComponent: any) {
  //eslint-disable-next-line
  const Wrapper = (props: any) => {
    // const router = useRouter();
    // const [loading, setLoading] = useState<boolean>(false);
    // const dispatch = useAppDispatch();

    // const AddminProfileTriggerHandler = async (
    //   token: string | undefined,
    //   adminFlag: boolean,
    // ) => {
    //   try {
    //     // if (!token) {
    //     //   return router.push('/dashboard/Admin-login');
    //     // }

    //     // const apiEndpoint = adminFlag
    //     //   ? 'getSuperAdminHandler'
    //     //   : 'getAdminHandler';
    //     // const user: any = await axios.get(
    //     //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/${apiEndpoint}`,
    //     //   {
    //     //     headers: {
    //     //       Authorization: `Bearer ${token}`,
    //     //     },
    //     //   },
    //     // );
    //     // dispatch(loggedInAdminAction(user.data.user));
    //     // // router.push('/dashboard');
    //   } catch (err: any) {
    //     Cookies.remove('2guysAdminToken');
    //     Cookies.remove('superAdminToken');
    //     router.push('/dashboard/Admin-login');
    //     console.log(err, 'err');
    //   } finally {
    //     setTimeout(() => {
    //       setLoading(false);
    //     }, 1000);
    //   }
    // };

    // useEffect(() => {
    //   const token = Cookies.get('2guysAdminToken');
    //   const superAdmintoken = Cookies.get('superAdminToken');
    //   const Finaltoken = superAdmintoken ? superAdmintoken : token;

    //   AddminProfileTriggerHandler(Finaltoken, superAdmintoken ? true : false);
    // }, [router]);

    // if (loading) {
    //   return (
    //     <div
    //       style={{
    //         background: '#FFF',
    //         zIndex: 1111,
    //         alignItems: 'center',
    //         display: 'flex',
    //         height: '100vh',
    //         width: '-webkit-fill-available',
    //         justifyContent: 'center',
    //       }}
    //     >
    //       <Loader />
    //     </div>
    //   );
    // }
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
}

export default ProtectedRoute;

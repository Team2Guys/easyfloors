'use client';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Loader from 'components/Loader/Loader';
import Cookies from 'js-cookie';

function UseAuth(WrappedComponent: React.ComponentType<any>) {  //eslint-disable-line
  const Wrapper = (props: React.ComponentProps<typeof WrappedComponent>) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const usePathName = usePathname();
    useEffect(() => {
      const token = Cookies.get('user_token');
      if (token) {
        setLoading(false);
        router.push('/profile');
      } else {
        setLoading(false);
        if (usePathName === '/profile') {
          router.push('/login');
        }
      }
    }, [router]);

    if (loading) {
      return (
        <div
          style={{
            background: '#FFF',
            zIndex: 1111,
            alignItems: 'center',
            display: 'flex',
            height: '100vh',
            width: '-webkit-fill-available',
            justifyContent: 'center',
          }}
        >
          <Loader />
        </div>
      );
    } else {
      return <WrappedComponent {...props} />;
    }
  };

  return Wrapper;
}

export default UseAuth;

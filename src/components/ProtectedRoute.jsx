import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router';
import { getDecodedAccessToken } from '@/api/LocalStorage';

const ProtectedRoute = ({ children }) => {
  /**
   * 0 = Not tested yet.
   * -1 = No credible authentication
   * 1 = Authenticated
   */
  const navigation = useNavigate();
  const [auth, setAuth] = useState(0);

  useEffect(() => {
    getDecodedAccessToken().then((r) => {
      if ('error' in r) {
        setAuth(-1);
      } else {
        setAuth(1);
      }
    }).catch((e) => {
      console.error(e);
    });
  }, []);

  if (auth === 0) {
    // TODO: Add a loading screen here.
    return <div />;
  }
  if (auth === 1) {
    return <div>{children}</div>;
  }
  navigation('/auth/login');

  return <div />;
};

export default ProtectedRoute;

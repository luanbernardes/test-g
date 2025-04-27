import React from 'react';
import { useHasAuth } from '@/hooks/auth/hasAuth';
import { Navigate } from 'react-router-dom';
import LoadingPage from '@/pages/loading/Loading.page';

interface PropsWithAuth {
  children: React.ReactNode;
}

const WithAuth: React.FC<PropsWithAuth> = ({ children }) => {
  const { data, loading } = useHasAuth();

  return (
    <>
      <>{loading && <LoadingPage />}</>
      <>{!loading && !data?.token && <Navigate to="/sign-in" />}</>
      <>{!loading && data?.token && <>{children}</>}</>
    </>
  );
};

export default WithAuth;

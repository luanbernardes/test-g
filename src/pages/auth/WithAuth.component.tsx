import React from 'react';
import { useHasAuth } from '@/hooks/auth/hasAuth';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '@/pages/loading/Loading.page';

interface PropsWithAuth {
  children: React.ReactNode;
}

const WithAuth: React.FC<PropsWithAuth> = ({ children }) => {
  const { data, loading } = useHasAuth();
  const navigate = useNavigate();

  if (loading) {
    return <LoadingPage />;
  }

  if (!loading && !data) {
    navigate('/sign-in');
    return <>not logged</>;
  }

  return <>{children}</>;
};

export default WithAuth;

import { reqresService } from '@/services';
import { useState, useTransition } from 'react';
import { HttpResponse } from '@/data/protocols/http';
import { LogoutResponse } from '@/@types/reqres';

export const useLogout = () => {
  const [data, setData] = useState<HttpResponse<LogoutResponse> | null>(null);
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function logout() {
    startTransition(async () => {
      try {
        const response = await reqresService.deleteTokenLocalStorage();

        setError(null);
        setData(response);
      } catch {
        setData(null);
        setError('Failed to logout');
      }
    });
  }

  return {
    data,
    loading,
    error,
    logout
  };
};

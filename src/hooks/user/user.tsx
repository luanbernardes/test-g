import { useEffect, useState, useTransition } from 'react';
import { reqresService } from '@/services';
import { GetUserResponse } from '@/@types/reqres';
import { HttpResponse } from '@/data/protocols/http';

export const useUser = (userId: number) => {
  const [data, setData] = useState<HttpResponse<GetUserResponse> | null>(null);
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startTransition(async () => {
      const token = await reqresService.getTokenLocalStorage();
      if (!token.body?.token) {
        setError('No token found');
        return;
      }

      try {
        const response = await reqresService.getUser(token.body.token, userId);
        if (!response?.body?.data) {
          setError('No get user found');
          return;
        }

        setData(response);
      } catch {
        setData(null);
        setError('Failed to sign up');
      }
    });
  }, [userId]);

  return {
    data: data?.body?.data,
    loading,
    error
  };
};

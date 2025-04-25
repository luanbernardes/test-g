import { useState, useEffect, useTransition } from 'react';
import { reqresService } from '@/services';
import { HttpResponse } from '@/data/protocols/http';
import { PostSignUpResponse } from '@/@types/reqres';

export const useHasAuth = () => {
  const [data, setData] = useState<HttpResponse<PostSignUpResponse> | null>(null);
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startTransition(async () => {
      try {
        const response = await reqresService.getTokenLocalStorage();
        setData(response);
      } catch {
        setError('Failed to get data');
      }
    });
  }, []);

  return {
    data: data?.body,
    loading,
    error
  };
};

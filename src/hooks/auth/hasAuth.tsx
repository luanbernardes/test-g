import { useState, useEffect } from 'react';
import { reqresService } from '@/services';
import { HttpResponse } from '@/data/protocols/http';
import { PostSignUpResponse } from '@/@types/reqres';

export const useHasAuth = () => {
  const [data, setData] = useState<HttpResponse<PostSignUpResponse> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await reqresService.getTokenLocalStorage();
        setData(response);
      } catch {
        setError('Failed to get data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    data: data?.body,
    loading,
    error
  };
};

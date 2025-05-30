import { useState, useTransition } from 'react';
import { reqresService } from '@/services';
import { HttpResponse } from '@/data/protocols/http';
import { PostSignInBody, PostSignInResponse } from '@/@types/reqres';

export const useSignIn = () => {
  const [data, setData] = useState<HttpResponse<PostSignInResponse> | null>(null);
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function postSignIn(body: PostSignInBody) {
    if (!body.email && !body.password) {
      setError('Email and Password required');
      return;
    }

    startTransition(async () => {
      try {
        const response = await reqresService.postSignIn(body);
        if (response?.body) {
          await reqresService.postTokenLocalStorage(response.body.token);
        }
        setError(null);
        setData(response);
      } catch {
        setData(null);
        setError('Failed to login');
      }
    });
  }

  return {
    data: data?.body,
    loading,
    error,
    postSignIn
  };
};

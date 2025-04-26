import { reqresService } from '@/services';
import { useState, useTransition } from 'react';
import { PostUserBody, PostUserResponse } from '@/@types/reqres';
import { HttpResponse } from '@/data/protocols/http';

export const useAddUser = () => {
  const [data, setData] = useState<HttpResponse<PostUserResponse> | null>(null);
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function addUser(user: PostUserBody) {
    startTransition(async () => {
      const token = await reqresService.getTokenLocalStorage();
      if (!token.body?.token) {
        setError('No token found');
        return;
      }

      try {
        const response = await reqresService.postUser(token.body.token, user);

        setData(response);
        setError(null);
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
    addUser
  };
};

import { useEffect, useState, useTransition } from 'react';
import { reqresService } from '@/services';
import { GetUsersResponse, User } from '@/@types/reqres';
import { HttpResponse } from '@/data/protocols/http';

export const useUsers = () => {
  const [data, setData] = useState<HttpResponse<GetUsersResponse> | null>(null);
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    startTransition(async () => {
      const token = await reqresService.getTokenLocalStorage();
      if (!token.body?.token) {
        setError('No token found');
        return;
      }

      try {
        const response = await reqresService.getUsers(token.body.token, page);
        if (!response?.body?.data) {
          setError('No get users found');
          return;
        }

        setData(response);
      } catch {
        setData(null);
        setError('Failed to sign up');
      }
    });
  }, [page]);

  function goToPage(page: number) {
    setPage(page);
  }

  function update(user: User) {
    const newData = data?.body?.data.map((item) => {
      if (item.id === user.id) {
        return { ...item, ...user };
      }
      return item;
    });

    if (newData && data?.body) {
      setData({
        ...data,
        body: {
          ...data?.body,
          data: newData
        }
      });
    }
  }

  function deleteUser(userId: number) {
    const newData = data?.body?.data.filter((item) => item.id !== userId);

    if (newData && data?.body) {
      setData({
        ...data,
        body: {
          ...data?.body,
          data: newData
        }
      });
    }
  }

  return {
    data: data?.body?.data,
    pageSize: data?.body?.total_pages,
    loading,
    error,
    goToPage,
    update,
    deleteUser
  };
};

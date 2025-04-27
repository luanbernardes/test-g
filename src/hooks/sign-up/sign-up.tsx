import { useState, useTransition } from 'react';
import { reqresService } from '@/services';
import { HttpResponse } from '@/data/protocols/http';
import { PostSignUpFormData, PostSignUpResponse, PostSignUpBody } from '@/@types/reqres';

export const useSignUp = () => {
  const [data, setData] = useState<HttpResponse<PostSignUpResponse> | null>(null);
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function postSignUp(body: PostSignUpFormData) {
    if (!body.email && !body.password && !body.confirmPassword) {
      setError('Email and Password required');
      return;
    }

    if (body.password !== body.confirmPassword) {
      setError('Password and Confirm Password not match');
      return;
    }

    startTransition(async () => {
      try {
        const newBody: PostSignUpBody = {
          email: body.email,
          password: body.password
        };
        const response = await reqresService.postSignUp(newBody);

        if (response.body?.token) {
          await reqresService.postTokenLocalStorage(response.body.token);
        }

        setError(null);
        setData(response);
      } catch {
        setData(null);
        setError('Failed to sign up');
      }
    });
  }

  return {
    data: data?.body,
    loading,
    error,
    postSignUp
  };
};

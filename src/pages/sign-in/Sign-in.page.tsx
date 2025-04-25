import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import MainTemplate from '@/templates/main.template';
import { PostSignInBody } from '@/@types/reqres';
import { useSignIn } from '@/hooks/sign-in/sign-in';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [formData, setFormData] = useState<PostSignInBody>({
    email: '',
    password: ''
  });
  const { postLogin, loading, error, data } = useSignIn();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  function login(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    postLogin(formData);
  }

  useEffect(() => {
    if (!loading && !error && data?.token) {
      navigate('/');
    }
  }, [navigate, loading, error, data?.token]);

  return (
    <MainTemplate>
      <Typography variant="h4" gutterBottom>
        Sign In - Login
      </Typography>

      <form onSubmit={login}>
        <Box mb={2}>
          <TextField
            type="email"
            label="email"
            name="email"
            placeholder="email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Box>

        <Box mb={2}>
          <TextField
            type="password"
            label="password"
            name="password"
            placeholder="password"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Box>

        {error && (
          <Box mb={2}>
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          </Box>
        )}

        <Button variant="outlined" type="submit">
          login
        </Button>
      </form>
    </MainTemplate>
  );
};

export default SignInPage;

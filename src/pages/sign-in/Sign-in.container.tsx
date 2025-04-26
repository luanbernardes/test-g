import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import LoginTemplate from '@/templates/login.template';
import { PostSignInBody } from '@/@types/reqres';
import { useSignIn } from '@/hooks/sign-in/sign-in';
import { useNavigate } from 'react-router-dom';

const SignInContainer = () => {
  const navigate = useNavigate();
  const { postSignIn, loading, error, data } = useSignIn();
  const [formData, setFormData] = useState<PostSignInBody>({
    email: '',
    password: ''
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function login(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    postSignIn(formData);
  }

  useEffect(() => {
    if (!loading && !error && data?.token) {
      navigate('/');
    }
  }, [navigate, loading, error, data?.token]);

  return (
    <LoginTemplate>
      <Box mb={5}>
        <Typography variant="h4">Sign in</Typography>
      </Box>

      <form onSubmit={login}>
        <Box mb={2}>
          <TextField
            fullWidth
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
            fullWidth
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

        <Button variant="outlined" type="submit" loadingPosition="end" loading={loading}>
          log in
        </Button>
      </form>
    </LoginTemplate>
  );
};

export default SignInContainer;

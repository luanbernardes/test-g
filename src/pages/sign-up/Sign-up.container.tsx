import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import LoginTemplate from '@/templates/login.template';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from '@/hooks/sign-up/sign-up';
import { PostSignUpFormData } from '@/@types/reqres';

const SignUpContainer = () => {
  const navigate = useNavigate();
  const { postSignUp, loading, error, data } = useSignUp();
  const [formData, setFormData] = useState<PostSignUpFormData>({
    email: '',
    password: '',
    confirmPassword: ''
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function signUp(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    postSignUp(formData);
  }

  useEffect(() => {
    if (!loading && !error && data?.token) {
      navigate('/');
    }
  }, [navigate, loading, error, data?.token]);

  return (
    <LoginTemplate>
      <Box mb={5}>
        <Typography variant="h4">Sign up</Typography>
      </Box>

      <form onSubmit={signUp}>
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
            type="text"
            label="password"
            name="password"
            placeholder="password"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Box>

        <Box mb={2}>
          <TextField
            fullWidth
            type="text"
            label="confirm password"
            name="confirmPassword"
            placeholder="confirmPassword"
            variant="outlined"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </Box>

        {error && (
          <Box mb={2}>
            <Typography component={'h5'} variant="body1" color="error">
              {error}
            </Typography>
          </Box>
        )}

        <Button
          variant="outlined"
          type="submit"
          loadingPosition="end"
          aria-label={'sign-up'}
          loading={loading}
        >
          sign up
        </Button>
      </form>
    </LoginTemplate>
  );
};

export default SignUpContainer;

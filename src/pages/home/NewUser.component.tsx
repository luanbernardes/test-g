import React, { useState } from 'react';
import { Box, Button, Grid2, TextField, Typography } from '@mui/material';
import { useAddUser } from '@/hooks/user/useAddUser';
import { PostUserBody } from '@/@types/reqres';

export default function AddNewUserComponent() {
  const { addUser, loading, data } = useAddUser();
  const [formData, setFormData] = useState<PostUserBody>({
    name: '',
    job: ''
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    addUser(formData);
    setFormData({
      name: '',
      job: ''
    });
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%'
      }}
    >
      <Typography variant="h6">Add New User</Typography>

      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
        </Box>

        <Box mb={2}>
          <TextField
            label="Job"
            name="job"
            value={formData.job}
            onChange={handleChange}
            fullWidth
            required
          />
        </Box>

        {data && (
          <Box mb={2}>
            <Typography variant="body1" color={'success'}>
              User added successfully!
            </Typography>
          </Box>
        )}

        <Grid2 container justifyContent={'end'}>
          <Button variant="outlined" type="submit" loadingPosition="end" loading={loading}>
            Add new user
          </Button>
        </Grid2>
      </form>
    </Box>
  );
}

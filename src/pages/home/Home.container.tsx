import MainTemplate from '@/templates/main.template';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid2,
  Modal,
  Pagination,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useUsers } from '@/hooks/user/users';
import { useUser } from '@/hooks/user/user';
import { useLogout } from '@/hooks/sign-up/logout';
import UserComponent from '@/pages/home/User.component';
import { useNavigate } from 'react-router-dom';
import { User } from '@/@types/reqres';
import AddNewUserComponent from '@/pages/home/NewUser.component';

const HomeContainer = () => {
  const { data: userData } = useUser(1);
  const { logout } = useLogout();
  const { error, loading, data, pageSize, goToPage, update, deleteUser } = useUsers();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function paginationChange(_: React.ChangeEvent<unknown>, value: number) {
    goToPage(value);
  }
  function handleLogout() {
    logout();
    navigate('/sign-in');
  }
  function userChange(newValue: User) {
    update(newValue);
  }
  function deleteUserHandle(userId: number) {
    deleteUser(userId);
  }
  function addUserHandle() {
    handleOpen();
  }

  return (
    <MainTemplate>
      <Box mb={4}>
        <Typography component="h1" variant="h4">
          Dashboard
        </Typography>
      </Box>

      {userData && (
        <Grid2 container justifyContent={'space-between'} alignItems="center">
          <Typography variant="h6">
            Hello {userData.first_name} {userData.last_name}!
          </Typography>

          <Button onClick={handleLogout}>logout</Button>
        </Grid2>
      )}

      <Card>
        <CardContent>
          <div style={{ minHeight: '580px' }}>
            {loading && (
              <Grid2
                container
                direction={'column'}
                justifyContent="center"
                alignContent="center"
                padding={2}
              >
                <Grid2>
                  <CircularProgress />
                </Grid2>
              </Grid2>
            )}

            {!loading && !error && data && (
              <>
                {data.map((user) => (
                  <div key={user.id}>
                    <UserComponent
                      user={user}
                      userChange={userChange}
                      deleteUser={deleteUserHandle}
                    />
                  </div>
                ))}
              </>
            )}
          </div>

          <Grid2>
            <Grid2 container justifyContent={'center'} pb={3}>
              <Pagination count={pageSize} color="primary" onChange={paginationChange} />
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>

      <Grid2 container justifyContent={'end'} paddingTop={2}>
        <Button variant="contained" onClick={addUserHandle} aria-label="add-new-user">
          Add new user
        </Button>
      </Grid2>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2
          }}
        >
          <AddNewUserComponent />
        </Box>
      </Modal>
    </MainTemplate>
  );
};

export default HomeContainer;

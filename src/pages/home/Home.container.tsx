import MainTemplate from '@/templates/main.template';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid2,
  Pagination,
  Typography
} from '@mui/material';
import React from 'react';
import { useUsers } from '@/hooks/user/users';
import { useUser } from '@/hooks/user/user';
import { useLogout } from '@/hooks/sign-up/logout';
import UserComponent from '@/pages/home/User.component';
import { useNavigate } from 'react-router-dom';
import { User } from '@/@types/reqres';

const HomeContainer = () => {
  const { data: userData } = useUser(1);
  const { logout } = useLogout();
  const { error, loading, data, pageSize, goToPage, update, deleteUser } = useUsers();
  const navigate = useNavigate();

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

  return (
    <MainTemplate>
      <Box mb={4}>
        <Typography variant="h4">Dashboard</Typography>
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
    </MainTemplate>
  );
};

export default HomeContainer;

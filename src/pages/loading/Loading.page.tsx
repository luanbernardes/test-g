import React from 'react';

import { CircularProgress, Container, Grid2 } from '@mui/material';

const LoadingPage: React.FC = () => {
  return (
    <Grid2
      container
      spacing={3}
      direction={'column'}
      height={'100vh'}
      justifyContent="center"
      alignContent="center"
    >
      <Grid2>
        <Container>
          <CircularProgress />
        </Container>
      </Grid2>
    </Grid2>
  );
};

export default LoadingPage;

import React from 'react';
import { Box, Container, Grid2 } from '@mui/material';

interface MainTemplateProps {
  children: React.ReactNode;
}

const MainTemplate = ({ children }: MainTemplateProps) => {
  return (
    <Grid2 container spacing={3} direction={'column'} height={'100vh'}>
      <Grid2>
        <Container>
          <Box pt={2} pb={4}>
            {children}
          </Box>
        </Container>
      </Grid2>
    </Grid2>
  );
};

export default MainTemplate;

import React from 'react';
import { Container, Grid2 } from '@mui/material';

interface MainTemplateProps {
  children: React.ReactNode;
}

const MainTemplate = ({ children }: MainTemplateProps) => {
  return (
    <Grid2 container spacing={3} direction={'column'} height={'100vh'}>
      <Grid2>
        <Container>{children}</Container>
      </Grid2>
    </Grid2>
  );
};

export default MainTemplate;

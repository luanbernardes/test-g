import React from 'react';
import { Card, CardContent, Grid2 } from '@mui/material';

interface MainTemplateProps {
  children: React.ReactNode;
}

const LoginTemplate = ({ children }: MainTemplateProps) => {
  return (
    <Grid2 container style={{ minHeight: '100vh' }} justifyContent="center" alignItems="center">
      <Grid2>
        <Card sx={{ width: 400, maxWidth: '100%' }}>
          <CardContent>{children}</CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default LoginTemplate;

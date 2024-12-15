// src/components/elements/auth/SuccessPage.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const SuccessPage = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Typography variant="h4">Вы вошли!</Typography>
    </Box>
  );
};

export default SuccessPage;

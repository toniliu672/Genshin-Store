import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1a1a1a',
        color: '#d3d3d3',
        padding: '16px',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} by Aaron Ryota. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

import React from 'react';
import {Grid, Typography, Box} from '@mui/material';

const Footer = () => {
  return (
    <footer>
      <Grid 
        container component="main" 
        sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        backgroundColor: '#240330',
      }}>
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 4,
          width: '100%',
          p: 2,
          backgroundColor: '#240330',
        }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', color: 'white'}}>
            Mike's Music Review Site
          </Typography>
        </Box>
      </Grid>
    </footer>
  );
};

export default Footer;


import React from 'react';
import { Grid, Box } from '@mui/material';
import Register from '../components/Auth/Register';
import registerImage from '../assets/caracal.jpeg';

const RegisterPage = () => {
  return (
    <Grid container component="main" sx={{ height: '100vh', margin: 0, padding: 0 }}>
      <Grid
        item
        xs={12}
        sx={{
          backgroundImage: `url(${registerImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(4px)',
          height: '100vh',
          position: 'absolute',
          width: '100%',
          zIndex: -1,
        }}
      />
      <Grid 
        item 
        xs={12} 
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: '100vh', zIndex: 1 }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '450px',
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          <Register />
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;

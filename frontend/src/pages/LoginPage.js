import React, { useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import Login from '../components/Auth/Login';
import loginImage from '../assets/caracal.jpeg';
import { useLocation } from 'react-router-dom';

const LoginPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.alert) {
      alert(location.state.alert);
    }
  }, [location]);

  return (
    <Grid container component="main" sx={{ height: '100vh', margin: 0, padding: 0 }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage: `url(${loginImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.5)',
        }}
      />
      <Grid 
        item 
        xs={12} 
        sm={8} 
        md={6} 
        component={Box} 
        elevation={6} 
        square
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4,
          backgroundColor: '#E4DEE7',
          boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.5)',
          m: 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '450px'
          }}
        >
          <Login />
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;

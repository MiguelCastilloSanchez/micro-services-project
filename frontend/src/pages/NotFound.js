import React from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';

const NotFound = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleNavigation = () => {
    if (isAuthenticated) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#E4DEE7',
        minHeight: '100vh',
        py: 4,
        px: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <SentimentVeryDissatisfiedIcon sx={{ fontSize: 80, color: '#333' }} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" component="div" gutterBottom>
            404 - Page Not Found
          </Typography>
          <Typography variant="body1" component="p">
            We're sorry, the page you are looking for does not exist.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={isAuthenticated ? <HomeIcon /> : <LoginIcon />}
            onClick={handleNavigation}
          >
            {isAuthenticated ? 'Go to Home' : 'Go to Login'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NotFound;

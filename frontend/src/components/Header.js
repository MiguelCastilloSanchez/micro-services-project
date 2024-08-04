import React from 'react';
import { Link } from 'react-router-dom';
import {Grid, Typography, Box, IconButton } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  return (
    <header>
      <Grid 
        container component="main" 
        sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        backgroundColor: '#E4DEE7',
        m: 0,
      }}>
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 4,
          width: '100%',
          p: 2,
          borderRadius: 6,
          backgroundColor: 'white',
          boxShadow: '0px 0px 20px 2px rgba(0,0,0,0.3)',
        }}
        >
          <IconButton 
            sx={{
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.2)',
              },
              '&:active': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <ListIcon sx={{ fontSize: 30 }}/>
          </IconButton>
          <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>
            Mike's Review Site
          </Typography>
          <IconButton
            sx={{
              scale: 10,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.2)',
              },
              '&:active': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <AccountCircleIcon sx={{ fontSize: 30 }}/>
          </IconButton>
        </Box>
      </Grid>
    </header>
  );
};

export default Header;

import React , {useState} from 'react';
import {Grid, Typography, Box, IconButton, Drawer } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfilePage from '../pages/ProfilePage';

const Header = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

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
          borderRadius: 10,
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
          <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold', color: '#292929' }}>
            Mike's Review Site
          </Typography>
          <IconButton
            onClick={toggleDrawer(true)}
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
      <Drawer 
        open={open} 
        onClose={toggleDrawer(false)}
        anchor={'right'}
      >
        <ProfilePage/>
      </Drawer>
    </header>
  );
};

export default Header;

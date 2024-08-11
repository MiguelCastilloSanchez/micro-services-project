import React from 'react';
import {Grid, Typography, Box} from '@mui/material';
import CopyrightIcon from '@mui/icons-material/Copyright';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

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
          gap: 1,
          width: '100%',
          p: 2,
          backgroundColor: '#240330',
        }}
        >
          <CopyrightIcon sx={{ fontSize: 30, color: 'white' }}/>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'white'}}>
            Mike's Music Review Site
          </Typography>
        </Box>
      </Grid>
    </footer>
  );
};

export default Footer;


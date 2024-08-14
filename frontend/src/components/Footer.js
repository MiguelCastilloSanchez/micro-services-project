import React from 'react';
import { Grid, Typography, Box, IconButton } from '@mui/material';
import CopyrightIcon from '@mui/icons-material/Copyright';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <footer>
      <Grid 
        container 
        sx={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
          backgroundColor: '#240330',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <CopyrightIcon sx={{ fontSize: 30 }} />
            <Typography variant="h6">
              Mike's Music Review Site
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              mt: 2,
            }}
          >
            <IconButton href="https://github.com/MiguelCastilloSanchez" target="_blank" rel="noopener noreferrer">
              <GitHubIcon sx={{ fontSize: 30, color: 'white' }} />
            </IconButton>
            <IconButton href="https://www.linkedin.com/in/miguel-castillo-634a60255/" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon sx={{ fontSize: 30, color: 'white' }} />
            </IconButton>
            <IconButton href="https://www.instagram.com/mike.castillo125/" target="_blank" rel="noopener noreferrer">
              <InstagramIcon sx={{ fontSize: 30, color: 'white' }} />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;

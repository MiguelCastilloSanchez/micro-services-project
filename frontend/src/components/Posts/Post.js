import React, { useState } from 'react';
//import { login } from '../../api/posts';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';

const Post = () => {

  return (
    <Grid
    sx={{ 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: '50%',
        boxShadow: '10px 10px 20px 2px rgba(0,0,0,0.4)',
        }}
    >
        <Grid
          sx={{ 
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '40%'
            }}
        >

          <Grid
            sx={{ 
              justifyContent: 'center',
              alignItems: 'center',
              width: '18%',
              height: '100%',
              }}
          >
            
          </Grid>


          <Grid
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '82%',
            height: '100%'
            }}
          >

            <Grid
            sx={{ 
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'left',
              alignItems: 'center',
              width: '100%',
              height: '50%'
              }}
            >
              
            </Grid>


            <Grid
            sx={{ 
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'left',
              alignItems: 'center',
              width: '100%',
              height: '50%'
              }}
            >
              
            </Grid>

          </Grid>
        </Grid>


        <Grid
          sx={{ 
            justifyContent: 'left',
            alignItems: 'center',
            width: '100%',
            height: '60%'
            }}
        >
          
        </Grid>

    </Grid>
  );
};

export default Post;

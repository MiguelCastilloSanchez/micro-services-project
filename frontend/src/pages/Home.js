import React, { useState, useEffect } from 'react';
import {Grid, Typography, Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddPost from '../components/Posts/AddPost'

const Home = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
    if (!savedToken) {
      navigate('/login', { state: { alert: 'Please log in to enter.' } });
    }
  }, [navigate]);

  return (
    <div>
      <Grid 
        container component="main" 
        sx={{ 
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
          backgroundColor: '#E4DEE7',
          m: 0,
          height: '100vh', 
        }}>
        <Grid
          item
          xs={12} 
          sm={6}
          md={7.6}
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2,
            backgroundColor: 'white',
            borderRadius: 1,
            boxShadow: 'inset 0px 0px 20px 2px rgba(0,0,0,0.5)',
            height: '90vh'
          }}>        
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', color: 'Black'}}>
              Mike's Music Review Site
          </Typography>
        </Grid>
        <Grid
          item 
          xs={false}
          sm={1} 
          md={0.4}>
        </Grid>
        <Grid
          item 
          xs={false}
          sm={5} 
          md={3.3}
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2,
            backgroundColor: 'white',
            borderRadius: 1,
            boxShadow: 'inset 0px 0px 20px 2px rgba(0,0,0,0.5)',
            height: '90vh',
          }}>
          <AddPost/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;


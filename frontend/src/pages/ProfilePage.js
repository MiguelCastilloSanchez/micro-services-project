import React, { useState, useEffect } from 'react';
import Profile from '../components/Auth/Profile';
import {Grid} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
    if (!savedToken) {
      navigate('/login', { state: { alert: 'Please log in' } });
    }
  }, [navigate]);

  return (
    <div>
      <Grid 
      container component="main" 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        m: 0,
        backgroundColor: '#E4DEE7',
        height: '100vh',
        width: '400px',
      }}>
        <Profile token={token} />
      </Grid>
    </div>
  );
};

export default ProfilePage;

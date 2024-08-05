import React, { useState } from 'react';
import UpdatePassword from './UpdatePassword';
import { logout, deleteUser } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Grid } from '@mui/material';

const Profile = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(token);
      localStorage.removeItem('token');
      setToken(null);
      navigate('/login');
    } catch (err) {
      navigate('/login');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(token);
      localStorage.removeItem('token');
      setToken(null);
      navigate('/login');
    } catch (err) {
      navigate('/login');
    }
  };

  const handleLogoutOnPasswordChange = () => {
    setToken(null);
  };

  return (
    <div>
      {token ? (
        <Grid
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
          m: 0,
          gap: 4,
        }}>
        <>
          <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>My Profile</Typography>
          <UpdatePassword token={token} onLogout={handleLogoutOnPasswordChange} />
          <Button onClick={handleLogout} variant="contained" color="primary" sx={{ backgroundColor: 'white', width: '180px', color: 'black' }}>
            Logout
          </Button>
          <Button onClick={handleDelete} variant="contained" color="primary" sx={{ backgroundColor: 'White', color: 'Blue', width: '180px' }}>
            Delete account
          </Button>
        </>
        </Grid>
      ) : (
        <Typography color="error">{'User not logged'}</Typography>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Profile;

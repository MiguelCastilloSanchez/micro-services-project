import React, { useState, useEffect } from 'react';
import UpdatePassword from './UpdatePassword';
import { logout, deleteUser } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Grid, Avatar, StyledBadge } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const username = decodedToken.sub;
      setUsername(username);
    }
  }, []);

  const getInitial = (name) => {
    if (name) {
      return name.charAt(0).toUpperCase();
    }
    return '';
  };

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
          gap: 3,
        }}>
        <>
          <Avatar sx={{ width: 100, height: 100 }}>{getInitial(username)}</Avatar>
          <Typography variant="h5" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>{username}</Typography>
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

import React, { useState, useEffect } from 'react';
import UpdatePassword from './UpdatePassword';
import { logout, deleteUser, updateProfilePhoto } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Grid, IconButton, Badge, Box, Alert } from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';
import {jwtDecode} from 'jwt-decode';
import ProfileAvatar from './ProfileAvatar';

const Profile = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.sub);
    }
  }, [token]);

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

  const handleChangeProfilePhoto = async () => {
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    try {
      await updateProfilePhoto(token, selectedFile);
      setSelectedFile(null);
      setError('');
    } catch (err) {
      setError(err.response?.data || 'Error changing profile photo');
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleLogoutOnPasswordChange = () => {
    setToken(null);
  };

  return (
    <Box sx={{ p: 2 }}>
      {token ? (
        <Grid
          container
          direction="column"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <IconButton
                  size="small"
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: 0.5,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.2)',
                    },
                  }}
                  component="label"
                >
                  <BrushIcon sx={{ color: '#240330' }} />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </IconButton>
              }
            >
              <ProfileAvatar size="large" />
            </Badge>
          </Grid>

          {selectedFile && (
            <Grid item>
              <Button
                onClick={handleChangeProfilePhoto}
                variant="contained"
                color="primary"
                sx={{ backgroundColor: '#240330' }}
              >
                Upload Photo
              </Button>
            </Grid>
          )}

          <Grid item>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {username}
            </Typography>
          </Grid>

          <Grid item>
            <UpdatePassword token={token} onLogout={handleLogoutOnPasswordChange} />
          </Grid>

          <Grid item>
            <Button
              onClick={handleLogout}
              variant="contained"
              sx={{ backgroundColor: 'white', color: 'black', width: '180px' }}
            >
              Logout
            </Button>
          </Grid>

          <Grid item>
            <Button
              onClick={handleDelete}
              variant="contained"
              sx={{ backgroundColor: 'white', color: 'red', width: '180px' }}
            >
              Delete account
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Typography color="error">{'User not logged'}</Typography>
      )}
      {error && (
      <Alert severity="error">{error}</Alert>
      )}
    </Box>
  );
};

export default Profile;

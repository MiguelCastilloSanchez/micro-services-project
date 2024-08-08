import React, { useState, useEffect } from 'react';
import UpdatePassword from './UpdatePassword';
import { logout, deleteUser, updateProfilePhoto} from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Grid, IconButton} from '@mui/material';
import Badge from '@mui/material/Badge';
import BrushIcon from '@mui/icons-material/Brush';
import { jwtDecode } from 'jwt-decode';
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
      const username = decodedToken.sub;
      setUsername(username);
    }
  }, []);

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
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError('Error changing profile photo');
      }
    }
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
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
          }}
        >
          <>
            <Badge 
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <IconButton
                  size="small"
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '3px',
                    scale: 10,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.2)',
                    },
                    '&:active': {
                      transform: 'scale(1.1)',
                    },
                  }}
                  component="label"
                >
                  <BrushIcon sx={{color: '#240330'}} />
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
            {selectedFile && (
              <Button 
                onClick={handleChangeProfilePhoto}
                variant="contained"
                color="primary"
                sx={{ mt: 2, backgroundColor: '#240330' }}
              >
                Upload Photo
              </Button>
            )}
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

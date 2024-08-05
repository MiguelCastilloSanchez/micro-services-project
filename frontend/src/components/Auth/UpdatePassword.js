import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePassword, logout } from '../../api/auth';
import { TextField, Button, Typography, Box } from '@mui/material';

const UpdatePassword = ({ token, onLogout }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePassword(oldPassword, newPassword, token);
      await logout(token); 
      localStorage.removeItem('token');
      onLogout();
      navigate('/login');
    } catch (err) {
      setError('Error updating password');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
      }}
    >
      <Typography variant="h6">Change Password</Typography>
      <TextField
        label="Old Password"
        type="password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        fullWidth
      />
      <TextField
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        fullWidth
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: '#240330' }}>
        Change password
      </Button>
    </Box>    
  );
};

export default UpdatePassword;

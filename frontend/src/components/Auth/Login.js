import React, { useState } from 'react';
import { login } from '../../api/auth';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/home');
    } catch (err) {
      setError('Username or password incorrect, please try again');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        width: '100%',
        p: 4,
        borderRadius: 4,
        boxShadow: 20,
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>Reviews Site</Typography>
      <Typography variant="h5">Login</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      {error && (
      <Alert severity="error">{error}</Alert>
      )}
      <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: '#240330' }}>
        Log in
      </Button>
      <Typography variant="body2">
        Don’t have an account? <Link to="/register" style={{ color: '#240330' }}>Sign up here</Link>
      </Typography>
    </Box>
  );
};

export default Login;

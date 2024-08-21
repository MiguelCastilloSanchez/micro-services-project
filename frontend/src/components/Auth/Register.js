import React, { useState } from 'react';
import { register } from '../../api/auth';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !username || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      await register(username, password, email);
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError('Error registering user');
      }
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
      <Typography variant="h5" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>Register</Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
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
        Register
      </Button>
      <Typography variant="body2">
        Already have an account? <Link to="/login" style={{ color: '#240330' }}>Sign in here</Link>
      </Typography>
    </Box>
  );
};

export default Register;

import React, { useState } from 'react';
import UpdatePassword from './UpdatePassword';
import { logout, deleteUser } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
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
      setError('Error logging out');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(token);
      localStorage.removeItem('token');
      setToken(null);
      navigate('/login');
    } catch (err) {
      setError('Error deleting user');
    }
  };

  const handleLogoutOnPasswordChange = () => {
    setToken(null);
  };

  return (
    <div>
      <h1>Profile</h1>
      {token ? (
        <>
          <UpdatePassword token={token} onLogout={handleLogoutOnPasswordChange} />
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleDelete}>Delete Account</button>
        </>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ProfilePage;

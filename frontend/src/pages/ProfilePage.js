import React, { useState } from 'react';
import UpdateUsername from '../components/Auth/UpdateUsername';
import UpdatePassword from '../components/Auth/UpdatePassword';
import { logout, deleteUser } from '../api/auth';

const ProfilePage = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [error, setError] = useState('');

  const handleLogout = async () => {
    try {
      await logout(token);
      localStorage.removeItem('token');
      setToken(null);
      // Redirigir al login o a la página de inicio
    } catch (err) {
      setError('Error logging out');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(token);
      localStorage.removeItem('token');
      setToken(null);
      // Redirigir al login o a la página de inicio
    } catch (err) {
      setError('Error deleting user');
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      {token ? (
        <>
          <UpdateUsername token={token} />
          <UpdatePassword token={token} />
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


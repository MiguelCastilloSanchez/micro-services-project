import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateUsername from './UpdateUsername';
import UpdatePassword from './UpdatePassword';
import { logout, deleteUser } from '../../api/auth';

const Profile = ({ token }) => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(token);
      localStorage.removeItem('token');
      navigate('/login'); 
    } catch (err) {
      setError('Error logging out');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(token);
      localStorage.removeItem('token');
      navigate('/login'); 
    } catch (err) {
      setError('Error deleting user');
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <UpdateUsername token={token} />
      <UpdatePassword token={token} />
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleDelete}>Delete Account</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Profile;

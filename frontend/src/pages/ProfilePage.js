import React, { useState, useEffect } from 'react';
import Profile from '../components/Auth/Profile';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
    if (!savedToken) {
      navigate('/login', { state: { alert: 'Please log in to view your profile.' } });
    }
  }, [navigate]);

  return (
    <div>
      {token ? (
        <Profile token={token} />
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default ProfilePage;

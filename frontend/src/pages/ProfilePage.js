import React, { useState, useEffect } from 'react';
import Profile from '../components/Auth/Profile';

const ProfilePage = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
  }, []);

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

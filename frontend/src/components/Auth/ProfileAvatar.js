import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { getProfilePhoto } from '../../api/auth';

const ProfileAvatar = ({ size }) => {
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      try {
        const token = localStorage.getItem('token');
        const photoUrl = await getProfilePhoto(token);
        setProfilePhoto(photoUrl); 
      } catch (error) {
        console.error('Error fetching profile photo', error);
      }
    };

    fetchProfilePhoto();
  }, []);

  const avatarStyles = {
    width: size === 'large' ? 100 : 40,
    height: size === 'large' ? 100 : 40
  };

  return (
    <Avatar alt="Profile Photo" src={profilePhoto} style={avatarStyles} /> 
  );
};

export default ProfileAvatar;

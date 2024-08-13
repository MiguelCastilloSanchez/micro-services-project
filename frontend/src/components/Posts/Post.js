import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Avatar} from '@mui/material';
import { formatInTimeZone } from 'date-fns-tz';
import { getUserProfileById } from '../../api/auth';
import OptionsPost from './OptionsPost';
import LikesPost from './LikesPost';

const Post = ({ post }) => {
  const token = localStorage.getItem('token');
  const [error, setError] = useState('');
  const [userProfile, setUserProfile] = useState(null);

  const { id, artist, song, review, userId, createdAt } = post;

  const timeZone = 'America/Mexico_City';
  const formattedDate = formatInTimeZone(new Date(createdAt), timeZone, 'yyyy-MM-dd \'at\' HH:mm');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfileById(userId, token);
        setUserProfile(profile);
      } catch (error) {
        setError('Error fetching user profile');
      }
    };

    fetchUserProfile();
  }, [userId]);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 650,
        boxShadow: '0px 4px 10px rgba(0,0,0,0.5)',
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        margin: 'auto',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3} sm={2}>
          <Avatar
            sx={{ width: 56, height: 56 }}
            src={`data:image/jpeg;base64,${userProfile?.profilePhotoThumbnail}`}
            alt={userProfile?.username}
          />
        </Grid>
        <Grid item xs={7} sm={9}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '18px' }}>
            {userProfile ? userProfile.username : 'Loading...'}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: '14px' }}>
            {formattedDate}
          </Typography>
        </Grid>
        <Grid item xs={2} sm={1}>
          <OptionsPost token={token} id={id} />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Typography variant="body2" sx={{ fontSize: '16px' }}>
            Artist: {artist}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '16px' }}>
            Song: {song}
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="body1" sx={{ mt: 2 }}>
        {review}
      </Typography>

      <LikesPost token={token} postId={id} />
    </Box>
  );
};

export default Post;

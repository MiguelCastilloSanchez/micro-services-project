import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Box, Grid, Avatar, AvatarGroup, IconButton } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const Post = () => {
  const artist = 'Twenty One Pilots';
  const song = 'Addict With A Pen';
  const review = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.';

  return (
    <Box
      sx={{ 
        width: '100%',
        maxWidth: 500,
        boxShadow: '0px 4px 10px rgba(0,0,0,0.5)',
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        margin: 'auto',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3} sm={2}>
          <Avatar sx={{ width: 56, height: 56 }} />
        </Grid>
        <Grid item xs={9} sm={10}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '18px' }}>Username</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: '14px' }}>2H Ago</Typography>
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

      <Typography variant="body2" sx={{ fontSize: '16px', marginY: 2 }}>
        {review}
      </Typography>

      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '14px' }}>Agreed:</Typography>
          <AvatarGroup max={20}>
            <SmallAvatar />
            <SmallAvatar />
            <SmallAvatar />
          </AvatarGroup>
        </Grid>
        <Grid item>
          <IconButton
            sx={{
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.2)',
              },
              '&:active': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <ThumbUpOffAltIcon sx={{ fontSize: 25 }} />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Post;

import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Box, Grid, Avatar, AvatarGroup, IconButton, Menu, MenuItem, Alert } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {deletePost} from '../../api/posts'

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const Post = ({ post }) => {
  const token = localStorage.getItem('token');
  const [errorDelete, setErrorDelete] = useState('');
  const { artist, song, review, id } = post;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setErrorDelete('');
  };

  const handleDeletePost = async (e) => {
    e.preventDefault();

    try {
      await deletePost(id, token);
    } catch (err) {
      if (err.response && err.response.data) {
        setErrorDelete(err.response.data);
      } else {
        setErrorDelete('Error deleting post');
      }
    }
  };

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
          <Avatar sx={{ width: 56, height: 56 }} />
        </Grid>
        <Grid item xs={7} sm={9}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '18px' }}>Username</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: '14px' }}>2H Ago</Typography>
        </Grid>
        <Grid item xs={2} sm={1}>
          <IconButton
              onClick={handleOpenMenu}
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
            <MoreHorizIcon sx={{ fontSize: 25 }} />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            >
            <MenuItem onClick={handleDeletePost} sx={{color: 'red'}}>
              Delete Post
            </MenuItem>
            <MenuItem>
              {errorDelete && (
              <Alert severity="error">{errorDelete}</Alert>
              )}
            </MenuItem>
          </Menu>
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

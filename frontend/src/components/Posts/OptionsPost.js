import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Alert } from '@mui/material';
import { deletePost } from '../../api/posts';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const OptionsPost = ({ token, id, onDelete }) => {
  const [error, setError] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setError('');
  };

  const handleDeletePost = async (e) => {
    e.preventDefault();

    try {
      await deletePost(id, token);
      if (onDelete) {
        onDelete(id); // Notify the parent component about the deletion
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError('Error deleting post');
      }
    }
  };

  return (
    <Box>
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
        <MenuItem onClick={handleDeletePost} sx={{ color: 'red' }}>
          Delete Post
        </MenuItem>
        <MenuItem>
          {error && (
            <Alert severity="error">{error}</Alert>
          )}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default OptionsPost;

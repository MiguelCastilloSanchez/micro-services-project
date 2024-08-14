import React, { useState, useEffect } from 'react';
import { Grid, Avatar, AvatarGroup, Typography, IconButton } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { styled } from '@mui/material/styles';
import { like, unlike, getAllLikes } from '../../api/posts';
import { getUserProfileById } from '../../api/auth';
import { jwtDecode } from 'jwt-decode';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const LikesPost = ({ token, postId, onLikeChange }) => {
  const [currentUserId, setCurrentUserId] = useState('');
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setCurrentUserId(decodedToken.userId);
    }
  }, [token]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await getAllLikes(postId, token);
        const likesData = await Promise.all(
          response.data.map(async (userId) => {
            const userProfile = await getUserProfileById(userId, token);
            return {
              id: userId,
              username: userProfile.username,
              profilePhotoThumbnail: userProfile.profilePhotoThumbnail,
            };
          })
        );
        setLikes(likesData);
        setHasLiked(likesData.some(user => user.id === currentUserId));
      } catch (err) {
        setError('Error fetching likes data.');
      }
    };

    fetchLikes();
  }, [postId, token, currentUserId]);

  const handleLikeClick = async () => {
    try {
      if (hasLiked) {
        await unlike(postId, token);
      } else {
        await like(postId, token);
      }
      setHasLiked(!hasLiked);
      const response = await getAllLikes(postId, token);
      const likesData = await Promise.all(
        response.data.map(async (userId) => {
          const userProfile = await getUserProfileById(userId, token);
          return {
            id: userId,
            username: userProfile.username,
            profilePhotoThumbnail: userProfile.profilePhotoThumbnail,
          };
        })
      );
      setLikes(likesData);
      if (onLikeChange) {
        onLikeChange();
      }
    } catch (err) {
      setError('Error updating like status.');
    }
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '14px' }}>Agreed:</Typography>
        <AvatarGroup max={20}>
          {likes.map((likeUser, index) => (
            <SmallAvatar key={index} alt={likeUser.username} src={`data:image/jpeg;base64,${likeUser.profilePhotoThumbnail}`} />
          ))}
        </AvatarGroup>
      </Grid>
      <Grid item>
        <IconButton
          onClick={handleLikeClick}
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
          {hasLiked ? <ThumbUpIcon sx={{ fontSize: 25 }} /> : <ThumbUpOffAltIcon sx={{ fontSize: 25 }} />}
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default LikesPost;

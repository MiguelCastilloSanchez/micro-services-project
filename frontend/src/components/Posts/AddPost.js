import React, { useState } from 'react';
import { createPost } from '../../api/posts'
import { TextField, Button, Typography, Box, Container, Alert } from '@mui/material';

const AddPost = ({ token }) => {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [review, setReview] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    if (!artist || !song || !review) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await createPost(artist, song, review, token);
      setArtist('');
      setSong('');
      setReview('');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError('Error posting review.');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          mt: 1,
          p: 3,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h5" align="center" fontWeight="bold">
          Share your taste in music
        </Typography>

        <TextField
          label="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          fullWidth
          inputProps={{ maxLength: 40 }}
          helperText={`${artist.length}/40`}
        />

        <TextField
          label="Song"
          value={song}
          onChange={(e) => setSong(e.target.value)}
          fullWidth
          inputProps={{ maxLength: 40 }}
          helperText={`${song.length}/40`}
        />

        <TextField
          label="Your opinion..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          multiline
          rows={4}
          fullWidth
          inputProps={{ maxLength: 300 }}
          helperText={`${review.length}/300`}
        />

        {error && (
          <Alert severity="error">{error}</Alert>
        )}

        <Button type="submit" variant="contained" color="primary">
          Post it!
        </Button>
      </Box>
    </Container>
  );
};

export default AddPost;

import React, { useState } from 'react';
//import { login } from '../../api/posts';
import { TextField, Button, Typography, Box } from '@mui/material';

const AddPost = () => {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [review, setReview] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!artist || !song || !review) {
        setError('Please fill in all fields');
        return;
    }

    if (artist.length < 20) {
        setError('Artist must be 20 characters as max');
        return;
    }

    if (song.length < 20) {
        setError('Song must be 20 characters as max');
        return;
    }

    if (artist.length < 200) {
        setError('Your opinion cannot overpass 200 characters');
        return;
    }

    try {
        //await addReviewPost(artist, song, review);
    } catch (err) {
        if (err.response && err.response.data) {
          setError(err.response.data);
        } else {
          setError('Error posting review');
        }
      }
  };

  return (
    <Box
      component="form"
      onSubmit={NaN}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '90%',
        p: 0,
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>Share your taste in music</Typography>
      <TextField
        label="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        fullWidth
      />
      <TextField
        label="Song"
        value={song}
        onChange={(e) => setSong(e.target.value)}
        fullWidth
      />
      <TextField
        label="Your opinion..."
        value={review}
        multiline
        rows={8}
        onChange={(e) => setReview(e.target.value)}
      />
      {error && (
        <Typography color="error">{error}</Typography>
      )}
      <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: '#240330' }}>
        Post it!
      </Button>
    </Box>
  );
};

export default AddPost;

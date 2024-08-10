import React, { useState, useEffect } from 'react';
import { Grid, Box, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddPost from '../components/Posts/AddPost';
import Post from '../components/Posts/Post';
import { getAllPosts } from '../api/posts';

const Home = () => {
  const [token, setToken] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
    if (!savedToken) {
      navigate('/login', { state: { alert: 'Please log in to enter.' } });
    }
  }, [navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts(token);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (token) {
      fetchPosts();
    }
  }, [token]);

  return (
    <Box 
      sx={{
        backgroundColor: '#E4DEE7',
        minHeight: '100vh',
        py: 4,
        px: 2,
      }}
    >
      <Grid 
        container 
        spacing={2} 
        justifyContent="center"
        sx={{gap: 2}}
      >
        <Grid 
          item 
          xs={12} 
          md={7} 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: theme.shadows[3],
            p: 3,
            height: { xs: 'auto', md: '90vh' },
            overflowY: 'scroll',
            gap: 3,
          }}
        >
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </Grid>
        
        <Grid 
          item 
          xs={12} 
          md={4} 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: theme.shadows[3],
            p: 3,
            mt: { xs: 2, md: 0 },
            height: { xs: 'auto', md: '90vh' },
          }}
        >
          <AddPost token={token}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;

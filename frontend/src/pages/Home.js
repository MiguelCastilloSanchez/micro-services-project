import React, { useState, useEffect } from 'react';
import { Grid, Box, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddPost from '../components/Posts/AddPost';
import Post from '../components/Posts/Post';
import { useQueryClient, useInfiniteQuery } from 'react-query';
import { getAllPostsPaginated } from '../api/posts';

const Home = () => {
  const [token, setToken] = useState(null);
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const queryClient = useQueryClient();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (!savedToken) {
      navigate('/login', { state: { alert: 'Please log in to enter.' } });
    } else {
      setToken(savedToken);
    }
    setIsTokenLoaded(true);
  }, [navigate]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(
    'posts',
    async ({ pageParam = 1 }) => {
      const response = await getAllPostsPaginated(pageParam, token);
      return {
        posts: response.content,
        nextPage: response.pageable.pageNumber + 1 < response.totalPages ? response.pageable.pageNumber + 1 : undefined
      };
    },
    {
      enabled: !!token,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

  useEffect(() => {
    const handleScroll = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      if (scrollTop + clientHeight >= scrollHeight && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (!isTokenLoaded || isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Box
      sx={{
        backgroundColor: '#E4DEE7',
        minHeight: '100vh',
        py: 4,
        px: 2,
      }}
    >
      <Grid container spacing={2} justifyContent="center" sx={{ gap: 2 }}>
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
            overflowX: 'hidden', // Previene el desbordamiento horizontal
          }}
          className="scroll-container" // Añadir clase para selección en useEffect
        >
          {data?.pages.map((page) =>
            page.posts.map((post) => (
              <Post key={post.id} post={post} />
            ))
          )}
          {isFetchingNextPage && <div>Cargando más posts...</div>}
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
          <AddPost token={token} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;

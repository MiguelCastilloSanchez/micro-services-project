import React from 'react';
import { Grid, Box, useTheme } from '@mui/material';
import { useQueryClient, useInfiniteQuery } from 'react-query';
import AddPost from '../components/Posts/AddPost';
import Post from '../components/Posts/Post';
import { getAllPostsPaginated } from '../api/posts';

const Home = () => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const token = localStorage.getItem('token');

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(
    'posts',
    async ({ pageParam = 0 }) => {
      const response = await getAllPostsPaginated(pageParam, token);
      return {
        posts: response.content,
        nextPage:
          response.pageable.pageNumber + 1 < response.totalPages
            ? response.pageable.pageNumber + 1
            : undefined,
      };
    },
    {
      enabled: !!token,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (
      scrollTop + clientHeight >= scrollHeight &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  const handleDeletePost = (postId) => {
    // Invalidate queries to update the list of posts
    queryClient.invalidateQueries('posts');
  };

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
            overflowX: 'hidden',
          }}
          className="scroll-container"
          onScroll={handleScroll}
        >
          {data?.pages.map((page) =>
            page.posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onDelete={handleDeletePost} // Pass the delete handler to Post component
              />
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
          <AddPost token={token} onPostAdded={() => queryClient.invalidateQueries('posts')} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;

import axios from 'axios';

const API_URL = 'http://localhost:8080/posts';

export const createPost = async (artist, song, review, token) => {
  return axios.post(
    `${API_URL}/create`,
    { artist, song, review },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getAllPostsPaginated = async (page, token) => {
  if (!token) {
    throw new Error('No token provided');
  }
  const response = await axios.get(`${API_URL}/all-posts/${page}`,
    { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const getAllLikes = async (postId, token) => {
  return axios.get(`${API_URL}/all-likes/${postId}`,
    { headers: { Authorization: `Bearer ${token}` } });
}

export const deletePost = async (postId, token) => {
  return axios.delete(
    `${API_URL}/delete/${postId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const like = async (postId, token) => {
  const response = await axios.post(
    `${API_URL}/like/${postId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const unlike = async (postId, token) => {
  return axios.delete(`${API_URL}/unlike/${postId}`,
    { headers: { Authorization: `Bearer ${token}` } });
}
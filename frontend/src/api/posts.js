import axios from 'axios';

const API_URL = 'http://localhost:8080/posts';

export const createPost = async (artist, song, review, token) => {
  return axios.post(
    `${API_URL}/create`,
    { artist, song, review },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
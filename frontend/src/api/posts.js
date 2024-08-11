import axios from 'axios';

const API_URL = 'http://localhost:8080/posts';

export const createPost = async (artist, song, review, token) => {
  return axios.post(
    `${API_URL}/create`,
    { artist, song, review },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getAllPosts = async (token) => {
  return axios.get(`${API_URL}/all`, 
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export const deletePost = async (postId, token) => {
  return axios.delete(
    `${API_URL}/delete/${postId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
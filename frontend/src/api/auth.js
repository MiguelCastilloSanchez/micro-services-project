import axios from 'axios';

const API_URL = 'http://localhost:8080/user';

export const register = async (username, password, email) => {
  return axios.post(`${API_URL}/register`, { username, password, email });
};

export const login = async (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

export const updatePassword = async (oldPassword, newPassword, token) => {
  return axios.post(
    `${API_URL}/update-password`,
    { oldPassword, newPassword },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const updateProfilePhoto = async (token, file) => {
  const formData = new FormData();
  formData.append('file', file);

  return axios.post(`${API_URL}/upload-profile-photo`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const getProfilePhoto = async (token) => {
  const response = await axios.get(`${API_URL}/profile-photo`, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'blob'
  });
  return URL.createObjectURL(response.data);
}

export const logout = async (token) => {
  return axios.post(
    `${API_URL}/logout`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const deleteUser = async (token) => {
  return axios.delete(`${API_URL}/delete`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


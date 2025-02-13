import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Example API endpoint

export const fetchPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createPost = async (newPost) => {
  const response = await axios.post(API_URL, newPost);
  return response.data;
};

export const updatePost = async ({ id, updatedPost }) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedPost);
  return response.data;
};

export const deletePost = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};

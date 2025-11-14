import axios from 'axios';

// Substitua pela URL do seu backend no Render
const API_URL = 'https://slum-backend.onrender.com/api';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const getPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return [];
  }
};

export const createPost = async (postData) => {
  try {
    const response = await api.post('/posts', postData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar post:', error);
    throw error;
  }
};
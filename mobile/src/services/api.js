import axios from 'axios';

// SUA URL DO BACKEND NO RENDER
const API_URL = 'https://slum-backend.onrender.com/api';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

export const getPosts = async () => {
  try {
    console.log('📡 Buscando posts do PostgreSQL...');
    const response = await api.get('/posts');
    console.log('✅ Posts recebidos:', response.data.length);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar posts:', error.message);
    return [];
  }
};

export const createPost = async (postData) => {
  try {
    console.log('📤 Enviando post para PostgreSQL...', postData);
    const response = await api.post('/posts', postData);
    console.log('✅ Post criado com ID:', response.data.id);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao criar post:', error.message);
    throw error;
  }
};

export const getPostsByCategory = async (category) => {
  try {
    const response = await api.get(`/posts/category/${category}`);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar posts por categoria:', error.message);
    return [];
  }
};

export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('❌ Health check falhou:', error.message);
    return { status: 'Offline', database: 'Desconectado' };
  }
};
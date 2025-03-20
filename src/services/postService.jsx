// src/services/postService.jsx
import api from './api';

export const getPosts = async (
  search = '',
  page = 1,
  limit = 10,
  orderBy = 'createdAt',
  orderDirection = 'DESC',
) => {
  try {
    const response = await api.get('/admin/posts', {
      params: { search, page, limit, orderBy, orderDirection },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw new Error('Erro ao carregar os posts.');
  }
};

export const createPost = async (postData) => {
  try {
    const response = await api.post('/admin/posts', postData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar o post:', error);
    throw new Error('Erro ao criar o post.');
  }
};

export const updatePost = async (id, postData) => {
  try {
    const response = await api.put(`/admin/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar o post:', error);
    throw new Error('Erro ao atualizar o post.');
  }
};

export const deletePost = async (id) => {
  try {
    await api.delete(`/admin/posts/${id}`);
  } catch (error) {
    console.error('Erro ao excluir o post:', error);
    throw new Error('Erro ao excluir o post.');
  }
};

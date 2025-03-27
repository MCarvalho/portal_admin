// src/services/userService.js
import api from './api';

export const getUsers = async ({
  search = '',
  page = 1,
  limit = 10,
  orderBy = 'createdAt',
  orderDirection = 'DESC',
  role = '',
  status = '',
}) => {
  try {
    const response = await api.get('/admin/users', {
      params: {
        search,
        page,
        limit,
        orderBy,
        orderDirection,
        role,
        status,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw new Error('Erro ao carregar os usuários.');
  }
};

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/admin/users/${id}`);
    return response.data.dataValues;
  } catch (error) {
    console.error('Erro ao buscar o usuário:', error);
    throw new Error('Erro ao carregar o usuário.');
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/admin/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar o usuário:', error);
    throw new Error('Erro ao atualizar o usuário.');
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post('/admin/users', userData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar o usuário:', error);
    throw new Error('Erro ao criar o usuário.');
  }
};

export const updateUserPassword = async (id, newPassword) => {
  try {
    const response = await api.put(`/admin/users/${id}/password`, {
      password: newPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar a senha do usuário:', error);
    throw new Error('Erro ao atualizar a senha do usuário.');
  }
};

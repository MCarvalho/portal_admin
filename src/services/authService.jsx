// src/services/authService.jsx
import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/users/login', { email, password });
    return {
      success: true,
      token: response.data.token,
      user: response.data.user,
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/users/forgot-password', { email });
    return {
      success: true,
      message: response.data.message || 'Email enviado com sucesso.',
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post('/users/reset-password', {
      token,
      newPassword,
    });
    return {
      success: true,
      message: response.data.message || 'Senha redefinida com sucesso.',
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

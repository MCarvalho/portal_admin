import React, { createContext, useState } from 'react';
import { login, forgotPassword, resetPassword } from '@/services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem('authToken') || null,
  );

  const Login = async (email, password) => {
    const response = await login(email, password);
    if (response.success) {
      setAuthToken(response.token);
      localStorage.setItem('authToken', response.token);
    }
    return response;
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
  };

  const ForgotPassword = async (email) => {
    return await forgotPassword(email);
  };

  const ResetPassword = async (token, newPassword) => {
    return await resetPassword(token, newPassword);
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        login: Login,
        logout,
        forgotPassword: ForgotPassword,
        resetPassword: ResetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

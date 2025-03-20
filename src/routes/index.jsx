// src/routes/index.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Componentes
import PrivateRoute from '@/components/common/PrivateRoute/PrivateRoute';
import AdminLayout from '@/components/common/Layout/Layout';

// Páginas públicas
import Login from '@/pages/Login/Login';
import ForgotPassword from '@/pages/ForgotPassword/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword/ResetPassword';

// Páginas protegidas
import Dashboard from '@/pages/Dashboard/Dashboard';
import Posts from '@/pages/Posts/Posts';
import PostCreate from '@/pages/PostCreate/PostCreate';
import PostEdit from '@/pages/PostEdit/PostEdit';
import OmbudsOffice from '@/pages/OmbudsOffice/OmbudsOffice';
import OmbudsResponsePage from '@/pages/OmbudsResponse/OmbudsOffice';
import Users from '@/pages/Users/Users';
import UserCreate from '@/pages/UserCreate/UserCreate';
import UserEdit from '@/pages/UserEdit/UserEdit';

const protectedRoutes = [
  { path: '/', element: <Dashboard /> },
  { path: '/posts', element: <Posts /> },
  { path: '/posts/new', element: <PostCreate /> },
  { path: '/posts/edit/:id', element: <PostEdit /> },
  { path: '/ombudsOffice', element: <OmbudsOffice /> },
  { path: '/ombudsOffice/response/:id', element: <OmbudsResponsePage /> },
  { path: '/users', element: <Users /> },
  { path: '/users/new', element: <UserCreate /> },
  { path: '/users/edit/:id', element: <UserEdit /> },
];

const AppRoutes = () => (
  <Routes>
    {/* Rotas públicas */}
    <Route path="/login" element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />

    {/* Rotas protegidas */}
    {protectedRoutes.map(({ path, element }) => (
      <Route
        key={path}
        path={path}
        element={
          <PrivateRoute>
            <AdminLayout>{element}</AdminLayout>
          </PrivateRoute>
        }
      />
    ))}
  </Routes>
);

export default AppRoutes;

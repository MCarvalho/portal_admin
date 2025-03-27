import React from 'react';
import UserForm from '@/components/users/UserForm/UserForm';
import { createUser } from '@/services/userService';
import { Navigate } from 'react-router-dom';

const UserCreate = () => {
  const handleSave = async (user) => {
    try {
      await createUser(user);
      Navigate('/users');
    } catch (error) {
      alert(error.message);
    }
  };

  return <UserForm onSave={handleSave} />;
};

export default UserCreate;

import React from 'react';
import UserForm from '@/components/users/UserForm/UserForm';

const UserCreate = () => {
  const handleSave = (user) => {
    console.log('Novo usuário salvo:', user);
  };

  return <UserForm onSave={handleSave} />;
};

export default UserCreate;

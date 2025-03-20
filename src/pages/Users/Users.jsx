import React, { useState } from 'react';
import UserList from '@/components/users/UserList/UserList';
import styles from './users.module.css';

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin', email: 'admin@example.com', role: ['admin'] },
    { id: 2, name: 'Editor', email: 'editor@example.com', role: ['posts'] },
    {
      id: 3,
      name: 'Ouvidor',
      email: 'ouvidor@example.com',
      role: ['ouvidoria'],
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className={styles.container}>
      <UserList users={users} onDelete={handleDelete} />
    </div>
  );
};

export default Users;

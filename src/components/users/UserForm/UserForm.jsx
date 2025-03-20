import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserRoles from '@/components/users/UserRoles/UserRoles';
import styles from './userForm.module.css';

const UserForm = ({ initialUser, onSave }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    initialUser || { name: '', email: '', role: [] },
  );

  const handleSave = () => {
    onSave(user);
    navigate('/users');
  };

  return (
    <div className={styles.container}>
      <h1>{initialUser ? 'Editar Usuário' : 'Novo Usuário'}</h1>
      <input
        type="text"
        placeholder="Nome"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        className={styles.inputField}
      />
      <input
        type="email"
        placeholder="E-mail"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className={styles.inputField}
      />
      <UserRoles
        roles={user.role}
        setRoles={(roles) => setUser({ ...user, role: roles })}
      />
      <button onClick={handleSave} className={styles.saveButton}>
        Salvar
      </button>
    </div>
  );
};

export default UserForm;

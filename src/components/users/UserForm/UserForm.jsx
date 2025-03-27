import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserRoles from '@/components/users/UserRoles/UserRoles';
import styles from './userForm.module.css';

const UserForm = ({ initialUser, onSave }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    initialUser || { name: '', email: '', role: [] },
  );
  const isEdit = Boolean(initialUser);
  const [useRandomPassword, setUseRandomPassword] = useState(!isEdit);

  const generateRandomPassword = () => {
    return Math.random().toString(36).slice(-10) + '1a'; // 10 caracteres + força letra e número
  };

  const handleSave = () => {
    const finalUser = { ...user };

    if (!isEdit) {
      finalUser.password = useRandomPassword
        ? generateRandomPassword()
        : user.password;
    }

    onSave(finalUser);
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
      {!isEdit && (
        <>
          <label className={styles.checkboxContainer}>
            Usar senha aleatória (usuário precisará redefinir via "Esqueci minha
            senha")
            <input
              type="checkbox"
              checked={useRandomPassword}
              onChange={() => setUseRandomPassword(!useRandomPassword)}
            />
          </label>

          {!useRandomPassword && (
            <input
              type="password"
              placeholder="Senha temporária"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className={styles.inputField}
            />
          )}
        </>
      )}
      <UserRoles
        roles={[user.role]}
        setRoles={(roles) => setUser({ ...user, role: roles[0] })}
      />
      <button onClick={handleSave} className={styles.saveButton}>
        Salvar
      </button>
    </div>
  );
};

export default UserForm;

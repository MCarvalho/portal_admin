import React from 'react';
import styles from './userRoles.module.css';

const UserRoles = ({ roles, setRoles }) => {
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setRoles([value]); // Apenas uma role será usada
  };

  return (
    <div className={styles.rolesContainer}>
      <label>
        Permissão de acesso:
        <select
          value={roles?.[0] || ''}
          onChange={(e) => handleSelectChange(e)}
          required
        >
          <option value="">Selecione uma função</option>
          <option value="admin">Administrador</option>
          <option value="editor">Editor</option>
          <option value="manager">Gerente</option>
          <option value="ombudsman">Ouvidor</option>
        </select>
      </label>
    </div>
  );
};

export default UserRoles;

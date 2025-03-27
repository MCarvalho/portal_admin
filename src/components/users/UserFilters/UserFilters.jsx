import React from 'react';
import styles from './userFilters.module.css';

const UserFilters = ({
  search,
  setSearch,
  role,
  setRole,
  status,
  setStatus,
}) => {
  return (
    <div className={styles.filters}>
      <input
        type="text"
        placeholder="Buscar por nome ou e-mail"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Todas as funções</option>
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
        <option value="ombudsman">Ouvidor</option>
        <option value="manager">Gerente</option>
      </select>

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Todos os status</option>
        <option value="active">Ativo</option>
        <option value="inactive">Inativo</option>
      </select>
    </div>
  );
};

export default UserFilters;

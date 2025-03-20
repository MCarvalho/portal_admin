import React, { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import styles from './header.module.css';

const AdminHeader = () => {
  const { logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <img
        src="/prefeitura.png"
        alt="Logo Administrativo"
        className={styles.logo}
      />
      <button onClick={logout} className={styles.logoutButton}>
        Sair
      </button>
    </header>
  );
};

export default AdminHeader;

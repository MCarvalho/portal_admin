import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaFileAlt,
  FaComments,
  FaUsers,
  FaCog,
} from 'react-icons/fa';
import styles from './sidebar.module.css';

const getUserRole = () => {
  try {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return null;
    const user = JSON.parse(storedUser);
    return user?.role || null;
  } catch (err) {
    console.error('Erro ao recuperar a role do usuário:', err);
    return null;
  }
};

const AdminSidebar = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const r = getUserRole();
    setRole(r);
  }, []);

  const canAccess = (roles) => roles.includes(role);

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.menu}>
        <li>
          <Link to="/">
            <FaTachometerAlt className={styles.icon} /> Dashboard
          </Link>
        </li>
        {canAccess(['admin', 'editor', 'manager']) && (
          <li>
            <Link to="/posts">
              <FaFileAlt className={styles.icon} /> Posts
            </Link>
          </li>
        )}
        {canAccess(['admin', 'ombudsman', 'manager']) && (
          <li>
            <Link to="/ombudsOffice">
              <FaComments className={styles.icon} /> Ouvidoria
            </Link>
          </li>
        )}

        {canAccess(['admin']) && (
          <li>
            <Link to="/users">
              <FaUsers className={styles.icon} /> Usuários
            </Link>
          </li>
        )}

        {canAccess(['admin']) && (
          <li>
            <Link to="/configurations">
              <FaCog className={styles.icon} /> Configurações
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
};

export default AdminSidebar;

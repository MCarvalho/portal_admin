import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaFileAlt,
  FaComments,
  FaUsers,
  FaCog,
} from 'react-icons/fa';
import styles from './sidebar.module.css';

const AdminSidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <ul className={styles.menu}>
        <li>
          <Link to="/">
            <FaTachometerAlt className={styles.icon} /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/posts">
            <FaFileAlt className={styles.icon} /> Posts
          </Link>
        </li>
        <li>
          <Link to="/ombudsOffice">
            <FaComments className={styles.icon} /> Ouvidoria
          </Link>
        </li>
        <li>
          <Link to="/users">
            <FaUsers className={styles.icon} /> Usuários
          </Link>
        </li>
        <li>
          <Link to="/configurations">
            <FaCog className={styles.icon} /> Configurações
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;

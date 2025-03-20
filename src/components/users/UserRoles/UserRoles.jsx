import React from 'react';
import styles from './userRoles.module.css';

const UserRoles = ({ roles, setRoles }) => {
  const handleRoleChange = (event) => {
    const { value, checked } = event.target;
    setRoles((prevRoles) =>
      checked
        ? [...prevRoles, value]
        : prevRoles.filter((role) => role !== value),
    );
  };

  return (
    <div className={styles.rolesContainer}>
      <label>
        <input
          type="checkbox"
          value="ouvidoria"
          checked={roles.includes('ombudsman')}
          onChange={handleRoleChange}
        />
        Acesso à Ouvidoria
      </label>
      <label>
        <input
          type="checkbox"
          value="posts"
          checked={roles.includes('posts')}
          onChange={handleRoleChange}
        />
        Acesso à Postagens
      </label>
      <label>
        <input
          type="checkbox"
          value="admin"
          checked={roles.includes('admin')}
          onChange={handleRoleChange}
        />
        Acesso Total
      </label>
      <label>
        <input
          type="checkbox"
          value="manager"
          checked={roles.includes('manager')}
          onChange={handleRoleChange}
        />
        Acesso Total
      </label>
    </div>
  );
};

export default UserRoles;

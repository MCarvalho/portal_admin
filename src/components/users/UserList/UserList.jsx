import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './userList.module.css';

const UserList = ({ users, onDelete }) => {
  const navigate = useNavigate();

  const roleLabels = {
    admin: 'Administrador',
    editor: 'Editor de Conteúdo',
    ombudsman: 'Ouvidoria',
    manager: 'Gerente',
  };

  return (
    <div className={styles.container}>
      <h1>Gerenciar Usuários</h1>
      <button
        className={styles.newUserButton}
        onClick={() => navigate('/users/new')}
      >
        Novo Usuário
      </button>

      <div className={styles.userList}>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className={styles.userCard}>
              <div className={styles.userInfo}>
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
                <p>Permissão: {roleLabels[user.role] || user.role}</p>
              </div>
              <div className={styles.actions}>
                <button
                  onClick={() => navigate(`/users/edit/${user.id}`)}
                  className={styles.editButton}
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className={styles.deleteButton}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noUsers}>Nenhum usuário encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default UserList;

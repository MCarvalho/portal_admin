import React, { useState, useEffect } from 'react';
import { getUsers } from '@/services/userService';
import UserList from '@/components/users/UserList/UserList';
import UserFilters from '@/components/users/UserFilters/UserFilters';
import Pagination from '@/components/common/Pagination/Pagination';
import styles from './users.module.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers({
          page,
          limit,
          search,
          role,
          status,
        });
        setUsers(res.users);
        setTotal(res.total);
      } catch (err) {
        console.error('Erro ao buscar usuários:', err);
      }
    };

    fetchUsers();
  }, [page, limit, search, role, status]);

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className={styles.container}>
      <UserFilters
        search={search}
        setSearch={setSearch}
        role={role}
        setRole={setRole}
        status={status}
        setStatus={setStatus}
      />

      <UserList users={users} onDelete={handleDelete} />

      <Pagination
        total={total}
        page={page}
        limit={limit}
        onPageChange={setPage}
      />
    </div>
  );
};

export default Users;

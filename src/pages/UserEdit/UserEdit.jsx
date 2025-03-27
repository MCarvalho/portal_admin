import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserForm from '@/components/users/UserForm/UserForm';
import { getUserById } from '@/services/userService';

const PostEdit = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  // Simulando busca do post pelo ID (substituir por API futuramente)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(id);
        setUser(data);
      } catch (error) {
        alert('Erro ao carregar usuário:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleSave = (updatedPost) => {
    console.log('Post editado:', updatedPost);
  };

  return user ? (
    <UserForm initialUser={user} onSave={handleSave} />
  ) : (
    <p>Carregando...</p>
  );
};

export default PostEdit;

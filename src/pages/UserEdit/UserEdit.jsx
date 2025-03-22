import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserForm from '@/components/users/UserForm/UserForm';

const PostEdit = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  // Simulando busca do post pelo ID (substituir por API futuramente)
  useEffect(() => {
    const existingPost = {
      id,
      title: 'Título do Post Editado',
      summary: 'Resumo do post editado',
      content: '<p>Conteúdo do post editado</p>',
    };
    setPost(existingPost);
  }, [id]);

  const handleSave = (updatedPost) => {
    console.log('Post editado:', updatedPost);
  };

  return post ? (
    <UserForm initialPost={post} onSave={handleSave} />
  ) : (
    <p>Carregando...</p>
  );
};

export default PostEdit;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostForm from '@/components/posts/PostForm/PostForm';

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
    <PostForm initialPost={post} onSave={handleSave} />
  ) : (
    <p>Carregando...</p>
  );
};

export default PostEdit;

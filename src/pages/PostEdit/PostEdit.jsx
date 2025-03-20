import React from 'react';
import { useParams } from 'react-router-dom';
import PostForm from '@/components/posts/PostForm/PostForm';
import styles from './postEdit.module.css';

const PostEdit = () => {
  const { id } = useParams();

  // Simulação de um post existente
  const existingPost = {
    id,
    title: 'Título do Post Editado',
    content: '<p>Conteúdo do post editado</p>',
  };

  const handleSave = (post) => {
    console.log('Post editado:', post);
  };

  return (
    <PostForm
      className={styles.container}
      initialPost={existingPost}
      onSave={handleSave}
    />
  );
};

export default PostEdit;

import React from 'react';
import PostForm from '@/components/posts/PostForm/PostForm';
import styles from './postCreate.module.css';

const PostCreate = () => {
  const handleSave = (post) => {
    console.log('Novo post salvo:', post);
  };

  return <PostForm className={styles.container} onSave={handleSave} />;
};

export default PostCreate;

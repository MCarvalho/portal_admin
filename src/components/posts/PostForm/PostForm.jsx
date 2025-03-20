import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostEditor from '@/components/posts/PostEditor/PostEditor';
import styles from './postForm.module.css';

const PostForm = ({ initialPost, onSave }) => {
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', summary: '', content: '' });

  // Atualiza os dados quando o initialPost estiver disponível
  useEffect(() => {
    if (initialPost) {
      setPost(initialPost);
    }
  }, [initialPost]);

  const handleSave = (htmlContent) => {
    onSave({ ...post, content: htmlContent });
    navigate('/posts');
  };

  return (
    <div className={styles.container}>
      <PostEditor initialPost={post} onSave={handleSave} />
    </div>
  );
};

export default PostForm;

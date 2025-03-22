import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PostEditor from '@/components/posts/PostEditor/PostEditor';
import { createPost } from '@/services/postService';

const PostCreate = () => {
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: '',
    summary: '',
    content: '',
    imageIds: [],
    images: [],
    PostImages: [],
    isFeatured: false,
  });

  const handleSave = async (postData) => {
    if (!postData.imageIds || postData.imageIds.length === 0) {
      throw new Error('Por favor, insira pelo menos uma imagem.');
    }

    try {
      await createPost(postData);
      navigate('/posts');
    } catch (error) {
      throw error('Erro ao salvar o post.');
    }
  };

  return (
    <PostEditor initialPost={post} onSave={handleSave} setPost={setPost} />
  );
};

export default PostCreate;

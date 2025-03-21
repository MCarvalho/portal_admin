import React, { useState } from 'react';
import PostEditor from '@/components/posts/PostEditor/PostEditor';
import { createPost } from '@/services/postService';

const PostCreate = ({ onSave }) => {
  const [post, setPost] = useState({
    title: '',
    summary: '',
    content: '<p>Escreva seu post aqui...</p>',
    imageIds: [],
    images: [],
    isFeatured: false,
  });

  const handleSave = async () => {
    if (post.imageIds.length === 0) {
      alert('Por favor, insira pelo menos uma imagem.');
      return;
    }

    try {
      const payload = {
        title: post.title,
        summary: post.summary,
        content: post.content,
        imageIds: post.imageIds,
        isFeatured: post.isFeatured || false,
      };

      await createPost(payload);
      onSave(payload);
    } catch (error) {
      console.error('Erro ao salvar o post:', error);
    }
  };

  return (
    <PostEditor initialPost={post} onSave={handleSave} setPost={setPost} />
  );
};

export default PostCreate;

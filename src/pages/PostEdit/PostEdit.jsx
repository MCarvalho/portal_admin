import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostEditor from '@/components/posts/PostEditor/PostEditor';
import { getPostById, updatePost } from '@/services/postService';

const PostEdit = ({ onSave }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPostById(id);
        setPost(fetchedPost);
      } catch (error) {
        console.error('Erro ao buscar o post:', error);
      }
    };

    fetchPost();
  }, [id]);

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

      await updatePost(id, payload);
      onSave(payload);
    } catch (error) {
      console.error('Erro ao atualizar o post:', error);
    }
  };

  if (!post) {
    return <div>Carregando...</div>;
  }

  return (
    <PostEditor initialPost={post} onSave={handleSave} setPost={setPost} />
  );
};

export default PostEdit;

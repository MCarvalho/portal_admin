import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import PostEditor from '@/components/posts/PostEditor/PostEditor';
import { getPostById, updatePost } from '@/services/postService';

const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPostById(id);
        const processedPost = {
          ...fetchedPost,
          imageIds: fetchedPost?.PostImages?.map((img) => img.id) || [],
          images: fetchedPost?.PostImages?.map((img) => img.path) || [],
          removedImageIds: [],
        };
        setPost(processedPost);
      } catch (error) {
        console.error('Erro ao buscar o post:', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleSave = async (processedPostData) => {
    if (processedPostData.imageIds.length === 0) {
      throw new Error('Por favor, insira pelo menos uma imagem.');
    }

    try {
      await updatePost(id, processedPostData);
      navigate('/posts');
    } catch (error) {
      throw error('Erro ao atualizar o post.');
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

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './postList.module.css';

const PostList = ({ posts, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Postagens</h1>
        <button
          className={styles.newPostButton}
          onClick={() => navigate('/posts/new')}
        >
          Novo Post
        </button>
      </div>
      <div className={styles.postsList}>
        {posts.map((post) => (
          <div key={post.id} className={styles.postCard}>
            {post.coverImagePath && (
              <img
                src={`http://localhost:4000${post.coverImagePath}`}
                alt={post.title}
                className={styles.coverImage}
              />
            )}
            <div className={styles.postContent}>
              <h2>{post.title}</h2>
              <p>
                <strong>Resumo:</strong> {post.summary}
              </p>
              <p>
                <strong>Autor:</strong> {post.author}
              </p>
              <p>
                <strong>Criado em:</strong>{' '}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Última atualização:</strong>{' '}
                {new Date(post.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <div className={styles.actions}>
              <button
                onClick={() => navigate(`/posts/edit/${post.id}`)}
                className={styles.editButton}
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(post.id)}
                className={styles.deleteButton}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;

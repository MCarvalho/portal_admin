import React, { useState, useEffect } from 'react';
import { getPosts, deletePost } from '@/services/postService';
import PostList from '@/components/posts/PostList/PostList';
import PostFilters from '@/components/posts/PostFilters/PostFilters';
import Pagination from '@/components/common/Pagination/Pagination';
import styles from './posts.module.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [orderBy, setOrderBy] = useState('createdAt');
  const [orderDirection, setOrderDirection] = useState('DESC');

  useEffect(() => {
    fetchPosts();
  }, [page, orderBy, orderDirection, searchTerm]);

  const fetchPosts = async () => {
    try {
      const response = await getPosts(
        searchTerm,
        page,
        10,
        orderBy,
        orderDirection,
      );
      setPosts(response.posts);
      setTotalPosts(response.total);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFiltersChange = ({ searchTerm, orderBy, orderDirection }) => {
    setPage(1);
    setSearchTerm(searchTerm);
    setOrderBy(orderBy);
    setOrderDirection(orderDirection);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este post?')) {
      try {
        await deletePost(id);
        fetchPosts();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalPosts / 10)) {
      setPage(newPage);
    }
  };

  return (
    <div className={styles.container}>
      <PostFilters
        searchTerm={searchTerm}
        orderBy={orderBy}
        orderDirection={orderDirection}
        onChange={handleFiltersChange}
      />

      {error && <p className={styles.error}>{error}</p>}

      <PostList posts={posts} onDelete={handleDelete} />

      <Pagination
        total={totalPosts}
        page={page}
        limit={10}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Posts;

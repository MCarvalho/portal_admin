import React, { useState, useEffect } from 'react';
import { getPosts, deletePost } from '@/services/postService';
import PostList from '@/components/posts/PostList/PostList';
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
  }, [page, orderBy, orderDirection]);

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

  const handleSearch = (event) => {
    event.preventDefault();
    setPage(1); // Resetar para página 1 ao pesquisar
    fetchPosts();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este post?')) {
      try {
        await deletePost(id);
        fetchPosts(); // Atualizar lista após excluir
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
      {/* Barra de pesquisa */}
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          name="search"
          placeholder="Buscar posts..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className={styles.searchButton}>
          Buscar
        </button>
      </form>

      {/* Opções de ordenação */}
      <div className={styles.sortOptions}>
        <label>Ordenar por:</label>
        <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
          <option value="createdAt">Data</option>
          <option value="title">Título</option>
          <option value="author">Autor</option>
        </select>
        <button
          onClick={() =>
            setOrderDirection(orderDirection === 'ASC' ? 'DESC' : 'ASC')
          }
        >
          {orderDirection === 'ASC' ? 'Crescente' : 'Decrescente'}
        </button>
      </div>

      {/* Mensagem de erro */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Lista de Posts */}
      <PostList posts={posts} onDelete={handleDelete} />

      {/* Paginação */}
      <div className={styles.pagination}>
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Anterior
        </button>
        <span>Página {page}</span>
        <button
          disabled={page * 10 >= totalPosts}
          onClick={() => handlePageChange(page + 1)}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default Posts;

import React from 'react';
import styles from './postFilters.module.css';

const PostFilters = ({ searchTerm, orderBy, orderDirection, onChange }) => {
  const handleInputChange = (e) => {
    onChange({
      searchTerm: e.target.value,
      orderBy,
      orderDirection,
    });
  };

  const handleOrderByChange = (e) => {
    onChange({
      searchTerm,
      orderBy: e.target.value,
      orderDirection,
    });
  };

  const toggleOrderDirection = () => {
    onChange({
      searchTerm,
      orderBy,
      orderDirection: orderDirection === 'ASC' ? 'DESC' : 'ASC',
    });
  };

  return (
    <div className={styles.filters}>
      <input
        type="text"
        placeholder="Buscar por título, autor..."
        value={searchTerm}
        onChange={handleInputChange}
      />

      <select value={orderBy} onChange={handleOrderByChange}>
        <option value="createdAt">Data</option>
        <option value="title">Título</option>
        <option value="author">Autor</option>
        <option value="isFeatured">Destaque</option>
      </select>

      <button type="button" onClick={toggleOrderDirection}>
        {orderDirection === 'ASC' ? 'Crescente' : 'Decrescente'}
      </button>
    </div>
  );
};

export default PostFilters;

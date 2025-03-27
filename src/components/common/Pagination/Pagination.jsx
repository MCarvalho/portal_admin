import React from 'react';
import styles from './pagination.module.css';

const Pagination = ({ total, page, limit, onPageChange }) => {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <button onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
        Anterior
      </button>

      <span>
        Página {page} de {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Próxima
      </button>
    </div>
  );
};

export default Pagination;

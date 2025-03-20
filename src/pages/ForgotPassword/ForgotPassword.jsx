import React, { useState, useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './forgotPassword.module.css';

const ForgotPassword = () => {
  const { forgotPassword } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await forgotPassword(email);

    setMessage(result.message);

    if (result.success) {
      setTimeout(() => {
        navigate('/login'); // Redireciona para a página de login após sucesso
      }, 3000);
    }
  };

  return (
    <div className={styles.forgotPasswordContainer}>
      <h2>Recuperar Senha</h2>
      {message && <p className={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} className={styles.forgotPasswordForm}>
        <label htmlFor="email">E-mail cadastrado:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ForgotPassword;

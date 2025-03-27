import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';
import styles from './login.module.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(credentials.email, credentials.password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    const role = result.user?.role;

    if (role === 'ombudsman') {
      navigate('/ombudsOffice');
    } else {
      navigate('/posts');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Admin Login</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      <Link to="/forgot-password" className={styles.forgotPasswordLink}>
        Esqueci minha senha
      </Link>
    </div>
  );
};

export default Login;

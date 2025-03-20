import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ombudsResponse.module.css';

const OmbudsResponse = ({ message, onSendResponse }) => {
  const navigate = useNavigate();
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendResponse(message.id, response);
    navigate('/ombudsOffice');
  };

  return (
    <div className={styles.container}>
      <h1>Responder Mensagem</h1>
      <p>
        <strong>Protocolo:</strong> {message.protocol}
      </p>
      <p>
        <strong>Mensagem:</strong> {message.content}
      </p>

      <textarea
        placeholder="Escreva sua resposta aqui..."
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        className={styles.responseInput}
      />

      <button onClick={handleSubmit} className={styles.sendButton}>
        Enviar Resposta
      </button>
    </div>
  );
};

export default OmbudsResponse;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ombudsList.module.css';

const OmbudsList = ({ messages, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>Mensagens da Ouvidoria</h1>
      <div className={styles.messagesList}>
        {messages.length > 0 ? (
          messages.map((message) => (
            <div key={message.id} className={styles.messageCard}>
              <div className={styles.messageContent}>
                <h2>Protocolo: {message.protocol}</h2>
                <p>{message.content}</p>
              </div>
              <div className={styles.actions}>
                <button
                  onClick={() =>
                    navigate(`/ombudsOffice/response/${message.id}`)
                  }
                  className={styles.replyButton}
                >
                  Responder
                </button>
                <button
                  onClick={() => onDelete(message.id)}
                  className={styles.deleteButton}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noMessages}>Nenhuma mensagem encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default OmbudsList;

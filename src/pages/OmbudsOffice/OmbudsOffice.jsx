import React, { useState } from 'react';
import OmbudsList from '@/components/ombuds/OmbudsList/OmbudsList';
import styles from './ombudsOffice.module.css';

const OmbudsOffice = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      protocol: '123456',
      content: 'Gostaria de mais informações sobre...',
    },
    {
      id: 2,
      protocol: '654321',
      content: 'Tive um problema com um serviço e...',
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta mensagem?')) {
      setMessages(messages.filter((message) => message.id !== id));
    }
  };

  return (
    <div className={styles.container}>
      <OmbudsList messages={messages} onDelete={handleDelete} />
    </div>
  );
};

export default OmbudsOffice;

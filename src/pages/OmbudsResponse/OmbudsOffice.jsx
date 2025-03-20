import React from 'react';
import { useParams } from 'react-router-dom';
import OmbudsResponse from '@/components/ombuds/OmbudsResponse/OmbudsResponse';

const OmbudsResponsePage = () => {
  const { id } = useParams();

  // Simulação de uma mensagem existente
  const message = {
    id,
    protocol: '123456',
    content: 'Gostaria de mais informações sobre...',
  };

  const handleSendResponse = (id, response) => {
    console.log(`Resposta para o protocolo ${id}:`, response);
  };

  return (
    <OmbudsResponse message={message} onSendResponse={handleSendResponse} />
  );
};

export default OmbudsResponsePage;

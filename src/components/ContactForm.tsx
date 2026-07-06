import { FormEvent, useState } from 'react';
import { useLeadContext } from '../hooks/useLeadContext';

export function ContactForm() {
  const { hiddenContext } = useLeadContext();
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      message,
      ...hiddenContext
    };

    console.log('Contact payload', payload);
    alert('Contacto enviado con contexto global.');
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>Formulario de contacto</h3>
      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Escribe tu mensaje..."
      />
      <input type="hidden" name="activeModule" value={hiddenContext.activeModule} />
      <input type="hidden" name="userType" value={hiddenContext.userType} />
      <input type="hidden" name="interest" value={hiddenContext.interest} />
      <input type="hidden" name="origin" value={hiddenContext.origin} />
      <button type="submit">Enviar contacto</button>
    </form>
  );
}

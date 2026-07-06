import { FormEvent, useState } from 'react';
import { useLeadContext } from '../hooks/useLeadContext';

export function LeadCaptureForm() {
  const { hiddenContext } = useLeadContext();
  const [email, setEmail] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      email,
      ...hiddenContext
    };

    console.log('Lead capture payload', payload);
    alert('Lead capturado con contexto global.');
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>Captura de leads</h3>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Correo electrónico"
        required
      />
      <input type="hidden" name="activeModule" value={hiddenContext.activeModule} />
      <input type="hidden" name="userType" value={hiddenContext.userType} />
      <input type="hidden" name="interest" value={hiddenContext.interest} />
      <input type="hidden" name="origin" value={hiddenContext.origin} />
      <button type="submit">Capturar lead</button>
    </form>
  );
}

import { FormEvent, useState } from 'react';
import { mision001ApiClient } from '@/mision001';
import { useLeadContext } from '../hooks/useLeadContext';

export function ContactForm() {
  const { hiddenContext } = useLeadContext();
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const cliente = await mision001ApiClient.createCliente({
        nombre: name || 'Contacto web',
        apellidos: hiddenContext.publicRoute,
        telefono: '000000000',
        email,
        direccion: 'Web publica',
        codigoPostal: '00000',
        municipio: 'Online',
        provincia: 'Online',
        tipoVivienda: 'Comercial',
        observaciones: message
      });
      await mision001ApiClient.createOportunidad({
        clienteId: cliente.id,
        estado: 'nuevo_lead',
        comercialAsignado: 'Web publica',
        fuente: 'Formulario de contacto',
        notas: message
      });
      setStatus('Contacto enviado al CRM.');
      setMessage('');
      setName('');
      setEmail('');
    } catch {
      setStatus('No se pudo enviar el contacto al CRM.');
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>Formulario de contacto</h3>
      {status ? <p className="public-form__status">{status}</p> : null}
      <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Nombre" required />
      <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Correo electrónico" required />
      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Escribe tu mensaje..."
      />
      <input type="hidden" name="activeModule" value={hiddenContext.activeModule} />
      <input type="hidden" name="publicRoute" value={hiddenContext.publicRoute} />
      <input type="hidden" name="userType" value={hiddenContext.userType} />
      <input type="hidden" name="interest" value={hiddenContext.interest} />
      <input type="hidden" name="origin" value={hiddenContext.origin} />
      <button type="submit">Enviar contacto</button>
    </form>
  );
}

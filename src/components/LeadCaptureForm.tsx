import { FormEvent, useState } from 'react';
import { mision001ApiClient } from '@/mision001';
import { useLeadContext } from '../hooks/useLeadContext';

export function LeadCaptureForm() {
  const { hiddenContext } = useLeadContext();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const cliente = await mision001ApiClient.createCliente({
        nombre: name || 'Lead web',
        apellidos: hiddenContext.publicRoute,
        telefono: phone || '000000000',
        email,
        direccion: 'Web publica',
        codigoPostal: '00000',
        municipio: 'Online',
        provincia: 'Online',
        tipoVivienda: 'Comercial',
        observaciones: `Lead capturado desde ${hiddenContext.publicRoute}`
      });
      await mision001ApiClient.createOportunidad({
        clienteId: cliente.id,
        estado: 'nuevo_lead',
        comercialAsignado: 'Web publica',
        fuente: 'Formulario web',
        notas: `Captura desde ${hiddenContext.publicRoute}`
      });
      setStatus('Lead enviado al CRM.');
      setEmail('');
      setName('');
      setPhone('');
    } catch {
      setStatus('No se pudo enviar el lead al CRM.');
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>Captura de leads</h3>
      {status ? <p className="public-form__status">{status}</p> : null}
      <input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Nombre" required />
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Correo electrónico"
        required
      />
      <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Teléfono" required />
      <input type="hidden" name="activeModule" value={hiddenContext.activeModule} />
      <input type="hidden" name="publicRoute" value={hiddenContext.publicRoute} />
      <input type="hidden" name="userType" value={hiddenContext.userType} />
      <input type="hidden" name="interest" value={hiddenContext.interest} />
      <input type="hidden" name="origin" value={hiddenContext.origin} />
      <button type="submit">Capturar lead</button>
    </form>
  );
}

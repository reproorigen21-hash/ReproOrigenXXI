import type { Professional } from '../types/professional';

type ProfessionalCardProps = {
  professional: Professional;
};

export function ProfessionalCard({ professional }: ProfessionalCardProps) {
  return (
    <article style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: 18, padding: 20, background: 'rgba(7,16,26,0.9)', display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 18 }}>{professional.name}</h3>
          <p style={{ margin: '4px 0 0', color: '#94a3b8' }}>{professional.trade}</p>
        </div>
        <span style={{ color: professional.available ? '#7dd3fc' : '#f59e0b', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          {professional.available ? 'Disponible' : 'No disponible'}
        </span>
      </div>

      <div style={{ color: '#cbd5e1', display: 'grid', gap: 6, fontSize: 14 }}>
        <span>Provincia: {professional.province}</span>
        <span>Ciudad: {professional.city}</span>
        <span>Experiencia: {professional.experience} años</span>
        <span>Autónomo: {professional.autonomous ? 'Sí' : 'No'}</span>
        <span>Valoración: {'★'.repeat(professional.rating)}</span>
      </div>

      <div style={{ display: 'grid', gap: 4, fontSize: 13, color: '#cbd5e1' }}>
        <a href={`tel:${professional.phone}`} style={{ color: '#7dd3fc', textDecoration: 'none' }}>{professional.phone}</a>
        <a href={`mailto:${professional.email}`} style={{ color: '#7dd3fc', textDecoration: 'none' }}>{professional.email}</a>
      </div>

      {professional.notes ? <p style={{ margin: 0, color: '#cbd5e1', lineHeight: 1.7 }}>{professional.notes}</p> : null}
    </article>
  );
}

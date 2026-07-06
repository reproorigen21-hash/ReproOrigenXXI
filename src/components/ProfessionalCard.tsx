import type { Professional } from '@/types/professional';

type ProfessionalCardProps = {
  professional: Professional;
};

export default function ProfessionalCard({ professional }: ProfessionalCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
      <h2 className="text-xl font-semibold">{professional.name}</h2>
      <p className="mt-3 text-sm font-medium text-cyan-300">{professional.trade}</p>
      <p className="mt-1 text-sm text-slate-300">{professional.city}</p>
      <p className="mt-2 text-sm text-slate-300">{professional.available ? 'Disponible' : 'No disponible'}</p>
      <p className="mt-2 text-sm text-amber-300">{'★'.repeat(professional.rating)}</p>
      <div className="mt-4 rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-3 text-sm text-slate-200">
        <p className="font-semibold text-cyan-300">Obra: Burriana</p>
        <p className="mt-1">Asignar → {professional.name}</p>
        <p className="mt-1">Aceptar trabajo</p>
      </div>
      {professional.schedule ? (
        <div className="mt-3 space-y-1 text-sm text-slate-300">
          <p>Lunes: {professional.schedule.monday}</p>
          <p>Martes: {professional.schedule.tuesday}</p>
          <p>Miércoles: {professional.schedule.wednesday}</p>
        </div>
      ) : null}
      <a href={`tel:${professional.phone}`} className="mt-4 inline-block text-cyan-300 hover:text-cyan-200">
        Llamar
      </a>
    </div>
  );
}

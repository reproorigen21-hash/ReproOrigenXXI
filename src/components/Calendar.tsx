import type { Work } from '@/types/work';

type CalendarProps = {
  events: Work[];
};

export default function Calendar({ events }: CalendarProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
      <h2 className="text-xl font-semibold">Calendario</h2>
      <div className="mt-4 space-y-3">
        {events.map((event) => (
          <div key={event.id} className="rounded-xl border border-white/10 bg-slate-800/70 p-4">
            <p className="font-medium">{event.cliente}</p>
            <p className="mt-1 text-sm text-slate-400">{event.direccion}</p>
            <p className="mt-1 text-sm text-cyan-300">{event.fecha}</p>
            <p className="mt-1 text-sm text-slate-400">{event.estado}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

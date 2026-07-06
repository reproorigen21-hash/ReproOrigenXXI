import { trabajos } from '@/data/works';
import Calendar from '@/components/Calendar';
import UploadPhotos from '@/components/UploadPhotos';

const sections = [
  { title: 'Mis trabajos', description: 'Trabajos asignados y estado actual.' },
  { title: 'Calendario', description: 'Visita de obras y próximos compromisos.' },
  { title: 'Subir fotos', description: 'Documenta avances y entrega final.' },
  { title: 'Documentación', description: 'Informes, certificados y archivos asociados.' }
];

export default function InstaladorPage() {
  return (
    <div className="space-y-8 p-8 text-slate-200">
      <h1 className="text-4xl font-bold">Mi Panel</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {sections.map((section) => (
          <div key={section.title} className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="mt-2 text-sm text-slate-400">{section.description}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
          <h2 className="text-xl font-semibold">Trabajos asignados</h2>
          <div className="mt-4 space-y-3">
            {trabajos.map((trabajo) => (
              <div key={trabajo.id} className="rounded-xl border border-white/10 bg-slate-800/70 p-4">
                <p className="font-medium">{trabajo.cliente}</p>
                <p className="mt-1 text-sm text-slate-400">{trabajo.direccion}</p>
                <p className="mt-1 text-sm text-slate-400">{trabajo.fecha}</p>
                <p className="mt-2 text-sm text-cyan-300">{trabajo.estado}</p>
              </div>
            ))}
          </div>
        </div>

        <Calendar events={trabajos} />
      </div>

      <div className="flex flex-wrap gap-4">
        <button className="rounded-xl bg-cyan-600 px-4 py-3 font-medium text-white transition hover:bg-cyan-500">
          Marcar obra terminada
        </button>
        <button className="rounded-xl border border-white/10 bg-slate-800 px-4 py-3 font-medium text-slate-200 transition hover:bg-slate-700">
          Generar Acta
        </button>
        <button className="rounded-xl border border-white/10 bg-slate-800 px-4 py-3 font-medium text-slate-200 transition hover:bg-slate-700">
          Generar PDF
        </button>
        <button className="rounded-xl border border-white/10 bg-slate-800 px-4 py-3 font-medium text-slate-200 transition hover:bg-slate-700">
          Enviar Cliente
        </button>
      </div>

      <UploadPhotos />
    </div>
  );
}

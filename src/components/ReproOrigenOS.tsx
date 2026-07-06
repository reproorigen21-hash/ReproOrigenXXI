export default function ReproOrigenOS() {
  const metrics = [
    { icon: '👥', label: 'Clientes', value: '138' },
    { icon: '🏗', label: 'Obras', value: '27' },
    { icon: '👷', label: 'Instaladores', value: '43' },
    { icon: '📅', label: 'Agenda', value: 'Hoy' },
    { icon: '💶', label: 'Facturación', value: 'Mes' },
    { icon: '⚠️', label: 'Incidencias', value: '3' },
    { icon: '💚', label: 'Subvenciones', value: '8' },
    { icon: '🤖', label: 'IA', value: 'Activa' }
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-lg shadow-black/20">
      <h2 className="mb-6 text-2xl font-bold">REPROORIGEN XXI OS</h2>
      <div className="space-y-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-800/50 px-4 py-3">
            <span className="flex items-center gap-3 text-lg">
              <span>{metric.icon}</span>
              <span className="text-slate-300">{metric.label}</span>
            </span>
            {metric.value && <span className="text-xl font-semibold text-cyan-300">{metric.value}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

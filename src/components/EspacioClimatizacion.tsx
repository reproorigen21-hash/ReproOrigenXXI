export default function EspacioClimatizacion() {
  const services = [
    'Aire acondicionado',
    'Aerotermia',
    'Bombas de calor',
    'Conductos',
    'Mantenimiento',
    'Eficiencia energética',
    'Subvenciones'
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-lg shadow-black/20">
      <h2 className="mb-6 text-2xl font-bold">❄️ Espacio Climatización</h2>
      <div className="space-y-3">
        {services.map((service, index) => {
          const isLast = index === services.length - 1;
          const connector = isLast ? '└' : '├';
          return (
            <div key={service} className="flex items-center gap-3 rounded-lg border border-white/5 bg-slate-800/50 px-4 py-3">
              <span className="text-cyan-300">{connector}</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-emerald-300">{service}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

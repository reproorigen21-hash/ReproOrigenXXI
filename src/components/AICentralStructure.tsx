export default function AICentralStructure() {
  const departments = [
    'Comercial',
    'Atención Cliente',
    'Administración',
    'Subvenciones',
    'Jurídico',
    'Turismo',
    'Universidad',
    'Comunicación',
    'Investigación',
    'Industria',
    'Dirección'
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-lg shadow-black/20">
      <h2 className="mb-6 text-2xl font-bold">🤖 IA CENTRAL</h2>
      <div className="space-y-2 font-mono text-sm text-slate-300">
        <div>├── <span className="text-cyan-300 font-semibold">Comercial</span></div>
        <div>├── <span className="text-emerald-300 font-semibold">Atención Cliente</span></div>
        <div>├── <span className="text-purple-300 font-semibold">Administración</span></div>
        <div>├── <span className="text-amber-300 font-semibold">Subvenciones</span></div>
        <div>├── <span className="text-rose-300 font-semibold">Jurídico</span></div>
        <div>├── <span className="text-blue-300 font-semibold">Turismo</span></div>
        <div>├── <span className="text-indigo-300 font-semibold">Universidad</span></div>
        <div>├── <span className="text-pink-300 font-semibold">Comunicación</span></div>
        <div>├── <span className="text-orange-300 font-semibold">Investigación</span></div>
        <div>├── <span className="text-teal-300 font-semibold">Industria</span></div>
        <div>└── <span className="text-lime-300 font-semibold">Dirección</span></div>
      </div>
    </div>
  );
}

export default function ReproOrigenOSStructure() {
  const modules = [
    { name: 'CRM', icon: '👥' },
    { name: 'Obras', icon: '🏗' },
    { name: 'Agenda', icon: '📅' },
    { name: 'Red Profesional', icon: '🔗' },
    { name: 'Documentos', icon: '📄' },
    { name: 'IA', icon: '🤖' },
    { name: 'Administración', icon: '⚙️' },
    { name: 'Universidad', icon: '🎓' },
    { name: 'Turismo', icon: '✈️' },
    { name: 'Fundación', icon: '❤️' }
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-lg shadow-black/20">
      <h2 className="mb-6 text-2xl font-bold">REPROORIGEN XXI OS</h2>
      <div className="space-y-2 font-mono text-sm text-slate-300">
        <div className="text-cyan-300">│</div>
        {modules.map((module, index) => {
          const isLast = index === modules.length - 1;
          const connector = isLast ? '└──' : '├──';
          return (
            <div key={module.name} className="flex items-center gap-3">
              <span className="text-cyan-300">{connector}</span>
              <span className="text-xl">{module.icon}</span>
              <span className="font-semibold text-emerald-300">{module.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

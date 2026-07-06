export default function ReproOrigenMainStructure() {
  const structure = [
    {
      title: '🏠 Hogar',
      items: ['Ventanas PVC', 'Climatización', 'Aerotermia', 'Aislamiento', 'Energía Solar', 'Reformas', 'Subvenciones']
    },
    {
      title: '🏢 Empresas',
      items: ['Automatización', 'IA', 'CRM', 'Consultoría']
    },
    {
      title: '🌍 Territorio',
      items: ['Ayuntamientos', 'Turismo', 'Repoblación', 'Medio ambiente']
    }
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-lg shadow-black/20">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-cyan-300">REPROORIGEN XXI</h1>
        <div className="my-4 flex items-center justify-center gap-4 text-slate-400">
          <div className="h-px w-32 bg-gradient-to-r from-transparent to-cyan-300"></div>
          <span className="text-sm">│</span>
          <div className="h-px w-32 bg-gradient-to-l from-transparent to-cyan-300"></div>
        </div>
        <h2 className="text-lg font-semibold text-emerald-300">CENTRO DE OPERACIONES</h2>
      </div>

      <div className="space-y-8">
        {structure.map((section, index) => (
          <div key={section.title} className="rounded-xl border border-white/5 bg-slate-800/50 p-6">
            <h3 className="mb-4 text-xl font-bold text-cyan-300">{section.title}</h3>
            <div className="space-y-2 pl-4">
              {section.items.map((item, itemIndex) => {
                const isLast = itemIndex === section.items.length - 1;
                const connector = isLast ? '└──' : '├──';
                return (
                  <div key={item} className="flex items-center gap-3 text-slate-300">
                    <span className="text-slate-500">{connector}</span>
                    <span>{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

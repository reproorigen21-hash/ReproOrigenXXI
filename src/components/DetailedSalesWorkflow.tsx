export default function DetailedSalesWorkflow() {
  const stages = [
    'Lead',
    'Primera llamada',
    'Visita',
    'Medición',
    'Presupuesto',
    'Aceptado',
    'Pedido',
    'Instalación',
    'Fotos finales',
    'Factura',
    'Garantía'
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
      <h2 className="text-xl font-semibold">Flujo de Ventas Detallado</h2>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {stages.map((stage, index) => (
          <div key={stage} className="flex items-center gap-3">
            <div className="rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white">{stage}</div>
            {index < stages.length - 1 && <span className="text-xl text-slate-400">↓</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

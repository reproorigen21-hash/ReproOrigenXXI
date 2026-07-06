export default function ClientDocumentStructure() {
  const documents = [
    'Contrato',
    'Presupuesto',
    'Fotografías',
    'Facturas',
    'Garantía',
    'Certificados',
    'Subvenciones'
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-lg shadow-black/20">
      <h2 className="mb-6 text-xl font-semibold">Documentación del Cliente</h2>
      <div className="space-y-2">
        <div className="text-slate-200">
          <div className="font-semibold text-cyan-300">Cliente</div>
          <div className="ml-6 border-l-2 border-slate-600 py-2">
            {documents.map((doc, index) => (
              <div key={doc} className="flex items-center gap-3 py-1.5 text-slate-300">
                <span className="text-slate-500">├──</span>
                <span>{doc}</span>
              </div>
            ))}
            <div className="flex items-center gap-3 py-1.5 text-slate-500">
              <span>└──</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

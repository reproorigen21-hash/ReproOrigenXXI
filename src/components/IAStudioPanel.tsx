import IAStudioCard from '@/components/IAStudioCard';

type IAStudioSection = {
  title: string;
  description: string;
  status?: string;
};

const IA_STUDIO_SECTIONS: IAStudioSection[] = [
  {
    title: 'Director IA',
    description: 'Orquesta agentes, prioriza tareas y supervisa el estado operativo del ecosistema IA.'
  },
  {
    title: 'Catálogo de Agentes',
    description: 'Explora y clasifica agentes por sector, función y nivel de especialización.',
    status: 'Inventario'
  },
  {
    title: 'Agentes Activos',
    description: 'Monitorea qué agentes están en ejecución y su carga de trabajo actual.',
    status: 'En línea'
  },
  {
    title: 'Marketplace',
    description: 'Gestiona suscripciones y contratación de agentes para empresas y administraciones.',
    status: 'Comercial'
  },
  {
    title: 'Plantillas',
    description: 'Configura plantillas reutilizables de prompts, procesos y flujos operativos.'
  },
  {
    title: 'Integraciones',
    description: 'Prepara conectores con CRM, agenda, documentos y otros sistemas corporativos.',
    status: 'Preparación'
  },
  {
    title: 'Analítica',
    description: 'Visualiza métricas de uso, productividad y ahorro de tiempo por agente.',
    status: 'Insights'
  }
];

export default function IAStudioPanel() {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/25">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">ReproOrigen XXI OS</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-100">IA Studio</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-400">
          Panel principal del módulo IA Studio con componentes base y estructura lista para conectar lógica de negocio en una siguiente fase.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {IA_STUDIO_SECTIONS.map((section) => (
          <IAStudioCard
            key={section.title}
            title={section.title}
            description={section.description}
            status={section.status}
          />
        ))}
      </div>
    </section>
  );
}

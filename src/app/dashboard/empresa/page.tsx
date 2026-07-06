const cards = [
  { title: 'Clientes', value: '235' },
  { title: 'Obras activas', value: '18' },
  { title: 'Instaladores', value: '42' },
  { title: 'Presupuestos', value: '15' },
  { title: 'Pagos pendientes', value: '8' },
  { title: 'Incidencias', value: '3' }
];

import ProfessionalSummaryCard from '@/components/ProfessionalSummaryCard';
import WorkflowStages from '@/components/WorkflowStages';
import ClientWorkflowStages from '@/components/ClientWorkflowStages';
import SalesWorkflowStages from '@/components/SalesWorkflowStages';
import DetailedSalesWorkflow from '@/components/DetailedSalesWorkflow';
import ReproOrigenOS from '@/components/ReproOrigenOS';
import ClientDocumentStructure from '@/components/ClientDocumentStructure';
import InstallerSearch from '@/components/InstallerSearch';
import AICentralStructure from '@/components/AICentralStructure';
import ReproOrigenOSStructure from '@/components/ReproOrigenOSStructure';
import ReproOrigenMainStructure from '@/components/ReproOrigenMainStructure';
import AILeadFlow from '@/components/AILeadFlow';

export default function EmpresaPage() {
  return (
    <div className="space-y-8 p-8 text-slate-200">
      <h1 className="text-4xl font-bold">Centro de Operaciones</h1>

      <ReproOrigenOS />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div key={card.title} className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
            <p className="text-sm text-slate-400">{card.title}</p>
            <p className="mt-3 text-3xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>

      <ProfessionalSummaryCard name="José Martínez" rating="★★★★★" status="Disponible" />

      <WorkflowStages />

      <ClientWorkflowStages />

      <SalesWorkflowStages />

      <DetailedSalesWorkflow />

      <InstallerSearch />

      <ClientDocumentStructure />

      <AICentralStructure />

      <ReproOrigenOSStructure />

      <ReproOrigenMainStructure />

      <AILeadFlow />
    </div>
  );
}

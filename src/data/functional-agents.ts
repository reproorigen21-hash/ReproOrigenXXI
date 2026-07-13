export type FunctionalAgentKey = 'comercial' | 'agenda' | 'subvenciones';

export type FunctionalAgentConfig = {
  key: FunctionalAgentKey;
  title: string;
  summary: string;
  keywords: string[];
};

export type FunctionalAgentResult = {
  agent: FunctionalAgentKey;
  title: string;
  response: string;
  nextStep: string;
  escalation: boolean;
};

export const functionalAgents: FunctionalAgentConfig[] = [
  {
    key: 'comercial',
    title: 'Agente Comercial',
    summary: 'Convierte oportunidades en propuestas y da el primer paso comercial.',
    keywords: ['presupuesto', 'cliente', 'venta', 'oportunidad', 'reforma', 'contacto']
  },
  {
    key: 'agenda',
    title: 'Agente Agenda',
    summary: 'Ordena citas, visitas, reuniones y recordatorios.',
    keywords: ['cita', 'visita', 'agenda', 'reunión', 'reunion', 'reservar', 'calendario']
  },
  {
    key: 'subvenciones',
    title: 'Agente Subvenciones',
    summary: 'Detecta ayudas compatibles y prepara el camino documental.',
    keywords: ['subvención', 'subvencion', 'ayuda', 'ayudas', 'bono', 'financiación', 'financiacion']
  }
];

export function routeFunctionalAgent(input: string): FunctionalAgentKey {
  const normalized = input.toLowerCase();

  const match = functionalAgents.find((agent) => agent.keywords.some((keyword) => normalized.includes(keyword)));

  return match?.key ?? 'comercial';
}

export function runFunctionalAgent(agentKey: FunctionalAgentKey, input: string): FunctionalAgentResult {
  const normalized = input.toLowerCase();
  const isUrgent = normalized.includes('urgente') || normalized.includes('hoy') || normalized.includes('inmediato');

  switch (agentKey) {
    case 'agenda':
      return {
        agent: 'agenda',
        title: 'Agente Agenda',
        response: 'He identificado una solicitud de agenda. Puedo reservar una visita, detectar huecos y enviar confirmaciones.',
        nextStep: isUrgent ? 'Priorizar el hueco mas cercano y avisar a la persona responsable.' : 'Proponer tres franjas disponibles y confirmar la mejor opcion.',
        escalation: isUrgent
      };
    case 'subvenciones':
      return {
        agent: 'subvenciones',
        title: 'Agente Subvenciones',
        response: 'He detectado una necesidad de ayudas. Voy a revisar elegibilidad, documentos y plazos antes de preparar el expediente.',
        nextStep: 'Cruzar el caso con el proyecto y preparar checklist documental.',
        escalation: normalized.includes('plazo') || normalized.includes('juridico')
      };
    case 'comercial':
    default:
      return {
        agent: 'comercial',
        title: 'Agente Comercial',
        response: 'He detectado una oportunidad comercial. Puedo cualificar el lead, preparar una propuesta inicial y activar seguimiento.',
        nextStep: 'Registrar la oportunidad en CRM y abrir la siguiente accion comercial.',
        escalation: normalized.includes('contrato') || normalized.includes('precio fijo')
      };
  }
}

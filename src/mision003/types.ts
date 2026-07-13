export type TimelineEntity = 'lead' | 'cliente' | 'oportunidad' | 'visita' | 'presupuesto' | 'proyecto' | 'colaborador' | 'contrato' | 'servicio' | 'subvencion' | 'tarea';

export type TimelineEvent = {
  id: string;
  type: string;
  entity: TimelineEntity;
  entityId: string;
  timestamp: string;
  user: string;
  fromStatus?: string;
  toStatus?: string;
  metadata?: Record<string, unknown>;
};

export type CreateTimelineEventInput = Omit<TimelineEvent, 'id' | 'timestamp'>;

export type TimelineFilter = {
  entity?: TimelineEntity;
  entityId?: string;
  limit?: number;
};

export type Mision003Store = {
  events: TimelineEvent[];
};

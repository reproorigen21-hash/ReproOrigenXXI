import { mision003Endpoints, mision003RestRequest } from './rest';
import type {
  CreateTimelineEventInput,
  TimelineEntity,
  TimelineEvent
} from './types';

async function unwrap<T>(request: Promise<{ status: number; data?: T; error?: string }>): Promise<T> {
  const response = await request;
  if (response.error || response.data === undefined) {
    throw new Error(response.error ?? 'Error en la solicitud');
  }
  return response.data;
}

export const mision003ApiClient = {
  createEvent(input: CreateTimelineEventInput) {
    return unwrap<TimelineEvent>(mision003RestRequest('POST', mision003Endpoints.events, input));
  },
  listRecent() {
    return unwrap<TimelineEvent[]>(mision003RestRequest('GET', mision003Endpoints.recent));
  },
  listByEntity(entity: TimelineEntity, entityId: string, limit?: number) {
    return unwrap<TimelineEvent[]>(mision003RestRequest('POST', mision003Endpoints.byEntity, { entity, entityId, limit }));
  }
};

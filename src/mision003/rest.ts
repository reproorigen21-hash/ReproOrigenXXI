import { mision003Service } from './services';
import type {
  CreateTimelineEventInput,
  TimelineEntity
} from './types';

export type RestMethod = 'GET' | 'POST';

export type RestResponse<TData> = {
  status: number;
  data?: TData;
  error?: string;
};

export const mision003Endpoints = {
  events: '/api/mision003/events',
  recent: '/api/mision003/events/recent',
  byEntity: '/api/mision003/events/entity'
} as const;

function ok<T>(data: T): RestResponse<T> {
  return { status: 200, data };
}

function badRequest(error: string): RestResponse<never> {
  return { status: 400, error };
}

type EntityFilterBody = {
  entity: TimelineEntity;
  entityId: string;
  limit?: number;
};

export async function mision003RestRequest<TBody, TResult>(
  method: RestMethod,
  endpoint: string,
  body?: TBody
): Promise<RestResponse<TResult>> {
  try {
    if (endpoint === mision003Endpoints.events && method === 'POST') {
      return ok(mision003Service.register(body as CreateTimelineEventInput) as TResult);
    }

    if (endpoint === mision003Endpoints.recent && method === 'GET') {
      return ok(mision003Service.listRecent() as TResult);
    }

    if (endpoint === mision003Endpoints.byEntity && method === 'POST') {
      const filter = body as EntityFilterBody;
      return ok(mision003Service.listByEntity(filter.entity, filter.entityId, filter.limit) as TResult);
    }

    return { status: 404, error: 'Endpoint no encontrado' };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return badRequest(message);
  }
}

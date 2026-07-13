import { mision003Repositories } from './repositories';
import type {
  CreateTimelineEventInput,
  TimelineEntity,
  TimelineEvent
} from './types';

function assertRequired(value: string | undefined, field: string) {
  if (!value || value.trim().length === 0) {
    throw new Error(`Campo obligatorio: ${field}`);
  }
}

export class Mision003Service {
  listRecent(limit = 10): TimelineEvent[] {
    return mision003Repositories.timeline.list({ limit });
  }

  listByEntity(entity: TimelineEntity, entityId: string, limit = 50): TimelineEvent[] {
    return mision003Repositories.timeline.list({ entity, entityId, limit });
  }

  register(input: CreateTimelineEventInput): TimelineEvent {
    assertRequired(input.type, 'type');
    assertRequired(input.entity, 'entity');
    assertRequired(input.entityId, 'entityId');
    assertRequired(input.user, 'user');

    return mision003Repositories.timeline.create(input);
  }

  registerTransition(params: {
    type: string;
    entity: TimelineEntity;
    entityId: string;
    user: string;
    fromStatus?: string;
    toStatus?: string;
    metadata?: Record<string, unknown>;
  }) {
    return this.register({
      type: params.type,
      entity: params.entity,
      entityId: params.entityId,
      user: params.user,
      fromStatus: params.fromStatus,
      toStatus: params.toStatus,
      metadata: params.metadata
    });
  }
}

export const mision003Service = new Mision003Service();

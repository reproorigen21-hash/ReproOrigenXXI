import type {
  CreateTimelineEventInput,
  Mision003Store,
  TimelineEvent,
  TimelineFilter
} from './types';

const STORAGE_KEY = 'repro:mision003:v1';

const emptyStore: Mision003Store = {
  events: []
};

function nowISO() {
  return new Date().toISOString();
}

function loadStore(): Mision003Store {
  if (typeof window === 'undefined') return emptyStore;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return emptyStore;

  try {
    const parsed = JSON.parse(raw) as Partial<Mision003Store>;
    return { events: parsed.events ?? [] };
  } catch {
    return emptyStore;
  }
}

function saveStore(store: Mision003Store) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function withStore<T>(updater: (store: Mision003Store) => T): T {
  const current = loadStore();
  const clone: Mision003Store = {
    events: [...current.events]
  };

  const result = updater(clone);
  saveStore(clone);
  return result;
}

export class TimelineEventRepository {
  list(filter?: TimelineFilter) {
    const events = loadStore().events;

    const filtered = events.filter((event) => {
      if (filter?.entity && event.entity !== filter.entity) return false;
      if (filter?.entityId && event.entityId !== filter.entityId) return false;
      return true;
    });

    if (!filter?.limit) return filtered;
    return filtered.slice(0, filter.limit);
  }

  create(input: CreateTimelineEventInput): TimelineEvent {
    const entry: TimelineEvent = {
      ...input,
      id: crypto.randomUUID(),
      timestamp: nowISO()
    };

    return withStore((store) => {
      store.events.unshift(entry);
      return entry;
    });
  }
}

export const mision003Repositories = {
  timeline: new TimelineEventRepository()
};

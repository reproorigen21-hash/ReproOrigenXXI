import type { EventEntry } from './types';

export interface EventBus {
  publish(event: Omit<EventEntry, 'id' | 'createdAt'>): EventEntry;
  subscribe(type: string, handler: (event: EventEntry) => void): () => void;
  getEvents(): EventEntry[];
}

export class InMemoryEventBus implements EventBus {
  private events: EventEntry[] = [];
  private handlers = new Map<string, Set<(event: EventEntry) => void>>();

  publish(event: Omit<EventEntry, 'id' | 'createdAt'>): EventEntry {
    const entry: EventEntry = {
      ...event,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };

    this.events.push(entry);

    this.handlers.get(event.type)?.forEach((handler) => handler(entry));
    this.handlers.get('*')?.forEach((handler) => handler(entry));

    return entry;
  }

  subscribe(type: string, handler: (event: EventEntry) => void) {
    const bucket = this.handlers.get(type) ?? new Set();
    bucket.add(handler);
    this.handlers.set(type, bucket);

    return () => {
      bucket.delete(handler);
    };
  }

  getEvents() {
    return [...this.events];
  }
}

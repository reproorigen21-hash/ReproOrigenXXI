import type { MemoryEntry } from './types';

export interface MemoryEngine {
  remember(entry: Omit<MemoryEntry, 'id' | 'date'>): MemoryEntry;
  list(): MemoryEntry[];
  query(filters: Partial<Pick<MemoryEntry, 'user' | 'organization' | 'project' | 'agent'>>): MemoryEntry[];
}

export class InMemoryMemoryEngine implements MemoryEngine {
  private memories: MemoryEntry[] = [];

  remember(entry: Omit<MemoryEntry, 'id' | 'date'>): MemoryEntry {
    const memory: MemoryEntry = {
      ...entry,
      id: crypto.randomUUID(),
      date: new Date().toISOString()
    };

    this.memories.unshift(memory);
    return memory;
  }

  list() {
    return [...this.memories];
  }

  query(filters: Partial<Pick<MemoryEntry, 'user' | 'organization' | 'project' | 'agent'>>) {
    return this.memories.filter((entry) => {
      return Object.entries(filters).every(([key, value]) => (value ? entry[key as keyof MemoryEntry] === value : true));
    });
  }
}

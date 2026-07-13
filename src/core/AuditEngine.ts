import type { AuditEntry } from './types';

export interface AuditEngine {
  log(entry: Omit<AuditEntry, 'id' | 'createdAt'>): AuditEntry;
  list(): AuditEntry[];
}

export class InMemoryAuditEngine implements AuditEngine {
  private audits: AuditEntry[] = [];

  log(entry: Omit<AuditEntry, 'id' | 'createdAt'>) {
    const audit: AuditEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };

    this.audits.unshift(audit);
    return audit;
  }

  list() {
    return [...this.audits];
  }
}

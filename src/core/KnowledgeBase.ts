export type KnowledgeBaseItem = {
  id: string;
  title: string;
  section: string;
  content: string;
  tags: string[];
  updatedAt: string;
};

export interface KnowledgeBase {
  upsert(item: Omit<KnowledgeBaseItem, 'updatedAt'>): KnowledgeBaseItem;
  get(id: string): KnowledgeBaseItem | undefined;
  list(section?: string): KnowledgeBaseItem[];
  search(query: string): KnowledgeBaseItem[];
}

export class InMemoryKnowledgeBase implements KnowledgeBase {
  private items = new Map<string, KnowledgeBaseItem>();

  upsert(item: Omit<KnowledgeBaseItem, 'updatedAt'>) {
    const entry: KnowledgeBaseItem = {
      ...item,
      updatedAt: new Date().toISOString()
    };

    this.items.set(item.id, entry);
    return entry;
  }

  get(id: string) {
    return this.items.get(id);
  }

  list(section?: string) {
    return [...this.items.values()].filter((item) => (section ? item.section === section : true));
  }

  search(query: string) {
    const normalized = query.toLowerCase();
    return [...this.items.values()].filter((item) => {
      const haystack = `${item.title} ${item.section} ${item.content} ${item.tags.join(' ')}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }
}

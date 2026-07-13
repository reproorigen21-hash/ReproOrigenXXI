import type {
  CreateProyectoInput,
  Mision002Store,
  Proyecto,
  ProyectoEstado
} from './types';

const STORAGE_KEY = 'repro:mision002:v1';

const emptyStore: Mision002Store = {
  proyectos: []
};

function nowISO() {
  return new Date().toISOString();
}

function nextCodigo() {
  if (typeof window === 'undefined') return `PRY-${Date.now()}`;
  const key = 'repro:mision002:sequence';
  const current = Number(window.localStorage.getItem(key) ?? '0') + 1;
  window.localStorage.setItem(key, String(current));
  return `PRY-${current.toString().padStart(4, '0')}`;
}

function loadStore(): Mision002Store {
  if (typeof window === 'undefined') return emptyStore;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return emptyStore;

  try {
    const parsed = JSON.parse(raw) as Partial<Mision002Store>;
    return {
      proyectos: parsed.proyectos ?? []
    };
  } catch {
    return emptyStore;
  }
}

function saveStore(store: Mision002Store) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function withStore<T>(updater: (store: Mision002Store) => T): T {
  const current = loadStore();
  const clone: Mision002Store = {
    proyectos: [...current.proyectos]
  };

  const result = updater(clone);
  saveStore(clone);
  return result;
}

function isEstadoActivo(estado: ProyectoEstado) {
  return estado !== 'Finalizado' && estado !== 'Archivado';
}

export class ProyectoRepository {
  list() {
    return loadStore().proyectos;
  }

  listActivos() {
    return this.list().filter((item) => isEstadoActivo(item.estado));
  }

  findByPresupuesto(presupuestoId: string) {
    return this.list().find((item) => item.presupuestoId === presupuestoId);
  }

  updateEstado(proyectoId: string, estado: Proyecto['estado']) {
    return withStore((store) => {
      const index = store.proyectos.findIndex((item) => item.id === proyectoId);
      if (index === -1) return undefined;

      const current = store.proyectos[index];
      const updated: Proyecto = {
        ...current,
        estado,
        updatedAt: nowISO()
      };

      store.proyectos[index] = updated;
      return updated;
    });
  }

  create(input: CreateProyectoInput): Proyecto {
    const timestamp = nowISO();

    return withStore((store) => {
      const record: Proyecto = {
        ...input,
        id: crypto.randomUUID(),
        codigo: nextCodigo(),
        createdAt: timestamp,
        updatedAt: timestamp
      };

      store.proyectos.unshift(record);
      return record;
    });
  }
}

export const mision002Repositories = {
  proyectos: new ProyectoRepository()
};

import type {
  Cliente,
  CreateClienteInput,
  CreateOportunidadInput,
  CreatePresupuestoInput,
  CreateVisitaInput,
  Mision001Store,
  Oportunidad,
  PresupuestoComercial,
  VisitaComercial
} from './types';

const STORAGE_KEY = 'repro:mision001:v1';

const emptyStore: Mision001Store = {
  clientes: [],
  oportunidades: [],
  visitas: [],
  presupuestos: []
};

function nowISO() {
  return new Date().toISOString();
}

function loadStore(): Mision001Store {
  if (typeof window === 'undefined') return emptyStore;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return emptyStore;

  try {
    const parsed = JSON.parse(raw) as Partial<Mision001Store>;
    return {
      clientes: parsed.clientes ?? [],
      oportunidades: parsed.oportunidades ?? [],
      visitas: parsed.visitas ?? [],
      presupuestos: parsed.presupuestos ?? []
    };
  } catch {
    return emptyStore;
  }
}

function saveStore(store: Mision001Store) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function withStore<T>(updater: (store: Mision001Store) => T): T {
  const current = loadStore();
  const clone: Mision001Store = {
    clientes: [...current.clientes],
    oportunidades: [...current.oportunidades],
    visitas: [...current.visitas],
    presupuestos: [...current.presupuestos]
  };

  const result = updater(clone);
  saveStore(clone);
  return result;
}

export class ClienteRepository {
  list() {
    return loadStore().clientes;
  }

  create(input: CreateClienteInput): Cliente {
    const timestamp = nowISO();
    return withStore((store) => {
      const record: Cliente = {
        ...input,
        id: crypto.randomUUID(),
        createdAt: timestamp,
        updatedAt: timestamp
      };
      store.clientes.unshift(record);
      return record;
    });
  }
}

export class OportunidadRepository {
  list() {
    return loadStore().oportunidades;
  }

  create(input: CreateOportunidadInput): Oportunidad {
    const timestamp = nowISO();
    return withStore((store) => {
      const record: Oportunidad = {
        ...input,
        id: crypto.randomUUID(),
        ultimaActualizacion: timestamp,
        createdAt: timestamp,
        updatedAt: timestamp
      };
      store.oportunidades.unshift(record);
      return record;
    });
  }
}

export class VisitaRepository {
  list() {
    return loadStore().visitas;
  }

  create(input: CreateVisitaInput): VisitaComercial {
    const timestamp = nowISO();
    return withStore((store) => {
      const record: VisitaComercial = {
        ...input,
        id: crypto.randomUUID(),
        createdAt: timestamp,
        updatedAt: timestamp
      };
      store.visitas.unshift(record);
      return record;
    });
  }
}

export class PresupuestoRepository {
  list() {
    return loadStore().presupuestos;
  }

  updateEstado(presupuestoId: string, estado: PresupuestoComercial['estado']) {
    return withStore((store) => {
      const index = store.presupuestos.findIndex((item) => item.id === presupuestoId);
      if (index === -1) return undefined;

      const current = store.presupuestos[index];
      const updated: PresupuestoComercial = {
        ...current,
        estado,
        updatedAt: nowISO()
      };

      store.presupuestos[index] = updated;
      return updated;
    });
  }

  create(input: CreatePresupuestoInput): PresupuestoComercial {
    const timestamp = nowISO();
    return withStore((store) => {
      const record: PresupuestoComercial = {
        ...input,
        id: crypto.randomUUID(),
        createdAt: timestamp,
        updatedAt: timestamp
      };
      store.presupuestos.unshift(record);
      return record;
    });
  }
}

export const mision001Repositories = {
  clientes: new ClienteRepository(),
  oportunidades: new OportunidadRepository(),
  visitas: new VisitaRepository(),
  presupuestos: new PresupuestoRepository()
};

import { mision001Repositories } from '@/mision001/repositories';
import { mision002Repositories } from '@/mision002/repositories';
import type {
  Cobro,
  Contrato,
  CreateExpedienteDocumentoInput,
  CreateExpedienteInput,
  CreateContratoInput,
  Expediente,
  ExpedienteDocumento,
  Factura,
  FacturaEstado,
  Mision004Store,
  RegisterCobroInput,
  UpdateExpedienteEstadoInput,
  UpdateContratoEstadoInput
} from './types';

const STORAGE_KEY = 'repro:mision004:v1';

const emptyStore: Mision004Store = {
  contratos: [],
  facturas: [],
  cobros: [],
  expedientes: [],
  documentos: []
};

function nowISO() {
  return new Date().toISOString();
}

function nextCode(sequenceKey: string, prefix: string) {
  if (typeof window === 'undefined') return `${prefix}-${Date.now()}`;
  const current = Number(window.localStorage.getItem(sequenceKey) ?? '0') + 1;
  window.localStorage.setItem(sequenceKey, String(current));
  return `${prefix}-${current.toString().padStart(4, '0')}`;
}

function loadStore(): Mision004Store {
  if (typeof window === 'undefined') return emptyStore;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return emptyStore;

  try {
    const parsed = JSON.parse(raw) as Partial<Mision004Store>;
    return {
      contratos: parsed.contratos ?? [],
      facturas: parsed.facturas ?? [],
      cobros: parsed.cobros ?? [],
      expedientes: parsed.expedientes ?? [],
      documentos: parsed.documentos ?? []
    };
  } catch {
    return emptyStore;
  }
}

function saveStore(store: Mision004Store) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function withStore<T>(updater: (store: Mision004Store) => T): T {
  const current = loadStore();
  const clone: Mision004Store = {
    contratos: [...current.contratos],
    facturas: [...current.facturas],
    cobros: [...current.cobros],
    expedientes: [...current.expedientes],
    documentos: [...current.documentos]
  };

  const result = updater(clone);
  saveStore(clone);
  return result;
}

export class ContratoRepository {
  list() {
    return loadStore().contratos;
  }

  findById(contratoId: string) {
    return this.list().find((item) => item.id === contratoId);
  }

  findByProyecto(proyectoId: string) {
    return this.list().find((item) => item.proyectoId === proyectoId);
  }

  create(input: CreateContratoInput): Contrato {
    const timestamp = nowISO();
    return withStore((store) => {
      const record: Contrato = {
        id: crypto.randomUUID(),
        codigo: nextCode('repro:mision004:contrato:sequence', 'CTR'),
        proyectoId: input.proyectoId,
        clienteId: input.clienteId,
        estado: input.estado ?? 'BORRADOR',
        notas: input.notas,
        createdAt: timestamp,
        updatedAt: timestamp
      };

      store.contratos.unshift(record);
      return record;
    });
  }

  updateEstado(input: UpdateContratoEstadoInput) {
    const timestamp = nowISO();
    return withStore((store) => {
      const index = store.contratos.findIndex((item) => item.id === input.contratoId);
      if (index === -1) return undefined;

      const current = store.contratos[index];
      const updated: Contrato = {
        ...current,
        estado: input.estado,
        fechaEnvio: input.estado === 'ENVIADO' ? timestamp : current.fechaEnvio,
        fechaFirma: input.estado === 'FIRMADO' ? timestamp : current.fechaFirma,
        updatedAt: timestamp
      };

      store.contratos[index] = updated;
      return updated;
    });
  }
}

export class FacturaRepository {
  list() {
    return loadStore().facturas;
  }

  findById(facturaId: string) {
    return this.list().find((item) => item.id === facturaId);
  }

  findByContrato(contratoId: string) {
    return this.list().find((item) => item.contratoId === contratoId);
  }

  createFromContrato(contrato: Contrato): Factura {
    const timestamp = nowISO();
    const proyecto = mision002Repositories.proyectos.list().find((item) => item.id === contrato.proyectoId);
    const presupuesto = proyecto?.presupuestoId
      ? mision001Repositories.presupuestos.list().find((item) => item.id === proyecto.presupuestoId)
      : undefined;

    const importe = presupuesto?.importe ?? 0;

    return withStore((store) => {
      const existing = store.facturas.find((item) => item.contratoId === contrato.id);
      if (existing) return existing;

      const record: Factura = {
        id: crypto.randomUUID(),
        codigo: nextCode('repro:mision004:factura:sequence', 'FAC'),
        contratoId: contrato.id,
        proyectoId: contrato.proyectoId,
        clienteId: contrato.clienteId,
        importeTotal: importe,
        saldoPendiente: importe,
        estado: 'EMITIDA',
        fechaEmision: timestamp,
        createdAt: timestamp,
        updatedAt: timestamp
      };

      store.facturas.unshift(record);
      return record;
    });
  }

  updateEstado(facturaId: string, estado: FacturaEstado, saldoPendiente?: number) {
    const timestamp = nowISO();
    return withStore((store) => {
      const index = store.facturas.findIndex((item) => item.id === facturaId);
      if (index === -1) return undefined;

      const current = store.facturas[index];
      const updated: Factura = {
        ...current,
        estado,
        saldoPendiente: saldoPendiente ?? current.saldoPendiente,
        fechaPago: estado === 'PAGADA' ? timestamp : current.fechaPago,
        updatedAt: timestamp
      };

      store.facturas[index] = updated;
      return updated;
    });
  }
}

export class CobroRepository {
  list() {
    return loadStore().cobros;
  }

  create(input: RegisterCobroInput, factura: Factura): Cobro {
    const timestamp = nowISO();
    return withStore((store) => {
      const record: Cobro = {
        id: crypto.randomUUID(),
        facturaId: input.facturaId,
        clienteId: factura.clienteId,
        proyectoId: factura.proyectoId,
        importe: input.importe,
        metodoPago: input.metodoPago,
        fechaCobro: input.fechaCobro ?? timestamp,
        referencia: input.referencia,
        notas: input.notas,
        createdAt: timestamp,
        updatedAt: timestamp
      };

      store.cobros.unshift(record);
      return record;
    });
  }
}

export class ExpedienteRepository {
  list() {
    return loadStore().expedientes;
  }

  findById(expedienteId: string) {
    return this.list().find((item) => item.id === expedienteId);
  }

  findByProyecto(proyectoId: string) {
    return this.list().find((item) => item.proyectoId === proyectoId);
  }

  create(input: CreateExpedienteInput): Expediente {
    const timestamp = nowISO();
    return withStore((store) => {
      const existing = store.expedientes.find((item) => item.proyectoId === input.proyectoId);
      if (existing) return existing;

      const record: Expediente = {
        id: crypto.randomUUID(),
        codigo: nextCode('repro:mision004:expediente:sequence', 'EXP'),
        proyectoId: input.proyectoId,
        clienteId: input.clienteId,
        estado: input.estado ?? 'Abierto',
        createdAt: timestamp,
        updatedAt: timestamp
      };

      store.expedientes.unshift(record);
      return record;
    });
  }

  updateEstado(input: UpdateExpedienteEstadoInput) {
    const timestamp = nowISO();
    return withStore((store) => {
      const index = store.expedientes.findIndex((item) => item.id === input.expedienteId);
      if (index === -1) return undefined;

      const current = store.expedientes[index];
      const updated: Expediente = {
        ...current,
        estado: input.estado,
        updatedAt: timestamp
      };

      store.expedientes[index] = updated;
      return updated;
    });
  }
}

export class ExpedienteDocumentoRepository {
  list() {
    return loadStore().documentos;
  }

  findById(documentoId: string) {
    return this.list().find((item) => item.id === documentoId);
  }

  listByExpediente(expedienteId: string) {
    return this.list().filter((item) => item.expedienteId === expedienteId);
  }

  create(input: CreateExpedienteDocumentoInput, expediente: Expediente): ExpedienteDocumento {
    const timestamp = nowISO();

    return withStore((store) => {
      const record: ExpedienteDocumento = {
        id: crypto.randomUUID(),
        expedienteId: input.expedienteId,
        proyectoId: expediente.proyectoId,
        clienteId: expediente.clienteId,
        categoria: input.categoria,
        nombre: input.nombre,
        fechaDocumento: input.fechaDocumento,
        tipo: input.tipo,
        estado: input.estado ?? 'Pendiente',
        createdAt: timestamp,
        updatedAt: timestamp
      };

      store.documentos.unshift(record);
      return record;
    });
  }

  validate(documentoId: string) {
    const timestamp = nowISO();

    return withStore((store) => {
      const index = store.documentos.findIndex((item) => item.id === documentoId);
      if (index === -1) return undefined;

      const current = store.documentos[index];
      const updated: ExpedienteDocumento = {
        ...current,
        estado: 'Validado',
        updatedAt: timestamp
      };

      store.documentos[index] = updated;
      return updated;
    });
  }
}

export const mision004Repositories = {
  contratos: new ContratoRepository(),
  facturas: new FacturaRepository(),
  cobros: new CobroRepository(),
  expedientes: new ExpedienteRepository(),
  documentos: new ExpedienteDocumentoRepository()
};

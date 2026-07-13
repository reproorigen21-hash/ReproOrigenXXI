import { mision001Repositories } from '@/mision001/repositories';
import { mision002Repositories } from './repositories';
import { mision003Service } from '@/mision003/services';
import { mision004Service } from '@/mision004/services';
import type {
  CreateProyectoFromAprobadoInput,
  CreateProyectoInput,
  Proyecto,
  ProyectoEstado,
  UpdateProyectoEstadoInput
} from './types';

function assertRequired(value: string | undefined, field: string) {
  if (!value || value.trim().length === 0) {
    throw new Error(`Campo obligatorio: ${field}`);
  }
}

function isEstadoActivo(estado: ProyectoEstado) {
  return estado !== 'Finalizado' && estado !== 'Archivado';
}

export class Mision002Service {
  listProyectos(): Proyecto[] {
    return mision002Repositories.proyectos.list();
  }

  listProyectosActivos(): Proyecto[] {
    return mision002Repositories.proyectos.listActivos();
  }

  countProyectosActivos() {
    return this.listProyectos().filter((item) => isEstadoActivo(item.estado)).length;
  }

  createProyecto(input: CreateProyectoInput): Proyecto {
    assertRequired(input.nombre, 'nombre');
    assertRequired(input.clienteId, 'clienteId');

    const cliente = mision001Repositories.clientes.list().find((item) => item.id === input.clienteId);
    if (!cliente) {
      throw new Error('Cliente no encontrado para el proyecto');
    }

    if (input.oportunidadId) {
      const oportunidad = mision001Repositories.oportunidades.list().find((item) => item.id === input.oportunidadId);
      if (!oportunidad) {
        throw new Error('Oportunidad no encontrada para el proyecto');
      }
    }

    if (input.presupuestoId) {
      const presupuesto = mision001Repositories.presupuestos.list().find((item) => item.id === input.presupuestoId);
      if (!presupuesto) {
        throw new Error('Presupuesto no encontrado para el proyecto');
      }
    }

    const proyecto = mision002Repositories.proyectos.create(input);

    if (proyecto.estado === 'Aprobado') {
      mision004Service.createContratoFromProyectoAprobado({
        proyectoId: proyecto.id,
        clienteId: proyecto.clienteId
      });
    }

    mision003Service.registerTransition({
      type: 'proyecto.creado',
      entity: 'proyecto',
      entityId: proyecto.id,
      user: 'sistema',
      toStatus: proyecto.estado,
      metadata: {
        clienteId: proyecto.clienteId,
        oportunidadId: proyecto.oportunidadId,
        presupuestoId: proyecto.presupuestoId
      }
    });

    return proyecto;
  }

  createProyectoFromPresupuestoAprobado(input: CreateProyectoFromAprobadoInput): Proyecto {
    assertRequired(input.clienteId, 'clienteId');
    assertRequired(input.presupuestoId, 'presupuestoId');

    const existente = mision002Repositories.proyectos.findByPresupuesto(input.presupuestoId);
    if (existente) return existente;

    const presupuesto = mision001Repositories.presupuestos.list().find((item) => item.id === input.presupuestoId);
    if (!presupuesto) {
      throw new Error('Presupuesto no encontrado para crear proyecto');
    }

    if (presupuesto.estado !== 'aceptado' && presupuesto.estado !== 'aprobado') {
      throw new Error('Solo se puede crear proyecto automaticamente desde presupuesto aprobado');
    }

    const visitasRelacionadas = mision001Repositories.visitas
      .list()
      .filter((item) => item.clienteId === input.clienteId && (!input.oportunidadId || item.oportunidadId === input.oportunidadId))
      .map((item) => item.id);

    return this.createProyecto({
      nombre: input.nombre?.trim() || `Proyecto ${presupuesto.titulo}`,
      estado: 'Aprobado',
      clienteId: input.clienteId,
      oportunidadId: input.oportunidadId,
      presupuestoId: input.presupuestoId,
      visitaIds: visitasRelacionadas
    });
  }

  updateProyectoEstado(input: UpdateProyectoEstadoInput): Proyecto {
    assertRequired(input.proyectoId, 'proyectoId');

    const updated = mision002Repositories.proyectos.updateEstado(input.proyectoId, input.estado);
    if (!updated) {
      throw new Error('Proyecto no encontrado para actualizar estado');
    }

    if (updated.estado === 'Aprobado') {
      mision004Service.createContratoFromProyectoAprobado({
        proyectoId: updated.id,
        clienteId: updated.clienteId
      });
    }

    mision003Service.registerTransition({
      type: 'proyecto.estado_cambiado',
      entity: 'proyecto',
      entityId: updated.id,
      user: 'sistema',
      toStatus: updated.estado,
      metadata: {
        clienteId: updated.clienteId,
        oportunidadId: updated.oportunidadId,
        presupuestoId: updated.presupuestoId
      }
    });

    return updated;
  }
}

export const mision002Service = new Mision002Service();

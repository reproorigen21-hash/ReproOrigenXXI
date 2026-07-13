import { mision001Repositories } from './repositories';
import { mision002Service } from '@/mision002/services';
import { mision003Service } from '@/mision003/services';
import type {
  Cliente,
  CreateClienteInput,
  CreateOportunidadInput,
  CreatePresupuestoInput,
  UpdatePresupuestoEstadoInput,
  CreateVisitaInput,
  Oportunidad,
  PresupuestoComercial,
  VisitaComercial
} from './types';

function assertRequired(value: string | undefined, field: string) {
  if (!value || value.trim().length === 0) {
    throw new Error(`Campo obligatorio: ${field}`);
  }
}

function isPresupuestoAprobado(estado: string) {
  return estado === 'aceptado' || estado === 'aprobado';
}

export class Mision001Service {
  listClientes(): Cliente[] {
    return mision001Repositories.clientes.list();
  }

  createCliente(input: CreateClienteInput): Cliente {
    assertRequired(input.nombre, 'nombre');
    assertRequired(input.apellidos, 'apellidos');
    assertRequired(input.telefono, 'telefono');
    assertRequired(input.direccion, 'direccion');
    assertRequired(input.codigoPostal, 'codigoPostal');
    assertRequired(input.municipio, 'municipio');
    assertRequired(input.provincia, 'provincia');
    assertRequired(input.tipoVivienda, 'tipoVivienda');

    const cliente = mision001Repositories.clientes.create(input);

    mision003Service.registerTransition({
      type: 'cliente.registrado',
      entity: 'cliente',
      entityId: cliente.id,
      user: 'sistema',
      metadata: { nombre: `${cliente.nombre} ${cliente.apellidos}` }
    });

    return cliente;
  }

  listOportunidades(): Oportunidad[] {
    return mision001Repositories.oportunidades.list();
  }

  createOportunidad(input: CreateOportunidadInput): Oportunidad {
    assertRequired(input.clienteId, 'clienteId');
    assertRequired(input.comercialAsignado, 'comercialAsignado');

    const cliente = this.listClientes().find((item) => item.id === input.clienteId);
    if (!cliente) {
      throw new Error('Cliente no encontrado para la oportunidad');
    }

    const oportunidad = mision001Repositories.oportunidades.create(input);

    mision003Service.registerTransition({
      type: 'oportunidad.abierta',
      entity: 'oportunidad',
      entityId: oportunidad.id,
      user: 'sistema',
      toStatus: oportunidad.estado,
      metadata: { clienteId: oportunidad.clienteId }
    });

    return oportunidad;
  }

  listVisitas(): VisitaComercial[] {
    return mision001Repositories.visitas.list();
  }

  createVisita(input: CreateVisitaInput): VisitaComercial {
    assertRequired(input.clienteId, 'clienteId');
    assertRequired(input.titulo, 'titulo');
    assertRequired(input.fechaInicio, 'fechaInicio');
    assertRequired(input.responsable, 'responsable');

    const cliente = this.listClientes().find((item) => item.id === input.clienteId);
    if (!cliente) {
      throw new Error('Cliente no encontrado para la visita');
    }

    const visita = mision001Repositories.visitas.create(input);

    mision003Service.registerTransition({
      type: 'visita.programada',
      entity: 'visita',
      entityId: visita.id,
      user: 'sistema',
      toStatus: visita.estado,
      metadata: { clienteId: visita.clienteId, oportunidadId: visita.oportunidadId }
    });

    return visita;
  }

  listPresupuestos(): PresupuestoComercial[] {
    return mision001Repositories.presupuestos.list();
  }

  createPresupuesto(input: CreatePresupuestoInput): PresupuestoComercial {
    assertRequired(input.clienteId, 'clienteId');
    assertRequired(input.titulo, 'titulo');

    if (Number.isNaN(input.importe) || input.importe <= 0) {
      throw new Error('El importe debe ser mayor que cero');
    }

    const cliente = this.listClientes().find((item) => item.id === input.clienteId);
    if (!cliente) {
      throw new Error('Cliente no encontrado para el presupuesto');
    }

    const presupuesto = mision001Repositories.presupuestos.create(input);

    mision003Service.registerTransition({
      type: 'presupuesto.generado',
      entity: 'presupuesto',
      entityId: presupuesto.id,
      user: 'sistema',
      toStatus: presupuesto.estado,
      metadata: { clienteId: presupuesto.clienteId, oportunidadId: presupuesto.oportunidadId }
    });

    if (isPresupuestoAprobado(presupuesto.estado)) {
      mision002Service.createProyectoFromPresupuestoAprobado({
        clienteId: presupuesto.clienteId,
        oportunidadId: presupuesto.oportunidadId,
        presupuestoId: presupuesto.id
      });
    }

    return presupuesto;
  }

  updatePresupuestoEstado(input: UpdatePresupuestoEstadoInput): PresupuestoComercial {
    assertRequired(input.presupuestoId, 'presupuestoId');

    const updated = mision001Repositories.presupuestos.updateEstado(input.presupuestoId, input.estado);
    if (!updated) {
      throw new Error('Presupuesto no encontrado para actualizar estado');
    }

    mision003Service.registerTransition({
      type: 'presupuesto.estado_cambiado',
      entity: 'presupuesto',
      entityId: updated.id,
      user: 'sistema',
      fromStatus: undefined,
      toStatus: updated.estado,
      metadata: { clienteId: updated.clienteId, oportunidadId: updated.oportunidadId }
    });

    if (isPresupuestoAprobado(updated.estado)) {
      mision002Service.createProyectoFromPresupuestoAprobado({
        clienteId: updated.clienteId,
        oportunidadId: updated.oportunidadId,
        presupuestoId: updated.id
      });
    }

    return updated;
  }
}

export const mision001Service = new Mision001Service();

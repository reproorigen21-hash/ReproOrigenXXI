import { mision003Service } from '@/mision003/services';
import { mision004Repositories } from './repositories';
import { mision001Repositories } from '@/mision001/repositories';
import { mision002Repositories } from '@/mision002/repositories';
import type {
  Cobro,
  Contrato,
  CreateExpedienteDocumentoInput,
  CreateExpedienteInput,
  CreateContratoInput,
  ErpKpis,
  Expediente,
  ExpedienteDetalle,
  ExpedienteDocumento,
  Factura,
  RegisterCobroInput,
  UpdateExpedienteEstadoInput,
  UpdateContratoEstadoInput
} from './types';

function assertRequired(value: string | undefined, field: string) {
  if (!value || value.trim().length === 0) {
    throw new Error(`Campo obligatorio: ${field}`);
  }
}

function monthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function toDate(iso: string | undefined) {
  if (!iso) return undefined;
  return new Date(iso);
}

function inCurrentMonth(iso: string | undefined) {
  const date = toDate(iso);
  if (!date) return false;
  return date >= monthStart(new Date());
}

export class Mision004Service {
  listContratos(): Contrato[] {
    return mision004Repositories.contratos.list();
  }

  listFacturas(): Factura[] {
    return mision004Repositories.facturas.list();
  }

  listCobros(): Cobro[] {
    return mision004Repositories.cobros.list();
  }

  listExpedientes(): Expediente[] {
    return mision004Repositories.expedientes.list();
  }

  listExpedienteDocumentos(expedienteId: string): ExpedienteDocumento[] {
    assertRequired(expedienteId, 'expedienteId');
    return mision004Repositories.documentos.listByExpediente(expedienteId);
  }

  createExpediente(input: CreateExpedienteInput): Expediente {
    assertRequired(input.proyectoId, 'proyectoId');
    assertRequired(input.clienteId, 'clienteId');

    const existente = mision004Repositories.expedientes.findByProyecto(input.proyectoId);
    if (existente) return existente;

    const expediente = mision004Repositories.expedientes.create(input);

    mision003Service.registerTransition({
      type: 'expediente.creado',
      entity: 'proyecto',
      entityId: expediente.proyectoId,
      user: 'sistema',
      toStatus: expediente.estado,
      metadata: {
        expedienteId: expediente.id,
        clienteId: expediente.clienteId
      }
    });

    return expediente;
  }

  createExpedienteFromProyecto(input: { proyectoId: string; clienteId: string }): Expediente {
    return this.createExpediente({
      proyectoId: input.proyectoId,
      clienteId: input.clienteId,
      estado: 'Abierto'
    });
  }

  updateExpedienteEstado(input: UpdateExpedienteEstadoInput): Expediente {
    assertRequired(input.expedienteId, 'expedienteId');

    const updated = mision004Repositories.expedientes.updateEstado(input);
    if (!updated) {
      throw new Error('Expediente no encontrado para actualizar estado');
    }

    if (updated.estado === 'Finalizado') {
      mision003Service.registerTransition({
        type: 'expediente.finalizado',
        entity: 'proyecto',
        entityId: updated.proyectoId,
        user: 'sistema',
        toStatus: updated.estado,
        metadata: { expedienteId: updated.id }
      });
    }

    if (updated.estado === 'Archivado') {
      mision003Service.registerTransition({
        type: 'expediente.archivado',
        entity: 'proyecto',
        entityId: updated.proyectoId,
        user: 'sistema',
        toStatus: updated.estado,
        metadata: { expedienteId: updated.id }
      });
    }

    return updated;
  }

  addDocumento(input: CreateExpedienteDocumentoInput): ExpedienteDocumento {
    assertRequired(input.expedienteId, 'expedienteId');
    assertRequired(input.nombre, 'nombre');
    assertRequired(input.fechaDocumento, 'fechaDocumento');
    assertRequired(input.tipo, 'tipo');

    const expediente = mision004Repositories.expedientes.findById(input.expedienteId);
    if (!expediente) {
      throw new Error('Expediente no encontrado para anadir documento');
    }

    const documento = mision004Repositories.documentos.create(input, expediente);

    mision003Service.registerTransition({
      type: 'documento.añadido',
      entity: 'proyecto',
      entityId: expediente.proyectoId,
      user: 'sistema',
      toStatus: documento.estado,
      metadata: {
        expedienteId: expediente.id,
        documentoId: documento.id,
        categoria: documento.categoria,
        tipo: documento.tipo
      }
    });

    return documento;
  }

  validateDocumento(input: { documentoId: string }): ExpedienteDocumento {
    assertRequired(input.documentoId, 'documentoId');

    const previo = mision004Repositories.documentos.findById(input.documentoId);
    if (!previo) {
      throw new Error('Documento no encontrado para validar');
    }

    const updated = mision004Repositories.documentos.validate(input.documentoId);
    if (!updated) {
      throw new Error('Documento no encontrado para validar');
    }

    mision003Service.registerTransition({
      type: 'documento.validado',
      entity: 'proyecto',
      entityId: updated.proyectoId,
      user: 'sistema',
      fromStatus: previo.estado,
      toStatus: updated.estado,
      metadata: {
        expedienteId: updated.expedienteId,
        documentoId: updated.id
      }
    });

    return updated;
  }

  getExpedienteByProyecto(input: { proyectoId: string }): ExpedienteDetalle {
    assertRequired(input.proyectoId, 'proyectoId');

    const expediente = mision004Repositories.expedientes.findByProyecto(input.proyectoId);
    if (!expediente) {
      throw new Error('Expediente no encontrado para el proyecto indicado');
    }

    const proyecto = mision002Repositories.proyectos.list().find((item) => item.id === input.proyectoId);
    if (!proyecto) {
      throw new Error('Proyecto no encontrado para construir el expediente');
    }

    const cliente = mision001Repositories.clientes.list().find((item) => item.id === expediente.clienteId);
    if (!cliente) {
      throw new Error('Cliente no encontrado para construir el expediente');
    }

    const oportunidad = proyecto.oportunidadId
      ? mision001Repositories.oportunidades.list().find((item) => item.id === proyecto.oportunidadId)
      : undefined;

    const visitas = mision001Repositories.visitas
      .list()
      .filter(
        (item) =>
          item.clienteId === cliente.id ||
          (proyecto.oportunidadId !== undefined && item.oportunidadId === proyecto.oportunidadId)
      )
      .map((item) => ({ id: item.id, titulo: item.titulo, estado: item.estado }));

    const presupuesto = proyecto.presupuestoId
      ? mision001Repositories.presupuestos.list().find((item) => item.id === proyecto.presupuestoId)
      : undefined;

    const contrato = mision004Repositories.contratos.findByProyecto(proyecto.id);
    const facturas = mision004Repositories.facturas.list().filter((item) => item.proyectoId === proyecto.id);
    const cobros = mision004Repositories.cobros.list().filter((item) => item.proyectoId === proyecto.id);
    const timeline = mision003Service
      .listByEntity('proyecto', proyecto.id, 200)
      .map((item) => ({ id: item.id, type: item.type, timestamp: item.timestamp }));
    const documentos = mision004Repositories.documentos.listByExpediente(expediente.id);

    return {
      expediente,
      cliente: {
        id: cliente.id,
        nombre: cliente.nombre,
        apellidos: cliente.apellidos
      },
      oportunidad: oportunidad ? { id: oportunidad.id, estado: oportunidad.estado } : undefined,
      visitas,
      presupuesto: presupuesto
        ? {
            id: presupuesto.id,
            titulo: presupuesto.titulo,
            estado: presupuesto.estado,
            importe: presupuesto.importe
          }
        : undefined,
      contrato,
      facturas,
      cobros,
      timeline,
      documentos
    };
  }

  createContrato(input: CreateContratoInput): Contrato {
    assertRequired(input.proyectoId, 'proyectoId');
    assertRequired(input.clienteId, 'clienteId');

    const existente = mision004Repositories.contratos.findByProyecto(input.proyectoId);
    if (existente) return existente;

    this.createExpedienteFromProyecto({
      proyectoId: input.proyectoId,
      clienteId: input.clienteId
    });

    const contrato = mision004Repositories.contratos.create(input);

    mision003Service.registerTransition({
      type: 'contrato.creado',
      entity: 'proyecto',
      entityId: input.proyectoId,
      user: 'sistema',
      toStatus: contrato.estado,
      metadata: {
        contratoId: contrato.id,
        clienteId: contrato.clienteId
      }
    });

    return contrato;
  }

  createContratoFromProyectoAprobado(input: { proyectoId: string; clienteId: string }): Contrato {
    this.createExpedienteFromProyecto(input);

    return this.createContrato({
      proyectoId: input.proyectoId,
      clienteId: input.clienteId,
      estado: 'BORRADOR'
    });
  }

  updateContratoEstado(input: UpdateContratoEstadoInput): Contrato {
    assertRequired(input.contratoId, 'contratoId');

    const previo = mision004Repositories.contratos.findById(input.contratoId);
    if (!previo) {
      throw new Error('Contrato no encontrado para actualizar estado');
    }

    const updated = mision004Repositories.contratos.updateEstado(input);
    if (!updated) {
      throw new Error('Contrato no encontrado para actualizar estado');
    }

    const firmaNueva = previo.estado !== 'FIRMADO' && updated.estado === 'FIRMADO';

    if (firmaNueva) {
      mision003Service.registerTransition({
        type: 'contrato.firmado',
        entity: 'proyecto',
        entityId: updated.proyectoId,
        user: 'sistema',
        toStatus: updated.estado,
        metadata: {
          contratoId: updated.id,
          clienteId: updated.clienteId
        }
      });

      const facturaExistente = mision004Repositories.facturas.findByContrato(updated.id);
      const factura = mision004Repositories.facturas.createFromContrato(updated);
      if (!facturaExistente) {
        mision003Service.registerTransition({
          type: 'factura.emitida',
          entity: 'proyecto',
          entityId: updated.proyectoId,
          user: 'sistema',
          toStatus: factura.estado,
          metadata: {
            contratoId: updated.id,
            facturaId: factura.id,
            importeTotal: factura.importeTotal
          }
        });
      }
    }

    return updated;
  }

  registerCobro(input: RegisterCobroInput): { cobro: Cobro; factura: Factura } {
    assertRequired(input.facturaId, 'facturaId');

    if (Number.isNaN(input.importe) || input.importe <= 0) {
      throw new Error('El importe del cobro debe ser mayor que cero');
    }

    const factura = mision004Repositories.facturas.findById(input.facturaId);
    if (!factura) {
      throw new Error('Factura no encontrada para registrar cobro');
    }

    if (factura.estado === 'ANULADA') {
      throw new Error('No se puede registrar cobro sobre una factura anulada');
    }

    if (input.importe > factura.saldoPendiente) {
      throw new Error('El cobro supera el saldo pendiente de la factura');
    }

    const cobro = mision004Repositories.cobros.create(input, factura);

    const nuevoSaldo = Math.max(0, Number((factura.saldoPendiente - input.importe).toFixed(2)));
    const nuevoEstado = nuevoSaldo === 0 ? 'PAGADA' : 'PENDIENTE';

    const facturaActualizada = mision004Repositories.facturas.updateEstado(factura.id, nuevoEstado, nuevoSaldo);
    if (!facturaActualizada) {
      throw new Error('No se pudo actualizar la factura tras registrar cobro');
    }

    mision003Service.registerTransition({
      type: 'cobro.registrado',
      entity: 'proyecto',
      entityId: factura.proyectoId,
      user: 'sistema',
      toStatus: nuevoEstado,
      metadata: {
        facturaId: factura.id,
        cobroId: cobro.id,
        importe: cobro.importe,
        saldoPendiente: facturaActualizada.saldoPendiente,
        metodoPago: cobro.metodoPago
      }
    });

    if (nuevoEstado === 'PAGADA') {
      mision003Service.registerTransition({
        type: 'factura.pagada',
        entity: 'proyecto',
        entityId: factura.proyectoId,
        user: 'sistema',
        toStatus: nuevoEstado,
        metadata: {
          facturaId: factura.id,
          cobroId: cobro.id
        }
      });
    }

    return { cobro, factura: facturaActualizada };
  }

  getErpKpis(): ErpKpis {
    const contratos = this.listContratos();
    const facturas = this.listFacturas();
    const cobros = this.listCobros();
    const expedientes = this.listExpedientes();
    const documentos = mision004Repositories.documentos.list();

    const contratosActivos = contratos.filter((item) => item.estado !== 'CANCELADO').length;
    const facturasEmitidas = facturas.filter((item) => item.estado !== 'BORRADOR' && item.estado !== 'ANULADA').length;

    const cobrosPendientes = facturas.filter((item) => item.estado !== 'ANULADA' && item.saldoPendiente > 0).length;

    const tesoreriaDisponible = cobros.reduce((sum, item) => sum + item.importe, 0);
    const ingresosAcumulados = facturas
      .filter((item) => item.estado !== 'ANULADA')
      .reduce((sum, item) => sum + item.importeTotal, 0);

    const facturadoDelMes = facturas
      .filter((item) => item.estado !== 'ANULADA' && inCurrentMonth(item.fechaEmision))
      .reduce((sum, item) => sum + item.importeTotal, 0);

    const cobradoDelMes = cobros
      .filter((item) => inCurrentMonth(item.fechaCobro))
      .reduce((sum, item) => sum + item.importe, 0);

    const pendienteDeCobro = facturas
      .filter((item) => item.estado !== 'ANULADA')
      .reduce((sum, item) => sum + item.saldoPendiente, 0);

    const pendienteDeFacturar = contratos.reduce((sum, contrato) => {
      const factura = facturas.find((item) => item.contratoId === contrato.id);
      if (!factura && contrato.estado !== 'CANCELADO') return sum + 1;
      return sum;
    }, 0);

    const expedientesAbiertos = expedientes.filter((item) => item.estado === 'Abierto' || item.estado === 'En ejecucion').length;
    const expedientesPendientes = expedientes.filter(
      (item) => item.estado === 'Pendiente de documentacion' || item.estado === 'Pendiente de cobro'
    ).length;
    const documentosPendientes = documentos.filter((item) => item.estado === 'Pendiente').length;
    const contratosPorFirmar = contratos.filter((item) => item.estado === 'BORRADOR' || item.estado === 'ENVIADO').length;
    const now = Date.now();
    const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;
    const facturasVencidas = facturas.filter((item) => {
      if (item.estado === 'ANULADA' || item.estado === 'PAGADA') return false;
      if (!item.fechaEmision) return false;
      return now - new Date(item.fechaEmision).getTime() > THIRTY_DAYS;
    }).length;

    return {
      contratosActivos,
      facturasEmitidas,
      cobrosPendientes,
      tesoreriaDisponible,
      ingresosDelMes: cobradoDelMes,
      facturadoDelMes,
      cobradoDelMes,
      pendienteDeCobro,
      pendienteDeFacturar,
      ingresosAcumulados,
      expedientesAbiertos,
      expedientesPendientes,
      documentosPendientes,
      contratosPorFirmar,
      facturasVencidas
    };
  }
}

export const mision004Service = new Mision004Service();

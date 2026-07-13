import { mision004Endpoints, mision004RestRequest } from './rest';
import type {
  Cobro,
  Contrato,
  CreateContratoInput,
  CreateExpedienteDocumentoInput,
  CreateExpedienteInput,
  ErpKpis,
  Expediente,
  ExpedienteDetalle,
  ExpedienteDocumento,
  Factura,
  RegisterCobroInput,
  UpdateContratoEstadoInput
} from './types';

type RegisterCobroResponse = {
  cobro: Cobro;
  factura: Factura;
};

async function unwrap<T>(request: Promise<{ status: number; data?: T; error?: string }>): Promise<T> {
  const response = await request;
  if (response.error || response.data === undefined) {
    throw new Error(response.error ?? 'Error en la solicitud');
  }
  return response.data;
}

export const mision004ApiClient = {
  listContratos() {
    return unwrap<Contrato[]>(mision004RestRequest('GET', mision004Endpoints.contratos));
  },
  createContrato(input: CreateContratoInput) {
    return unwrap<Contrato>(mision004RestRequest('POST', mision004Endpoints.contratos, input));
  },
  updateContratoEstado(input: UpdateContratoEstadoInput) {
    return unwrap<Contrato>(mision004RestRequest('POST', mision004Endpoints.contratoEstado, input));
  },
  listFacturas() {
    return unwrap<Factura[]>(mision004RestRequest('GET', mision004Endpoints.facturas));
  },
  listCobros() {
    return unwrap<Cobro[]>(mision004RestRequest('GET', mision004Endpoints.cobros));
  },
  registerCobro(input: RegisterCobroInput) {
    return unwrap<RegisterCobroResponse>(mision004RestRequest('POST', mision004Endpoints.cobros, input));
  },
  listExpedientes() {
    return unwrap<Expediente[]>(mision004RestRequest('GET', mision004Endpoints.expedientes));
  },
  createExpediente(input: CreateExpedienteInput) {
    return unwrap<Expediente>(mision004RestRequest('POST', mision004Endpoints.expedientes, input));
  },
  getExpedienteByProyecto(proyectoId: string) {
    return unwrap<ExpedienteDetalle>(mision004RestRequest('POST', mision004Endpoints.expedienteProyecto, { proyectoId }));
  },
  updateExpedienteEstado(input: { expedienteId: string; estado: Expediente['estado'] }) {
    return unwrap<Expediente>(mision004RestRequest('POST', mision004Endpoints.expedienteEstado, input));
  },
  listExpedienteDocumentos(expedienteId: string) {
    return unwrap<ExpedienteDocumento[]>(mision004RestRequest('GET', mision004Endpoints.documentos, { expedienteId }));
  },
  addDocumento(input: CreateExpedienteDocumentoInput) {
    return unwrap<ExpedienteDocumento>(mision004RestRequest('POST', mision004Endpoints.documentos, input));
  },
  validateDocumento(documentoId: string) {
    return unwrap<ExpedienteDocumento>(mision004RestRequest('POST', mision004Endpoints.documentoValidar, { documentoId }));
  },
  getKpis() {
    return unwrap<ErpKpis>(mision004RestRequest('GET', mision004Endpoints.kpis));
  }
};

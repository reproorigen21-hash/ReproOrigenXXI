import { mision001Endpoints, mision001RestRequest } from './rest';
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

async function unwrap<T>(request: Promise<{ status: number; data?: T; error?: string }>): Promise<T> {
  const response = await request;
  if (response.error || response.data === undefined) {
    throw new Error(response.error ?? 'Error en la solicitud');
  }
  return response.data;
}

export const mision001ApiClient = {
  listClientes() {
    return unwrap<Cliente[]>(mision001RestRequest('GET', mision001Endpoints.clientes));
  },
  createCliente(input: CreateClienteInput) {
    return unwrap<Cliente>(mision001RestRequest('POST', mision001Endpoints.clientes, input));
  },
  listOportunidades() {
    return unwrap<Oportunidad[]>(mision001RestRequest('GET', mision001Endpoints.oportunidades));
  },
  createOportunidad(input: CreateOportunidadInput) {
    return unwrap<Oportunidad>(mision001RestRequest('POST', mision001Endpoints.oportunidades, input));
  },
  listVisitas() {
    return unwrap<VisitaComercial[]>(mision001RestRequest('GET', mision001Endpoints.visitas));
  },
  createVisita(input: CreateVisitaInput) {
    return unwrap<VisitaComercial>(mision001RestRequest('POST', mision001Endpoints.visitas, input));
  },
  listPresupuestos() {
    return unwrap<PresupuestoComercial[]>(mision001RestRequest('GET', mision001Endpoints.presupuestos));
  },
  createPresupuesto(input: CreatePresupuestoInput) {
    return unwrap<PresupuestoComercial>(mision001RestRequest('POST', mision001Endpoints.presupuestos, input));
  },
  updatePresupuestoEstado(input: UpdatePresupuestoEstadoInput) {
    return unwrap<PresupuestoComercial>(mision001RestRequest('POST', mision001Endpoints.presupuestoEstado, input));
  }
};

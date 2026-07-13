import { mision001Service } from './services';
import type {
  CreateClienteInput,
  CreateOportunidadInput,
  CreatePresupuestoInput,
  UpdatePresupuestoEstadoInput,
  CreateVisitaInput
} from './types';

export type RestMethod = 'GET' | 'POST';

export type RestResponse<TData> = {
  status: number;
  data?: TData;
  error?: string;
};

export const mision001Endpoints = {
  clientes: '/api/mision001/clientes',
  oportunidades: '/api/mision001/oportunidades',
  visitas: '/api/mision001/visitas',
  presupuestos: '/api/mision001/presupuestos',
  presupuestoEstado: '/api/mision001/presupuestos/estado'
} as const;

function ok<T>(data: T): RestResponse<T> {
  return { status: 200, data };
}

function badRequest(error: string): RestResponse<never> {
  return { status: 400, error };
}

export async function mision001RestRequest<TBody, TResult>(
  method: RestMethod,
  endpoint: string,
  body?: TBody
): Promise<RestResponse<TResult>> {
  try {
    if (endpoint === mision001Endpoints.clientes) {
      if (method === 'GET') return ok(mision001Service.listClientes() as TResult);
      if (method === 'POST') return ok(mision001Service.createCliente(body as CreateClienteInput) as TResult);
    }

    if (endpoint === mision001Endpoints.oportunidades) {
      if (method === 'GET') return ok(mision001Service.listOportunidades() as TResult);
      if (method === 'POST') return ok(mision001Service.createOportunidad(body as CreateOportunidadInput) as TResult);
    }

    if (endpoint === mision001Endpoints.visitas) {
      if (method === 'GET') return ok(mision001Service.listVisitas() as TResult);
      if (method === 'POST') return ok(mision001Service.createVisita(body as CreateVisitaInput) as TResult);
    }

    if (endpoint === mision001Endpoints.presupuestos) {
      if (method === 'GET') return ok(mision001Service.listPresupuestos() as TResult);
      if (method === 'POST') return ok(mision001Service.createPresupuesto(body as CreatePresupuestoInput) as TResult);
    }

    if (endpoint === mision001Endpoints.presupuestoEstado && method === 'POST') {
      return ok(mision001Service.updatePresupuestoEstado(body as UpdatePresupuestoEstadoInput) as TResult);
    }

    return { status: 404, error: 'Endpoint no encontrado' };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return badRequest(message);
  }
}

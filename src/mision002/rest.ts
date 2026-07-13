import { mision002Service } from './services';
import type { CreateProyectoInput, UpdateProyectoEstadoInput } from './types';

export type RestMethod = 'GET' | 'POST';

export type RestResponse<TData> = {
  status: number;
  data?: TData;
  error?: string;
};

export const mision002Endpoints = {
  proyectos: '/api/mision002/proyectos',
  proyectosActivos: '/api/mision002/proyectos/activos',
  proyectoEstado: '/api/mision002/proyectos/estado'
} as const;

function ok<T>(data: T): RestResponse<T> {
  return { status: 200, data };
}

function badRequest(error: string): RestResponse<never> {
  return { status: 400, error };
}

export async function mision002RestRequest<TBody, TResult>(
  method: RestMethod,
  endpoint: string,
  body?: TBody
): Promise<RestResponse<TResult>> {
  try {
    if (endpoint === mision002Endpoints.proyectos) {
      if (method === 'GET') return ok(mision002Service.listProyectos() as TResult);
      if (method === 'POST') return ok(mision002Service.createProyecto(body as CreateProyectoInput) as TResult);
    }

    if (endpoint === mision002Endpoints.proyectosActivos && method === 'GET') {
      return ok({
        total: mision002Service.countProyectosActivos(),
        proyectos: mision002Service.listProyectosActivos()
      } as TResult);
    }

    if (endpoint === mision002Endpoints.proyectoEstado && method === 'POST') {
      return ok(mision002Service.updateProyectoEstado(body as UpdateProyectoEstadoInput) as TResult);
    }

    return { status: 404, error: 'Endpoint no encontrado' };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return badRequest(message);
  }
}

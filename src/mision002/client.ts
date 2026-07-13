import { mision002Endpoints, mision002RestRequest } from './rest';
import type { CreateProyectoInput, Proyecto, UpdateProyectoEstadoInput } from './types';

type ProyectosActivosResponse = {
  total: number;
  proyectos: Proyecto[];
};

async function unwrap<T>(request: Promise<{ status: number; data?: T; error?: string }>): Promise<T> {
  const response = await request;
  if (response.error || response.data === undefined) {
    throw new Error(response.error ?? 'Error en la solicitud');
  }
  return response.data;
}

export const mision002ApiClient = {
  listProyectos() {
    return unwrap<Proyecto[]>(mision002RestRequest('GET', mision002Endpoints.proyectos));
  },
  createProyecto(input: CreateProyectoInput) {
    return unwrap<Proyecto>(mision002RestRequest('POST', mision002Endpoints.proyectos, input));
  },
  updateProyectoEstado(input: UpdateProyectoEstadoInput) {
    return unwrap<Proyecto>(mision002RestRequest('POST', mision002Endpoints.proyectoEstado, input));
  },
  getProyectosActivos() {
    return unwrap<ProyectosActivosResponse>(mision002RestRequest('GET', mision002Endpoints.proyectosActivos));
  }
};

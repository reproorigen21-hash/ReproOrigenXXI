import { mision004Service } from './services';
import type {
  CreateContratoInput,
  CreateExpedienteDocumentoInput,
  CreateExpedienteInput,
  RegisterCobroInput,
  UpdateContratoEstadoInput,
  UpdateExpedienteEstadoInput
} from './types';

export type RestMethod = 'GET' | 'POST';

export type RestResponse<TData> = {
  status: number;
  data?: TData;
  error?: string;
};

export const mision004Endpoints = {
  contratos: '/api/mision004/contratos',
  contratoEstado: '/api/mision004/contratos/estado',
  facturas: '/api/mision004/facturas',
  cobros: '/api/mision004/cobros',
  kpis: '/api/mision004/kpis',
  expedientes: '/api/mision004/expedientes',
  expedienteProyecto: '/api/mision004/expedientes/proyecto',
  expedienteEstado: '/api/mision004/expedientes/estado',
  documentos: '/api/mision004/documentos',
  documentoValidar: '/api/mision004/documentos/validar'
} as const;

function ok<T>(data: T): RestResponse<T> {
  return { status: 200, data };
}

function badRequest(error: string): RestResponse<never> {
  return { status: 400, error };
}

export async function mision004RestRequest<TBody, TResult>(
  method: RestMethod,
  endpoint: string,
  body?: TBody
): Promise<RestResponse<TResult>> {
  try {
    if (endpoint === mision004Endpoints.contratos && method === 'GET') {
      return ok(mision004Service.listContratos() as TResult);
    }

    if (endpoint === mision004Endpoints.contratos && method === 'POST') {
      return ok(mision004Service.createContrato(body as CreateContratoInput) as TResult);
    }

    if (endpoint === mision004Endpoints.contratoEstado && method === 'POST') {
      return ok(mision004Service.updateContratoEstado(body as UpdateContratoEstadoInput) as TResult);
    }

    if (endpoint === mision004Endpoints.facturas && method === 'GET') {
      return ok(mision004Service.listFacturas() as TResult);
    }

    if (endpoint === mision004Endpoints.cobros && method === 'GET') {
      return ok(mision004Service.listCobros() as TResult);
    }

    if (endpoint === mision004Endpoints.cobros && method === 'POST') {
      return ok(mision004Service.registerCobro(body as RegisterCobroInput) as TResult);
    }

    if (endpoint === mision004Endpoints.kpis && method === 'GET') {
      return ok(mision004Service.getErpKpis() as TResult);
    }

    if (endpoint === mision004Endpoints.expedientes && method === 'GET') {
      return ok(mision004Service.listExpedientes() as TResult);
    }

    if (endpoint === mision004Endpoints.expedientes && method === 'POST') {
      return ok(mision004Service.createExpediente(body as CreateExpedienteInput) as TResult);
    }

    if (endpoint === mision004Endpoints.expedienteProyecto && method === 'POST') {
      return ok(mision004Service.getExpedienteByProyecto(body as { proyectoId: string }) as TResult);
    }

    if (endpoint === mision004Endpoints.expedienteEstado && method === 'POST') {
      return ok(mision004Service.updateExpedienteEstado(body as UpdateExpedienteEstadoInput) as TResult);
    }

    if (endpoint === mision004Endpoints.documentos && method === 'POST') {
      return ok(mision004Service.addDocumento(body as CreateExpedienteDocumentoInput) as TResult);
    }

    if (endpoint === mision004Endpoints.documentos && method === 'GET') {
      return ok(mision004Service.listExpedienteDocumentos((body as { expedienteId?: string })?.expedienteId ?? '') as TResult);
    }

    if (endpoint === mision004Endpoints.documentoValidar && method === 'POST') {
      return ok(mision004Service.validateDocumento(body as { documentoId: string }) as TResult);
    }

    return { status: 404, error: 'Endpoint no encontrado' };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return badRequest(message);
  }
}

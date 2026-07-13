export type Cliente = {
  id: string;
  nombre: string;
  apellidos: string;
  telefono: string;
  email?: string;
  direccion: string;
  codigoPostal: string;
  municipio: string;
  provincia: string;
  tipoVivienda: string;
  observaciones?: string;
  createdAt: string;
  updatedAt: string;
};

export type OportunidadEstado =
  | 'nuevo_lead'
  | 'llamada_realizada'
  | 'visita_programada'
  | 'medicion_realizada'
  | 'presupuesto_enviado'
  | 'aceptado'
  | 'instalacion'
  | 'finalizado';

export type Oportunidad = {
  id: string;
  clienteId: string;
  estado: OportunidadEstado;
  comercialAsignado: string;
  fuente?: string;
  notas?: string;
  ultimaActualizacion: string;
  createdAt: string;
  updatedAt: string;
};

export type VisitaEstado = 'pendiente' | 'confirmado' | 'realizado' | 'cancelado';

export type VisitaComercial = {
  id: string;
  clienteId: string;
  oportunidadId?: string;
  titulo: string;
  fechaInicio: string;
  fechaFin?: string;
  responsable: string;
  estado: VisitaEstado;
  observaciones?: string;
  createdAt: string;
  updatedAt: string;
};

export type PresupuestoEstado = 'borrador' | 'enviado' | 'aceptado' | 'aprobado' | 'rechazado';

export type PresupuestoComercial = {
  id: string;
  clienteId: string;
  oportunidadId?: string;
  titulo: string;
  importe: number;
  estado: PresupuestoEstado;
  notas?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateClienteInput = Omit<Cliente, 'id' | 'createdAt' | 'updatedAt'>;

export type CreateOportunidadInput = Omit<Oportunidad, 'id' | 'createdAt' | 'updatedAt' | 'ultimaActualizacion'>;

export type CreateVisitaInput = Omit<VisitaComercial, 'id' | 'createdAt' | 'updatedAt'>;

export type CreatePresupuestoInput = Omit<PresupuestoComercial, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdatePresupuestoEstadoInput = {
  presupuestoId: string;
  estado: PresupuestoEstado;
};

export type Mision001Store = {
  clientes: Cliente[];
  oportunidades: Oportunidad[];
  visitas: VisitaComercial[];
  presupuestos: PresupuestoComercial[];
};

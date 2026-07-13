export type ProyectoEstado = 'Borrador' | 'Aprobado' | 'En curso' | 'En espera' | 'Finalizado' | 'Archivado';

export type Proyecto = {
  id: string;
  codigo: string;
  nombre: string;
  estado: ProyectoEstado;
  clienteId: string;
  oportunidadId?: string;
  presupuestoId?: string;
  visitaIds: string[];
  createdAt: string;
  updatedAt: string;
};

export type CreateProyectoInput = Omit<Proyecto, 'id' | 'codigo' | 'createdAt' | 'updatedAt'>;

export type UpdateProyectoEstadoInput = {
  proyectoId: string;
  estado: ProyectoEstado;
};

export type CreateProyectoFromAprobadoInput = {
  clienteId: string;
  oportunidadId?: string;
  presupuestoId: string;
  nombre?: string;
};

export type Mision002Store = {
  proyectos: Proyecto[];
};

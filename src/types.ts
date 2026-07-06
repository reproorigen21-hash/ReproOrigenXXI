export type ModuleKey = 'empresas' | 'hogar' | 'territorio' | 'formacion' | 'comunidad' | 'experiencias';
export type ScreenKey = 'intro' | 'activate' | 'platform';

export type OSState = {
  screen: ScreenKey;
  activeModule: ModuleKey | null;
  userType: string;
  interest: string;
  origin: string;
};

export interface Cliente {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
  tipo: 'Residencial' | 'Comercial' | 'Industrial';
  estado: 'Activo' | 'Inactivo' | 'Suspendido';
}

export interface Profesional {
  id: string;
  nombre: string;
  especialidad: 'PVC' | 'ALUMINIO' | 'CRISTAL' | 'ELECTRICIDAD' | 'FONTANERIA' | 'ALBAÑILERIA' | 'PINTURA' | 'PLADUR';
  provincia: string;
  disponibilidad: boolean;
  valoracion: number;
}

export interface Obra {
  id: string;
  cliente: string;
  direccion: string;
  estado: 'Pendiente' | 'En curso' | 'Finalizada' | 'Cancelada';
  fecha: string;
  instalador: string;
}

export interface Presupuesto {
  id: string;
  cliente: string;
  importe: number;
  estado: 'Enviado' | 'Aceptado' | 'Rechazado' | 'Anulado';
  pdf: string;
}

export interface Documento {
  id: string;
  titulo: string;
  fecha: string;
  usuario: string;
  obra: string;
}

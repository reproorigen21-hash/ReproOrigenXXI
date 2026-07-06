export interface Work {
  id: string;
  cliente: string;
  direccion: string;
  fecha: string;
  estado: 'Pendiente' | 'En curso' | 'Finalizada';
}

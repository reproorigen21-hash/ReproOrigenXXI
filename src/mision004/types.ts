export type ContratoEstado = 'BORRADOR' | 'ENVIADO' | 'FIRMADO' | 'CANCELADO';

export type FacturaEstado = 'BORRADOR' | 'EMITIDA' | 'PENDIENTE' | 'PAGADA' | 'ANULADA';

export type MetodoPago = 'transferencia' | 'domiciliacion' | 'tarjeta' | 'efectivo' | 'bizum' | 'otro';

export type ExpedienteEstado =
  | 'Abierto'
  | 'En ejecucion'
  | 'Pendiente de documentacion'
  | 'Pendiente de cobro'
  | 'Finalizado'
  | 'Archivado';

export type DocumentoCategoria =
  | 'Contratos'
  | 'Presupuestos'
  | 'Facturas'
  | 'Fotografias'
  | 'Certificados'
  | 'Subvenciones'
  | 'Licencias'
  | 'Correspondencia';

export type DocumentoEstado = 'Pendiente' | 'Validado';

export type Contrato = {
  id: string;
  codigo: string;
  proyectoId: string;
  clienteId: string;
  estado: ContratoEstado;
  fechaEnvio?: string;
  fechaFirma?: string;
  notas?: string;
  createdAt: string;
  updatedAt: string;
};

export type Factura = {
  id: string;
  codigo: string;
  contratoId: string;
  proyectoId: string;
  clienteId: string;
  importeTotal: number;
  saldoPendiente: number;
  estado: FacturaEstado;
  fechaEmision?: string;
  fechaPago?: string;
  notas?: string;
  createdAt: string;
  updatedAt: string;
};

export type Cobro = {
  id: string;
  facturaId: string;
  clienteId: string;
  proyectoId: string;
  importe: number;
  metodoPago: MetodoPago;
  fechaCobro: string;
  referencia?: string;
  notas?: string;
  createdAt: string;
  updatedAt: string;
};

export type Expediente = {
  id: string;
  codigo: string;
  proyectoId: string;
  clienteId: string;
  estado: ExpedienteEstado;
  createdAt: string;
  updatedAt: string;
};

export type ExpedienteDocumento = {
  id: string;
  expedienteId: string;
  proyectoId: string;
  clienteId: string;
  categoria: DocumentoCategoria;
  nombre: string;
  fechaDocumento: string;
  tipo: string;
  estado: DocumentoEstado;
  createdAt: string;
  updatedAt: string;
};

export type CreateContratoInput = {
  proyectoId: string;
  clienteId: string;
  estado?: ContratoEstado;
  notas?: string;
};

export type UpdateContratoEstadoInput = {
  contratoId: string;
  estado: ContratoEstado;
};

export type RegisterCobroInput = {
  facturaId: string;
  importe: number;
  metodoPago: MetodoPago;
  fechaCobro?: string;
  referencia?: string;
  notas?: string;
};

export type CreateExpedienteInput = {
  proyectoId: string;
  clienteId: string;
  estado?: ExpedienteEstado;
};

export type UpdateExpedienteEstadoInput = {
  expedienteId: string;
  estado: ExpedienteEstado;
};

export type CreateExpedienteDocumentoInput = {
  expedienteId: string;
  categoria: DocumentoCategoria;
  nombre: string;
  fechaDocumento: string;
  tipo: string;
  estado?: DocumentoEstado;
};

export type ValidateExpedienteDocumentoInput = {
  documentoId: string;
};

export type ExpedienteDetalle = {
  expediente: Expediente;
  cliente: {
    id: string;
    nombre: string;
    apellidos: string;
  };
  oportunidad?: {
    id: string;
    estado: string;
  };
  visitas: Array<{
    id: string;
    titulo: string;
    estado: string;
  }>;
  presupuesto?: {
    id: string;
    titulo: string;
    estado: string;
    importe: number;
  };
  contrato?: Contrato;
  facturas: Factura[];
  cobros: Cobro[];
  timeline: Array<{
    id: string;
    type: string;
    timestamp: string;
  }>;
  documentos: ExpedienteDocumento[];
};

export type ErpKpis = {
  contratosActivos: number;
  facturasEmitidas: number;
  cobrosPendientes: number;
  tesoreriaDisponible: number;
  ingresosDelMes: number;
  facturadoDelMes: number;
  cobradoDelMes: number;
  pendienteDeCobro: number;
  pendienteDeFacturar: number;
  ingresosAcumulados: number;
  expedientesAbiertos: number;
  expedientesPendientes: number;
  documentosPendientes: number;
  contratosPorFirmar: number;
  facturasVencidas: number;
};

export type Mision004Store = {
  contratos: Contrato[];
  facturas: Factura[];
  cobros: Cobro[];
  expedientes: Expediente[];
  documentos: ExpedienteDocumento[];
};
